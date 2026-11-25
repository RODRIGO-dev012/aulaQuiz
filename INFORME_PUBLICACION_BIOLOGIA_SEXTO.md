# AulaQuiz V1.7 — Publicación de Biología Sexto

Preparación: 24/11/2026, America/La_Paz. El propietario autorizó las cuatro exclusiones adicionales y la publicación condicionada a validaciones satisfactorias y ausencia de nuevos bloqueos.

**Cierre completado el 25/11/2026 a las 09:37 America/La_Paz** (13:37 UTC): publicación y validación pública satisfactorias. No quedan observaciones funcionales bloqueantes. Este cierre documental no modifica el código servido.

## Contenido y recuperación

Resultado definitivo: 660 preguntas anteriores intactas + Biología F1 86 + Biología F2 86 = **832 preguntas reales, 11 bancos y seis materias**. Las cuatro demostraciones / 25 preguntas permanecen separadas. Biología tiene 28 exclusiones; Lengua conserva sus 15. Los textos, alternativas, IDs, categorías y claves de las 660 anteriores se mantienen.

Repositorio: `RODRIGO-dev012/aulaQuiz`, clon `D:\AulaQuiz\publicacion\despliegue-v1.3`. Rama de integración: `feature/biologia-sexto`, ensayo de referencia `6240bb95fc395c01d98bf3b09ea0ba64488c9880`. Git estaba limpio y el fetch inicial confirmó main local y remoto en `820fb12e4517a3b38b85d1c578be258d7e420376`.

Punto de recuperación anterior a publicar: **`820fb12e4517a3b38b85d1c578be258d7e420376`**. Se conservó en la rama local `recovery/pre-biologia-sexto-20261124` antes de integrar. No se ejecutó restauración ni push forzado.

La autorización exacta, IDs y hashes figuran en `publicacion/AUTORIZACION_BIOLOGIA_SEXTO_V1_7.md` y `APROBACIONES_BANCOS.json`; las aprobaciones anteriores no se sustituyen. Los registros de las cuatro exclusiones quedan fuera del banco estudiantil y del artefacto, con motivos y hashes trazables. Las claves se mantienen preliminares y no certificadas.

## Verificaciones locales

Validación local completada: **211/211 unitarias, 80/80 regresiones históricas y 150/150 del catálogo real aprobadas**. Typecheck y compilación normal aprobados con 832 preguntas / 11 bancos. Las suites de navegador se ejecutaron secuencialmente, con un worker y sin ventanas visibles; cero fallos, omitidos o flaky en esta versión. Los 35 casos específicos de Biología cubrieron 1.720 presentaciones en los recorridos completos y comprobaron 100 %/0 %, reanudación, reinicio, menú y conservación del progreso de los nueve bancos anteriores.

La comprobación final confirmó las 172 conversiones exactas contra la entrada, cuatro registros completos excluidos conservados, los hashes de los archivos de las 660 anteriores y del motor intactos y las 43 exclusiones ausentes del artefacto. No se han identificado nuevos bloqueos. Evidencias: `artifacts/biologia-publicacion/unit.json`, `browser-baseline.json`, `browser-real.json` y `local-validation.json`. Se revisó visualmente una captura móvil de la versión de 86 preguntas por formulario.

No se incluyen materiales de importación, registros privados, credenciales, respaldos ni evidencias de navegador entre los archivos de publicación. No cambian dependencias, lockfile ni motor de progreso. El workflow existente conserva sus controles y mecanismo de Pages; sus comandos de pruebas explicitan un worker y el límite unitario de 30 s de la validación local.

## Despliegue y validación pública

Código publicado: **`d287de9d5327cc96a70de6565daaa2c57cd16955`**. Se creó el commit en `feature/biologia-sexto`, se hizo fetch y se confirmó main remoto sin cambios respecto al punto de recuperación. La integración en main fue fast-forward; el push fue normal y terminó correctamente, sin conflictos ni sobrescrituras.

[GitHub Actions 45513733173](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/45513733173): `completed / success`, con `validate` y `deploy` aprobados. Validate terminó el 25/11/2026 a las 00:13:55 UTC; deploy terminó a las **00:14:13 UTC**, equivalente al **24/11/2026 a las 20:14:13 America/La_Paz**. Se utilizó el mecanismo existente de GitHub Pages.

La comprobación directa de los 65 recursos publicados terminó aprobada: HTTP 200 para todos, 832 IDs presentes y 43 exclusiones ausentes, incluidas las 28 de Biología. JavaScript, CSS y binarios coinciden byte por byte con la compilación local validada. Los tres recursos de texto con distintos finales de línea —HTML, favicon y `images/ejemplo-molecula.svg`— son exactamente iguales al normalizar exclusivamente CRLF/LF. Evidencia: `artifacts/biologia-publicacion/live-artifact.json`.

La verificación headless pública terminó con **100/100 casos aprobados**: 95 recorridos y comprobaciones de bancos (17,9 minutos) y cinco de catálogo, demostraciones y progreso anterior (57,7 segundos). Cero fallos, omitidos, flaky o errores globales. Las suites se ejecutaron una después de la otra, un worker, contra la URL real, sin ventanas visibles. Resoluciones: 1920×1080, 1366×768, 768×1024, 390×844 y 360×800.

