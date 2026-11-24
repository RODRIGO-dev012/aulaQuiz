# Plan autorizado de publicación — Biología Sexto

El propietario autorizó publicar el banco definitivo de **172 preguntas**, después de excluir las cuatro indicadas, únicamente si todas las validaciones son satisfactorias y no aparecen nuevos bloqueos. No hace falta reiterar esa autorización; su alcance y hashes constan en `publicacion/AUTORIZACION_BIOLOGIA_SEXTO_V1_7.md`.

1. Conservar las 660 anteriores y retirar 28 preguntas de Biología del banco estudiantil. Mantener registros y motivos fuera del artefacto, sin inventar reemplazos ni cambiar claves.
2. Ejecutar unitarias, typecheck, compilación normal y validaciones de contenido. Ejecutar Playwright headless secuencial, un worker, primero regresión histórica y luego catálogo real. Si aparece un fallo, corregir y verificar; no publicar con errores pendientes ni nuevos bloqueos.
3. Revisar todo el diff y los archivos preparados, comprobar que no incluyen credenciales, temporales, respaldos ni materiales de importación. Confirmar hashes y autorización exactamente coincidentes entre disco y Git.
4. Hacer fetch de main, detenerse ante cambios incompatibles o inesperados. Registrar la referencia de recuperación `820fb12e4517a3b38b85d1c578be258d7e420376` y la rama local `recovery/pre-biologia-sexto-20261124` antes de la integración.
5. Crear el commit en `feature/biologia-sexto`, integrar en main mediante fast-forward si sigue siendo posible y hacer push normal a `RODRIGO-dev012/aulaQuiz`. Nunca forzar, sobrescribir cambios remotos ni desactivar controles.
6. Usar el workflow existente de GitHub Pages. Verificar que `validate` y `deploy` terminen correctamente y que se sirva el artefacto del commit esperado.
7. Validar la URL pública con la suite de bancos reales headless y un worker: once bancos, 832 preguntas, 86+86 de Biología, exclusiones, puntuaciones, progreso, móviles y escritorio, consola y HTTP. Comparar además recursos públicos y hashes con el artefacto validado.
8. Guardar el informe final con commit, Actions, URL, recuperación, resultados e incidencias. Un cierre posterior solo de documentación puede usar `[skip ci]`, identificando claramente el commit de código servido. Detenerse al finalizar.

No se ejecutan pruebas locales de AulaQuiz en paralelo, para reducir carga durante las pruebas de V2. No se modifica V2, investigación ni PostgreSQL ajeno, no se contratan servicios ni se sincronizan carpetas automáticamente. La fuente oficial sigue siendo GitHub main, en el clon de publicación.
