import { describe, it, expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { RichText } from './RichText';
import { importBanks, validateBank } from './bank-format';
import example from '../examples/BANCO_EJEMPLO_VALIDO.json';
import data from './data/banks.json';
import realBanks from './data/real-banks.json';
import { createAttempt, validAttempt, type Bank } from './engine';
describe('Contrato definitivo de bancos',()=>{
 it('valida también los bancos reales incorporados antes de publicar',()=>{if(realBanks.length)expect(importBanks(realBanks)).toHaveLength(realBanks.length);expect(new Set([...data,...realBanks].map(b=>b.id)).size).toBe(data.length+realBanks.length);});
 it('acepta los bancos demo y el ejemplo con fórmulas e imagen',()=>{expect(importBanks(data)).toHaveLength(4);expect(validateBank(example).questions[0].imageAlt).toBeTruthy();});
 it('rechaza preguntas y opciones duplicadas y claves inexistentes',()=>{const duplicate=structuredClone(example);duplicate.questions.push(duplicate.questions[0]);expect(()=>validateBank(duplicate)).toThrow('duplicada');const wrong=structuredClone(example);wrong.questions[0].correctOptionId='inexistente';expect(()=>validateBank(wrong)).toThrow('no existe');const options=structuredClone(example);options.questions[0].options[1].id=options.questions[0].options[0].id;expect(()=>validateBank(options)).toThrow('duplicadas');});
 it('rechaza imágenes sin descripción, rutas inseguras y campos desconocidos',()=>{const missing=structuredClone(example) as Record<string,any>;delete missing.questions[0].imageAlt;expect(()=>validateBank(missing)).toThrow();const bad=structuredClone(example);bad.questions[0].image='javascript:alert(1)';expect(()=>validateBank(bad)).toThrow();bad.questions[0].image='images/../secret.svg';expect(()=>validateBank(bad)).toThrow('..');expect(()=>validateBank({...example,extra:true})).toThrow();});
 it('acepta cuatro bancos Sociales y uno de Química, Física y Matemáticas',()=>{const subjects=['Ciencias Sociales','Ciencias Sociales','Ciencias Sociales','Ciencias Sociales','Química','Física','Matemáticas'];expect(importBanks(subjects.map((subject,i)=>({...example,id:`banco-${i}`,subject})))).toHaveLength(7);});
 it('rechaza archivos vacíos, bancos duplicados y estructura inválida',()=>{expect(()=>importBanks([])).toThrow();expect(()=>importBanks([example,example])).toThrow('duplicados');expect(()=>importBanks({})).toThrow();});
});
describe('Notación y recuperación segura',()=>{
 it('renderiza exponentes, fracciones y ecuaciones químicas',()=>{const html=renderToStaticMarkup(<RichText text={'Texto \\(x^2+\\frac{1}{2}\\) y \\(\\ce{H2O}\\)'}/>);expect(html).toContain('katex');expect(html).toContain('<math');expect(html).not.toContain('katex-error');});
 it('escapa HTML y no confía en comandos LaTeX de entrada',()=>{const html=renderToStaticMarkup(<RichText text={'<img src=x onerror=alert(1)> \\(\\href{javascript:alert(1)}{x}\\)'}/>);expect(html).not.toContain('<img');expect(html).not.toContain('href="javascript:');expect(html).toContain('&lt;img');});
 it('ignora estructuras corruptas sin lanzar excepciones',()=>{for(const input of [null,[],{}, {questions:[null]}, {...createAttempt(data[0] as Bank,2,'exam',true),answers:{unknown:'wrong'}}])expect(validAttempt(input)).toBe(false);});
});
