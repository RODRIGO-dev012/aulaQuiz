# Actualizar cuestionarios — V1.7

## Fuente oficial e integración autorizada de Lengua y Biología Sexto

La fuente oficial es `RODRIGO-dev012/aulaQuiz`, rama `main`, en este clon. Crear nuevas ramas desde `main` limpio y actualizado y conservar como base once bancos / 832 preguntas reales: 475 anteriores + 185 de Lengua + 172 de Biología. La carpeta principal `D:\AulaQuiz` no se sincroniza: copiarla por encima eliminaría incorporaciones del catálogo. Ejecutar primero `node scripts/compare-main-source.mjs D:/AulaQuiz` y reconciliar las diferencias. No regenerar este clon desde una fuente antigua ni copiar materiales de importación al despliegue.

La publicación de Lengua fue autorizada expresamente el 23/11/2026 y está vinculada a IDs y hashes en `publicacion/AUTORIZACION_LENGUA_SEXTO_V1_7.md` y el manifiesto. Compilar con `npm run build` y verificar con `npm run verify:production`; no existe un modo local que permita saltarse autorizaciones revocadas. Terminar la compilación antes de iniciar Playwright y mantener `dist` estable durante los recorridos. La autorización no certifica las claves preliminares. Consultar el informe de publicación y la relación de similitudes.

La autorización adicional de Biología del 24/11/2026 cubre 86+86 preguntas, con 28 exclusiones, y está condicionada a validaciones satisfactorias y ausencia de nuevos bloqueos. Se vincula a `publicacion/AUTORIZACION_BIOLOGIA_SEXTO_V1_7.md`; se conservan las autorizaciones anteriores por separado. No reintroducir las 28 excluidas ni las 15 observadas de Lengua. La reutilización/publicación y la certificación docente son registros diferentes. No inventar nombres, firmas ni aprobaciones académicas.

Trabajar sobre el clon saneado publicacion/despliegue-v1.3 y ejecutar git pull --ff-only antes de modificarlo. Conservar respaldo de la versión publicada y mantener privados los 475 originales, las 79 apartadas y las revisiones posteriores. No copiar toda la carpeta privada al clon.

Los siete bancos mantienen su ID. Una pregunta idéntica conserva su ID y aprendizaje. Si cambia el contenido o la clave, crear una versión derivada con ID propio, registrar procedencia y mostrar el aviso de adaptación; no recalificar los intentos históricos. Las 130 versiones originales sustituidas permanecen bloqueadas como registros publicables independientes. No retirar las comprobaciones por ID completo que distinguen un original de su adaptación.

Antes de incorporar una nueva versión: validar el esquema, cuatro alternativas, clave por ID, fuentes y cobertura; revisar duplicados exactos y equivalencias temáticas. Una aceptación de Google Forms no certifica corrección académica ni revela todas sus claves. Nuevas incorporaciones o modificaciones requieren autorización de su contenido, IDs y hashes; no basta cambiar un hash del manifiesto.

Ejecutar `npm test -- --maxWorkers=1 --testTimeout=30000`, `npm run typecheck`, `npm run build`, `npm run test:e2e -- --workers=1`, `npm run test:e2e:real -- --workers=1` y `npm run verify:production`, una suite por vez. Conservar las pruebas históricas con fixtures y añadir las del contenido nuevo. Verificar las cinco resoluciones y dos intentos de nuevas sin repetición, agotamiento, perfiles, historial y progreso anterior. No ejecutar suites locales en paralelo mientras V2 realiza sus pruebas.

Si todos los controles aprueban, hacer commit y push normal a main. Actions valida y despliega con las variables autorizadas descritas en README. No usar force push ni desactivar pruebas. Revisar validate/deploy y la URL pública real; comprobar el catálogo completo después del despliegue.

Nunca publicar archivos de revisión, importaciones, ZIP, respaldos, credenciales, ENLACES_RESULTADOS.json, ESTADO_SESION.md ni resultados/capturas de formularios personales. La preparación pública usa una lista explícita de archivos y el historial público saneado; mantener publicacion/PROGRESO_PUBLICO.md al actualizar la documentación desde el proyecto privado.
