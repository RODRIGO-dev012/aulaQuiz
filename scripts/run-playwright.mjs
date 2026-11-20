import fs from 'node:fs';
import { spawn } from 'node:child_process';
const root=fs.realpathSync.native(new URL('../',import.meta.url));
process.chdir(root);
// Legacy V1.3 regression scenarios retain their original demonstration fixtures.
const built=await new Promise(resolve=>{const child=spawn(process.execPath,['node_modules/vite/bin/vite.js','build','--mode','baseline'],{cwd:root,stdio:'inherit',shell:false});child.on('exit',resolve);});if(built!==0)process.exit(built??1);process.env.AULAQUIZ_TEST_DIST='artifacts/baseline-dist';
const {server}=await import('./serve-dist.mjs');
const runner=spawn(process.execPath,['node_modules/@playwright/test/cli.js','test',...process.argv.slice(2)],{cwd:root,stdio:'inherit',shell:false});
runner.on('exit',code=>{server.closeAllConnections();server.close(()=>process.exit(code??1));});
process.on('SIGINT',()=>{runner.kill();server.closeAllConnections();server.close(()=>process.exit(130));});
