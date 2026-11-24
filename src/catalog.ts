import demos from './data/banks.json';
import real from './data/real-banks.json';
import lengua from './data/lengua-sexto-banks.json';
import biologia from './data/biologia-sexto-banks.json';
import release from './data/practice-release.json';
import {restoreBanks} from './bank-format';
import type {Bank} from './engine';
export const realPracticeBanks=[...restoreBanks(real),...restoreBanks(lengua),...restoreBanks(biologia)];
export const publicBanks:Bank[]=[...realPracticeBanks,...demos];
export const hasRealPracticeBanks=realPracticeBanks.length>0;
export function practiceLabel(bank:Bank){return !realPracticeBanks.some(b=>b.id===bank.id)?bank.title:(release as Record<string,{label:string}>)[bank.id]?.label??bank.title;}
export function isProposedPractice(bank:Bank){return !bank.demo&&realPracticeBanks.some(b=>b.id===bank.id);}
