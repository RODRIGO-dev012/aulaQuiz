# Incorporación y revisión académica AulaQuiz V1.7

Fecha: 20 de noviembre de 2026 (America/La_Paz).

La versión de partida comprobada por HTTPS y GitHub Actions fue V1.5, con 381 preguntas. El paquete V1.7 reúne las propuestas de la fase intermedia V1.6 y cuatro adaptaciones nuevas. No se presupone un despliegue V1.6. La autorización expresa del propietario permite publicar 475 ejercicios como material de práctica, con claves propuestas, no oficiales ni certificadas.

## Catálogo y conservación

| Banco | Total | Literales | Adaptadas |
| --- | ---: | ---: | ---: |
| Química Orgánica | 100 | 98 | 2 |
| Física | 100 | 98 | 2 |
| Matemáticas | 100 | 93 | 7 |
| Sociales N.º 1 | 30 | 5 | 25 |
| Sociales N.º 2 | 48 | 19 | 29 |
| Sociales N.º 3 | 51 | 27 | 24 |
| Sociales N.º 4 | 46 | 5 | 41 |
| Total | 475 | 345 | 130 |

Son 1.900 alternativas con IDs únicos. Se conservan las 381 preguntas previamente publicadas sin cambios y se añaden 94 adaptaciones. Cada registro original tiene exactamente un ejercicio correspondiente en el catálogo final. Los siete IDs de banco permanecen. Las adaptaciones no sustituyen el texto de las instantáneas antiguas ni heredan el progreso del original. Los originales y las 79 inicialmente apartadas permanecen en revisión privada, sin sobrescritura.

SHA-256 del paquete recibido: 0d077178a39a4853133e283899d72cc99e1e207d7d2ccb0020d20613cae6bf57. Los once hashes internos coinciden y los siete bancos cumplen el esquema y las comprobaciones semánticas del importador. El manifiesto de publicación vincula los hashes exactos de los bancos y sus listas de IDs a la autorización V1.7.

## Cuatro adaptaciones nuevas y fuentes

