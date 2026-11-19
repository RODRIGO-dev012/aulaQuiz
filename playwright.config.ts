import { defineConfig } from '@playwright/test';
const sizes=[[1920,1080],[1366,768],[768,1024],[390,844],[360,800]];
export default defineConfig({
 testDir:'./tests', timeout:60000, expect:{timeout:10000}, fullyParallel:false, workers:1,
 reporter:[['list'],['html',{outputFolder:'artifacts/playwright-report',open:'never'}],['json',{outputFile:'artifacts/playwright-results.json'}]],
 outputDir:'artifacts/test-results',
 use:{baseURL:'http://127.0.0.1:4178/aulaQuiz/',channel:process.env.CI?'chromium':'chrome',headless:true,trace:'retain-on-failure'},
 projects:sizes.map(([width,height])=>({name:`${width}x${height}`,use:{viewport:{width,height}}}))
});
