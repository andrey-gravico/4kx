'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Section from '@/components/Section';
import AnimatedLines from '@/components/ui/AnimatedLines';
import Button from '@/components/ui/Button';
import { opening } from '@/lib/content';
import { socialLinks } from '@/lib/config';

export default function Opening() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="opening" bg="bg-sunset">
      <div className="text-center">
        <motion.h2
          className="font-heading text-5xl md:text-7xl lg:text-8xl uppercase text-white mb-8 md:mb-12"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {opening.heading}
        </motion.h2>
        <AnimatedLines
          lines={opening.lines}
          className="space-y-2 md:space-y-3"
          lineClassName="font-body text-xl md:text-2xl text-white/90"
        />
        <motion.div
          className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            variant="secondary"
            href={socialLinks.telegram}
            className="border-white text-white hover:bg-white hover:text-sunset"
          >
            {opening.telegramLabel}
          </Button>
          <Button
            variant="secondary"
            href={socialLinks.instagram}
            className="border-white text-white hover:bg-white hover:text-sunset"
          >
            {opening.instagramLabel}
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
