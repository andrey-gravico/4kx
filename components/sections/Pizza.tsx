'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { animate, motion, useDragControls, useMotionValue, useReducedMotion } from 'framer-motion';
import Section from '@/components/Section';
import { pizzaSection } from '@/lib/content';

const easeOutCubic: [number, number, number, number] = [0.33, 1, 0.68, 1];

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

function getRelativeIndex(index: number, active: number, total: number) {
  const raw = index - active;
  if (raw === 0) return 0;
  if (raw === 1 || raw === -(total - 1)) return 1;
  if (raw === -1 || raw === total - 1) return -1;
  return 2;
}

export default function Pizza() {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const dragControls = useDragControls();

  const items = pizzaSection.items;

  const cardWidth = containerWidth ? Math.min(containerWidth * 0.82, 420) : 320;
  const cardOffset = cardWidth * 0.58;
  const swipeThreshold = Math.min(cardWidth * 0.2, 110);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(max-width: 767px)');
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useLayoutEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      setContainerWidth(containerRef.current.offsetWidth);
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      setActiveIndex(wrapIndex(nextIndex, items.length));
    },
    [items.length]
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number } }) => {
      if (info.offset.x > swipeThreshold) {
        goTo(activeIndex - 1);
      } else if (info.offset.x < -swipeThreshold) {
        goTo(activeIndex + 1);
      }
      animate(dragX, 0, { duration: 0.45, ease: easeOutCubic });
    },
    [activeIndex, dragX, goTo, swipeThreshold]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(activeIndex + 1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(activeIndex - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, goTo]);

  useEffect(() => {
    animate(dragX, 0, { duration: 0.35, ease: easeOutCubic });
  }, [activeIndex, dragX]);

  const indexLabel = useMemo(() => `${activeIndex + 1} / ${items.length}`, [activeIndex, items.length]);

  return (
    <Section id="pizza" bg="bg-black" className="h-full px-0 py-0">
      <div
        className="h-full w-full overflow-hidden"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 12px)',
        }}
      >
        <div className="page-fit-content mx-auto flex h-full w-full max-w-7xl flex-col px-3 md:px-5">
          <header className="z-10 shrink-0 text-center">
            <h2 className="font-heading text-[clamp(1.7rem,4vw,3.6rem)] uppercase text-white">
              {pizzaSection.heading}
            </h2>
            <p className="font-body text-[clamp(0.92rem,1.5vw,1.2rem)] text-sand/90">
              {pizzaSection.subline}
            </p>
            <div className="mx-auto mt-2 w-full max-w-3xl rounded-md border border-sunset/70 bg-black/70 px-3 py-2 md:px-4">
              <p className="font-heading text-[clamp(0.95rem,1.6vw,1.35rem)] uppercase text-sand">
                {pizzaSection.proofTitle}
              </p>
              <p className="font-body text-[clamp(0.74rem,1.1vw,0.92rem)] text-white/85 line-clamp-1">
                {pizzaSection.proofText}
              </p>
            </div>
          </header>

          {isMobile ? (
            <div
              ref={containerRef}
              className="relative mt-3 min-h-0 flex-1 overflow-hidden rounded-[24px] bg-gradient-to-b from-black via-[#0f1418] to-[#101614]"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  goPrev();
                } else if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  goNext();
                }
              }}
              aria-label="Карусель пиццы"
            >
              <div className="absolute right-3 top-2 z-30 rounded-full border border-sand/40 bg-black/60 px-2 py-1 font-body text-xs text-sand">
                {indexLabel}
              </div>

              <button
                type="button"
                aria-label="Предыдущая пицца"
                className="absolute inset-y-0 left-0 z-30 w-1/3"
                onClick={goPrev}
              />
              <button
                type="button"
                aria-label="Следующая пицца"
                className="absolute inset-y-0 right-0 z-30 w-1/3"
                onClick={goNext}
              />

              <motion.div
                className="relative h-full w-full touch-pan-y"
                drag="x"
                dragControls={dragControls}
                dragListener={false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                dragMomentum={false}
                style={{ x: dragX, willChange: 'transform' }}
                onPointerDown={(event) => {
                  const target = event.target as HTMLElement;
                  if (target.closest('button')) return;
                  dragControls.start(event);
                }}
                onDragEnd={handleDragEnd}
              >
                {items.map((item, index) => {
                  const position = getRelativeIndex(index, activeIndex, items.length);
                  const isActive = position === 0;
                  const isSide = position === -1 || position === 1;
                  const x = position === 2 ? 0 : position * cardOffset;
                  const rotate = isActive ? 0 : position === -1 ? -6 : 6;
                  const scale = isActive ? 1 : isSide ? 0.92 : 0.86;
                  const opacity = isActive ? 1 : isSide ? 0.58 : 0;
                  const y = isActive ? 0 : isSide ? 16 : 24;

                  return (
                    <motion.article
                      key={item.id}
                      className={`absolute left-1/2 top-1/2 w-full max-w-[420px] -translate-x-1/2 -translate-y-1/2 ${
                        isActive ? 'z-30' : 'z-10'
                      }`}
                      style={{ width: cardWidth, pointerEvents: isActive ? 'auto' : 'none' }}
                      animate={{ x, y, rotate, scale, opacity }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0.01 }
                          : { duration: 0.48, ease: easeOutCubic }
                      }
                      aria-label={`Пицца ${item.name}`}
                    >
                      <div className="relative h-[64dvh] max-h-[560px] min-h-[440px] overflow-hidden rounded-[26px] border border-sand/20 bg-black/55 shadow-[0_18px_42px_rgba(0,0,0,0.45)] backdrop-blur-lg">
                        <div className="pointer-events-none absolute inset-0 rounded-[26px] border border-sunset/45" />

                        <div className="flex h-full flex-col p-4">
                          <div className="relative min-h-0 flex-[0_0_62%] overflow-hidden rounded-[18px] bg-black/45">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              priority={index === activeIndex}
                              sizes="100vw"
                              className="object-contain p-3"
                            />
                          </div>

                          <div className="mt-3 min-h-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-heading text-[clamp(1.2rem,5.8vw,2rem)] uppercase text-white">
                                {item.name}
                              </h3>
                              <span className="shrink-0 rounded-md bg-sunset px-2 py-1 font-body text-sm font-semibold text-white">
                                {item.priceRub} ₽
                              </span>
                            </div>
                            <p className="mt-2 line-clamp-2 font-body text-sm text-sand/90">
                              {item.ingredients.join(' • ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}

                <div className="pointer-events-none absolute inset-y-0 left-2 z-20 flex items-center">
                  <span className="text-5xl text-sand/70 drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">‹</span>
                </div>
                <div className="pointer-events-none absolute inset-y-0 right-2 z-20 flex items-center">
                  <span className="text-5xl text-sand/70 drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)]">›</span>
                </div>
              </motion.div>

              <div className="pointer-events-none absolute bottom-2 left-0 right-0 z-30 flex items-center justify-center gap-1.5">
                {items.map((item, index) => (
                  <span
                    key={item.id}
                    className={`h-1.5 rounded-full transition-all ${
                      index === activeIndex ? 'w-6 bg-sunset' : 'w-2 bg-sand/35'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-4 grid min-h-0 flex-1 grid-cols-5 grid-rows-2 gap-3">
              {items.map((item, index) => (
                <article
                  key={item.id}
                  className={`flex min-h-0 flex-col overflow-hidden rounded-xl border bg-black/65 p-2 backdrop-blur-sm transition duration-200 ${
                    index === activeIndex
                      ? 'border-sunset/80 shadow-[0_0_20px_rgba(232,92,42,0.35)]'
                      : 'border-sand/35 hover:scale-[1.02] hover:border-sunset/80 hover:shadow-[0_0_20px_rgba(232,92,42,0.28)]'
                  }`}
                  aria-label={`Пицца ${item.name}`}
                >
                  <button
                    type="button"
                    className="contents text-left"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Выбрать пиццу ${item.name}`}
                  >
                    <div className="relative min-h-0 flex-[0_0_62%] rounded-md bg-black/45">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(min-width: 768px) 20vw, 100vw"
                        className="object-contain p-1.5"
                        priority={index < 2}
                      />
                    </div>
                    <div className="mt-2 min-h-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-heading text-[clamp(0.9rem,1.2vw,1.35rem)] uppercase text-white">
                          {item.name}
                        </h3>
                        <span className="rounded bg-sunset px-1.5 py-0.5 font-body text-[clamp(0.65rem,0.75vw,0.82rem)] font-semibold text-white">
                          {item.priceRub} ₽
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 font-body text-[clamp(0.62rem,0.78vw,0.85rem)] text-sand/90">
                        {item.ingredients.join(' • ')}
                      </p>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}