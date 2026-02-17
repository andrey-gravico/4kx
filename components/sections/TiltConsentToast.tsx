'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TiltConsentToastProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function TiltConsentToast({ onAccept, onDecline }: TiltConsentToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on mobile / touch devices
    const isMobile =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (isMobile) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    setVisible(false);
    onDecline();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-6 left-4 right-4 z-[100] flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-black/90 backdrop-blur-sm rounded-2xl px-5 py-4 max-w-sm w-full shadow-2xl border border-white/10">
            <p className="font-body text-sm text-white/90 mb-3">
              У нас классные анимации! Включить их?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleAccept}
                className="flex-1 bg-sunset text-white font-heading text-sm uppercase py-2 rounded-lg active:scale-95 transition-transform"
              >
                Включить
              </button>
              <button
                onClick={handleDecline}
                className="flex-1 bg-white/10 text-white/70 font-heading text-sm uppercase py-2 rounded-lg active:scale-95 transition-transform"
              >
                Нет
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
