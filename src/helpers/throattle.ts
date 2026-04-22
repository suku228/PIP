export const throttle = <T extends unknown[]>(
  fn: (...args: T) => void,
  delay: number,
): ((...args: T) => void) => {
  let lastCalled = 0; // ✅ timestamp, not boolean

  return (...args: T): void => {
    const now = Date.now();
    if (now - lastCalled >= delay) {
      lastCalled = now;
      fn(...args);
    }
  };
};