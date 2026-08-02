# CHANGELOG — TechMind · Proyecto Completo

> Todas las versiones están ordenadas de la más reciente a la más antigua.
> Se sigue el formato [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).
> Para el detalle técnico (causa, síntoma y código) de cada bug, ver [`BUGFIX_REGISTRO.md`](data-science/docs/BUGFIX_REGISTRO.md).

## [1.4.0] — 2026-08-01 · Ajustes de UX/UI, Modo Claro Cálido y Notificaciones

### Corregido
- **Porcentajes de Confianza con decimales y punto sobrante (`frontend/index.html` + `frontend/app.js`):** Eliminadas las cifras decimales en la "Confianza del Modelo" tanto en el marcador principal (`0%`) como en los registros del historial reciente y la vista detallada (`Math.round(prob * 100)`).
- **Legibilidad del mensaje de error de BD en Modo Claro (`frontend/app.js`):** Actualizados los estilos en el bloque `catch` del historial para que las alertas de error de conexión a la base de datos se muestren en un color rojo oscuro bien definido (`text-rose-700 dark:text-rose-200`) y con alto contraste sobre fondo claro.
- **Resplandor y deslumbre del Modo Claro (`frontend/index.html`):** Redefinidas las variables CSS `:root` hacia un diseño cálido cremita/arena mate (`#e8e2d5` y `#eee7d9`) con tipografía en tono café/carbón profundo (`#231f18`), eliminando la iluminación blanca cegadora de fondo e inputs.
- **Parpadeo de cambio de fuente / FOUT (`frontend/index.html`):** Al cargar la aplicación, se percibía un breve intercambio o parpadeo (*font swap*) debido a la directiva `display=swap` en Google Fonts. Resuelto precargando la hoja de estilos (`rel="preload"`) y cambiando el parámetro a `display=block` para que el texto se renderice directamente en la tipografía definitiva (`Inter` / `Outfit`) desde el primer instante sin ningún parpadeo.
- **Ícono de estrellas en etiqueta de Confianza (`frontend/app.js`):** Eliminado el ícono de estrellas (`auto_awesome` ✨) posicionado al lado de la etiqueta "Confianza: %" en las tarjetas del historial.
- **Efecto borroso en el Sidebar Móvil (`frontend/index.html`):** Eliminadas las clases `backdrop-blur-sm` y `backdrop-blur-2xl` en el overlay y panel de navegación lateral para evitar distorsiones al abrir el menú en dispositivos móviles.
- **Ortografía y formato en textos del sistema (`frontend/index.html` + `frontend/app.js`):** Corregidos acentos, minúsculas tras comas o inicios de descripciones y estandarización ortográfica.

### Añadido
- **Notificación de alerta cuando faltan campos al clasificar (`frontend/app.js`):** Al presionar el botón de clasificación con campos vacíos, se despliega la alerta con el mensaje exacto `Por favor, llena todos los campos`. Ante errores de conexión o servidor, se mantiene el mensaje `Hubo un error, por favor intenta de nuevo más tarde`.
- **Navegación al inicio mediante el logo TechMind (`frontend/index.html` + `frontend/app.js`):** El elemento de marca "TechMind" en el sidebar redirige al usuario de vuelta a la vista principal (Home/Clasificador) al hacer clic.

---

## [1.3.2] — 2026-07-31 · Estabilidad en OCI (memoria, devtools y auto-restart)

### Corregido

- **`backend/Dockerfile` — JVM sin límite de heap → OOM Killer del kernel:** Spring Boot corría sin flags `-Xmx`, por lo que la JVM podía crecer hasta consumir toda la RAM del servidor. En el OCI Free Tier (1 GB RAM), después de unas horas el kernel de Linux terminaba el proceso silenciosamente mediante el OOM Killer, dejando el servicio en rojo sin ningún error explícito en los logs de Docker. Corregido añadiendo `-Xms64m -Xmx256m -XX:+UseSerialGC` al `ENTRYPOINT`, limitando el heap máximo a 256 MB y usando el GC serie (más eficiente en CPUs de 1–2 núcleos).

