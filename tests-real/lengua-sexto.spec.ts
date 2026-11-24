import {test,expect} from '@playwright/test';import fs from 'node:fs';
import {createAttempt} from '../src/engine';import {bankVersion,finishLearningAttempt} from '../src/learning';
const banks=JSON.parse(fs.readFileSync('src/data/lengua-sexto-banks.json','utf8'));
const old=JSON.parse(fs.readFileSync('src/data/real-banks.json','utf8'));
test.beforeEach(async({page})=>{const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});(page as any).errors=errors;});
test.afterEach(async({page})=>{expect((page as any).errors).toEqual([]);});
for(const bank of banks)for(const mode of ['practice','exam'])test(`${bank.id}: completo ${mode}, mezcla, secuencia, claves y persistencia`,async({page},info)=>{
 test.setTimeout(240000);page.setDefaultTimeout(15000);
 await page.goto('./?bank='+bank.id);await expect(page.getByRole('dialog')).toContainText(bank.title);await expect(page.locator('#question-count')).toHaveValue(String(bank.questions.length));
 if(mode==='exam')await page.locator('.mode-options button').filter({hasText:'Simulacro'}).click();
 await page.getByRole('button',{name:'¡Comenzar mi reto!',exact:true}).click();
 await expect(page.locator('.proposed-key-notice')).toContainText('No oficiales ni certificadas');
 const start=await page.evaluate(()=>JSON.parse(localStorage.getItem('aulaquiz-active')!));expect(start.questions).toHaveLength(bank.questions.length);
 // Read the presented order after the real shuffle; compare IDs AND associated texts to the source.
 for(const q of start.questions){const src=bank.questions.find((s:any)=>s.id===q.id);expect(q.correctOptionId).toBe(src.correctOptionId);expect(q.options.slice().sort((a:any,b:any)=>a.id.localeCompare(b.id))).toEqual(src.options.slice().sort((a:any,b:any)=>a.id.localeCompare(b.id)));}
 await page.screenshot({path:`artifacts/lengua-sexto/${info.project.name}/${bank.id}-${mode}-inicio.png`,fullPage:true});
 const results=await page.evaluate(async({questions,mode})=>{
  const frame=()=>new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));const norm=(s:string)=>s.replace(/\s+/g,' ').trim();const out=[];
  for(let i=0;i<questions.length;i++){
   if(i){(document.querySelectorAll('.question-grid button')[i] as HTMLButtonElement).click();await frame();}
   const q=questions[i],buttons=[...document.querySelectorAll('.option')];
   const text=norm(document.querySelector('.question-text')?.textContent??'');
   const sequence=norm(document.querySelector('.quiz-progress strong')?.textContent??'');
   const good=buttons[q.options.findIndex((o:any)=>o.id===q.correctOptionId)] as HTMLButtonElement;
   const options=buttons.length===4&&buttons.every((b,j)=>norm(b.textContent??'').includes(norm(q.options[j].text)));
   good.click();await frame();
   if(mode==='practice'){const confirm=[...document.querySelectorAll('button')].find(b=>b.textContent?.trim()==='Confirmar');if(!confirm)throw Error('Falta Confirmar '+q.id);confirm.click();await frame();}
   const state=JSON.parse(localStorage.getItem('aulaquiz-active')!);
   out.push({id:q.id,text:text.includes(norm(q.text)),options,sequence:sequence===`Pregunta ${i+1} de ${questions.length}`,answer:state.answers[q.id]===q.correctOptionId,overflow:document.documentElement.scrollWidth>innerWidth+1,confirmed:mode==='exam'||state.confirmed.includes(q.id)});
  }return out;
 },{questions:start.questions,mode});
 expect(results.filter(r=>!r.text||!r.options||!r.sequence||!r.answer||r.overflow||!r.confirmed)).toEqual([]);
 await page.reload();const restored=await page.evaluate(()=>JSON.parse(localStorage.getItem('aulaquiz-active')!));expect(restored.id).toBe(start.id);expect(Object.keys(restored.answers)).toHaveLength(bank.questions.length);await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await page.getByRole('button',{name:'Finalizar intento',exact:true}).click();await page.getByRole('button',{name:'Ver mis resultados',exact:true}).click();await expect(page.locator('.result-award strong')).toHaveText('100%');
 await page.screenshot({path:`artifacts/lengua-sexto/${info.project.name}/${bank.id}-${mode}-resultado.png`,fullPage:true});
 await page.goto('./?bank='+bank.id);await page.locator('#selection-policy').selectOption('new');await expect(page.locator('.eligibility-note')).toContainText('0 nuevas');await expect(page.getByRole('button',{name:'¡Comenzar mi reto!',exact:true})).toBeDisabled();
 fs.mkdirSync(`artifacts/lengua-sexto/${info.project.name}`,{recursive:true});fs.writeFileSync(`artifacts/lengua-sexto/${info.project.name}/${bank.id}-${mode}-cobertura.json`,JSON.stringify(results,null,2));
});
test('catálogo de nueve bancos y perfil V1.7 intacto después de practicar Lengua',async({page})=>{
 const a=createAttempt(old[0],1,'exam',false);a.answers[a.questions[0].id]=a.questions[0].correctOptionId;
 const done={...finishLearningAttempt(a),profileId:'guest',bankVersion:bankVersion(old[0])};
 const store={version:2,currentProfileId:'guest',profiles:[{id:'guest',name:'Estudiante V1.7',createdAt:'2026-01-01T00:00:00Z',attempts:[done],activeId:null}]};
 await page.goto('./');await page.evaluate(s=>localStorage.setItem('aulaquiz-learning-v2',JSON.stringify(s)),store);await page.reload();
 await expect(page.getByRole('button',{name:'Cambiar perfil',exact:true})).toContainText('Estudiante V1.7');
 await page.getByRole('button',{name:'Ver todas',exact:true}).click();await expect(page.locator('.bank-card')).toHaveCount(11);
 for(const b of banks)await expect(page.locator('.bank-card').filter({hasText:b.title})).toContainText(`${b.questions.length} preguntas`);
 await page.goto('./?bank='+banks[0].id);await page.getByLabel('Cantidad personalizada',{exact:true}).fill('2');await page.locator('.mode-options button').filter({hasText:'Simulacro'}).click();await page.getByRole('button',{name:'¡Comenzar mi reto!',exact:true}).click();
 const active=await page.evaluate(()=>JSON.parse(localStorage.getItem('aulaquiz-active')!));const q=active.questions[0];await page.locator('.option').nth(q.options.findIndex((o:any)=>o.id!==q.correctOptionId)).click();
 await page.getByRole('button',{name:'Finalizar intento',exact:true}).click();await page.getByRole('button',{name:'Ver mis resultados',exact:true}).click();await expect(page.locator('.result-award strong')).toHaveText('0%');
 await page.reload();const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('aulaquiz-learning-v2')!));expect(after.profiles[0].attempts.find((x:any)=>x.id===done.id)).toEqual(done);expect(after.profiles[0].attempts).toHaveLength(2);
});
