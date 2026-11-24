# AulaQuiz V1.7 — Publicación de Lengua Castellana

Fecha: 23/11/2026, America/La_Paz. El propietario autorizó expresamente commit, integración segura en `main`, push normal y despliegue en GitHub Pages. Las claves conservan su carácter preliminar, propuesto y no certificado.

## Preparación y recuperación

Repositorio: `RODRIGO-dev012/aulaQuiz`, clon `D:\AulaQuiz\publicacion\despliegue-v1.3`. La consulta y fetch remoto iniciales confirmaron que `main` seguía en `c8f23b02f1ac042d6a6e5a416eeefe33421338d1`, igual al punto de partida local, sin cambios remotos que integrar.

Punto de recuperación: **`c8f23b02f1ac042d6a6e5a416eeefe33421338d1`**, conservado en la rama local `recovery/pre-lengua-sexto-20261123`. La publicación anterior de código fue `4188c6ab47039bcaec1f8c731169098c9e8f06d7`; el punto de recuperación también conserva su documentación final. No se ha ejecutado restauración ni push forzado.

Se revisaron los cambios de código y pruebas, la lista de archivos nuevos, los hashes y la conversión de preguntas. Se conserva el archivo original de las 475 preguntas byte por byte y se validan las 185 nuevas contra la evidencia de integración. Las 15 observadas permanecen excluidas por ID y fuera del artefacto. No se modificaron AulaQuiz V2, investigación, dependencias, lockfile, motor de puntuación ni almacenamiento de progreso.

## Autorización y catálogo

La evidencia adicional está en `publicacion/AUTORIZACION_LENGUA_SEXTO_V1_7.md`. El manifiesto vincula los dos bancos nuevos con sus IDs, cantidades, hashes y alcance `185-lengua-sexto-v1.7`; mantiene `academicApproval.status: not-certified`, sin nombres ni firmas docentes. Las autorizaciones de los siete bancos anteriores no se sustituyeron.

| Contenido real | Preguntas |
| --- | ---: |
| Siete bancos anteriores, intactos | 475 |
| Lengua Castellana — Sexto de Secundaria — Formulario 1 | 95 |
| Lengua Castellana — Sexto de Secundaria — Formulario 2 | 90 |
| **Nueve bancos reales** | **660** |

Las cuatro demostraciones / 25 preguntas permanecen separadas (catálogo completo: 13 bancos / 685 preguntas). Las similitudes temáticas y límites de revisión académica siguen documentados en `publicacion/REVISION_SIMILITUD_LENGUA_SEXTO.md`. No hay duplicados exactos de enunciados ni IDs.

## Verificación previa

Comprobaciones ejecutadas de nuevo antes del commit:

- 191/191 pruebas unitarias aprobadas, incluidas cuatro nuevas que rechazan revocación de autorización, contenido modificado, evidencia modificada o exclusiones eliminadas, también al intentar usar el antiguo indicador local.
- `npm run typecheck`, `npm run build` y validación del artefacto: aprobados con los controles normales de publicación; 9 bancos reales / 660 preguntas, 15 exclusiones, ningún banco pendiente.
- Playwright headless: 25/25 recorridos de Lengua aprobados en 1920×1080, 1366×768, 768×1024, 390×844 y 360×800. Ambos formularios completos en práctica y simulacro, mezcla, numeración, respuestas, puntuación, reanudación y conservación de un perfil anterior sintético. Sin errores JS/consola/HTTP ni desbordamiento horizontal en esos recorridos.
- Archivo de las 475 preguntas comparado byte por byte con `c8f23b0`: idéntico. Registros de aprobación anteriores comparados estructuralmente: idénticos. Las 185 incorporaciones coinciden con el JSON fuente en textos, alternativas y claves.
- Revisión de los 20 archivos preparados, diff y comprobación de whitespace: sin incidencias. No se incluyen temporales, materiales de importación, credenciales, respaldos ni evidencias de navegador. No cambian dependencias, lockfile ni workflow de Pages.
- La evidencia de autorización preparada en Git tiene el mismo hash que la copia local y el manifiesto; se fija LF en ese archivo para conservar el hash entre Windows y Actions.

