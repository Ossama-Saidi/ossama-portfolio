/** Small helpers shared by services, directives and components. */
export const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = (): boolean =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));
