import { useEffect, useState } from 'react';

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)' as const;

type MatchMedia = (query: string) => MediaQueryList;

function getMatchMedia(): MatchMedia | undefined {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return undefined;
  }

  return window.matchMedia.bind(window);
}

export function readReducedMotionPreference(
  matchMedia: MatchMedia | undefined,
): boolean {
  return matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false;
}

export function subscribeToReducedMotion(
  matchMedia: MatchMedia | undefined,
  onChange: (reducedMotion: boolean) => void,
): () => void {
  if (!matchMedia) {
    return () => undefined;
  }

  const mediaQuery = matchMedia(REDUCED_MOTION_QUERY);
  const handleChange = (event: MediaQueryListEvent) => {
    onChange(event.matches);
  };

  onChange(mediaQuery.matches);
  mediaQuery.addEventListener('change', handleChange);

  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
}

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(() =>
    readReducedMotionPreference(getMatchMedia()),
  );

  useEffect(() => {
    return subscribeToReducedMotion(getMatchMedia(), setReducedMotion);
  }, []);

  return reducedMotion;
}
