import { useEffect, useState, RefObject } from 'react';

interface ScrollAnimationOptions {
  target: RefObject<HTMLElement>;
  threshold?: number; // 0-1, percentage of element visible to trigger
  rootMargin?: string; // CSS margin-like string, e.g. "0px 0px -100px 0px"
}

export default function useScrollAnimation({
  target,
  threshold = 0.1,
  rootMargin = "0px"
}: ScrollAnimationOptions) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentTarget = target.current;
    if (!currentTarget) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(currentTarget);

    return () => {
      observer.unobserve(currentTarget);
    };
  }, [target, threshold, rootMargin]);

  return isVisible;
}
