# AulaQuiz V1.7

[Abrir AulaQuiz](https://rodrigo-dev012.github.io/aulaQuiz/) · [Repositorio](https://github.com/RODRIGO-dev012/aulaQuiz)

Siete cuestionarios de práctica con **475 preguntas**: Química Orgánica 100, Física 100, Matemáticas 100 y Ciencias Sociales N.º 1–4: 30, 48, 51 y 46. Las claves son **propuestas, no oficiales ni certificadas**. Hay 345 ejercicios literales y 130 adaptaciones identificadas en pantalla como material de estudio. Las cuatro demostraciones / 25 preguntas se muestran por separado.

V1.7 conserva las 381 preguntas V1.5 con sus IDs, textos, alternativas y claves sin cambios, y añade 94 adaptaciones. Los siete IDs de banco permanecen. Los perfiles, resultados históricos y el aprendizaje de preguntas idénticas se conservan en el navegador; una adaptación tiene ID propio y no hereda dominio del original.

Incluye práctica y simulacro, cronómetro opcional, cantidad personalizada o banco completo, mezcla independiente de preguntas y alternativas, selección de nuevas/refuerzo/progresivo, historial, estadísticas, vistas clásica/interactiva y copia personal JSON. Dos intentos de preguntas nuevas no repiten las ya respondidas; el agotamiento pide una decisión explícita.

Los datos personales se guardan exclusivamente en este navegador/dispositivo; no hay cuentas remotas ni sincronización. Exportar el progreso permite conservar una copia. Compartir abre un enlace, sin enviar mensajes automáticamente. Las claves del sitio estático son inspeccionables: AulaQuiz sirve para estudiar.

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

Las pruebas históricas conservan fixtures de sus versiones. El catálogo de producción permanece en dist; el ejecutor histórico compila su fixture en artifacts/baseline-dist. Playwright comprueba 1920×1080, 1366×768, 768×1024, 390×844 y 360×800. La suite V1.7 recorre las 475 preguntas y sus cuatro alternativas en cada resolución, además de los recorridos anteriores de modos, perfiles y persistencia.

## Publicar actualizaciones

Trabajar en el clon saneado publicacion/despliegue-v1.3. Antes de cambiarlo, ejecutar git pull --ff-only; revisar los cambios y el alcance exacto autorizado en publicacion/APROBACIONES_BANCOS.json y publicacion/AUTORIZACION_V1_7.md. No basta actualizar un hash: la autorización vincula versión, IDs y contenido propuesto sin inventar certificación docente.

Después de validar, commit y push normal a main ejecutan GitHub Actions. Solo se despliega si validate aprueba y se mantienen las variables AULAQUIZ_PAGES_APPROVED=true y AULAQUIZ_AUTO_DEPLOY=true. Los pull requests validan sin publicar. No usar force push ni desactivar controles para solucionar fallos. Verificar Actions y la URL real después de publicar.

No copiar revisiones, originales privados, ZIP, resultados personales, enlaces de puntuaciones, evidencias de Google Forms ni el registro privado de sesión al repositorio. Base relativa ./ compatible con /aulaQuiz/; los enlaces directos no llevan respuestas ni perfiles.

Ver INFORME_INCORPORACION_V1_7.md y HOJA_RUTA_AULAQUIZ_V2.md. La autorización cubre uso educativo de práctica; no implica claves oficiales ni revisión docente exhaustiva.

V1.7 publicada y verificada: [Actions 44753218333](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/44753218333), validate/deploy aprobados. 379 casos únicos locales, 346 públicos de CI y 35 recorridos repetidos sobre la URL real. Catálogo confirmado: 475 ejercicios reales +25 demostraciones separadas; 345 literales y 130 adaptados. Ver informe V1.7 para evidencias y límites.
