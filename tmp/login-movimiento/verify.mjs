
import { chromium } from 'file:///C:/Desarrollo/PruebaFrontEndCodex/node_modules/playwright-core/index.mjs';
import { writeFile, readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='C:/Desarrollo/JSDP/tmp/login-movimiento';
const choice='C:/Desarrollo/JSDP/apps/web/src/app/router/motion-choice.ts';
const initialChoice=await readFile(choice,'utf8');
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
const origin='http://127.0.0.1:5173';
const errors=[];const motions=[];const network=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:960}});
 page.on('pageerror',e=>errors.push(e.message));
 page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
 page.on('request',r=>{if(r.url().includes('/api/'))network.push(r.url())});
 await page.addInitScript(()=>{
   window.__motions=[];
   if(document.startViewTransition){
     const start=document.startViewTransition.bind(document);
     document.startViewTransition=function(update){
       const record={profile:document.documentElement.dataset.motionProfile,direction:document.documentElement.dataset.routeDirection,start:performance.now()};
       window.__motions.push(record);
       const t=start(update);
       t.ready.then(()=>{record.ready=performance.now();record.animations=document.getAnimations().map(a=>a.animationName).filter(Boolean)}).catch(()=>{record.skipped=true});
       t.finished.then(()=>{record.finished=performance.now()}).catch(()=>{record.finished=performance.now()});
       return t;
     }
   }
 });
 const openControls=async(target=page)=>{
   const show=target.getByRole('button',{name:'Mostrar',exact:true});
   if(await show.isVisible().catch(()=>false))await show.click();
 };
 const settle=()=>page.waitForFunction(()=>document.documentElement.dataset.routeAnimating!=='true'&&document.querySelector('.motion-preview')?.getAttribute('aria-busy')!=='true');
 const position=()=>page.locator('.login-card').evaluate(el=>{const r=el.getBoundingClientRect();return [r.x,r.y,r.width,r.height]});
 await page.goto(origin+'/inicio-sesion?animaciones=1');await page.evaluate(()=>document.fonts.ready);
 assert.equal(await page.locator('input[name=motion-profile]').count(),5);
 const original=await position();
 await page.screenshot({path:out+'/selector-desktop.png',fullPage:true});
 for(const profile of ['soft','depth','slide','layers','curtain']){
  await openControls();await page.locator('input[value="'+profile+'"]').check();await settle();
  await page.getByRole('button',{name:'Repetir entrada',exact:true}).click();await settle();
  assert.deepEqual(await position(),original,profile+' moved card');
  await openControls();await page.getByRole('button',{name:'Probar regreso',exact:true}).click();
  await page.locator('.landing-page').waitFor();await settle();
  await openControls();await page.getByRole('button',{name:'Probar entrada al login',exact:true}).click();
  await page.locator('#login-title').waitFor();await settle();
  assert.deepEqual(await position(),original,profile+' changed final layout');
 }
 motions.push(...await page.evaluate(()=>window.__motions));
 for(const profile of ['soft','depth','slide','layers','curtain']){
  const records=motions.filter(m=>m.profile===profile);
  assert.ok(records.some(m=>m.direction==='login'),profile+' entry');
  assert.ok(records.some(m=>m.direction==='home'),profile+' return');
  const record=records.find(m=>m.direction==='login');
  const expected={soft:'motion-fade',depth:'motion-depth',slide:'motion-slide-in',layers:'motion-form',curtain:'motion-curtain'}[profile];
  assert.ok(record.animations.includes(expected),profile+' native animation '+JSON.stringify(record.animations));
  assert.ok(record.finished-record.ready>=500,profile+' transition too brief');
 }
 // Reduced motion follows the OS preference for every layer.
 await page.emulateMedia({reducedMotion:'reduce'});
 await openControls();await page.locator('input[value="curtain"]').check();
 await openControls();await page.getByRole('button',{name:'Probar regreso',exact:true}).click();await page.locator('.landing-page').waitFor();await settle();
 await openControls();await page.getByRole('button',{name:'Probar entrada al login',exact:true}).click();await page.locator('#login-title').waitFor();await settle();
 const reduced=await page.evaluate(()=>window.__motions.at(-1));
 assert.ok(!reduced.animations.includes('motion-curtain'));
 // Hide the controls without closing preview, then exercise the real links/history.
 await page.emulateMedia({reducedMotion:'no-preference'});
 if(await page.getByRole('button',{name:'Ocultar',exact:true}).isVisible())await page.getByRole('button',{name:'Ocultar',exact:true}).click();
 await page.getByRole('link',{name:'Volver al inicio',exact:true}).click();await page.locator('.landing-page').waitFor();await settle();
 await page.getByRole('link',{name:'Iniciar sesión',exact:true}).click();await page.locator('#login-title').waitFor();await settle();
 await page.goBack();await page.locator('.landing-page').waitFor();await settle();
 await page.goForward();await page.locator('#login-title').waitFor();await settle();
 await page.getByRole('button',{name:'Mostrar',exact:true}).click();
 // Interrupt a route change before/while its snapshot is prepared.
 await page.evaluate(()=>{document.querySelector('.login-back').click();history.back()});
 await page.waitForFunction(()=>location.pathname==='/inicio-sesion');await settle();
 await page.locator('#login-title').waitFor();
 // Saving is project-wide, not just browser-local. Restore the baseline after verification.
 await openControls();await page.locator('input[value="depth"]').check();
 await page.getByRole('button',{name:'Elegir esta animación',exact:true}).click();
 await page.waitForFunction(()=>!document.querySelector('.motion-preview'));
 assert.match(await readFile(choice,'utf8'),/chosenMotion = 'depth'/);
 await writeFile(choice,initialChoice);
 await page.reload();await page.locator('#login-title').waitFor();
 assert.equal(await page.locator('.motion-preview').count(),0);
 // Restricted design endpoint never accepts arbitrary source values.
 const invalid=await page.evaluate(async()=>{const r=await fetch('/__jsdp-motion/choice',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({profile:'../../invalid'})});return r.status});
 assert.equal(invalid,400);
 // Mobile and narrow layout remains unchanged by the floating controls.
 for(const width of [390,320]){
  await page.setViewportSize({width,height:844});await page.goto(origin+'/inicio-sesion?animaciones=1');await page.evaluate(()=>document.fonts.ready);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  if(width===390)await page.screenshot({path:out+'/selector-mobile.png',fullPage:true});
 }
 // Fallback browsers retain all five entrance alternatives and real navigation.
 const fallback=await browser.newPage({viewport:{width:1366,height:768}});
 fallback.on('pageerror',e=>errors.push(e.message));
 await fallback.addInitScript(()=>{document.startViewTransition=undefined});
 await fallback.goto(origin+'/inicio-sesion?animaciones=1');
 for(const profile of ['soft','depth','slide','layers','curtain']){
  await openControls(fallback);await fallback.locator('input[value="'+profile+'"]').check();
  await fallback.getByRole('button',{name:'Repetir entrada',exact:true}).click();
  await fallback.waitForFunction(()=>document.querySelector('.motion-preview')?.getAttribute('aria-busy')!=='true');
 }
 await openControls(fallback);await fallback.getByRole('button',{name:'Probar regreso',exact:true}).click();await fallback.locator('.landing-page').waitFor();
 await fallback.waitForFunction(()=>document.querySelector('.motion-preview')?.getAttribute('aria-busy')!=='true');
 await openControls(fallback);await fallback.getByRole('button',{name:'Probar entrada al login',exact:true}).click();await fallback.locator('#login-title').waitFor();
 await fallback.waitForFunction(()=>document.querySelector('.motion-preview')?.getAttribute('aria-busy')!=='true');
 const unexpected=errors.filter(e=>!e.includes('400 (Bad Request)'));
 assert.deepEqual(unexpected,[]);assert.deepEqual(network,[]);
 await writeFile(out+'/verification.json',JSON.stringify({result:'pass',motions,reduced,errors:unexpected,expectedInvalidSelectionStatus:400,network,checks:['5 native transition profiles both directions','5 replay profiles','5 fallback profiles','history','reduced motion','source persistence','invalid selection rejected','mobile controls','final card geometry unchanged']},null,2));
 console.log('PASS: cinco propuestas reales, repetición, regreso, historial, movimiento reducido, fallback, elección guardada y tarjeta estable.');
}finally{await writeFile(choice,initialChoice);await browser.close()}
