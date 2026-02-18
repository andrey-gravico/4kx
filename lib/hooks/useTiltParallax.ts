'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface TiltValues {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

/**
 * Returns normalised tilt values from DeviceOrientation (gyroscope).
 * Works on both iOS (after requestPermission) and Android (no permission needed).
 * `enabled` must be set to true — on iOS after user consent, on Android immediately.
 */
export function useTiltParallax(enabled: boolean) {
  const [values, setValues] = useState<TiltValues>({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  const handler = useCallback((e: DeviceOrientationEvent) => {
    const gamma = e.gamma ?? 0; // left-right tilt (-90..90)
    const beta = e.beta ?? 0;   // front-back tilt (-180..180)

    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      setValues({
        x: Math.max(-1, Math.min(1, gamma / 30)),
        y: Math.max(-1, Math.min(1, (beta - 45) / 30)),
      });
    });
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;
    if (typeof DeviceOrientationEvent === 'undefined') return;

    window.addEventListener('deviceorientation', handler, { passive: true });
    return () => {
      window.removeEventListener('deviceorientation', handler);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled, handler]);

  return values;
}
