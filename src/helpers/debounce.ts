// utils/debounce.ts
const debounce = <T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number = 500
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export default debounce;