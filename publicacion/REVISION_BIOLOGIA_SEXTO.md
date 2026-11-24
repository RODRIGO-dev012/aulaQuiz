# Biología Sexto: cierre de exclusiones y límites académicos

Fecha: 24/11/2026. La revisión sigue siendo preliminar, propuesta y no certificada por docentes. La autorización de publicación para práctica no equivale a aprobación académica oficial ni a cotejo textual exhaustivo del PDF escolar no entregado.

## Exclusiones adicionales autorizadas

| ID | Motivo | Resolución |
| --- | --- | --- |
| BIO-F1-040 | Definición de era geológica demasiado general para distinguir Paleozoico de Cenozoico entre las opciones. | Excluida preventivamente por autorización expresa. |
| BIO-F1-031 | Descripción genérica de Heimlich que compite con «Primeros auxilios» y no delimita alcance. | Excluida preventivamente por autorización expresa. |
| BIO-F2-070 | Definición de Heimlich sin delimitar edad ni estado de consciencia; no debe entenderse como pauta universal de actuación. | Excluida preventivamente por autorización expresa. |
| BIO-F2-012 | Par conceptual del Paleozoico; se retira por consistencia con BIO-F1-040, sin declarar una nueva clave ni una nueva respuesta incorrecta. | Excluida preventivamente por instrucción expresa del propietario. |

Estas cuatro se suman a las 24 exclusiones iniciales: 28 en total, 14 por formulario. Quedan **86 preguntas por formulario, 172 de Biología y 832 preguntas reales**. Los tres bloqueos del ensayo anterior quedan resueltos por retirada; no se corrigen silenciosamente ni se sustituyen preguntas. No se han detectado nuevos bloqueos en la revisión técnica de la versión filtrada; eso no constituye una certificación científica exhaustiva.

Los registros completos se conservan fuera del banco estudiantil, en los archivos de entrada originales y en `revisiones/biologia-sexto/EXCLUSIONES_ADICIONALES.json`, ignorado y no incluido en el artefacto público. Los motivos y hashes de cada registro están en `INTEGRACION_BIOLOGIA_SEXTO.json`; el commit 6240bb9 conserva el ensayo histórico.

El contraste de la ambigüedad geológica se apoya en que la diversificación abarca distintas eras, como documenta [National Park Service](https://home.nps.gov/subjects/fossils/diversification-of-life.htm). La observación sobre la opción Cenozoico es una inferencia de revisión, no una clave alternativa aprobada. Las [guías de Cruz Roja](https://guidelines.redcross.org/guidelines-database/foreign-body-airway-obstruction/) y [AHA 2025](https://newsroom.heart.org/news/updated-cpr-guidelines-tackle-choking-response-opioid-related-emergencies-and-a-revised-chain-of-survival) diferencian contextos de obstrucción; el banco no se presenta como formación práctica ni protocolo de primeros auxilios.

## Precisiones no bloqueantes que se conservan

- Homocigoto, BIO-F1-100 / BIO-F2-063: conviene precisar «alelos idénticos en un locus» en una revisión docente posterior; se conserva el texto recibido. Referencia: [NHGRI](https://www.genome.gov/genetics-glossary/homozygous).
- Medicina natural, BIO-F1-081 / BIO-F2-072: identifica una denominación del material; no acredita eficacia clínica ni sustituye atención sanitaria. La [OMS](https://www.who.int/news-room/questions-and-answers/item/traditional-medicine) exige evidencia y evaluación de seguridad y calidad. No se añaden recomendaciones terapéuticas.
- Algunos distractores conservan formulaciones imprecisas ya advertidas en la relación de exclusiones. Siguen siendo alternativas incorrectas, no explicaciones correctas del programa. No se afirma revisión docente exhaustiva de cada distractor.
- Falta el PDF escolar de la metadata. No se acredita transcripción literal ni verificación individual por páginas. La autorización mantiene las claves como propuestas, no oficiales ni certificadas.

## Duplicados, similitud y distribución

Cero enunciados exactamente duplicados tras normalizar entre las 832 preguntas. Ambos formularios conservan 86 conceptos comunes en sentidos distintos de pregunta; no se eliminan por similitud temática. Hay 895 pares candidatos mecánicos por Jaccard ≥0,55 o respuesta propuesta idéntica; no son 895 duplicados confirmados ni una revisión humana individual completada.

Distribución definitiva de claves recibidas tras las exclusiones: F1 A=22, B=21, C=23, D=20; F2 A=27, B=20, C=19, D=20. Máxima racha de la misma letra: 5 y 4. No se usa ese dato como prueba estadística de aleatoriedad. La mezcla por intento conserva las claves por ID y texto y se verifica funcionalmente.
