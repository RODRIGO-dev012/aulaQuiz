# AulaQuiz V1.7 — Integración local de Lengua Castellana

Este informe conserva la fotografía de la validación local anterior a la autorización de publicación. El propietario autorizó publicar posteriormente el 23/11/2026; consultar `INFORME_PUBLICACION_LENGUA_SEXTO.md` y `publicacion/AUTORIZACION_LENGUA_SEXTO_V1_7.md` para el estado posterior. `INTEGRACION_LENGUA_SEXTO.json` conserva su marca histórica de no publicación; la autorización vigente está en `APROBACIONES_BANCOS.json` y su evidencia adicional.

Fecha: 23 de noviembre de 2026 (America/La_Paz). Integración en `D:\AulaQuiz\publicacion\despliegue-v1.3`, rama `feature/lengua-sexto`. Publicación pendiente de autorización expresa.

## Repositorio y estado inicial

- Remoto verificado: `https://github.com/RODRIGO-dev012/aulaQuiz.git`.
- Clon inicialmente limpio en `main`, commit `c8f23b02f1ac042d6a6e5a416eeefe33421338d1` (`Documenta V1.7 publicada y verificaciones finales [skip ci]`).
- `git ls-remote` confirmó que `refs/heads/main` en GitHub coincidía exactamente con ese commit antes de modificar archivos. La primera consulta sin acceso de red falló; la consulta con acceso habilitado terminó correctamente.
- Se creó `feature/lengua-sexto` antes de editar archivos. No se inicializó otro repositorio ni se trabajó sobre `main`.
- `package.json` identifica V1.7.0. El catálogo inicial tenía siete bancos reales y 475 preguntas; cuatro bancos de demostración con 25 preguntas se mantienen separados.
- `D:\AulaQuiz` no es un repositorio Git. El usuario autorizó expresamente continuar en este clon.

## Resultado funcional

| Banco real | Preguntas |
| --- | ---: |
| Química Orgánica | 100 |
| Física | 100 |
| Matemáticas | 100 |
| Ciencias Sociales N.º 1 | 30 |
| Ciencias Sociales N.º 2 | 48 |
| Ciencias Sociales N.º 3 | 51 |
| Ciencias Sociales N.º 4 | 46 |
| Lengua Castellana — Sexto de Secundaria — Formulario 1 | 95 |
| Lengua Castellana — Sexto de Secundaria — Formulario 2 | 90 |
| **Total: nueve bancos reales** | **660** |

El catálogo completo incluye también las cuatro demostraciones: 13 bancos / 685 preguntas, de las cuales solo 660 son ejercicios reales. Los nuevos formularios usan la categoría existente `Lenguaje` del esquema, con los títulos completos solicitados. Aparecen en el catálogo y admiten configuración, práctica, simulacro, mezcla, navegación, reanudación, resultados, historial y políticas de aprendizaje existentes. La numeración visual es consecutiva 1–95 y 1–90, aunque los IDs originales conservan los saltos de las exclusiones.

## Entradas y validación

Se leyeron directamente los dos archivos de `D:\AulaQuiz\materiales-importacion\lengua-sexto`; no se movieron ni se copiaron al clon.

- JSON: SHA-256 `d97f85de5dc7188fa8d17e0cc70ae56362f6e3d71f4ad4b82369c88d5c0dafe7`.
- Relación de excluidas: SHA-256 `878b6ffb7a3fb2429845a08744293dcd43b58b0f8341672e58f5cb85d4482a6d`.
- Se verificaron los totales declarados, 95 / 90, y las 185 entradas efectivas.
- Los 185 IDs son únicos y no colisionan con los anteriores. También son únicos los IDs de opciones del catálogo.
- Todas tienen enunciado completo, cuatro alternativas no vacías y diferentes, y una clave válida.
- En los 185 casos, `opciones[clave_propuesta]` coincide exactamente con `respuesta_propuesta`.
- El cotejo directo posterior confirmó enunciados, alternativas y claves sin cambios respecto del JSON de entrada. No se inventaron explicaciones, preguntas, respuestas ni correcciones.
- Las preguntas convertidas validan contra el esquema de bancos existente, sin cambiar ese esquema.