Evidencias locales ignoradas: `artifacts/lengua-publicacion/unit-prepublish.json` y `browser-prepublish.json`. La validación local anterior está documentada en `INFORME_INTEGRACION_LENGUA_SEXTO.md`; no se confunde con la validación de producción posterior. Vite mantiene un aviso informativo por el tamaño de fragmentos JavaScript; la compilación terminó correctamente.

## Publicación y verificación pública

Publicación completada. Commit de código publicado: **`7d227db2257559b4a67b8c9fdefed275df0de10c`**. Se integró `feature/lengua-sexto` en `main` mediante fast-forward después de verificar de nuevo el remoto y se realizó push normal, sin conflictos ni sobrescritura de cambios remotos.

[GitHub Actions 45302082709](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/45302082709): ejecución completada con resultado **success**, tanto `validate` como `deploy`. El despliegue terminó el 23/11/2026 a las 21:20:47 de America/La_Paz (24/11/2026 01:20:47 UTC), mediante el workflow de Pages existente.

URL pública: **https://rodrigo-dev012.github.io/aulaQuiz/**. La página y sus recursos respondieron HTTP 200. Los tres recursos JavaScript/CSS principales publicados coinciden byte por byte con la compilación local validada. Se verificaron los 660 IDs en el artefacto público y la ausencia de las 15 preguntas excluidas.

Playwright headless contra la URL pública: **30/30 recorridos aprobados, cero fallos y cero omitidos**. Se ejecutaron 25 recorridos de Lengua y cinco de catálogo/progreso anterior, en los cinco tamaños indicados en la verificación previa. Se comprobó:

- Disponibilidad de los nueve bancos reales y separación de las cuatro demostraciones.
- Ambos formularios completos en práctica y simulacro: 95 y 90 preguntas; 1.850 presentaciones de preguntas nuevas en total entre modos y tamaños.
- Textos y opciones, mezcla de alternativas, numeración, puntuación del 100 % con respuestas correctas y del 0 % con errores/omisiones.
- Reanudación tras recargar y conservación de resultados y progreso de perfiles anteriores sintéticos.
- Ausencia de errores JavaScript, consola, HTTP/404 y desbordamiento horizontal durante los recorridos.

Se utilizó `AULAQUIZ_PUBLIC_URL=https://rodrigo-dev012.github.io/aulaQuiz/` con `npm run test:e2e:real -- lengua-sexto.spec.ts --workers=2` y `npm run test:e2e:real -- real-banks.spec.ts --grep=prioritario --workers=2`, con reporteros y directorios de salida específicos. No se abrieron ventanas visibles.

Evidencias locales ignoradas en `artifacts/lengua-publicacion/`: `actions-run-final.json`, `actions-jobs-final.json`, `live-artifact.json`, `browser-production-lengua.json`, `browser-production-catalog.json` y `final-publication-validation.json`. La verificación consolidada terminó el 24/11/2026 a las 01:28:40 UTC. No quedan incidencias funcionales detectadas pendientes; siguen vigentes los límites académicos y de dispositivos indicados abajo.

Cierre documental: 24/11/2026. El informe y README se guardan en un commit posterior de documentación con `[skip ci]`; el código desplegado y la ejecución de Pages identificados arriba corresponden a `7d227db`.

## Fuente oficial y futuras actualizaciones

La fuente oficial es **`RODRIGO-dev012/aulaQuiz`, rama `main`**, en el clon saneado indicado. Antes de actualizar, verificar Git limpio, hacer fetch y actualizar `main` con fast-forward, crear una rama y revisar el diff. Conservar los nueve bancos y 660 preguntas, sus IDs y la compatibilidad de progreso. Nuevos cambios de contenido o claves requieren evidencia y autorización específicas.

`D:\AulaQuiz` contiene una copia anterior con diferencias y material privado. No se sincroniza automáticamente ni se usa para sobrescribir este clon. Ejecutar `node scripts/compare-main-source.mjs D:/AulaQuiz` antes de reutilizar sus archivos; revisar cada diferencia. Compilar antes de iniciar las pruebas y mantener `dist` estable. README y la guía de actualización recogen este procedimiento.

## Límites

Las claves no son oficiales ni certificadas por docentes. Falta el PDF escolar para un cotejo académico independiente por páginas. La compatibilidad móvil se verifica con viewports headless; no equivale a una prueba física en cada modelo de teléfono. No se manipula el navegador personal ni datos reales de estudiantes: las comprobaciones de progreso usan perfiles sintéticos compatibles con V1.7.
