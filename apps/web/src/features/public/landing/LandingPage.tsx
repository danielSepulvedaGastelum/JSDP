import { Fragment, useEffect, useId, useMemo, useState, type ReactNode } from 'react';

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
  | 'solidarity'
  | 'target'
  | 'training'
  | 'vision';

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
    discipline: <><path d="M6 3h12v18H6z"/><path d="m9 8 1.5 1.5L13 7M9 14l1.5 1.5L13 13M15 8h1M15 14h1"/></>,
    document: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></>,
    empathy: <><path d="M4 13.5V8a2 2 0 0 1 4 0v4"/><path d="M8 11V6.5a2 2 0 0 1 4 0V11"/><path d="M12 10V7.5a2 2 0 0 1 4 0V12"/><path d="M16 11a2 2 0 0 1 4 0v3c0 4.4-3.6 8-8 8h-1a7 7 0 0 1-7-7v-1.5"/><path d="M4 13.5a2 2 0 0 1 3.4-1.4L10 15"/></>,
    handshake: <><path d="m3 12 4-4 4 2 2-1 8 7-3 3-3-1-2 2-3-2-2 1-5-5Z"/><path d="m8 13 3 3M11 11l5 5M14 10l5 5"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
    idea: <><path d="M9 18h6M10 22h4M8 14c-1.3-1.1-2-2.6-2-4.2A6 6 0 0 1 18 10c0 1.6-.7 3.1-2 4.2-.7.6-1 1.1-1 1.8H9c0-.7-.3-1.2-1-2Z"/><path d="M12 1v2M3.5 4.5 5 6M21 10h-2M19.5 4.5 18 6M5 10H3"/></>,
    integrity: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-5"/></>,
    login: <><path d="M14 3h6v18h-6"/><path d="M3 12h12M10 7l5 5-5 5"/></>,
    loyalty: <><circle cx="12" cy="9" r="5"/><path d="m9 14-2 8 5-3 5 3-2-8M12 6v6M9 9h6"/></>,
    people: <><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 14a5 5 0 0 1 6 4.9V20"/></>,
    person: <><circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/></>,
    roadmap: <><path d="M5 21V5M19 21V9"/><path d="M5 6h9l-2-3M19 10h-9l2-3"/></>,
    solidarity: <><path d="M3 12h4l3 3 4-4 7 5"/><path d="m3 16 4 4 3-2 3 2 3-2 2 1 3-3M7 12l4-4 3 1 3-2 4 4"/></>,
    target: <><circle cx="11" cy="13" r="8"/><circle cx="11" cy="13" r="4"/><path d="m21 3-6 6M16 3h5v5"/></>,
    training: <><path d="M4 5h16v13H4zM8 22h8M12 18v4"/><path d="m9 13 2-2 2 2 3-4"/></>,
    vision: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M4.9 4.9l1.4 1.4M19.1 4.9l-1.4 1.4"/></>,
  };
  return <svg {...common}>{paths[name]}</svg>;
}

const values = [
  ['Solidaridad', 'solidarity'],
  ['Compromiso', 'heart'],
  ['Integridad', 'integrity'],
  ['Lealtad', 'loyalty'],
  ['Innovación', 'idea'],
  ['Empatía', 'empathy'],
  ['Disciplina', 'discipline'],
] as const;

type OrgNode = {
  id: string;
  title: string;
  person: string;
  label: 'Titular' | 'Encargada';
  tone: 'green' | 'wine' | 'gold' | 'mint' | 'sage' | 'slate';
  icon: IconName;
};

const orgNodes: OrgNode[] = [
  { id: 'jefatura', title: 'Jefatura de Servicios de Desarrollo de Personal', person: 'Lic. Nitza Nubia Flores Lastra', label: 'Titular', tone: 'green', icon: 'person' },
  { id: 'auditorias', title: 'Oficina de Información y Seguimiento de Auditorías', person: 'Lic. Nelia Guadalupe Ayón Palma', label: 'Titular', tone: 'wine', icon: 'audit' },
  { id: 'personal', title: 'Departamento de Personal Delegacional', person: 'Lic. Juan Eduardo Ramírez Lucero', label: 'Titular', tone: 'gold', icon: 'people' },
  { id: 'presupuesto', title: 'Departamento de Presupuesto y Control del Gasto', person: 'Lic. Rossana Haydee Bastidas Soto', label: 'Titular', tone: 'mint', icon: 'budget' },
  { id: 'relaciones', title: 'Jefe del Departamento de Relaciones Laborales', person: 'Lic. Miguel Arturo Munguia Encinas', label: 'Titular', tone: 'sage', icon: 'handshake' },
  { id: 'capacitacion', title: 'Departamento de Capacitación', person: 'Lic. Elizabeth Martell Lucero', label: 'Encargada', tone: 'slate', icon: 'training' },
];

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
      <svg className="network-lines" viewBox="0 0 520 420" aria-hidden="true"><path d="M260 210 142 92M260 210 394 92M260 210 407 305M260 210 126 314"/><path d="M142 92C235 35 315 34 394 92M394 92c62 75 58 148 13 213M407 305c-91 60-190 55-281 9M126 314C62 224 78 143 142 92" className="orbit"/><g><circle cx="215" cy="59" r="6"/><circle cx="347" cy="55" r="5"/><circle cx="447" cy="210" r="6"/><circle cx="335" cy="356" r="5"/><circle cx="91" cy="225" r="6"/></g></svg>
      <span className="network-leaf leaf-one" aria-hidden="true" />
      <span className="network-leaf leaf-two" aria-hidden="true" />
      <span className="network-leaf leaf-three" aria-hidden="true" />
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
    { title: 'Inicio de sesión', text: 'El acceso al área privada aún no está habilitado', icon: 'login' as const },
    { title: 'Nuevas funcionalidades', text: 'Los servicios adicionales se incorporarán gradualmente', icon: 'roadmap' as const },
  ];
  return <section className="planned section-shell reveal" id="accesos"><div className="section-heading"><h2>Próximas funciones</h2><p>Servicios identificados para una etapa posterior.</p></div><ul className="planned-list">{items.map(item => <li key={item.title}><span className="planned-icon"><Icon name={item.icon}/></span><span><strong>{item.title}</strong><small>{item.text}</small></span><PendingBadge compact/></li>)}</ul></section>;
}

