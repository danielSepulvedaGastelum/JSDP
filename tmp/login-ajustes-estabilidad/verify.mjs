
import { chromium } from 'file:///C:/Desarrollo/PruebaFrontEndCodex/node_modules/playwright-core/index.mjs';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='C:/Desarrollo/JSDP/tmp/login-ajustes-estabilidad';
const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
const results=[];const failures=[];const errors=[];const requests=[];
const selectors=['.login-card','.login-photo','.login-form-content','#login-matricula','#login-password','.login-submit','.login-request','.login-footer','#login-notice'];
try {
 const page=await browser.newPage();
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',r=>{if(r.url().includes('/api/'))requests.push(r.url())});
 const bounds=()=>page.evaluate((sels)=>Object.fromEntries(sels.map(sel=>{const r=document.querySelector(sel).getBoundingClientRect();return [sel,[r.x,r.y,r.width,r.height].map(n=>Math.round(n*100)/100)];})),selectors);
 for(const [width,height] of [[1920,1080],[1440,960],[1366,768],[1280,720],[1024,600],[820,1180],[390,844],[320,800]]){
  await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:5173/inicio-sesion');await page.evaluate(()=>document.fonts.ready);
  await page.waitForFunction(()=>[...document.images].every(i=>i.complete&&i.naturalWidth));
  const initial=await bounds();
  const layout=await page.evaluate(()=>{const a=document.querySelector('.login-access'),notice=document.querySelector('#login-notice');return {width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,accessHeight:a.clientHeight,accessScroll:a.scrollHeight,noticeHeight:notice.clientHeight,icons:document.querySelectorAll('.login-field-icon').length,shadow:getComputedStyle(document.querySelector('.login-card')).boxShadow}});
  if(layout.scrollWidth>width)failures.push(width+' horizontal overflow');
  if(width>760&&layout.scrollHeight>height+1)failures.push(width+' page vertical overflow '+layout.scrollHeight);
  if(width>760&&layout.accessScroll>layout.accessHeight+1)failures.push(width+' access internal overflow '+layout.accessScroll+' vs '+layout.accessHeight);
  if(layout.icons!==2)failures.push(width+' missing icons');
  if([1440,1366,1024,390,320].includes(width))await page.screenshot({path:out+'/'+width+'.png',fullPage:true});
  const stability=[];
  const verify=async(action)=>{const after=await bounds();const changed=selectors.filter(s=>JSON.stringify(initial[s])!==JSON.stringify(after[s]));if(changed.length)failures.push(width+' shifted '+action+': '+changed.join(','));stability.push({action,changed})};
  await page.getByLabel('Matrícula',{exact:true}).fill('1234567890'.repeat(15));await verify('long input');
  await page.getByLabel('Contraseña',{exact:true}).fill('PruebaVisual');
  await page.getByRole('button',{name:'Mostrar contraseña',exact:true}).click();await verify('show password');
  await page.getByRole('button',{name:'Ocultar contraseña',exact:true}).click();
  for(const name of ['Iniciar sesión','¿Olvidaste tu contraseña?','Solicitar usuario']){
    await page.getByRole('button',{name,exact:true}).click();await verify(name);
    if(!(await page.getByRole('status').textContent()).includes('próximamente'))failures.push('notice missing '+name);
  }
  if(width===1440||width===390)await page.screenshot({path:out+'/'+width+'-aviso.png',fullPage:true});
  await page.locator('#login-notice').evaluate(el=>{el.textContent='Mensaje de error extenso para verificar la estabilidad de la interfaz. '.repeat(12)});
  await verify('long future message');
  results.push({width,height,layout,stability});
 }
 assert.deepEqual(errors,[]);assert.deepEqual(requests,[]);
 await writeFile(out+'/verification.json',JSON.stringify({results,errors,requests,failures},null,2));
 console.log(JSON.stringify({failures,viewports:results.map(r=>({width:r.width,height:r.height,...r.layout}))},null,2));
 assert.deepEqual(failures,[]);
}finally{await browser.close()}
