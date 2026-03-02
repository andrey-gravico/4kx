'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { hero } from '@/lib/content';

const iconHover = [
  { whileHover: { rotate: [0, -8, 8, -6, 6, -3, 0], transition: { duration: 0.5 } } },
  { whileHover: { rotate: 360, transition: { duration: 0.4, ease: 'easeInOut' as const } } },
  { whileHover: { scale: 1.25, transition: { duration: 0.25, ease: 'easeOut' as const } } },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const show = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.55, delay, ease: 'easeOut' as const },
        };

  const staggerArrow = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, scale: 0.5 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { duration: 0.4, delay, ease: 'easeOut' as const },
        };

  return (
    <section id="hero" className="relative w-full h-full overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.png"
          alt="CHKH bar interior"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      <div
        className="page-fit-content relative z-10 flex flex-col items-center justify-center flex-1 px-4 py-[clamp(1rem,3vh,2.5rem)] text-center"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + clamp(0.4rem, 1.5vh, 1rem))',
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + clamp(0.4rem, 1.5vh, 1rem))',
        }}
      >
        <motion.h3
          className="font-hero text-[clamp(2.8rem,8vw,9.5rem)] leading-[0.85] uppercase text-textured"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))' }}
          {...show(0)}
        >
          {hero.title}
        </motion.h3>

        <motion.p
          className="font-body text-[clamp(1rem,2.2vw,1.5rem)] text-white/80 mt-3 md:mt-4"
          style={{ textShadow: '0 1px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.8)' }}
          {...show(0.4)}
        >
          {hero.tagline}
        </motion.p>

        <motion.div
          className="mt-[clamp(1rem,4vh,3rem)] flex flex-col lg:flex-row items-center justify-center lg:gap-6"
          {...show(0.6)}
        >
          {hero.steps.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center">
              <div className="flex flex-col items-center gap-3">
                <motion.div className="cursor-pointer" {...(prefersReducedMotion ? {} : iconHover[i])}>
                  <Image
                    src={step.icon}
                    alt={step.label}
                    width={300}
                    height={300}
                    unoptimized
                    className="w-[clamp(4.8rem,9vw,9rem)] h-[clamp(4.8rem,9vw,9rem)] object-contain"
                    style={{ filter: 'drop-shadow(0 6px 24px rgba(0,0,0,0.7)) drop-shadow(0 2px 6px rgba(0,0,0,0.9))' }}
                  />
                </motion.div>
                <p
                  className="font-heading text-[clamp(1.4rem,3.2vw,2.3rem)] text-white text-center"
                  style={{ textShadow: '0 6px 24px rgba(0,0,0,1), 0 3px 12px rgba(0,0,0,1), 0 1px 4px rgba(0,0,0,1)' }}
                >
                  {step.label}
                </p>
              </div>

              {i < hero.steps.length - 1 && (
                <motion.div className="my-3 md:my-0 md:mx-6 lg:mx-10 flex-shrink-0" {...staggerArrow(0.8 + i * 0.15)}>
                  <Image
                    src="/icons/right.png"
                    alt="right"
                    width={300}
                    height={200}
                    unoptimized
                    className="hidden md:block w-[clamp(8rem,14vw,12rem)] h-auto object-contain"
                    style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.7)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))' }}
                  />
                  <Image
                    src="/icons/down.png"
                    alt="down"
                    width={200}
                    height={300}
                    unoptimized
                    className="block md:hidden w-[clamp(2.6rem,7vw,3.6rem)] h-auto object-contain"
                    style={{ filter: 'drop-shadow(0 3px 12px rgba(0,0,0,0.7)) drop-shadow(0 1px 4px rgba(0,0,0,0.8))' }}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-[clamp(1rem,5vh,6rem)] flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-8 lg:gap-20 px-2"
          {...show(1.0)}
        >
          <a href="#location" className="relative group block">
            <div
              className="relative w-[250px] lg:w-[350px] aspect-[2.5/1] transition-transform duration-200 group-hover:scale-[1.04] group-active:scale-[0.97]"
              style={{ filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.6))' }}
            >
              <Image src="/icons/button1.png" alt="" fill unoptimized className="object-contain" />
              <span
                className="absolute inset-0 flex items-center justify-center font-body font-bold text-xl md:text-2xl lg:text-[26px] uppercase text-black px-2"
                style={{ textShadow: '0 1px 3px rgba(255,255,255,0.4)' }}
              >
                {hero.locationButton}
              </span>
            </div>
          </a>

          <a href="#menu" className="relative group block">
            <div
              className="relative w-[250px] lg:w-[350px] aspect-[2.5/1] transition-transform duration-200 group-hover:scale-[1.04] group-active:scale-[0.97]"
              style={{ filter: 'drop-shadow(0 8px 28px rgba(0,0,0,0.6))' }}
            >
              <Image src="/icons/button2.png" alt="" fill unoptimized className="object-contain" />
              <span
                className="absolute inset-0 flex items-center justify-center font-body font-bold text-xl md:text-2xl lg:text-[26px] uppercase text-white px-2"
                style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}
              >
                {hero.menuButton}
              </span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}