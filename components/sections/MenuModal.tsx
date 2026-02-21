'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ModalContentProps {
  isMobile: boolean;
  closeButtonRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}

const MOBILE_STORIES = ['/images/menu1.jpg', '/images/menu2.jpg', '/images/menu3.jpg'];

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const syncMobile = () => setIsMobile(mediaQuery.matches);

    syncMobile();
    mediaQuery.addEventListener('change', syncMobile);
    return () => mediaQuery.removeEventListener('change', syncMobile);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] bg-black/75"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContent
            key={`${isOpen}-${isMobile}`}
            isMobile={isMobile}
            closeButtonRef={closeButtonRef}
            onClose={onClose}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalContent({ isMobile, closeButtonRef, onClose }: ModalContentProps) {
  const [activeStory, setActiveStory] = useState(0);
  const [hasStoryError, setHasStoryError] = useState(false);
  const desktopCardRef = useRef<HTMLDivElement>(null);
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const rotateX = useSpring(rotateXTarget, { stiffness: 360, damping: 34, mass: 0.4 });
  const rotateY = useSpring(rotateYTarget, { stiffness: 360, damping: 34, mass: 0.4 });

  const goPrevStory = () => {
    setActiveStory((prev) => Math.max(prev - 1, 0));
  };

  const goNextStory = () => {
    setActiveStory((prev) => Math.min(prev + 1, MOBILE_STORIES.length - 1));
  };

  const handleDesktopMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !desktopCardRef.current) {
      return;
    }

    const rect = desktopCardRef.current.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;

    // Inverted tilt: pointer moves left/right => opposite side comes forward.
    rotateXTarget.set(ny * 2);
    rotateYTarget.set(-nx * 6);
  };

  const resetDesktopTilt = () => {
    rotateXTarget.set(0);
    rotateYTarget.set(0);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Nashe menu"
      drag="y"
      dragElastic={0.12}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.y) > 100 || Math.abs(info.velocity.y) > 800) {
          onClose();
        }
      }}
      className="relative w-screen h-[100dvh] bg-black overflow-hidden"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <motion.button
        ref={closeButtonRef}
        type="button"
        aria-label="Close menu"
        className="absolute top-[calc(env(safe-area-inset-top,0px)+8px)] right-2 md:right-9 z-40 w-9 h-9 md:w-16 md:h-16 rounded-full border-2 border-[#D4A843] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18),rgba(255,255,255,0)_45%),rgba(0,0,0,0.68)] text-white leading-none flex items-center justify-center shadow-[0_10px_28px_rgba(0,0,0,0.5)] backdrop-blur-sm"
        onClick={onClose}
        whileHover={{ scale: 1.08, rotate: 6 }}
        whileTap={{ scale: 0.94, rotate: -4 }}
        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6.25 6.25L17.75 17.75M17.75 6.25L6.25 17.75"
            stroke="#F7E8C2"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="10" stroke="#D4A843" strokeWidth="1.2" opacity="0.55" />
          <circle cx="7.3" cy="5.7" r="0.9" fill="#D4A843" opacity="0.85" />
          <circle cx="16.7" cy="18.3" r="0.9" fill="#D4A843" opacity="0.85" />
        </svg>
      </motion.button>

      {isMobile ? (
        <div className="relative w-full h-full pt-[calc(env(safe-area-inset-top,0px)+16px)] pb-[env(safe-area-inset-bottom,0px)]">
          <div className="absolute top-[calc(env(safe-area-inset-top,0px)+22px)] left-4 right-14 z-30 flex gap-1.5">
            {MOBILE_STORIES.map((story, index) => (
              <div
                key={story}
                className="h-1.5 flex-1 rounded-full bg-[color:var(--sand)]/45 overflow-hidden"
              >
                <div
                  className={`h-full w-full rounded-full ${index <= activeStory ? 'bg-[color:var(--sand)] shadow-[0_0_8px_rgba(232,92,42,0.45)]' : 'bg-transparent'}`}
                />
              </div>
            ))}
          </div>

          {hasStoryError ? (
            <div className="absolute inset-0 z-20 flex items-center justify-center text-white text-center px-6">
              Не удалось загрузить меню
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={MOBILE_STORIES[activeStory] ?? MOBILE_STORIES[0]}
                alt={`Menu story ${activeStory + 1}`}
                fill
                priority
                className="object-contain"
                onError={() => setHasStoryError(true)}
              />
            </div>
          )}

          <button
            type="button"
            aria-label="Previous story"
            className="absolute inset-y-0 left-0 w-1/2 z-20"
            onClick={goPrevStory}
          />
          <button
            type="button"
            aria-label="Next story"
            className="absolute inset-y-0 right-0 w-1/2 z-20"
            onClick={goNextStory}
          />
        </div>
      ) : (
        <motion.div
          ref={desktopCardRef}
          className="relative w-full h-full"
          onMouseMove={handleDesktopMouseMove}
          onMouseLeave={resetDesktopTilt}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 160, damping: 22, mass: 0.35 }}
          transformTemplate={({ rotateX, rotateY }) =>
            `perspective(1200px) rotateX(${rotateX}) rotateY(${rotateY})`
          }
          style={{ rotateX, rotateY }}
        >
          <Image
            src="/images/desctop_menu.jpg"
            alt="Desktop menu"
            fill
            priority
            className="object-contain"
          />
        </motion.div>
      )}
    </motion.div>
  );
}
