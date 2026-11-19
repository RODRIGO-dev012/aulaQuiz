export type Option = { id: string; text: string };
export type Question = { id: string; topic: string; text: string; options: Option[]; correctOptionId: string; explanation?: string; image?: string; imageAlt?: string; shuffleOptions?: boolean };
export type Bank = { id: string; subject: string; grade: string; title: string; description: string; color: string; demo?: boolean; shuffleQuestions: boolean; questions: Question[] };
export type Attempt = { id: string; bankId: string; title: string; mode: 'practice' | 'exam'; questions: Question[]; answers: Record<string, string>; confirmed: string[]; marked: string[]; current: number; elapsed: number; timer: boolean; startedAt: string; finishedAt?: string; presented?: string[]; profileId?: string; bankVersion?: string; subject?: string; selection?: 'random' | 'new' | 'errors' | 'progressive'; configuration?: import('./learning').QuizConfiguration; confirmedAt?: Record<string,string> };
export function shuffle<T>(items: readonly T[], random = Math.random): T[] {
 const result = [...items];
 for (let i = result.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [result[i], result[j]] = [result[j], result[i]]; }
 return result;
}
export function createAttempt(bank: Bank, count: number, mode: Attempt['mode'], timer: boolean, pool = bank.questions): Attempt {
 const questions = (bank.shuffleQuestions ? shuffle(pool) : [...pool]).slice(0, Math.max(1, count)).map(q => ({ ...q, options: q.shuffleOptions === false ? [...q.options] : shuffle(q.options) }));
 return { id: crypto.randomUUID(), bankId: bank.id, title: bank.title, mode, timer, questions, answers: {}, confirmed: [], marked: [], current: 0, elapsed: 0, startedAt: new Date().toISOString() };
}
export function score(attempt: Attempt) {
 const correct = attempt.questions.filter(q => attempt.answers[q.id] === q.correctOptionId).length;
 const omitted = attempt.questions.filter(q => !attempt.answers[q.id]).length;
 return { correct, omitted, incorrect: attempt.questions.length - correct - omitted, percent: Math.round(correct / attempt.questions.length * 100) };
}
export function reinforcement(attempt: Attempt) { return attempt.questions.filter(q => attempt.answers[q.id] && attempt.answers[q.id] !== q.correctOptionId); }
export interface StorageLike { getItem(key: string): string | null; setItem(key: string, value: string): void }
export function save<T>(key: string, value: T, storage?: StorageLike) { try { (storage??globalThis.localStorage).setItem(key, JSON.stringify(value)); return true; } catch { return false; } }
export function restore<T>(key: string, fallback: T, storage?: StorageLike): T { try { const raw = (storage??globalThis.localStorage).getItem(key); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; } }
export function validAttempt(value: unknown): value is Attempt {
 try {
  if (!value || typeof value !== 'object') return false;
  const a=value as Attempt;
  if(typeof a.id!=='string'||typeof a.bankId!=='string'||typeof a.title!=='string'||!Array.isArray(a.questions)||!a.questions.length||!Number.isInteger(a.current)||a.current<0||a.current>=a.questions.length||!Number.isFinite(a.elapsed)||a.elapsed<0||typeof a.timer!=='boolean'||!['practice','exam'].includes(a.mode)||!Number.isFinite(Date.parse(a.startedAt))||(a.finishedAt!==undefined&&!Number.isFinite(Date.parse(a.finishedAt))))return false;
  if(!a.questions.every(q=>q&&typeof q.id==='string'&&typeof q.text==='string'&&typeof q.topic==='string'&&Array.isArray(q.options)&&q.options.length===4&&new Set(q.options.map(o=>o.id)).size===4&&q.options.every(o=>typeof o.id==='string'&&typeof o.text==='string')&&q.options.some(o=>o.id===q.correctOptionId)))return false;
  const ids=new Set(a.questions.map(q=>q.id));
  if(ids.size!==a.questions.length||!a.answers||typeof a.answers!=='object'||Array.isArray(a.answers)||!Array.isArray(a.confirmed)||!Array.isArray(a.marked))return false;
  return Object.entries(a.answers).every(([id,option])=>a.questions.find(q=>q.id===id)?.options.some(o=>o.id===option))&&a.confirmed.every(id=>ids.has(id)&&!!a.answers[id])&&a.marked.every(id=>ids.has(id));
 } catch { return false; }
}
