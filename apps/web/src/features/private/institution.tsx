import {useNavigate} from 'react-router';
import React,{useContext,useEffect,useRef,useState} from 'react';
import {extendedSculptureGeometry} from './extended-sculpture-geometry';
import {UserMenu} from './registry/user-menu/user-menu';
import {Building2} from 'lucide-react';
import {ViewerContext} from './profiles';
export function InstitutionBrand({theme='light',compact=false,header=false}){const file=compact?'Logotipo_del_IMSS':'JSDP-Sonora-11';return <div className={'identity-brand '+(compact?'identity-compact':'')+(header?' identity-in-header':'')}><img src={'/private/identity/'+file+(theme==='dark'?'-claro':'')+'.svg'} alt={compact?'IMSS · JSDP Sonora':'JSDP Sonora'}/>{compact&&<span>JSDP</span>}</div>}
export function InstitutionMarks({theme='light',compact=false}){return <div className={'institution-marks '+(compact?'institution-emblem':'')} role="img" aria-label="Gobierno de México"><img className="government-seal" src="/private/identity/Gobierno-de-Mexico-emblema-oro.svg" alt=""/>{!compact&&<img className="government-wordmark" src="/private/identity/Gobierno-de-Mexico-texto-claro.svg" alt=""/>}</div>}
export function SidebarSculpture({theme='light',referenceWidth=224,compact=false,dialog=false,hidden=false}){
 const layer=useRef<HTMLDivElement>(null),photo=useRef<HTMLImageElement>(null);
 const [geometry,setGeometry]=useState(()=>extendedSculptureGeometry({referenceWidth,referenceHeight:dialog?900:876,hostHeight:900,sideTop:dialog?0:12,anchor:compact&&!dialog?'face':'base',alignTop:dialog,theme}));
 useEffect(()=>{
  const box=layer.current,host=box?.parentElement;if(!box||!host)return;
  const side=dialog?host:host.querySelector<HTMLElement>('[data-jsdp-sidebar]');
  const slot=dialog?host:host.querySelector<HTMLElement>('[data-jsdp-slot]');
  if(!side||!slot)return;
  function measure(){
   if(!box||!host||!side||!slot)return;
   const style=getComputedStyle(box),photoFraction=parseFloat(style.getPropertyValue('--statue-height'))/100||.54;
   const skyEnd=parseFloat(style.getPropertyValue('--sky-fade-end'))/100||.22;
   const user=side.querySelector('.footer-account-trigger');
   const hostRect=host.getBoundingClientRect(),userRect=user?.getBoundingClientRect();
   const projection=hostRect.width/host.clientWidth;
   const targetCenterX=!compact&&userRect&&projection>0?(userRect.left+userRect.width/2-hostRect.left)/projection:undefined;
   const next=extendedSculptureGeometry({referenceWidth:dialog?Math.min(288,(host.closest('[class*="_shell_"]')?.clientWidth||328)-40):parseFloat(getComputedStyle(side).width)/1.15,menuWidth:parseFloat(getComputedStyle(side).width),referenceHeight:side.clientHeight,hostHeight:host.clientHeight,sideTop:dialog?0:slot.offsetTop,sideLeft:dialog?0:slot.offsetLeft,photoFraction,anchor:compact&&!dialog?'face':'base',targetCenterX,alignTop:dialog,theme,skyEnd});
   setGeometry(current=>JSON.stringify(current)===JSON.stringify(next)?current:next);
  }
  measure();const observer=new ResizeObserver(measure);for(const target of new Set([host,side,slot,side.querySelector('.footer-account-trigger')].filter((item):item is HTMLElement=>item instanceof HTMLElement)))observer.observe(target);window.addEventListener('resize',measure);
  return()=>{observer.disconnect();window.removeEventListener('resize',measure)};
 },[theme,compact,dialog,referenceWidth]);
 const src='/private/identity/Escultura_IMSS_sideMenu'+(theme==='dark'?'-oscuro':'')+'.webp';
 const mask='linear-gradient(to right,#000 0px,#000 '+geometry.fadeStart+'px,transparent '+geometry.fadeEnd+'px)';
 return <div ref={layer} className="sidebar-sculpture sculpture-extended" data-photo-theme={theme} data-photo-compact={compact||undefined} data-photo-dialog={dialog||undefined} hidden={hidden} aria-hidden="true" style={{top:geometry.top,bottom:0,height:'auto'}}><div className="sculpture-right-fade" style={{maskImage:mask,WebkitMaskImage:mask}}><div className="sculpture-sky-fade" style={{maskImage:geometry.skyMask,WebkitMaskImage:geometry.skyMask}}><img ref={photo} className="sculpture-registered-photo" src={src} alt="" decoding="async" draggable={false} style={{left:geometry.left,top:geometry.imageTop,width:geometry.imageWidth,height:geometry.imageHeight}}/><div className="sculpture-floor" style={{left:geometry.left,top:geometry.floorTop,width:geometry.imageWidth,height:geometry.floorHeight,backgroundImage:'url('+src+')',backgroundSize:geometry.imageWidth+'px '+geometry.floorBackgroundHeight+'px'}}/></div></div></div>
}
export function SidebarIdentity({compact=false}){const profile=useContext(ViewerContext);const role=profile.kind==='delegation'?profile.office:profile.kind==='medical'?'Unidad médica':'Unidad no médica';const label='Unidad: '+profile.unitName+'. Rol: '+profile.role;const short=profile.id==='hgr01'?'HGR 01':profile.kind==='delegation'?'OOAD':profile.kind==='medical'?'UM':'UNM';return <div className={'sidebar-identity '+(compact?'identity-is-compact':'')} role="group" aria-label={label} title={label}><Building2 size={compact?16:17} aria-hidden="true"/><div><strong>{compact?short:profile.unitName}</strong>{!compact&&<span>{role}</span>}</div></div>}

export function Account({compact=false}){const profile=useContext(ViewerContext),navigate=useNavigate();const notice=(message:string)=>window.dispatchEvent(new CustomEvent('jsdp-private-notice',{detail:message}));return <div className={'account-control '+(compact?'account-compact':'')}><UserMenu className="footer-account-trigger" align="center" user={{name:'Juan Pérez',email:'Cuenta de demostración'}} showName={!compact} showTheme={false} portal items={[{label:'Mi perfil',onSelect:()=>notice('Juan Pérez · '+profile.role+'. Cuenta de demostración.')},{label:'Preferencias',onSelect:()=>notice('Usa el control de apariencia para cambiar entre modo claro y oscuro.')}]} onSignOut={()=>navigate('/inicio-sesion')}/></div>}
