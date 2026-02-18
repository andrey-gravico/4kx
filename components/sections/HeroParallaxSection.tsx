'use client';

import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePointerParallax } from '@/lib/hooks/usePointerParallax';
import { useTiltParallax } from '@/lib/hooks/useTiltParallax';
import SlantedMarquee from '@/components/sections/SlantedMarquee';

const MARQUEE_FIXED = 'Каждую неделю вечеринка!';
const MARQUEE_SCROLL =
  'DJ-сеты \u2022 Турниры по пиву \u2022 Стендап \u2022 Караоке \u2022 Квизы \u2022 Матчи';

export default function HeroParallaxSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pointer = usePointerParallax(containerRef);
  const prefersReducedMotion = useReducedMotion();
  const isTouchDevice =
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  const canAutoEnableTilt = (() => {
    if (!isTouchDevice || typeof DeviceOrientationEvent === 'undefined') {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DOE = DeviceOrientationEvent as any;
    return typeof DOE.requestPermission !== 'function';
  })();

  const mobile = isTouchDevice;
  const tilt = useTiltParallax(canAutoEnableTilt);

  const px = mobile ? tilt.x : pointer.x;
  const py = mobile ? tilt.y : pointer.y;
  const intensity = prefersReducedMotion ? 5 : 20;

  const jokeHover = prefersReducedMotion
    ? {}
    : { whileHover: { scale: 1.08 }, transition: { type: 'spring' as const, stiffness: 300, damping: 20 } };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen md:h-[100dvh] overflow-hidden touch-pan-y"
    >
      {/* ── Background: static, full screen ── */}
      <img
        src="/images/hero2mobile.png"
        alt="Hero mobile background"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center md:hidden pointer-events-none"
      />
      <div className="absolute inset-0 z-0 hidden md:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/bg2.png"
          alt="Пляж бухты Омега"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* ── Vignette overlay ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* ── Pivmaster: parallax only on him ── */}
      <motion.div
        className="absolute z-[5] inset-0 pointer-events-none hidden md:block"
        animate={{
          x: px * intensity,
          y: py * (intensity * 0.5),
        }}
        transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/pivmaster.png"
          alt="Пивмастер"
          className="absolute bottom-10 right-[-90%] md:right-[0%] lg:right-[-5%] h-[95%] md:h-[90%] lg:h-[105%] w-auto max-w-none object-contain object-right-bottom"
        />
      </motion.div>

      {/* ── Logo plashka (logo1.png) ── */}
      <motion.div
        className="absolute z-20 top-[-2%] left-[0%] md:top-[-12%] md:left-[12%]"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero2/logo1.png"
          alt="Чисто Крымская Харизма"
          className="w-[420px] md:w-[420px] lg:w-[950px] h-auto"
          style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))' }}
        />
        <p
          className="font-body text-black text-center font-bold lg:opacity-85 text-xl lg:text-3xl mt-[-20%] lg:mt-[-20%] ml-2 lg:ml-[17%] max-w-[360px]  lg:max-w-[700px] mx-auto rotate-357"
        >
          Бар самообслуживания с юмором,<br/> в котором вкусно!
        </p>
      </motion.div>

      {/* ── Joke 1: "Одно пиво — не пиво!" (joke1.png) ── */}
      <motion.div
        className="absolute z-20 right-[0%] bottom-[15%] md:right-[12%] md:bottom-[2%] cursor-pointer"
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
        {...jokeHover}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero2/joke1.png"
          alt="Одно пиво — не пиво!"
          className="w-[280px] md:w-[350px] lg:w-[580px] h-auto"
          style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}
        />
      </motion.div>

      {/* ── Joke 2: "Мы любим наших официантов..." (joke2.png) ── */}
      <motion.div
        className="absolute z-20 left-[2%] top-[27%] md:left-[8%] md:top-[40%] cursor-pointer"
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
        {...jokeHover}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero2/joke2.png"
          alt="Мы любим наших официантов, потому что это — вы!"
          className="w-[270px] md:w-[350px] lg:w-[460px] h-auto"
          style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}
        />
      </motion.div>

      {/* ── Slanted marquee ticker ── */}
      <SlantedMarquee fixedText={MARQUEE_FIXED} scrollText={MARQUEE_SCROLL} />

    </section>
  );
}



