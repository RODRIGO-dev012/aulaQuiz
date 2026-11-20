# AulaQuiz V1.4

[Abrir AulaQuiz](https://rodrigo-dev012.github.io/aulaQuiz/) · [Repositorio](https://github.com/RODRIGO-dev012/aulaQuiz) · [GitHub Actions aprobado](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/44664146216)

Herramienta de preparación académica con **7 cuestionarios reales / 301 preguntas**: Química Orgánica 98, Física 98, Matemáticas 93 y Ciencias Sociales N.º 1–4: 2, 4, 4 y 2. Las **claves son propuestas revisadas, no oficiales ni certificadas**. La autorización de reutilización y publicación comunicada por el propietario se registra en publicacion/AUTORIZACION_V1_4.md; no se inventan firmas ni aprobación docente de claves. Las 4 demostraciones / 25 preguntas permanecen en una sección independiente.

Perfiles, intentos, resultados y progreso se conservan exclusivamente en ese navegador/dispositivo. No hay autenticación remota ni sincronización. Se mantienen práctica/simulacro, cronómetro, cantidades personalizadas/todas, mezcla independiente de preguntas y alternativas, nuevas/refuerzo/progresivo, revisión, estadísticas, vistas clásica/interactiva y enlaces directos/WhatsApp. Compartir abre un enlace; no envía mensajes automáticamente. Las claves estáticas son inspeccionables: esta plataforma sirve para estudiar.

## Ejecutar y validar

Node.js 22.12+ y npm. En PowerShell usar npm.cmd si npm.ps1 está restringido.

~~~powershell
npm ci
npm test
npm run typecheck
npm run build
npm run test:e2e
npm run test:e2e:real
npm run verify:production
npm run dev
~~~

La fuente pública ejecuta 137 pruebas unitarias, 80 recorridos históricos con sus datos de demostración originales y 45 recorridos adicionales sobre los 301 contenidos reales de producción (cinco tamaños: 1920×1080, 1366×768, 768×1024, 390×844 y 360×800). Las pruebas históricas usan --mode baseline en artifacts/baseline-dist; **dist siempre contiene la compilación real autorizada**. El proyecto privado conserva también las 17 pruebas académicas, 8 del normalizador y 8 de la revisión local: línea base 220 + 75 casos nuevos = 295 casos únicos. No se suman repeticiones entre entornos.

## Actualizar automáticamente

1. Trabajar exclusivamente en este clon saneado. Ejecutar git pull --ff-only antes de modificarlo; no copiar todo el proyecto privado ni sus ZIP.
2. Revisar cambios, pruebas y contenido. Cada banco requiere autorización de su versión exacta y hash en publicacion/APROBACIONES_BANCOS.json. No basta modificar un hash: las 174 preguntas excluidas están bloqueadas y la autorización de práctica actual abarca únicamente los 301 IDs candidatos.
3. Hacer commit y git push origin main. Actions instala dependencias, ejecuta las 262 pruebas públicas, comprueba TypeScript, compila y verifica contenido. Solo al aprobar todo despliega en GitHub Pages.
4. Comprobar validate/deploy y la URL pública real. Los pull requests validan sin publicar. Nunca usar force push ni desactivar controles para resolver un fallo.

Variables autorizadas: AULAQUIZ_PAGES_APPROVED=true y AULAQUIZ_AUTO_DEPLOY=true. Para suspender futuros despliegues automáticos, cambiar la segunda a false. Sigue disponible la ejecución manual con confirm_publication=true. [skip ci] se reserva para documentación posterior a una validación: nunca cambios de aplicación.

Vite usa base relativa ./, compatible con /aulaQuiz/. Los enlaces se resuelven en la página principal con parámetros; admiten recarga directa y no contienen perfiles, historial ni respuestas. GitHub Pages sirve la aplicación sin depender de la computadora del propietario.

Ver INFORME_INCORPORACION_V1_4.md, PROGRESO_AULAQUIZ.md y GUIA_ACTUALIZACION_CUESTIONARIOS.md. Las importaciones originales, preguntas apartadas y revisiones privadas no se distribuyen en este repositorio.

Validación de publicación V1.4: Actions final aprobado, commit de aplicación 9add340. HTTP 200 y presencia de las 301 preguntas reales comprobados en la web pública. El informe de incorporación conserva el detalle de pruebas y exclusiones.

Playwright sobre la **URL pública real**: 45/45 casos aprobados en escritorio, laptop, tablet y dos celulares. Capturas e informe detallado disponibles en el proyecto privado, sin publicar datos de estudiantes.
