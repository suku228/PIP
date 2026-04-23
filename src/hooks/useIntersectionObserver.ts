import { useEffect,  type RefObject } from "react";
// import { throttle } from "../helpers/throattle";

interface IntersectionOptions {
  root?: RefObject<HTMLDivElement | null>;
  rootMargin?: string;
  threshold?: number;
  throttleDelay?: number;
}

export const useIntersectionObserver = (
  targetRef: RefObject<HTMLDivElement | null>,
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionOptions = {},
): void => {
  const {
    root,
    rootMargin = "100px",
    threshold = 1.0,
    throttleDelay = 1000,
  } = options;

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    //  const throttledFn = throttle(
    //   (entries: IntersectionObserverEntry[]) => callback(entries),
    //   throttleDelay,
    // );

    const observer = new IntersectionObserver(callback, {
      root: root?.current ?? null,
      rootMargin,
      threshold,
    });

    observer.observe(el);

    return () => observer.disconnect(); //  old observer cleaned up
  }, [ callback, rootMargin, threshold, throttleDelay]);
};