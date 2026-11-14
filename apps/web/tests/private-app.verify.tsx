import assert from 'node:assert/strict';
import React from 'react';
import {renderToString as renderHtml} from 'react-dom/server';
import {MemoryRouter} from 'react-router';
import PrivateApp from '../src/features/private/PrivateApp';
import {PrivateScreen} from '../src/features/private/private-screen';
import {PROFILES} from '../src/features/private/profiles';
import {routesFor,navigationFor} from '../src/features/private/role-navigation';
import {privatePath,privateRoute} from '../src/features/private/private-routes';
import {BALANCE_FILES,CATALOGS,initialCatalogs,balanceReadiness,readiness,canAuthorize,holidaySignature,holidayConfirmationValid,canConfirmHolidays,quincenaWindow,parseCatalogCsv,catalogCsv} from '../src/features/private/admin-model';
import {ReleaseReadiness} from '../src/features/private/registry/blocks/release-readiness/release-readiness';
import {DataGrid} from '../src/features/private/registry/data-grid/data-grid';
import type {PeriodFiles,HolidayConfirmations} from '../src/features/private/types';
const render=(node:React.ReactNode,path='/app/inicio')=>renderHtml(<MemoryRouter initialEntries={[path]}>{node}</MemoryRouter>);
const source={name:'ejemplo.xls',size:1024,loaded:true},holidays=initialCatalogs().holidays,confirmation={ids:['holidays-2'],none:false,signature:holidaySignature('2026022',holidays)};
// A check cannot be edited manually and another period never unlocks the current period.
for(let bits=0;bits<8;bits++){
 const files:PeriodFiles={'2026022':{employees:bits&1?source:null,positions:bits&2?source:null}},confirmed:HolidayConfirmations=bits&4?{'2026022':confirmation}:{};
 assert.equal(canAuthorize('2026022',files,confirmed,holidays),bits===7);
 assert.equal(canAuthorize('2026023',files,confirmed,holidays),false);
 const html=render(<ReleaseReadiness period="2026022" tasks={readiness('2026022',files,confirmed,holidays)}/>);
 const checks=[...html.matchAll(/<button[^>]*role="checkbox"[^>]*>/g)].map(m=>m[0]);
 assert.equal(checks.length,3);assert(checks.every(tag=>tag.includes('disabled=""')));
 assert.equal(checks.filter(tag=>tag.includes('aria-checked="true"')).length,bits.toString(2).split('1').length-1);
}
assert.equal(holidayConfirmationValid('2026022',holidays.map(row=>({...row,description:'Modificada'})),{'2026022':confirmation}),false);
assert.equal(canConfirmHolidays('2026022',holidays,{ids:[],none:true}),false);
assert.equal(canConfirmHolidays('2026021',holidays,{ids:[],none:true}),true);
assert.equal(canConfirmHolidays('2027001',holidays,{ids:[],none:true}),false);
assert.equal(canConfirmHolidays('2026022',holidays,{ids:['desconocida'],none:false}),false);
assert.equal(canConfirmHolidays('2026022',holidays,{ids:['holidays-2','holidays-2'],none:false}),false);
assert.equal(quincenaWindow('2028004')?.end,'2028-02-29');assert.equal(quincenaWindow('2026025'),null);
for(let bits=0;bits<64;bits++){
 const files={'2026022':Object.fromEntries(BALANCE_FILES.map((file,index)=>[file.id,{...source,name:file.id+'.xls',loaded:Boolean(bits&(1<<index))}]))};
 assert.equal(balanceReadiness('2026022',files).filter(task=>task.done).length,bits.toString(2).split('1').length-1);
 assert.equal(balanceReadiness('2026023',files).some(task=>task.done),false);
}
for(const catalog of CATALOGS){const rows=parseCatalogCsv(catalogCsv(catalog.columns,catalog.rows),catalog.columns);assert.equal(rows.length,catalog.rows.length);for(let index=0;index<rows.length;index++)for(const column of catalog.columns)assert.equal(rows[index][column.key],String(catalog.rows[index][column.key]))}
assert.match(render(<DataGrid label="Orden accesible" columns={[{key:'name',label:'Nombre'}]} rows={[{id:'1',name:'Ejemplo'}]} defaultSort={[{key:'name',dir:'asc'}]}/>),/aria-sort="ascending"/);
let normal=0,loading=0;
for(const profile of PROFILES){
 const routes=routesFor(profile),navNames=navigationFor(profile).flatMap(group=>[group.label,...(group.children||[]).map(item=>item.label)]);
 for(const route of routes){
  assert.equal(privateRoute(privatePath(route),profile),route);
  for(const theme of ['light','dark'] as const)for(const mode of ['expanded','collapsed','mobile'] as const){
   const html=render(<PrivateScreen theme={theme} setTheme={()=>{}} route={route} profileId={profile.id} rail={mode!=='expanded'} mobile={mode==='mobile'} fluid/>);
   assert.match(html,/screen variant-9/);assert.match(html,/Juan Pérez/);assert.match(html,/aria-label="Ruta actual"/);
   assert.deepEqual([...html.matchAll(/data-jsdp-nav-item="" aria-label="([^"]+)"/g)].map(m=>m[1]),navNames);
   assert(html.includes('data-route="'+route+'"'));
   if(route==='home'){assert.match(html,/<section class="unit-hero[^>]*>\s*<img[^>]*src="\/private\/units\//);assert.match(html,/home-grid hero-and-total/);assert.match(html,/home-grid home-main-side/)}
   if(route==='balance-files'){assert.equal((html.match(/type="file"/g)||[]).length,1);assert.equal((html.match(/data-readiness-check=/g)||[]).length,6)}
   if(route==='budget-authorization'){assert.equal((html.match(/type="file"/g)||[]).length,1);assert.equal((html.match(/data-readiness-check=/g)||[]).length,3)}
   for(const button of [...html.matchAll(/<button\b[^>]*data-arc-button=""[^>]*>[\s\S]*?<\/button>/g)])assert(button[0].includes('<svg'));
   assert(!html.includes('class="panel workforce workforce-bars"'));normal++;
  }
  for(const theme of ['light','dark'] as const){
   const html=render(<PrivateScreen theme={theme} setTheme={()=>{}} route={route} profileId={profile.id} state="carga" fluid/>);
   assert.match(html,/aria-busy="true"/);assert.match(html,/data-state="skeleton"/);if(route==='home')assert.match(html,/src="\/private\/units\//);loading++;
  }
 }
 if(profile.id!=='control')assert.equal(privateRoute('/app/usuarios/listado',profile),'home');
 assert.equal(privateRoute('/app/ruta-desconocida',profile),'home');
}
for(const path of ['/app/inicio','/app/presupuesto/habilitar-carga?perfil=budget','/app/balance-de-plazas/carga-de-archivos?perfil=control']){
 const html=render(<PrivateApp/>,path);
 assert.match(html,/is-full-browser/);assert.match(html,/screen variant-9/);assert.match(html,/Mover controles verticalmente/);assert.match(html,/Minimizar controles/);
 for(const name of ['Escenario','Página','Iniciar colapsado','Comparar dos','Móvil','Notificaciones','Estado','Repetir carga'])assert(html.includes(name));
 for(const name of ['proposal-nav','proposal-notes','gallery-header','Ver a tamaño completo','Volver a galería','Propuesta siguiente','Segunda propuesta'])assert(!html.includes(name));
}
console.log(JSON.stringify({normalViews:normal,loadingViews:loading,authorizationCombinations:8,balanceCombinations:64,catalogs:CATALOGS.length,nativeApp:true},null,2));
