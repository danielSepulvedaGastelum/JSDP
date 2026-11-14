import {ROUTES,routesFor} from './role-navigation';
import type {Profile} from './types';
export const PRIVATE_PATHS:Record<string,string>={home:'inicio',extraordinary:'presupuesto/conceptos-extraordinarios',checkout:'presupuesto/cargar-presupuesto',onboarding:'presupuesto/consultar-gasto',launch:'archivos-de-interes','budget-authorization':'presupuesto/habilitar-carga','budget-catalogs':'presupuesto/catalogos','budget-monitor':'presupuesto/monitoreo','budget-history':'presupuesto/historico',balancito:'balance-de-plazas/balancito','balance-files':'balance-de-plazas/carga-de-archivos','balance-catalogs':'balance-de-plazas/catalogos','users-edit':'usuarios/alta-y-modificacion','users-list':'usuarios/listado'};
export function privatePath(route:string){return '/app/'+(PRIVATE_PATHS[route]||PRIVATE_PATHS.home)}
export function privateRoute(pathname:string,profile:Profile){const path=pathname.replace(/^\/app\/?/,'').replace(/\/$/,'');const route=Object.keys(PRIVATE_PATHS).find(id=>PRIVATE_PATHS[id]===path);return route&&routesFor(profile).includes(route)?route:'home'}
export function routeTitle(route:string){return ROUTES[route]?.label||'Inicio'}