- **`backend/api/pom.xml` — `spring-boot-devtools` activo en producción:** La dependencia `spring-boot-devtools` tenía `<scope>runtime</scope>`, lo que hacía que se incluyera en el JAR final y se activara dentro del contenedor Docker, monitoreando el filesystem en busca de cambios y reiniciando la aplicación innecesariamente, consumiendo CPU y RAM de forma continua. Cambiado a `<scope>test</scope>` para excluirlo del artefacto de producción. El comportamiento en desarrollo local (IntelliJ / VS Code) no se ve afectado.

- **`docker-compose.yml` — contenedores sin política de reinicio:** Ningún servicio tenía definida la directiva `restart`, por lo que si un contenedor crasheaba (por OOM u otro error) quedaba detenido permanentemente hasta intervención manual. Añadido `restart: unless-stopped` a los cuatro servicios (`postgres`, `fastapi`, `springboot`, `frontend`) para garantizar auto-recovery automático ante fallos y arranque automático tras un reinicio de la VM.

---

## [1.3.1] — 2026-07-30 · Compatibilidad Docker Compose v2

### Corregido
- **`setup.py` — migración de `docker-compose` (v1) a `docker compose` (v2):** El script de setup usaba el binario standalone `docker-compose` (Docker Compose v1, deprecado desde 2023), que no está disponible en instalaciones modernas de Docker Engine. En servidores con Docker Compose v2 instalado como plugin, los comandos fallaban con error de comando no encontrado. Se reemplazaron las 6 llamadas afectadas:
  - `docker compose up -d postgres`
  - `docker compose --profile full up -d --build`
  - `docker compose --profile full down`
  - `docker compose --profile full down -v` (ejecución + mensajes de ayuda)

  El comando `docker compose` (sin guión) es compatible con Windows (Docker Desktop), macOS (Docker Desktop) y Linux (Docker Engine 20.10+), por lo que el cambio es transparente en todos los entornos.

---

## [1.3.0] — 2026-07-30 · Mejoras de UX en Clasificador

### Corregido
- **Ícono duplicado en sidebar (`frontend/index.html`):** El enlace de navegación "Clasificador" usaba el mismo ícono `psychology` que el logo principal "TechMind" en la parte superior del sidebar, generando confusión visual. Reemplazado por el ícono `category` de Material Symbols para diferenciar claramente ambos elementos.
- **Decimales excesivos en probabilidad (`app/database.py` + `frontend/app.js`):** Los valores de probabilidad devueltos por el modelo ML se mostraban con hasta 4 decimales. Se aplica `round(float, 2)` en la API Python (`get_predicciones`) y `Math.round` en el frontend antes de renderizar. El porcentaje de confianza en la UI se muestra con 2 decimales.
- **Efecto de brillo blanco/púrpura sobre el panel de resultados (`frontend/index.html`):** Eliminado el `<div>` con clase `bg-primary-fixed blur-md` posicionado en la esquina superior derecha del recuadro "Resultado del Análisis", que generaba un resplandor no deseado sobre el borde superior del panel.

### Mejorado
- **Limpieza automática de campos tras clasificar (`frontend/app.js`):** Al hacer clic en "Clasificar con TechMind" y recibir una respuesta exitosa, los campos de título y contenido se vacían automáticamente, preparando la interfaz para una nueva consulta sin necesidad de borrar manualmente el texto anterior.
- **Descripción del contenido visible en historial (`app/database.py` + `frontend/app.js`):** La consulta SQL del endpoint `GET /predicciones` ahora incluye el campo `c.texto` de la tabla `contenidos`. El frontend muestra el texto/descripción truncado (con `line-clamp-2`) debajo del título tanto en las tarjetas recientes del clasificador como en la subpágina de historial detallado.

---

## [1.2.0] — 2026-07-30 · Health Check de Spring Boot + Actuator

