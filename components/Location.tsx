'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Section from '@/components/Section';
import AnimatedLines from '@/components/ui/AnimatedLines';
import { location } from '@/lib/content';
import { mapConfig } from '@/lib/config';

export default function Location() {
  const prefersReducedMotion = useReducedMotion();

  const yandexMapSrc = `https://yandex.ru/map-widget/v1/?ll=${mapConfig.lon}%2C${mapConfig.lat}&z=${mapConfig.zoom}&l=map&pt=${mapConfig.lon}%2C${mapConfig.lat}%2Cpm2rdm`;

  return (
    <Section id="location" bg="bg-deep-sea">
      <div className="text-center mb-10 md:mb-14">
        <motion.h2
          className="font-heading text-5xl md:text-7xl lg:text-8xl uppercase text-white mb-8 md:mb-12"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {location.heading}
        </motion.h2>
        <AnimatedLines
          lines={location.lines}
          className="space-y-2 md:space-y-3"
          lineClassName="font-body text-xl md:text-2xl text-white/90"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
        {/* Yandex Map */}
        <motion.div
          className="border-3 border-white/20 overflow-hidden aspect-[4/3]"
          initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <iframe
            src={yandexMapSrc}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
            title="Карта — Бухта Омега, Севастополь"
            className="w-full h-full"
            loading="lazy"
          />
        </motion.div>

        {/* Facade placeholder */}
        <motion.div
          className="border-3 border-white/20 overflow-hidden aspect-[4/3] bg-omega-green/50 flex items-center justify-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-center p-6">
            <p className="font-heading text-3xl md:text-4xl text-white/60 uppercase">
              Фото фасада
            </p>
            <p className="font-body text-sm text-white/40 mt-2">
              Скоро здесь будет фото
            </p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