Excluidas, ausentes por ID y por enunciado exacto normalizado en los nuevos bancos: `F1-023`, `F1-045`, `F1-063`, `F1-073`, `F1-083`, `F2-005`, `F2-028`, `F2-031`, `F2-034`, `F2-064`, `F2-069`, `F2-071`, `F2-076`, `F2-077`, `F2-098`. La validación del artefacto local también busca los 15 IDs excluidos en los archivos compilados.

### Duplicados y límites académicos

No hay IDs duplicados ni enunciados exactamente duplicados tras normalizar acentos, mayúsculas y puntuación entre las 660 preguntas. El análisis automático encontró 75 pares candidatos a similitud, incluyendo falsos positivos por estructura gramatical compartida. La lista completa y la metodología figuran en `publicacion/INTEGRACION_LENGUA_SEXTO.json`.

La revisión de los 185 enunciados y respuestas propuestas también detectó reiteraciones de conceptos, incluidas algunas internas. Se conservan para respetar las 185 preguntas solicitadas. Ver la tabla con IDs y los límites de interpretación en [revisión de similitud](publicacion/REVISION_SIMILITUD_LENGUA_SEXTO.md).

La revisión técnica no certifica las claves académicamente. Hay preguntas explícitamente dependientes del PDF escolar, que no forma parte de estas entradas; los metadatos de fuente no indican páginas. F2-074, por ejemplo, se refiere al cuadro del material y no debe leerse como clasificación universal de entrevistas. No se detectaron incoherencias funcionales entre clave y respuesta suministradas. Los avisos existentes indican claves propuestas, no oficiales ni certificadas; cada banco nuevo especifica revisión preliminar.

## Conservación de las 475 preguntas y del progreso

`src/data/real-banks.json` no se modificó. Se comparó byte por byte con `git show c8f23b0:src/data/real-banks.json`: idéntico. Su SHA-256 sobre JSON serializado es `61980068588a10bc6ed136e72c04cb19f792b98c3b0a5bab78af0cdadb85928b`. Se conserva toda la estructura, incluyendo IDs, categorías, alternativas y claves.

Los bancos nuevos residen en `src/data/lengua-sexto-banks.json` y se añaden desde `src/catalog.ts`. No se modificaron `engine.ts`, `learning.ts`, `useLearning.ts` ni `progress-io.ts`. Tampoco cambiaron los archivos de demostraciones, procedencia o versiones anteriores.

La puntuación existente compara `answers[question.id]` con `correctOptionId` y calcula el porcentaje redondeado sobre las preguntas del intento. Las claves siguen asociadas a IDs de opciones al mezclarlas. El almacenamiento conserva perfiles e intentos en `aulaquiz-learning-v2`, además de las claves de compatibilidad `aulaquiz-active` y `aulaquiz-history`; no se cambió su formato ni sus nombres. La firma `bankVersion` de los siete bancos originales permanece igual. Se verifican carga sin sobrescribir bytes, dominio previo, resultados antiguos y exportación/importación de progreso.

## Compilación y protección de publicación

`npm run build:local` ejecuta TypeScript, validación de fuentes, compilación optimizada de producción de Vite y validación del artefacto. El artefacto `dist` contiene las 660 preguntas reales y 25 demostraciones y está destinado exclusivamente a pruebas locales.

`npm run build` fue ejecutado y termina con código 1 por el bloqueo esperado: Lengua Sexto está pendiente de autorización expresa para publicar. No se presenta ese comando como aprobado. `npm run verify:production` comparte ese bloqueo; no se ha alterado el manifiesto de las 475 preguntas autorizadas ni se ha inventado permiso docente. `--local-integration` habilita solo la validación local explícita y exige cantidades, esquema, hashes, exclusiones y conservación del catálogo anterior. El workflow de publicación permanece sin cambios y usa el control normal, que bloquea estos bancos pendientes.

Vite informa un aviso por fragmentos JavaScript mayores de 500 kB. No impide la compilación; no se actualizaron dependencias ni se amplió el alcance para optimizar el empaquetado.

## Pruebas ejecutadas

Resultado final: **187 tests unitarios y 195 recorridos únicos de navegador aprobados**, 382 casos únicos en conjunto, sin omisiones. La suite real necesitó una repetición individual, descrita a continuación. Resumen verificable: `artifacts/lengua-sexto/final-validation.json`.

