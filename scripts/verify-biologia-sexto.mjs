import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
import assert from 'node:assert/strict';import Ajv from 'ajv';
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
export function verifyBiologiaSources(root=process.cwd()){
 const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
 const record=read('publicacion/INTEGRACION_BIOLOGIA_SEXTO.json'),banks=read('src/data/biologia-sexto-banks.json');
 assert.equal(record.publicationAuthorized,false,'Biología sigue pendiente de autorización');
 assert.equal(record.academicStatus,'preliminary-proposed-not-certified');
 assert.equal(record.excludedQuestionIds.length,24);assert.equal(new Set(record.excludedQuestionIds).size,24);
 for(const f of record.preservedFiles)assert.equal(sha(fs.readFileSync(path.join(root,f.path),'utf8').replace(/\r\n/g,'\n')),f.lfSha256,'Archivo anterior alterado: '+f.path);
 const old=['src/data/real-banks.json','src/data/lengua-sexto-banks.json'].flatMap(read);
 assert.equal(old.length,9);assert.equal(old.flatMap(b=>b.questions).length,660);
 assert.deepEqual(old.map(b=>({bankId:b.id,questions:b.questions.length,sha256:sha(JSON.stringify(b))})),record.preservedBanks);
 assert.deepEqual(banks.map(b=>b.id),['biologia-sexto-f1','biologia-sexto-f2']);assert.deepEqual(banks.map(b=>b.questions.length),[88,88]);
 const validate=new Ajv().compile(read('ESQUEMA_BANCO_PREGUNTAS.json'));
 for(const b of banks){assert(validate(b),JSON.stringify(validate.errors));assert.equal(sha(JSON.stringify(b)),record.banks.find(r=>r.bankId===b.id)?.sha256,'Biología distinta de la validada');}
 const ids=new Set(),options=new Set();
 for(const b of [...old,...banks,...read('src/data/banks.json')])for(const q of b.questions){assert(!ids.has(q.id),'ID duplicado');ids.add(q.id);assert(!record.excludedQuestionIds.includes(q.id));assert(q.text.trim());assert.equal(q.options.length,4);assert(q.options.some(o=>o.id===q.correctOptionId));for(const o of q.options){assert(!options.has(o.id));options.add(o.id);assert(o.text.trim());}}
 return {banks,record};
}
