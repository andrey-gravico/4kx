'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

interface TiltValues {
  x: number; // -1 to 1
  y: number; // -1 to 1
}

/**
 * Returns normalised tilt values from DeviceOrientation.
 * `enabled` must be set to true by user consent (iOS requires explicit permission).
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

    window.addEventListener('deviceorientation', handler, { passive: true });
    return () => {
      window.removeEventListener('deviceorientation', handler);
      cancelAnimationFrame(raf.current);
    };
  }, [enabled, handler]);

  return values;
}

/**
 * Request DeviceOrientation permission on iOS 13+.
 * Returns true if permission was granted.
 */
export async function requestTiltPermission(): Promise<boolean> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const DOE = DeviceOrientationEvent as any;

  if (typeof DOE.requestPermission === 'function') {
    try {
      const result = await DOE.requestPermission();
      return result === 'granted';
    } catch {
      return false;
    }
  }

  // Non-iOS — permission not required
  return true;
}
