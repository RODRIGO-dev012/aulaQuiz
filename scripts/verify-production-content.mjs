import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import Ajv from 'ajv';
const practiceScopes={'301-candidates-v1.4':'publicacion/AUTORIZACION_V1_4.md','381-candidates-v1.5':'publicacion/AUTORIZACION_V1_5.md'};
const sha=value=>crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const read=(root,file)=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8').replace(/^\uFEFF/,''));
export function verifyPublicSources(root=process.cwd()){
 const manifest=read(root,'publicacion/APROBACIONES_BANCOS.json');if(manifest.version!==1||!Array.isArray(manifest.banks))throw new Error('Manifiesto de aprobaciones inválido.');
 if(new Set(manifest.banks.map(b=>b.bankId)).size!==manifest.banks.length)throw new Error('Aprobaciones con identificadores duplicados.');
 const validate=new Ajv({allErrors:true}).compile(read(root,'ESQUEMA_BANCO_PREGUNTAS.json'));
 const demo=read(root,'src/data/banks.json'),real=read(root,'src/data/real-banks.json');if(!Array.isArray(demo)||!Array.isArray(real))throw new Error('Catálogo público inválido.');
 const all=[...demo,...real];if(new Set(all.map(b=>b.id)).size!==all.length)throw new Error('Bancos públicos duplicados.');
 for(const bank of all){if(!validate(bank))throw new Error(`Esquema inválido en ${bank.id}.`);const approval=manifest.banks.find(a=>a.bankId===bank.id);if(!approval||approval.publicationAuthorized!==true||!approval.authorizationReference||approval.sha256!==sha(bank))throw new Error(`Publicación no autorizada o versión no aprobada: ${bank.id}.`);
  if(demo.includes(bank)){if(approval.kind!=='demonstration'||bank.demo!==true||approval.academicApproval?.status!=='demonstration')throw new Error('Una demostración no puede sustituir la aprobación de un banco real.');}
  else{const a=approval.academicApproval;const certified=a?.status==='approved'&&a.approvedBy?.trim()&&a.evidence?.trim()&&Number.isFinite(Date.parse(a.approvedAt));const proposed=approval.publicationBasis==='owner-authorized-practice-proposed-keys'&&approval.reviewStatus==='reviewed-no-inconsistencies-detected'&&a?.status==='not-certified'&&a.approvedBy===null&&a.approvedAt===null&&a.evidence===null&&approval.reuseAuthorization?.status==='declared-by-owner'&&approval.practiceAuthorization?.status==='authorized'&&Object.hasOwn(practiceScopes,approval.practiceAuthorization?.scope??'')&&approval.practiceAuthorization.evidenceSha256===crypto.createHash('sha256').update(fs.readFileSync(path.join(root,practiceScopes[approval.practiceAuthorization.scope]))).digest('hex')&&JSON.stringify(approval.candidateQuestionIds)===JSON.stringify(bank.questions.map(q=>q.id));if(approval.kind!=='real'||(!certified&&!proposed))throw new Error(`Falta aprobación académica o autorización expresa de práctica propuesta: ${bank.id}.`);}
  const ids=new Set();for(const q of bank.questions){if([...(manifest.excludedQuestionIds??[]),...(manifest.supersededOriginalQuestionIds??[])].includes(q.id))throw new Error('Pregunta excluida en producción: '+q.id);if(ids.has(q.id)||new Set(q.options.map(o=>o.id)).size!==q.options.length||!q.options.some(o=>o.id===q.correctOptionId))throw new Error(`Identificadores o clave inválidos: ${bank.id}.`);ids.add(q.id);}
 }
 return {manifest,banks:all,demonstrationBanks:demo.length,realBanks:real.length,publicQuestions:all.reduce((n,b)=>n+b.questions.length,0)};
}
export function verifyPublicBuild(root=process.cwd()){
 const source=verifyPublicSources(root);const dist=path.join(root,'dist');if(!fs.existsSync(path.join(dist,'index.html')))throw new Error('Falta compilar dist/index.html.');
 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);if(e.isSymbolicLink())throw new Error('El artefacto no debe contener enlaces simbólicos.');return e.isDirectory()?walk(p):[p];});
 const files=walk(dist);const compiled=files.filter(p=>p.endsWith('.js')).map(p=>fs.readFileSync(p,'utf8')).join('\n');for(const bank of source.banks.filter(b=>!b.demo))for(const q of bank.questions)if(!compiled.includes(q.id))throw new Error('El artefacto no contiene el catálogo real autorizado: '+q.id);const forbidden=source.manifest.banks.filter(a=>!source.banks.some(b=>b.id===a.bankId)).map(a=>a.bankId).concat(source.manifest.excludedQuestionIds??[],source.manifest.supersededOriginalQuestionIds??[]);
 for(const file of files){const relative=path.relative(dist,file).replaceAll('\\','/');if(/(^|\/)(importaciones|revisiones|respaldos|tests-academic)(\/|$)|\.zip$|\.map$|(^|\/)\.env/i.test(relative))throw new Error('Archivo privado en producción: '+relative);
  if(/\.(js|json|css|html|svg|txt)$/i.test(file)){const text=fs.readFileSync(file,'utf8');for(const id of forbidden)if(source.manifest.banks.some(a=>a.bankId===id)?text.includes(id):new RegExp('(?<![a-zA-Z0-9_-])'+id+'(?![a-zA-Z0-9_-])').test(text))throw new Error('Banco pendiente expuesto en producción: '+id);}
 }
 return {...source,files:files.length,excludedPendingBanks:source.manifest.banks.filter(a=>!source.banks.some(b=>b.id===a.bankId)).length,excludedPendingQuestions:(source.manifest.excludedQuestionIds??[]).length};
}
if(process.argv[1]&&path.resolve(process.argv[1]).toLowerCase()===fileURLToPath(import.meta.url).toLowerCase()){
 try{const root=process.cwd();const result=process.argv.includes('--source-only')?verifyPublicSources(root):verifyPublicBuild(root);console.log(JSON.stringify({status:'approved',demonstrationBanks:result.demonstrationBanks,realBanks:result.realBanks,realQuestions:result.banks.filter(b=>!b.demo).reduce((n,b)=>n+b.questions.length,0),excludedPendingQuestions:(result.manifest.excludedQuestionIds??[]).length,publicQuestions:result.publicQuestions,excludedPendingBanks:result.excludedPendingBanks??result.manifest.banks.filter(b=>b.kind==='real'&&!b.publicationAuthorized).length,files:result.files??null},null,2));}catch(error){console.error(error.message);process.exitCode=1;}
}
