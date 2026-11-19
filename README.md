# AulaQuiz V1.3

**Web pública verificada:** [Abrir AulaQuiz](https://rodrigo-dev012.github.io/aulaQuiz/) · [Repositorio](https://github.com/RODRIGO-dev012/aulaQuiz) · [Actions aprobado](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/44625819246).

Plataforma estática para practicar y realizar simulacros. Catálogo: **4 cuestionarios de demostración / 25 preguntas** (Sociales 10, Lenguaje 5, Matemáticas 5, Biología 5). No se publicaron bancos reales pendientes. El progreso permanece en el navegador y dispositivo, sin autenticación ni sincronización remota. Las claves estáticas pueden inspeccionarse: es una herramienta de estudio, no un sistema seguro de exámenes oficiales.

## Validación

Origen exclusivo: ZIP saneado autorizado, 50 archivos comprobados contra manifiesto y SHA-256 1cfbd68cba75af3fc1ad51838d42be5d19daf1abc2d12875b30bb97387f8aad7. Se aplicó una corrección CSS de tablet detectada en Linux y se actualizó el workflow con autorización explícita para futuros despliegues automáticos. No se copiaron importaciones, revisiones ni resultados privados.

Línea base privada conservada y revalidada: **220 casos únicos aprobados**. Esta fuente pública ejecuta **107 unitarias + 80 Playwright = 187**, sin material académico privado. La URL real aprobó además los 80 recorridos de navegador en cinco resoluciones. Las repeticiones entre entornos no se cuentan como casos nuevos. TypeScript y build correctos; sin fallos finales. Detalles y corrección del primer CI en INFORME_PUBLICACION_V1_3.md.

## Ejecutar

Node.js 22.12+ y npm. Ejecutar npm ci y npm run dev. Validar con npm test, npm run typecheck, npm run build, npm run verify:production y npm run test:e2e. En PowerShell usar npm.cmd si npm.ps1 está restringido. Playwright local usa Chrome y CI instala Chromium.

Se conservan práctica/simulacro, cronómetro opcional, cantidades disponibles/personalizadas, mezcla independiente, selección aleatoria/nuevas/refuerzo/progresiva, perfiles locales, historial, estadísticas, revisión y estilos clásico/interactivo. Los enlaces compartidos validan sus parámetros y excluyen respuestas, perfiles e historial. La copia personal JSON se importa como perfil nuevo sin sobrescribir resultados.

## Futuras actualizaciones automáticas

1. Trabajar en este clon saneado y ejecutar git pull --ff-only. No subir la carpeta privada completa ni sus ZIP.
2. Hacer cambios autorizados, revisar git diff/git status y ejecutar las validaciones locales. Mantener la aprobación por versión/SHA-256 de los bancos en publicacion/APROBACIONES_BANCOS.json.
3. Hacer commit y git push origin main. Actions instala dependencias, ejecuta las 187 pruebas públicas, verifica TypeScript, compila y escanea el contenido. **Solo si todo pasa despliega automáticamente** en Pages. Los pull requests validan sin desplegar.
4. Esperar validate y deploy exitosos y comprobar el enlace real. No usar force push ni desactivar controles para resolver un fallo.

Pages usa GitHub Actions. Variables autorizadas: AULAQUIZ_PAGES_APPROVED=true y AULAQUIZ_AUTO_DEPLOY=true. Para suspender solo el despliegue automático, cambiar la segunda a false en Settings → Secrets and variables → Actions → Variables. La alternativa manual sigue disponible en Actions → Run workflow → main → confirm_publication=true. Ambos caminos requieren autorización de Pages y todas las validaciones. Un commit documental marcado [skip ci] no ejecuta ni publica; no debe utilizarse para cambios de aplicación.

Vite usa base relativa ./, comprobada bajo /aulaQuiz/. Los enlaces usan parámetros en la página principal y admiten recarga directa. El alojamiento se sirve desde GitHub Pages y no depende de la computadora del propietario.

Guías: GUIA_ESTUDIANTES.md y GUIA_ACTUALIZACION_CUESTIONARIOS.md. INFORME_PUBLICACION_V1_3.md, INFORME_SEGURIDAD_V1_3.md y LISTADO_APROBACIONES_PENDIENTES.md documentan la entrega y sus límites.
