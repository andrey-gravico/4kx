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
      <div
        className="page-fit-content h-full w-full max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-8 flex flex-col justify-center"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 0.5rem)',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 0.5rem)',
        }}
      >
        <div className="text-center mb-4 md:mb-8">
          <motion.h2
            className="font-heading text-[clamp(2rem,5vw,5rem)] uppercase text-white mb-3 md:mb-6"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {location.heading}
          </motion.h2>
          <AnimatedLines
            lines={location.lines}
            className="space-y-1 md:space-y-2"
            lineClassName="font-body text-[clamp(0.95rem,2vw,1.5rem)] text-white/90"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 max-w-5xl mx-auto w-full">
          <motion.div
            className="border-2 md:border-3 border-white/20 overflow-hidden h-[clamp(260px,42vh,460px)] md:h-[clamp(280px,45vh,500px)]"
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

          <motion.div
            className="hidden md:flex border-3 border-white/20 overflow-hidden h-[clamp(280px,45vh,500px)] bg-omega-green/50 items-center justify-center"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-center p-6">
              <p className="font-heading text-3xl md:text-4xl text-white/60 uppercase">Фото фасада</p>
              <p className="font-body text-sm text-white/40 mt-2">Скоро здесь будет фото</p>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
