import type {Profile as ViewerProfile} from '../../../types';
import type {NavigationEntry} from '../../../role-navigation';
"use client";

import { useContext, useEffect, useId, useLayoutEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useTransform, type Transition, type Variants } from "motion/react";
import { ChevronRight, FileText, FlaskConical, Folder, CircleDollarSign, House, Inbox, MessageSquareText, Route, Settings, Scale, Users, X, type LucideIcon } from "lucide-react";
import { AnimatedCounter } from "../../animated-counter/animated-counter";
import { Avatar } from "../../avatar/avatar";
import { AvatarGroup } from "../../avatar-group/avatar-group";
import { Badge, type BadgeTone } from "../../badge/badge";
import { Tooltip } from "../../tooltip/tooltip";
import { motionTokens } from "../../lib/motion-tokens";
import { UserMenu } from "../../user-menu/user-menu";
import {InstitutionBrand,InstitutionMarks,Account,SidebarSculpture,SidebarIdentity} from "../../../institution";
import styles from "./sidebar-rail.module.css";
import {ViewerContext} from "../../../profiles";
import {navigationFor,ROUTES} from "../../../role-navigation";
import {NAVIGATION_ICONS} from "../../../navigation-icons";

const FULL_WIDTHS = [224,228,232,220,236,224,228,220,232,224];
const RAIL_WIDTHS = [64,68,64,64,72,68,64,64,68,64];

/** Below this shell width the sidebar leaves the layout and opens as a sheet. Matches the container query in the CSS. */
const COMPACT = 480;
/** Below this shell width the abierto sidebar floats over the page from the rail instead of squeezing it, the way a tablet drawer does. */
const FLOAT = 640;
/** Below this shell width the sidebar starts as the icon rail, so the page keeps room to read. It can still be abierto. */
const ROOMY = 760;
/** How long a picked row's highlight gets to land before a floating panel or sheet slides away. */
const SETTLE_MS = 200;

const people = {
  emma: { name: "Emma Collins", src: "/media/people/emma-collins.svg" },
  marcus: { name: "Marcus Johnson", src: "/media/people/marcus-johnson.svg" },
  ava: { name: "Ava Mitchell", src: "/media/people/ava-mitchell.svg" },
  jasmine: { name: "Jasmine Brooks", src: "/media/people/jasmine-brooks.svg" },
  sofia: { name: "Sofia Ramirez", src: "/media/people/sofia-ramirez.svg" },
};
type Person = keyof typeof people;
type Row = { title: string; detail: string; person: Person; status: string; tone: BadgeTone; when: string };
type Page = { title: string; parent?: string; summary: string; team: Person[]; stats: { label: string; value: number; suffix?: string }[]; list: string; rows: Row[] };
type Entry = { id: string; label: string; icon?: LucideIcon; count?: number; children?: Entry[] };

const icons=NAVIGATION_ICONS;
function sectionsFor(profile:ViewerProfile):{id:string;heading?:string;items:Entry[]}[]{const convert=(entry:NavigationEntry):Entry=>({...entry,icon:entry.icon?icons[entry.icon]:undefined,children:entry.children?.map(child=>convert(child))});return [{id:'role-links',items:navigationFor(profile).map(item=>convert(item))}]}
const pages:Record<string,Page>=Object.fromEntries(Object.entries(ROUTES).map(([id,meta])=>[id,{title:meta.label,parent:meta.group||undefined,team:[],stats:[],rows:[],list:'',summary:''}]));
const parentLabels = [...new Set(Object.values(pages).flatMap(page => (page.parent ? [page.parent] : [])))];

const curve = (points: readonly number[]) => [...points] as [number, number, number, number];
const instant: Transition = { duration: 0 };

/** Labels leave quickly so they are gone a beat before the rail settles, and return a beat after the width starts opening. */
function labelTiming(collapsed: boolean, reduce: boolean): Transition {
  if (reduce) return instant;
  return collapsed ? { duration: .14, ease: curve(motionTokens.ease.standard) } : { duration: .24, delay: .1, ease: curve(motionTokens.ease.enter) };
}

