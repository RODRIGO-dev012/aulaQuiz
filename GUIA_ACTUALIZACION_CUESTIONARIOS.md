# Actualizar cuestionarios — V1.7

La autorización actual cubre exactamente los 475 ejercicios de publicacion/APROBACIONES_BANCOS.json y publicacion/AUTORIZACION_V1_7.md: 345 literales y 130 adaptaciones con claves propuestas, no oficiales ni certificadas. La reutilización/publicación y la certificación docente son registros diferentes. No inventar nombres, firmas ni aprobaciones académicas.

Trabajar sobre el clon saneado publicacion/despliegue-v1.3 y ejecutar git pull --ff-only antes de modificarlo. Conservar respaldo de la versión publicada y mantener privados los 475 originales, las 79 apartadas y las revisiones posteriores. No copiar toda la carpeta privada al clon.

Los siete bancos mantienen su ID. Una pregunta idéntica conserva su ID y aprendizaje. Si cambia el contenido o la clave, crear una versión derivada con ID propio, registrar procedencia y mostrar el aviso de adaptación; no recalificar los intentos históricos. Las 130 versiones originales sustituidas permanecen bloqueadas como registros publicables independientes. No retirar las comprobaciones por ID completo que distinguen un original de su adaptación.

Antes de incorporar una nueva versión: validar el esquema, cuatro alternativas, clave por ID, fuentes y cobertura; revisar duplicados exactos y equivalencias temáticas. Una aceptación de Google Forms no certifica corrección académica ni revela todas sus claves. Nuevas incorporaciones o modificaciones requieren autorización de su contenido, IDs y hashes; no basta cambiar un hash del manifiesto.

Ejecutar npm test, npm run typecheck, npm run build, npm run test:e2e, npm run test:e2e:real y npm run verify:production. Conservar las pruebas históricas con fixtures y añadir las del contenido nuevo. Verificar las cinco resoluciones y dos intentos de nuevas sin repetición, agotamiento, perfiles, historial y progreso anterior.

Si todos los controles aprueban, hacer commit y push normal a main. Actions valida y despliega con las variables autorizadas descritas en README. No usar force push ni desactivar pruebas. Revisar validate/deploy y la URL pública real; comprobar el catálogo completo después del despliegue.

Nunca publicar archivos de revisión, importaciones, ZIP, respaldos, credenciales, ENLACES_RESULTADOS.json, ESTADO_SESION.md ni resultados/capturas de formularios personales. La preparación pública usa una lista explícita de archivos y el historial público saneado; mantener publicacion/PROGRESO_PUBLICO.md al actualizar la documentación desde el proyecto privado.
