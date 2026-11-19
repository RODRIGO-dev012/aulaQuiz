# AulaQuiz V1.3

Aplicación estática de estudio y simulacros. Esta fuente procede exclusivamente del ZIP saneado autorizado (50 archivos verificados; SHA-256 1cfbd68cba75af3fc1ad51838d42be5d19daf1abc2d12875b30bb97387f8aad7), con documentación de publicación actualizada. No contiene las importaciones ni los bancos reales pendientes.

Repositorio: https://github.com/RODRIGO-dev012/aulaQuiz

Dirección prevista: https://rodrigo-dev012.github.io/aulaQuiz/ — el estado comprobado se registra en INFORME_PUBLICACION_V1_3.md.

## Uso

Cuatro cuestionarios de demostración, 25 preguntas en total. Práctica, simulacro, selección aleatoria/nuevas/refuerzo/progresiva, perfiles locales, historial, estilos clásico e interactivo y enlaces compartidos. El progreso se guarda únicamente en el navegador y dispositivo; no hay cuentas en la nube. Las claves estáticas son inspeccionables: esta herramienta sirve para estudiar, no para exámenes oficiales seguros.

## Ejecutar y validar

Node.js 22.12+ y npm. Ejecutar npm ci, npm run dev. Verificar npm test, npm run typecheck, npm run build, npm run verify:production y npm run test:e2e. En Windows usar npm.cmd si npm.ps1 está restringido. Playwright local utiliza Chrome; CI instala Chromium.

El proyecto privado conserva la línea base de 220 pruebas. Esta fuente pública conserva 107 unitarias y 80 recorridos de navegador; las 33 comprobaciones privadas de importación/revisión no se distribuyen porque incluyen material pendiente. No se sustituyeron claves para facilitar pruebas.

## Actualizar

1. Trabajar en este repositorio saneado; no copiar la carpeta privada del propietario.
2. Modificar únicamente contenido autorizado. Para un banco real, registrar aprobación docente, autorización de publicación y hash de versión en publicacion/APROBACIONES_BANCOS.json antes de incluirlo en el catálogo real.
3. Ejecutar las verificaciones locales y revisar git diff y git status. Hacer commit y git push origin main sin force push.
4. Cada push o pull request a main ejecuta automáticamente instalación, pruebas, TypeScript, build, escaneo de contenido y Playwright.
5. Para publicar, abrir Actions → Validar y publicar AulaQuiz V1.3 → Run workflow, seleccionar main y activar confirm_publication. La variable AULAQUIZ_PAGES_APPROVED debe estar en true y Pages debe usar GitHub Actions. El flujo compila y despliega automáticamente tras superar los controles. Se mantiene este inicio manual como confirmación de publicación.
6. Esperar validate y deploy exitosos; verificar el enlace real, recarga, catálogo y enlaces compartidos. Un push por sí solo valida y no sustituye la confirmación de despliegue.

Vite usa base relativa ./, comprobada sirviendo en /aulaQuiz/. Los enlaces internos usan parámetros en la página principal y no necesitan reglas SPA adicionales. No cambiar la visibilidad del repositorio ni eliminar su historial para actualizar.

Guías: GUIA_ESTUDIANTES.md y GUIA_ACTUALIZACION_CUESTIONARIOS.md. La lista de aprobaciones pendientes y el informe de seguridad explican los límites del contenido y del almacenamiento local.
