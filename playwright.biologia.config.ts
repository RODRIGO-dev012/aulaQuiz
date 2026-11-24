import {defineConfig} from '@playwright/test';
import base from './playwright.real.config';
export default defineConfig({...base,testDir:'.',testMatch:['tests-real/**/*.spec.ts','tests-biologia/**/*.spec.ts'],reporter:[['list'],['json',{outputFile:'artifacts/biologia-sexto/browser.json'}]],outputDir:'artifacts/biologia-sexto/test-results'});
