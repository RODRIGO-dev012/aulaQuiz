import { emptyStore, validStore, type LearningStore, type LocalProfile } from './learning';
export interface ProgressCopy { kind:'aulaquiz-personal-progress'; version:1; exportedAt:string; profile:LocalProfile }
export function exportProgress(profile:LocalProfile):string {return JSON.stringify({kind:'aulaquiz-personal-progress',version:1,exportedAt:new Date().toISOString(),profile} satisfies ProgressCopy,null,2);}
export function parseProgress(value:unknown):LocalProfile {
 if(!value||typeof value!=='object'||Array.isArray(value))throw new Error('Copia de progreso inválida.');const copy=value as ProgressCopy;
 if(copy.kind!=='aulaquiz-personal-progress'||copy.version!==1||typeof copy.exportedAt!=='string'||!Number.isFinite(Date.parse(copy.exportedAt))||!copy.profile||!['kind','version','exportedAt','profile'].every(k=>Object.hasOwn(copy,k))||Object.keys(copy).some(k=>!['kind','version','exportedAt','profile'].includes(k)))throw new Error('Copia de progreso inválida o versión no compatible.');
 const test:LearningStore={version:2,currentProfileId:copy.profile.id,profiles:[...(copy.profile.id==='guest'?[]:emptyStore().profiles),copy.profile]};
 if(!validStore(test))throw new Error('El perfil, las respuestas o los intentos de la copia no son válidos.');return structuredClone(copy.profile);
}
/** Add as a separate profile; never merge with or replace an existing student's results. */
export function importProgress(store:LearningStore,value:unknown):LearningStore {
 const source=parseProgress(value);const id=crypto.randomUUID();const profile={...source,id,name:(source.name.slice(0,32)+' (copia)').slice(0,40),attempts:source.attempts.map(a=>({...a,profileId:id}))};
 return {...store,currentProfileId:id,profiles:[...store.profiles,profile]};
}
export function downloadProgress(profile:LocalProfile){const blob=new Blob([exportProgress(profile)],{type:'application/json;charset=utf-8'});const url=URL.createObjectURL(blob);const anchor=document.createElement('a');anchor.href=url;anchor.download='AULAQUIZ_PROGRESO_PERSONAL.json';anchor.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
