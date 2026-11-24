import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import Ajv from 'ajv';
const input=process.argv[2];assert(input,'Indica la carpeta de entrada.');
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
const read=p=>JSON.parse(fs.readFileSync(p,'utf8').replace(/^\uFEFF/,''));
const bytes=fs.readFileSync(input+'/BANCO_176_BIOLOGIA_SEXTO.json'),source=JSON.parse(bytes.toString('utf8'));
const excludedText=fs.readFileSync(input+'/RELACION_24_PREGUNTAS_EXCLUIDAS_BIOLOGIA.txt','utf8');
const excluded=[...excludedText.matchAll(/BIO-F[12]-\d{3}/g)].map(m=>m[0]);
const oldFiles=['src/data/real-banks.json','src/data/lengua-sexto-banks.json'];
const old=oldFiles.flatMap(read);assert.equal(old.length,9);assert.equal(old.flatMap(b=>b.questions).length,660);
assert.equal(source.cantidad_preguntas,176);assert.equal(source.preguntas.length,176);
assert.equal(source.publicacion_autorizada,false);assert.equal(source.aprobacion_docente_requerida,true);
assert.equal(new Set(excluded).size,24);assert.deepEqual([...excluded].sort(),[...source.preguntas_excluidas_ids].sort());
const ids=new Set(old.flatMap(b=>b.questions.map(q=>q.id)));
const distribution=[{},{}],runs=[0,0];
for(const form of [1,2]){let previous='',run=0;for(const q of source.preguntas.filter(q=>q.formulario===form)){
 assert(!ids.has(q.id),'ID duplicado '+q.id);ids.add(q.id);assert(!excluded.includes(q.id));
 assert.equal(q.id,`BIO-F${form}-${String(q.numero).padStart(3,'0')}`);
 assert(typeof q.pregunta==='string'&&q.pregunta.trim());assert.deepEqual(Object.keys(q.opciones),['A','B','C','D']);
 assert(Object.values(q.opciones).every(s=>typeof s==='string'&&s.trim()));
 assert.equal(new Set(Object.values(q.opciones).map(s=>s.trim().toLowerCase())).size,4);
 assert.equal(q.opciones[q.clave_propuesta],q.respuesta_propuesta,'Clave/texto incoherentes '+q.id);
 assert.equal(q.estado_revision,'SIN_OBSERVACION_PRELIMINAR');assert.equal(q.aprobada_por_docente,false);
 assert(!/[\uFFFD\u0000]/.test(JSON.stringify(q)),'Caracteres inválidos '+q.id);
 distribution[form-1][q.clave_propuesta]=(distribution[form-1][q.clave_propuesta]??0)+1;
 run=q.clave_propuesta===previous?run+1:1;previous=q.clave_propuesta;runs[form-1]=Math.max(runs[form-1],run);
}}
const banks=[1,2].map(form=>({id:`biologia-sexto-f${form}`,subject:'Biología',grade:'Sexto de Secundaria',title:`Biología — Sexto de Secundaria — Formulario ${form}`,description:'Revisión preliminar para ensayo local. Claves propuestas, no oficiales ni certificadas; publicación pendiente de autorización.',color:'green',shuffleQuestions:true,questions:source.preguntas.filter(q=>q.formulario===form).map(q=>({id:q.id,topic:'Biología',text:q.pregunta,options:Object.entries(q.opciones).map(([letter,text])=>({id:`${q.id}-${letter}`,text})),correctOptionId:`${q.id}-${q.clave_propuesta}`}))}));
assert.deepEqual(banks.map(b=>b.questions.length),[88,88]);
assert.deepEqual(source.formularios,[{formulario:1,cantidad_preguntas:88},{formulario:2,cantidad_preguntas:88}]);
const validate=new Ajv().compile(read('ESQUEMA_BANCO_PREGUNTAS.json'));for(const b of banks)assert(validate(b),JSON.stringify(validate.errors));
const norm=s=>s.normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const exact=[],similar=[],all=[...old,...banks].flatMap(b=>b.questions);
for(let i=0;i<all.length;i++)for(let j=i+1;j<all.length;j++){
 const a=all[i],b=all[j];if(!a.id.startsWith('BIO-')&&!b.id.startsWith('BIO-'))continue;
 const x=norm(a.text),y=norm(b.text);if(x===y){exact.push([a.id,b.id]);continue;}
 const ax=new Set(x.split(' ')),by=new Set(y.split(' ')),overlap=[...ax].filter(t=>by.has(t)).length/new Set([...ax,...by]).size;
 const answer=q=>norm(q.options.find(o=>o.id===q.correctOptionId).text);
 if(overlap>=0.55||answer(a)===answer(b))similar.push({ids:[a.id,b.id],jaccard:Number(overlap.toFixed(3)),sameAnswer:answer(a)===answer(b)});
}
assert.equal(exact.length,0,'Duplicados exactos');
const protectedFiles=[...oldFiles,'src/data/banks.json','src/engine.ts','src/learning.ts','src/useLearning.ts','src/progress-io.ts','publicacion/APROBACIONES_BANCOS.json'];
const record={version:1,baselineCommit:'820fb12e4517a3b38b85d1c578be258d7e420376',publicationAuthorized:false,academicStatus:'preliminary-proposed-not-certified',sourceFileSha256:sha(bytes),exclusionsFileSha256:sha(excludedText),preservedFiles:protectedFiles.map(path=>({path,sha256:sha(fs.readFileSync(path)),lfSha256:sha(fs.readFileSync(path,'utf8').replace(/\r\n/g,'\n'))})),preservedBanks:old.map(b=>({bankId:b.id,questions:b.questions.length,sha256:sha(JSON.stringify(b))})),excludedQuestionIds:excluded,banks:banks.map(b=>({bankId:b.id,questions:b.questions.length,sha256:sha(JSON.stringify(b))})),answerDistribution:distribution,longestIdenticalKeyRun:runs,exactDuplicates:exact,similarityMethod:'Jaccard >=0.55 o respuesta propuesta idéntica; candidatos, no duplicados semánticos certificados.',similarityCandidates:similar};
fs.writeFileSync('src/data/biologia-sexto-banks.json',JSON.stringify(banks,null,2)+'\n');
fs.writeFileSync('publicacion/INTEGRACION_BIOLOGIA_SEXTO.json',JSON.stringify(record,null,2)+'\n');
console.log(JSON.stringify({original:660,added:[88,88],total:836,banks:11,subjects:new Set([...old,...banks].map(b=>b.subject)).size,excluded:excluded.length,exactDuplicates:exact.length,similarityCandidates:similar.length,distribution,longestIdenticalKeyRun:runs},null,2));
