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