/** Rail-only marks (dividers and unread dots) arrive once the labels have cleared, and leave first when the rail opens. */
function markTiming(collapsed: boolean, reduce: boolean): Transition {
  if (reduce) return instant;
  return collapsed ? { duration: .2, delay: .16, ease: curve(motionTokens.ease.enter) } : { duration: .1, ease: curve(motionTokens.ease.standard) };
}

const rise: Variants = {
  hidden: { opacity: 0, y: 8, filter: `blur(${motionTokens.blur.soft}px)` },
  shown: { opacity: 1, y: 0, filter: "blur(0px)" },
  gone: { opacity: 0, y: -6, filter: `blur(${motionTokens.blur.subtle}px)` },
};

function RailTip({ enabled, label, note, children }: { enabled: boolean; label: string; note?: string; children: ReactElement }) {
  const [open, setOpen] = useState(false);
  // Closing the rail while a tip is open should not leave it armed for the next collapse.
  if (!enabled && open) setOpen(false);
  return <TooltipPrimitive.Root open={enabled && open} onOpenChange={next => setOpen(next && enabled)}>
    <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content className={styles.tip} side="right" sideOffset={14} collisionPadding={8}>{label}{note && <span className={styles.tipNote}>{note}</span>}</TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>;
}

type RowProps = { entry: Entry; nested?: boolean; current: boolean; lit: boolean; expanded?: boolean; turned?: boolean; controls?: string; collapsed: boolean; tips: boolean; layoutId: string; reduce: boolean; onClick: () => void };

function NavRow({ entry, nested, current, lit, expanded, turned, controls, collapsed, tips, layoutId, reduce, onClick }: RowProps) {
  const Icon = entry.icon;
  const fade = labelTiming(collapsed, reduce);
  const mark = markTiming(collapsed, reduce);
  return <RailTip enabled={tips} label={entry.label} note={entry.count ? `${entry.count} unread` : undefined}>
    <button type="button" data-jsdp-nav-item="" aria-label={entry.label} title={entry.label} data-nav-active={lit||undefined} data-nav-nested={nested||undefined} className={[styles.item, nested ? styles.nested : "", lit ? styles.lit : ""].join(" ")} aria-current={current ? "page" : undefined} aria-expanded={expanded} aria-controls={controls} onClick={onClick}>
      {lit && <motion.span key="selected" className="nav-local-feedback" initial={reduce?false:{opacity:0,scale:.94}} animate={{opacity:1,scale:1}} transition={reduce?instant:{duration:.16}} aria-hidden="true" />}
      {Icon && <Icon className={styles.icon} size={16} strokeWidth={1.75} aria-hidden="true" />}
      <motion.span className={styles.label} initial={false} animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -6 : 0 }} transition={fade}>{entry.label}{entry.count ? <span className={styles.srOnly}>, {entry.count} unread</span> : null}</motion.span>
      {entry.count ? <>
        <motion.span className={styles.count} aria-hidden="true" initial={false} animate={{ opacity: collapsed ? 0 : 1 }} transition={fade}>{entry.count}</motion.span>
        <motion.span className={styles.dot} aria-hidden="true" initial={false} animate={{ opacity: collapsed ? 1 : 0, scale: collapsed ? 1 : .3 }} transition={collapsed && !reduce ? { ...motionTokens.spring.snappy, delay: .16 } : mark} />
      </> : null}
      {turned !== undefined && <motion.span className={styles.chevron} aria-hidden="true" initial={false} animate={{ opacity: collapsed ? 0 : 1, rotate: turned ? 90 : 0 }} transition={{ opacity: fade, rotate: reduce ? instant : motionTokens.spring.snappy }}><ChevronRight size={14} strokeWidth={1.75} /></motion.span>}
    </button>
  </RailTip>;
}

type NavProps = { variant: "side" | "sheet"; baseId: string; collapsed: boolean; active: string; open: Record<string, boolean>; reduce: boolean; onSelect: (id: string) => void; onGroup: (id: string) => void };

