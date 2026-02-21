'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Наше меню"
            drag="y"
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 800) {
                onClose();
              }
            }}
            className="relative w-screen h-[100dvh] md:w-[75vw] md:h-[75vh] md:max-w-[1200px] bg-black/90 border-2 border-[#D4A843] md:rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Закрыть меню"
              className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full border border-[#D4A843] bg-black/80 text-white text-2xl leading-none flex items-center justify-center"
              onClick={onClose}
            >
              ×
            </button>

            <div className="relative w-full h-full">
              <Image
                src="/images/menu.webp"
                alt="Наше меню"
                fill
                priority
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