- Primera suite existente antes de añadir pruebas: 176/176 aprobadas.
- Primera suite ampliada: 187/187 aprobadas.
- Ejecuciones posteriores bajo carga simultánea presentaron timeouts de 5 s en pruebas que lanzan procesos Node; no se eliminaron comprobaciones. La ejecución final aprobó 187/187 con `npm test -- --maxWorkers=1 --testTimeout=30000 --reporter=default --reporter=json --outputFile=artifacts/lengua-sexto/unit-results-final.json`.
- Regresión histórica: `npm run test:e2e`, 80/80 aprobadas, cinco resoluciones.
- Suite real completa: `npm run test:e2e:real`, 114/115 aprobados en la primera ejecución completa; código de salida 1 por el 404 transitorio descrito abajo. Los 25 casos nuevos de Lengua aprobaron en esa ejecución.
- Repetición del único caso afectado: `npm run test:e2e:real -- v1-7.spec.ts --project=1920x1080 --grep=gf-a49cefa8ffe1 --output=artifacts/lengua-sexto/retry-results --reporter=list,json`, 1/1 aprobado, código 0. Se configuró `PLAYWRIGHT_JSON_OUTPUT_FILE=artifacts/lengua-sexto/browser-retry.json`. Resultado consolidado: los 115 escenarios reales tienen una ejecución aprobada; no se afirma que la primera suite completa terminó con código 0.
- `npm run typecheck`: aprobado; también se ejecutó TypeScript en la compilación local.
- `npm run build:local`: aprobado; validador final: 9 bancos reales, 660 preguntas reales, 15 exclusiones locales y 2 bancos pendientes de publicación; 65 archivos en `dist`.

Todos los navegadores se ejecutan con Playwright en modo headless, sin ventanas visibles ni control de la pantalla del usuario. Resoluciones: 1920×1080, 1366×768, 768×1024, 390×844 y 360×800. Son emulaciones de viewport, no pruebas sobre teléfonos físicos ni otros motores de navegador.

Las pruebas nuevas completan los dos formularios en práctica y simulacro, verifican cada enunciado y alternativa contra el orden presentado después de mezclar, numeración, ausencia de desbordamiento horizontal, respuestas por ID, confirmación en práctica, recarga/reanudación, 100 % al acertar todas y agotamiento de nuevas. Otra prueba por resolución verifica el catálogo de nueve bancos, un perfil V1.7 preexistente y el cálculo de 0 % con una incorrecta y una omitida. Se registran errores JS, consola y respuestas HTTP de error. La suite anterior recorre también las 475 preguntas y sus opciones.

Se comprobaron además los JSON de cobertura: 20 recorridos completos de Lengua (dos formularios × dos modos × cinco resoluciones), 1.850 presentaciones de preguntas nuevas, y 2.375 presentaciones de preguntas originales (475 × cinco resoluciones). Todos sus indicadores de contenido, respuesta y ausencia de desbordamiento son correctos. Se inspeccionaron visualmente capturas de escritorio 1920×1080 y móvil 390×844: títulos y alternativas legibles y navegación vertical completa.

Incidencia corregida en el test nuevo: la primera ejecución omitía pulsar «Continuar» después de recargar y agotó el tiempo esperando «Finalizar intento» desde Inicio. El intento y sus respuestas estaban conservados. Se corrigió el recorrido de prueba, sin cambiar el comportamiento de reanudación de AulaQuiz. Esa ejecución fue interrumpida y no se cuenta como aprobada.

Incidencia de coordinación del entorno: una recompilación local regeneró `dist` mientras la suite real lo estaba sirviendo. El caso V1.7 de `gf-a49cefa8ffe1` en 1920×1080 ya había completado sus 46 preguntas y obtenido 100 %, pero la navegación posterior recibió «Not found» y agotó el tiempo esperando el formulario de configuración. Después de terminar la compilación, ese mismo caso completo se repitió sin cambios en la aplicación y aprobó en 13,6 s, sin errores JS/consola/HTTP. Las otras cuatro resoluciones del mismo banco también aprobaron. En futuras validaciones, compilar antes de iniciar el servidor de pruebas y mantener `dist` estable durante la ejecución.

