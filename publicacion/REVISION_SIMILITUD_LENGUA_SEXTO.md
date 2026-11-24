# Revisión de similitud — Lengua Sexto

Las 185 preguntas se conservan íntegramente. No hay IDs ni enunciados exactamente duplicados tras normalizar mayúsculas, acentos y puntuación. No se han inventado claves ni correcciones académicas.

El análisis automático comparó las nuevas preguntas entre sí y con las 475 existentes. Marcó 75 pares por Jaccard de palabras ≥ 0,55 o respuesta propuesta idéntica. La lista íntegra está en `INTEGRACION_LENGUA_SEXTO.json`. Este criterio produce falsos positivos: «¿Qué son los alcanos?» y «¿Qué son los indigenismos?» comparten estructura, pero preguntan conceptos distintos. Otros pares contrastan deliberadamente categorías: adverbios de lugar/modo, método inductivo/deductivo o artículo determinado/indeterminado. No se consideran duplicados por ese solo criterio.

Una lectura de los 185 enunciados y sus respuestas propuestas identifica estos grupos que repiten o se acercan mucho al mismo concepto, incluyendo pares que no superan el umbral léxico. Son observaciones editoriales, no una certificación de las respuestas:

| IDs | Concepto compartido |
| --- | --- |
| F1-010 / F2-070 | Préstamo lingüístico |
| F1-014 / F2-014 | Enfoque cualitativo |
| F1-017 / F1-057 / F2-093 | Edad y uso juvenil de jergas |
| F1-025 / F2-025 | Artículos determinados |
| F1-026 / F2-082 | Investigación descriptiva |
| F1-028 / F2-066 | Observación sin intervención |
| F1-042 / F2-042 | Recursos cualitativos de recopilación |
| F1-043 / F2-061 | Artículo neutro «lo» |
| F1-044 / F2-090 | Elementos de referencias |
| F1-047 / F2-029 | Discriminación lingüística |
| F1-050 / F2-030 | Ser + participio en voz pasiva |
| F1-054 / F2-038 | Informes técnicos |
| F1-055 / F2-055 | Organización sintáctica (relacionados) |
| F1-059 / F2-009 | Distancia de demostrativos, categorías distintas |
| F1-062 / F1-052 | Relación de variables en experimentación (relacionados) |
| F1-066 / F2-046 | Diario de campo |
| F1-067 / F2-047 | Intolerancia lingüística |
| F1-070 / F2-050 | Neologismos y necesidades lingüísticas |
| F1-075 / F2-007 / F2-075 | Registro profesional (relacionados) |
| F1-084 / F2-022 | Monografía |
| F1-090 / F1-016 / F2-016 | Citas largas/cortas, aspectos diferentes |
| F1-092 / F2-092 | Estudio de caso |
| F1-093 / F2-017 | Educación y variación lingüística |
| F1-099 / F2-039 | Coordinación disyuntiva |
| F1-038 / F2-084 | Tesis e hipótesis |

Estas reiteraciones permiten practicar el mismo contenido en formularios diferentes; también hay reiteraciones internas señaladas. Se mantienen las 185 según la solicitud y no se suman como preguntas eliminadas. No se detectó un conflicto técnico entre clave y texto de respuesta: en los 185 casos `opciones[clave_propuesta]` coincide exactamente con `respuesta_propuesta`.

Muchos enunciados dependen explícitamente del PDF/material escolar, que no forma parte de los dos archivos de entrada. Las fuentes registran `pagina_pdf: null`. No es posible cotejar de forma independiente su fidelidad a ese material ni certificar académicamente las claves con estas entradas. Por ejemplo, F2-074 está acotada al cuadro de técnicas («Rígidas o estructuradas»): no debe interpretarse como catálogo universal de tipos de entrevista. Se conserva sin correcciones y con la advertencia de revisión preliminar. Este informe debe revisarse antes de autorizar publicación; no se ha publicado contenido.
