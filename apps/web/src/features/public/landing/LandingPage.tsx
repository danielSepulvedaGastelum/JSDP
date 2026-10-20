import { Fragment, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import type { OrgChart, OrgChartNode } from 'd3-org-chart';

type IconName =
  | 'arrow'
  | 'audit'
  | 'budget'
  | 'check'
  | 'chevron'
  | 'discipline'
  | 'document'
  | 'empathy'
  | 'handshake'
  | 'heart'
  | 'idea'
  | 'integrity'
  | 'login'
  | 'loyalty'
  | 'people'
  | 'person'
  | 'roadmap'
  | 'settings'
  | 'solidarity'
  | 'target'
  | 'training'
  | 'vision'
  | 'zoomIn'
  | 'zoomOut'
  | 'zoomFit';

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h13"/><path d="m14 7 5 5-5 5"/></>,
    audit: <><path d="M5 3h9l4 4v6"/><path d="M14 3v5h5M5 3v18h7"/><circle cx="17" cy="17" r="3"/><path d="m19.2 19.2 2.3 2.3M8 11h6M8 15h3"/></>,
    budget: <><ellipse cx="9" cy="6" rx="6" ry="3"/><path d="M3 6v4c0 1.7 2.7 3 6 3 1.1 0 2.1-.1 3-.4M3 10v4c0 1.7 2.7 3 6 3"/><ellipse cx="16" cy="16" rx="5" ry="2.5"/><path d="M11 16v3c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-3"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    chevron: <path d="m9 6 6 6-6 6"/>,
    discipline: <><path d="M3 21h18M5 16h3v5H5zM10.5 12h3v9h-3zM16 7h3v14h-3z"/><path d="M3 4v17"/></>,
    document: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></>,
    empathy: <><path d="M4 13.5V8a2 2 0 0 1 4 0v4"/><path d="M8 11V6.5a2 2 0 0 1 4 0V11"/><path d="M12 10V7.5a2 2 0 0 1 4 0V12"/><path d="M16 11a2 2 0 0 1 4 0v3c0 4.4-3.6 8-8 8h-1a7 7 0 0 1-7-7v-1.5"/><path d="M4 13.5a2 2 0 0 1 3.4-1.4L10 15"/></>,
    handshake: <><path d="m3 12 4-4 4 2 2-1 8 7-3 3-3-1-2 2-3-2-2 1-5-5Z"/><path d="m8 13 3 3M11 11l5 5M14 10l5 5"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
    idea: <><path d="M9 18h6M10 22h4M8 14c-1.3-1.1-2-2.6-2-4.2A6 6 0 0 1 18 10c0 1.6-.7 3.1-2 4.2-.7.6-1 1.1-1 1.8H9c0-.7-.3-1.2-1-2Z"/><path d="M12 1v2M3.5 4.5 5 6M21 10h-2M19.5 4.5 18 6M5 10H3"/></>,
    integrity: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>,
    login: <><path d="M14 3h6v18h-6"/><path d="M3 12h12M10 7l5 5-5 5"/></>,
    loyalty: <><circle cx="12" cy="9" r="5"/><circle cx="12" cy="9" r="2.25"/><path d="m8.8 13.2-2 8.8 5.2-3 5.2 3-2-8.8"/></>,
    people: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 14a5 5 0 0 1 6 4.9V20"/></>,
    person: <><circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/></>,
    roadmap: <><path d="M5 21V5M19 21V9"/><path d="M5 6h9l-2-3M19 10h-9l2-3"/></>,
    settings: <><path d="M9.5 3h5l.7 2.2 2 .8 2.1-1 2.5 4.3-1.8 1.5v2.4l1.8 1.5-2.5 4.3-2.1-1-2 .8-.7 2.2h-5l-.7-2.2-2-.8-2.1 1-2.5-4.3L4 13.2v-2.4L2.2 9.3 4.7 5l2.1 1 2-.8L9.5 3Z"/><circle cx="12" cy="12" r="3"/></>,
    solidarity: <><circle cx="12" cy="7" r="3"/><circle cx="5" cy="9" r="2"/><circle cx="19" cy="9" r="2"/><path d="M7.5 20v-2.2a4.5 4.5 0 0 1 9 0V20M2 19v-1.4A3.6 3.6 0 0 1 6.5 14M22 19v-1.4a3.6 3.6 0 0 0-4.5-3.5"/></>,
    target: <><circle cx="10" cy="14" r="7.5"/><circle cx="10" cy="14" r="4.25"/><circle cx="10" cy="14" r="1.25"/><path d="m11 13 9-9M15.5 4H20v4.5"/></>,
    training: <><path d="M4 5h16v13H4zM8 22h8M12 18v4"/><path d="m9 13 2-2 2 2 3-4"/></>,
    vision: <><path d="M2.5 20 10 7l3.2 5.4 2-3.1L21.5 20h-19Z"/><path d="m7.9 10.7 2.1 2 1.7-1.4M10 7V2.5M10 2.5h6l-1.8 2 1.8 2h-6"/></>,
    zoomIn: <><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5M10 7v6M7 10h6"/></>,
    zoomOut: <><circle cx="10" cy="10" r="6"/><path d="m15 15 5 5M7 10h6"/></>,
    zoomFit: <><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/><path d="m3 8 5-5M21 8l-5-5M3 16l5 5M21 16l-5 5"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

const values = [
  ['Solidaridad', 'Apoyo mutuo para un mejor servicio', 'solidarity'],
  ['Compromiso', 'Dedicación para cumplir nuestros objetivos', 'handshake'],
  ['Integridad', 'Actuar con honestidad y transparencia', 'integrity'],
  ['Lealtad', 'Corresponsabilidad con el IMSS y su misión', 'loyalty'],
  ['Innovación', 'Mejora continua en beneficio de las personas', 'idea'],
  ['Empatía', 'Escucha y respeto a las necesidades de nuestra gente', 'heart'],
  ['Disciplina', 'Cumplir con responsabilidad nuestros deberes', 'discipline'],
] as const;

type OrgNode = {
  id: string;
  title: string;
  person: string;
  label: 'Titular' | 'Encargada';
  tone: 'green' | 'wine' | 'gold' | 'mint' | 'sage' | 'slate';
  icon: IconName;
};

type OrgChartDatum = OrgNode & {
  parentId: string | null;
};

const orgNodes: OrgNode[] = [
  { id: 'jefatura', title: 'Jefatura de Servicios de Desarrollo de Personal', person: 'Lic. Nitza Nubia Flores Lastra', label: 'Titular', tone: 'green', icon: 'person' },
  { id: 'auditorias', title: 'Oficina de Información y Seguimiento de Auditorías', person: 'Lic. Nelia Guadalupe Ayón Palma', label: 'Titular', tone: 'wine', icon: 'audit' },
  { id: 'personal', title: 'Departamento de Personal Delegacional', person: 'Lic. Juan Eduardo Ramírez Lucero', label: 'Titular', tone: 'gold', icon: 'people' },
  { id: 'presupuesto', title: 'Departamento de Presupuesto y Control del Gasto', person: 'Lic. Rossana Haydee Bastidas Soto', label: 'Titular', tone: 'mint', icon: 'budget' },
  { id: 'relaciones', title: 'Jefe del Departamento de Relaciones Laborales', person: 'Lic. Miguel Arturo Munguia Encinas', label: 'Titular', tone: 'sage', icon: 'handshake' },
  { id: 'capacitacion', title: 'Departamento de Capacitación', person: 'Lic. Elizabeth Martell Lucero', label: 'Encargada', tone: 'slate', icon: 'training' },
];

const orgChartData: OrgChartDatum[] = orgNodes.map((node, index) => ({
  ...node,
  parentId: index === 0 ? null : 'jefatura',
}));

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character] ?? character);
}

