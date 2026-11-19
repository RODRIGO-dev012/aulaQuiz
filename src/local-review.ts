import { importBanks } from './bank-format';
import type { Bank } from './engine';
// The glob is empty in the sanitized public checkout; private files are optional.
const files=import.meta.env.DEV?import.meta.glob('./data/local-review-banks.json',{eager:true,import:'default'}):{};
const localSource=files['./data/local-review-banks.json'];
export const localReviewBanks:Bank[]=import.meta.env.DEV&&localSource?importBanks(localSource):[];
export const isLocalReviewBank=(id:string)=>localReviewBanks.some(bank=>bank.id===id);
