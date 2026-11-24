# AulaQuiz V1.7 — Publicación de Biología Sexto

Preparación: 24/11/2026, America/La_Paz. El propietario autorizó las cuatro exclusiones adicionales y la publicación condicionada a validaciones satisfactorias y ausencia de nuevos bloqueos.

## Contenido y recuperación

Resultado definitivo: 660 preguntas anteriores intactas + Biología F1 86 + Biología F2 86 = **832 preguntas reales, 11 bancos y seis materias**. Las cuatro demostraciones / 25 preguntas permanecen separadas. Biología tiene 28 exclusiones; Lengua conserva sus 15. Los textos, alternativas, IDs, categorías y claves de las 660 anteriores se mantienen.

Repositorio: `RODRIGO-dev012/aulaQuiz`, clon `D:\AulaQuiz\publicacion\despliegue-v1.3`. Rama de integración: `feature/biologia-sexto`, ensayo de referencia `6240bb95fc395c01d98bf3b09ea0ba64488c9880`. Git estaba limpio y el fetch inicial confirmó main local y remoto en `820fb12e4517a3b38b85d1c578be258d7e420376`.

Punto de recuperación anterior a publicar: **`820fb12e4517a3b38b85d1c578be258d7e420376`**. Se conservará en la rama local `recovery/pre-biologia-sexto-20261124` antes de integrar. No se ejecuta restauración ni push forzado.

La autorización exacta, IDs y hashes figuran en `publicacion/AUTORIZACION_BIOLOGIA_SEXTO_V1_7.md` y `APROBACIONES_BANCOS.json`; las aprobaciones anteriores no se sustituyen. Los registros de las cuatro exclusiones quedan fuera del banco estudiantil y del artefacto, con motivos y hashes trazables. Las claves se mantienen preliminares y no certificadas.

## Verificaciones locales

Validación local completada: **211/211 unitarias, 80/80 regresiones históricas y 150/150 del catálogo real aprobadas**. Typecheck y compilación normal aprobados con 832 preguntas / 11 bancos. Las suites de navegador se ejecutaron secuencialmente, con un worker y sin ventanas visibles; cero fallos, omitidos o flaky en esta versión. Los 35 casos específicos de Biología cubrieron 1.720 presentaciones en los recorridos completos y comprobaron 100 %/0 %, reanudación, reinicio, menú y conservación del progreso de los nueve bancos anteriores.

La comprobación final confirmó las 172 conversiones exactas contra la entrada, cuatro registros completos excluidos conservados, los hashes de los archivos de las 660 anteriores y del motor intactos y las 43 exclusiones ausentes del artefacto. No se han identificado nuevos bloqueos. Evidencias: `artifacts/biologia-publicacion/unit.json`, `browser-baseline.json`, `browser-real.json` y `local-validation.json`. Se revisó visualmente una captura móvil de la versión de 86 preguntas por formulario.

No se incluyen materiales de importación, registros privados, credenciales, respaldos ni evidencias de navegador entre los archivos de publicación. No cambian dependencias, lockfile ni motor de progreso. El workflow existente conserva sus controles y mecanismo de Pages; sus comandos de pruebas explicitan un worker y el límite unitario de 30 s de la validación local.

## Despliegue y validación pública

Pendiente hasta que terminen satisfactoriamente las validaciones locales. Se registrarán commit de código, integración segura, push normal, ejecución de Actions, resultados de `validate`/`deploy`, URL pública y pruebas headless reales de producción. No se presume que un push o una ejecución iniciada implique publicación correcta.

URL a verificar: https://rodrigo-dev012.github.io/aulaQuiz/

## Fuente oficial y límites

La fuente oficial sigue siendo GitHub `main` en este clon. Crear futuras ramas desde main actualizado, revisar diffs y conservar los once bancos, 832 preguntas, IDs, hashes de contenido y autorizaciones. No sincronizar ni sobrescribir automáticamente desde la carpeta principal u otras copias.

No se modifica AulaQuiz V2, investigación ni PostgreSQL ajeno; no se contratan servicios. No se accede a datos reales de estudiantes: el progreso se prueba con perfiles sintéticos. La emulación de cinco pantallas no sustituye todos los dispositivos físicos. Falta el PDF escolar para cotejo textual por páginas; las claves no son oficiales ni certificadas. Se conservan las precisiones no bloqueantes de la revisión académica. El aviso de Vite por tamaño de fragmentos no impidió compilar; no se ocultó ni se actualizaron dependencias para esta entrega.
