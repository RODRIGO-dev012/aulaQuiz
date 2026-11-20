import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {verifyPublicSources} from './verify-production-content.mjs';
export function scanPublicSource(root){
 const problems=[];const files=[];
 const forbidden=/(^|\/)(node_modules|dist|artifacts|importaciones|revisiones|respaldos|tests-academic|tests-local|\.git|\.codex|\.agents|\.aws)(\/|$)|(^|\/)\.env(\.|$)|local-review-banks\.json$|\.zip$|\.(pem|key)$/i;
 const tokens=[/\bgh[pousr]_[A-Za-z0-9]{30,}\b/,/\bgithub_pat_[A-Za-z0-9_]{40,}\b/,/\bAKIA[A-Z0-9]{16}\b/,/\bsk-[A-Za-z0-9_-]{24,}\b/,/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,/\bnpm_[A-Za-z0-9]{30,}\b/];
 function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,e.name),relative=path.relative(root,full).replaceAll('\\','/');if(forbidden.test(relative)){problems.push({file:relative,reason:'ruta privada/no publicable'});continue;}if(e.isSymbolicLink()){problems.push({file:relative,reason:'enlace simbólico'});continue;}if(e.isDirectory()){walk(full);continue;}files.push(relative);if(/\.(ts|tsx|js|mjs|cjs|json|md|html|yml|yaml|css|svg|txt)$/.test(full)||e.name==='.gitignore'){const text=fs.readFileSync(full,'utf8');if(tokens.some(pattern=>pattern.test(text)))problems.push({file:relative,reason:'posible credencial'});}}
 }walk(root);return {files,problems};
}
export function preparePublicSource(root=process.cwd()){
 verifyPublicSources(root);
 const stamp=new Date().toISOString().replace(/[-:TZ.]/g,'');const destination=path.join(root,'publicacion','fuente-v1.5-'+stamp);fs.mkdirSync(destination);
 const files=['package.json','package-lock.json','tsconfig.json','vite.config.ts','index.html','.gitignore','ESQUEMA_BANCO_PREGUNTAS.json','playwright.config.ts','publicacion/APROBACIONES_BANCOS.json','publicacion/AUTORIZACION_V1_4.md','publicacion/AUTORIZACION_V1_5.md','playwright.real.config.ts','scripts/run-real-bank-tests.mjs','.github/workflows/pages.yml','GUIA_ESTUDIANTES.md','GUIA_ACTUALIZACION_CUESTIONARIOS.md','INFORME_SEGURIDAD_V1_3.md','LISTADO_APROBACIONES_PENDIENTES.md','scripts/serve-dist.mjs','scripts/run-playwright.mjs','scripts/verify-production-content.mjs','scripts/prepare-public-source.mjs'];
 const dirs=['src','public','examples','tests','tests-real'];const walk=dir=>fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`):e.isFile()?[`${dir}/${e.name}`]:[]);
 for(const dir of dirs)files.push(...walk(dir).filter(file=>file!=='src/data/local-review-banks.json'));
 for(const file of [...new Set(files)]){const source=path.join(root,file);if(!fs.existsSync(source))throw new Error('Falta completar el archivo publicable: '+file);const out=path.join(destination,file);fs.mkdirSync(path.dirname(out),{recursive:true});fs.copyFileSync(source,out);}
 for(const file of ['README.md','PROGRESO_AULAQUIZ.md','INFORME_INCORPORACION_V1_5.md'])fs.copyFileSync(path.join(root,file),path.join(destination,file));
 // Remove commands for private tooling from this independently reproducible public checkout.
 const pkgPath=path.join(destination,'package.json');const pkg=JSON.parse(fs.readFileSync(pkgPath,'utf8'));for(const key of Object.keys(pkg.scripts))if(key.startsWith('import:')||['test:import','test:review','audit:review','prepare:public'].includes(key))delete pkg.scripts[key];fs.writeFileSync(pkgPath,JSON.stringify(pkg,null,2)+'\n');
 const scan=scanPublicSource(destination);if(scan.problems.length)throw new Error('La fuente preparada contiene archivos o patrones privados: '+JSON.stringify(scan.problems));
 verifyPublicSources(destination);
 const manifest=scan.files.map(file=>({file,sha256:crypto.createHash('sha256').update(fs.readFileSync(path.join(destination,file))).digest('hex')}));
 fs.writeFileSync(path.join(root,'publicacion','ENTREGA_V1_5.json'),JSON.stringify({createdAt:new Date().toISOString(),source:path.relative(root,destination).replaceAll('\\','/'),files:manifest,security:{patternsDetected:0,authorizedPracticeQuestions:381,pendingAcademicSourcesIncluded:false},repository:null,publicUrl:null},null,2)+'\n');return destination;
}
if(process.argv[1]&&path.resolve(process.argv[1]).toLowerCase()===fileURLToPath(import.meta.url).toLowerCase()){try{console.log(preparePublicSource());}catch(error){console.error(error.message);process.exitCode=1;}}