function Navegación({ variant, baseId, collapsed, active, open, reduce, onSelect, onGroup }: NavProps) {
  const profile=useContext(ViewerContext);
  const sections=sectionsFor(profile);
  const tips = variant === "side" && collapsed;
  const layoutId = `${variant}-active`;
  const fade = labelTiming(collapsed, reduce);
  const mark = markTiming(collapsed, reduce);
  const height = reduce ? instant : motionTokens.spring.smooth;
  const shared = { collapsed, tips, layoutId, reduce };
  return <motion.nav data-jsdp-nav="" className={styles.nav} aria-label="JSDP Sonora" layoutScroll>
    {sections.map(section => {
        const headingId = `${baseId}-${variant}-${section.id}`;
        return <div key={section.id} className={styles.section} role={section.heading ? "group" : undefined} aria-labelledby={section.heading ? headingId : undefined}>
          {section.heading && <motion.div className={styles.heading} initial={false} animate={{ height: collapsed ? 17 : 32 }} transition={height}>
            <motion.span id={headingId} className={styles.headingText} initial={false} animate={{ opacity: collapsed ? 0 : 1, x: collapsed ? -6 : 0 }} transition={fade}>{section.heading}</motion.span>
            <motion.span className={styles.divider} aria-hidden="true" initial={false} animate={{ opacity: collapsed ? 1 : 0, scaleX: collapsed ? 1 : .3 }} transition={mark} />
          </motion.div>}
          <ul className={styles.list} role="list">
            {section.items.map(entry => {
              if (!entry.children) return <li key={entry.id}><NavRow entry={entry} current={active === entry.id} lit={active === entry.id} onClick={() => onSelect(entry.id)} {...shared} /></li>;
              const listId = `${baseId}-${variant}-${entry.id}-list`;
              const holdsActive = entry.children.some(child => child.id === active);
              const shown = collapsed ? !!open[entry.id] || holdsActive : !!open[entry.id];
              return <li key={entry.id}>
                <NavRow entry={entry} current={false} lit={holdsActive && !shown} expanded={shown} turned={shown} controls={listId} onClick={() => onGroup(entry.id)} {...shared} />
                <motion.ul id={listId} className={styles.children} role="list" inert={!shown} initial={false} animate={shown ? { height: "auto", opacity: 1, transitionEnd: { overflow: "visible" } } : { height: 0, opacity: 0, overflow: "hidden" }} transition={{ height, opacity: reduce ? instant : { duration: shown ? .24 : .14, delay: shown ? .06 : 0, ease: curve(motionTokens.ease.standard) } }}>
                  {entry.children.map(child => <li key={child.id}><NavRow entry={child} nested current={active === child.id} lit={shown && active === child.id} onClick={() => onSelect(child.id)} {...shared} /></li>)}
                </motion.ul>
              </li>;
            })}
          </ul>
        </div>;
    })}
  </motion.nav>;
}

