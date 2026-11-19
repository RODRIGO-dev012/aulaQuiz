import { isSafeImagePath } from './safe-image';
﻿import { createAttempt, shuffle, validAttempt, restore, save, type Attempt, type Bank, type Question, type StorageLike } from './engine';
export type SelectionPolicy = 'random' | 'new' | 'errors' | 'progressive';
export type LearningState = 'new' | 'reinforce' | 'mastered';
/** Reusable configuration; a future teacher can supply the same validated model. */
export interface QuizConfiguration { count:number; selection:SelectionPolicy; mode:Attempt['mode']; timer:boolean; shuffleQuestions:boolean; shuffleOptions:boolean; style?:'classic'|'interactive' }
export const policyLabels:Record<SelectionPolicy,string>={random:'Aleatoria tradicional',new:'Solo preguntas nuevas',errors:'Refuerzo de errores',progressive:'Aprendizaje progresivo'};
export interface LocalProfile { id:string; name:string; createdAt:string; attempts:Attempt[]; activeId:string|null }
export interface LearningStore { version:2; currentProfileId:string; profiles:LocalProfile[]; migratedAt?:string }
export const STORE_KEY='aulaquiz-learning-v2';
export class LearningRecoveryError extends Error {}

export interface QuestionLearning { questionId:string; bankId:string; bankVersion:string; presented:number; answered:number; correct:number; incorrect:number; omitted:number; lastAnswer?:string; lastAttemptAt?:string; lastConfirmedAt?:string; state:LearningState }
// Content signature independent of source ordering. Changed content/keys create a separate learning scope.
export function bankVersion(bank:Bank):string {
 const text=JSON.stringify(bank.questions.map(q=>({id:q.id,topic:q.topic,text:q.text,correctOptionId:q.correctOptionId,explanation:q.explanation,image:q.image,imageAlt:q.imageAlt,shuffleOptions:q.shuffleOptions!==false,options:q.options.map(o=>({id:o.id,text:o.text})).sort((a,b)=>a.id.localeCompare(b.id))})).sort((a,b)=>a.id.localeCompare(b.id)));
 let hash=2166136261;for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619);}return `content-v1-${(hash>>>0).toString(16).padStart(8,'0')}`;
}
export function mastery(lastCorrect:boolean):LearningState { return lastCorrect?'mastered':'reinforce'; }
export function questionLearning(bank:Bank,attempts:Attempt[]):Map<string,QuestionLearning> {
 const version=bankVersion(bank);const records=new Map<string,QuestionLearning>(bank.questions.map(q=>[q.id,{questionId:q.id,bankId:bank.id,bankVersion:version,presented:0,answered:0,correct:0,incorrect:0,omitted:0,state:'new'}]));
 // Deduplicate attempt IDs defensively. Each question contributes at most once per attempt.
 const unique=[...new Map(attempts.map(a=>[a.id,a])).values()].filter(a=>a.bankId===bank.id&&a.bankVersion===version);
 for(const a of unique){for(const q of a.questions){const r=records.get(q.id);if(!r)continue;if(!a.presented||a.presented.includes(q.id))r.presented++;const date=[a.finishedAt??a.startedAt,...Object.values(a.confirmedAt??{})].sort().at(-1)!;if(!r.lastAttemptAt||Date.parse(date)>Date.parse(r.lastAttemptAt))r.lastAttemptAt=date;
  const answer=a.answers[q.id];if(answer&&(a.finishedAt||a.confirmed.includes(q.id))){const correct=answer===q.correctOptionId;r.answered++;if(correct)r.correct++;else r.incorrect++;const at=a.confirmedAt?.[q.id]??a.finishedAt??a.startedAt;
   if(!r.lastConfirmedAt||Date.parse(at)>Date.parse(r.lastConfirmedAt)){r.lastConfirmedAt=at;r.lastAnswer=answer;r.state=mastery(correct);}
  }else if(a.finishedAt&&!answer)r.omitted++;
 }}return records;
}
export function eligibleQuestions(bank:Bank,attempts:Attempt[],policy:SelectionPolicy):Question[] {
 const learning=questionLearning(bank,attempts);return bank.questions.filter(q=>{const state=learning.get(q.id)!.state;return policy==='random'||policy==='new'&&state==='new'||policy==='errors'&&state==='reinforce'||policy==='progressive'&&state!=='mastered';});
}
export function startLearningAttempt(bank:Bank,attempts:Attempt[],profileId:string,config:QuizConfiguration,restrictedPool?:Question[]):Attempt {
 if(!['random','new','errors','progressive'].includes(config.selection)||!['practice','exam'].includes(config.mode)||typeof config.timer!=='boolean'||typeof config.shuffleQuestions!=='boolean'||typeof config.shuffleOptions!=='boolean'||!['classic','interactive'].includes(config.style??'classic'))throw new Error('Configuración inválida.');
 let pool=eligibleQuestions(bank,attempts,config.selection);if(restrictedPool){const ids=new Set(restrictedPool.map(q=>q.id));pool=pool.filter(q=>ids.has(q.id));}
 if(!Number.isInteger(config.count)||config.count<1||config.count>pool.length)throw new Error(`Selecciona entre 1 y ${pool.length} preguntas disponibles. No se añadirán repetidas.`);
 if(new Set(pool.map(q=>q.id)).size!==pool.length)throw new Error('El banco contiene identificadores duplicados.');
 if(config.selection==='progressive'){const states=questionLearning(bank,attempts);const failed=pool.filter(q=>states.get(q.id)!.state==='reinforce'),fresh=pool.filter(q=>states.get(q.id)!.state==='new');pool=config.shuffleQuestions?[...shuffle(failed),...shuffle(fresh)]:[...failed,...fresh];}
 else if(config.shuffleQuestions&&bank.shuffleQuestions)pool=shuffle(pool);
 const selected=pool.slice(0,config.count).map(q=>({...q,shuffleOptions:config.shuffleOptions&&q.shuffleOptions!==false}));
 const attempt=createAttempt({...bank,shuffleQuestions:false},config.count,config.mode,config.timer,selected);
 return {...attempt,presented:[attempt.questions[0].id],profileId,bankVersion:bankVersion(bank),subject:bank.subject,selection:config.selection,configuration:{...config},confirmedAt:{}};
}
export function finishLearningAttempt(attempt:Attempt,at=new Date().toISOString()):Attempt {
 if(attempt.finishedAt)return attempt;
 return {...attempt,finishedAt:at,confirmed:Object.keys(attempt.answers),confirmedAt:{...Object.fromEntries(Object.keys(attempt.answers).map(id=>[id,at])),...attempt.confirmedAt}};
}
export function emptyStore():LearningStore {return {version:2,currentProfileId:'guest',profiles:[{id:'guest',name:'Invitado',createdAt:new Date().toISOString(),attempts:[],activeId:null}]};}
export function addProfile(store:LearningStore,name:string):LearningStore {const clean=name.trim();if(!clean||clean.length>40)throw new Error('Escribe un nombre o alias de 1 a 40 caracteres.');const id=crypto.randomUUID();return {...store,currentProfileId:id,profiles:[...store.profiles,{id,name:clean,createdAt:new Date().toISOString(),attempts:[],activeId:null}]};}
export function updateAttempt(store:LearningStore,change:Attempt|null|((a:Attempt|null)=>Attempt|null)):LearningStore {
 return {...store,profiles:store.profiles.map(p=>{if(p.id!==store.currentProfileId)return p;const old=p.attempts.find(a=>a.id===p.activeId)??null;const next=typeof change==='function'?change(old):change;
  if(!next)return {...p,activeId:null};
  // Finished records cannot be edited by later autosave or callbacks.
  if(p.attempts.find(a=>a.id===next.id)?.finishedAt)return p;
  const owned={...next,profileId:p.id,presented:[...new Set([...(next.presented??next.questions.map(q=>q.id)),next.questions[next.current].id])]};return {...p,activeId:next.finishedAt?null:next.id,attempts:[owned,...p.attempts.filter(a=>a.id!==next.id)]};})};
}
function validMetadata(a:Attempt):boolean {
 const ids=new Set(a.questions.map(q=>q.id));
 if(a.selection!==undefined&&!Object.hasOwn(policyLabels,a.selection))return false;
 if(a.presented!==undefined&&(!Array.isArray(a.presented)||new Set(a.presented).size!==a.presented.length||!a.presented.every(id=>ids.has(id))))return false;
 if(a.confirmedAt!==undefined&&(!a.confirmedAt||typeof a.confirmedAt!=='object'||Array.isArray(a.confirmedAt)||!Object.entries(a.confirmedAt).every(([id,date])=>ids.has(id)&&a.confirmed.includes(id)&&typeof date==='string'&&Number.isFinite(Date.parse(date)))))return false;
 if(a.questions.some(q=>q.image!==undefined&&!isSafeImagePath(q.image)))return false;
 const c=a.configuration;if(c&&(!Number.isInteger(c.count)||c.count!==a.questions.length||c.mode!==a.mode||!Object.hasOwn(policyLabels,c.selection)||c.selection!==a.selection||typeof c.timer!=='boolean'||c.timer!==a.timer||typeof c.shuffleQuestions!=='boolean'||typeof c.shuffleOptions!=='boolean'||!['classic','interactive'].includes(c.style??'classic')))return false;
 return true;
}
export function validStore(value:unknown):value is LearningStore {
 try {const s=value as LearningStore;if(s.version!==2||!Array.isArray(s.profiles)||!s.profiles.length||new Set(s.profiles.map(p=>p.id)).size!==s.profiles.length||!s.profiles.some(p=>p.id===s.currentProfileId)||!s.profiles.some(p=>p.id==='guest'))return false;
 return s.profiles.every(p=>typeof p.id==='string'&&typeof p.name==='string'&&!!p.name.trim()&&p.name.length<=40&&typeof p.createdAt==='string'&&Number.isFinite(Date.parse(p.createdAt))&&Array.isArray(p.attempts)&&new Set(p.attempts.map(a=>a.id)).size===p.attempts.length&&p.attempts.every(a=>validAttempt(a)&&a.profileId===p.id&&typeof a.bankVersion==='string'&&!!a.bankVersion&&validMetadata(a))&&(p.activeId===null||p.attempts.some(a=>a.id===p.activeId&&!a.finishedAt)));
 }catch{return false;}
}
export function loadLearningStore(banks:Bank[],storage:StorageLike=localStorage):LearningStore {
 const raw=storage.getItem(STORE_KEY);let stored:unknown=null;try{stored=raw===null?null:JSON.parse(raw);}catch{try{storage.setItem('aulaquiz-learning-v2-recovery',raw!);}catch{}throw new LearningRecoveryError('El historial de perfiles necesita recuperación. No se sobrescribieron sus datos.');}if(validStore(stored))return stored;
 if(raw!==null){save('aulaquiz-learning-v2-recovery',stored,storage);throw new LearningRecoveryError('El historial de perfiles necesita recuperación. No se sobrescribieron sus datos.');}
 const store=emptyStore();const rawActive=storage.getItem('aulaquiz-active'),rawHistory=storage.getItem('aulaquiz-history');
 // Copy original bytes before migration; never modify an existing backup.
 if((rawActive||rawHistory)&&!storage.getItem('aulaquiz-legacy-backup-v1')){storage.setItem('aulaquiz-legacy-backup-v1',JSON.stringify({active:rawActive,history:rawHistory}));}
 const history=restore<unknown>('aulaquiz-history',[],storage);const active=restore<unknown>('aulaquiz-active',null,storage);
 const candidates=[...(Array.isArray(history)?history.filter(validAttempt).filter(a=>a.finishedAt):[]),...(validAttempt(active)&&!active.finishedAt?[active]:[])];
 store.profiles[0].attempts=[...new Map(candidates.map(a=>{const bank=banks.find(b=>b.id===a.bankId);const migrated={...a,profileId:'guest',bankVersion:bank&&a.questions.every(q=>{const current=bank.questions.find(c=>c.id===q.id);return current&&bankVersion({...bank,questions:[q]})===bankVersion({...bank,questions:[current]});})?bankVersion(bank):`archived-${bankVersion({...(bank??{}),questions:a.questions} as Bank)}`,subject:bank?.subject??'Banco archivado',selection:a.selection??'random' as SelectionPolicy};return [a.id,migrated] as const;})).values()];
 store.profiles[0].activeId=validAttempt(active)&&!active.finishedAt?active.id:null;store.migratedAt=new Date().toISOString();
 if(!save(STORE_KEY,store,storage))throw new Error('No se pudo guardar la migración. Se conservaron los datos anteriores.');return store;
}
