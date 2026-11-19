import fs from 'node:fs';
import { spawn } from 'node:child_process';
const root=fs.realpathSync.native(new URL('../',import.meta.url));
process.chdir(root);
const {server}=await import('./serve-dist.mjs');
const runner=spawn(process.execPath,['node_modules/@playwright/test/cli.js','test',...process.argv.slice(2)],{cwd:root,stdio:'inherit',shell:false});
runner.on('exit',code=>{server.closeAllConnections();server.close(()=>process.exit(code??1));});
process.on('SIGINT',()=>{runner.kill();server.closeAllConnections();server.close(()=>process.exit(130));});
