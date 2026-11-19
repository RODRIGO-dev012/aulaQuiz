# AulaQuiz V1.3 — publicación definitiva verificada

Fecha: 19/11/2026.

## Estado real

**Sitio público funcional:** [AulaQuiz](https://rodrigo-dev012.github.io/aulaQuiz/). **Repositorio:** [RODRIGO-dev012/aulaQuiz](https://github.com/RODRIGO-dev012/aulaQuiz). **GitHub Actions:** [ejecución automática 44625819246](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/44625819246), validate y deploy exitosos. Código desplegado: 8d485832789ad1dae10c3adf705df295505c48a7.

La aplicación se sirve por HTTPS desde GitHub Pages (cabecera Server: GitHub.com). Página y recursos iniciales devuelven HTTP 200, sin referencias a servidores locales. La comprobación de navegador se ejecutó directamente contra la URL pública, sin iniciar un servidor local. Los estudiantes pueden acceder sin que la computadora del propietario permanezca encendida.

## Fuente y seguridad

Se utilizó exclusivamente el ZIP saneado autorizado: SHA-256 **1cfbd68cba75af3fc1ad51838d42be5d19daf1abc2d12875b30bb97387f8aad7**. Sus 50 archivos coincidieron con el manifiesto. Se extrajo en un clon independiente del repositorio inicialmente vacío. El ZIP original se conserva intacto como evidencia de origen; el repositorio incluye después la corrección CSS y la configuración de actualizaciones autorizadas. No se subió la carpeta privada completa.

El índice inicial incluyó los 50 archivos saneados y dos documentos de publicación. Se comprobaron rutas y patrones de credenciales antes de subirlo. No se incluyeron importaciones, revisiones privadas, archivos de entorno, respaldos, ZIP, bancos locales pendientes, capturas ni resultados personales. Los 61 archivos protegidos conservan su SHA-256: las 475 preguntas originales y 79 apartadas siguen intactas.

Autenticación comprobada como RODRIGO-dev012, con permisos admin/push, sin registrar credenciales. Identidad de commit con correo noreply de GitHub. No hubo force push, cambio de visibilidad ni destrucción de historial.

## Contenido accesible

**4 cuestionarios de demostración / 25 preguntas**: Sociales 10, Lenguaje 5, Matemáticas 5 y Biología 5. **0 bancos reales publicados.** Los siete bancos reales y sus propuestas continúan pendientes de aprobación académica y autorización; aprobar pruebas técnicas no los activa. El build verifica versión/SHA-256 y escanea el artefacto para excluir contenido pendiente.

## Validación final

| Comprobación | Aprobadas | Fallidas |
| --- | ---: | ---: |
| Unitarias/integración del proyecto privado | 124 | 0 |
| Normalizador privado | 8 | 0 |
| Playwright de revisión científica privada | 8 | 0 |
| Playwright contra GitHub Pages, cinco resoluciones | 80 | 0 |
| **Línea base única conservada y revalidada** | **220** | **0** |

Además, Actions ejecutó sus **107 unitarias públicas + 80 Playwright = 187**, con TypeScript, build y control de producción aprobados. Las repeticiones entre entornos no se suman como pruebas nuevas. La copia pública excluye 33 comprobaciones privadas para no exponer material pendiente; permanecen en el proyecto original.

Playwright sobre la web real: 80 aprobadas, cero fallidas, omitidas o flaky, en 1920×1080, 1366×768, 768×1024, 390×844 y 360×800. Se comprobaron práctica, simulacro, cronómetro, selección, ausencia de duplicados, calificación por ID, persistencia, perfiles independientes, historial, preguntas nuevas, refuerzo, aprendizaje progresivo, migración, copias JSON, enlaces directos/recarga, parámetros inválidos, vista clásica/interactiva y renderizado científico. Los recorridos comprueban consola/HTTP y desbordamiento. Las importaciones de prueba son ejemplos técnicos en contextos aislados del navegador; no modifican el catálogo del servidor.

## Incidencia encontrada y corregida

La primera ejecución Linux aprobó 78/80 escenarios de navegador y detectó dos desbordamientos en resultados a 768×1024. Se corrigió únicamente el CSS de la cuadrícula de acciones: columnas minmax(0,1fr), botones con mínimo cero y etiquetas que pueden ajustarse. Una prueba de fuente más ancha reprodujo 874 px de contenido antes y 768 px después, en viewport de 768 px. No se ocultó el desbordamiento de la página ni se relajaron las pruebas. Las ejecuciones posteriores manual y automática aprobaron las 187 comprobaciones y desplegaron correctamente.

Una validación redundante del push inicial se canceló intencionalmente para priorizar el workflow manual completo; no representa un fallo de aplicación. Se unificó la resolución de módulos de Windows en el ejecutor externo de Playwright. En el proyecto privado se excluyeron de Vitest las copias generadas de publicacion/** para no contar pruebas duplicadas; sus 124 casos originales permanecen activos.

## Actualizaciones automáticas

El propietario autorizó expresamente activar los futuros despliegues tras cada push a main. Se configuraron AULAQUIZ_PAGES_APPROVED=true y AULAQUIZ_AUTO_DEPLOY=true. El primer push de esta configuración completó automáticamente validate y deploy: es la ejecución enlazada arriba.

1. Trabajar en el clon saneado del repositorio, nunca subir D:\aulaQuiz completo. Sincronizar con git pull --ff-only.
2. Incorporar solo cambios y bancos autorizados. Revisar git diff y git status; ejecutar npm test, npm run typecheck, npm run build, npm run verify:production y npm run test:e2e.
3. Hacer commit y git push origin main, sin force push. Actions instalará dependencias, ejecutará todas las pruebas públicas, compilará y escaneará el contenido. Solo después de superar esos pasos desplegará Pages. Los PR validan sin desplegar.
4. Revisar ambos jobs y verificar el sitio. Ante un fallo, corregir y enviar otro commit; no desactivar controles para publicar.
5. Para suspender solo la publicación automática, poner AULAQUIZ_AUTO_DEPLOY=false en Settings → Secrets and variables → Actions → Variables. El inicio manual sigue disponible con confirm_publication=true, siempre sujeto a AULAQUIZ_PAGES_APPROVED=true y main.

La revisión automática inicialmente exigió una autorización más explícita para activar futuros despliegues; el propietario respondió afirmativamente antes de habilitarlos. No queda ningún bloqueo de autenticación o publicación. La aprobación de contenido real continúa pendiente.

## Evidencia

Se generaron **70 capturas de la web publicada**, con flujos clásicos, interactivos, aprendizaje, resultados, refuerzo, perfiles e historial. Galería local: artifacts/publicacion-definitiva/GALERIA_PUBLICADA.html. Capturas: artifacts/publicacion-definitiva/capturas/.

Evidencia interna: RESUMEN_PUBLICACION.json, playwright-publico.json, playwright-privado-final.json, vitest-final.json, AUDITORIA_WEB_PUBLICA.json, CORRECCION_TABLET.json, github-status.json, github-logs.json y actions-validate.log, bajo artifacts/publicacion-definitiva/. Los archivos de evidencia y datos de prueba no se suben al repositorio.

Documentación del repositorio actualizada mediante un commit posterior sin cambios de código. La versión de aplicación validada y publicada corresponde al commit de código indicado arriba.
