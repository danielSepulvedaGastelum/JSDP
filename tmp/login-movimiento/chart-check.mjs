
import { chromium } from 'file:///C:/Desarrollo/PruebaFrontEndCodex/node_modules/playwright-core/index.mjs';
import assert from 'node:assert/strict';
const b=await chromium.launch({headless:true,executablePath:'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'});
try {
 const p=await b.newPage({viewport:{width:1440,height:960}});
 const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto('http://127.0.0.1:5173/');
 await p.getByRole('link',{name:'Iniciar sesión',exact:true}).waitFor();
 assert.equal(await p.locator('.org-d3-chart g.node').count(),0);
 await p.getByRole('link',{name:'Iniciar sesión',exact:true}).click();await p.locator('#login-title').waitFor();
 await p.waitForFunction(()=>document.documentElement.dataset.routeAnimating==='false');
 await p.getByRole('link',{name:'Volver al inicio'}).click();await p.locator('.landing-page').waitFor();
 await p.waitForFunction(()=>document.documentElement.dataset.routeAnimating==='false');
 await p.locator('.org-d3-chart').scrollIntoViewIfNeeded();
 await p.locator('.org-d3-chart g.node').first().waitFor();
 assert.ok(await p.locator('.org-d3-chart g.node').count()>0);
 assert.deepEqual(errors,[]);
 console.log('PASS: organigrama aplazado fuera de la vista y funcional al desplazarse; navegación final correcta.');
}finally{await b.close()}