Se recorrieron las 832 preguntas de los once bancos en cada tamaño: los siete bancos originales en práctica, y Lengua y Biología completos en práctica y simulacro. Las evidencias contienen **5.945 presentaciones verificadas**: 2.375 originales, 1.850 de Lengua y 1.720 de Biología. Todos los IDs, textos, alternativas, secuencias, respuestas y confirmaciones comprobaron correctamente. Los recorridos completos finalizaron con 100 %; los casos de error/omisión dieron 0 %. Se aprobaron reanudación tras recargar, agotamiento de nuevas, reinicio conservando historial, resultados previos de los nueve bancos y separación de cuatro demostraciones. Sin errores de consola/página, HTTP ≥400 ni desbordamientos horizontales en los casos ejecutados.

Evidencia local de cierre: `artifacts/biologia-publicacion/browser-production-full.json`, `browser-production-catalog.json` y `final-publication-validation.json`. El consolidador exige 211 unitarias, 230 casos locales y 100 públicos aprobados, un worker, cobertura completa reciente por ID y coincidencia del artefacto con el SHA exitoso de Actions. Estos archivos de pruebas permanecen ignorados; el resultado e incidencias se documentan en este informe público.

URL publicada y verificada: https://rodrigo-dev012.github.io/aulaQuiz/

Se inspeccionó también la captura pública móvil de 390×844 del Formulario 1: enunciado, cuatro alternativas, controles, recorrido de 86 preguntas y advertencia de claves preliminares legibles, sin recorte horizontal. Evidencia: `artifacts/biologia-publicacion/production/390x844/biologia-sexto-f1-practice-inicio.png`.

## Incidencias de comprobación, resueltas

Dos intentos iniciales del comprobador adicional de recursos se detuvieron antes de comenzar Playwright. El diagnóstico capturado mostró una diferencia de SHA-256 en `favicon.svg`: el comprobador exigía bytes idénticos entre un artefacto Windows y el publicado desde Linux. Se confirmó por comparación exacta que HTML, favicon y el SVG de ejemplo solo diferían en CRLF/LF. Se corrigió únicamente el comprobador local ignorado para normalizar HTML/SVG; JavaScript, CSS y binarios mantienen igualdad de bytes obligatoria. No fue necesario modificar ni volver a desplegar la web. La siguiente comprobación de los 65 recursos aprobó. Se conserva el diagnóstico en `live-verification-first-error.txt` y el cierre en `live-verification-final.txt`, bajo `artifacts/biologia-publicacion/`.

Un comando auxiliar de diagnóstico mezcló `require` y `await` en modo módulo y no llegó a realizar la comparación; se corrigió su sintaxis y se repitió correctamente. Es una incidencia del procedimiento de verificación, sin cambios en el contenido publicado. No se ocultan estos fallos como si todos los intentos hubieran aprobado.

El corte de sesión interrumpió la primera ejecución pública de Playwright antes de que se escribieran sus informes finales. Los casos parciales no se contabilizan como una suite aprobada. El 25/11/2026 se inició de nuevo la ejecución completa, secuencial y headless. Al comprobar el cierre, GitHub CLI no estaba instalado; se verificó el mismo run mediante la API pública de GitHub, que confirmó `completed / success` y el SHA publicado. El fetch confirmó que main remoto continuaba en `d287de9`.

El cierre posterior se guarda como commit exclusivamente documental con `[skip ci]`; el código desplegado y su run de Actions siguen siendo `d287de9` y `45513733173`. No se cambia ni vuelve a compilar la aplicación para cerrar los informes.

## Fuente oficial y límites

La fuente oficial sigue siendo GitHub `main` en este clon. Crear futuras ramas desde main actualizado, revisar diffs y conservar los once bancos, 832 preguntas, IDs, hashes de contenido y autorizaciones. No sincronizar ni sobrescribir automáticamente desde la carpeta principal u otras copias.

La comparación de solo lectura con `D:\AulaQuiz`, repetida al cerrar, detectó ocho divergencias: catálogo, datos de Lengua y Biología, verificador y registro de Biología, verificador de producción, configuración Vite y package.json. La carpeta principal carece de ambos archivos de bancos nuevos; copiarla encima perdería contenido. No se sincronizó ni modificó esa carpeta. Usar `node scripts/compare-main-source.mjs D:/AulaQuiz` antes de reconciliar futuras actualizaciones; su código 1 indica diferencias que requieren revisión.

No se modifica AulaQuiz V2, investigación ni PostgreSQL ajeno; no se contratan servicios. No se accede a datos reales de estudiantes: el progreso se prueba con perfiles sintéticos. La emulación de cinco pantallas no sustituye todos los dispositivos físicos. Falta el PDF escolar para cotejo textual por páginas; las claves no son oficiales ni certificadas. Se conservan las precisiones no bloqueantes de la revisión académica. El aviso de Vite por tamaño de fragmentos no impidió compilar; no se ocultó ni se actualizaron dependencias para esta entrega.
