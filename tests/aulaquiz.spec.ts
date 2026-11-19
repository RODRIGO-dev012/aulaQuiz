import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
const example=JSON.parse(fs.readFileSync('examples/BANCO_EJEMPLO_VALIDO.json','utf8'));
type Active={id:string;questions:{id:string;text:string;correctOptionId:string;options:{id:string;text:string}[]}[];answers:Record<string,string>;current:number;elapsed:number;marked:string[];confirmed:string[]};
const active=(page:Page):Promise<Active>=>page.evaluate(()=>JSON.parse(localStorage.getItem('aulaquiz-active')!));
async function noOverflow(page:Page){expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);}
async function shot(page:Page,name:string,project:string){await page.evaluate(()=>window.scrollTo(0,0));await page.screenshot({path:`artifacts/screenshots/${project}/${name}.png`,fullPage:!name.includes('configuracion'),animations:'disabled'});await noOverflow(page);}
async function configure(page:Page,mode='practice',count='3',timer=true){await page.getByRole('button',{name:'Comenzar práctica',exact:true}).click();await page.locator('#question-count').selectOption(count);if(mode==='exam')await page.locator('.mode-options button').filter({hasText:'Simulacro'}).click();if(!timer)await page.getByRole('checkbox').uncheck();}
async function answer(page:Page,correct:boolean){const a=await active(page);const q=a.questions[a.current];const i=q.options.findIndex(o=>correct?o.id===q.correctOptionId:o.id!==q.correctOptionId);await page.locator('.option').nth(i).click();}
async function finish(page:Page){await page.getByRole('button',{name:'Finalizar intento',exact:true}).click();await expect(page.getByRole('dialog')).toBeVisible();await page.getByRole('button',{name:'Ver mis resultados',exact:true}).click();await expect(page.getByRole('heading',{name:'Resultados y revisión',exact:true})).toBeVisible();}
test.beforeEach(async({page})=>{const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});(page as any).__errors=errors;await page.goto('./');});
test.afterEach(async({page})=>{expect((page as any).__errors,'Errores JS, consola y HTTP').toEqual([]);});
test('flujo completo: práctica, guardado, resultados y refuerzo + capturas',async({page},info)=>{
 await shot(page,'01-inicio',info.project.name);
 await configure(page);await shot(page,'02-configuracion',info.project.name);
 await page.getByRole('button',{name:'¡Comenzar mi reto!'}).click();await expect(page.locator('.option')).toHaveCount(4);
 const initial=await active(page);expect(new Set(initial.questions.map(q=>q.id)).size).toBe(3);
 await answer(page,true);await page.getByRole('button',{name:'Confirmar',exact:true}).click();await expect(page.locator('.feedback.positive')).toBeVisible();await expect(page.locator('.option').first()).toBeDisabled();
 await page.getByRole('button',{name:'Siguiente',exact:true}).click();await answer(page,false);await page.getByRole('button',{name:'Marcar para revisar',exact:true}).click();
 await page.getByRole('button',{name:'Confirmar',exact:true}).click();await expect(page.locator('.feedback.negative')).toBeVisible();await shot(page,'03-cuestionario',info.project.name);
 const before=await active(page);await page.reload();await page.getByRole('button',{name:'Continuar',exact:true}).click();const after=await active(page);
 expect(after.questions).toEqual(before.questions);expect(after.answers).toEqual(before.answers);expect(after.marked).toEqual(before.marked);expect(after.confirmed).toEqual(before.confirmed);expect(after.current).toBe(1);
 await page.getByRole('button',{name:'Anterior',exact:true}).click();await expect(page.locator('.question-text')).toHaveText(initial.questions[0].text);await page.getByRole('button',{name:'Pregunta 3',exact:true}).click();
 await page.getByRole('button',{name:'Finalizar intento',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('1 preguntas sin responder');await page.getByRole('button',{name:'Seguir revisando'}).click();await expect(page.getByRole('dialog')).toHaveCount(0);
 await finish(page);await expect(page.locator('.result-award strong')).toHaveText('33%');await expect(page.locator('.result-stats strong')).toHaveText(['1','1','1',/\d\d:\d\d/]);await shot(page,'04-resultados',info.project.name);
 await page.locator('.review-item summary').nth(1).click();await expect(page.locator('.review-item[open] .review-detail')).toContainText('Respuesta correcta:');
 await page.getByRole('button',{name:'Reforzar incorrectas (1)'}).click();await shot(page,'05-refuerzo-configuracion',info.project.name);await page.getByRole('button',{name:'Comenzar refuerzo',exact:true}).click();
 const retry=await active(page);expect(retry.questions.map(q=>q.id)).toEqual([initial.questions[1].id]);expect(retry.answers).toEqual({});await shot(page,'06-refuerzo',info.project.name);
 await answer(page,true);await page.getByRole('button',{name:'Confirmar',exact:true}).click();await finish(page);await expect(page.locator('.result-award strong')).toHaveText('100%');await expect(page.getByRole('button',{name:'Reforzar incorrectas (0)'})).toBeDisabled();
});
test('simulacro oculta soluciones, cronómetro persiste y puede desactivarse',async({page})=>{
 await page.clock.install();await configure(page,'exam','2');await page.getByRole('button',{name:'¡Comenzar mi reto!'}).click();await page.clock.fastForward('00:08');await expect(page.locator('.quiz-timer')).toContainText('00:08');
 await answer(page,true);await expect(page.locator('.feedback')).toHaveCount(0);await expect(page.getByRole('button',{name:'Confirmar',exact:true})).toHaveCount(0);await page.getByRole('button',{name:'Siguiente',exact:true}).click();await answer(page,false);
 const before=await active(page);await page.reload();await page.getByRole('button',{name:'Continuar',exact:true}).click();expect((await active(page)).elapsed).toBeGreaterThanOrEqual(before.elapsed);await finish(page);await expect(page.locator('.result-award strong')).toHaveText('50%');
 await page.getByRole('button',{name:'Volver al inicio',exact:true}).click();await configure(page,'exam','1',false);await page.getByRole('button',{name:'¡Comenzar mi reto!'}).click();await expect(page.locator('.quiz-timer')).toHaveCount(0);
});
test('cada intento cambia preguntas y alternativas sin duplicarlas',async({page})=>{
 const signatures=new Set<string>(),orders=new Set<string>();
 for(let i=0;i<4;i++){await configure(page,'exam','10');await page.getByRole('button',{name:'¡Comenzar mi reto!'}).click();const a=await active(page);expect(new Set(a.questions.map(q=>q.id)).size).toBe(10);signatures.add(a.questions.map(q=>q.id).join(','));orders.add(a.questions.find(q=>q.id==='sociales-1')!.options.map(o=>o.id).join(','));await page.getByRole('button',{name:'Guardar y salir',exact:true}).click();}
 expect(signatures.size).toBeGreaterThan(1);expect(orders.size).toBeGreaterThan(1);
});
test('importación de siete bancos, fórmulas, química, imágenes y orden fijo',async({page})=>{
 await page.getByRole('button',{name:'Ver todas',exact:true}).click();const subjects=['Ciencias Sociales','Ciencias Sociales','Ciencias Sociales','Ciencias Sociales','Química','Física','Matemáticas'];
 const fixture=subjects.map((subject,i)=>({...example,id:`fixture-${i}`,subject,title:`Ejemplo técnico ${i+1}`}));
 await page.getByLabel('Archivo de bancos JSON').setInputFiles({name:'siete-ejemplos.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(fixture))});await expect(page.getByRole('status')).toContainText('7 banco(s) importado(s)');await expect(page.locator('.bank-card')).toHaveCount(11);
 await page.reload();await page.getByRole('button',{name:'Ver todas',exact:true}).click();await page.locator('.filter-tabs button').filter({hasText:'Química'}).click();await expect(page.locator('.bank-card')).toHaveCount(1);await page.getByRole('button',{name:'Configurar práctica',exact:true}).click();await page.getByRole('button',{name:'¡Comenzar mi reto!'}).click();
 await expect(page.locator('.question-text .katex')).toHaveCount(2);await expect(page.locator('.katex-error')).toHaveCount(0);await expect(page.locator('.question-image')).toBeVisible();expect(await page.locator('.question-image').evaluate((el:HTMLImageElement)=>el.complete&&el.naturalWidth>0)).toBe(true);expect((await active(page)).questions[0].options.map(o=>o.id)).toEqual(example.questions[0].options.map((o:any)=>o.id));await noOverflow(page);
 await answer(page,true);await page.getByRole('button',{name:'Confirmar',exact:true}).click();await expect(page.locator('.feedback .katex')).toHaveCount(2);await finish(page);await page.locator('.review-item summary').click();await expect(page.locator('.review-detail .katex')).toHaveCount(4);await noOverflow(page);
});
test('rechaza bancos inválidos sin alterar los existentes',async({page})=>{
 await page.getByRole('button',{name:'Ver todas',exact:true}).click();await page.getByLabel('Archivo de bancos JSON').setInputFiles({name:'invalido.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify({...example,questions:[{...example.questions[0],correctOptionId:'no-existe'}]}))});await expect(page.getByRole('status')).toContainText('La respuesta correcta no existe');await expect(page.locator('.bank-card')).toHaveCount(4);
});
test('recupera almacenamiento corrupto sin bloquear el inicio',async({page})=>{
 await page.evaluate(()=>{localStorage.setItem('aulaquiz-history','{}');localStorage.setItem('aulaquiz-active',JSON.stringify({questions:[null]}));localStorage.setItem('aulaquiz-banks','{}');});await page.reload();await expect(page.getByRole('heading',{name:/Hola, qué bueno verte/})).toBeVisible();await noOverflow(page);
});
