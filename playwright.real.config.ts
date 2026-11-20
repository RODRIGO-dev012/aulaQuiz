import {defineConfig} from '@playwright/test';
import base from './playwright.config';
export default defineConfig({...base,testDir:'./tests-real',timeout:120000,reporter:[['list'],['html',{outputFolder:'artifacts/v1.5/playwright-real-report',open:'never'}],['json',{outputFile:'artifacts/v1.5/playwright-real.json'}]],outputDir:'artifacts/v1.5/real-test-results',use:{...base.use,baseURL:process.env.AULAQUIZ_PUBLIC_URL??'http://127.0.0.1:4181/aulaQuiz/'}});
