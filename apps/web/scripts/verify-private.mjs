import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import postcss from 'postcss';
import {build} from 'vite';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const outDir=fileURLToPath(new URL('../node_modules/.cache/private-verify/',import.meta.url));
for(const file of ['private.css','application.css']){const sheet=postcss.parse(await fs.readFile(root+'/src/features/private/styles/'+file,'utf8'));sheet.walkRules(rule=>{let parent=rule.parent;while(parent){if(parent.type==='atrule'&&parent.name.includes('keyframes'))return;parent=parent.parent}for(const selector of postcss.list.comma(rule.selector))assert(selector.trim().startsWith('html[data-jsdp-private]'),'Unscoped private style: '+selector)})}
await build({configFile:false,root,logLevel:'warn',build:{ssr:'tests/private-app.verify.tsx',outDir,emptyOutDir:true,rollupOptions:{onwarn(warning,warn){if(warning.code!=='MODULE_LEVEL_DIRECTIVE')warn(warning)},output:{entryFileNames:'verify.mjs'}}}});
const result=spawnSync(process.execPath,[outDir+'/verify.mjs'],{cwd:root,stdio:'inherit',windowsHide:true});
process.exitCode=result.status??1;
