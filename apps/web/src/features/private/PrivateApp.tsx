import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import {flushSync} from 'react-dom';
import {useLocation,useNavigate} from 'react-router';
import {GripHorizontal,Minus,RotateCcw,SlidersHorizontal} from 'lucide-react';
import {PrivateScreen} from './private-screen';
import {PROFILES} from './profiles';
import {routesFor} from './role-navigation';
import {privatePath,privateRoute,routeTitle} from './private-routes';
import {useFloatingControls} from './floating-controls';
import {Button} from './registry/button/button';
import {ThemeSwitch} from './registry/theme-switch/theme-switch';
import type {Theme,PreviewState} from './types';
import './styles/private.css';
import './styles/application.css';

/** Visual private application. The scenario selector does not grant real permissions. */
export default function PrivateApp(){
 const location=useLocation(),navigate=useNavigate();
 const search=new URLSearchParams(location.search),profileId=search.get('perfil')||'hgr01';
 const profile=PROFILES.find(item=>item.id===profileId)||PROFILES[0],allowed=routesFor(profile),route=privateRoute(location.pathname,profile);
 const [theme,setTheme]=useState<Theme>('light'),[controlsOpen,setControlsOpen]=useState(true),[rail,setRail]=useState(false),[mobile,setMobile]=useState(false),[compare,setCompare]=useState(false),[notificationMode,setNotificationMode]=useState('example'),[state,setState]=useState<PreviewState>('normal'),[reloading,setReloading]=useState(false),[stageSize,setStageSize]=useState({width:1440,height:900});
 const stageRef=useRef<HTMLElement>(null),controlsRef=useRef<HTMLElement>(null),hideRef=useRef<HTMLButtonElement>(null),showRef=useRef<HTMLButtonElement>(null),timer=useRef<ReturnType<typeof setTimeout>|undefined>(undefined);
 const floating=useFloatingControls(true,stageRef,controlsRef);
 useLayoutEffect(()=>{const root=document.documentElement,previousTheme=root.dataset.theme;const previousTitle=document.title;root.dataset.jsdpPrivate='true';return()=>{delete root.dataset.jsdpPrivate;if(previousTheme===undefined)delete root.dataset.theme;else root.dataset.theme=previousTheme;document.title=previousTitle;clearTimeout(timer.current)}},[]);
 useLayoutEffect(()=>{document.documentElement.dataset.theme=theme},[theme]);
 useEffect(()=>{document.title=routeTitle(route)+' | JSDP Sonora'},[route]);
 useEffect(()=>{if(location.pathname!==privatePath(route))navigate({pathname:privatePath(route),search:location.search},{replace:true})},[route,location.pathname,location.search,navigate]);
 useEffect(()=>{const node=stageRef.current;if(!node)return;const measure=()=>setStageSize({width:node.clientWidth,height:node.clientHeight});measure();const observer=new ResizeObserver(measure);observer.observe(node);return()=>observer.disconnect()},[]);
 useEffect(()=>{const restore=()=>setState('normal');window.addEventListener('restore-state',restore);return()=>window.removeEventListener('restore-state',restore)},[]);
 function go(id:string){clearTimeout(timer.current);setReloading(false);navigate({pathname:privatePath(allowed.includes(id)?id:'home'),search:location.search})}
 function selectProfile(id:string){const next=PROFILES.find(item=>item.id===id)||PROFILES[0],query=new URLSearchParams(location.search);query.set('perfil',next.id);navigate({pathname:privatePath(routesFor(next).includes(route)?route:'home'),search:'?'+query.toString()},{replace:true})}
 function changeTheme(next:Theme){if(next===theme)return;const apply=()=>{document.documentElement.dataset.theme=next;flushSync(()=>setTheme(next))};if(matchMedia('(prefers-reduced-motion: reduce)').matches||!document.startViewTransition){apply();return}const transition=document.startViewTransition(apply);void transition.finished.catch(()=>undefined)}
 function hideControls(){setControlsOpen(false);requestAnimationFrame(()=>showRef.current?.focus({preventScroll:true}))}
 function showControls(){setControlsOpen(true);requestAnimationFrame(()=>hideRef.current?.focus({preventScroll:true}))}
 const stacked=compare&&!mobile&&stageSize.width<960,width=mobile?Math.min(390,stageSize.width):stageSize.width/(compare&&!stacked?2:1),height=stacked?Math.floor(stageSize.height/2):stageSize.height,screenMobile=mobile||width<480;
 const screen=(key:string)=><PrivateScreen key={key+'-'+rail+'-'+screenMobile} theme={theme} setTheme={changeTheme} route={route} onRouteChange={go} profileId={profile.id} rail={rail} state={state==='normal'&&reloading?'carga':state} mobile={screenMobile} fluid notificationMode={notificationMode}/>;
 return <div className={'private-app is-full-browser'+(!controlsOpen?' controls-hidden':'')+(floating.suppressed?' controls-suppressed':'')}>
  <a className="private-skip" href="#private-content">Ir al contenido</a>
  <main id="private-content" tabIndex={-1}>
   <section ref={controlsRef} id="private-controls" className="private-controls" aria-label="Controles de revisión" style={floating.style} data-dragging={floating.dragging||undefined} aria-hidden={!controlsOpen||undefined} inert={!controlsOpen?true:undefined}>
    <div className="floating-control-head"><button type="button" className="controls-drag-handle" {...floating.dragProps} aria-label="Mover controles verticalmente" title="Arrastra o usa las flechas del teclado"><GripHorizontal size={18}/><span>Controles · {Math.round(width)} × {height} px</span></button><Button ref={hideRef} variant="ghost" onClick={hideControls} aria-controls="private-controls" aria-expanded={controlsOpen} aria-label="Minimizar controles"><Minus size={18}/></Button></div>
    <div className="view-controls">
     <label className="scenario-selector">Escenario <select value={profile.id} onChange={event=>selectProfile(event.target.value)}>{PROFILES.map(item=><option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
     <label className="route-selector">Página <select value={route} onChange={event=>go(event.target.value)}>{allowed.map(id=><option key={id} value={id}>{routeTitle(id)}</option>)}</select></label>
     <label><input type="checkbox" checked={rail} onChange={event=>setRail(event.target.checked)}/>Iniciar colapsado</label>
     <label><input type="checkbox" checked={compare} onChange={event=>{setCompare(event.target.checked);setMobile(false)}}/>Comparar dos</label>
     <label><input type="checkbox" checked={mobile} disabled={compare} onChange={event=>setMobile(event.target.checked)}/>Móvil</label>
     <ThemeSwitch theme={theme} variant="rise" onThemeChange={changeTheme} label={theme==='light'?'Cambiar a modo oscuro':'Cambiar a modo claro'}/>
     <label>Notificaciones <select value={notificationMode} onChange={event=>setNotificationMode(event.target.value)}><option value="example">Ejemplos</option><option value="empty">Vacío</option></select></label>
     <label className="state-label">Estado <select value={state} onChange={event=>setState(event.target.value as PreviewState)}><option value="normal">Con datos</option><option value="carga">Cargando · Morph</option><option value="vacio">Sin datos</option><option value="error">Error</option><option value="restringido">Acceso restringido</option></select></label>
     <Button variant="secondary" onClick={()=>{setState('normal');setReloading(true);clearTimeout(timer.current);timer.current=setTimeout(()=>setReloading(false),120)}}><RotateCcw size={16} strokeWidth={1.75} aria-hidden="true" data-action-icon=""/>Repetir carga</Button>
    </div>
   </section>
   <section ref={stageRef} className={'private-stage'+(mobile?' mobile-stage':'')} aria-label="Aplicación privada JSDP"><div className={'private-screens'+(compare?' compare':'')+(stacked?' stacked-compare':'')}>{screen('primary')}{compare&&screen('comparison')}</div></section>
  </main>
  {!controlsOpen&&<div className="full-review-dock"><Button ref={showRef} variant="secondary" aria-label="Mostrar controles" title="Mostrar controles" aria-controls="private-controls" aria-expanded={controlsOpen} onClick={showControls}><SlidersHorizontal size={20}/></Button></div>}
 </div>
}
