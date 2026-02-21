'use client';

import { useEffect } from 'react';

const MAX_DIM_OPACITY = 0.28;

function getDimOpacity(visibility: number) {
  if (visibility <= 0.25) {
    return MAX_DIM_OPACITY;
  }

  if (visibility >= 0.75) {
    return 0;
  }

  const t = (0.75 - visibility) / 0.5;
  return Math.max(0, Math.min(MAX_DIM_OPACITY, t * MAX_DIM_OPACITY));
}

export default function ScrollMagnetEffects() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-magnet-section]')
    );

    if (sections.length === 0) {
      return;
    }

    let rafId = 0;
    let snapTimerId: number | null = null;
    let snapReleaseTimerId: number | null = null;
    let isSnapping = false;

    const apply = () => {
      const viewportHeight = window.innerHeight;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const visiblePx =
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const clampedVisible = Math.max(0, visiblePx);
        const visibility = Math.min(1, clampedVisible / Math.max(rect.height, 1));
        const dim = getDimOpacity(visibility);
        section.style.setProperty('--magnet-dim', dim.toFixed(3));
      });

      rafId = 0;
    };

    const schedule = () => {
      if (rafId !== 0) {
        return;
      }
      rafId = window.requestAnimationFrame(apply);
    };

    const snapToNearestSection = () => {
      if (sections.length === 0 || isSnapping) {
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      const bestSection = sections.reduce((closest, section) => {
        const currentDistance = Math.abs(
          section.getBoundingClientRect().top +
            section.getBoundingClientRect().height / 2 -
            viewportCenter
        );
        const closestDistance = Math.abs(
          closest.getBoundingClientRect().top +
            closest.getBoundingClientRect().height / 2 -
            viewportCenter
        );

        return currentDistance < closestDistance ? section : closest;
      }, sections[0]);

      const rect = bestSection.getBoundingClientRect();
      const align = bestSection.dataset.magnetAlign ?? 'center';
      const targetYRaw =
        align === 'start'
          ? window.scrollY + rect.top
          : window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2;
      const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const targetY = Math.min(Math.max(targetYRaw, 0), maxScroll);

      if (Math.abs(targetY - window.scrollY) < 2) {
        return;
      }

      isSnapping = true;
      window.scrollTo({ top: targetY, behavior: 'smooth' });

      if (snapReleaseTimerId !== null) {
        window.clearTimeout(snapReleaseTimerId);
      }
      snapReleaseTimerId = window.setTimeout(() => {
        isSnapping = false;
      }, 420);
    };

    const scheduleSnap = () => {
      if (snapTimerId !== null) {
        window.clearTimeout(snapTimerId);
      }
      snapTimerId = window.setTimeout(snapToNearestSection, 120);
    };

    const onScroll = () => {
      schedule();
      scheduleSnap();
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      if (snapTimerId !== null) {
        window.clearTimeout(snapTimerId);
      }
      if (snapReleaseTimerId !== null) {
        window.clearTimeout(snapReleaseTimerId);
      }
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return null;
}
