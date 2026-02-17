'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

interface StickerCalloutProps {
  text: string;
  brushSrc: string;
  /** Position classes (e.g. 'left-4 bottom-32') */
  className?: string;
  /** Rotate the sticker (deg) */
  rotate?: number;
  /** Bold word to emphasise */
  boldWord?: string;
  animDelay?: number;
}

export default function StickerCallout({
  text,
  brushSrc,
  className = '',
  rotate = 0,
  boldWord,
  animDelay = 0.6,
}: StickerCalloutProps) {
  const prefersReducedMotion = useReducedMotion();

  // Split text to bold a specific word
  const renderText = () => {
    if (!boldWord) return text;
    const parts = text.split(boldWord);
    if (parts.length < 2) return text;
    return (
      <>
        {parts[0]}
        <strong className="font-extrabold">{boldWord}</strong>
        {parts[1]}
      </>
    );
  };

  return (
    <motion.div
      className={`absolute z-20 pointer-events-none ${className}`}
      style={{ rotate: `${rotate}deg` }}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: animDelay, ease: 'easeOut' }}
    >
      <div className="relative inline-block min-w-[280px] md:min-w-[360px] lg:min-w-[420px]">
        {/* Brush background — stretched to fill */}
        <div className="absolute -inset-x-8 -inset-y-4 md:-inset-x-10 md:-inset-y-5 z-0">
          <Image
            src={brushSrc}
            alt=""
            fill
            unoptimized
            className="object-fill"
            aria-hidden="true"
          />
        </div>
        <p
          className="relative z-10 font-body font-bold text-xl md:text-2xl lg:text-3xl text-black px-6 py-3 md:px-8 md:py-4 text-center leading-tight"
          style={{
            textShadow: '0 1px 2px rgba(255,255,255,0.3)',
          }}
        >
          {renderText()}
        </p>
      </div>
    </motion.div>
  );
}
