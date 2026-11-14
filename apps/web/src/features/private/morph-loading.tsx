import type {ReactNode,ReactElement} from 'react';
interface Shape{kind?:string;height:number;lines?:number;lineHeight?:number;radius?:number}
type ElementProps={children?:ReactNode;className?:string;disabled?:boolean;[key:string]:unknown};
import React,{createContext,useContext} from 'react';
import {SkeletonMorph,MorphBlock} from './registry/skeleton-morph/skeleton-morph';
export const LoadingContext=createContext(false);
export const useRegionLoading=()=>useContext(LoadingContext);
const widgets=new Map<object|string,Shape|((props:Record<string,unknown>)=>Shape)>();
const buttons=new Set<object|string>();
export function registerMorphWidgets(entries:ReadonlyArray<readonly[object|string,Shape|((props:Record<string,unknown>)=>Shape)]>){for(const [type,shape] of entries)widgets.set(type,shape)}
export function registerMorphButtons(entries:ReadonlyArray<object|string>){entries.forEach(type=>buttons.add(type))}
export function PageMorph({loading,children}:{loading:boolean;children:ReactNode}){return <SkeletonMorph loading={loading} layout="contents" stagger={0} maxDelay={0} loadingLabel="Cargando contenido de la página">{children}</SkeletonMorph>}
function textWidth(text:string){const count=Array.from(text.trim()).length;return Math.min(36,Math.max(2,count*.57))+'em'}
function Field({children}:{children:ReactNode}){const text=String(children);return <MorphBlock as="span" className="morph-field" width={textWidth(text)} height="1.1em" lines={1} lineHeight={20} style={{fontSize:'inherit',fontWeight:'inherit',color:'inherit'}}>{children}</MorphBlock>}
function widgetShape(node:ReactElement<ElementProps>,shape:Shape|((props:Record<string,unknown>)=>Shape)){if(typeof shape==='function')return shape(node.props);return shape}
function transform(node:ReactNode,path:string,loading:boolean,parentClass=''):ReactNode{
 if(node==null||typeof node==='boolean')return node;
 if(typeof node==='string'||typeof node==='number')return String(node).trim()?<Field key={path}>{node}</Field>:node;
 if(Array.isArray(node))return transformChildren(node,path,loading,parentClass);
 if(!React.isValidElement<ElementProps>(node))return node;
 const type=node.type,props=node.props,key=node.key??path;
 if(widgets.has(type)){const shape=widgetShape(node,widgets.get(type)!);return <MorphBlock key={key} className={'morph-widget '+(shape.kind||'')} width="100%" height={shape.height} lines={shape.lines} lineHeight={shape.lineHeight||24} radius={shape.radius??8}>{node}</MorphBlock>}
 if(buttons.has(type)){return React.cloneElement(node,{disabled:loading||props.disabled,children:transformChildren(props.children,path,loading,props.className||'')})}
 if(type===React.Fragment)return React.cloneElement(node,{children:transformChildren(props.children,path,loading,parentClass)});
 if(typeof type!=='string')return node;
 const className=props.className||'';
 // Keep hero photos in their original DOM position: their absolute sizing depends on the card.
 if(type==='svg'||type==='i'||type==='br'||type==='hr'||type==='img')return node;
 if(/^(input|select|textarea)$/.test(type))return <MorphBlock key={key} className="morph-widget morph-control" height={type==='textarea'?100:42} width="100%">{node}</MorphBlock>;
 const next:ElementProps={children:transformChildren(props.children,path,loading,className)};
 if(type==='button')next.disabled=loading||props.disabled;
 if(type==='a'&&loading){next.href=undefined;next.tabIndex=-1;next['aria-disabled']=true}
 // Bars retain their original fixed-height track and reveal the actual fill in place.
 if(/(?:remaining-track|contract-track)/.test(className))next.children=<MorphBlock className="morph-fill" as="span" width="100%" height="100%" radius={3}>{props.children}</MorphBlock>;
 return React.cloneElement(node,next);
}
function transformChildren(children:ReactNode,path:string,loading:boolean,parentClass:string):ReactNode[]{const nodes=React.Children.toArray(children),result:ReactNode[]=[];let pending='';let pendingStart=0;const flush=()=>{if(pending){result.push(transform(pending,path+'.'+pendingStart,loading,parentClass));pending=''}};nodes.forEach((node,index)=>{if(typeof node==='string'||typeof node==='number'){if(!pending)pendingStart=index;pending+=node;return}flush();result.push(transform(node,path+'.'+(React.isValidElement(node)?node.key??index:index),loading,parentClass))});flush();return result}
/** This boundary adds no DOM: the authored card structure stays in place. */
export function MorphRegion({children}:{children:ReactNode}){const loading=useRegionLoading();return <>{transform(children,'region',loading)}</>}
