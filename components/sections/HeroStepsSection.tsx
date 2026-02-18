'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { hero } from '@/lib/content';

// Hover animations per icon index
const iconHover = [
  // beer: shake left-right
  {
    whileHover: {
      rotate: [0, -8, 8, -6, 6, -3, 0],
      transition: { duration: 0.5 },
    },
  },
  // pizza: spin 360
  {
    whileHover: {
      rotate: 360,
      transition: { duration: 0.4, ease: 'easeInOut' as const },
    },
  },
  // rest: scale up
  {
    whileHover: {
      scale: 1.25,
      transition: { duration: 0.25, ease: 'easeOut' as const },
    },
  },
];

export default function HeroStepsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const show = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.55, delay, ease: 'easeOut' as const },
        };

  const staggerArrow = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, scale: 0.5 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { duration: 0.4, delay, ease: 'easeOut' as const },
        };

  return (
    <section
      ref={sectionRef}
      id="steps"
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
    >
      {/* ── Fullscreen background with parallax ── */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={prefersReducedMotion ? {} : { y: bgY }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.png"
          alt="ЧКХ — интерьер бара"
          className="absolute inset-0 w-full h-[120%] object-cover object-center"
        />
      </motion.div>

      {/* ── Vignette ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-16 md:py-24 text-center">
        {/* Section heading (H3, not H1 — H1 is in new hero) */}
        <motion.h3
          className="font-hero text-6xl lg:text-[9.5rem] leading-[0.85] uppercase text-textured"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))' }}
          {...show(0)}
        >
          {hero.title}
        </motion.h3>

        {/* Tagline */}
        <motion.p
          className="font-body text-lg lg:text-2xl text-white/80 mt-3 md:mt-5"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.8)' }}
          {...show(0.4)}
        >
          {hero.tagline}
        </motion.p>

        {/* ── Steps ── */}
        <motion.div
          className="mt-8 md:mt-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12"
          {...show(0.6)}
        >
          {hero.steps.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center">
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  className="cursor-pointer"
                  {...(prefersReducedMotion ? {} : iconHover[i])}
                >
                  <Image
                    src={step.icon}
                    alt={step.label}
                    width={300}
                    height={300}
                    unoptimized
                    className="w-24 h-24 md:w-36 md:h-36 lg:w-44 lg:h-44 object-contain"
                    style={{ filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.7)) drop-shadow(0 2px 6px rgba(0,0,0,0.9))' }}
                  />
                </motion.div>
                <p
                  className="font-heading text-4xl md:text-6xl lg:text-7xl text-white text-center"
                  style={{
                    textShadow: '0 6px 24px rgba(0,0,0,1), 0 3px 12px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,1)',
                  }}
                >
                  {step.label}
                </p>
              </div>

              {i < hero.steps.length - 1 && (
                <motion.div
                  className="my-3 md:my-0 md:mx-6 lg:mx-10 flex-shrink-0"
                  {...staggerArrow(0.8 + i * 0.15)}
                >
                  <Image
                    src="/icons/right.png"
                    alt="→"
                    width={300}
                    height={200}
                    unoptimized
                    className="hidden md:block w-36 h-24 lg:w-48 lg:h-32 object-contain"
                    style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.7)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))' }}
                  />
                  <Image
                    src="/icons/down.png"
                    alt="↓"
                    width={200}
                    height={300}
                    unoptimized
                    className="block md:hidden w-14 h-14 object-contain"
                    style={{ filter: 'drop-shadow(0 3px 12px rgba(0,0,0,0.7)) drop-shadow(0 1px 4px rgba(0,0,0,0.8))' }}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        {/* ── Buttons ── */}
        <motion.div
          className="mt-8 md:mt-35 flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-60 px-2"
          {...show(1.0)}
        >
          <a href="#location" className="relative group block">
            <div
              className="relative w-[200px] md:w-[260px] lg:w-[350px] aspect-[2.5/1] transition-transform duration-200 group-hover:scale-[1.04] group-active:scale-[0.97]"
              style={{ filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.6))' }}
            >
              <Image src="/icons/button1.png" alt="" fill unoptimized className="object-contain" />
              <span
                className="absolute inset-0 flex items-center justify-center font-heading font-medium text-xl md:text-2xl lg:text-[26px] uppercase text-black px-2"
                style={{ textShadow: '0 1px 3px rgba(255,255,255,0.4)' }}
              >
                {hero.locationButton}
              </span>
            </div>
          </a>

          <a href="/menu" className="relative group block">
            <div
              className="relative w-[200px] md:w-[260px] lg:w-[350px] aspect-[2.5/1] transition-transform duration-200 group-hover:scale-[1.04] group-active:scale-[0.97]"
              style={{ filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.6))' }}
            >
              <Image src="/icons/button2.png" alt="" fill unoptimized className="object-contain" />
              <span
                className="absolute inset-0 flex items-center justify-center font-heading text-xl md:text-2xl lg:text-[26px] uppercase text-white px-2"
                style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}
              >
                {hero.menuButton}
              </span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
