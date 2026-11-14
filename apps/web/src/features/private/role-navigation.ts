import type {Profile} from './types';
export interface RouteMeta{label:string;group:string;icon?:string}
export interface NavigationEntry{id:string;label:string;icon?:string;children?:NavigationEntry[]}
export const ROUTES:Record<string,RouteMeta>={
 home:{label:'Inicio',group:''},extraordinary:{label:'Conceptos Extraordinarios',group:'Presupuesto',icon:'chart'},checkout:{label:'Cargar presupuesto',group:'Presupuesto',icon:'upload'},onboarding:{label:'Consultar gasto',group:'Presupuesto',icon:'trend'},launch:{label:'Archivos de interés',group:''},
 'budget-catalogs':{label:'Catálogos de presupuesto',group:'Presupuesto',icon:'list-checks'},'budget-monitor':{label:'Monitoreo de cargas',group:'Presupuesto',icon:'activity'},'budget-history':{label:'Información histórica',group:'Presupuesto',icon:'history'},'budget-authorization':{label:'Habilitar carga',group:'Presupuesto',icon:'shield'},
 balancito:{label:'Balancito',group:'Balance de Plazas',icon:'table'},'balance-files':{label:'Carga de archivos',group:'Balance de Plazas',icon:'files'},'balance-catalogs':{label:'Catálogos',group:'Balance de Plazas',icon:'sliders'},'users-edit':{label:'Alta y modificación de usuarios',group:'Usuarios',icon:'user-plus'},'users-list':{label:'Listado de usuarios',group:'Usuarios',icon:'contact'}
};
const leaf=(id:string)=>({id,label:ROUTES[id].label,icon:ROUTES[id].icon});
export function navigationFor(profile:Profile):NavigationEntry[]{
 const items:NavigationEntry[]=[{id:'home',label:'Inicio',icon:'home'}];
 if(profile.kind!=='delegation')items.push({id:'projects',label:'Presupuesto',icon:'money',children:['extraordinary','checkout','onboarding'].map(leaf)});
 else if(profile.id==='budget')items.push({id:'projects',label:'Presupuesto',icon:'money',children:['extraordinary','budget-authorization','budget-catalogs','budget-monitor','budget-history'].map(leaf)});
 if(profile.kind==='delegation')items.push({id:'balance',label:'Balance de Plazas',icon:'balance',children:(profile.id==='control'?['balancito','balance-files','balance-catalogs']:['balancito']).map(leaf)});
 if(profile.id==='control')items.push({id:'users',label:'Usuarios',icon:'users',children:['users-edit','users-list'].map(leaf)});
 items.push({id:'launch',label:'Archivos de interés',icon:'file'});return items;
}
export function routesFor(profile:Profile){return navigationFor(profile).flatMap(item=>item.children?item.children.map(c=>c.id):[item.id])}
export function groupRoute(profile:Profile,group:string){return routesFor(profile).find(id=>ROUTES[id].group===group)||'home'}
export function homeLinks(profile:Profile){return profile.kind!=='delegation'?['extraordinary','launch']:profile.id==='budget'?['budget-authorization','balancito']:profile.id==='control'?['balancito','balance-files']:['balancito','launch']}
