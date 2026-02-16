'use client';

import { motion, useScroll, useReducedMotion } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-sunset z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
