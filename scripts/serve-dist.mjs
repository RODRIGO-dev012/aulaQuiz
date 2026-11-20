import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const directory=process.env.AULAQUIZ_TEST_DIST??'dist';if(!['dist','artifacts/baseline-dist'].includes(directory))throw Error('Directorio de pruebas no permitido');const root=path.resolve(directory);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'};
export const server=http.createServer((req,res)=>{
 const url=new URL(req.url,'http://localhost');
 if(!url.pathname.startsWith('/aulaQuiz/')){res.writeHead(404);return res.end('Not found');}
 const relative=decodeURIComponent(url.pathname.slice('/aulaQuiz/'.length))||'index.html';
 const file=path.resolve(root,relative);
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end('Not found');}
 res.writeHead(200,{'Content-Type':mime[path.extname(file)]??'application/octet-stream'});fs.createReadStream(file).pipe(res);
});
const port=Number(process.env.AULAQUIZ_TEST_PORT??4178);if(![4178,4181].includes(port))throw Error('Puerto de pruebas no permitido');server.listen(port,'127.0.0.1',()=>console.log(`GitHub Pages simulation: http://127.0.0.1:${port}/aulaQuiz/`));
