import fs from 'node:fs';import crypto from 'node:crypto';import assert from 'node:assert/strict';import Ajv from 'ajv';
const input=process.argv[2];assert(input,'Indica la carpeta de entrada.');
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const bytes=fs.readFileSync(input+'/BANCO_176_BIOLOGIA_SEXTO.json'),source=JSON.parse(bytes.toString('utf8'));
const excludedText=fs.readFileSync(input+'/RELACION_24_PREGUNTAS_EXCLUIDAS_BIOLOGIA.txt','utf8');
const originalExcluded=[...excludedText.matchAll(/BIO-F[12]-\d{3}/g)].map(m=>m[0]);
const additional=[
 {id:'BIO-F1-040',reason:'Definición geológica demasiado general para distinguir Paleozoico de Cenozoico; exclusión preventiva autorizada por el propietario.'},
 {id:'BIO-F1-031',reason:'Definición genérica de Heimlich que compite con Primeros auxilios y no delimita su alcance; exclusión preventiva autorizada.'},
 {id:'BIO-F2-070',reason:'Definición de Heimlich sin delimitar edad ni consciencia; exclusión preventiva del par de primeros auxilios autorizada.'},
 {id:'BIO-F2-012',reason:'Exclusión preventiva del par del concepto Paleozoico, por consistencia con BIO-F1-040 y autorización expresa del propietario.'}
];
const excluded=[...originalExcluded,...additional.map(x=>x.id)];assert.equal(new Set(excluded).size,28);
assert.equal(source.preguntas.length,176);assert.equal(source.cantidad_preguntas,176);
assert.deepEqual([...originalExcluded].sort(),[...source.preguntas_excluidas_ids].sort());assert.equal(originalExcluded.length,24);
const previous=read('publicacion/INTEGRACION_BIOLOGIA_SEXTO.json');
assert.equal(sha(bytes),previous.sourceFileSha256);assert.equal(sha(excludedText),previous.exclusionsFileSha256);
const old=['src/data/real-banks.json','src/data/lengua-sexto-banks.json'].flatMap(read);
assert.equal(old.length,9);assert.equal(old.flatMap(b=>b.questions).length,660);
assert.deepEqual(old.map(b=>({bankId:b.id,questions:b.questions.length,sha256:sha(JSON.stringify(b))})),previous.preservedBanks);
const ids=new Set(old.flatMap(b=>b.questions.map(q=>q.id)));
for(const q of source.preguntas){assert(!ids.has(q.id));ids.add(q.id);assert(!originalExcluded.includes(q.id));assert.equal(q.id,`BIO-F${q.formulario}-${String(q.numero).padStart(3,'0')}`);assert(q.pregunta.trim());assert.deepEqual(Object.keys(q.opciones),['A','B','C','D']);assert(Object.values(q.opciones).every(s=>typeof s==='string'&&s.trim()));assert.equal(new Set(Object.values(q.opciones).map(s=>s.trim().toLowerCase())).size,4);assert.equal(q.opciones[q.clave_propuesta],q.respuesta_propuesta);assert.equal(q.aprobada_por_docente,false);assert(!/[\uFFFD\u0000]/.test(JSON.stringify(q)));}
const included=source.preguntas.filter(q=>!excluded.includes(q.id));assert.equal(included.length,172);
const banks=[1,2].map(form=>({id:`biologia-sexto-f${form}`,subject:'Biología',grade:'Sexto de Secundaria',title:`Biología — Sexto de Secundaria — Formulario ${form}`,description:'Revisión preliminar. Claves propuestas, no oficiales ni certificadas académicamente.',color:'green',shuffleQuestions:true,questions:included.filter(q=>q.formulario===form).map(q=>({id:q.id,topic:'Biología',text:q.pregunta,options:Object.entries(q.opciones).map(([letter,text])=>({id:`${q.id}-${letter}`,text})),correctOptionId:`${q.id}-${q.clave_propuesta}`}))}));
assert.deepEqual(banks.map(b=>b.questions.length),[86,86]);const validate=new Ajv().compile(read('ESQUEMA_BANCO_PREGUNTAS.json'));for(const b of banks)assert(validate(b),JSON.stringify(validate.errors));
const distribution=[{},{}],runs=[0,0];for(const form of [1,2]){let last='',run=0;for(const q of included.filter(q=>q.formulario===form)){distribution[form-1][q.clave_propuesta]=(distribution[form-1][q.clave_propuesta]??0)+1;run=last===q.clave_propuesta?run+1:1;last=q.clave_propuesta;runs[form-1]=Math.max(runs[form-1],run);}}
const norm=s=>s.normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const all=[...old,...banks].flatMap(b=>b.questions),exact=[],similar=[];
for(let i=0;i<all.length;i++)for(let j=i+1;j<all.length;j++){const a=all[i],b=all[j];if(!a.id.startsWith('BIO-')&&!b.id.startsWith('BIO-'))continue;const x=norm(a.text),y=norm(b.text);if(x===y){exact.push([a.id,b.id]);continue;}const ax=new Set(x.split(' ')),by=new Set(y.split(' ')),overlap=[...ax].filter(t=>by.has(t)).length/new Set([...ax,...by]).size;const answer=q=>norm(q.options.find(o=>o.id===q.correctOptionId).text);if(overlap>=0.55||answer(a)===answer(b))similar.push({ids:[a.id,b.id],jaccard:Number(overlap.toFixed(3)),sameAnswer:answer(a)===answer(b)});}
assert.equal(exact.length,0);
const records=additional.map(x=>({...x,question:source.preguntas.find(q=>q.id===x.id)}));assert(records.every(r=>r.question));
fs.mkdirSync('revisiones/biologia-sexto',{recursive:true});fs.writeFileSync('revisiones/biologia-sexto/EXCLUSIONES_ADICIONALES.json',JSON.stringify(records,null,2)+'\n');
const record={...previous,version:2,publicationAuthorized:true,authorizationScope:'172-biologia-sexto-v1.7',academicStatus:'preliminary-proposed-not-certified',integrationReference:'6240bb95fc395c01d98bf3b09ea0ba64488c9880',preservedPublicationManifest:previous.preservedPublicationManifest??read('publicacion/APROBACIONES_BANCOS.json'),excludedQuestionIds:excluded,additionalExclusions:records.map(({question,...r})=>({...r,sourceQuestionSha256:sha(JSON.stringify(question))})),excludedRecordsLocation:'revisiones/biologia-sexto/EXCLUSIONES_ADICIONALES.json (privado, ignorado); originales también conservados en la entrada y commit 6240bb9',banks:banks.map(b=>({bankId:b.id,questions:b.questions.length,sha256:sha(JSON.stringify(b))})),answerDistribution:distribution,longestIdenticalKeyRun:runs,exactDuplicates:exact,similarityCandidates:similar};
fs.writeFileSync('src/data/biologia-sexto-banks.json',JSON.stringify(banks,null,2)+'\n');fs.writeFileSync('publicacion/INTEGRACION_BIOLOGIA_SEXTO.json',JSON.stringify(record,null,2)+'\n');
console.log(JSON.stringify({original:660,added:[86,86],total:832,banks:11,subjects:6,excluded:28,exactDuplicates:0,similarityCandidates:similar.length,distribution,longestIdenticalKeyRun:runs},null,2));
