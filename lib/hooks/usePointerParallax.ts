'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface ParallaxValues {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

export function usePointerParallax(containerRef: React.RefObject<HTMLElement | null>) {
  const [values, setValues] = useState<ParallaxValues>({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  const handleMove = useCallback(
    (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        setValues({
          x: Math.max(-1, Math.min(1, nx)),
          y: Math.max(-1, Math.min(1, ny)),
        });
      });
    },
    [containerRef],
  );

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => setValues({ x: 0, y: 0 }));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener('mousemove', handleMove, { passive: true });
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [containerRef, handleMove, handleLeave]);

  return values;
}
