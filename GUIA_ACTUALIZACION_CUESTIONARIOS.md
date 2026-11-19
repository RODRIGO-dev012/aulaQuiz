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

## Repositorio y actualizaciones automáticas

Repositorio autorizado: [RODRIGO-dev012/aulaQuiz](https://github.com/RODRIGO-dev012/aulaQuiz). Sitio verificado: [AulaQuiz](https://rodrigo-dev012.github.io/aulaQuiz/). El clon saneado local está en publicacion/despliegue-v1.3; no subir la carpeta privada completa.

1. Sincronizar el clon con git pull --ff-only y conservar el historial.
2. Aplicar solo cambios autorizados. Cada banco real necesita aprobación docente, autorización y hash de versión; no incluir pendientes porque pasen pruebas técnicas.
3. Ejecutar npm ci, npm test, npm run typecheck, npm run build, npm run verify:production y npm run test:e2e en el clon saneado. Revisar git diff y git status.
4. Hacer commit y git push origin main. La validación y el despliegue son automáticos tras un push normal; los PR solo validan. Revisar validate y deploy en Actions y comprobar el sitio al terminar.
5. Mantener Pages en GitHub Actions, AULAQUIZ_PAGES_APPROVED=true y AULAQUIZ_AUTO_DEPLOY=true. Para suspender futuras publicaciones automáticas, poner AULAQUIZ_AUTO_DEPLOY=false. No eliminar pruebas para publicar un banco no aprobado.
6. Alternativa manual: Actions → Validar y publicar AulaQuiz V1.3 → Run workflow → main → confirm_publication=true. Repite la validación completa antes de publicar.

La activación de futuros despliegues automáticos fue autorizada expresamente por el propietario. No cambiar visibilidad ni realizar force push. El commit documental de cierre puede omitir CI por no modificar código; los cambios de aplicación deben completar todas las verificaciones. La base relativa ./ y los parámetros en la página principal funcionan bajo /aulaQuiz/ y admiten enlaces directos y recarga.

Referencias: [GitHub Pages con workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) y [despliegue de Vite](https://vite.dev/guide/static-deploy).