### Corregido
- **Bug visual en la UI — indicador LED de Spring Boot siempre en rojo (`frontend/app.js`):** El health check usaba `fetch('/contenido', { method: 'OPTIONS' })` para detectar si Spring Boot estaba activo. El browser bloqueaba esta llamada por política CORS al tratarla de forma distinta a un preflight automático, lanzando siempre el bloque `catch` y mostrando el LED en rojo aunque el servidor estuviera operativo y la clasificación funcionara correctamente. Corregido reemplazando el método `OPTIONS` por `GET /actuator/health`, consistente con el patrón ya aplicado para FastAPI.
- **Redundancia y UX en Modal JSON de Inferencia (`frontend/index.html` y `frontend/app.js`):** Se eliminó el botón redundante "Cerrar" en la barra inferior del modal. Se habilitó el cierre nativo mediante el botón "X" en la barra superior, click en el fondo oscuro (backdrop) y presionado de la tecla `Escape`.

### Añadido
- **Botón "Copiar JSON" en Modal de Inferencia (`frontend/index.html` y `frontend/app.js`):** Reemplazado el pie del modal con una acción de exportación interactiva que copia todo el payload JSON (entrada + resultado) al portapapeles con feedback animado de 2 segundos ("¡Copiado!") y notificación Toast.

### Añadido
- **`spring-boot-starter-actuator` en `backend/api/api/pom.xml`:** Nueva dependencia que expone el endpoint estándar `GET /actuator/health` con respuesta `{ "status": "UP" }` cuando el servicio está operativo.
- **Configuración de Actuator en `backend/api/api/src/main/resources/application.properties`:**
  - `management.endpoints.web.exposure.include=health` — solo expone el endpoint de salud (no métricas ni información sensible).
  - `management.endpoint.health.show-details=never` — respuesta mínima sin detalles internos.
  - `management.endpoints.web.cors.allowed-origins=*` y `allowed-methods=GET` — permite que el frontend consulte el endpoint sin errores de CORS.

### Documentación
- **`backend/docs/ARQUITECTURA.md`:** Actualizados el bloque de `application.properties` con las nuevas propiedades de Actuator, el flujo de arranque (ahora lista los dos endpoints expuestos en `:8080`) y agregada la nueva sección *"Endpoint de Health Check"* con contrato JSON.
- **`backend/docs/FUNCIONALIDADES.md`:** Título actualizado a *"Endpoints Disponibles"* (plural). Agregada sección `GET /actuator/health` con contrato completo, descripción de uso y contexto de integración con el frontend.
- **`backend/docs/SETUP.md`:** Health check básico corregido (de `curl /contenido` a `curl /actuator/health`). Agregada entrada en Troubleshooting: *"El indicador de Spring Boot aparece en rojo en la UI"* con causa, verificación y solución.
- **`frontend/README.md`:** Indicadores de estado detallados con el endpoint exacto que cada servicio usa para su health check.

---

## [1.1.0] — 2026-07-28 · Sprint 2 & QA Automation (anterior)

### Añadido
- **Diagrama Infográfico de Arquitectura de Sistema:** Generado e integrado en `README.md` (`assets/techmind_project_flow.png`) mostrando el flujo visual multicontenedor (Frontend UI → Spring Boot :8080 → FastAPI ML :8000 → PostgreSQL 16 :5432).
- **Suite de Pruebas Automatizadas de QA (Sprint 2):** Creada e implementada suite de 14 casos de prueba E2E cubriendo flujos felices, límites de carga, resistencia a inyección SQL/XSS, resiliencia y validación de tipos HTTP (reporte en `qa/reportes/resultados-sprint-2.md`).
- **Documentación del Esquema Relacional de PostgreSQL:** Creado informe técnico completo (`informe_base_de_datos.md`) con diagrama Entidad-Relación (ER) Mermaid, contratos DDL, índices y mapeo JPA.

### Corregido
- **Eliminación de la llamada redundante `log_prediccion()` en FastAPI (`app/main.py` y `app/database.py`):** Solucionado el error de log en PostgreSQL (`null value in column "contenido_id" violates not-null constraint`). FastAPI opera ahora como un microservicio 100% stateless mientras Spring Boot administra la transacción y asignación de `contenido_id`.

