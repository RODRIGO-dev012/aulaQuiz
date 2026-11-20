# Incorporación AulaQuiz V1.4

## Alcance y contenido

Se incorpora exclusivamente el paquete autorizado AULAQUIZ_CANDIDATAS_REVISION_DOCENTE_V1_4.zip, SHA-256 6fdd24a10e43a827756441800e0097e91c6f3a2372bf30e02d493eb56c1bec54. Sus siete hashes individuales y el esquema se verificaron antes de copiar contenido. La autorización comunicada por el propietario permite práctica con claves propuestas revisadas; no representa certificación docente u oficial. Evidencia pública: publicacion/AUTORIZACION_V1_4.md y manifiesto por banco/versión/ID/hash.

| Banco | Preguntas |
|---|---:|
| Química Orgánica | 98 |
| Física | 98 |
| Matemáticas | 93 |
| Ciencias Sociales N.º 1 | 2 |
| Ciencias Sociales N.º 2 | 4 |
| Ciencias Sociales N.º 3 | 4 |
| Ciencias Sociales N.º 4 | 2 |
| Total real | 301 |

Las 4 demostraciones / 25 preguntas están separadas del catálogo principal. Total técnico disponible 326 preguntas, sin confundir demostraciones con originales reales. Las 174 originales excluidas (incluyen las 79 apartadas inicialmente) siguen fuera del código publicado. Se conservaron las 475 originales, importaciones y observaciones en el proyecto privado, además de un respaldo del catálogo anterior y del commit publicado V1.3.

## Cambios

Inicio y catálogo priorizan los siete bancos reales. Se muestran avisos de claves propuestas en catálogo, configuración y práctica. Se mantienen cantidades todas/personalizadas, modalidades de aprendizaje, práctica/simulacro, mezcla independiente, cronómetro, vistas clásica/interactiva, historial, perfiles y enlaces/WhatsApp. Los intentos anteriores conservan su instantánea y nota; las preguntas idénticas conservan aprendizaje al cambiar una versión reducida del banco. Si cambian texto o clave, su progreso no se reutiliza como si fueran idénticas.

El control de publicación exige los 301 IDs exactos, autorización de práctica verificable y ausencia de los 174 excluidos, tanto en fuente como en dist. Rechaza autorizaciones revocadas, alcance distinto, evidencia alterada y certificaciones falsas. No se distribuyen importaciones, revisiones, datos de alumnos, ZIP ni credenciales.

## Validación

Se preservan 220 casos anteriores y se añaden 30 unitarios y 45 de navegador: 295 casos únicos en el proyecto completo. La fuente pública ejecuta 137 unitarios + 80 Playwright históricos + 45 Playwright reales = 262. Los 17 académicos privados, 8 del normalizador y 8 de revisión local permanecen privados.

La transición del catálogo obliga a ejecutar los 80 recorridos históricos con su fixture original de demostraciones: --mode baseline escribe artifacts/baseline-dist, sin sobrescribir dist real. La prueba privada que verificaba el antiguo catálogo vacío consulta ahora su respaldo histórico; las pruebas nuevas verifican el catálogo real actual. Se conservan las demás aserciones. No se desactivaron validaciones.

TypeScript y build de producción aprobados. El bundle principal creció por el contenido autorizado y emite aviso de tamaño (>500 kB sin comprimir), sin impedir la compilación; no se ha ocultado el aviso. Los recursos KaTeX se sirven localmente. Las fórmulas, símbolos y alternativas de las 301 preguntas tienen pruebas de renderizado sin errores KaTeX.

Incidencias de validación local: dos cierres de Chrome antes de abrir página, durante suites simultáneas, quedaron registrados. Sus casos pasaron aislados; se secuencian las suites. Se corrigió la preparación de directorio temporal de las nuevas pruebas para checkout limpio. La evidencia final de CI y de la web se añadirá al terminar el despliegue.

## Publicación y seguimiento

Repositorio: https://github.com/RODRIGO-dev012/aulaQuiz

URL: https://rodrigo-dev012.github.io/aulaQuiz/

Se utiliza únicamente publicacion/despliegue-v1.3, con push normal a main. Actions ejecuta la matriz completa y vuelve a verificar dist después de las pruebas baseline. GitHub Pages funciona con base /aulaQuiz/ y sirve la aplicación sin depender de la computadora del propietario.

Las recuperaciones de Sociales y propuestas de corrección se documentan por separado en revisiones/v1.4; no amplían la publicación de 301 preguntas. Requieren revisión y posterior autorización. No se implementaron autenticación, backend, ranking, panel docente ni REA.
