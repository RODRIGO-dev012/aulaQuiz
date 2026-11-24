# AulaQuiz V1.7 — Integración local de Biología Sexto

Fecha: 24/11/2026. Rama: `feature/biologia-sexto`. Repositorio exclusivo: `D:\AulaQuiz\publicacion\despliegue-v1.3`, remoto `https://github.com/RODRIGO-dev012/aulaQuiz`.

## Resultado y alcance

Se incorporaron al ensayo local **176 preguntas, 88 por formulario**, conservando los 660 ejercicios anteriores: **836 preguntas reales en 11 bancos y seis materias**. Las cuatro demostraciones / 25 preguntas siguen separadas (catálogo completo de ensayo: 15 bancos / 861 preguntas). El sitio publicado sigue con 660 preguntas en nueve bancos.

La compilación local explícita `npm run build:biologia-local` genera `artifacts/biologia-dist`, separada del artefacto `dist` utilizado por Pages. El modo normal de producción excluye Biología y comprueba que sus IDs no se filtren al JavaScript. Ningún cambio de autorización se inventó: el manifiesto de los bancos publicados permanece intacto. No se realizó push, fusión con `main` ni despliegue.

El estado técnico y las pruebas constan en [RESULTADO_PRUEBAS_BIOLOGIA.md](RESULTADO_PRUEBAS_BIOLOGIA.md). La publicación de las 176 preguntas **requiere resolver observaciones académicas además de autorización expresa**; consultar [PLAN_PUBLICACION_BIOLOGIA.md](PLAN_PUBLICACION_BIOLOGIA.md).

Cierre técnico: 206 unitarias y 230 recorridos headless aprobados; typecheck, compilación normal, compilación local y validaciones de ambos artefactos aprobados. Dos timeouts unitarios intermedios están documentados y aprobaron en la repetición completa sin navegadores concurrentes, manteniendo el límite. La integración y estos informes se conservan en un commit exclusivamente local de `feature/biologia-sexto`; `main` y `origin/main` permanecen en el commit base. No se presenta el resultado como listo académicamente para publicar las 176 preguntas.

## Inspección y referencia anterior

Git estaba limpio en `main`, commit `820fb12e4517a3b38b85d1c578be258d7e420376`. Fetch de `origin/main`: cero commits de divergencia en ambos sentidos. Se leyó el informe anterior de Lengua y se creó la rama independiente solicitada.

La URL pública devolvió HTTP 200 y se comprobaron sus 660 IDs, las 15 exclusiones de Lengua y los recursos JS/CSS idénticos a la compilación anterior. El código servido corresponde a `7d227db2257559b4a67b8c9fdefed275df0de10c`, desplegado en la ejecución de Actions 45302082709. La presente tarea no lanzó un despliegue nuevo.

Antes de modificar contenido se guardó `artifacts/biologia-sexto/baseline.json`. La referencia duradera es `publicacion/INTEGRACION_BIOLOGIA_SEXTO.json`: commit de base, hashes SHA-256 de ocho archivos protegidos y de los nueve bancos serializados. Conserva hashes de bytes originales y hashes con finales de línea LF para comprobar también un checkout Linux sin confundir CRLF con cambios de contenido. La comparación local de bytes preserva datos, demostraciones, manifiesto, motor y almacenamiento.

| Archivo de entrada | SHA-256 |
| --- | --- |
| BANCO_176_BIOLOGIA_SEXTO.json | c1ce813e33d6d7cc4ea31db31d171ab20a5c5e14a04491b44730038b599f1f20 |
| RELACION_24_PREGUNTAS_EXCLUIDAS_BIOLOGIA.txt | c2afb6b80f09af5fda71902e53bdfb95967dc3018a3c5a801ccfe86054c3226f |

Los materiales permanecen en `D:\AulaQuiz\materiales-importacion\biologia-sexto`; no se movieron ni se copiaron sus respaldos al repositorio. No se usó el respaldo de 200 para añadir preguntas.

## Conversión y validación del banco

`scripts/integrate-biologia-sexto.mjs` valida el JSON recibido, su lista de exclusiones y su esquema; transforma las opciones A–D en IDs estables ligados al ID de pregunta. La clave correcta conserva la asociación exacta con el texto de `respuesta_propuesta`. No se cambian enunciados, opciones ni claves. Se mantienen los huecos en los IDs originales y la interfaz presenta una secuencia consecutiva 1–88.

Los bancos son `biologia-sexto-f1` y `biologia-sexto-f2`, materia `Biología`. Se reutilizan catálogo, icono, tarjetas, configuración, corrección, resultados, persistencia y navegación. No se modifica el diseño ni el motor de puntuación. La mezcla de alternativas y preguntas se aplica por intento; la clave se conserva por ID, no por posición visual.

