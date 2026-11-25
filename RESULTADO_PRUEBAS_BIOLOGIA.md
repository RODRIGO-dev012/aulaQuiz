# Resultado de pruebas — Publicación final de Biología Sexto

Fecha de preparación: 24/11/2026. Contenido definitivo: 660 preguntas anteriores + 86 + 86 = **832 preguntas reales / 11 bancos / seis materias**. Biología: 172 disponibles y 28 excluidas. Claves propuestas, no oficiales ni certificadas.

## Resultados observados antes de navegador

- **211/211 pruebas unitarias aprobadas** (191 anteriores y 20 de Biología), diez archivos; un worker, límite de 30.000 ms, sin suites de navegador concurrentes. Evidencia: `artifacts/biologia-publicacion/unit.json`.
- Typecheck aprobado y compilación de producción aprobada: `npm run typecheck`, `npm run build`. El artefacto incluye las 832 preguntas; no contiene los 28 IDs excluidos de Biología ni los 15 de Lengua.
- Cero duplicados exactos de enunciados normalizados, IDs globales únicos, cuatro alternativas completas y claves válidas. Los hashes de los nueve bancos previos se conservan. Las aprobaciones anteriores se preservan estructuralmente al añadir las de Biología.
- Nuevas pruebas negativas rechazan revocación de autorización, alcance inválido, evidencia modificada, IDs alterados, certificación inventada, contenido modificado, exclusiones eliminadas y cambios en las 660 preguntas.

## Navegador local y producción

Las suites locales se ejecutan **una por una**, con `headless:true`, `fullyParallel:false`, `--workers=1`. No se controla el escritorio ni se abren ventanas visibles. Cinco tamaños: 1920×1080, 1366×768, 768×1024, 390×844 y 360×800.

1. Regresión histórica: 80 casos, `npm run test:e2e -- --workers=1`, sobre su fixture de demostraciones separado. Evidencia: `artifacts/biologia-publicacion/browser-baseline.json`.
2. Catálogo real definitivo: 150 casos (115 anteriores + 35 de Biología), `npm run test:e2e:real -- --workers=1`, sobre la compilación normal de 832 preguntas. Evidencia: `artifacts/biologia-publicacion/browser-real.json`.
3. Producción: **100/100 casos aprobados** contra `AULAQUIZ_PUBLIC_URL=https://rodrigo-dev012.github.io/aulaQuiz/`, también secuencial y con un worker: 95 casos de `biologia-sexto.spec.ts`, `lengua-sexto.spec.ts` y `v1-7.spec.ts`, seguidos por cinco casos de catálogo de `real-banks.spec.ts --grep=prioritario`. Evidencias: `artifacts/biologia-publicacion/browser-production-full.json` y `browser-production-catalog.json`.

Validación local de navegador terminada: **80/80 regresiones históricas y 150/150 del catálogo real aprobadas**, 230 en total. Ambas ejecuciones registran cero fallos, omitidos, flaky y errores globales. Se ejecutaron una después de la otra con un worker; duraron aproximadamente 7,9 y 24,1 minutos. No hubo fallos intermitentes en estas ejecuciones finales. El cierre consolidado está en `artifacts/biologia-publicacion/local-validation.json`.

Producción cerrada el 25/11/2026: 95 casos en 17,9 minutos y cinco en 57,7 segundos, todos aprobados; cero fallos, omitidos, flaky y errores globales. Se verificaron 5.945 presentaciones de preguntas, cubriendo las 832 en las cinco resoluciones; Biología y Lengua en ambos modos. Cada archivo de cobertura comprobó IDs completos y fecha correspondiente a la nueva ejecución. Sin errores de consola/página, HTTP ≥400 ni desbordamientos en los casos ejecutados. Progreso sintético anterior, puntuaciones 0 %/100 %, reanudación y reinicio aprobados. Los 65 recursos públicos respondieron HTTP 200 y coincidieron con el artefacto validado; tres textos HTML/SVG requirieron únicamente normalizar CRLF/LF, y JavaScript/CSS/binarios coincidieron byte por byte.

GitHub Actions [45513733173](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/45513733173) aprobó `validate` y `deploy` del código `d287de9d5327cc96a70de6565daaa2c57cd16955`. Evidencia final consolidada: `artifacts/biologia-publicacion/final-publication-validation.json`. Informe público completo: [INFORME_PUBLICACION_BIOLOGIA_SEXTO.md](INFORME_PUBLICACION_BIOLOGIA_SEXTO.md).

Los 35 casos de Biología recorren los dos formularios completos en práctica y simulacro, secuencia, textos/opciones, asociación de claves tras mezclar, 100 % de aciertos, 0 % con error/omisión, reanudación, agotamiento de nuevas y reinicio con historial conservado. Cubren 1.720 presentaciones de preguntas en los recorridos completos. Un perfil sintético conserva resultados de los nueve bancos anteriores, incluidos los dos de Lengua. Los casos verifican errores de consola/página, HTTP ≥400 y desbordamiento horizontal.

## Incidentes y límites

El corte de sesión interrumpió la primera prueba pública sin informes finales; sus resultados parciales no se sumaron. Se repitieron y aprobaron los 100 casos completos. El comprobador adicional de recursos tuvo dos intentos fallidos por exigir igualdad de bytes Windows/Linux en archivos HTML/SVG; se corrigió exclusivamente la comparación de finales de línea y aprobaron los 65 recursos. El informe de publicación conserva el diagnóstico y los comandos auxiliares corregidos. No hubo que cambiar ni volver a desplegar la aplicación.

La compilación mantiene el aviso conocido de Vite por fragmentos mayores de 500 kB; finalizó correctamente y no se alteró el umbral para ocultarlo. El bundle principal de esta versión es aproximadamente 996,83 kB sin comprimir. No se cambiaron dependencias.

Antecedente histórico del ensayo 6240bb9: dos pruebas unitarias agotaron 30 s al coincidir con dos suites de navegador; después aprobó la repetición completa sin navegadores concurrentes. Se conserva esa evidencia en `artifacts/biologia-sexto/unit-final.json` y `unit-serial.json`. Es un incidente de la fase anterior, no una aprobación de la versión actual. Esta ejecución final es secuencial y cualquier nuevo fallo se registrará, aunque una repetición apruebe.

La emulación de pantallas no prueba todos los dispositivos físicos ni todos los navegadores. El progreso se comprueba con perfiles sintéticos; no se accede al navegador personal ni a registros reales de estudiantes. Las pruebas funcionales no certifican las claves científicamente. Los tres bloqueos anteriores se resolvieron retirando cuatro preguntas por autorización expresa; las precisiones no bloqueantes siguen documentadas.
