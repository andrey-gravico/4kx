'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Section from '@/components/Section';
import AnimatedLines from '@/components/ui/AnimatedLines';
import { manifest } from '@/lib/content';

export default function Manifest() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="manifest" bg="bg-omega-green">
      <div className="text-center">
        <motion.h2
          className="font-heading text-5xl md:text-7xl lg:text-8xl uppercase text-white mb-8 md:mb-12"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {manifest.heading}
        </motion.h2>
        <AnimatedLines
          lines={manifest.lines}
          className="space-y-2 md:space-y-3"
          lineClassName="font-body text-xl md:text-2xl lg:text-3xl text-white/90"
        />
      </div>
    </Section>
  );
}
