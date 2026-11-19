import { useEffect, useState } from 'react';
import type { Attempt, Bank } from './engine';
import { importProgress } from './progress-io';
import { save } from './engine';
import { addProfile, emptyStore, loadLearningStore, LearningRecoveryError, STORE_KEY, updateAttempt } from './learning';
export function useLearning(banks:Bank[]) {
 const [initial]=useState(()=>{try{return {store:loadLearningStore(banks),error:'',volatile:false};}catch(e){if(e instanceof LearningRecoveryError)return {store:emptyStore(),error:e.message,volatile:false};const memory=new Map<string,string>();for(const key of ['aulaquiz-active','aulaquiz-history']){try{const raw=localStorage.getItem(key);if(raw)memory.set(key,raw);}catch{}}const store=loadLearningStore(banks,{getItem:key=>memory.get(key)??null,setItem:(key,value)=>{memory.set(key,value);}});return {store,error:'',volatile:true};}});
 const [store,setStore]=useState(initial.store),[storageError,setStorageError]=useState(initial.volatile);
 const profile=store.profiles.find(p=>p.id===store.currentProfileId)!;
 const attempt=profile.attempts.find(a=>a.id===profile.activeId)??null;
 const history=profile.attempts.filter(a=>!!a.finishedAt).sort((a,b)=>b.finishedAt!.localeCompare(a.finishedAt!));
 useEffect(()=>{if(initial.error)return;if(initial.volatile){setStorageError(true);return;}const ok=save(STORE_KEY,store);setStorageError(!ok);if(ok){save('aulaquiz-active',attempt);save('aulaquiz-history',history);}},[store]);
 function setAttempt(change:Attempt|null|((a:Attempt|null)=>Attempt|null)){if(initial.error)return;setStore(s=>updateAttempt(s,change));}
 function switchProfile(id:string){if(initial.error)return;setStore(s=>s.profiles.some(p=>p.id===id)?{...s,currentProfileId:id}:s);}
 function createProfile(name:string){if(initial.error)throw new Error(initial.error);setStore(s=>addProfile(s,name));}
 function restorePersonalProgress(value:unknown){if(initial.error)throw new Error(initial.error);const next=importProgress(store,value);if(!save(STORE_KEY,next))throw new Error('No hay espacio para guardar esta copia. No se reemplazó tu progreso.');setStore(next);}
 return {restorePersonalProgress,store,profile,attempt,history,setAttempt,switchProfile,createProfile,storageError,loadError:initial.error};
}
