import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import Ajv from 'ajv';
const input=process.argv[2];
assert(input,'Indica la carpeta de entrada.');
const sourceBytes=fs.readFileSync(input+'/BANCO_185_LENGUA_SIN_15_OBSERVADAS.json');
const source=JSON.parse(sourceBytes.toString('utf8'));
const excludedText=fs.readFileSync(input+'/RELACION_15_PREGUNTAS_EXCLUIDAS.txt','utf8');
const excluded=[...excludedText.matchAll(/^(F[12]-\d{3}) \|/gm)].map(m=>m[1]);
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
const original=JSON.parse(fs.readFileSync('src/data/real-banks.json','utf8'));
assert.equal(original.length,7);assert.equal(original.flatMap(b=>b.questions).length,475);
assert.equal(source.cantidad_preguntas,185);assert.equal(source.preguntas.length,185);
assert.equal(excluded.length,15);assert.deepEqual(excluded,source.preguntas_excluidas_ids);
const ids=new Set(original.flatMap(b=>b.questions.map(q=>q.id)));
for(const q of source.preguntas){
 assert(!ids.has(q.id),'ID duplicado '+q.id);ids.add(q.id);
 assert(!excluded.includes(q.id),'Pregunta excluida '+q.id);
 assert.equal(q.id,`F${q.formulario}-${String(q.numero).padStart(3,'0')}`);
 assert(q.pregunta.trim()&&q.pregunta.endsWith('?'),'Texto incompleto '+q.id);
 assert.deepEqual(Object.keys(q.opciones),['A','B','C','D']);
 assert(Object.values(q.opciones).every(s=>typeof s==='string'&&s.trim()),'Alternativa vacía '+q.id);
 assert.equal(new Set(Object.values(q.opciones).map(s=>s.trim().toLowerCase())).size,4,'Alternativas duplicadas '+q.id);
 assert.equal(q.opciones[q.clave_propuesta],q.respuesta_propuesta,'Clave/texto incoherentes '+q.id);
 assert.equal(q.estado_revision,'SIN_OBSERVACION_PRELIMINAR');assert.equal(q.aprobada_por_docente,false);
}
const banks=[1,2].map(form=>({id:`lengua-sexto-f${form}`,subject:'Lenguaje',grade:'Sexto de Secundaria',title:`Lengua Castellana — Sexto de Secundaria — Formulario ${form}`,description:'Revisión preliminar. Claves propuestas, no oficiales ni certificadas académicamente.',color:'purple',shuffleQuestions:true,questions:source.preguntas.filter(q=>q.formulario===form).map(q=>({id:q.id,topic:'Lengua Castellana',text:q.pregunta,options:Object.entries(q.opciones).map(([letter,text])=>({id:`${q.id}-${letter}`,text})),correctOptionId:`${q.id}-${q.clave_propuesta}`}))}));
assert.deepEqual(banks.map(b=>b.questions.length),[95,90]);
assert.deepEqual(source.formularios,[{formulario:1,cantidad_preguntas:95},{formulario:2,cantidad_preguntas:90}]);
const validate=new Ajv().compile(JSON.parse(fs.readFileSync('ESQUEMA_BANCO_PREGUNTAS.json','utf8')));
for(const bank of banks)assert(validate(bank),JSON.stringify(validate.errors));
const norm=s=>s.normalize('NFKD').replace(/\p{M}/gu,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const all=[...original,...banks].flatMap(b=>b.questions);
const exact=[],similar=[];
for(let i=0;i<all.length;i++)for(let j=i+1;j<all.length;j++){
 const a=all[i],b=all[j];if(!a.id.startsWith('F')&&!b.id.startsWith('F'))continue;
 const x=norm(a.text),y=norm(b.text);
 if(x===y){exact.push([a.id,b.id]);continue;}
 const ax=new Set(x.split(' ')),by=new Set(y.split(' '));
 const overlap=[...ax].filter(t=>by.has(t)).length/(new Set([...ax,...by]).size);
 const answer=q=>norm(q.options.find(o=>o.id===q.correctOptionId).text);
 if(overlap>=0.55||answer(a)===answer(b))similar.push({ids:[a.id,b.id],jaccard:Number(overlap.toFixed(3)),sameAnswer:answer(a)===answer(b)});
}
assert.equal(exact.length,0,'Duplicados exactos de enunciado');
for(const q of banks.flatMap(b=>b.questions))assert(!excludedText.split('\n').some(line=>line.includes(' | ')&&norm(line.split(' | ').at(-1))===norm(q.text)),'Enunciado excluido '+q.id);
const write=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
write('src/data/lengua-sexto-banks.json',banks);
write('publicacion/INTEGRACION_LENGUA_SEXTO.json',{version:1,publicationAuthorized:false,academicStatus:'preliminary-proposed-not-certified',sourceFileSha256:sha(sourceBytes),exclusionsFileSha256:sha(excludedText),originalBanksSha256:sha(JSON.stringify(original)),excludedQuestionIds:excluded,banks:banks.map(b=>({bankId:b.id,questions:b.questions.length,sha256:sha(JSON.stringify(b))})),exactDuplicates:exact,similarityMethod:'Jaccard de palabras normalizadas >=0.55 o texto de respuesta propuesta idéntico; candidatos para revisión humana, no certificación semántica.',similarityCandidates:similar});
console.log(JSON.stringify({original:475,added:banks.map(b=>b.questions.length),total:660,realBanks:9,exactDuplicates:exact.length,similarityCandidates:similar.length}));
