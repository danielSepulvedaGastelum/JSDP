import type {CSSProperties,RefObject,PointerEvent,KeyboardEvent} from 'react';
type Bounds={left:number;right:number;top:number;bottom:number};
import {useEffect,useRef,useState} from 'react';
export function clampLift(value:number,max:number){return Math.max(0,Math.min(value,Math.max(0,max)))}
export function floatingPlacement(main:Pick<Bounds,'left'|'right'>,content:Pick<Bounds,'top'|'bottom'>,sidebarRight:number,panelHeight:number,viewportWidth:number,viewportHeight:number,lift=0){
 const left=Math.min(viewportWidth-24,Math.max(main.left,sidebarRight)+12);
 const right=Math.min(viewportWidth-12,main.right-12);
 const width=Math.max(1,right-left);
 const maxHeight=Math.max(64,content.bottom-content.top-24);
 const height=Math.min(panelHeight||160,maxHeight);
 const maxLift=Math.max(0,content.bottom-content.top-height-24);
 const raised=clampLift(lift,maxLift);
 const top=Math.max(content.top+12,content.bottom-height-12-raised);
 return {left,width,top,maxHeight,maxLift,lift:raised,collapseX:viewportWidth-40-(left+width),collapseY:viewportHeight-40-(top+height)};
}
export function useFloatingControls(active:boolean,stageRef:RefObject<HTMLElement|null>,panelRef:RefObject<HTMLElement|null>){
 const [placement,setPlacement]=useState({left:248,width:1168,top:720,maxHeight:760,maxLift:0,lift:0,collapseX:0,collapseY:0});
 const [suppressed,setSuppressed]=useState(false),[dragging,setDragging]=useState(false);
 const lift=useRef(0),limits=useRef(0),drag=useRef<{id:number;y:number;start:number}|null>(null),scheduleRef=useRef(()=>{});
 useEffect(()=>{if(!active)return;const stage=stageRef.current,panel=panelRef.current;if(!stage||!panel)return;
  let pending=0;const tracked=new Set<Element>();
  const observer=typeof ResizeObserver==='undefined'?null:new ResizeObserver(()=>schedule());
  function measure(){if(!stage||!panel)return;pending=0;const first=stage.querySelector<HTMLElement>('.private-screens.stacked-compare .screen:last-child')||stage.querySelector<HTMLElement>('.screen');const main=first?.querySelector<HTMLElement>('[data-jsdp-main]'),content=first?.querySelector<HTMLElement>('[data-jsdp-content]'),sidebar=first?.querySelector<HTMLElement>('[data-jsdp-sidebar]');if(!main||!content)return;
   const targets=new Set<Element>([main,content,sidebar,panel].filter((item):item is HTMLElement=>!!item));if(observer){for(const item of tracked)if(!targets.has(item)){observer.unobserve(item);tracked.delete(item)}for(const item of targets)if(!tracked.has(item)){observer.observe(item);tracked.add(item)}}
   const dialog=[...stage.querySelectorAll('[role="dialog"]')].some(node=>node.getClientRects().length&&getComputedStyle(node).visibility!=='hidden'&&!node.closest('[inert]'));setSuppressed(dialog);
   const m=main.getBoundingClientRect(),c=content.getBoundingClientRect(),s=sidebar?.getBoundingClientRect();const edge=parseFloat(getComputedStyle(main).getPropertyValue('--main-edge-right'))||0;const retainedMain={left:m.left,right:m.right-edge};const next=floatingPlacement(retainedMain,c,s?.right||m.left,panel.offsetHeight,window.innerWidth,window.innerHeight,lift.current);lift.current=next.lift;limits.current=next.maxLift;
   setPlacement(current=>(Object.keys(next) as (keyof typeof next)[]).every(key=>Math.abs(next[key]-current[key])<.25)?current:next);
  }
  function schedule(){if(!pending)pending=requestAnimationFrame(measure)}scheduleRef.current=schedule;
  const mutation=new MutationObserver(schedule);mutation.observe(stage,{subtree:true,childList:true,attributes:true,attributeFilter:['style','data-collapsed','data-state','class','inert']});window.addEventListener('resize',schedule);schedule();
  return()=>{cancelAnimationFrame(pending);observer?.disconnect();mutation.disconnect();window.removeEventListener('resize',schedule);scheduleRef.current=()=>{}};
 },[active,stageRef,panelRef]);
 function moveTo(value:number){lift.current=clampLift(value,limits.current);scheduleRef.current()}
 function onPointerDown(event:PointerEvent<HTMLButtonElement>){if(event.pointerType==='mouse'&&event.button!==0)return;event.preventDefault();event.currentTarget.focus({preventScroll:true});event.currentTarget.setPointerCapture(event.pointerId);drag.current={id:event.pointerId,y:event.clientY,start:lift.current};setDragging(true)}
 function onPointerMove(event:PointerEvent<HTMLButtonElement>){if(drag.current?.id!==event.pointerId)return;moveTo(drag.current.start+drag.current.y-event.clientY)}
 function onPointerEnd(event:PointerEvent<HTMLButtonElement>){if(drag.current?.id!==event.pointerId)return;if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);drag.current=null;setDragging(false)}
 function onKeyDown(event:KeyboardEvent<HTMLButtonElement>){const steps:Record<string,number>={ArrowUp:32,ArrowDown:-32};if(event.key in steps){event.preventDefault();moveTo(lift.current+steps[event.key])}else if(event.key==='Home'||event.key==='End'){event.preventDefault();moveTo(event.key==='Home'?0:limits.current)}}
 return {style:{left:placement.left,width:placement.width,top:placement.top,maxHeight:placement.maxHeight,'--collapse-x':placement.collapseX+'px','--collapse-y':placement.collapseY+'px'} as CSSProperties,suppressed,dragging,dragProps:{onPointerDown,onPointerMove,onPointerUp:onPointerEnd,onPointerCancel:onPointerEnd,onKeyDown},reset:()=>moveTo(0)};
}
