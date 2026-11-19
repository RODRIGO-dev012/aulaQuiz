import { isSafeImagePath } from './safe-image';
import Ajv from 'ajv';
import schema from '../ESQUEMA_BANCO_PREGUNTAS.json';
import type { Bank } from './engine';
const validate = new Ajv({ allErrors: true }).compile(schema);
export function validateBank(value: unknown): Bank {
 if (!validate(value)) throw new Error(`Formato de banco inválido: ${validate.errors?.map(e=>`${e.instancePath || '/'} ${e.message}`).join('; ')}`);
 const bank=value as Bank;
 const ids = new Set<string>();
 for(const q of bank.questions){
  if(ids.has(q.id))throw new Error(`Pregunta duplicada: ${q.id}`);
  ids.add(q.id);
  const options=new Set(q.options.map(o=>o.id));
  if(options.size!==q.options.length)throw new Error(`Opciones duplicadas: ${q.id}`);
  if(!options.has(q.correctOptionId))throw new Error(`La respuesta correcta no existe: ${q.id}`);
  if(q.image!==undefined&&!isSafeImagePath(q.image))throw new Error('La ruta de imagen no puede contener .. ni protocolos inseguros.');
 }
 return bank;
}
export function importBanks(value: unknown): Bank[] {
 const values=Array.isArray(value)?value:[value];
 if(values.length===0||values.length>100)throw new Error('Importa entre 1 y 100 bancos por archivo.');
 const banks=values.map(validateBank);
 if(new Set(banks.map(b=>b.id)).size!==banks.length)throw new Error('El archivo contiene identificadores de banco duplicados.');
 return banks;
}
export function restoreBanks(value: unknown): Bank[] { try{return value==null?[]:importBanks(value);}catch{return [];} }