Evidencias locales ignoradas por Git: `artifacts/playwright-results.json`, `artifacts/playwright-report`, `artifacts/v1.7/playwright-real.json`, `artifacts/v1.7/playwright-real-report`, `artifacts/lengua-sexto` (capturas, cobertura por pregunta, comparación de fuentes e informe unitario). `browser-full-initial.json` conserva los 114 aprobados y el fallo transitorio; `browser-retry.json` conserva la repetición aprobada. El reporte HTML de la suite completa mantiene visible la incidencia original. `final-validation.json` comprueba la correspondencia exacta entre el caso fallido y el repetido, los 195 recorridos únicos aprobados, los 187 tests unitarios y los registros de cobertura.

## Diferencias con la carpeta principal

Antes de integrar, todos los archivos compartidos en `src`, `scripts`, `tests` y `tests-real` eran idénticos. La carpeta principal tenía además herramientas y material privado que el clon saneado omite, y comandos adicionales en `package.json`. Después de integrar, la carpeta principal sigue en el estado anterior y carece de Lengua Sexto.

Se añadió `scripts/compare-main-source.mjs`: compara en lectura los archivos críticos del catálogo/configuración con `D:\AulaQuiz`, muestra hashes y devuelve código 1 si hay diferencias. Se ejecutó y detectó las divergencias esperadas. El inventario ampliado está en `artifacts/lengua-sexto/source-comparison.json`. README y la guía advierten que este clon es la fuente vigente de la integración y que no debe sobrescribirse desde la carpeta principal ni regenerarse desde ella sin reconciliar los cambios. No se sincronizó la carpeta principal automáticamente.

## Archivos modificados o nuevos

- `.gitignore`: excluye materiales de importación.
- `README.md`: estado local, compilación y fuente vigente.
- `GUIA_ACTUALIZACION_CUESTIONARIOS.md`: procedimiento de actualización y bloqueo de publicación.
- `package.json`: comando `build:local`, sin cambios de dependencias.
- `src/catalog.ts`: agrega los dos bancos.
- `src/data/lengua-sexto-banks.json`: 185 preguntas convertidas.
- `src/lengua-sexto.test.ts`: 11 pruebas adicionales.
- `scripts/integrate-lengua-sexto.mjs`: validación y conversión reproducibles desde la carpeta de entrada indicada.
- `scripts/compare-main-source.mjs`: detección de divergencias.
- `scripts/verify-production-content.mjs`: validación local explícita y bloqueo normal de publicación.
- `vite.config.ts`: fixture histórico vacío también para los nuevos bancos, conservando la regresión de demostraciones.
- `tests-real/lengua-sexto.spec.ts`: 25 recorridos nuevos (cinco escenarios × cinco resoluciones).
- `tests-real/real-banks.spec.ts`: dos expectativas de catálogo actualizadas de siete a nueve bancos; los recorridos anteriores permanecen.
- `publicacion/INTEGRACION_LENGUA_SEXTO.json`: hashes, exclusiones y candidatos automáticos a similitud; `publicationAuthorized: false`.
- `publicacion/REVISION_SIMILITUD_LENGUA_SEXTO.md`: observaciones editoriales y límites académicos.
- `INFORME_INTEGRACION_LENGUA_SEXTO.md`: este informe.

No se modificaron el lockfile, las dependencias, el workflow, los siete bancos originales, el almacenamiento ni archivos de AulaQuiz V2 o de investigación. No se añadieron archivos temporales, ZIP, respaldos ni originales de importación al conjunto de cambios. `dist`, cachés y evidencias permanecen ignorados.

## Entrega y siguiente decisión

El trabajo permanece local y sin commit, en `feature/lengua-sexto`. No se ha hecho push, merge ni publicación. La integración y validación local están completas y listas para revisión del usuario. La publicación sigue bloqueada, pendiente de autorización expresa. Antes de publicar deberán revisarse las observaciones académicas y registrarse la autorización específica de los 185 ejercicios; las autorizaciones previas cubren únicamente las 475 preguntas anteriores. No hay fallos funcionales pendientes identificados en los escenarios ejecutados; esto no equivale a certificación académica de las claves.
