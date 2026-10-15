import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';

export function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || reducedMotion || typeof IntersectionObserver === 'undefined') return;

    try {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          element.classList.add('is-revealed');
          observer.disconnect();
        }
      }, { threshold: 0.08 });
      observer.observe(element);
      return () => observer.disconnect();
    } catch {
      // La mejora es opcional: el contenido nunca se oculta por defecto.
      return;
    }
  }, [reducedMotion]);

  return ref;
}