function renderOrgChartNode(node: OrgChartNode<OrgChartDatum>, selectedId: string) {
  const data = node.data;
  const selectedClass = data.id === selectedId ? ' is-selected' : '';
  return `<div class="d3-org-card tone-${data.tone}${selectedClass}" data-org-node-id="${escapeHtml(data.id)}">
    <div class="d3-org-card-head">
      <strong>${escapeHtml(data.title)}</strong>
      <span class="d3-org-card-action" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h13"/><path d="m14 7 5 5-5 5"/></svg></span>
    </div>
    <div class="d3-org-card-person"><small>${escapeHtml(data.label)}:</small><span>${escapeHtml(data.person)}</span></div>
  </div>`;
}

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <a className="brand" href="#inicio" aria-label="IMSS, volver al inicio">
      <img src="/identity/Logotipo_del_IMSS.svg" alt="Instituto Mexicano del Seguro Social" />
      {!compact && <span>JSDP · OOAD 27 Sonora</span>}
    </a>
  );
}

function PendingBadge({ compact = false }: { compact?: boolean }) {
  return <span className={`pending-badge ${compact ? 'compact' : ''}`}>Próximamente</span>;
}

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <BrandLogo />
        <div className="header-actions" aria-label="Funciones próximas">
          <span className="header-action" aria-label="Documentos, próximamente"><Icon name="document" size={19}/><span><strong>Documentos</strong><small>Próximamente</small></span></span>
          <span className="header-action" aria-label="Iniciar sesión, próximamente"><Icon name="login" size={19}/><span><strong>Iniciar sesión</strong><small>Próximamente</small></span></span>
        </div>
      </div>
    </header>
  );
}