function MissionVision() {
  return <section className="identity-grid" id="identidad"><article className="identity-panel mission reveal"><Icon name="target" size={48}/><div><h2>Misión</h2><p>Garantizar resultados en seguridad social con servicios de prevención y atención a la salud con calidad, calidez, y transparencia para las y los trabajadores de Sonora y sus beneficiarios</p></div></article><article className="identity-panel vision reveal"><Icon name="vision" size={48}/><div><h2>Visión</h2><p>Ser el OOAD líder e innovador en atención a la salud y seguridad social en la región en los proximos tres años</p></div></article></section>;
}

function Values() {
  return <section className="values section-shell reveal" id="valores"><div className="section-heading"><h2>Valores</h2><p>Valores confirmados para la JSDP en Sonora.</p></div><div className="values-grid">{values.map(([name, icon]) => <article className="value" key={name}><span><Icon name={icon}/></span><h3>{name}</h3></article>)}</div></section>;
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
  const selected = useMemo(() => orgNodes.find(node => node.id === selectedId) ?? orgNodes[0], [selectedId]);
  const choose = (id: string) => setSelectedId(id);
  const toggleMobile = (id: string) => {
    if (selectedId === id && sheetOpen) return setSheetOpen(false);
    setSelectedId(id);
    setSheetOpen(true);
  };
  const toggleTree = () => setExpanded(value => {
    if (value) setSelectedId('jefatura');
    return !value;
  });
  return <section className="organization reveal" id="estructura"><div className="section-shell org-heading"><div className="section-heading"><h2>Estructura organizacional</h2><p>Conoce la estructura de la Jefatura de Servicios de Desarrollo de Personal.</p></div><button className="collapse-all" type="button" aria-expanded={expanded} aria-controls="organigrama" onClick={toggleTree}>{expanded ? 'Contraer estructura' : 'Expandir estructura'}</button></div><div className="org-layout section-shell"><div id="organigrama" className={`org-tree ${expanded ? '' : 'collapsed'}`}><div className="org-root"><OrgCard node={orgNodes[0]} selected={selectedId === 'jefatura'} onSelect={() => choose('jefatura')}/></div>{expanded && <><div className="org-branch"><OrgCard node={orgNodes[1]} selected={selectedId === 'auditorias'} onSelect={() => choose('auditorias')}/></div><div className="org-children">{orgNodes.slice(2).map(node => <OrgCard key={node.id} node={node} selected={selectedId === node.id} onSelect={() => choose(node.id)} compact/>)}</div></>}</div><OrgInfo node={selected}/></div><div className="org-mobile-list section-shell">{orgNodes.map(node => { const open = sheetOpen && selectedId === node.id; const detailId = `puesto-${node.id}`; return <Fragment key={node.id}><OrgCard node={node} selected={open} onSelect={() => toggleMobile(node.id)} compact disclosure controls={detailId}/>{open && <OrgInfo id={detailId} node={node}/>}</Fragment>; })}</div></section>;
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
  return <div className="landing-page" id={pageId}><a className="skip-link" href="#contenido">Saltar al contenido</a><Header/><main id="contenido"><div className="page-frame"><Hero/></div><section className="about" id="conoce"><div className="section-shell reveal"><div><h2>Información institucional</h2><p>Consulta la misión, visión, valores y estructura organizacional confirmados para la JSDP en Sonora.</p></div><a className="secondary-button" href="#estructura">Consultar estructura <Icon name="arrow" size={18}/></a></div></section><MissionVision/><Values/><OrganizationChart/><PlannedFeatures/></main><Footer/></div>;
}
