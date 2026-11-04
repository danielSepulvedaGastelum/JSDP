import { Link } from 'react-router';
import { Fragment, useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import type { OrgChart, OrgChartNode } from 'd3-org-chart';
import { HeroEditorial } from './HeroEditorial';
import { LandingFooter } from './LandingFooter';
import './AboutCarousel.css';
import './OrganizationChart.css';
import './IdentityIllustrations.css';

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
    arrow: <><path d="M5 12h13" /><path d="m14 7 5 5-5 5" /></>,
    audit: <><path d="M5 3h9l4 4v6" /><path d="M14 3v5h5M5 3v18h7" /><circle cx="17" cy="17" r="3" /><path d="m19.2 19.2 2.3 2.3M8 11h6M8 15h3" /></>,
    budget: <><ellipse cx="9" cy="6" rx="6" ry="3" /><path d="M3 6v4c0 1.7 2.7 3 6 3 1.1 0 2.1-.1 3-.4M3 10v4c0 1.7 2.7 3 6 3" /><ellipse cx="16" cy="16" rx="5" ry="2.5" /><path d="M11 16v3c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-3" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 6 6 6-6 6" />,
    discipline: <><path d="M3 21h18M5 16h3v5H5zM10.5 12h3v9h-3zM16 7h3v14h-3z" /><path d="M3 4v17" /></>,
    document: <><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v5h5M9 12h6M9 16h6" /></>,
    empathy: <><path d="M4 13.5V8a2 2 0 0 1 4 0v4" /><path d="M8 11V6.5a2 2 0 0 1 4 0V11" /><path d="M12 10V7.5a2 2 0 0 1 4 0V12" /><path d="M16 11a2 2 0 0 1 4 0v3c0 4.4-3.6 8-8 8h-1a7 7 0 0 1-7-7v-1.5" /><path d="M4 13.5a2 2 0 0 1 3.4-1.4L10 15" /></>,
    handshake: <><path d="m3 12 4-4 4 2 2-1 8 7-3 3-3-1-2 2-3-2-2 1-5-5Z" /><path d="m8 13 3 3M11 11l5 5M14 10l5 5" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
    idea: <><path d="M9 18h6M10 22h4M8 14c-1.3-1.1-2-2.6-2-4.2A6 6 0 0 1 18 10c0 1.6-.7 3.1-2 4.2-.7.6-1 1.1-1 1.8H9c0-.7-.3-1.2-1-2Z" /><path d="M12 1v2M3.5 4.5 5 6M21 10h-2M19.5 4.5 18 6M5 10H3" /></>,
    integrity: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
    login: <><path d="M14 3h6v18h-6" /><path d="M3 12h12M10 7l5 5-5 5" /></>,
    loyalty: <><circle cx="12" cy="9" r="5" /><circle cx="12" cy="9" r="2.25" /><path d="m8.8 13.2-2 8.8 5.2-3 5.2 3-2-8.8" /></>,
    people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 14a5 5 0 0 1 6 4.9V20" /></>,
    person: <><circle cx="12" cy="8" r="4" /><path d="M4 22a8 8 0 0 1 16 0" /></>,
    roadmap: <><path d="M5 21V5M19 21V9" /><path d="M5 6h9l-2-3M19 10h-9l2-3" /></>,
    settings: <><path d="M9.5 3h5l.7 2.2 2 .8 2.1-1 2.5 4.3-1.8 1.5v2.4l1.8 1.5-2.5 4.3-2.1-1-2 .8-.7 2.2h-5l-.7-2.2-2-.8-2.1 1-2.5-4.3L4 13.2v-2.4L2.2 9.3 4.7 5l2.1 1 2-.8L9.5 3Z" /><circle cx="12" cy="12" r="3" /></>,
    solidarity: <><circle cx="12" cy="7" r="3" /><circle cx="5" cy="9" r="2" /><circle cx="19" cy="9" r="2" /><path d="M7.5 20v-2.2a4.5 4.5 0 0 1 9 0V20M2 19v-1.4A3.6 3.6 0 0 1 6.5 14M22 19v-1.4a3.6 3.6 0 0 0-4.5-3.5" /></>,
    target: <><circle cx="10" cy="14" r="7.5" /><circle cx="10" cy="14" r="4.25" /><circle cx="10" cy="14" r="1.25" /><path d="m11 13 9-9M15.5 4H20v4.5" /></>,
    training: <><path d="M4 5h16v13H4zM8 22h8M12 18v4" /><path d="m9 13 2-2 2 2 3-4" /></>,
    vision: <><path d="M2.5 20 10 7l3.2 5.4 2-3.1L21.5 20h-19Z" /><path d="m7.9 10.7 2.1 2 1.7-1.4M10 7V2.5M10 2.5h6l-1.8 2 1.8 2h-6" /></>,
    zoomIn: <><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5M10 7v6M7 10h6" /></>,
    zoomOut: <><circle cx="10" cy="10" r="6" /><path d="m15 15 5 5M7 10h6" /></>,
    zoomFit: <><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" /><path d="m3 8 5-5M21 8l-5-5M3 16l5 5M21 16l-5 5" /></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

const values = [
  ['Solidaridad', 'Apoyo mutuo para un mejor servicio', '01_Solidaridad.webp'],
  ['Compromiso', 'Dedicación para cumplir nuestros objetivos', '02_Compromiso.webp'],
  ['Integridad', 'Actuar con honestidad y transparencia', '03_Integridad.webp'],
  ['Lealtad', 'Corresponsabilidad con el IMSS y su misión', '04_Lealtad.webp'],
  ['Innovación', 'Mejora continua en beneficio de las personas', '05_Innovacion.webp'],
  ['Empatía', 'Escucha y respeto a las necesidades de nuestra gente', '06_Empatia.webp'],
  ['Disciplina', 'Cumplir con responsabilidad nuestros deberes', '07_Disciplina.webp'],
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
  { id: 'relaciones', title: 'Departamento de Relaciones Laborales', person: 'Lic. Miguel Arturo Munguia Encinas', label: 'Titular', tone: 'sage', icon: 'handshake' },
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

function BrandLogo() {
  return (
    <a className="brand" href="#inicio" aria-label="IMSS JSDP Sonora, volver al inicio">
      <img src="/identity/JSDP-Sonora-11.svg" alt="IMSS — JSDP Sonora" />
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
        <div className="header-actions" aria-label="Accesos">
          <span className="header-action header-action-plain" aria-label="Documentos, próximamente" aria-disabled="true"><span><strong>Documentos</strong></span></span>
          <Link to="/inicio-sesion" className="header-action header-action-login"><Icon name="login" size={19} /><span><strong>Iniciar sesión</strong></span></Link>
        </div>
      </div>
    </header>
  );
}

function PlannedFeatures() {
  const items = [
    { title: 'Documentos', text: 'La consulta y descarga se habilitarán en una próxima etapa', icon: 'document' as const },
    { title: 'Inicio de sesión', text: 'El acceso al área privada aún no está habilitado', icon: 'person' as const },
    { title: 'Nuevas funcionalidades', text: 'Los servicios adicionales se incorporarán gradualmente', icon: 'settings' as const, muted: true },
  ];
  return <section className="planned section-shell reveal" id="accesos"><div className="section-heading"><h2>Próximas funciones</h2><p>Servicios identificados para una etapa posterior.</p></div><ul className="planned-list">{items.map(item => <li className={item.muted ? 'is-muted' : undefined} key={item.title}><span className="planned-card-top"><span className="planned-icon"><Icon name={item.icon} /></span><PendingBadge compact /></span><strong>{item.title}</strong><small>{item.text}</small></li>)}</ul></section>;
}

function MissionVision() {
  return <section className="identity-grid" id="identidad"><article className="identity-panel mission reveal"><div className="identity-panel-heading"><img className="identity-image" src="/identity/mision-vision-valores/Mision.webp" alt="" width="96" height="96" loading="lazy" decoding="async" /><h2>Misión</h2></div><p>Garantizar resultados en seguridad social con servicios de prevención y atención a la salud con calidad, calidez, y transparencia para las y los trabajadores de Sonora y sus beneficiarios</p></article><article className="identity-panel vision reveal"><div className="identity-panel-heading"><img className="identity-image" src="/identity/mision-vision-valores/Vision.webp" alt="" width="96" height="96" loading="lazy" decoding="async" /><h2>Visión</h2></div><p>Ser el OOAD líder e innovador en atención a la salud y seguridad social en la región en los proximos tres años</p></article></section>;
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

  return <section ref={sectionRef} className="values section-shell reveal" id="valores"><div className="section-heading"><h2>Nuestro Valores</h2><p>Principios que guían nuestro trabajo diario.</p></div><div className="values-marquee"><div className={`values-track ${marqueeActive ? 'is-moving' : ''}`}>{marqueeCopies.map(copyIndex => <div className={`values-grid ${copyIndex > 0 ? 'values-grid-duplicate' : ''}`} aria-hidden={copyIndex > 0 ? true : undefined} key={`values-copy-${copyIndex}`}>{values.map(([name, description, image]) => <article className="value" key={`${name}-${copyIndex}`}><span><img className="value-image" src={`/identity/mision-vision-valores/${image}`} alt="" width="88" height="88" loading="lazy" decoding="async" /></span><h3>{name}</h3><p>{description}</p></article>)}</div>)}</div></div></section>;
}

function OrgCard({ node, selected, onSelect, compact = false, disclosure = false, controls }: { node: OrgNode; selected: boolean; onSelect: () => void; compact?: boolean; disclosure?: boolean; controls?: string }) {
  const stateProps = disclosure ? { 'aria-expanded': selected, 'aria-controls': controls } : { 'aria-pressed': selected };
  const actionLabel = disclosure ? `${selected ? 'Ocultar' : 'Mostrar'} información de ${node.title}` : `Mostrar información de ${node.title}`;
  return <button type="button" className={`org-card tone-${node.tone} ${selected ? 'selected' : ''} ${compact ? 'compact' : ''}`} onClick={onSelect} aria-label={actionLabel} {...stateProps}><span className="org-card-head"><Icon name={node.icon} size={compact ? 21 : 25} /><strong>{node.title}</strong><span className={`org-card-action ${disclosure && selected ? 'is-open' : ''}`} aria-hidden="true"><Icon name={disclosure ? 'chevron' : selected ? 'check' : 'arrow'} size={17} /></span></span><span className="org-card-person"><small>{node.label}:</small>{node.person}</span></button>;
}

function OrgInfo({ node, id }: { node: OrgNode; id?: string }) {
  return <aside id={id} className="org-info" aria-live="polite"><div className="org-info-title"><h3>Información del puesto</h3></div><div className={`org-info-role tone-${node.tone}`}><Icon name={node.icon} /><strong>{node.title}</strong></div><dl><div><dt><Icon name="person" size={18} /> {node.label}</dt><dd>{node.person}</dd></div><div><dt><Icon name="people" size={18} /> Nivel jerárquico</dt><dd>{node.id === 'jefatura' ? 'Jefatura de Servicio' : node.id === 'auditorias' ? 'Oficina' : 'Departamento'}</dd></div></dl><p className="org-info-pending"><span>Detalle del puesto</span><PendingBadge compact /></p></aside>;
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
      const auditWidth = 380;
      const auditRightEdge = 360;
      const auditCenterX = auditRightEdge - auditWidth / 2;
      // fit() adds 50 logical pixels around every side. Keep its horizontal
      // breathing room, but let the compact viewport provide vertical margins.
      const fitBounds = chart.zoomTreeBounds.bind(chart);
      chart.zoomTreeBounds = bounds => {
        // Reuse 25px of each outer fit margin for the wider department row,
        // keeping the fitted scale (and therefore the visible text size) intact.
        const horizontalInset = bounds.x1 - bounds.x0 > 1000 ? 25 : 0;
        fitBounds({ ...bounds, x0: bounds.x0 + horizontalInset, x1: bounds.x1 - horizontalInset, y0: bounds.y0 + 50, y1: bounds.y1 - 50 });
      };
      const chartHeight = () => {
        // The visible tree spans 1100 logical pixels vertically and 1390
        // horizontally including fit's horizontal padding. Match their ratio.
        const height = Math.ceil(container.clientWidth * 1100 / 1390);
        container.style.height = `${height}px`;
        return height;
      };

      chart
        .container(container)
        .data(orgChartData)
        .svgHeight(chartHeight())
        .initialExpandLevel(2)
        .nodeWidth(node => node.data.id === 'jefatura' ? 500 : node.data.id === 'auditorias' ? auditWidth : 320)
        .nodeHeight(node => node.data.id === 'jefatura' ? 260 : node.data.id === 'auditorias' ? 340 : 380)
        .childrenMargin(() => 56)
        .siblingsMargin(() => 14)
        .compactMarginPair(() => 76)
        .compactMarginBetween(() => 22)
        .compact(false)
        .duration(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420)
        .diagonal((source, target) => {
          if (source.x === auditCenterX && source.y === 300) {
            // Keep the right-edge connection fixed as Auditorías grows leftward.
            const rightEdge = auditRightEdge;
            const centerY = source.y + 170;
            return `M${target.x},${target.y} V${centerY - 12} Q${target.x},${centerY} ${target.x - 12},${centerY} H${rightEdge}`;
          }
          // Departments join a shared bus 50px above their top edge, safely
          // below Auditorías (bottom 640), instead of at the path midpoint.
          const busY = source.y >= 740 ? source.y - 50 : (source.y + target.y) / 2;
          const direction = source.x >= target.x ? 1 : -1;
          const radius = Math.min(12, Math.abs(source.x - target.x) / 2, Math.abs(busY - target.y) / 2, Math.abs(source.y - busY) / 2);
          return `M${target.x},${target.y} V${busY - radius} Q${target.x},${busY} ${target.x + direction * radius},${busY} H${source.x - direction * radius} Q${source.x},${busY} ${source.x},${busY + radius} V${source.y}`;
        })
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
          root.x = 645;
          root.y = 20;
          if (node.data.id === 'auditorias') {
            node.x = auditCenterX;
            node.y = 300;
            return;
          }
          const departmentOrder = ['personal', 'presupuesto', 'relaciones', 'capacitacion'];
          const departmentIndex = departmentOrder.indexOf(node.data.id);
          if (departmentIndex >= 0) {
            node.x = 135 + departmentIndex * 340;
            // The bus stays at 690, leaving 50px below Auditorías and a short
            // 50px final connection to the departments, without changing order.
            node.y = 740;
          }
        })
        .render()
        .fit({ animate: false });

      enhanceAccessibility();
      observer = new ResizeObserver(() => {
        window.cancelAnimationFrame(resizeFrame);
        resizeFrame = window.requestAnimationFrame(() => chart.svgHeight(chartHeight()).render().fit({ animate: false }));
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

  return <section className="organization reveal" id="estructura"><div className="section-shell org-heading"><div className="section-heading"><h2>Estructura organizacional</h2><p>Conoce la estructura de la Jefatura de Servicios de Desarrollo de Personal.</p></div><button className="collapse-all" type="button" aria-expanded={expanded} aria-controls="organigrama" onClick={toggleTree}>{expanded ? 'Contraer estructura' : 'Expandir estructura'}</button></div><div className="org-layout section-shell"><div id="organigrama" className="org-tree"><div className="org-chart-controls" role="toolbar" aria-label="Controles de zoom del organigrama"><button type="button" onClick={() => chartRef.current?.zoomIn()} aria-label="Acercar organigrama" title="Acercar"><Icon name="zoomIn" size={19} /></button><button type="button" onClick={() => chartRef.current?.zoomOut()} aria-label="Alejar organigrama" title="Alejar"><Icon name="zoomOut" size={19} /></button><button type="button" onClick={() => chartRef.current?.fit({ animate: true })} aria-label="Ajustar organigrama al área visible" title="Ajustar al área"><Icon name="zoomFit" size={19} /></button></div><div ref={chartContainerRef} className="org-d3-chart" role="group" aria-label="Organigrama de la Jefatura de Servicios de Desarrollo de Personal" /></div><OrgInfo node={selected} /></div><div className="org-mobile-list section-shell">{orgNodes.map(node => { const open = sheetOpen && selectedId === node.id; const detailId = `puesto-${node.id}`; return <Fragment key={node.id}><OrgCard node={node} selected={open} onSelect={() => toggleMobile(node.id)} compact disclosure controls={detailId} />{open && <OrgInfo id={detailId} node={node} />}</Fragment>; })}</div></section>;
}

type AboutSlide = {
  title: string;
  image: string;
  description: string;
  organizationIntro?: string;
  offices?: { title: string; description: string }[];
};

const aboutSlides: AboutSlide[] = [
  {
    title: 'Conoce la JSDP', image: '01_JSDP.webp',
    description: 'La Jefatura de Servicios de Desarrollo de Personal (JSDP) del OOAD 27 Sonora impulsa la gestión integral del personal mediante procesos normativos, transparentes y humanos, en coordinación con las unidades médicas y no médicas.',
    organizationIntro: 'Para el desarrollo de sus funciones, la JSDP se organiza en los siguientes departamentos y oficinas:',
  },
  {
    title: 'Departamento de Personal', image: '06_Departamento_Personal.webp',
    description: 'Coordina la administración del personal, desde su ingreso y desarrollo laboral hasta el pago de nómina y la gestión de sus prestaciones, en enlace con las unidades de todo Sonora.',
    offices: [
      { title: 'Oficina de Control de Fuerza de Trabajo', description: 'Procesa la nómina y la nominación de personal, coordina con las unidades del estado la gestión de su pago y participa en la selección de personal de nuevo ingreso.' },
      { title: 'Oficina de Dotación de Recursos Humanos', description: 'Gestiona la bolsa de trabajo interna, las plazas de Confianza B, los asuntos del personal becado y los procesos de escalafón.' },
      { title: 'Oficina de Prestaciones al Personal', description: 'Administra y tramita las prestaciones para solicitudes de crédito hipotecario, Infonavit, crédito a mediano plazo y adquisición de automóvil.' },
    ],
  },
  {
    title: 'Departamento de Presupuesto y Control del Gasto', image: '05_Departamento_Presupuesto.webp',
    description: 'Coordina el ejercicio presupuestal de los servicios personales, las obligaciones patronales y el cumplimiento oportuno de los procesos de nómina.',
    offices: [
      { title: 'Oficina de Ejercicio Presupuestal y Obligaciones', description: 'Coordina con las unidades médicas y no médicas las solicitudes de presupuesto para tiempo extra (037), nivelación a categoría superior (010), guardias festivas y administrativas (035) y personal sustituto (08). Procesa el pago de obligaciones patronales: Infonavit, Afores e ISR.' },
      { title: 'Oficina de Control del Proceso', description: 'Coordina los calendarios quincenales y mensuales de las nóminas de personal activo, jubilados y pensionados, PTD y PTDAM; así como la distribución de productos de nómina y el pago mediante acreditamiento en cuenta.' },
    ],
  },
  {
    title: 'Departamento de Relaciones Laborales', image: '04_Departamento_Relaciones_Laborales.webp',
    description: 'Atiende las relaciones con la representación sindical y coordina los asuntos de las subcomisiones mixtas en el ámbito de la JSDP en Sonora.',
    offices: [
      { title: 'Oficina de Asuntos Sindicales', description: 'Atiende los asuntos que requieren coordinación con la Sección XVII del Sindicato Nacional de Trabajadores del Seguro Social (SNTSS), correspondiente a Sonora.' },
      { title: 'Oficina de Subcomisiones Mixtas', description: 'Coordina las actividades de las subcomisiones mixtas con la representación sindical, entre ellas la Disciplinaria, la Paritaria y la de Pasajes.' },
    ],
  },
  {
    title: 'Departamento de Capacitación', image: '03_Departamento_Capacitacion.webp',
    description: 'Coordina las actividades de capacitación de las y los trabajadores del IMSS en Sonora, orientadas al desarrollo de sus conocimientos y habilidades para el desempeño de sus funciones.',
  },
  {
    title: 'Oficina de Información y Seguimiento de Auditorías', image: '02_Oficina_Auditorias.webp',
    description: 'Coordina la atención de solicitudes de información de áreas externas y da seguimiento a las supervisiones realizadas, en el ámbito de la JSDP, a las unidades médicas y no médicas de Sonora.',
  },
];

function AboutCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const playing = inView && pageVisible && !paused && !hovered && !focused && !reducedMotion;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= .15;
      setInView(visible);
      if (!visible) setActive(0);
    }, { threshold: [0, .15] });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive(index => (index + 1) % aboutSlides.length), aboutSlides[active].offices ? 26000 : 12000);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  const navigate = (step: number) => setActive(index => (index + step + aboutSlides.length) % aboutSlides.length);

  return <section ref={sectionRef} className="about about-carousel" id="conoce" aria-label="Conoce la JSDP y sus áreas" aria-roledescription="carrusel"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    onKeyDown={event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); navigate(event.key === 'ArrowLeft' ? -1 : 1); }
      if (event.key === 'Home' || event.key === 'End') { event.preventDefault(); setActive(event.key === 'Home' ? 0 : aboutSlides.length - 1); }
    }}>
    <div className="about-visual" aria-hidden="true"><img src="/identity/OOAD_IMSS_ampliada_derecha_optimizada.webp" alt="" loading="lazy" decoding="async" /></div>
    <div className="section-shell about-carousel-shell">
      <button className="about-nav about-prev" type="button" aria-label="Área anterior" aria-controls="about-slides" onClick={() => navigate(-1)}><Icon name="chevron" /></button>
      <div id="about-slides" className="about-slides" aria-live={playing ? 'off' : 'polite'} aria-atomic="true">
        {aboutSlides.map((slide, index) => <article key={slide.title} className={`about-slide${index === active ? ' is-active' : ''}`} aria-hidden={index !== active} inert={index !== active} role="group" aria-roledescription="diapositiva" aria-label={`${index + 1} de ${aboutSlides.length}: ${slide.title}`}>
          <img className="about-area-image" src={`/identity/conoce-jsdp/${slide.image}`} alt="" width="512" height="512" loading="lazy" decoding="async" />
          <div className="about-area-copy"><h2>{slide.title}</h2><p className="about-description">{slide.description}</p>
            {slide.organizationIntro && <div className="about-organization"><p>{slide.organizationIntro}</p><ul>{aboutSlides.slice(1).map(area => <li key={area.title}>{area.title}</li>)}</ul></div>}
            {slide.offices && <dl className="about-offices">{slide.offices.map(office => <div key={office.title}><dt>{office.title}</dt><dd>{office.description}</dd></div>)}</dl>}
          </div>
        </article>)}
      </div>
      <button className="about-nav about-next" type="button" aria-label="Área siguiente" aria-controls="about-slides" onClick={() => navigate(1)}><Icon name="chevron" /></button>
      <div className="about-carousel-controls">
        <div className="about-pagination" role="group" aria-label="Seleccionar área">{aboutSlides.map((slide, index) => <button key={slide.title} type="button" aria-label={`Mostrar ${slide.title}`} aria-current={index === active ? 'true' : undefined} onClick={() => setActive(index)}><span /></button>)}</div>
        <span className="about-counter" aria-hidden="true">{active + 1} / {aboutSlides.length}</span>
        {!reducedMotion && <button className="about-playback" type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Reanudar avance automático' : 'Pausar avance automático'}><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">{paused ? <path d="m5 3 8 5-8 5Z" /> : <><rect x="4" y="3" width="3" height="10" rx=".5" /><rect x="9" y="3" width="3" height="10" rx=".5" /></>}</svg><span>{paused ? 'Reanudar' : 'Pausar'}</span></button>}
      </div>
    </div>
  </section>;
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
  return <div className="landing-page" id={pageId}><a className="skip-link" href="#contenido">Saltar al contenido</a><Header /><main id="contenido"><HeroEditorial /><AboutCarousel /><PlannedFeatures /><MissionVision /><Values /><OrganizationChart /></main><LandingFooter /></div>;
}
