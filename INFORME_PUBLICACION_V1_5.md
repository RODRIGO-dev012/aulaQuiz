# Publicación AulaQuiz V1.5


## Verificación pública final

[Aplicación pública](https://rodrigo-dev012.github.io/aulaQuiz/) y [repositorio](https://github.com/RODRIGO-dev012/aulaQuiz). [Actions aprobado](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/44687103582), commit de aplicación 60ea6df. Playwright sobre la URL pública: 55/55 aprobados, sin fallos, omisiones ni reintentos; cinco resoluciones. Se comprobaron además cinco recorridos de refuerzo con capturas y comparación del ID de la pregunta incorrecta. No se detectaron errores de consola, HTTP ni desbordamientos.

190 capturas públicas: artifacts/v1.5/capturas-publicadas/{1920x1080,1366x768,768x1024,390x844,360x800}/. Índice visual: artifacts/v1.5/GALERIA_CAPTURAS_PUBLICADAS.html. Las 180 capturas locales se conservan aparte en capturas-locales. Los JSON de Playwright y RESULTADO_FINAL.json guardan evidencia, sin sumar ejecuciones repetidas como casos únicos.

Limitaciones: pruebas en Chrome/Chromium con resoluciones emuladas, sin dispositivos físicos ni Safari/iOS real; bundle principal con aviso de tamaño. Las claves continúan propuestas, no oficiales ni certificadas. La revisión privada adicional no se publica. No hay bloqueos técnicos de despliegue.

## Actualizaciones futuras

Mantener el clon saneado publicacion/despliegue-v1.3. Hacer pull --ff-only, revisar cambios y autorización exacta de contenido, ejecutar unitarios, TypeScript, build, las dos suites de navegador y verify:production. Commit y push normal a main ejecutan el mismo flujo automático; Pages solo se despliega después de aprobar todo. Verificar Actions y repetir Playwright sobre la URL pública. Nunca copiar toda la carpeta privada ni sus ZIP. Los cambios de documentación posteriores pueden usar [skip ci]; los cambios de aplicación necesitan validación completa.
