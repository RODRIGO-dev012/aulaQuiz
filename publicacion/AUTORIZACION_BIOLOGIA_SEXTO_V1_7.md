# Autorización condicionada de publicación — Biología Sexto V1.7

El 24/11/2026, el propietario autorizó en esta sesión excluir preventivamente BIO-F1-040, BIO-F1-031, BIO-F2-070 y BIO-F2-012, sin reemplazarlas ni modificar las claves restantes. También autorizó commit, integración segura en main, push normal y despliegue por el mecanismo existente de GitHub Pages **únicamente si todas las validaciones locales son satisfactorias y no quedan nuevas observaciones bloqueantes**.

Alcance exacto: `172-biologia-sexto-v1.7`, dos bancos de práctica con claves preliminares, no oficiales ni certificadas académicamente:

| Banco | Preguntas | SHA-256 de JSON serializado |
| --- | ---: | --- |
| biologia-sexto-f1 | 86 | 8d40e5ebf71d776184e15b7e30f53443b99ff38701d913b254af2ce571580e10 |
| biologia-sexto-f2 | 86 | 22af941be5d0c53c8f4d3a4057c44bab6649049ac588a51d77a1657b2839e11f |

Los IDs y hashes exactos quedan vinculados al manifiesto `APROBACIONES_BANCOS.json`. Se mantienen las 24 exclusiones originales y se añaden las cuatro indicadas: 28 exclusiones de Biología, 172 disponibles, 660 preguntas anteriores intactas y 832 preguntas reales en 11 bancos / seis materias. Las 25 demostraciones continúan separadas. Las 15 exclusiones de Lengua permanecen vigentes.

Las exclusiones adicionales resuelven los tres bloqueos identificados en el ensayo de referencia `6240bb9`; BIO-F2-012 se retira por consistencia del par conceptual de Paleozoico y por instrucción expresa del propietario. Los registros completos permanecen fuera del banco estudiantil, en los materiales originales sin modificar y en el archivo privado ignorado `revisiones/biologia-sexto/EXCLUSIONES_ADICIONALES.json`; los motivos y hashes de esos registros figuran en `INTEGRACION_BIOLOGIA_SEXTO.json`.

La autorización para práctica no acredita certificación docente ni cotejo exhaustivo con el PDF escolar no entregado. No se inventan firmas o nombres de docentes. Las precisiones académicas no bloqueantes documentadas se conservan como limitaciones; cualquier nueva observación bloqueante detendrá la publicación.

Se exige Playwright headless secuencial con un worker y ejecutar las suites locales una por una, para reducir carga mientras V2 realiza pruebas. No se autoriza modificar V2, investigación ni PostgreSQL ajeno, contratar servicios, forzar push o sobrescribir cambios remotos.

Punto de recuperación anterior a la publicación: `820fb12e4517a3b38b85d1c578be258d7e420376`, commit de main con la publicación anterior de 660 preguntas. El ensayo local `6240bb95fc395c01d98bf3b09ea0ba64488c9880` también se conserva como referencia de integración. La fuente oficial sigue siendo `RODRIGO-dev012/aulaQuiz`, rama main; no sincronizar otras copias automáticamente.
