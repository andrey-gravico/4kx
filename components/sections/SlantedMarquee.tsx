'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SlantedMarqueeProps {
  /** Fixed prefix text (stays visible) */
  fixedText: string;
  /** Scrolling marquee text */
  scrollText: string;
}

export default function SlantedMarquee({ fixedText, scrollText }: SlantedMarqueeProps) {
  const prefersReducedMotion = useReducedMotion();
  const [scrollDuration] = useState(() => {
    if (typeof window === 'undefined') {
      return 50;
    }

    return window.innerWidth < 768 ? 25 : 50;
  });

  // Repeat scrolling text for seamless loop
  const repeated = Array(8).fill(scrollText).join('  \u2022  ');

  return (
    <div
      className="absolute bottom-7 md:bottom-6 left-0 right-0 md:left-[-2%] md:right-[-2%] z-30 overflow-hidden pointer-events-none"
      style={{ transform: 'rotate(-1deg)', transformOrigin: 'center bottom', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* SVG slanted bar background */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect width="1440" height="60" fill="#111111" opacity="0.9" />
        {/* Gold top border */}
        <rect width="1440" height="3" fill="#D4A843" />
        {/* Gold bottom border */}
        <rect y="57" width="1440" height="3" fill="#D4A843" />
      </svg>

      <div className="relative py-3 md:py-4 flex items-center">
        {/* Fixed prefix */}
        <span className="relative z-10 font-body font-extrabold text-xs md:text-base lg:text-lg text-white tracking-wide uppercase pl-3 md:pl-4 lg:pl-35 pr-2 md:pr-3 whitespace-nowrap flex-shrink-0">
          {fixedText}
          <span className="ml-2 text-[#D4A843]">&bull;</span>
        </span>

        {/* Scrolling part */}
        <div className="overflow-hidden flex-1">
          <motion.div
            className="flex whitespace-nowrap"
            animate={
              prefersReducedMotion
                ? {}
                : { x: ['0%', '-50%'] }
            }
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: scrollDuration,
                ease: 'linear',
              },
            }}
          >
            <span className="font-body font-bold text-xs md:text-base lg:text-lg text-[#D4A843] tracking-widest uppercase">
              {repeated}
            </span>
            <span className="font-body font-bold text-xs md:text-base lg:text-lg text-[#D4A843] tracking-widest uppercase ml-4">
              {repeated}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

