
export const motionProfiles = [
  { id: 'soft', name: 'Disolución serena', description: 'Una página aparece suavemente sobre la otra.', duration: 650 },
  { id: 'depth', name: 'Tarjeta con profundidad', description: 'La tarjeta se acerca y toma su lugar.', duration: 760 },
  { id: 'slide', name: 'Deslizamiento lateral', description: 'El movimiento cambia de sentido al regresar.', duration: 680 },
  { id: 'layers', name: 'Entrada por capas', description: 'Primero la fotografía; después, el formulario.', duration: 820 },
  { id: 'curtain', name: 'Apertura vertical', description: 'La tarjeta se abre desde su centro.', duration: 800 },
] as const;
export type MotionProfile = typeof motionProfiles[number]['id'];
export function isMotionProfile(value: unknown): value is MotionProfile {
  return motionProfiles.some(profile => profile.id === value);
}

const readyImages = new Map<string, Promise<void>>();
function prepareImage(src: string) {
  if (!readyImages.has(src)) {
    const image = new Image();
    image.decoding = 'async';
    image.src = src;
    readyImages.set(src, image.decode().catch(() => undefined));
  }
  return readyImages.get(src)!;
}
export function prepareRoute(pathname: string) {
  const images = pathname === '/inicio-sesion'
    ? ['Escultura_IMSS.webp', 'JSDP-Sonora-11.svg', 'Gobierno_de_Mexico_2024-2030.svg', 'Logotipo_del_IMSS.svg']
    : ['JSDP-Sonora-11.svg', 'hero2_Unidad_Medica.webp'];
  return Promise.all(images.map(name => prepareImage('/identity/' + name)));
}
export async function waitForRoute(pathname: string) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      Promise.all([prepareRoute(pathname), document.fonts.ready]),
      new Promise<void>(resolve => { timer = setTimeout(resolve, 800); }),
    ]);
  } finally { clearTimeout(timer); }
}

let entranceAnimations: Animation[] = [];
export function cancelEntrance() {
  entranceAnimations.forEach(animation => animation.cancel());
  entranceAnimations = [];
}
export function animateEntrance(profile: MotionProfile, login: boolean, reduced: boolean) {
  cancelEntrance();
  const animate = (selector: string, frames: Keyframe[], duration: number, delay = 0) => {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element || typeof element.animate !== 'function') return;
    const animation = element.animate(frames, { duration, delay, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'backwards' });
    entranceAnimations.push(animation);
  };
  const fade = [{ opacity: 0 }, { opacity: 1 }];
  if (reduced) animate('.route-scene', [{ opacity: .8 }, { opacity: 1 }], 120);
  else if (!login || profile === 'soft') animate(login ? '.login-card' : '.route-scene', fade, 650);
  else if (profile === 'depth') animate('.login-card', [{ opacity: 0, transform: 'scale(.965)' }, { opacity: 1, transform: 'scale(1)' }], 760);
  else if (profile === 'slide') animate('.login-card', [{ opacity: 0, transform: 'translateX(' + (innerWidth < 761 ? 12 : 32) + 'px)' }, { opacity: 1, transform: 'translateX(0)' }], 680);
  else if (profile === 'layers') {
    // The photo's existing rotation belongs to its frame; use the image inside it.
    animate('.login-photo img', fade, 680, 60);
    animate('.login-form-content', [{ opacity: 0, transform: 'translateX(16px)' }, { opacity: 1, transform: 'translateX(0)' }], 680, 140);
  } else animate('.login-card', [{ clipPath: 'inset(49% 0 round 24px)', opacity: 0 }, { clipPath: 'inset(0% 0 round 24px)', opacity: 1 }], 800);
  return Promise.all(entranceAnimations.map(animation => animation.finished.catch(() => undefined)));
}
