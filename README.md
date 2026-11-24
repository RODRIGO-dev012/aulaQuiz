# AulaQuiz V1.7

Publicación de Lengua completada y verificada: [Actions 45302082709](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/45302082709), `validate` y `deploy` aprobados. Código publicado `7d227db`; 191 pruebas unitarias y 30 recorridos headless sobre la URL pública aprobados. Ver [informe de publicación](INFORME_PUBLICACION_LENGUA_SEXTO.md) para resultados, recuperación y límites.

Versión integrada: **660 preguntas reales / 9 bancos** (475 existentes + Lengua Castellana Sexto F1: 95 y F2: 90). Se conservan aparte las 25 demostraciones. Ver `INFORME_PUBLICACION_LENGUA_SEXTO.md`, `INFORME_INTEGRACION_LENGUA_SEXTO.md` y `publicacion/REVISION_SIMILITUD_LENGUA_SEXTO.md`. Las claves nuevas proceden de revisión preliminar, no de certificación docente.

La publicación de los 185 ejercicios adicionales fue autorizada expresamente el 23/11/2026. El alcance, IDs, hashes y límites están registrados en `publicacion/AUTORIZACION_LENGUA_SEXTO_V1_7.md` y `APROBACIONES_BANCOS.json`. `npm run build` y `npm run verify:production` exigen esa autorización exacta; no certifican académicamente las claves. `build:local` es un alias del mismo control de producción.

La **fuente oficial** es el repositorio Git `RODRIGO-dev012/aulaQuiz`, rama `main`, en el clon `D:\AulaQuiz\publicacion\despliegue-v1.3`. Crear futuras ramas desde `main` actualizado, revisar sus diffs y conservar los nueve bancos y 660 preguntas como base. La carpeta `D:\AulaQuiz` conserva una copia anterior: no copiar su `src`, configuración ni verificadores encima de este clon. Antes de usar archivos de esa carpeta, ejecutar `node scripts/compare-main-source.mjs D:/AulaQuiz`: código 1 significa divergencias que deben reconciliarse. El comprobador solo lee archivos. No sincronizar carpetas completas ni materiales privados.

[Abrir AulaQuiz](https://rodrigo-dev012.github.io/aulaQuiz/) · [Repositorio](https://github.com/RODRIGO-dev012/aulaQuiz)

La versión publicada antes de esta integración contiene siete cuestionarios de práctica con **475 preguntas**: Química Orgánica 100, Física 100, Matemáticas 100 y Ciencias Sociales N.º 1–4: 30, 48, 51 y 46. Las claves son **propuestas, no oficiales ni certificadas**. Hay 345 ejercicios literales y 130 adaptaciones identificadas en pantalla como material de estudio. Las cuatro demostraciones / 25 preguntas se muestran por separado.

V1.7 conserva las 381 preguntas V1.5 con sus IDs, textos, alternativas y claves sin cambios, y añade 94 adaptaciones. Los siete IDs de banco permanecen. Los perfiles, resultados históricos y el aprendizaje de preguntas idénticas se conservan en el navegador; una adaptación tiene ID propio y no hereda dominio del original.

Incluye práctica y simulacro, cronómetro opcional, cantidad personalizada o banco completo, mezcla independiente de preguntas y alternativas, selección de nuevas/refuerzo/progresivo, historial, estadísticas, vistas clásica/interactiva y copia personal JSON. Dos intentos de preguntas nuevas no repiten las ya respondidas; el agotamiento pide una decisión explícita.

Los datos personales se guardan exclusivamente en este navegador/dispositivo; no hay cuentas remotas ni sincronización. Exportar el progreso permite conservar una copia. Compartir abre un enlace, sin enviar mensajes automáticamente. Las claves del sitio estático son inspeccionables: AulaQuiz sirve para estudiar.

## Ejecutar y validar

Node.js 22.12+ y npm. En PowerShell usar npm.cmd si npm.ps1 está restringido.

~~~powershell
npm ci
npm test
npm run typecheck
npm run build
npm run test:e2e
npm run test:e2e:real
npm run verify:production
npm run dev
~~~

Las pruebas históricas conservan fixtures de sus versiones. El catálogo de producción permanece en dist; el ejecutor histórico compila su fixture en artifacts/baseline-dist. Playwright comprueba 1920×1080, 1366×768, 768×1024, 390×844 y 360×800. La suite V1.7 recorre las 475 preguntas y sus cuatro alternativas en cada resolución, además de los recorridos anteriores de modos, perfiles y persistencia.

## Publicar actualizaciones

Trabajar en el clon saneado publicacion/despliegue-v1.3. Antes de cambiarlo, verificar que Git esté limpio y actualizar `main` con `git pull --ff-only`; crear una rama para el cambio y revisar el diff completo. Revisar el alcance exacto autorizado en publicacion/APROBACIONES_BANCOS.json, publicacion/AUTORIZACION_V1_7.md y publicacion/AUTORIZACION_LENGUA_SEXTO_V1_7.md. No basta actualizar un hash: la autorización vincula versión, IDs y contenido propuesto sin inventar certificación docente. Compilar antes de arrancar Playwright y no regenerar `dist` durante las pruebas.

Después de validar, commit y push normal a main ejecutan GitHub Actions. Solo se despliega si validate aprueba y se mantienen las variables AULAQUIZ_PAGES_APPROVED=true y AULAQUIZ_AUTO_DEPLOY=true. Los pull requests validan sin publicar. No usar force push ni desactivar controles para solucionar fallos. Verificar Actions y la URL real después de publicar.

No copiar revisiones, originales privados, ZIP, resultados personales, enlaces de puntuaciones, evidencias de Google Forms ni el registro privado de sesión al repositorio. Base relativa ./ compatible con /aulaQuiz/; los enlaces directos no llevan respuestas ni perfiles.

Ver INFORME_INCORPORACION_V1_7.md y HOJA_RUTA_AULAQUIZ_V2.md. La autorización cubre uso educativo de práctica; no implica claves oficiales ni revisión docente exhaustiva.

Antecedente histórico, anterior a Lengua: [Actions 44753218333](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/44753218333), validate/deploy aprobados para la publicación de 475 ejercicios reales +25 demostraciones separadas (345 literales y 130 adaptados). Aquella validación incluyó 379 casos únicos locales, 346 públicos de CI y 35 recorridos sobre la URL real. Ver informe V1.7 para sus evidencias y límites; el catálogo actual y sus pruebas figuran al inicio de este README.