---

## [0.6.0] — 2026-07-22 · Bug Fixes + Corrección de rutas del modelo

### Corregido
- **Bug crítico en `app/main.py` — endpoint `POST /predecir`:** la variable `probabilidad` nunca se calculaba antes de ser usada en `log_prediccion()`, lo que causaba un `NameError` en runtime. Se agregó el cálculo correcto usando `modelo.predict_proba(vector)[0].max()` antes de la llamada a la función de logging.
- **Rutas de serialización en `TechMind_DataScience.ipynb`:** las celdas de `joblib.dump()` y `joblib.load()` usaban rutas relativas simples (`"tfidf_vectorizer.joblib"`, `"modelo_clasificador.joblib"`) que guardaban los artefactos en el directorio de trabajo del kernel (`data-science/notebooks/`), no en `data-science/models/` donde FastAPI los busca. Se corrigieron las rutas a `"../models/tfidf_vectorizer.joblib"` y `"../models/modelo_clasificador.joblib"`.
- **Esquema PostgreSQL — tabla `predicciones`:** la columna fue creada por el script de migración (`migrate_to_postgres.py`) con el nombre `keywords` en lugar de `informaciones_adicionales`, lo que causaba un error silencioso al intentar persistir cada predicción. Corregido en dos pasos: (1) `ALTER TABLE` sobre la DB existente y (2) corrección del nombre en el `SCHEMA_SQL` del script de migración para que instalaciones nuevas también queden correctas.

### Verificado
- Pipeline completo probado end-to-end: `POST /predecir` → clasificación → persistencia en PostgreSQL sin errores.
- Los modelos `.joblib` ahora se generan directamente en `data-science/models/` al ejecutar el notebook.

---

## [0.5.0] — 2026-07-21 · Ingesta de Documentos + Re-entrenamiento Automático

### Añadido
- **Script de ingesta interactiva** (`ingest_documents.py`) que permite importar archivos PDF (`pdfplumber`) y DOCX (`python-docx`) a PostgreSQL.
  - Soporta la extracción y limpieza automatizada de texto.
  - Permite etiquetar manualmente la categoría (Opción A) en una interfaz CLI interactiva con preview de texto.
  - Detección de secciones para documentos multi-categoría, permitiendo split y etiquetado independiente por sección.
  - Control de duplicados mediante verificación del hash MD5 del contenido en la base de datos.
- **Re-entrenamiento automático local**: el script de ingesta cuenta con un trigger automático que detecta si se han importado 3 o más documentos en una sola sesión y ofrece ejecutar el notebook mediante Jupyter (`jupyter nbconvert --execute`) en segundo plano para regenerar los modelos `.joblib`.
- **Nueva guía de ingesta** (`INGESTA_DOCUMENTOS.md`) detallando la preparación de documentos, flujo de ejecución, Edge Cases y solución de problemas.
- **Guía de entrega de Backend** (`ENTREGA_BACKEND.md`) para facilitar al equipo Java qué archivos deben clonarse (código, docker, docs) y cuáles compartirse manualmente (modelos `.joblib` en `.gitignore`).
- **Plan y suite de pruebas para QA** (`QA_TESTING.md` y `postman_collection.json`) con 23 casos de prueba para validar Happy Paths, Edge Cases, Error Handling y performance contra el endpoint local.

### Cambiado
- **`requirements.txt`** — agregadas dependencias para procesamiento de documentos: `pdfplumber>=0.11.0` y `python-docx>=1.1.0`.
- **`.gitignore`** — modificado para excluir archivos locales PDF y DOCX en la carpeta `documentos/` (`documentos/*.pdf` y `documentos/*.docx`) y mantener solo la carpeta usando `.gitkeep`.
- **`README.md`** — tabla de documentación actualizada con los nuevos entregables (`ENTREGA_BACKEND.md`, `QA_TESTING.md`, `INGESTA_DOCUMENTOS.md` y `postman_collection.json`).

---

## [0.4.0] — 2026-07-21 · FastAPI + PostgreSQL

