
import { chromium } from 'file:///C:/Desarrollo/PruebaFrontEndCodex/node_modules/playwright-core/index.mjs';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='C:/Desarrollo/JSDP/output/login-propuestas-2026-11-04';
const proposals=JSON.parse(await readFile(out+'/propuestas.json','utf8'));
await mkdir(out+'/escritorio',{recursive:true});await mkdir(out+'/movil',{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
const errors=[];const report=[];
try {
 const page=await browser.newPage({viewport:{width:1440,height:960},deviceScaleFactor:1});
 page.on('pageerror',e=>errors.push(e.message));
 for(const p of proposals){
   const url='file:///'+out+'/'+p.n+'-'+p.slug+'.html?captura';
   for(const [kind,width,height] of [['escritorio',1440,960],['movil',390,844],['tablet',820,1180],['estrecho',320,800]]){
     await page.setViewportSize({width,height});await page.goto(url);await page.evaluate(()=>document.fonts.ready);
     const state=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,broken:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),h1:document.querySelector('h1').textContent,form:!!document.querySelector('label[for="matricula"]'),sculpture:!!document.querySelector('img[src*="Escultura"]')}));
     report.push({proposal:p.n,viewport:kind,...state});
     assert.ok(state.scrollWidth<=width, p.n+' horizontal overflow '+kind);
     assert.equal(state.broken.length,0,p.n+' images');assert.ok(state.form&&state.sculpture,p.n+' assets/form');
     if(kind==='escritorio'||kind==='movil')await page.screenshot({path:out+'/'+kind+'/'+p.n+'.png',fullPage:true});
   }
   await page.setViewportSize({width:1440,height:960});await page.goto(url);
   await page.getByRole('button',{name:'Iniciar sesión',exact:true}).click();
   assert.equal(await page.locator('#matricula').getAttribute('aria-invalid'),'true');
   await page.getByLabel('Matrícula',{exact:true}).fill('12345678');
   await page.getByLabel('Contraseña',{exact:true}).fill('PruebaVisual');
   await page.getByRole('button',{name:'Mostrar contraseña'}).click();
   assert.equal(await page.locator('#password').getAttribute('type'),'text');
   await page.getByRole('button',{name:'Ocultar contraseña'}).click();
   assert.equal(await page.locator('#password').getAttribute('type'),'password');
   await page.getByRole('button',{name:'Iniciar sesión',exact:true}).click();
   assert.ok((await page.locator('.feedback').textContent()).includes('propuesta de diseño'));
   assert.equal(await page.locator('#password').inputValue(),'');
   await page.getByRole('link',{name:'Solicitar usuario'}).click();
   assert.ok((await page.locator('.feedback').textContent()).includes('más adelante'));
   assert.equal(page.url(),url);
   await page.getByRole('link',{name:'¿Olvidaste tu contraseña?'}).click();
   assert.ok((await page.locator('.feedback').textContent()).includes('recuperación'));
 }
 await page.setViewportSize({width:1440,height:960});await page.goto('file:///'+out+'/index.html');await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:out+'/galeria-escritorio.png',fullPage:true});
 assert.equal(await page.locator('.proposal').count(),10);
 for(const width of [390,320]){
  await page.setViewportSize({width,height:844});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'gallery overflow');
  if(width===390)await page.screenshot({path:out+'/galeria-movil.png',fullPage:true});
 }
 await page.goto('file:///'+out+'/01-aire-institucional.html');
 await page.getByRole('link',{name:'Propuesta siguiente'}).click();assert.ok(page.url().includes('02-monumento'));
 await page.getByRole('link',{name:'Propuesta anterior'}).click();assert.ok(page.url().includes('01-aire'));
 await page.getByRole('link',{name:'Las 10 propuestas'}).click();assert.ok(page.url().endsWith('index.html'));
 assert.deepEqual(errors,[]);
 await writeFile(out+'/verificacion.json',JSON.stringify({browser:'Microsoft Edge headless (Chromium)',viewports:[1440,820,390,320],proposals:10,interactionChecks:['campos vacíos','mostrar/ocultar contraseña','aviso de prototipo','solicitud pendiente','recuperación pendiente','navegación'],errors,report},null,2));
 console.log('40 vistas sin desbordamiento; 10 formularios y navegación verificados; 22 capturas guardadas.');
}finally{await browser.close()}