function NetworkGraphic() {
  return (
    <div className="network" role="img" aria-label="Composición visual institucional de la JSDP en Sonora">
      <img className="sonora-shape" src="/identity/Silueta_Sonora-verde.png" alt="" aria-hidden="true" />
      <svg className="network-lines" viewBox="0 0 520 420" aria-hidden="true">
        <g className="network-gold-connections">
          <path className="network-gold-line" d="M135 45Q176 4 222 43"/>
          <path className="network-gold-line" d="M100 98A150 150 0 0 0 205 260"/>
          <path className="network-gold-line" d="M205 250Q174 280 145 320"/>
        </g>
        <g className="network-green-connections">
          <path className="network-green-line network-green-line-medical" d="M148 93C178 99 202.67 121.67 210 141"/>
          <path className="network-green-line network-green-line-offices" d="M360 102C333 104 315 116 302 139"/>
          <path className="network-green-line network-green-line-coordination" d="M260 276C258 305 234 334 206 345"/>
        </g>
        <g className="network-neutral-points">
          <circle className="network-gray-point" cx="174.5" cy="282.5" r="5"/>
        </g>
        <g className="network-green-points">
          <circle className="network-green-point" cx="222" cy="43" r="6"/>
          <circle className="network-green-point" cx="187.5" cy="112" r="7.5"/>
          <circle className="network-green-point" cx="326" cy="113.5" r="7.5"/>
          <circle className="network-green-point" cx="123" cy="198" r="6.5"/>
          <circle className="network-green-point" cx="359" cy="195" r="8"/>
          <circle className="network-green-point" cx="206" cy="345" r="6.5"/>
        </g>
        <g className="network-petals">
          <path className="network-petal petal-green" d="M219 10C237 9 255 18 266 35C248 37 229 30 216 17C216 14 217 12 219 10Z"/>
          <path className="network-petal petal-gold" d="M448 106C462 96 479 94 492 101C486 116 471 127 453 131C447 124 445 115 448 106Z"/>
          <path className="network-petal petal-green" d="M474 176C487 190 489 214 477 235C464 221 461 197 470 179L474 176Z"/>
          <path className="network-petal petal-green" d="M198 374C216 365 240 368 258 383C242 393 216 391 197 380L198 374Z"/>
        </g>
      </svg>
      <div className="network-center"><Icon name="people" size={36}/><strong>JSDP</strong><span>Sonora</span></div>
      <div className="network-node medical"><img src="/identity/Unidad_Medica.jpg" alt=""/><span>Unidades médicas</span></div>
      <div className="network-node offices"><img src="/identity/Unidad_No_Medica.jpg" alt=""/><span>Unidades no médicas</span></div>
      <div className="network-node persons"><img src="/identity/Personas.jpg" alt=""/><span>Personas</span></div>
      <div className="network-node coordination"><img src="/identity/Coordinacion.jpg" alt=""/><span>Coordinación</span></div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-copy reveal">
        <h1>JSDP · Sonora</h1>
        <p className="hero-lead">Jefatura de Servicios de Desarrollo de Personal</p>
        <p className="hero-body">Órgano de Operación Administrativa Desconcentrada Sonora del Instituto Mexicano del Seguro Social.</p>
        <a className="primary-button" href="#conoce">Conoce la JSDP <Icon name="arrow" size={18}/></a>
      </div>
      <NetworkGraphic />
    </section>
  );
}

