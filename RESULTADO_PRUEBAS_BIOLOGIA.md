# Resultado de pruebas — Biología Sexto

Fecha: 24/11/2026. Rama `feature/biologia-sexto`; base `820fb12e4517a3b38b85d1c578be258d7e420376`. Pruebas exclusivamente locales, salvo la comprobación inicial de la publicación anterior de 660 preguntas.

Validación local terminada. **206/206 pruebas unitarias y 230/230 recorridos headless aprobados en las ejecuciones de cierre.** Se conservan también los resultados de la ejecución intermedia con dos timeouts, detallada abajo. No hubo pruebas desactivadas ni aumento del límite de tiempo para conseguir la repetición aprobada.

| Verificación final | Resultado |
| --- | --- |
| Unitarias, diez archivos, sin navegadores concurrentes | 206 aprobadas, cero fallos, 60,27 s |
| Regresión histórica de demostraciones, cinco tamaños | 80 aprobadas, cero fallos/omitidos/flaky, 19,4 min |
| Regresión real y Biología en el catálogo de ensayo, cinco tamaños | 150 aprobadas: 115 anteriores y 35 de Biología; cero fallos/omitidos/flaky, 32,0 min |
| Typecheck final | Aprobado |
| Compilación normal y validación posterior | Aprobadas: nueve bancos reales / 660 preguntas, Biología ausente |
| Compilación local optimizada y validación posterior | Aprobadas: once bancos reales / 836 preguntas |
| Mapeo final de las 176 preguntas contra la entrada | Exacto en textos, alternativas, IDs y claves |
| Ocho archivos protegidos y archivos de entrada | Bytes originales intactos; SHA-256 coincidentes |

## Comprobaciones ya completadas

- JSON de entrada: 176 preguntas, 88+88; cuatro opciones completas y clave/texto coherentes; 24 exclusiones ausentes; cero duplicados exactos; caracteres sin corrupción detectada.
- Conservación de las 660 preguntas y nueve bancos anteriores: hashes de archivos y bancos; textos, claves, opciones, IDs, categorías y firmas de progreso. Registro en `publicacion/INTEGRACION_BIOLOGIA_SEXTO.json`.
- Primera ejecución completa de unitarias: **205/205 aprobadas**, 191 anteriores y 14 de Biología. Sin pruebas desactivadas. Evidencia `artifacts/biologia-sexto/unit.json`.
- Cierre con la prueba adicional de rechazo de filtraciones: **206/206 aprobadas**, 191 anteriores y 15 de Biología. Evidencia `artifacts/biologia-sexto/unit-serial.json`; mismo `--maxWorkers=1 --testTimeout=30000` que en el intento intermedio.
- `npm run typecheck`: aprobado.
- `npm run build`: aprobado, conserva nueve bancos / 660 preguntas y excluye todo Biología pendiente del artefacto. JS/CSS principales con los mismos nombres y hashes de la versión publicada anterior.
- `npm run build:biologia-local`: aprobado, once bancos / 836 preguntas; 24 exclusiones de Biología y 15 de Lengua ausentes. Catálogo total incluyendo demostraciones: 861 preguntas.

Ambas compilaciones emiten el aviso conocido de Vite por fragmentos mayores de 500 kB. No es un fallo; no se cambiaron dependencias ni el límite para ocultarlo. El bundle principal local de ensayo es aproximadamente 999,70 kB sin comprimir; el público sigue en 882,49 kB.

## Matriz de navegador

Playwright `headless:true`, sin ventanas visibles ni control de escritorio. Tamaños: 1920×1080, 1366×768, 768×1024, 390×844 y 360×800. La emulación de viewport no sustituye pruebas en todos los dispositivos físicos.

- Suite histórica de demostraciones: `npm run test:e2e -- --workers=2 --reporter=list,json --output=artifacts/biologia-sexto/baseline-results`; evidencia `browser-baseline.json` mediante `PLAYWRIGHT_JSON_OUTPUT_FILE`.
- Suite conjunta de regresión real y Biología: `npm run test:e2e:biologia-local -- --workers=2`; evidencia `artifacts/biologia-sexto/browser.json`.
- Biología recorre ambos formularios completos en práctica y simulacro, comprueba secuencia 1–88, texto/opciones completos, mezcla por IDs, corrección, 100 %, agotamiento de nuevas y recarga. Cubre 1.760 presentaciones de preguntas nuevas en esos recorridos completos.
- Casos adicionales: once bancos/seis materias, perfil sintético con resultados de los nueve bancos anteriores, 0 % con error y omisión, reinicio con respuestas vacías e historial conservado. Las suites existentes cubren además enlaces, importación, refuerzo y perfiles.
- Cada caso nuevo comprueba errores de página, consola y solicitudes HTTP ≥400; los recorridos completos comprueban desbordamiento horizontal.

Las suites finalizaron con `errors: []`, `unexpected: 0`, `skipped: 0` y `flaky: 0`. En los recorridos instrumentados no se detectaron errores de página/consola ni solicitudes 404. Se revisaron visualmente capturas de Biología en 1920×1080 y 390×844: títulos, preguntas, cuatro alternativas y controles completos. Las capturas y cobertura por pregunta se conservan bajo `artifacts/biologia-sexto/{tamaño}/`.

## Incidentes y límites

La segunda ejecución completa incorporó una prueba adicional de rechazo de filtraciones: 206 casos, 204 aprobados y dos fallos por timeout de 30.000 ms en `src/biologia-sexto.test.ts`. Afectaron «la verificación normal conserva nueve bancos y la local declara dos pendientes» (44,1 s) y «rechaza un artefacto normal que filtre Biología pendiente, incluso con el antiguo indicador local» (30,3 s). Coincidieron con dos suites de navegador en paralelo; el informe registra `TestTimeoutError`, no una discrepancia de contenido. Se conserva `artifacts/biologia-sexto/unit-final.json` como evidencia de esa ejecución fallida. En la repetición completa sin navegadores concurrentes aprobaron en 3,34 s y 4,81 s, respectivamente, con el mismo límite de 30.000 ms. La coincidencia con carga concurrente sugiere sensibilidad del entorno; no se oculta el fallo intermedio ni se certifica su causa exclusivamente con esa observación.

La revisión académica es preliminar y hay tres ítems pendientes para publicación; una prueba funcional aprobada no certifica la ciencia ni las claves. No se utilizan perfiles reales de estudiantes ni datos del navegador personal.

No hay push, fusión ni despliegue de esta integración. La web pública conserva la publicación anterior.
