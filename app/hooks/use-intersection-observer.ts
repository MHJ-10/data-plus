"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {},
) {
  const {
    threshold = 0,
    rootMargin = "0px",
    root = null,
    freezeOnceVisible = false,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const ref = useRef<Element | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const frozen = useRef(false);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (!entry) return;

      setEntry(entry);
      setIsIntersecting(entry.isIntersecting);

      if (freezeOnceVisible && entry.isIntersecting) {
        frozen.current = true;
        observer.current?.disconnect();
      }
    },
    [freezeOnceVisible],
  );

  // This is the key improvement: callback ref that reacts to node changes
  const setRef = useCallback(
    (node: Element | null) => {
      const previousNode = ref.current;

      // Cleanup previous
      if (previousNode && observer.current) {
        observer.current.unobserve(previousNode);
      }

      ref.current = node;

      // Observe new node
      if (node && !frozen.current) {
        if (!observer.current) {
          observer.current = new IntersectionObserver(callback, {
            threshold,
            rootMargin,
            root,
          });
        }
        observer.current.observe(node);
      }
    },
    [callback, threshold, rootMargin, root],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      observer.current?.disconnect();
      observer.current = null;
    };
  }, []);

  return {
    ref: setRef,
    isIntersecting,
    entry,
  };
}