function PlannedFeatures() {
  const items = [
    { title: 'Documentos', text: 'La consulta y descarga se habilitarán en una próxima etapa', icon: 'document' as const },
    { title: 'Inicio de sesión', text: 'El acceso al área privada aún no está habilitado', icon: 'person' as const },
    { title: 'Nuevas funcionalidades', text: 'Los servicios adicionales se incorporarán gradualmente', icon: 'settings' as const, muted: true },
  ];
  return <section className="planned section-shell reveal" id="accesos"><div className="section-heading"><h2>Próximas funciones</h2><p>Servicios identificados para una etapa posterior.</p></div><ul className="planned-list">{items.map(item => <li className={item.muted ? 'is-muted' : undefined} key={item.title}><span className="planned-card-top"><span className="planned-icon"><Icon name={item.icon}/></span><PendingBadge compact/></span><strong>{item.title}</strong><small>{item.text}</small></li>)}</ul></section>;
}

function MissionVision() {
  return <section className="identity-grid" id="identidad"><article className="identity-panel mission reveal"><div className="identity-panel-heading"><Icon name="target" size={64}/><h2>Misión</h2></div><p>Garantizar resultados en seguridad social con servicios de prevención y atención a la salud con calidad, calidez, y transparencia para las y los trabajadores de Sonora y sus beneficiarios</p></article><article className="identity-panel vision reveal"><div className="identity-panel-heading"><Icon name="vision" size={64}/><h2>Visión</h2></div><p>Ser el OOAD líder e innovador en atención a la salud y seguridad social en la región en los proximos tres años</p></article></section>;
}

function Values() {
  const sectionRef = useRef<HTMLElement>(null);
  const [marqueeActive, setMarqueeActive] = useState(false);
  const marqueeCopies = [0, 1, 2, 3];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let inView = false;
    const syncMotion = () => setMarqueeActive(inView && document.visibilityState === 'visible');
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncMotion();
    }, { rootMargin: '120px 0px' });
    observer.observe(section);
    document.addEventListener('visibilitychange', syncMotion);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', syncMotion);
    };
  }, []);

  return <section ref={sectionRef} className="values section-shell reveal" id="valores"><div className="section-heading"><h2>Nuestro Valores</h2><p>Principios que guían nuestro trabajo diario.</p></div><div className="values-marquee"><div className={`values-track ${marqueeActive ? 'is-moving' : ''}`}>{marqueeCopies.map(copyIndex => <div className={`values-grid ${copyIndex > 0 ? 'values-grid-duplicate' : ''}`} aria-hidden={copyIndex > 0 ? true : undefined} key={`values-copy-${copyIndex}`}>{values.map(([name, description, icon]) => <article className="value" key={`${name}-${copyIndex}`}><span><Icon name={icon} size={40}/></span><h3>{name}</h3><p>{description}</p></article>)}</div>)}</div></div></section>;
}

function OrgCard({ node, selected, onSelect, compact = false, disclosure = false, controls }: { node: OrgNode; selected: boolean; onSelect: () => void; compact?: boolean; disclosure?: boolean; controls?: string }) {
  const stateProps = disclosure ? { 'aria-expanded': selected, 'aria-controls': controls } : { 'aria-pressed': selected };
  const actionLabel = disclosure ? `${selected ? 'Ocultar' : 'Mostrar'} información de ${node.title}` : `Mostrar información de ${node.title}`;
  return <button type="button" className={`org-card tone-${node.tone} ${selected ? 'selected' : ''} ${compact ? 'compact' : ''}`} onClick={onSelect} aria-label={actionLabel} {...stateProps}><span className="org-card-head"><Icon name={node.icon} size={compact ? 21 : 25}/><strong>{node.title}</strong><span className={`org-card-action ${disclosure && selected ? 'is-open' : ''}`} aria-hidden="true"><Icon name={disclosure ? 'chevron' : selected ? 'check' : 'arrow'} size={17}/></span></span><span className="org-card-person"><small>{node.label}:</small>{node.person}</span></button>;
}

