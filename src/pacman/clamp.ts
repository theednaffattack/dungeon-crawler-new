// Clamp number between two values with the following line:

/**
 * Returns a supplied numeric expression constrained between the min and max value
 * @param num The value to be constrained.
 * @param min The minimum number allowed.
 * @param max The maximum number allowed.
 */
export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}
