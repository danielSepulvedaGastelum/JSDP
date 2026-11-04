
import { chromium } from 'file:///C:/Desarrollo/PruebaFrontEndCodex/node_modules/playwright-core/index.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='C:/Desarrollo/JSDP/tmp/login-implementacion-04';
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
const origin='http://127.0.0.1:4173';
const errors=[];const apiRequests=[];const sizes=[];
try {
 const page=await browser.newPage({viewport:{width:1440,height:960}});
 page.on('pageerror', e=>errors.push(e.message));
 page.on('console', m=>{if(m.type()==='error')errors.push(m.text())});
 page.on('request',r=>{if(r.url().includes('/api/'))apiRequests.push(r.url())});
 await page.addInitScript(()=>{
   window.__transitions=[];
   if(document.startViewTransition){
     const start=document.startViewTransition.bind(document);
     document.startViewTransition=function(update){
       const record={direction:document.documentElement.dataset.routeDirection,finished:false};
       window.__transitions.push(record);
       const t=start(update);
       t.finished.finally(()=>{record.finished=true});
       return t;
     };
   }
 });
 await page.goto(origin);await page.evaluate(()=>document.fonts.ready);
 await page.getByRole('link',{name:'Iniciar sesión',exact:true}).click();
 await page.waitForURL('**/inicio-sesion');
 await page.locator('#login-title').waitFor();
 await page.screenshot({path:out+'/transicion-entrada.png'});
 await page.waitForFunction(()=>window.__transitions.at(-1)?.finished);
 assert.equal(await page.title(),'Inicio de sesión | JSDP Sonora');
 assert.equal(await page.evaluate(()=>document.activeElement?.id),'contenido-login');
 await page.getByLabel('Matrícula',{exact:true}).fill('12345678');
 await page.getByLabel('Contraseña',{exact:true}).fill('PruebaVisual');
 await page.getByRole('button',{name:'Mostrar contraseña',exact:true}).click();
 assert.equal(await page.locator('#login-password').getAttribute('type'),'text');
 await page.getByRole('button',{name:'Ocultar contraseña',exact:true}).click();
 assert.equal(await page.locator('#login-password').getAttribute('type'),'password');
 await page.getByRole('button',{name:'Iniciar sesión',exact:true}).click();
 assert.match(await page.getByRole('status').textContent(),/próximamente/);
 await page.getByRole('button',{name:'¿Olvidaste tu contraseña?',exact:true}).click();
 assert.match(await page.getByRole('status').textContent(),/recuperación/);
 await page.getByRole('button',{name:'Solicitar usuario',exact:true}).click();
 assert.match(await page.getByRole('status').textContent(),/solicitud/);
 assert.equal(new URL(page.url()).pathname,'/inicio-sesion');
 assert.equal(await page.locator('input[type=checkbox]').isDisabled(),true);
 await page.getByRole('link',{name:'Volver al inicio',exact:true}).click();
 await page.waitForURL(origin+'/');await page.locator('.landing-page').waitFor();
 await page.waitForFunction(()=>window.__transitions.at(-1)?.finished);
 await page.screenshot({path:out+'/landing-regreso.png'});
 assert.equal(await page.title(),'JSDP Sonora | IMSS');
 await page.goBack();await page.locator('#login-title').waitFor();
 await page.waitForFunction(()=>window.__transitions.at(-1)?.finished);
 await page.goForward();await page.locator('.landing-page').waitFor();
 await page.waitForFunction(()=>window.__transitions.at(-1)?.finished);
 // Footer navigation is internal and preserves the landing's scroll on browser Back.
 await page.locator('.landing-footer-link').filter({hasText:'Inicio de sesión'}).click();
 await page.locator('#login-title').waitFor();await page.waitForFunction(()=>window.__transitions.at(-1)?.finished);
 await page.goBack();await page.locator('.landing-page').waitFor();
 await page.waitForFunction(()=>window.__transitions.at(-1)?.finished);
 assert.ok(await page.evaluate(()=>window.scrollY)>500,'restore landing scroll');
 await page.getByRole('link',{name:'Iniciar sesión',exact:true}).click();
 await page.locator('#login-title').waitFor();await page.waitForFunction(()=>window.__transitions.at(-1)?.finished);
 // Direct URL/reload and all layout sizes.
 await page.reload();
 for(const [width,height] of [[1440,960],[1366,768],[820,1180],[390,844],[320,800]]){
   await page.setViewportSize({width,height});await page.evaluate(()=>document.fonts.ready);
   const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
   assert.ok(state.scrollWidth<=width,'overflow '+width);assert.deepEqual(state.broken,[]);
   sizes.push(state);await page.screenshot({path:out+'/'+width+'.png',fullPage:true});
 }
 // Reduced motion retains a short crossfade, with no expanding mask.
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.getByRole('link',{name:'Volver al inicio',exact:true}).click();await page.locator('.landing-page').waitFor();
 await page.waitForFunction(()=>window.__transitions.at(-1)?.finished);
 const reduced=await page.evaluate(()=>{const s=getComputedStyle(document.documentElement,'::view-transition-new(root)');return {name:s.animationName,duration:s.animationDuration}});
 assert.equal(reduced.name,'route-crossfade');assert.equal(reduced.duration,'0.1s');
 // A browser without View Transitions still navigates in both directions.
 const fallback=await browser.newPage({viewport:{width:390,height:844}});
 await fallback.addInitScript(()=>{document.startViewTransition=undefined});
 await fallback.goto(origin);
 await fallback.getByRole('link',{name:'Iniciar sesión',exact:true}).click();await fallback.locator('#login-title').waitFor();
 assert.equal(await fallback.locator('.route-scene-fallback').count(),1);
 await fallback.getByRole('link',{name:'Volver al inicio',exact:true}).click();await fallback.locator('.landing-page').waitFor();
 // Interrupt navigation with history immediately; the latest location must win.
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.getByRole('link',{name:'Iniciar sesión',exact:true}).click();
 await page.waitForURL('**/inicio-sesion');await page.goBack();await page.locator('.landing-page').waitFor();
 await page.waitForFunction(()=>window.__transitions.every(t=>t.finished));
 assert.equal(new URL(page.url()).pathname,'/');
 assert.deepEqual(errors,[]);assert.deepEqual(apiRequests,[]);
 const transitions=await page.evaluate(()=>window.__transitions);
 await writeFile(out+'/verification.json',JSON.stringify({result:'pass',engine:'Edge headless / Chromium',sizes,transitions,reduced,errors,apiRequests,checks:['header','footer','return','history back/forward','scroll restoration','interrupted transition','direct URL/reload','show password','pending actions','no API','fallback']},null,2));
 console.log('PASS: navegación, historial, interrupción, fallback, movimiento reducido, 5 tamaños y ausencia de llamadas API.');
} finally { await browser.close(); }
