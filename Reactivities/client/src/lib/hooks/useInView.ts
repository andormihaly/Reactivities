import { useState, useEffect, useRef, type RefObject } from "react";

type UseInViewOptions = IntersectionObserverInit;

interface UseInViewResult {
   ref: RefObject<HTMLElement | null>;
  inView: boolean;
}

export function useInView(options?: UseInViewOptions): UseInViewResult {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return { ref, inView };
}
