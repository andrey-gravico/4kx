'use client';

import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePointerParallax } from '@/lib/hooks/usePointerParallax';
import { useTiltParallax } from '@/lib/hooks/useTiltParallax';
import SlantedMarquee from '@/components/sections/SlantedMarquee';
import MenuModal from '@/components/sections/MenuModal';

const MARQUEE_FIXED = 'Каждую неделю вечеринка!';
const MARQUEE_SCROLL =
  'DJ-сеты \u2022 Турниры по пиву \u2022 Стендап \u2022 Караоке \u2022 Квизы \u2022 Матчи';

export default function HeroParallaxSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pointer = usePointerParallax(containerRef);
  const prefersReducedMotion = useReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      id="hero-parallax"
      className="relative w-full h-screen md:h-[100dvh] overflow-hidden touch-pan-y"
    >
      {/* ── Фон ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
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

      {/* ── Виньетка поверх фона ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* ── Pivmaster: МУЖЧИНА С ПИВОМ (десктоп) ── */}
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

      {/* ── ЧИСТО КРЫМСКАЯ ХАРИЗМА ПЛАШКА (logo1.png) ── */}
      <motion.div
        className="absolute z-20 top-[-3%] left-[-10%] lg:top-[-12%] lg:left-[0%]"
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
      </motion.div>

      {/* ── Joke 1: "Одно пиво — не пиво!" (joke1.png) ── */}
      <motion.div
        className="absolute z-20 right-[-6%] bottom-[20%] lg:right-[12%] lg:bottom-[2%] cursor-pointer"
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
        {...jokeHover}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero2/joke1.png"
          alt="Одно пиво — не пиво!"
          className="w-[250px] lg:w-[580px] h-auto"
          style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}
        />
      </motion.div>

      {/* ── Joke 2: "Мы любим наших официантов..." (joke2.png) ── */}
      <motion.div
        className="absolute z-20 left-[0%] top-[17%] lg:left-[15%] lg:top-[25%] cursor-pointer"
        initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
        {...jokeHover}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero2/joke2.png"
          alt="Мы любим наших официантов, потому что это — вы!"
          className="w-[270px] lg:w-[480px] h-auto"
          style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}
        />
      </motion.div>

      {/* ── БЕГУЩАЯ СТРОКА> ── */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <motion.button
          type="button"
          className="pointer-events-auto whitespace-nowrap px-6 py-3 border-2 border-[#D4A843] bg-black/90 text-white font-heading text-xl lg:text-4xl uppercase tracking-wide shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
          onClick={() => setIsMenuOpen(true)}
          whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
        >
          Наше меню
        </motion.button>
      </div>

      <SlantedMarquee fixedText={MARQUEE_FIXED} scrollText={MARQUEE_SCROLL} />
      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

    </section>
  );
}



