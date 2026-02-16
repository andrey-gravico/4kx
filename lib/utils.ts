export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Deterministic card rotations for "poster jitter"
export const cardRotations = [-3, 2, -2, 3];
