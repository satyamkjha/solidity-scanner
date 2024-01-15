import { useRef, useEffect } from "react";

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "-10px",
  threshold: 0.3,
};

export const useIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void
): React.RefObject<IntersectionObserver | null> => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, observerOptions);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return observerRef;
};
