// Read-only guard before copying source from the older working folder into this Git clone.
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';
const parent=path.resolve(process.argv[2]??'../..');
const files=['src/catalog.ts','src/data/real-banks.json','src/data/lengua-sexto-banks.json','src/data/practice-release.json','src/data/question-provenance.json','scripts/verify-production-content.mjs','vite.config.ts','package.json'];
const digest=file=>fs.existsSync(file)?crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'):null;
const differences=files.map(file=>({file,clone:digest(file),mainFolder:digest(path.join(parent,file))})).filter(r=>r.clone!==r.mainFolder);
console.log(JSON.stringify({reference:'Fuente oficial: RODRIGO-dev012/aulaQuiz, rama main, en este clon. No sobrescribir desde la carpeta principal sin reconciliar estas diferencias.',comparedWith:parent,differences},null,2));
process.exitCode=differences.length?1:0;
