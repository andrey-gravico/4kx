'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion';
import Section from '@/components/Section';
import { gallery } from '@/lib/content';

const GALLERY_ITEMS = [
  '/images/gallery/1.webp',
  '/images/gallery/2.webp',
  '/images/gallery/3.webp',
  '/images/gallery/4.webp',
];

const MOBILE_STEP_MS = 3500;
const WHEEL_LOCK_MS = 350;

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

export default function GalleryStoriesSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPressing, setIsPressing] = useState(false);
  const [hasError, setHasError] = useState(false);

  const progressRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const wheelLockedRef = useRef(false);
  const wheelTimeoutRef = useRef<number | null>(null);

  const desktopActiveRef = useRef<HTMLDivElement>(null);
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const rotateX = useSpring(rotateXTarget, { stiffness: 300, damping: 30, mass: 0.45 });
  const rotateY = useSpring(rotateYTarget, { stiffness: 300, damping: 30, mass: 0.45 });

  const goNext = () => {
    setActiveIndex((prev) => wrapIndex(prev + 1, GALLERY_ITEMS.length));
    progressRef.current = 0;
    setProgress(0);
  };

  const goPrev = () => {
    setActiveIndex((prev) => wrapIndex(prev - 1, GALLERY_ITEMS.length));
    progressRef.current = 0;
    setProgress(0);
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const syncMobile = () => setIsMobile(mediaQuery.matches);
    syncMobile();
    mediaQuery.addEventListener('change', syncMobile);
    return () => mediaQuery.removeEventListener('change', syncMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || prefersReducedMotion) {
      return;
    }

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = time - (lastTimeRef.current ?? time);
      lastTimeRef.current = time;

      if (!isPressing) {
        const nextProgress = progressRef.current + delta / MOBILE_STEP_MS;
        if (nextProgress >= 1) {
          progressRef.current = 0;
          setProgress(0);
          setActiveIndex((prev) => wrapIndex(prev + 1, GALLERY_ITEMS.length));
        } else {
          progressRef.current = nextProgress;
          setProgress(nextProgress);
        }
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = null;
      lastTimeRef.current = null;
    };
  }, [isMobile, isPressing, prefersReducedMotion]);

  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current !== null) {
        window.clearTimeout(wheelTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goNext();
      } else if (event.key === 'ArrowLeft') {
        goPrev();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobile]);

  const desktopIndexes = useMemo(() => {
    return {
      prev: wrapIndex(activeIndex - 1, GALLERY_ITEMS.length),
      current: activeIndex,
      next: wrapIndex(activeIndex + 1, GALLERY_ITEMS.length),
    };
  }, [activeIndex]);

  const handleDesktopMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!desktopActiveRef.current) {
      return;
    }

    const rect = desktopActiveRef.current.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    rotateXTarget.set(-ny * 4);
    rotateYTarget.set(nx * 8);
  };

  const resetDesktopTilt = () => {
    rotateXTarget.set(0);
    rotateYTarget.set(0);
  };

  const handleDesktopWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (wheelLockedRef.current) {
      return;
    }

    wheelLockedRef.current = true;
    wheelTimeoutRef.current = window.setTimeout(() => {
      wheelLockedRef.current = false;
    }, WHEEL_LOCK_MS);

    if (event.deltaY > 0) {
      goNext();
    } else {
      goPrev();
    }
  };

  return (
    <Section id="gallery" bg="bg-black" className="px-0 py-0">
      {isMobile ? (
        <div
          className="relative h-[100dvh] w-full overflow-hidden touch-pan-y bg-black"
          onPointerDown={() => setIsPressing(true)}
          onPointerUp={() => setIsPressing(false)}
          onPointerCancel={() => setIsPressing(false)}
          onPointerLeave={() => setIsPressing(false)}
        >
          {hasError ? (
            <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center text-white">
              Не удалось загрузить фото галереи
            </div>
          ) : (
            <Image
              src={GALLERY_ITEMS[activeIndex]}
              alt={`Gallery image ${activeIndex + 1}`}
              fill
              priority={activeIndex === 0}
              sizes="100vw"
              className="object-cover"
              onError={() => setHasError(true)}
            />
          )}

          <div className="absolute top-[calc(env(safe-area-inset-top,0px)+20px)] left-4 right-4 z-20 flex gap-1.5">
            {GALLERY_ITEMS.map((item, index) => (
              <div key={item} className="h-1.5 flex-1 overflow-hidden rounded-full bg-[color:var(--sand)]/45">
                <motion.div
                  className="h-full rounded-full bg-[color:var(--sunset)] shadow-[0_0_8px_rgba(232,92,42,0.45)]"
                  animate={{
                    width:
                      index < activeIndex
                        ? '100%'
                        : index === activeIndex
                          ? `${Math.max(progress * 100, 4)}%`
                          : '0%',
                  }}
                  transition={{ duration: 0.08, ease: 'linear' }}
                />
              </div>
            ))}
          </div>

          <h2 className="absolute top-[calc(env(safe-area-inset-top,0px)+36px)] left-0 right-0 z-20 text-center font-heading uppercase text-white text-3xl">
            {gallery.heading}
          </h2>

          <button
            type="button"
            aria-label="Previous gallery image"
            className="absolute inset-y-0 left-0 z-20 w-1/2"
            onClick={goPrev}
          />
          <button
            type="button"
            aria-label="Next gallery image"
            className="absolute inset-y-0 right-0 z-20 w-1/2"
            onClick={goNext}
          />
        </div>
      ) : (
        <div className="relative mx-auto w-full max-w-6xl px-6 py-12">
          <motion.h2
            className="mb-7 text-center font-heading text-5xl uppercase text-white"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-15% 0px' }}
            transition={{ duration: 0.45 }}
          >
            {gallery.heading}
          </motion.h2>

          <div
            className="relative mx-auto h-[80vh] max-h-[900px] min-h-[620px] w-full overflow-hidden"
            onWheel={handleDesktopWheel}
          >
            <motion.div
              className="pointer-events-none absolute inset-x-[8%] top-[10%] h-[78%] overflow-hidden rounded-[26px] border border-sand/35 opacity-35"
              style={{ transform: 'translateZ(-120px)' }}
            >
              <Image
                src={GALLERY_ITEMS[desktopIndexes.prev]}
                alt="Previous gallery image"
                fill
                sizes="(min-width: 768px) 70vw, 100vw"
                className="object-cover scale-[1.04] blur-[0.5px]"
              />
            </motion.div>

            <motion.div
              className="pointer-events-none absolute inset-x-[8%] top-[10%] h-[78%] overflow-hidden rounded-[26px] border border-sunset/35 opacity-35"
              style={{ transform: 'translateZ(-120px)' }}
            >
              <Image
                src={GALLERY_ITEMS[desktopIndexes.next]}
                alt="Next gallery image"
                fill
                sizes="(min-width: 768px) 70vw, 100vw"
                className="object-cover scale-[1.04] blur-[0.5px]"
              />
            </motion.div>

            <motion.div
              ref={desktopActiveRef}
              className="absolute inset-x-[8%] top-[10%] z-20 h-[78%] overflow-hidden rounded-[26px] border-2 border-sunset/80 bg-black shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
              onMouseMove={handleDesktopMouseMove}
              onMouseLeave={resetDesktopTilt}
              transformTemplate={({ rotateX, rotateY }) =>
                `perspective(1200px) rotateX(${rotateX}) rotateY(${rotateY})`
              }
              style={{ rotateX, rotateY }}
            >
              <Image
                key={GALLERY_ITEMS[desktopIndexes.current]}
                src={GALLERY_ITEMS[desktopIndexes.current]}
                alt={`Gallery image ${desktopIndexes.current + 1}`}
                fill
                sizes="(min-width: 1024px) 68vw, (min-width: 768px) 75vw, 100vw"
                className="object-cover"
                priority={desktopIndexes.current === 0}
              />
            </motion.div>

            <button
              type="button"
              aria-label="Previous gallery image"
              className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-sunset/80 bg-black/70 p-3 text-white backdrop-blur-sm transition hover:scale-105"
              onClick={goPrev}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M14.5 5L7.5 12L14.5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next gallery image"
              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-sunset/80 bg-black/70 p-3 text-white backdrop-blur-sm transition hover:scale-105"
              onClick={goNext}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9.5 5L16.5 12L9.5 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </Section>
  );
}
