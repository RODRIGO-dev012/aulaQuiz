# Incorporación AulaQuiz V1.5

Se incorporan 80 candidatas autorizadas: 381 preguntas reales en siete bancos, con las 301 anteriores intactas. Química Orgánica, Física y Matemáticas: 100 cada uno; Sociales 1–4: 8, 31, 32 y 10. Se mantienen además cuatro demostraciones separadas con 25 preguntas.

## Integridad y alcance

Paquete privado SHA-256: 59e625fe1956f470c508e3ebe0687c2d2d22cc5f6e661c4e74fa7fe935944ab1. Sus once hashes internos coinciden; los siete bancos satisfacen el esquema existente y el importador. Se conservan originales, versiones anteriores y respaldo V1.4. Los 80 IDs añadidos tienen alternativas y claves propuestas válidas estructuralmente; ninguna se presenta como clave oficial o certificada.

Las incorporaciones se componen de 44 recuperaciones literales y 36 adaptaciones de estudio (29 revisadas anteriormente y siete nuevas). Las adaptaciones tienen identificadores propios y aviso visible. Su trazabilidad completa permanece privada. No se inventa equivalencia con la pregunta original.

El manifiesto autoriza versiones exactas, IDs y hashes, vinculado a publicacion/AUTORIZACION_V1_5.md. Impide publicar las 94 preguntas pendientes y las 36 versiones originales sustituidas. Los identificadores de bancos se conservan; el aprendizaje de preguntas idénticas y las instantáneas de intentos históricos siguen válidos. Una adaptación no hereda el dominio del original.

## Pruebas

Se conserva la línea base de 295 casos y se añaden 15 unitarios y 10 de navegador: 320 casos únicos. Proyecto privado: 169 unitarios, ocho del normalizador, ocho de revisión local, 80 históricos y 55 de bancos reales. Fuente pública: 152 unitarios + 80 históricos + 55 reales = 287. Los recorridos históricos conservan su fixture; los 30 casos de V1.4 verifican explícitamente su catálogo original de 301 preguntas. No se eliminan aserciones.

Los casos nuevos califican los siete bancos completos después de mezclar, renderizan fórmulas y símbolos, verifican IDs/duplicados y simulan dos intentos de 50 nuevas en cada banco científico. Verifican agotamiento, perfiles independientes, importación/exportación, persistencia e historial de V1.4. En navegador se comprueban las cinco resoluciones solicitadas, avisos de adaptación y dos intentos consecutivos de 50.

TypeScript y build aprobados localmente. Vite mantiene el aviso de tamaño del bundle; no impide la compilación ni se oculta. Se corrigió un falso positivo del detector de IDs excluidos: una versión adaptada comienza por el ID original; se verifica ahora el identificador completo de pregunta y se conserva el bloqueo por prefijo para bancos privados. La regresión que detecta contenidos prohibidos sigue activa.

## Publicación

Se publica únicamente desde publicacion/despliegue-v1.3. El flujo existente instala, prueba, comprueba TypeScript, compila, verifica contenido y despliega solo si todo aprueba. No se copian revisiones privadas, ZIP ni registros pendientes. Base /aulaQuiz/ y mismo enlace público.

La revisión académica adicional se entrega en un paquete privado independiente y no aumenta las 381 publicadas. No se añaden funcionalidades ajenas a esta fase. El resultado final de CI y de la verificación pública se adjunta después del despliegue.

## Evidencia de ejecución

- Root: 169/169 unitarios; normalizador 8/8; revisión local 8/8; históricos 80/80; bancos reales 55/55. Total 320 casos únicos, conservando los 295 anteriores.
- Clon saneado: 152/152 unitarios, TypeScript y build aprobados. La primera ejecución simultánea con navegador agotó el límite de cinco segundos en diez pruebas de procesos; al repetir sin esa carga, pasaron las 152 sin cambiar aserciones ni ampliar tiempos.
- [GitHub Actions 44687103582](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/44687103582): 152 unitarios + 80 históricos + 55 reales = 287 públicos, sin fallos; validate y deploy exitosos. Commit desplegado: 60ea6df929cb370e2937ce2a19fb39c0c1767b0b.
- HTTPS público 200; los 381 IDs presentes, ninguno de los 94 pendientes ni 36 originales sustituidos como identificadores completos. JavaScript público idéntico por SHA-256 al build del clon: ef99c4ae2f2e7ff8754296e3b00c91553e338294152dc39d0c61fb6b8096ed40.
- Cero grupos de enunciados idénticos normalizados entre los siete bancos. Se preservaron los 60 archivos originales protegidos del inventario; solo cambió el catálogo autorizado de producción.

Los 55 recorridos públicos terminaron satisfactoriamente.

## Verificación pública final

[Aplicación pública](https://rodrigo-dev012.github.io/aulaQuiz/) y [repositorio](https://github.com/RODRIGO-dev012/aulaQuiz). [Actions aprobado](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/44687103582), commit de aplicación 60ea6df. Playwright sobre la URL pública: 55/55 aprobados, sin fallos, omisiones ni reintentos; cinco resoluciones. Se comprobaron además cinco recorridos de refuerzo con capturas y comparación del ID de la pregunta incorrecta. No se detectaron errores de consola, HTTP ni desbordamientos.

190 capturas públicas: artifacts/v1.5/capturas-publicadas/{1920x1080,1366x768,768x1024,390x844,360x800}/. Índice visual: artifacts/v1.5/GALERIA_CAPTURAS_PUBLICADAS.html. Las 180 capturas locales se conservan aparte en capturas-locales. Los JSON de Playwright y RESULTADO_FINAL.json guardan evidencia, sin sumar ejecuciones repetidas como casos únicos.

Limitaciones: pruebas en Chrome/Chromium con resoluciones emuladas, sin dispositivos físicos ni Safari/iOS real; bundle principal con aviso de tamaño. Las claves continúan propuestas, no oficiales ni certificadas. La revisión privada adicional no se publica. No hay bloqueos técnicos de despliegue.
