'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

interface HeroTitleBlockProps {
  /** Pass as array of segments: [{text, highlight?}] or a plain string */
  titleSegments: { text: string; highlight?: boolean }[];
  subtitle: string;
}

export default function HeroTitleBlock({ titleSegments, subtitle }: HeroTitleBlockProps) {
  const prefersReducedMotion = useReducedMotion();

  const show = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: 'easeOut' as const },
        };

  return (
    <div className="relative max-w-[90vw] md:max-w-[600px] lg:max-w-[750px]">
      {/* Brush underlay — stretches to cover all text */}
      <div className="absolute -inset-x-6 -inset-y-4 md:-inset-x-10 md:-inset-y-6 z-0 pointer-events-none">
        <Image
          src="/images/hero2/brush-title.png"
          alt=""
          fill
          unoptimized
          className="object-fill"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 px-6 py-4 md:px-10 md:py-6">
        <motion.h1
          className="font-hero text-[2rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[0.95] uppercase text-white"
          style={{
            textShadow: '0 4px 16px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.9)',
          }}
          {...show(0.2)}
        >
          {titleSegments.map((seg, i) =>
            seg.highlight ? (
              <span key={i} className="text-[#D4A843]">{seg.text}</span>
            ) : (
              <span key={i}>{seg.text}</span>
            ),
          )}
        </motion.h1>

        <motion.h2
          className="font-body text-sm md:text-lg lg:text-xl text-white/90 mt-2 md:mt-3 max-w-md"
          style={{
            textShadow: '0 2px 8px rgba(0,0,0,0.7)',
          }}
          {...show(0.5)}
        >
          {subtitle}
        </motion.h2>
      </div>
    </div>
  );
}
