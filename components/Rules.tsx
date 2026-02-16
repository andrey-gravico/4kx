'use client';

import Section from '@/components/Section';
import TiltCard from '@/components/ui/TiltCard';
import { rules } from '@/lib/content';
import { cardRotations } from '@/lib/utils';
import { motion, useReducedMotion } from 'framer-motion';

export default function Rules() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="rules" bg="bg-sand">
      <motion.h2
        className="font-heading text-5xl md:text-7xl uppercase text-black text-center mb-10 md:mb-16"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {rules.heading}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        {rules.cards.map((text, i) => (
          <TiltCard
            key={i}
            rotation={cardRotations[i]}
            index={i}
          >
            <p className="font-body text-lg md:text-xl leading-relaxed">
              {text}
            </p>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}
