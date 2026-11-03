import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import './HeroEditorial.css';

const categories = [
  {
    id: 'medicas',
    label: 'Unidades médicas',
    image: '/identity/hero2_Unidad_Medica.webp',
    imageDescription: 'Edificio de una unidad médica del IMSS en Sonora.',
    description: 'Un vistazo a las instalaciones médicas del IMSS en Sonora y al entorno donde las personas realizan su trabajo cotidiano.',
    tone: 'green',
  },
  {
    id: 'no-medicas',
    label: 'Unidades no médicas',
    image: '/identity/hero2_Unidad_No_Medica.webp',
    imageDescription: 'Edificio de una unidad no médica del IMSS en Sonora.',
    description: 'Los espacios administrativos y de trabajo también forman parte de la vida institucional del IMSS en Sonora.',
    tone: 'wine',
  },
  {
    id: 'personas',
    label: 'Personas',
    image: '/identity/hero2_Personas.webp',
    imageDescription: 'Personal de salud trabajando en equipo.',
    description: 'Las personas y los equipos de trabajo dan vida a los distintos espacios del IMSS. Esta mirada pone en primer plano su presencia cotidiana.',
    tone: 'gold',
  },
  {
    id: 'coordinacion',
    label: 'Coordinación',
    image: '/identity/hero2_Coordinacion.webp',
    imageDescription: 'Personas reunidas alrededor de una mesa de trabajo.',
    description: 'Una mirada a los espacios de encuentro, diálogo y trabajo compartido entre personas y equipos de la institución.',
    tone: 'neutral',
  },
] as const;

type CategoryId = typeof categories[number]['id'];

function CategoryIcon({ category }: { category: CategoryId }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {category === 'medicas' && <><path d="M14 43V8h20v35M5 43V20h9M34 20h9v23M3 43h42M20 8V3h8v5M24 12v8M20 16h8M20 43V32h8v11M19 25h2M27 25h2M8 26h3M8 33h3M37 26h3M37 33h3" /></>}
      {category === 'no-medicas' && <><path d="M9 43V5h22v38M31 18h9v25M5 43h39M16 12h2M23 12h2M16 20h2M23 20h2M16 28h2M23 28h2M18 43V35h6v8M35 25h1M35 32h1" /></>}
      {category === 'personas' && <><circle cx="24" cy="13" r="6" /><circle cx="8" cy="17" r="4" /><circle cx="40" cy="17" r="4" /><path d="M13 42v-6a11 11 0 0 1 22 0v6H13ZM3 37v-5a6 6 0 0 1 9-5M45 37v-5a6 6 0 0 0-9-5M3 37h6M39 37h6" /></>}
      {category === 'coordinacion' && <><circle cx="24" cy="25" r="7" /><circle cx="24" cy="7" r="4" /><circle cx="8" cy="40" r="4" /><circle cx="40" cy="40" r="4" /><path d="M24 11v7M19 30l-8 7M29 30l8 7" /></>}
    </svg>
  );
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{diagonal ? <path d="M4 20 20 4M4 4h16v16" /> : <path d="M3 12h17M14 6l6 6-6 6" />}</svg>;
}