function Brand({collapsed,reduce,theme}:{collapsed:boolean;reduce:boolean;theme:string}){return <div data-jsdp-brand="" className={styles.brand}><InstitutionBrand theme={theme} compact={collapsed}/></div>}
function Profile({collapsed,reduce,theme,placement,design}:{collapsed:boolean;reduce:boolean;theme:string;placement:string;design:number}){return <div className="institution-footer"><InstitutionMarks theme={theme} compact={collapsed}/>{placement==='bottom'&&<Account compact={collapsed}/>}</div>}
/** The divider in the panel icon slides with the sidebar, so the control shows what it is about to do. */
function PanelGlyph({ collapsed, reduce }: { collapsed: boolean; reduce: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <rect x="2.75" y="3.75" width="14.5" height="12.5" rx="3.5" />
    <motion.path d="M8.25 4.25v11.5" initial={false} animate={{ x: collapsed ? -2.5 : 0 }} transition={reduce ? instant : motionTokens.spring.smooth} />
  </svg>;
}

export function SidebarRail({children, headerActions, className = "", design=0, theme="light", profilePlacement="bottom", activeRoute, onRouteChange, compactPreview=false}: {children: (active: string) => ReactNode; headerActions?: ReactNode | ((active:string)=>ReactNode); className?: string; design?:number; theme?:string; profilePlacement?:string; activeRoute?:string; onRouteChange?:(id:string)=>void; compactPreview?:boolean}) {
  const FULL=FULL_WIDTHS[design]*1.15; const RAIL=RAIL_WIDTHS[design]*1.15; const sideTheme=theme;
  const baseId = useId();
  const prefersReduced = !!useReducedMotion();
  // The first measurement settles the layout before paint, so it never animates.
  const [settling, setSettling] = useState(true);
  const reduce = prefersReduced || settling;
  const [collapsed, setCollapsed] = useState(compactPreview);
  const [floating, setFloating] = useState(false);
  const [innerActive,setInnerActive]=useState("home");
  const active=activeRoute??innerActive;
  const setActive=(id:string)=>{setInnerActive(id);onRouteChange?.(id)};
  const [open, setOpen] = useState<Record<string, boolean>>({ projects: true, balance:true, users:true });
  const [sheetOpen, setSheetOpen] = useState(false);
  const [frame, setFrame] = useState<HTMLElement | null>(null);
  const [status, setStatus] = useState("");
  const sheet = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const dragging = useRef(false);
  const closeTimer = useRef(0);
  const page = pages[active];
  const sidebarId = `${baseId}-sidebar`;
  const sheetId = `${baseId}-navigation-sheet`;

  // The [ shortcut toggles the rail, or the sheet when the shell is narrow. It stays out of text fields and off-screen shells.
  useEffect(() => {
    if (!frame) return;
    function onKey(event: KeyboardEvent) {
      if (event.key !== "[" || event.metaKey || event.ctrlKey || event.altKey || event.defaultPrevented || !frame) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
      const box = frame.getBoundingClientRect();
      if (!box.width || box.bottom < 0 || box.top > window.innerHeight) return;
      event.preventDefault();
      if (frame.clientWidth < COMPACT) { setSheetOpen(!sheetOpen); return; }
      setCollapsed(!collapsed);
      setStatus(collapsed ? "Menú expandido" : "Menú contraído");
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [frame, collapsed, sheetOpen]);

  // A mid-width shell starts on the rail; crossing the threshold later folds or opens it once, and a sheet has no place in the wide layout.
  const roomy = useRef<boolean | null>(null);
  useLayoutEffect(() => {
    if (!frame) return;
    const fit = () => {
      const width = frame.clientWidth;
      if (width >= COMPACT) setSheetOpen(false);
      const floats = width >= COMPACT && width < FLOAT;
      setFloating(floats);
      const next = width >= ROOMY;
      if (roomy.current !== next) { const first = roomy.current === null; roomy.current = next; setCollapsed(first ? compactPreview || !next : !next); }
      // A panel left open while the shell narrows would cover the page, so it folds back to the rail.
      else if (floats) setCollapsed(true);
    };
    fit();
    const settle = requestAnimationFrame(() => setSettling(false));
    const observer = new ResizeObserver(fit);
    observer.observe(frame);
    return () => { observer.disconnect(); cancelAnimationFrame(settle); };
  }, [frame]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Every parent label is measured up front, so a crumb that swaps one parent for another can spring between real widths.
  const sizers = useRef<HTMLSpanElement>(null);
  const [parentWidths, setParentWidths] = useState<Record<string, number>>({});
  useLayoutEffect(() => {
    const node = sizers.current;
    if (!node) return;
    const measure = () => setParentWidths(Object.fromEntries(Array.from(node.children, child => [(child as HTMLElement).dataset.label ?? "", (child as HTMLElement).offsetWidth])));
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function toggleRail() {
    if(frame&&frame.clientWidth<COMPACT){setSheetOpen(true);return}
    setCollapsed(!collapsed);
    setStatus(collapsed ? "Menú expandido" : "Menú contraído");
    requestAnimationFrame(() => menuButton.current?.focus({preventScroll:true}));
  }

  const overlaid = floating && !collapsed;

  function fold() {
    setCollapsed(true);
    setStatus("Menú contraído");
  }

  function select(id: string, fromSheet = false) {
    if (fromSheet && dragging.current) return;
    setActive(id);
    setStatus(`${pages[id].title} abierto`);
    if (!fromSheet && !overlaid) return;
    // Let the highlight arrive before the sheet or the floating panel slides away.
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => (fromSheet ? setSheetOpen(false) : setCollapsed(true)), reduce ? 0 : SETTLE_MS);
  }

  function toggleGroup(id: string, fromSheet = false) {
    if(frame&&frame.clientWidth<COMPACT&&!fromSheet){setSheetOpen(true);setOpen(current=>({...current,[id]:true}));return}
    if (fromSheet && dragging.current) return;
    // In the rail a group has nowhere to open, so the sidebar widens to reveal it.
    if (collapsed && !fromSheet) {
      setOpen(current => ({ ...current, [id]: !current[id] }));
      setStatus("Grupo de presupuesto actualizado");
      return;
    }
    setOpen(current => ({ ...current, [id]: !current[id] }));
  }

  // The scrim follows the sheet, so a drag to dismiss lightens the page under the finger instead of waiting for release.
  const sheetX = useMotionValue<number | string>("-100%");
  const scrimOpacity = useTransform(sheetX, value => {
    const width = sheet.current?.offsetWidth || 288;
    const shift = typeof value === "number" ? value / width : value.endsWith("%") ? parseFloat(value) / 100 : parseFloat(value) / width;
    return Math.min(1, Math.max(0, 1 + (Number.isFinite(shift) ? shift : -1)));
  });

  const swap = reduce ? instant : { duration: motionTokens.duration.standard, ease: curve(motionTokens.ease.enter) };
  const stagger: Variants = { shown: { transition: { staggerChildren: reduce ? 0 : motionTokens.stagger.item } } };

  return <LayoutGroup id={baseId}>
    <TooltipPrimitive.Provider delayDuration={250} skipDelayDuration={300}>
      <section ref={setFrame} className={`${styles.shell} ${className}`} aria-label="Aplicación privada JSDP" onKeyDown={event => { if (event.key === "Escape" && overlaid && !event.defaultPrevented) { event.preventDefault(); fold(); } }}>
        <SidebarSculpture theme={sideTheme} referenceWidth={collapsed?RAIL_WIDTHS[design]:FULL_WIDTHS[design]} compact={collapsed} hidden={sheetOpen}/>{/* The slot holds the sidebar's place in the row. On a floating shell it keeps the rail's width and the panel opens over the page. */}
        <motion.div data-jsdp-slot="" className={styles.slot} initial={false} animate={{ width: floating || collapsed ? RAIL : FULL }} transition={reduce ? instant : motionTokens.spring.smooth}>
          <motion.div id={sidebarId} data-jsdp-sidebar="" data-side-theme={sideTheme} className={styles.sidebar} initial={false} animate={{ width: collapsed ? RAIL : FULL }} transition={reduce ? instant : motionTokens.spring.smooth} data-collapsed={collapsed || undefined} data-floating={overlaid || undefined}>
            <div className="sidebar-brand-row">{collapsed?<Tooltip side="bottom" content="Expandir menú"><button ref={menuButton} type="button" className="imss-expand" aria-label="Expandir menú" title="Expandir menú" aria-expanded={sheetOpen} aria-controls={frame&&frame.clientWidth<COMPACT?sheetId:sidebarId} aria-keyshortcuts="[" onClick={toggleRail}><InstitutionBrand theme={sideTheme} compact/></button></Tooltip>:<><Brand collapsed={false} reduce={reduce} theme={sideTheme}/><Tooltip side="bottom" content="Reducir menú"><button ref={menuButton} type="button" className="sidebar-collapse" aria-label="Reducir menú" aria-expanded aria-controls={sidebarId} aria-keyshortcuts="[" onClick={toggleRail}><PanelGlyph collapsed={false} reduce={reduce}/></button></Tooltip></>}</div>
            <SidebarIdentity compact={collapsed}/><Navegación variant="side" baseId={baseId} collapsed={collapsed} active={active} open={open} reduce={reduce} onSelect={id => select(id)} onGroup={id => toggleGroup(id)} />
            <Profile collapsed={collapsed} reduce={reduce} theme={sideTheme} placement={profilePlacement} design={design} />
          </motion.div>
        </motion.div>
        <AnimatePresence>
          {overlaid && <motion.div key="float-scrim" className={`${styles.scrim} ${styles.floatScrim}`} aria-hidden="true" onClick={fold} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={reduce ? instant : { duration: motionTokens.duration.standard, ease: curve(motionTokens.ease.standard) }} />}
        </AnimatePresence>

        <div data-jsdp-main="" className={styles.main}>
          <header data-jsdp-topbar="" className={styles.topbar}>
            <nav data-jsdp-crumbs="" className={styles.crumbs} aria-label="Ruta actual">
              <ol>
                <li className={styles.crumbRoot}>JSDP Sonora</li>
                <AnimatePresence initial={false}>
                  {page.parent && <motion.li key="parent" className={styles.crumbParent} initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={reduce ? instant : motionTokens.spring.morph}>
                    {/* The parent can change while the crumb stays, so its width follows the new label instead of snapping. */}
                    <motion.span className={styles.crumbSwap} initial={false} animate={{ width: parentWidths[page.parent] ?? "auto" }} transition={reduce ? instant : motionTokens.spring.morph}><AnimatePresence mode="popLayout" initial={false}><motion.span key={page.parent} variants={rise} initial="hidden" animate="shown" exit="gone" transition={swap}>{page.parent}</motion.span></AnimatePresence></motion.span>
                  </motion.li>}
                </AnimatePresence>
                <li className={styles.crumbCurrent} aria-current="page"><AnimatePresence mode="popLayout" initial={false}><motion.span key={active} variants={rise} initial="hidden" animate="shown" exit="gone" transition={swap}>{page.title}</motion.span></AnimatePresence></li>
              </ol>
              <span ref={sizers} className={styles.crumbSizers} aria-hidden="true">{parentLabels.map(label => <span key={label} data-label={label}>{label}</span>)}</span>
            </nav>
            <div className="shell-actions">{typeof headerActions==="function"?headerActions(active):headerActions}</div>
          </header>

          <div data-jsdp-content="" className={styles.content}><AnimatePresence mode="wait" initial={false}><motion.div key={active} className="route-view" initial={reduce?{opacity:1}:{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={reduce?{opacity:1}:{opacity:0,y:-6}} transition={reduce?instant:{duration:.22,ease:[.16,1,.3,1]}}>{children(active)}</motion.div></AnimatePresence></div>
          <p className={styles.srOnly} role="status" aria-live="polite">{status}</p>
        </div>

        <Dialog.Root open={sheetOpen} onOpenChange={setSheetOpen}>
          <AnimatePresence>
            {sheetOpen && frame && <Dialog.Portal forceMount container={frame}>
              <Dialog.Overlay asChild forceMount><motion.div className={styles.scrim} style={{ opacity: scrimOpacity }} /></Dialog.Overlay>
              <Dialog.Content asChild forceMount aria-describedby={undefined} onCloseAutoFocus={event => { event.preventDefault(); menuButton.current?.focus({ preventScroll: true }); }} onOpenAutoFocus={event => { const current = sheet.current?.querySelector<HTMLElement>("[aria-current='page']"); if (current && !current.closest("[inert]")) { event.preventDefault(); current.focus(); } }}>
                <motion.div ref={sheet} id={sheetId} data-side-theme={sideTheme} className={styles.sheet} style={{ x: sheetX }} initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={reduce ? instant : motionTokens.spring.smooth}
                  drag={prefersReduced ? false : "x"} dragConstraints={{ left: 0, right: 0 }} dragElastic={{ left: .9, right: .04 }} dragMomentum={false}
                  onDragStart={() => { dragging.current = true; sheet.current?.setAttribute("data-dragging", ""); }}
                  onDragEnd={(_, info) => { sheet.current?.removeAttribute("data-dragging"); window.setTimeout(() => { dragging.current = false; }, 0); if (info.offset.x < -72 || info.velocity.x < -480) setSheetOpen(false); }}>
                  <SidebarSculpture theme={sideTheme} referenceWidth={288} dialog/><Dialog.Title className={styles.srOnly}>Navegación</Dialog.Title>
                  <div className={styles.sheetHead}>
                    <Brand collapsed={false} reduce={reduce} theme={sideTheme} />
                    <Dialog.Close asChild><button type="button" className={styles.iconButton} aria-label="Cerrar navegación"><X size={18} strokeWidth={1.75} aria-hidden="true" /></button></Dialog.Close>
                  </div>
                  <SidebarIdentity compact={false}/><Navegación variant="sheet" baseId={baseId} collapsed={false} active={active} open={open} reduce={reduce} onSelect={id => select(id, true)} onGroup={id => toggleGroup(id, true)} />
                  <Profile collapsed={false} reduce={reduce} theme={sideTheme} placement="bottom" design={design} />
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>}
          </AnimatePresence>
        </Dialog.Root>
      </section>
    </TooltipPrimitive.Provider>
  </LayoutGroup>;
}

export default SidebarRail;