### Añadido
- **Microservicio FastAPI** (`app/main.py`) con tres endpoints:
  - `POST /predecir` — inferencia interna consumida por Spring Boot. Carga los `.joblib` al arrancar, clasifica el texto y persiste la predicción en PostgreSQL.
  - `GET /health` — health check para que Spring Boot verifique disponibilidad antes de llamar.
  - `GET /categorias` — devuelve la lista de las 8 categorías del modelo.
  - `GET /docs` — documentación Swagger automática generada por FastAPI.
- **Módulo de base de datos** (`app/database.py`) con `get_connection()`, `init_db()` y `log_prediccion()` para PostgreSQL.
- **Script de migración a PostgreSQL** (`migrate_to_postgres.py`) — crea las tablas `contenidos` y `predicciones`, lee desde SQLite o CSV, e incluye confirmación interactiva para evitar reemplazos accidentales.
- **Tabla `predicciones`** en PostgreSQL — log automático de cada inferencia con `titulo`, `texto`, `categoria`, `probabilidad`, `informaciones_adicionales` y `created_at`.
- **`docker-compose.yml`** — levanta PostgreSQL 16 localmente con un solo comando (`docker-compose up -d`). Incluye health check y volumen persistente.
- **`.env.example`** — plantilla de variables de entorno para Python (FastAPI) y referencia para Spring Boot.
- **`.gitignore`** — excluye `.env`, `*.joblib`, `techmind.db` y archivos de Python/Jupyter del repositorio.
- **`BACKEND_INTEGRATION.md`** — guía completa para el equipo de Java/Spring Boot: setup, contrato del endpoint `/predecir`, ejemplos de código Java (`RestTemplate` y `WebClient`), configuración de `application.properties`, schema SQL y checklist de verificación.

### Cambiado
- **`requirements.txt`** — agregados `fastapi>=0.111.0`, `uvicorn[standard]>=0.29.0`, `psycopg2-binary>=2.9.9`, `python-dotenv>=1.0.0`.
- **`TechMind_DataScience.ipynb` — Celda 3** — modo dual: si `PG_HOST` está configurado carga desde PostgreSQL; si no, hace fallback a SQLite local (retrocompatible).

### Arquitectura
```
Postman → Spring Boot (8080) → FastAPI (8000) → PostgreSQL (5432)
                     └─────────────────────────────────────────────┘
```

---

## [0.3.0] — 2026-07-17 · Migración de base de datos a SQLite

### Añadido
- **Base de datos SQLite** `techmind.db` — migración del dataset original `contenidos_tecnicos.csv` a una base de datos relacional embebida. La tabla `contenidos` incorpora dos campos nuevos respecto al CSV:
  - `id` — clave primaria autoincremental, necesaria para que el Back-End pueda referenciar registros individuales.
  - `created_at` — timestamp UTC de inserción, útil para auditoría y reentrenamiento incremental.
- **Script de migración** `migrate_to_sqlite.py` — script Python reutilizable (sin dependencias externas, solo stdlib) que: lee el CSV → crea el esquema → importa los 61 registros → verifica la distribución por categoría → imprime ejemplos de carga. Puede volver a ejecutarse en cualquier momento para regenerar la DB desde cero.
- **Índice sobre `categoria`** (`idx_categoria`) — mejora el rendimiento de consultas por categoría, especialmente relevante cuando el dataset crezca.

### Cambiado
- **Notebook `TechMind_DataScience.ipynb` — Celda 3**: la carga del dataset se migró de `pd.read_csv("contenidos_tecnicos.csv")` a `pd.read_sql_query(...)` sobre `techmind.db`. El resto del pipeline (preprocesamiento, vectorización, modelo, serialización) no requirió cambios.

### Por qué SQLite
- Permite al Back-End consultar, insertar y filtrar contenidos sin parsear un CSV manualmente.
- Soporta queries SQL estándar (`SELECT`, `INSERT`, `WHERE categoria = ?`) directamente desde Java (JDBC) o Python.
- Es un archivo único (`techmind.db`) — no requiere servidor, fácil de subir a OCI Object Storage.
- La tabla queda preparada para recibir nuevos registros vía `POST /contenido` sin necesidad de reescribir el archivo CSV.

