import { Atom, BookOpen, Calculator, FlaskConical, Globe2, Leaf } from 'lucide-react';
export function subjectIcon(subject:string){return ({'Ciencias Sociales':Globe2,'Matemáticas':Calculator,'Química':FlaskConical,'Física':Atom,'Biología':Leaf,'Lenguaje':BookOpen} as Record<string,typeof BookOpen>)[subject]??BookOpen;}