- La pregunta sobre pérdidas soviéticas delimita la estimación a la tabla del [National WWII Museum](https://www.nationalww2museum.org/students-teachers/student-resources/research-starters/research-starters-worldwide-deaths-world-war): aproximadamente 24 millones de muertes civiles y militares. La explicación advierte que las estimaciones varían.
- La sucesión de Carlos Quintanilla en 1940 se contrasta con la [cronología del INE](https://www.ine.gob.bo/index.php/bolivia/aspectos-historicos/), que identifica la elección de Enrique Peñaranda.
- La presidencia posterior al Mamertazo se contrasta con esa [cronología del INE](https://www.ine.gob.bo/index.php/bolivia/aspectos-historicos/): Hugo Ballivián. Se pregunta por la consecuencia institucional, sin duplicar la definición del episodio.
- El nombre colonial de Sucre se atribuye expresamente a la [UNESCO](https://whc.unesco.org/en/list/566/): Ciudad de la Plata de la Nueva Toledo. La fuente incluye 1538, sin que este ejercicio pretenda resolver toda la discusión histórica sobre su fundación.

Las tres páginas se consultaron el 20/11/2026. Las alternativas de las cuatro adaptaciones distinguen de manera unívoca el dato delimitado por cada pregunta. Las explicaciones son propuestas educativas y no una certificación docente.

## Contraste y equivalencias

Los resultados de Google Forms se contrastaron localmente por ID y texto, separando las preguntas literales de las adaptaciones. La puntuación de una selección solo demuestra aceptación de esa selección en ese intento: no prueba que sea la única aceptada ni que sea académicamente correcta. Las claves no visibles se mantienen desconocidas. No se cambió ninguna clave publicada únicamente por aceptación de Google Forms. Las evidencias y comparaciones individuales no se publican.

No hay duplicados exactos tras normalizar los enunciados. Se revisaron 60 pares con semejanza léxica y 13 pares de Sociales con respuesta propuesta de igual texto: predominan parámetros matemáticos diferentes, conceptos opuestos, unidades distintas y fechas comunes de distintas entidades. Se conserva un solapamiento temático alto entre las preguntas sobre la presidencia breve de Natusch y la autoría del golpe de noviembre de 1979; preguntan atributos diferentes del mismo episodio. La cobertura final no equivale a 475 conceptos independientes. V2 puede agrupar por objetivos para equilibrar la selección sin eliminar IDs históricos.

## Validación técnica y publicación

Se conservan los casos anteriores con sus fixtures de versión y se añaden 24 pruebas unitarias más 35 recorridos de navegador (siete bancos en cinco resoluciones). Los nuevos recorridos comprueban en pantalla todos los enunciados, cuatro opciones y avisos de adaptación; responden por ID, califican el banco completo y comprueban el agotamiento de nuevas. Los anteriores cubren mezcla, simulacro, refuerzo, progreso, perfiles y exportación/importación.

El estado final de pruebas, Actions y comprobación pública se añade al cierre de la ejecución. No se implementan REA, backend, autenticación remota ni escaneo.

## Límites académicos

Cierre de cobertura y autorización de práctica no significan cierre de certificación académica. Las revisiones anteriores contienen limitaciones documentales y requieren revisión humana especializada si se desea certificar las claves. Las respuestas aceptadas por Forms no resuelven esas limitaciones. Las fuentes y formulaciones de las cuatro adaptaciones nuevas sí se contrastaron en esta fase; no se presenta como nueva auditoría documental exhaustiva de las otras 471 candidatas. Las cifras históricas se mantienen atribuidas a sus fuentes.


## Cierre técnico local V1.7

379 casos únicos aprobados, cero fallidos u omitidos: 193 unitarios, 8 del normalizador, 80 Playwright históricos, 90 Playwright de contenido real y 8 de revisión privada. Son 59 casos añadidos a la línea base V1.5 (24 unitarios y 35 de navegador). El clon saneado aprobó sus 176 unitarios y conserva el flujo de CI de 346 casos públicos; las repeticiones entre entornos no se suman.

Los 35 recorridos nuevos verificaron las 475 preguntas / 1.900 alternativas en cada una de las cinco resoluciones: 2.375 visualizaciones de preguntas y 9.500 alternativas, sin errores de renderizado, desbordamiento ni fallos de calificación. Las pruebas previas conservaron mezcla, simulacro, refuerzo, nuevas consecutivas, perfiles e historial.

Se corrigió la inferencia TypeScript de un array vacío en un fixture histórico manteniendo el manifiesto de su versión. Cinco pruebas de procesos del clon excedieron el límite de cinco segundos con dos suites de Chrome simultáneas; al repetir aisladas aprobaron las 176, sin cambiar aserciones ni ampliar tiempos. Las cuatro adaptaciones nuevas y el contenido anterior no necesitaron cambios académicos durante la integración. El despliegue y su comprobación pública se registran a continuación al finalizar.


## Publicación V1.7 verificada

[Aplicación pública](https://rodrigo-dev012.github.io/aulaQuiz/) y [GitHub Actions 44753218333](https://github.com/RODRIGO-dev012/aulaQuiz/actions/runs/44753218333). Commit de aplicación: 4188c6ab47039bcaec1f8c731169098c9e8f06d7. Validate y deploy finalizaron correctamente; el flujo público ejecuta 346 casos. HTTPS 200 confirma los 475 IDs reales y excluye los 130 originales sustituidos como identificadores completos. JavaScript público idéntico al build validado: SHA-256 19a7ca3b10da451d733c36d521d3fc0f81c2d8694713b124c2cb0374924016d1.

Playwright sobre la URL pública: 35/35 recorridos aprobados en cinco resoluciones, sin fallos, omisiones ni reintentos. Se comprobaron de nuevo las 475 preguntas y 1.900 alternativas en cada resolución, con calificación y agotamiento de nuevas. Las 90 capturas, 35 registros de cobertura y JSON de prueba permanecen en el proyecto privado; no se publican resultados personales ni evidencias de formularios. Estas ejecuciones repiten casos de la suite de 379 y no se suman como pruebas únicas.

Límites técnicos: Chrome/Chromium con resoluciones emuladas; dispositivos físicos y Safari/iOS real pendientes. Vite mantiene un aviso de tamaño del JavaScript principal (809,33 kB; 213,81 kB gzip), sin impedir el build. La optimización se contempla en V2. Continúa pendiente la certificación docente y documental exhaustiva de las claves; se publica únicamente material de práctica propuesto. No se implementaron REA, backend, autenticación remota ni escaneo.