function OrgInfo({ node, id }: { node: OrgNode; id?: string }) {
  return <aside id={id} className="org-info" aria-live="polite"><div className="org-info-title"><h3>Información del puesto</h3></div><div className={`org-info-role tone-${node.tone}`}><Icon name={node.icon}/><strong>{node.title}</strong></div><dl><div><dt><Icon name="person" size={18}/> {node.label}</dt><dd>{node.person}</dd></div><div><dt><Icon name="people" size={18}/> Nivel jerárquico</dt><dd>{node.id === 'jefatura' ? 'Jefatura de Servicio' : node.id === 'auditorias' ? 'Oficina' : 'Departamento'}</dd></div></dl><p className="org-info-pending"><span>Detalle del puesto</span><PendingBadge compact/></p></aside>;
}

function OrganizationChart() {
  const [selectedId, setSelectedId] = useState('jefatura');
  const [expanded, setExpanded] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(true);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<OrgChart<OrgChartDatum> | null>(null);
  const selectedIdRef = useRef(selectedId);
  selectedIdRef.current = selectedId;
  const selected = useMemo(() => orgNodes.find(node => node.id === selectedId) ?? orgNodes[0], [selectedId]);
  const choose = (id: string) => setSelectedId(id);
  const toggleMobile = (id: string) => {
    if (selectedId === id && sheetOpen) return setSheetOpen(false);
    setSelectedId(id);
    setSheetOpen(true);
  };
  const toggleTree = () => {
    const chart = chartRef.current;
    if (!chart) return;
    if (expanded) {
      chart.collapseAll().fit({ animate: true });
      setSelectedId('jefatura');
      setExpanded(false);
      return;
    }
    chart.expandAll().fit({ animate: true });
    setExpanded(true);
  };

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;
    let disposed = false;
    let resizeFrame = 0;
    let observer: ResizeObserver | null = null;

    const enhanceAccessibility = () => {
      container.querySelectorAll<SVGGElement>('g.node').forEach(element => {
        const datum = (element as SVGGElement & { __data__?: OrgChartNode<OrgChartDatum> }).__data__;
        if (!datum) return;
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        element.setAttribute('aria-label', `Mostrar información de ${datum.data.title}`);
      });
    };

    const setupChart = async () => {
      const { OrgChart: D3OrgChart } = await import('d3-org-chart');
      if (disposed || !container.isConnected) return;

      const chart = new D3OrgChart<OrgChartDatum>();
      chartRef.current = chart;
      const selectNode = (node: OrgChartNode<OrgChartDatum>) => setSelectedId(node.data.id);

      chart
        .container(container)
        .data(orgChartData)
        .svgHeight(580)
        .initialExpandLevel(2)
        .nodeWidth(node => node.data.id === 'jefatura' ? 360 : node.data.id === 'auditorias' ? 250 : 210)
        .nodeHeight(node => node.data.id === 'jefatura' ? 130 : node.data.id === 'auditorias' ? 126 : 154)
        .childrenMargin(() => 56)
        .siblingsMargin(() => 14)
        .compactMarginPair(() => 76)
        .compactMarginBetween(() => 22)
        .compact(false)
        .duration(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420)
        .nodeContent(node => renderOrgChartNode(node, selectedIdRef.current))
        .onNodeClick(selectNode)
        .onExpandOrCollapse(node => {
          if (node.data.id === 'jefatura') setExpanded(Boolean(node.children));
          window.requestAnimationFrame(enhanceAccessibility);
        })
        .nodeEnter(function (node) {
          this.addEventListener('keydown', event => {
            if (event.target !== this || !['Enter', ' ', 'Spacebar'].includes(event.key)) return;
            event.preventDefault();
            event.stopImmediatePropagation();
            selectNode(node);
          }, { capture: true });
        })
        .linkUpdate(function (node) {
          const root = node.parent;
          if (!root) return;
          root.x = 480;
          root.y = 20;
          if (node.data.id === 'auditorias') {
            node.x = 155;
            node.y = 190;
            return;
          }
          const departmentOrder = ['personal', 'presupuesto', 'relaciones', 'capacitacion'];
          const departmentIndex = departmentOrder.indexOf(node.data.id);
          if (departmentIndex >= 0) {
            node.x = 105 + departmentIndex * 250;
            node.y = 380;
          }
        })
        .render()
        .fit({ animate: false });

      enhanceAccessibility();
      observer = new ResizeObserver(() => {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(() => chart.render().fit({ animate: false }));
      });
      observer.observe(container);
    };

    void setupChart();

    return () => {
      disposed = true;
      observer?.disconnect();
      window.cancelAnimationFrame(resizeFrame);
      chartRef.current = null;
      container.replaceChildren();
    };
  }, []);

  useEffect(() => {
    const container = chartContainerRef.current;
    if (!container) return;
    container.querySelectorAll<HTMLElement>('[data-org-node-id]').forEach(element => {
      element.classList.toggle('is-selected', element.dataset.orgNodeId === selectedId);
    });
  }, [selectedId]);

  return <section className="organization reveal" id="estructura"><div className="section-shell org-heading"><div className="section-heading"><h2>Estructura organizacional</h2><p>Conoce la estructura de la Jefatura de Servicios de Desarrollo de Personal.</p></div><button className="collapse-all" type="button" aria-expanded={expanded} aria-controls="organigrama" onClick={toggleTree}>{expanded ? 'Contraer estructura' : 'Expandir estructura'}</button></div><div className="org-layout section-shell"><div id="organigrama" className="org-tree"><div className="org-chart-controls" role="toolbar" aria-label="Controles de zoom del organigrama"><button type="button" onClick={() => chartRef.current?.zoomIn()} aria-label="Acercar organigrama" title="Acercar"><Icon name="zoomIn" size={19}/></button><button type="button" onClick={() => chartRef.current?.zoomOut()} aria-label="Alejar organigrama" title="Alejar"><Icon name="zoomOut" size={19}/></button><button type="button" onClick={() => chartRef.current?.fit({ animate: true })} aria-label="Ajustar organigrama al área visible" title="Ajustar al área"><Icon name="zoomFit" size={19}/></button></div><div ref={chartContainerRef} className="org-d3-chart" role="group" aria-label="Organigrama de la Jefatura de Servicios de Desarrollo de Personal"/></div><OrgInfo node={selected}/></div><div className="org-mobile-list section-shell">{orgNodes.map(node => { const open = sheetOpen && selectedId === node.id; const detailId = `puesto-${node.id}`; return <Fragment key={node.id}><OrgCard node={node} selected={open} onSelect={() => toggleMobile(node.id)} compact disclosure controls={detailId}/>{open && <OrgInfo id={detailId} node={node}/>}</Fragment>; })}</div></section>;
}

