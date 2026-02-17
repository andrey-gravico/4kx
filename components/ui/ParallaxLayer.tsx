'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface ParallaxLayerProps {
  children: React.ReactNode;
  /** Parallax intensity in px: higher = more movement */
  depth: number;
  /** Normalised pointer/tilt X value (-1 to 1) */
  px: number;
  /** Normalised pointer/tilt Y value (-1 to 1) */
  py: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function ParallaxLayer({
  children,
  depth,
  px,
  py,
  className = '',
  style,
}: ParallaxLayerProps) {
  const prefersReducedMotion = useReducedMotion();
  const intensity = prefersReducedMotion ? depth * 0.3 : depth;

  return (
    <motion.div
      className={className}
      style={style}
      animate={{
        x: px * intensity,
        y: py * intensity,
      }}
      transition={{ type: 'tween', ease: 'easeOut', duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
