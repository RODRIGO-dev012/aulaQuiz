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
3. Después de desplegar, ejecutar la suite real contra `AULAQUIZ_PUBLIC_URL=https://rodrigo-dev012.github.io/aulaQuiz/`, también secuencial y con un worker. Registrar resultados reales en el informe de publicación.

Validación local de navegador terminada: **80/80 regresiones históricas y 150/150 del catálogo real aprobadas**, 230 en total. Ambas ejecuciones registran cero fallos, omitidos, flaky y errores globales. Se ejecutaron una después de la otra con un worker; duraron aproximadamente 7,9 y 24,1 minutos. No hubo fallos intermitentes en estas ejecuciones finales. El cierre consolidado está en `artifacts/biologia-publicacion/local-validation.json`. La verificación pública se registrará después de observar el despliegue.

Los 35 casos de Biología recorren los dos formularios completos en práctica y simulacro, secuencia, textos/opciones, asociación de claves tras mezclar, 100 % de aciertos, 0 % con error/omisión, reanudación, agotamiento de nuevas y reinicio con historial conservado. Cubren 1.720 presentaciones de preguntas en los recorridos completos. Un perfil sintético conserva resultados de los nueve bancos anteriores, incluidos los dos de Lengua. Los casos verifican errores de consola/página, HTTP ≥400 y desbordamiento horizontal.

## Incidentes y límites

La compilación mantiene el aviso conocido de Vite por fragmentos mayores de 500 kB; finalizó correctamente y no se alteró el umbral para ocultarlo. El bundle principal de esta versión es aproximadamente 996,83 kB sin comprimir. No se cambiaron dependencias.

Antecedente histórico del ensayo 6240bb9: dos pruebas unitarias agotaron 30 s al coincidir con dos suites de navegador; después aprobó la repetición completa sin navegadores concurrentes. Se conserva esa evidencia en `artifacts/biologia-sexto/unit-final.json` y `unit-serial.json`. Es un incidente de la fase anterior, no una aprobación de la versión actual. Esta ejecución final es secuencial y cualquier nuevo fallo se registrará, aunque una repetición apruebe.

La emulación de pantallas no prueba todos los dispositivos físicos ni todos los navegadores. El progreso se comprueba con perfiles sintéticos; no se accede al navegador personal ni a registros reales de estudiantes. Las pruebas funcionales no certifican las claves científicamente. Los tres bloqueos anteriores se resolvieron retirando cuatro preguntas por autorización expresa; las precisiones no bloqueantes siguen documentadas.
