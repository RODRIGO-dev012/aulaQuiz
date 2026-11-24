# Plan de publicación de Biología Sexto

Estado: integración local; **publicación no autorizada**. No ejecutar push, merge ni despliegue con este documento como sustituto de autorización.

La validación técnica local terminó con 206 unitarias y 230 recorridos headless aprobados. El informe de pruebas conserva dos timeouts intermedios y su repetición aprobada. Sigue pendiente resolver los tres ítems observados; no basta con los resultados funcionales para autorizarlos académicamente.

1. Revisar con la docente las 24 exclusiones propuestas y las observaciones de `publicacion/REVISION_BIOLOGIA_SEXTO.md`. Resolver BIO-F1-040, BIO-F1-031 y BIO-F2-070 antes de publicarlos. Facilitar el PDF para cotejo por páginas si se requiere validación académica textual. No presentar claves como certificadas sin evidencia docente real.
2. Aprobar el banco definitivo exacto. Si se corrigen o excluyen nuevos ítems, registrar decisiones, nuevos hashes, conteos y pruebas; no asumir que las 176 actuales quedan aprobadas. Los 836 ejercicios / 11 bancos son el resultado técnico del ensayo actual.
3. Obtener autorización expresa del propietario para integrar en `main`, hacer push normal y desplegar la versión definitiva. Un commit de conservación en la rama local `feature/biologia-sexto` no autoriza ninguna de esas acciones. Esta tarea solo autoriza integración y validación local; el manifiesto actual no autoriza Biología.
4. Con esa autorización, registrar evidencia verificable de alcance, IDs y hashes en el mecanismo de aprobaciones existente, sin inventar firmas ni certificación. Incorporar el contenido aprobado al catálogo de producción y a su verificador, retirando su condición de ensayo local mediante cambios revisados. El indicador `--biologia-local` nunca autoriza producción ni cambia `dist`.
5. Verificar Git limpio/revisado, remoto correcto y `main` actualizado. Conservar como recuperación el commit anterior a la publicación y revisar el diff completo. Si aparecen conflictos o cambios incompatibles ajenos, detenerse. No sincronizar la carpeta principal automáticamente.
6. Ejecutar nuevamente pruebas unitarias, typecheck, compilación normal, validación de artefacto y todas las suites Playwright headless sobre el catálogo definitivo. Verificar las 660 anteriores, exclusiones, puntuaciones, progreso, reinicio, móvil y escritorio. No reconstruir artefactos mientras una suite los esté sirviendo.
7. Tras aprobación de la versión concreta, realizar commit, integración segura y push normal, sin force push. Usar exclusivamente el workflow existente de GitHub Pages y comprobar `validate` y `deploy`.
8. Validar directamente `https://rodrigo-dev012.github.io/aulaQuiz/` con Playwright headless: banco definitivo, recuentos, puntuación, perfiles sintéticos previos, recursos HTTP y consola, cinco tamaños. Registrar commit servido, ejecución de Actions, recuperación, incidentes y límites; detenerse al finalizar.

## Separación actual de artefactos

| Comando | Resultado | Uso |
| --- | --- | --- |
| `npm run build` | `dist`, nueve bancos reales / 660 preguntas | Producción ya autorizada; Biología ausente. |
| `npm run build:biologia-local` | `artifacts/biologia-dist`, once bancos reales / 836 preguntas | Ensayo local pendiente; no subir a Pages. |
| `npm run test:e2e:biologia-local -- --workers=2` | Regresiones reales y Biología contra 127.0.0.1 | Headless, sin escritorio ni ventanas visibles. |

Las dos compilaciones se verifican por separado. Los artefactos locales y resultados están ignorados por Git. El runner de Biología rechaza `AULAQUIZ_PUBLIC_URL` para evitar ejecutar este ensayo contra una web pública. No se modifica el workflow ni se desactivan sus controles.
