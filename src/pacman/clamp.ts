// Clamp number between two values with the following line:
export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}
