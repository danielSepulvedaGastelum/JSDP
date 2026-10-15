export type ValuesMotionIntent = 'running' | 'static';

export type ValuesMotionEvent =
  | { readonly type: 'pause' }
  | { readonly type: 'show-static' }
  | { readonly type: 'resume'; readonly reducedMotion: boolean }
  | { readonly type: 'reduced-motion-changed'; readonly reducedMotion: boolean };

export function getInitialValuesMotionIntent(
  reducedMotion: boolean,
): ValuesMotionIntent {
  return reducedMotion ? 'static' : 'running';
}

export function transitionValuesMotion(
  currentIntent: ValuesMotionIntent,
  event: ValuesMotionEvent,
): ValuesMotionIntent {
  switch (event.type) {
    case 'pause':
    case 'show-static':
      return 'static';
    case 'resume':
      return event.reducedMotion ? 'static' : 'running';
    case 'reduced-motion-changed':
      return event.reducedMotion ? 'static' : currentIntent;
  }
}

export function getEffectiveRunning(
  intent: ValuesMotionIntent,
  reducedMotion: boolean,
): boolean {
  return intent === 'running' && !reducedMotion;
}
