import type { Bank } from './engine';
import type { QuizConfiguration } from './learning';
export interface SharedTarget { subject?:string; bankId?:string; configuration?:QuizConfiguration }
const keys=['subject','bank','count','mode','timer','mixq','mixo','style'];
/** Public configuration only: never include adaptive history, answers or profile identifiers. */
export function shareUrl(base:string,target:SharedTarget,banks:Bank[]):string {
 if(target.subject&&target.bankId)throw new Error('Comparte una materia o un banco, no ambos.');
 const url=new URL(base);if(!['http:','https:'].includes(url.protocol))throw new Error('Dirección de publicación inválida.');url.search='';url.hash='';url.username='';url.password='';
 if(target.subject){if(!banks.some(b=>b.subject===target.subject))throw new Error('La materia no está disponible públicamente.');url.searchParams.set('subject',target.subject);}
 if(target.bankId){const bank=banks.find(b=>b.id===target.bankId);if(!bank)throw new Error('El banco no está disponible públicamente.');url.searchParams.set('bank',bank.id);
  if(target.configuration){const c=target.configuration;validateSharedConfig(c,bank);url.searchParams.set('count',String(c.count));url.searchParams.set('mode',c.mode);url.searchParams.set('timer',c.timer?'1':'0');url.searchParams.set('mixq',c.shuffleQuestions?'1':'0');url.searchParams.set('mixo',c.shuffleOptions?'1':'0');url.searchParams.set('style',c.style??'classic');}
 }else if(target.configuration)throw new Error('La configuración necesita un banco público.');return url.href;
}
function validateSharedConfig(c:QuizConfiguration,bank:Bank){if(!Number.isInteger(c.count)||c.count<1||c.count>bank.questions.length||!['practice','exam'].includes(c.mode)||c.selection!=='random'||typeof c.timer!=='boolean'||typeof c.shuffleQuestions!=='boolean'||typeof c.shuffleOptions!=='boolean'||!['classic','interactive'].includes(c.style??'classic')||c.shuffleQuestions&&!bank.shuffleQuestions)throw new Error('Configuración pública incompatible. Comparte una selección aleatoria válida.');}
export function readSharedLink(search:string,banks:Bank[]):SharedTarget {
 const p=new URLSearchParams(search);if([...p].length>keys.length||[...p.keys()].some(k=>!keys.includes(k)||p.getAll(k).length!==1))throw new Error('El enlace contiene parámetros desconocidos o repetidos.');
 if(p.has('subject')&&!p.get('subject')||p.has('bank')&&!p.get('bank'))throw new Error('El destino del enlace está vacío.');
 const bankId=p.get('bank')??undefined,subject=p.get('subject')??undefined;
 if(subject&&!banks.some(b=>b.subject===subject))throw new Error('Esta materia no está disponible públicamente.');
 if(subject&&bankId)throw new Error('Elige un enlace de materia o de banco.');
 const bank=bankId?banks.find(b=>b.id===bankId):undefined;if(bankId&&!bank)throw new Error('Este banco no está disponible públicamente.');
 const hasConfig=keys.slice(2).some(k=>p.has(k));if(!hasConfig)return {subject,bankId};if(!bank)throw new Error('El enlace de configuración no indica un banco público.');
 const bool=(key:string,fallback:boolean)=>{const v=p.get(key);if(v===null)return fallback;if(v!=='0'&&v!=='1')throw new Error('Preferencia del enlace inválida.');return v==='1';};
 const raw=p.get('count');if(raw!==null&&!/^[1-9]\d{0,5}$/.test(raw))throw new Error('Cantidad del enlace inválida.');
 const configuration:QuizConfiguration={count:raw===null?bank.questions.length:Number(raw),selection:'random',mode:(p.get('mode')??'practice') as QuizConfiguration['mode'],timer:bool('timer',true),shuffleQuestions:bool('mixq',bank.shuffleQuestions),shuffleOptions:bool('mixo',true),style:(p.get('style')??'classic') as QuizConfiguration['style']};
 validateSharedConfig(configuration,bank);return {bankId,configuration};
}