export function HeroEditorial() {
  const id = useId();
  const rootRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectionVersion, setSelectionVersion] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const activeCategory = categories[activeIndex];
  const panelId = `${id}-description`;
  const tabId = (category: CategoryId) => `${id}-${category}`;
  const canRotate = inView && pageVisible && !reducedMotion && !paused && !interacting && !hasFocus;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => setReducedMotion(motionQuery.matches);
    const syncVisibility = () => setPageVisible(document.visibilityState === 'visible');
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(root);
    syncMotion();
    syncVisibility();
    motionQuery.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncVisibility);
    return () => {
      observer.disconnect();
      motionQuery.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncVisibility);
    };
  }, []);

  useEffect(() => {
    if (!canRotate) return;
    const timer = window.setInterval(() => setActiveIndex(index => (index + 1) % categories.length), 8000);
    return () => window.clearInterval(timer);
  }, [canRotate, selectionVersion]);

  function selectCategory(index: number) {
    setActiveIndex(index);
    setSelectionVersion(version => version + 1);
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % categories.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + categories.length) % categories.length;
    else if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && window.matchMedia('(max-width: 760px)').matches) nextIndex = (index + 2) % categories.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = categories.length - 1;
    else return;
    event.preventDefault();
    selectCategory(nextIndex);
    tabsRef.current[nextIndex]?.focus();
  }

  return (
    <section
      ref={rootRef}
      className="editorial-hero"
      id="inicio"
      aria-labelledby={`${id}-title`}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setHasFocus(false);
      }}
    >
      <div className="editorial-hero-stage">
        <div className="editorial-hero-photos" role="img" aria-label={activeCategory.imageDescription}>
          {categories.map((category, index) => (
            <img
              key={category.id}
              className={`editorial-hero-photo${index === activeIndex ? ' is-active' : ''}`}
              src={category.image}
              alt=""
              aria-hidden="true"
              decoding="async"
              fetchPriority={index === 0 ? 'high' : 'low'}
              style={{ objectPosition: category.id === 'personas' ? '64% center' : 'center' }}
            />
          ))}
        </div>
        <div className="editorial-hero-frame">
          <div className="editorial-hero-panel">
            <div className="editorial-hero-panel-top" aria-hidden="true"><span>IMSS · SONORA</span><Arrow diagonal /></div>
            <h1 id={`${id}-title`}>Jefatura de Servicios<br className="editorial-hero-title-break" /> de Desarrollo<br className="editorial-hero-title-break" /> de Personal</h1>
            <p className="editorial-hero-intro">Órgano de Operación Administrativa Desconcentrada Sonora del Instituto Mexicano del Seguro Social.</p>
            <div className="editorial-hero-panel-footer">
              <a className="editorial-hero-cta" href="#conoce">Conoce la JSDP <Arrow /></a>
              <img className="editorial-hero-logo" src="/identity/JSDP-Sonora-11.svg" alt="IMSS — JSDP Sonora" width="620" height="187" />
            </div>
          </div>
        </div>
      </div>

      <div className="editorial-hero-details">
        <div
          className="editorial-hero-categories"
          role="tablist"
          aria-label="Categorías de la JSDP"
          onPointerEnter={event => { if (event.pointerType !== 'touch') setInteracting(true); }}
          onPointerLeave={() => setInteracting(false)}
        >
          {categories.map((category, index) => (
            <button
              ref={element => { tabsRef.current[index] = element; }}
              key={category.id}
              id={tabId(category.id)}
              className={`editorial-hero-category editorial-hero-category--${category.tone}${index === activeIndex ? ' is-selected' : ''}`}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-controls={panelId}
              tabIndex={index === activeIndex ? 0 : -1}
              onClick={() => selectCategory(index)}
              onKeyDown={event => handleTabKey(event, index)}
            >
              <CategoryIcon category={category.id} />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        <div className="editorial-hero-description-frame">
          <div
            id={panelId}
            className="editorial-hero-description"
            role="tabpanel"
            aria-labelledby={tabId(activeCategory.id)}
            tabIndex={0}
          >
            <div key={activeCategory.id} className="editorial-hero-description-copy">
              <h2>{activeCategory.label}</h2>
              <p>{activeCategory.description}</p>
            </div>
          </div>
          {!reducedMotion && (
            <button className="editorial-hero-playback" type="button" onClick={() => setPaused(value => !value)}>
              <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{paused ? <path d="m5 3 8 5-8 5V3Z" /> : <path d="M4 3h3v10H4zM10 3h3v10h-3z" />}</svg>
              {paused ? 'Reanudar cambios' : 'Pausar cambios'}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
