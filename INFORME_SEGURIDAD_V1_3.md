# Informe de seguridad — AulaQuiz V1.3

Fecha: 19 de noviembre de 2026. Alcance: revisión básica de código, almacenamiento local, entrada JSON, enlaces, dependencias y preparación de fuente/artefacto público. No constituye una auditoría de penetración completa.

## Contenido y límites de uso

AulaQuiz es una aplicación estática de estudio y simulacros. Las claves de los cuestionarios publicados pueden inspeccionarse en el navegador. No debe presentarse como un sistema seguro para exámenes oficiales.

Los perfiles locales son una separación lógica del progreso, sin autenticación. Cualquier persona con acceso al mismo navegador puede elegir sus perfiles. No se implementaron contraseñas, backend, base de datos remota, seguimiento publicitario ni envío automático de resultados a servicios externos.

## Controles implementados y comprobados

- **Texto:** React escapa los enunciados y alternativas; no se interpreta HTML proporcionado por un banco. Se probaron etiquetas script e imágenes con eventos.
- **Matemáticas:** KaTeX usa `trust: false`, límite de expansión de macros y límite de tamaño. El único HTML generado se obtiene del renderizador restringido; se comprobó que enlaces matemáticos con protocolo ejecutable no se conviertan en enlaces activos.
- **Imágenes:** se permiten rutas relativas seguras o HTTPS sin credenciales. Se rechazan protocolos ejecutables, data URLs, rutas de red, backslashes, controles y traversals, incluidos casos codificados. Los recursos HTTPS autorizados pueden solicitarse al proveedor de la imagen; no se les añade información del perfil ni resultados.
- **Bancos JSON:** el esquema y el importador comprueban estructura, IDs, alternativas y pertenencia de la clave. La importación del navegador es local y no habilita automáticamente un banco para producción.
- **Progreso JSON:** se valida tipo y versión de copia, perfil, fechas, intentos, respuestas, confirmaciones, visitas, configuración e imágenes. Se limita el archivo a 5 MB. La importación crea un perfil nuevo y no reemplaza resultados existentes. No hay firma criptográfica de autenticidad académica del archivo.
- **Almacenamiento:** la migración conserva un respaldo previo; un almacén dañado se conserva para recuperación. Se validan también los metadatos nuevos. Si el navegador bloquea el acceso, se permite una sesión temporal con aviso explícito. Si se agota la cuota, se informa y no se eliminan historiales para hacer espacio.
- **Enlaces:** lista cerrada de parámetros; se rechazan parámetros desconocidos, repetidos, destinos privados, cantidades fuera de rango y preferencias inválidas. No se serializan perfiles, respuestas, resultados, credenciales ni modalidades dependientes del historial privado. Cada visitante crea su propio intento.
- **Compartir:** la API nativa y WhatsApp reciben únicamente un enlace público cuando la persona pulsa el control correspondiente. La automatización no envía mensajes reales. Hay alternativa manual cuando el navegador rechaza el portapapeles.
- **Interfaz:** diálogo con confinamiento de foco, cierre por Escape y soporte de enlaces/textarea; se excluyen elementos ocultos o deshabilitados del recorrido. Las respuestas conservan texto e indicadores de selección, además de colores. Se respeta la preferencia de movimiento reducido.

## Aprobación y prevención de exposición

El manifiesto `publicacion/APROBACIONES_BANCOS.json` liga cada publicación a una versión mediante SHA-256. Los bancos reales requieren autorización de publicación y aprobación académica humana con responsable, fecha y evidencia. Las demostraciones usan una categoría distinta, autorizada por el encargo V1.3 apartado 12.

El build verifica fuentes antes de compilar y escanea después el artefacto. Bloquea bancos sin aprobación, cambios de versión no aprobados, claves inválidas, IDs de bancos pendientes, mapas de código y archivos privados en `dist`. El catálogo preparado contiene 25 preguntas de demostración; ningún banco real está habilitado.

`.gitignore` y la preparación por lista blanca excluyen originales, revisiones, bancos locales pendientes, copias personales, capturas/evidencia interna, node_modules, archivos de entorno, claves, tokens, respaldos y ZIP internos. El escáner de fuente pública busca patrones de credenciales y rutas privadas; no registra el contenido de una posible credencial en su informe.

El workflow admite actualizaciones automáticas tras push a main únicamente con AULAQUIZ_PAGES_APPROVED=true y AULAQUIZ_AUTO_DEPLOY=true, activadas después de la autorización explícita del propietario. La alternativa manual exige confirm_publication. Ambos caminos dependen del job completo de validación. Los PR no despliegan. Los permisos de Pages/OIDC se limitan al job de despliegue y las acciones permanecen fijadas a commits.

## Dependencias

`npm audit --json --cache D:\aulaQuiz\.npm-cache`, consultado el 19/11/2026 con acceso de red autorizado, reportó **0 vulnerabilidades conocidas**: 0 informativas, bajas, moderadas, altas y críticas. Se auditó el árbol de 188 dependencias reportado por npm. La primera consulta sin acceso de red falló; no se tomó ese fallo como un resultado limpio. No se ejecutó `audit fix --force` ni se cambiaron dependencias innecesariamente.

Un resultado sin avisos conocidos no garantiza ausencia de vulnerabilidades futuras. La compilación y las comprobaciones se repiten con `npm ci` en el workflow.

## Evidencia y comprobación final

Los casos automatizados incluyen entradas malformadas, rutas inseguras, intento de HTML, metadatos corruptos, copia de progreso inválida, publicación sin aprobación y fuga de IDs pendientes en un artefacto sintético. La revisión completa de pruebas y capturas está en el informe de publicación.

Resultado final local: 220 pruebas aprobadas, 0 fallidas; TypeScript y build aprobados. Los 61 archivos protegidos conservan sus hashes. El control de producción admite cuatro demostraciones / 25 preguntas y excluye los siete bancos reales pendientes. La entrega de fuente aplica lista blanca y escaneo de patrones; su resultado y hashes se registran en publicacion/ENTREGA_V1_3.json. Ese escaneo no sustituye una auditoría especializada ni certifica las cuentas remotas.

## Límites y acciones pendientes

Repositorio y URL públicos verificados: https://github.com/RODRIGO-dev012/aulaQuiz y https://rodrigo-dev012.github.io/aulaQuiz/. Actions completó validación y despliegue, incluida la primera actualización automática autorizada. No se registraron credenciales ni se incluyeron archivos privados.

La fuente preparada es una entrega revisable, no una certificación infalible de ausencia de secretos. No se inspeccionaron cuentas privadas ni se extrajeron credenciales del sistema. La aprobación académica y la autorización de reutilización del material real siguen pendientes.


Comprobación adicional de la fuente independiente: instalación limpia desde caché, 107 pruebas unitarias públicas, TypeScript, build y 10 recorridos de navegador aprobados. El escaneo de la entrega por lista blanca no detectó patrones de credenciales ni rutas privadas. Estos controles se ejecutaron localmente; no equivalen a una ejecución de GitHub Actions.


## Cierre de publicación

La web real aprobó 80 recorridos en cinco tamaños; Actions aprobó 107 unitarias y 80 recorridos y desplegó. Se conservaron las comprobaciones de consola/HTTP, parámetros, perfiles, almacenamiento y exclusión académica. Cuatro demostraciones / 25 preguntas, cero bancos reales. La evidencia interna y las capturas no se incluyen en Git.
