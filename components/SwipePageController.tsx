'use client';

import { useEffect, useRef } from 'react';

const PAGE_DIM_MAX = 0.28;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function easing(progress: number) {
  return progress * progress * (3 - 2 * progress);
}

function setFitScale() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  if (vw >= 1024) {
    document.documentElement.style.setProperty('--fit-scale', '1');
    return;
  }

  const baseW = 390;
  const baseH = 900;
  const fit = clamp(Math.min(vw / baseW, vh / baseH), 0.75, 1);

  document.documentElement.style.setProperty('--fit-scale', fit.toFixed(4));
}

export default function SwipePageController() {
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.page-root');
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-page-section]')
    );

    if (!root || sections.length === 0) {
      return;
    }

    setFitScale();

    const setDimForAll = (value: number) => {
      sections.forEach((section) => {
        section.style.setProperty('--page-dim', value.toFixed(3));
      });
    };

    const isInteractionBlocked = () => {
      return document.querySelector('[aria-modal="true"]') !== null;
    };

    const goToIndex = (nextIndex: number) => {
      const next = clamp(nextIndex, 0, sections.length - 1);
      const target = sections[next];
      if (!target) return;
      activeIndexRef.current = next;
      root.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    };

    const updateDimByProgress = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setDimForAll(0);
      activeIndexRef.current = closestIndex;

      const current = sections[closestIndex];
      const next = sections[closestIndex + 1];

      if (!current || !next) {
        return;
      }

      const currentRect = current.getBoundingClientRect();
      const progressRaw = clamp(-currentRect.top / Math.max(currentRect.height, 1), 0, 1);
      const progress = easing(progressRaw);

      const dimCurrent =
        progress <= 0.25
          ? 0
          : progress >= 0.75
            ? PAGE_DIM_MAX
            : ((progress - 0.25) / 0.5) * PAGE_DIM_MAX;

      const dimNext =
        progress <= 0.25
          ? PAGE_DIM_MAX
          : progress >= 0.75
            ? 0
            : ((0.75 - progress) / 0.5) * PAGE_DIM_MAX;

      current.style.setProperty('--page-dim', clamp(dimCurrent, 0, PAGE_DIM_MAX).toFixed(3));
      next.style.setProperty('--page-dim', clamp(dimNext, 0, PAGE_DIM_MAX).toFixed(3));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (isInteractionBlocked()) {
        return;
      }
      if (
        event.key === 'ArrowDown' ||
        event.key === 'PageDown' ||
        event.key === ' ' ||
        event.key === 'Spacebar'
      ) {
        event.preventDefault();
        goToIndex(activeIndexRef.current + 1);
        return;
      }

      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        goToIndex(activeIndexRef.current - 1);
      }
    };

    const onResize = () => {
      setFitScale();
      updateDimByProgress();
    };

    updateDimByProgress();
    const initialClosest = sections.reduce((closest, section, index) => {
      const currentDistance = Math.abs(section.getBoundingClientRect().top);
      const closestDistance = Math.abs(sections[closest].getBoundingClientRect().top);
      return currentDistance < closestDistance ? index : closest;
    }, 0);
    activeIndexRef.current = initialClosest;

    window.addEventListener('keydown', onKeyDown);
    root.addEventListener('scroll', updateDimByProgress, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      root.removeEventListener('scroll', updateDimByProgress);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return null;
}