Resultado estructural: 176 claves asociadas a opciones existentes, cuatro alternativas completas y distintas por pregunta, IDs globales únicos, cero duplicados exactos normalizados entre las 836 preguntas y ausencia de los 24 IDs excluidos. Se comprobaron tildes, caracteres especiales y ausencia de caracteres de sustitución. La distribución de claves y la similitud temática se detallan en el registro y en [la revisión académica](publicacion/REVISION_BIOLOGIA_SEXTO.md).

## Exclusiones propuestas, pendientes de aprobación docente

| Concepto | IDs excluidos | Motivo recibido |
| --- | --- | --- |
| Daltonismo | BIO-F1-006, BIO-F2-002 | Evitar generalizar toda alteración de visión cromática como ligada al X. |
| ADN recombinante | BIO-F1-011, BIO-F2-074 | Confusión entre molécula y tecnología. |
| Tercera ley de Mendel | BIO-F1-016, BIO-F2-086 | No expresa la condición de genes independientes. |
| Enfermedades no transmisibles | BIO-F1-027, BIO-F2-019 | Negación incorrecta de contribuciones infecciosas. |
| Amniocentesis | BIO-F1-033, BIO-F2-071 | Momento clínico formulado imprecisamente. |
| Recombinación genética sexual | BIO-F1-042, BIO-F2-081 | Confusión entre meiosis y fecundación. |
| Cáncer | BIO-F1-047, BIO-F2-036 | Inclusión incorrecta de tumores benignos. |
| Hemofilia | BIO-F1-055, BIO-F2-082 | Generalización de herencia y manifestaciones. |
| Transgénico | BIO-F1-065, BIO-F2-099 | Dos alternativas compiten: transgénico también es OGM. |
| Chikungunya | BIO-F1-070, BIO-F2-011 | Afirmación desactualizada sobre ausencia de vacuna. |
| Segunda ley de Mendel | BIO-F1-076, BIO-F2-035 | Segregación no limitada a F2. |
| Genotipo | BIO-F1-077, BIO-F2-008 | Confusión con genoma. |

## Observaciones pendientes

Se detiene la publicación de BIO-F1-040 por ambigüedad entre eras geológicas y de BIO-F1-031 / BIO-F2-070 hasta revisar el alcance de primeros auxilios. Se conservan en el ensayo local, sin cambiar los totales ni excluir más preguntas unilateralmente. No hay autorización para publicar ninguno de los dos bancos nuevos.

El contraste científico no constituye certificación docente. Falta el PDF escolar mencionado en la metadata; no se acredita cotejo textual por páginas. Hay 934 pares candidatos mecánicos de similitud, muchos por plantillas; no son duplicados confirmados. Se conservan los 88 conceptos comunes a los dos formularios. Algunos distractores mantienen formulaciones imprecisas ya advertidas por quien preparó el material; no se añaden como explicaciones correctas.

## Archivos de esta integración

- Datos y trazabilidad: `src/data/biologia-sexto-banks.json`, `publicacion/INTEGRACION_BIOLOGIA_SEXTO.json`, `publicacion/REVISION_BIOLOGIA_SEXTO.md`.
- Integración y protección: `src/catalog.ts`, `vite.config.ts`, `package.json`, `scripts/integrate-biologia-sexto.mjs`, `scripts/verify-biologia-sexto.mjs`, `scripts/verify-production-content.mjs`.
- Ejecución y pruebas: `scripts/run-real-bank-tests.mjs`, `scripts/serve-dist.mjs`, `playwright.biologia.config.ts`, `src/biologia-sexto.test.ts`, `tests-biologia/biologia-sexto.spec.ts`.
- Regresión: `src/lengua-sexto.test.ts` conserva las comprobaciones históricas sobre los nueve bancos publicados; `tests-real/lengua-sexto.spec.ts` y `tests-real/real-banks.spec.ts` admiten el catálogo de once únicamente en el modo local explícito, manteniendo nueve en producción.
- Documentación: este informe, `RESULTADO_PRUEBAS_BIOLOGIA.md`, `PLAN_PUBLICACION_BIOLOGIA.md` y README.

No cambian dependencias, lockfile, workflow de Pages, 660 preguntas anteriores, motor ni formato de progreso. Las evidencias de pruebas y artefactos se guardan en rutas ignoradas. No se modifican V2, investigación ni otras copias del proyecto. La fuente oficial para futuros trabajos sigue siendo el repositorio remoto `main`; esta rama contiene solo la propuesta local pendiente de revisión.
