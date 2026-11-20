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


## Resultado de incorporación V1.4

- Commit de aplicación desplegado: 9add340 (conteos reales por materia corregidos después de 46f7acf). [Actions final aprobado](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/44664146216): validate y deploy exitosos, 137 unitarias + 80 Playwright históricos + 45 Playwright reales = 262 pruebas públicas. No hay fallos finales del CI.
- Proyecto completo: 154 unitarias (incluidas 17 académicas privadas), 8 del normalizador, 80 recorridos históricos, 8 de revisión local y 45 recorridos reales = 295 casos únicos aprobados. Se conserva la base de 220 y se añaden 75. Dos cierres locales de Chrome previos a abrir página se resolvieron repitiendo sus casos aislados; los 80 históricos también pasaron completos en CI.
- TypeScript correcto, build con salida 0 y control de contenido aprobado: 7 bancos reales/301 preguntas + 4 demos/25. Aviso de tamaño del bundle registrado, sin error de compilación.
- HTTPS público verificado: HTTP 200, los 301 IDs autorizados presentes y 0 de los 174 excluidos en los assets. El JavaScript publicado index-3d6jJWsZ.js corresponde a la compilación final del clon saneado. La comprobación Playwright de la URL real aprobó 45/45 recorridos.
- Integridad: 1.204 alternativas conservadas; 80 preguntas contienen notación científica identificable y todas las preguntas/alternativas pasan el renderizado. El paquete no incluye imágenes de pregunta; no se inventaron recursos. Los hashes preservan 60 de los 61 archivos protegidos del inventario V1.3; el cambio autorizado es src/data/real-banks.json y su catálogo anterior se conserva separado. Las 475 originales y 79 apartadas siguen intactas.
- Compatibilidad: las 289 preguntas científicas coincidentes con la revisión local anterior mantienen igual contenido, tema, opciones y clave; sus instantáneas y progreso se conservan. Ninguna calificación histórica se modifica retroactivamente.

## Revisión independiente y pendientes

De las 146 pendientes de Sociales se preparan 43 recuperaciones propuestas (4/15/21/3 por banco), fuera del catálogo público. Otras 103 de ese grupo siguen sin recuperar; 6 ya tienen propuestas de corrección. En total existen 34 propuestas derivadas, que cubren las 28 alertas previas y 6 observaciones nuevas. Partición sin doble conteo de las 174 excluidas: 43 recuperaciones no autorizadas para publicación + 34 propuestas de corrección + 97 otras pendientes. Las 79 apartadas son un subconjunto conservado, no 79 preguntas adicionales.

Los informes privados incluyen fuentes y decisiones por alternativa, 54 observaciones específicas de seguimiento, un inventario de duplicados sin eliminación automática y las 11 versiones derivadas validadas contra el esquema. Las fuentes inaccesibles se registran sin eludir restricciones. La revisión es asistida, sin firmas o certificación docente. Se requiere revisión humana y nueva autorización antes de publicar recuperaciones o correcciones.

Material privado de entrega: INFORME_REVISION_SOCIALES_V1_4.md y revisiones/v1.4/AULAQUIZ_REVISION_INDEPENDIENTE_V1_4.zip. Estos contenidos no forman parte del repositorio público.

## Alcance de comprobación académica del paquete

La incorporación coteja las 301 claves propuestas e identificadores con la segunda revisión independiente V1.3 y verifica íntegros textos y alternativas del paquete. No se realizó una tercera revisión académica exhaustiva de las 301 ni se certifican sus claves. Las pruebas de calificación demuestran que el motor puntúa consistentemente según esas claves al mezclar; no transforman una propuesta en respuesta oficial. La nueva investigación V1.4 se documenta de manera independiente para las recuperaciones de Sociales y las propuestas derivadas.


## Verificación final de la URL pública

**45/45 recorridos aprobados directamente contra https://rodrigo-dev012.github.io/aulaQuiz/**, sin omisiones, reintentos automáticos ni casos inestables. Resoluciones 1920×1080, 1366×768, 768×1024, 390×844 y 360×800. Se comprobaron los siete bancos, cantidades todas/personalizadas y límites, alternativas/IDs, práctica/simulacro, vistas clásica/interactiva, calificación tras mezcla, orden persistente después de recargar, historial, perfiles independientes, nuevas consecutivas, recuperación progresiva de errores y enlaces directos/WhatsApp. No se enviaron mensajes ni respuestas a servicios externos. Las aserciones de consola/HTTP y desbordamiento pasaron.

Se generaron **155 capturas de la aplicación publicada** en publicacion/despliegue-v1.3/artifacts/v1.4/capturas/, agrupadas por resolución; galería en publicacion/despliegue-v1.3/artifacts/v1.4/GALERIA_CAPTURAS.html. Incluyen Inicio, Catálogo, Historial y configuración/cuestionario/resultados/compartir de cada banco. El proyecto privado tiene otras 155 capturas locales en artifacts/v1.4/capturas/. No se subieron capturas ni historiales al repositorio.

Resumen reproducible privado: artifacts/v1.4/RESUMEN_PRUEBAS_V1_4.json; evidencia del CI en actions-despliegue-final.log y github-despliegue-final.json; auditoría HTTPS en VERIFICACION_WEB_PUBLICA.json. El commit de documentación posterior conserva el código de aplicación probado y desplegado (9add340).

**Estado final:** 7 bancos reales disponibles / 301 preguntas autorizadas con claves propuestas no oficiales; 4 demos separadas / 25 preguntas; 174 originales excluidas; 475 originales y 79 apartadas conservadas. Pruebas y compilación aprobadas, sin bloqueos de acceso o despliegue. Pendiente exclusivamente la revisión/autorización académica de versiones adicionales y las correcciones descritas.
