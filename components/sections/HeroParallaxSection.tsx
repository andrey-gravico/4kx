'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { usePointerParallax } from '@/lib/hooks/usePointerParallax';
import { useTiltParallax, requestTiltPermission } from '@/lib/hooks/useTiltParallax';
import HeroTitleBlock from '@/components/sections/HeroTitleBlock';
import StickerCallout from '@/components/sections/StickerCallout';
import SlantedMarquee from '@/components/sections/SlantedMarquee';
import TiltConsentToast from '@/components/sections/TiltConsentToast';

const MARQUEE_FIXED = 'Каждую неделю вечеринка!';
const MARQUEE_SCROLL =
  'DJ-сеты \u25B6 Турниры по пиву \u25B6 Стендап \u25B6 Караоке \u25B6 Квизы \u25B6 Матчи';

export default function HeroParallaxSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pointer = usePointerParallax(containerRef);
  const prefersReducedMotion = useReducedMotion();

  const [tiltEnabled, setTiltEnabled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const tilt = useTiltParallax(tiltEnabled);

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Parallax only moves pivmaster (point 8)
  const px = isMobile ? tilt.x : pointer.x;
  const py = isMobile ? tilt.y : pointer.y;
  const intensity = prefersReducedMotion ? 5 : 20;

  const handleTiltAccept = useCallback(async () => {
    const granted = await requestTiltPermission();
    setTiltEnabled(granted);
  }, []);

  const handleTiltDecline = useCallback(() => {
    setTiltEnabled(false);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ── Background: static, full screen (point 1, 8) ── */}
      <div className="absolute inset-0 z-0">
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

      {/* ── Pivmaster: parallax only on him, full screen height (point 7, 8) ── */}
      <motion.div
        className="absolute z-[5] inset-0 pointer-events-none"
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
          className="absolute bottom-0 right-0 h-full w-auto max-w-none object-contain object-right-bottom"
        />
      </motion.div>

      {/* ── Title block: z-index above pivmaster (point 4) ── */}
      <div className="absolute z-20 top-[6%] left-[3%] md:top-[8%] md:left-[5%]">
        <HeroTitleBlock
          titleSegments={[
            { text: 'Чисто ' },
            { text: 'Крымская', highlight: true },
            { text: ' Харизма' },
          ]}
          subtitle="Бар самообслуживания с юмором, в котором вкусно!"
        />
      </div>

      {/* ── Sticker right: "Одно пиво — не пиво!" (point 3 — swapped to right) ── */}
      <StickerCallout
        text="Одно пиво — не пиво!"
        brushSrc="/images/hero2/brush_sticker-right.png"
        className="right-[3%] bottom-[26%] md:right-[5%] md:bottom-[28%]"
        rotate={3}
        boldWord="не пиво!"
        animDelay={0.8}
      />

      {/* ── Sticker left: "Мы любим наших официантов..." (point 3 — swapped to left) ── */}
      <StickerCallout
        text="Мы любим наших официантов, потому что это — вы!"
        brushSrc="/images/hero2/brush-title.png"
        className="left-[3%] bottom-[16%] md:left-[5%] md:bottom-[20%]"
        rotate={-3}
        boldWord="вы!"
        animDelay={1.0}
      />

      {/* ── Slanted marquee ticker (point 2 — less slant) ── */}
      <SlantedMarquee fixedText={MARQUEE_FIXED} scrollText={MARQUEE_SCROLL} />

      {/* ── Tilt consent toast (mobile only) ── */}
      <TiltConsentToast
        onAccept={handleTiltAccept}
        onDecline={handleTiltDecline}
      />
    </section>
  );
}
