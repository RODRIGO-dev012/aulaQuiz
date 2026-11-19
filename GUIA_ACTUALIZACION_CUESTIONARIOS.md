# Guía de actualización de cuestionarios — AulaQuiz V1.3

## Separar revisión y publicación

Los archivos de importación y revisión son privados y se conservan en el proyecto original. Los siete bancos originales contienen 475 preguntas y 1.900 alternativas. Hay 396 claves propuestas y 79 preguntas apartadas. Ninguna propuesta se considera clave oficial ni aprobación docente.

La fuente pública preparada contiene únicamente cuatro bancos de demostración, con 25 preguntas. Los datos reales de desarrollo no se incluyen en producción por superar pruebas técnicas.

## Preparar una versión de banco

1. Trabaja sobre una copia de la importación; conserva ID de banco, ID de pregunta, ID de alternativa, texto, numeración y fuente. No sobrescribas los originales.
2. Usa `ESQUEMA_BANCO_PREGUNTAS.json` y `examples/BANCO_EJEMPLO_VALIDO.json` para el formato publicado. Las importaciones sin claves requieren un esquema intermedio pendiente: nunca rellenes una respuesta falsa para satisfacer el esquema publicado.
3. Separa las preguntas ambiguas, con más de una alternativa válida, sin respuesta correcta o pendientes de verificación. No deben integrar un intento público calificable.
4. Resuelve o contrasta cada clave y sus alternativas. Un docente debe aprobar la versión concreta. Registra evidencia, responsable y fecha; verifica también la autorización de reutilización y publicación del contenido.
5. Conserva las preguntas apartadas y las observaciones, incluso cuando exista una propuesta posterior de corrección. Las correcciones se realizan en versiones nuevas y se documentan.

Se conservan Unicode, exponentes y subíndices. Para nuevas expresiones LaTeX, utiliza delimitadores explícitos `\(...\)` o `\[...\]`; para química se admite mhchem, por ejemplo `\(\ce{H2O}\)`. Las imágenes deben ser recursos relativos de `public/` o HTTPS autorizados. No se permite HTML arbitrario en los enunciados.

## Aprobación explícita

`publicacion/APROBACIONES_BANCOS.json` es la lista de versiones que pueden publicarse. Los bancos reales requieren:

- `kind: "real"` y `publicationAuthorized: true`.
- Una referencia real de autorización en `authorizationReference`.
- `academicApproval.status: "approved"`, con `approvedBy`, `approvedAt` y `evidence` reales, cumplimentados después de la revisión humana.
- `sha256` de la versión completa autorizada: SHA-256 sobre `JSON.stringify(objetoBanco)`, sin incluir una envoltura de arreglo. El orden de propiedades y elementos forma parte de esta firma conservadora.

Estos campos no se activan por aprobar pruebas de software. El manifiesto actual mantiene los siete bancos reales pendientes. No agregues aprobadores ni fechas ficticias.

Después de obtener todas las autorizaciones, incorpora únicamente las preguntas aprobadas a `src/data/real-banks.json`. El proceso `npm run build` verifica autorización, aprobación académica y hash antes de compilar, y comprueba después que el artefacto no exponga bancos pendientes. Una modificación de contenido o clave exige una aprobación y firma nuevas.

El hash de aprobación pública es distinto de la firma de versión de aprendizaje del navegador. Esta última separa el progreso cuando cambia el contenido; los resultados históricos conservan la copia original y no se recalifican retroactivamente.

## Verificar en el proyecto privado

```sh
npm ci
npm test
npm run test:import
npm run typecheck
npm run build
npm run test:e2e
npm run test:review
npm run audit:review
npm run verify:production
```

El proyecto original conserva todas las pruebas anteriores. Las 17 pruebas de contenido real están en `tests-academic/`, con los mismos casos anteriores y los imports ajustados por el traslado. No se distribuyen sus datos ni se sustituyen por preguntas inventadas. Las pruebas del normalizador y de los bancos de revisión local requieren los archivos privados originales.

## Preparar una fuente publicable

En el proyecto privado, ejecuta `npm run prepare:public`. Se crea una carpeta nueva `publicacion/fuente-v1.3-...` a partir de una lista blanca de archivos, con catálogo aprobado, código, pruebas públicas, manifiesto y workflow. Quedan excluidos los originales, revisiones, copias personales, capturas privadas, credenciales, ZIP internos y bancos pendientes.

Revisa `publicacion/ENTREGA_V1_3.json` y el informe de seguridad. La copia pública tiene sus propios comandos reproducibles de validación; no incluye los comandos que requieren archivos privados. No subas toda la carpeta original ni sus ZIP internos al repositorio público.

## Conectar GitHub y Pages

La entrega local no tiene un repositorio remoto autorizado ni una URL pública confirmada. El propietario debe proporcionar o conectar su repositorio y autenticarse con su cuenta autorizada. No cambies la visibilidad de un repositorio existente ni utilices force push.

Dentro de la **carpeta saneada**, configura tu identidad Git real, inicializa la rama `main` si corresponde y conecta la URL autorizada. Revisa los archivos antes de hacer commit y push. No uses nombres, correos ni remotos ficticios como si fueran los del propietario.

En GitHub:

1. Selecciona **Settings → Pages → GitHub Actions**.
2. Revisa y protege el entorno `github-pages` según la política del propietario.
3. Configura la variable del repositorio `AULAQUIZ_PAGES_APPROVED` con valor `true` cuando exista autorización de despliegue.
4. Ejecuta manualmente **Validar y publicar AulaQuiz V1.3** y marca `confirm_publication`.
5. El flujo instala con `npm ci`, ejecuta pruebas públicas, TypeScript, build, controles de aprobación/exposición y Playwright. Solo después puede desplegar.
6. Comprueba la URL real devuelta por el job de Pages, los bancos disponibles, los enlaces compartidos y la persistencia al recargar. No declares un despliegue exitoso solo porque exista el archivo del workflow.

Los pushes y PR ejecutan validaciones, pero no publican automáticamente. El despliegue requiere la invocación manual, la variable de autorización y la rama `main`. Los enlaces usan parámetros de consulta sobre la página principal, evitando rutas internas que necesiten un servidor SPA. `base: './'` mantiene los recursos relativos al subdirectorio del repositorio.

Fuentes oficiales consultadas: [workflows de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [despliegue estático de Vite](https://vite.dev/guide/static-deploy) y [base relativa de Vite 6](https://v6.vite.dev/guide/build#relative-base). Las acciones del workflow están fijadas a commits de las versiones documentadas al preparar esta entrega.
