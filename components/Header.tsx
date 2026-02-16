'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { nav } from '@/lib/content';
import { cn } from '@/lib/utils';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        scrolled ? 'bg-black/90 backdrop-blur-sm' : 'bg-transparent'
      )}
    >
      {/* Progress bar takes h-[3px] above */}
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a
          href="/"
          className={cn(
            'font-heading text-2xl md:text-3xl uppercase tracking-wider',
            scrolled ? 'text-sand' : 'text-black'
          )}
        >
          {nav.logo}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'font-heading text-sm uppercase tracking-wide transition-colors duration-200 hover:text-sunset',
                scrolled ? 'text-sand' : 'text-black'
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Burger */}
        <button
          type="button"
          className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8 relative z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          <span
            className={cn(
              'block h-0.5 w-full transition-all duration-300 origin-center',
              menuOpen ? 'rotate-45 translate-y-2 bg-sand' : scrolled ? 'bg-sand' : 'bg-black'
            )}
          />
          <span
            className={cn(
              'block h-0.5 w-full transition-all duration-300',
              menuOpen ? 'opacity-0' : 'opacity-100',
              scrolled || menuOpen ? 'bg-sand' : 'bg-black'
            )}
          />
          <span
            className={cn(
              'block h-0.5 w-full transition-all duration-300 origin-center',
              menuOpen ? '-rotate-45 -translate-y-2 bg-sand' : scrolled ? 'bg-sand' : 'bg-black'
            )}
          />
        </button>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {nav.links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-heading text-3xl text-sand uppercase tracking-wide hover:text-sunset transition-colors"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
