# Actualizar cuestionarios — V1.5

No editar IDs ni textos originales silenciosamente. Importar a revisión privada, validar el esquema ESQUEMA_BANCO_PREGUNTAS.json y los recursos, contrastar cada alternativa y documentar las claves propuestas. Mantener las preguntas sin clave válida fuera del catálogo.

La autorización actual es únicamente para 381 candidatos identificados en publicacion/APROBACIONES_BANCOS.json. La aprobación de reutilización/publicación comunicada por el propietario y una certificación académica docente son registros distintos. No inventar nombres, firmas ni fechas de certificación. Nuevas preguntas recuperadas o corregidas requieren autorización específica antes de cambiar el catálogo.

Conservar un respaldo de la fuente publicada, las 475 originales, 79 apartadas y observaciones posteriores. Las correcciones se guardan como versiones derivadas con referencia al ID original; cambian su ámbito de aprendizaje, pero nunca recalifican resultados anteriores. Preguntas idénticas conservan su progreso entre versiones reducidas del mismo banco.

Para publicar trabajar en el clon saneado autorizado, revisar diff y exclusiones, ejecutar npm test, npm run typecheck, npm run build, npm run test:e2e, npm run test:e2e:real y npm run verify:production. Hacer commit/push a main; Actions valida y despliega automáticamente si todos los controles pasan. Confirmar la URL real y los enlaces. Ver README.md para requisitos y variables. No subir revisiones, importaciones, respaldos, archivos ZIP ni credenciales.

En V1.5 hay 94 originales pendientes y 36 versiones originales sustituidas bloqueadas. Las 36 adaptaciones autorizadas tienen IDs derivados y aviso visible. La comparación de identificadores excluidos debe reconocer el ID completo de pregunta para distinguir el original de su adaptación. No retirar las pruebas que impiden filtraciones ni convertir una clave propuesta en certificación.

Al ampliar un banco, mantener su ID; las preguntas idénticas conservan aprendizaje. Si cambia el contenido, crear una versión derivada y registrar procedencia. Comprobar dos intentos de 50 preguntas nuevas cuando haya 100 elegibles. La nueva versión necesita manifiesto de IDs/hashes y autorización verificable por el control de producción; no basta cambiar el número de preguntas o un hash.
