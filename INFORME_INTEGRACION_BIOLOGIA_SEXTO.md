# AulaQuiz V1.7 — Integración final de Biología Sexto

Actualización: 24/11/2026. Repositorio `RODRIGO-dev012/aulaQuiz`, clon `D:\AulaQuiz\publicacion\despliegue-v1.3`. Rama de trabajo: `feature/biologia-sexto`; ensayo de referencia `6240bb95fc395c01d98bf3b09ea0ba64488c9880`.

## Resultado del contenido

| Contenido real | Preguntas |
| --- | ---: |
| Nueve bancos anteriores, sin cambios | 660 |
| Biología — Sexto de Secundaria — Formulario 1 | 86 |
| Biología — Sexto de Secundaria — Formulario 2 | 86 |
| **Once bancos / seis materias** | **832** |

Las cuatro demostraciones / 25 preguntas permanecen separadas: catálogo completo 15 bancos / 857 preguntas. Hay 172 preguntas disponibles de Biología y 28 excluidas. Las 15 exclusiones anteriores de Lengua también se mantienen; el verificador cuenta 43 exclusiones entre ambas materias.

La nueva instrucción del propietario autorizó excluir BIO-F1-040, BIO-F1-031, BIO-F2-070 y BIO-F2-012, sin reemplazarlas. Se retiraron del JSON consumido por estudiantes y se conservaron las otras 172 preguntas con sus textos, alternativas, IDs y claves originales. Los huecos de los IDs no se renumeran; la interfaz presenta 1–86 consecutivo por formulario.

## Exclusiones y trazabilidad

Las 24 exclusiones iniciales siguen registradas en la entrada `RELACION_24_PREGUNTAS_EXCLUIDAS_BIOLOGIA.txt` y en `publicacion/INTEGRACION_BIOLOGIA_SEXTO.json`. Las cuatro adicionales y sus motivos figuran en ese registro y en [REVISION_BIOLOGIA_SEXTO.md](publicacion/REVISION_BIOLOGIA_SEXTO.md). Sus registros completos se conservaron en `revisiones/biologia-sexto/EXCLUSIONES_ADICIONALES.json`, ruta ignorada y excluida del artefacto público. También permanecen los materiales originales fuera del repositorio y el commit de ensayo 6240bb9 como referencia histórica.

SHA-256 de la entrada de 176 preguntas: `c1ce813e33d6d7cc4ea31db31d171ab20a5c5e14a04491b44730038b599f1f20`. SHA-256 de la relación inicial de exclusiones: `c2afb6b80f09af5fda71902e53bdfb95967dc3018a3c5a801ccfe86054c3226f`. No se modifican esos archivos ni se añaden preguntas desde el respaldo de 200.

La versión 2 de `INTEGRACION_BIOLOGIA_SEXTO.json` conserva la referencia de hashes anterior, los nueve bancos originales y el manifiesto de aprobaciones previo. Los archivos de las 660 preguntas, las demostraciones, motor y almacenamiento se comprueban mediante SHA-256; se usa también normalización LF para checkouts Linux. El manifiesto recibe únicamente dos aprobaciones de Biología y sus 28 exclusiones; las aprobaciones anteriores se comparan estructuralmente con la copia original.

## Publicación condicionada y arquitectura

La autorización expresa está en `publicacion/AUTORIZACION_BIOLOGIA_SEXTO_V1_7.md`, alcance exacto `172-biologia-sexto-v1.7`. Vincula IDs, cantidades, hashes y evidencia, mantiene `academicApproval.status: not-certified` y condiciona la publicación a validaciones satisfactorias y ausencia de nuevos bloqueos. No se inventan firmas ni certificación docente.

Los dos bancos pasan al catálogo normal de producción. `npm run build` valida los once bancos y las 832 preguntas; no hay bypass de autorización. Los modos antiguos de ensayo siguen verificando las mismas 172 preguntas autorizadas. Se reutilizan menú, icono, configuración, mezcla, corrección, puntuación, resultados, persistencia y reinicio existentes, sin rediseño ni modificación del motor de progreso.

Las pruebas de navegador de Biología se incorporan a la suite normal de regresión real y a CI. Se establece un worker y suites secuenciales; las unitarias se ejecutan con un worker y límite de 30 s, como en la validación local. Se conserva el mecanismo de despliegue existente de Pages.

## Estado y documentos relacionados

Unitarias: 211 aprobadas. Typecheck y compilación normal: aprobados. Navegador local: 230 casos aprobados. Código publicado: `d287de9d5327cc96a70de6565daaa2c57cd16955`; GitHub Actions [45513733173](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/45513733173) completado correctamente en validación y despliegue. El cierre de las pruebas públicas y sus incidencias se registra en [RESULTADO_PRUEBAS_BIOLOGIA.md](RESULTADO_PRUEBAS_BIOLOGIA.md) e [INFORME_PUBLICACION_BIOLOGIA_SEXTO.md](INFORME_PUBLICACION_BIOLOGIA_SEXTO.md).

La fuente oficial para futuras actualizaciones sigue siendo GitHub `main` en este clon. No copiar automáticamente la carpeta principal ni otras versiones sobre este código. Crear ramas desde main actualizado y preservar los once bancos, sus IDs, autorizaciones y compatibilidad de progreso. Las revisiones académicas siguen siendo preliminares, sin cotejo exhaustivo con el PDF no entregado.

No se modifican V2, investigación, dependencias, lockfile ni PostgreSQL ajeno. Los resultados de navegador, registros completos excluidos y materiales privados no se incluyen en el artefacto ni en los archivos preparados para esta entrega. La versión de ensayo anterior de 176 preguntas y sus informes históricos se conserva en 6240bb9.
