import React, { useEffect, useRef } from "react";

// Опишіть Props
type Props = {
  children: React.ReactNode;
  onContentEndVisible(): void;
};

export function Observer({ children, onContentEndVisible }: Props) {
  // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    class IntersectionObserverOptions {
      root?: Element | null;
      rootMargin?: string;
      threshold?: number | number[];

      constructor(options?: {
        root?: Element | null;
        rootMargin?: string;
        threshold?: number | number[];
      }) {
        this.root = options?.root || null;
        this.rootMargin = options?.rootMargin || "0px";
        this.threshold = options?.threshold || 0;
      }
    }
    const options = new IntersectionObserverOptions({
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