---

## [0.2.0] — 2026-07-15 · MVP del Hackathon

### Añadido
- **Pipeline de inferencia end-to-end** — función `procesar_contenido(titulo, texto)` que encadena limpieza → vectorización → clasificación → extracción de keywords y devuelve un dict JSON-serializable listo para el contrato REST.
- **Extracción de palabras clave** (campo `informaciones_adicionales`) mediante los términos con mayor peso TF-IDF dentro del documento individual, desacoplada de la predicción de categoría.
- **Tres ejemplos de uso documentados** en el notebook (Backend / Data Science / DevOps) como requisito obligatorio del MVP.
- **Serialización de artefactos** — `tfidf_vectorizer.joblib` y `modelo_clasificador.joblib` guardados con `joblib`, más celda de validación de carga que simula el arranque de la API.
- **Notas de integración** en la última sección del notebook (Celda 28): pasos para subir a OCI Object Storage y opciones de arquitectura (microservicio Python vs. exportación al formato Java).
- **Contrato de respuesta acordado** — campo renombrado a `informaciones_adicionales` (plural) para alinear con el equipo de Back-End:
  ```json
  {
    "categoria": "Backend",
    "probabilidad": 0.2779,
    "informaciones_adicionales": ["boot", "spring boot", "spring", "creación apis", "java spring"]
  }
  ```

### Cambiado
- El campo de salida originalmente denominado `informacion_adicional` (singular, según el PDF de la consigna) fue renombrado a `informaciones_adicionales` (plural) para coincidir con el contrato que usa el equipo de Back-End.

---

## [0.1.0] — 2026-07-14 · Construcción del pipeline base

### Añadido
- **Dataset sintético** `contenidos_tecnicos.csv` — ~60 registros en español, con campos `titulo`, `texto` y `categoria`, repartidos en 8 categorías: Backend, Frontend, Data Science, DevOps, Mobile, Bases de Datos, Seguridad y Cloud.
- **EDA inicial** — gráfico de distribución de categorías (countplot), histograma de longitud de textos (en palabras), chequeo de nulos y filas duplicadas.
- **Preprocesamiento de texto** — función `limpiar_texto(texto)`: minúsculas → remoción de puntuación (regex) → filtrado de stopwords en español (lista propia de ~30 términos, incluidos frases funcionales como "se explica", "se presenta").
- **Vectorización TF-IDF** — `TfidfVectorizer` con `max_features=1500`, `ngram_range=(1, 2)` y `min_df=1` para capturar unigramas y bigramas (p. ej. "api rest", "machine learning").
- **Modelo de clasificación** — Regresión Logística con `class_weight="balanced"` y `max_iter=1000`, entrenada sobre split train/test estratificado (75/25, `random_state=42`).
- **Evaluación del modelo** — accuracy, `classification_report` por categoría (precision / recall / F1) y matriz de confusión (heatmap con Seaborn).
  - Accuracy reportado sobre el test set actual: **~0.69** (orientativo; refleja las limitaciones del dataset pequeño).
  - Categorías con peor generalización: **DevOps** y **Seguridad** (menos ejemplos de entrenamiento).

---

## [0.0.1] — 2026-07-13 · Scaffolding inicial

### Añadido
- Estructura base del notebook `TechMind_DataScience.ipynb` con secciones enumeradas (EDA → Preprocesamiento → Vectorización → Modelo → Evaluación → Keywords → Inferencia → Serialización).
- Definición del alcance y rol del componente de Ciencia de Datos dentro del equipo (ver `detalle_trabajo.md`).
- Primeras dependencias identificadas: `pandas`, `scikit-learn`, `matplotlib`, `seaborn`, `joblib`, `re`, `json`, `numpy`.

---

*Mantenido por el equipo completo — TechMind G9 LATAM Team 37. Última actualización: 2026-07-31.*