function Footer() {
  return <footer className="site-footer" id="contacto"><div className="footer-pattern" aria-hidden="true"/><div className="footer-content"><div className="footer-brands"><img className="government-logo" src="/identity/Gobierno_de_Mexico_2024-2030.svg" alt="Gobierno de México 2024–2030" loading="lazy" decoding="async"/><span className="brand-divider"/><img className="imss-logo" src="/identity/Logotipo_del_IMSS.svg" alt="Instituto Mexicano del Seguro Social" loading="lazy" decoding="async"/><p>Jefatura de Servicios de Desarrollo de Personal<br/>OOAD Sonora</p></div><div className="footer-meta"><span>Instituto Mexicano del Seguro Social</span><p className="footer-pending"><span>Privacidad, términos y contacto</span><PendingBadge compact/></p></div></div></footer>;
}

export function LandingPage() {
  const pageId = useId();
  useEffect(() => {
    document.title = 'JSDP Sonora | IMSS';
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { items.forEach(el => el.classList.add('visible')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
    items.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return <div className="landing-page" id={pageId}><a className="skip-link" href="#contenido">Saltar al contenido</a><Header/><main id="contenido"><div className="page-frame"><Hero/></div><section className="about" id="conoce"><div className="about-visual" aria-hidden="true"><img src="/identity/OOAD_IMSS_ampliada_derecha_optimizada.webp" alt="" loading="lazy" decoding="async"/></div><div className="section-shell reveal"><div className="about-copy"><h2>Conoce la JSDP</h2><p>La Jefatura de Servicios de Desarrollo de Personal, del OOAD 27 Sonora, impulsa la gestión integral del personal, a través de procesos normativos, transparentes y humanos, en coordinación con las unidades médicas y no médicas.</p></div><a className="secondary-button" href="#estructura">Más información <Icon name="arrow" size={18}/></a></div></section><PlannedFeatures/><MissionVision/><Values/><OrganizationChart/></main><Footer/></div>;
}
