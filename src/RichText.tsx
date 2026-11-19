import { isSafeImagePath } from './safe-image';
import katex from 'katex';
import 'katex/contrib/mhchem';
import 'katex/dist/katex.min.css';
/** Plain text plus explicit LaTeX delimiters. User HTML is never interpreted. */
export function RichText({ text }: { text: string }) {
 const parts = text.split(/(\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g);
 return <>{parts.map((part, i) => {
  if (!part.startsWith('\\(') && !part.startsWith('\\[')) return <span key={i}>{part}</span>;
  const displayMode = part.startsWith('\\[');
  const html = katex.renderToString(part.slice(2, -2), { displayMode, throwOnError: false, trust: false, strict: 'warn', maxExpand: 500, maxSize: 20 });
  return <span key={i} className={displayMode ? 'math-block' : 'math-inline'} dangerouslySetInnerHTML={{ __html: html }} />;
 })}</>;
}
export function imageUrl(path: string) {
 if(!isSafeImagePath(path))return undefined;
 return /^https:\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\/?/, '')}`;
}
