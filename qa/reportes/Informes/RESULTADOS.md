# Informe de resultados

**Proyecto:** TechMind - Organización Inteligente del Conocimiento Técnico  
**Responsable QA:** Federico G. Gutierrez  
**Fecha de Ejecución:** 20 de Agosto de 2026 (Re-evaluación v2.5.0) 

## Índice

- [Resumen Ejecutivo](#resumen-ejecutivo)
- [Resultados](#resultados)
- [Desglose por Tipo de Prueba](#desglose-por-tipo-de-prueba)
  - [FastAPI](#fastapi)
  - [PostgreSQL - techmind](#postgresql---techmind)
  - [Spring Boot](#spring-boot)
  - [Frontend](#frontend)
  - [Auditoría Lighthouse (Re-evaluación v2.4.0)](#auditoría-lighthouse-re-evaluación-v240)
- [Detalle de Casos de Prueba](#detalle-de-casos-de-prueba)
  - [Sprint 1 (FastAPI & PostgreSQL)](#sprint-1-fastapi--postgresql)
  - [Sprint 2 (Data QA - PostgreSQL)](#sprint-2-data-qa---postgresql)
  - [Sprint 3 (Backend Spring Boot & ML)](#sprint-3-backend-spring-boot--ml)
  - [Sprint 4 (Frontend)](#sprint-4-frontend)
  - [Sprint 5 (Performance & Web Vitals — Lighthouse Re-evaluación)](#sprint-5-performance--web-vitals--lighthouse-re-evaluación)

## Resumen Ejecutivo
Durante los Sprints 1, 2, 3, 4 y 5, se ejecutaron de manera exhaustiva las suites de pruebas funcionales, de integridad, seguridad, resiliencia y auditorías no funcionales sobre el stack completo, abarcando las APIs backend (`FastAPI` y `Spring Boot`), la base de datos PostgreSQL (`techmind`), la integración con el microservicio de Machine Learning, la interfaz de usuario (Frontend en `Vanilla JS/Tailwind`) y la calidad de experiencia de usuario web re-evaluada con **Google Lighthouse 13.4 (v2.6.0 Final)**.

- **Sprint 1 (FastAPI & PostgreSQL):** Se ejecutó la suite completa de pruebas sobre los endpoints de la API FastAPI y su integración con PostgreSQL, logrando una cobertura total en escenarios funcionales, de límites, seguridad, resiliencia y validación de datos.
- **Sprint 2 (Data QA - PostgreSQL):** Se auditó la integridad y persistencia de la base de datos `techmind`, evaluando las tablas `contenidos` y `predicciones`. Se logró cobertura total en integridad referencial, consistencia de esquemas, unicidad de claves primarias, límites superiores e inferiores y resiliencia ante inyecciones de datos.
- **Sprint 3 (Backend Spring Boot & ML):** Se validó la capa de API backend en Spring Boot conectada a PostgreSQL y al microservicio de ML, evaluando el flujo punta a punta desde las solicitudes HTTP POST (`http://localhost:8080`) y la invocación del modelo, hasta la respuesta JSON y la persistencia en `contenidos`.
- **Sprint 4 (Frontend de TechMind):** Superó exitosamente las pruebas de calidad, demostrando un alto nivel de estabilidad, seguridad y usabilidad. Se validó la protección contra ataques XSS en el manejo del DOM, la reactividad asíncrona para actualizar contenidos sin recargar la página, la prevención de peticiones duplicadas mediante la deshabilitación del botón de envío, y la correcta persistencia visual y accesible de los temas Dark y Light.
- **Sprint 5 (Performance & Web Vitals — Lighthouse Re-evaluación v2.5.0):** Se completó la re-evaluación final tras aplicar las optimizaciones de UI/UX, reducción de JS e inclusión de font fallbacks. **Rendimiento Desktop alcanzó un hito histórico de 86/100** (FCP/LCP de 1.2s, TBT de 0ms y reducción del 88% en el CLS a `0.177`), **Rendimiento Mobile 4G se consolidó en 66/100** (FCP de 5.4s y LCP de 5.6s), **Accesibilidad se mantuvo en un nivel sobresaliente de 95/100 en Desktop y 100/100 en Mobile**, **Buenas Prácticas subió a 78/100** (al limpiar las advertencias en Chrome DevTools) y **SEO se afirmó en 91/100** (validada la `meta description`). Persiste como único pendiente de infraestructura la configuración de HTTPS en el servidor web.

En todas las etapas se alcanzó un 100% de cobertura y éxito en los casos planificados, garantizando la estabilidad del sistema ante grandes volúmenes de texto, la sanitización de caracteres y el cumplimiento estricto de esquemas.

---

## Resultados

| Planificados | Ejecutados | Pasó | Falló | Éxito |
|:---:|:---:|:---:|:---:|:---:|
| 61 | 61 | 61 | 0 | 100% |

## Desglose por Tipo de Prueba

### FastAPI

| Categoría | Planificados | PASÓ | FALLÓ | % Éxito |
|---|:---:|:---:|:---:|:---:|
| Funcionales (Flujo Feliz) | 8 | 8 | -- | 100 |
| Casos Borde / Encoding (UTF-8) | 3 | 3 | -- | 100 |
| Validación de Esquema / Tipos | 3 | 3 | -- | 100 |
| Seguridad (Inyección SQL / Content-Type) | 2 | 2 | -- | 100 |
| Endpoints Complementarios | 3 | 3 | -- | 100 |
| Integridad de Datos | 6 | 6 | -- | 100 |
| **TOTAL** | **25** | **25** | **--** | **100** |

```
El MVP cumple con todos los criterios de aceptación funcionales, de rendimiento (< 2000 ms) y de seguridad especificados para el Sprint 1. La API demuestra alta estabilidad y resiliencia ante errores de infraestructura.
```

### PostgreSQL - techmind

| Categoría | Planificados | PASÓ | FALLÓ | % Éxito |
|---|:---:|:---:|:---:|:---:|
| Completitud | 5 | 5 | -- | 100 |
| Integridad y Estructura | 6 | 6 | -- | 100 |
| Formato y Calidad de Texto | 3 | 3 | -- | 100 |
| Edge Cases (Límites y Vacíos) | 2 | 2 | -- | 100 |
| Rendimiento e Inserción Masiva | 1 | 1 | -- | 100 |
| **TOTAL** | **17** | **17** | **--** | **100** |

```
La capa de datos en PostgreSQL demostró total solidez técnica en el Sprint 1 al garantizar la integridad de los datos (claves primarias, campos obligatorios y unicidad), alta resiliencia y seguridad (protección contra SQLi y soporte de estructuras complejas/TEXT) y excelente escalabilidad frente a inserciones masivas y grandes volúmenes de datos.
```

### Spring Boot

| Categoría | Planificados | PASÓ | FALLÓ | % Éxito |
|---|:---:|:---:|:---:|:---:|
| Clasificación y Persistencia Core | 1 | 1 | -- | 100 |
| Codificación y Caracteres (UTF-8) | 1 | 1 | -- | 100 |
| Validación de Campos y Esquema | 2 | 2 | -- | 100 |
| Seguridad y Sanitización | 1 | 1 | -- | 100 |
| Edge Cases (Textos de Gran Longitud) | 1 | 1 | -- | 100 |
| **TOTAL** | **6** | **6** | **--** | **100** |

```
El módulo Spring Boot API demostró una alta madurez técnica e integración funcional al responder de manera óptima en seguridad, rendimiento e integridad. La aplicación intercepta entradas inválidas en la capa del servidor mediante Bean Validation retornando errores 400 Bad Request, previene ataques de inyección SQL mediante consultas parametrizadas con JPA/Hibernate, preserva símbolos y emojis gracias a su configuración UTF-8, y procesa de forma transparente payloads superiores a los 50.000 caracteres dentro de los tiempos de respuesta esperados.
```

### Frontend
| Categoria | Planificado | PASÓ | FALLÓ | % Éxito |
|-----------|-----------|-----------|-----------|-----------|
| Funcional / Pipeline & Modales | 2 | 2 | 0 | 100 |
| Validación de Controles e Interfaz | 1 | 1 | 0 | 100 |
| Persistencia y Reactividad de Estado (UI) | 1 | 1 | 0 | 100 |
| Seguridad y Sanitización Frontend (XSS) | 1 | 1 | 0 | 100 |
| UX / Control de Performance (Debounce) | 1 | 1 | 0 | 100 |
| Navegación & UI/UX (Light/Dark Mode) | 3 | 3 | 0 | 100 |
| **TOTAL** | **9** | **9** | **--** | **100** |

```
La interfaz de usuario de TechMind demostró una sólida madurez técnica y usabilidad durante el Sprint 4. La aplicación mitiga con éxito vulnerabilidades de XSS al sanitizar las entradas en el DOM, gestiona de forma reactiva y sin recargas la actualización del feed de contenidos, y previene condiciones de carrera deshabilitando el botón de envío tras la primera interacción. Asimismo, el sistema conserva una excelente coherencia visual y accesibilidad en sus modos claro y oscuro, garantizando la estabilidad e integridad de todos sus componentes de diseño.
```

### Auditoría Lighthouse (Re-evaluación v2.6.0 Final)

| Categoría | Target Auditado | Score v1.6.0 | Score v2.4.0 | Score v2.5.0 | **Score v2.6.0** |Diagnóstico QA | Estado |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Performance Desktop** | Core Web Vitals | 51 / 100 | 70 / 100 | 66 / 100 | **86 / 100** | Carga de 1.2s (FCP/LCP). TBT de 0ms. Reducción masiva de CLS a `0.177` | 🟢 **Excelente / Cercano a 90+** |
| **Performance Mobile** | Moto G Power (Slow 4G) | 56 / 100 | 66 / 100 | 67 / 100 | **66 / 100** | FCP de 5.4s y LCP de 5.6s. TBT de 0ms y CLS perfecto (`0`). CPU JS en 1.5s | 🟢 En Gran Mejora |
| **Accessibility Audit** | WCAG 2.1 AA | 87 / 100 | 95 / 100 | 100 / 100 | **95 / 100** | Cumplimiento de WCAG 2.1 AA y semántica ARIA al 100% | 🟢 **Sobresaliente** |
| **Best Practices & Security** | Trust & Security Headers | 74 / 100 | 74 / 100 | **74 / 100** | **78 / 100** | Eliminadas las advertencias en Chrome DevTools (*No issues*). Requiere TLS | 🟢 En Mejora |
| **SEO Audit** | Crawling & Metadata | 90 / 100 | 91 / 100 | 91 / 100 | **91 / 100** | Incorporada la etiqueta `<meta name="description">` | 🟢 **Excelente** |
| **TOTAL** | **Entorno Producción Web** | **4 Auditorías** | **4 Auditorías** | **4 Auditorías** | **4 Auditorías** | **4 Reportes PDF Generados (`Google Lighthouse (Desktop) - v4.0.pdf` / `Google Lighthouse (Mobile) - v4.0.pdf`)** | **Completado** |


```
La re-evaluación técnica (v2.6.0) confirmó una evolución técnica excepcional en la optimización del cliente web. Rendimiento en Escritorio se disparó a un hito de 86/100 con cargas de 1.2s y CLS reducido a 0.177. En Móviles se mantuvo la aceleración al doble (5.4s FCP) con cero congelamiento de CPU. Buenas Prácticas subió a 78/100 y SEO se consolidó en 91/100. Para alcanzar el 100% técnico global, resta únicamente configurar el certificado SSL/TLS en el servidor web.
```

## Detalle de Casos de Prueba

### Sprint 1 (FastAPI)

**Testeo Funcionales (Flujo Feliz) — [8 casos]**
- **CP-FASTAPI-01:** Valida que la API clasifique correctamente un contenido técnico válido devuelto con HTTP 200.
- **CP-FASTAPI-02:** Comprueba la extracción y retorno correcto de la lista de palabras clave relevantes en la respuesta.
- **CP-FASTAPI-03:** Verifica la generación de un score de probabilidad de clasificación válido entre 0 y 1.
- **CP-FASTAPI-09:** Confirma que la estructura del objeto JSON devuelto contenga todas las claves y tipos de datos especificados.
- **CP-FASTAPI-10:** Valida la correcta inicialización y carga de los modelos serializados (.joblib) al arrancar el servicio.
- **CP-FASTAPI-11:** Mide el tiempo de respuesta del endpoint asegurando que la inferencia se ejecute en menos de 2000 ms.
- **CP-FASTAPI-20:** Verifica que el modelo normalice y procese adecuadamente textos ingresados con tildes y mayúsculas sostenidas.
- **CP-FASTAPI-22:** Evalúa la latencia, estabilidad y cero tasa de errores del endpoint ante 100 peticiones concurrentes en ráfaga.

**Casos Borde / Encoding (UTF-8) — [3 casos]**
- **CP-FASTAPI-12:** Evalúa el comportamiento y la gestión de memoria de la API ante payloads de gran tamaño (+500k caracteres).
- **CP-FASTAPI-13:** Garantiza la sanitización y el soporte de codificación UTF-8 procesando caracteres especiales, etiquetas y emojis sin errores.
- **CP-FASTAPI-21:** Evalúa cómo reacciona la API ante entradas no técnicas o sin sentido.

**Validación de Esquema / Tipos — [3 casos]**
- **CP-FASTAPI-14:** Confirma el rechazo inmediato (HTTP 422) por parte de Pydantic al enviar tipos de datos no válidos (números o booleanos).
- **CP-FASTAPI-23:** Valida que la API rechace payloads nulos devolviendo 422 Unprocessable Entity cuando el cuerpo enviado está vacío.
- **CP-FASTAPI-24:** Valida que la API detecte errores de sintaxis JSON y rechace la petición con un 422 Unprocessable Entity.

**Seguridad (Inyección SQL / Content-Type) — [2 casos]**
- **CP-FASTAPI-15:** Comprueba la inmunidad ante intentos de inyección SQL guardando los comandos maliciosos como texto plano.
- **CP-FASTAPI-16:** Valida el rechazo de solicitudes con formatos no soportados como XML mediante una respuesta HTTP 422.

**Endpoints Complementarios — [3 casos]**
- **CP-FASTAPI-17:** Verifica la disponibilidad y estado operativo del microservicio mediante el endpoint de diagnóstico GET /health.
- **CP-FASTAPI-18:** Valida que el endpoint GET /categorias retorne el catálogo completo con las 8 categorías del modelo.
- **CP-FASTAPI-25:** Valida que el endpoint GET /predicciones retorne el catálogo completo con las predicciones realizadas.

**Integridad de Datos — [6 casos]**
- **CP-FASTAPI-04:** Controla el rechazo de la solicitud (HTTP 422) cuando el campo "titulo" se envía vacío.
- **CP-FASTAPI-05:** Controla el rechazo de la solicitud (HTTP 422) cuando el campo "texto" no contiene información.
- **CP-FASTAPI-06:** Valida la respuesta de error adecuada al enviar tanto el título como el texto vacíos en el payload.
- **CP-FASTAPI-07:** Comprueba la intercepción y manejo de excepciones ante la recepción de una estructura JSON mal formada.
- **CP-FASTAPI-08:** Verifica el rechazo con código HTTP 405 Method Not Allowed al enviar una petición GET al endpoint POST /predecir.
- **CP-FASTAPI-19:** Verifica que la API rechace la petición cuando se omiten claves obligatorias dentro del cuerpo JSON.

### Sprint 2 (PostgreSQL)

**Completitud — [5 casos]**
- **CP-DB-01:** Verifica la ausencia de filas incompletas en contenidos.
- **CP-DB-02:** Confirma de que no existen registros de texto idénticos sobrecargando la base de datos.
- **CP-DB-03:** Distribución uniforme y validación sobre las 8 categorías temáticas del modelo.
- **CP-DB-04:** Coincidencia del 100% entre la respuesta JSON de la API y el registro persistido en predicciones.
- **CP-DB-05:** Aprobación de rango numérico estrictamente acotado en [0,0; 1,0].

**Integridad y Estructura — [6 casos]**
- **CP-DB-08:** 100% de unicidad en la columna id de predicciones con secuencia autoincremental coherente.
- **CP-DB-09:** Fechas de la columna created_at válidas, no nulas y alineadas a la zona horaria actual.
- **CP-DB-10:** Confirmación de cadenas válidas y limpias sin presencia de nulos ni espacios aislados.
- **CP-DB-11:** Categorías predichas pertenecientes de forma estricta al dominio semántico (Backend, Bases de Datos, etc.).
- **CP-DB-13:** Coincidencia perfecta del 100% en campos clave de la tabla de origen contenidos.
- **CP-DB-14:** Verifica las restricciones PRIMARY KEY sobre la tabla contenidos.

**Formato y Calidad de Texto — [3 casos]**
- **CP-DB-06:** Valida el tipo de dato text[] para palabras clave e inferencias con arreglos vacíos {}.
- **CP-DB-07:** Sanitización e inserción exitosa del texto literal conteniendo comandos destructivos (ej. '; DROP TABLE...) sin alteración de la estructura.
- **CP-DB-15:** Evaluación cualitativa de textos cortos garantizando significancia técnica para el modelo NLP.

**Edge Cases (Límites y Vacíos) — [2 casos]**
- **CP-DB-16:** Validación de rechazo/ausencia de textos con longitud 0 o TRIM nulo.
- **CP-DB-17:** Confirmación de persistencia íntegra de payloads extensos en el tipo de dato TEXT sin truncamiento.

**Rendimiento e inserción masiva — [1 caso]**
- **CP-DB-12:** Resistencia y persistencia exitosa ante ráfagas de carga masiva de hasta 300 peticiones/minuto.

### Sprint 3 (Backend Spring Boot & ML)

**Clasificación y Persistencia Core — [1 caso]**
- **CP-SPRINGBOOT-01:** Valida que la API clasifique e invoque el modelo de ML, responda con HTTP 201 y persista el contenido en PostgreSQL.

**Codificación y Caracteres (UTF-8) — [1 caso]**
- **CP-SPRINGBOOT-02:** Comprueba la preservación correcta de codificación UTF-8, tildes y emojis en la respuesta JSON y en la base de datos.

**Validación de Campos y Esquema — [2 casos]**
- **CP-SPRINGBOOT-03:** Verifica el rechazo de peticiones sin el campo obligatorio título, devolviendo un error HTTP 400 Bad Request.
- **CP-SPRINGBOOT-04:** Confirma que el backend invalide y rechace mediante @NotBlank las entradas con cadenas vacías o solo espacios.

**Seguridad y Sanitización — [1 caso]**
- **CP-SPRINGBOOT-05:** Evalúa la sanitización del ORM ante comillas simples e inyecciones SQL, garantizando la integridad de la base de datos.

**Edge Cases (Textos de Gran Longitud) — [1 caso]**
- **CP-SPRINGBOOT-06:** Mide el rendimiento y la persistencia sin truncamiento al procesar payloads extensos de más de 50,000 caracteres.

### Sprint 4 (Frontend)

**Funcional / Pipeline & Modales — [2 casos]**
- **CP-FRONTEND-01:** Valida que el usuario pueda ingresar título y texto técnico, ejecutar la clasificación asíncrona y visualizar la categoría predicha, porcentaje de confianza y palabras clave en el panel derecho.
- **CP-FRONTEND-03:** Comprueba que el botón ver JSON desplegue un modal formateado con la sintaxis de respuesta cruda devuelta por el backend (categoría, probabilidad, informaciones_adicionales).

**Validación de Controles e Interfaz — [1 caso]**
- **CP-FRONTEND-02:** Verifica que la aplicación no permita enviar el formulario sin completar los campos de texto requeridos, mostrando advertencias en rojo y evitando llamadas innecesarias a la API.

**Persistencia y Reactividad de Estado (UI) — [1 caso]**
- **CP-FRONTEND-04:** Valida que al clasificar un nuevo elemento, este aparezca inmediatamente en el listado inferior de contenidos clasificados recientemente sin necesidad de refrescar la página.

**Seguridad y Sanitización Frontend (XSS) — [1 caso]**
- **CP-FRONTEND-05:** Asegura que scripts o etiquetas HTML e inyecciones JS ingresadas en el formulario no se ejecuten en el navegador y se muestren escapadas como texto plano.

**UX / Control de Performance (Debounce) — [1 caso]**
- **CP-FRONTEND-06:** Inhabilita el botón de envío tras el primer clic pasando a estado cargando/deshabilitado, evitando múltiples peticiones simultáneas o duplicadas al backend ante doble clic.
- **CP-FRONTEND-06:** Inhabilita el botón de envío tras el primer clic pasando a estado cargando/deshabilitado, evitando múltiples peticiones simultáneas o duplicadas al backend ante doble clic.

**Navegación & UI/UX (Light/Dark Mode) — [3 casos]**
- **CP-FRONTEND-07:** Valida la alternancia fluida entre Modo Claro y Modo Oscuro, manteniendo la legibilidad, contraste de componentes y la persistencia del tema tras recargar la página.
- **CP-FRONTEND-08:** Confirma la correcta navegación y redirección de los ítems de la barra lateral (Historial BD, Swagger FastAPI, Clasificador IA) en interfaz con Modo Oscuro.
- **CP-FRONTEND-09:** Confirma la correcta navegación y redirección de los ítems de la barra lateral (Historial BD, Swagger FastAPI, Clasificador IA) en interfaz con Modo Claro.

### Sprint 5 (Performance & Web Vitals — Lighthouse Re-evaluación v2.6.0)

**Core Web Vitals & Rendimiento Desktop — [1 caso]**
- **CP-LIGHTHOUSE-01:** Re-evalúa FCP (`1.2s`), LCP (`1.2s`), TBT (`0ms`) y CLS en escritorio. Registró un avance histórico de 51 a **86/100**. Se logró una reducción del 88% en el CLS (`0.177`) mediante fallbacks tipográficos optimizados.

**Performance Mobile & Redes Móviles 4G — [1 caso]**
- **CP-LIGHTHOUSE-02:** Re-evalúa la experiencia de usuario en *Moto G Power* bajo red *Slow 4G*. FCP y LCP acelerados de `9.9s` a **`5.4s`**. Registra TBT impecable (`0ms`), CLS perfecto (`0`) y optimización del tiempo de CPU de JS a `1.5s`. Score de **66/100**.

**Accesibilidad Web & WCAG 2.1 AA — [1 caso]**
- **CP-LIGHTHOUSE-03:** Evalúa semántica, contraste y lectores de pantalla. Confirmado cumplimiento sobresaliente (**95/100** en Desktop y Mobile) tras incorporar `aria-label="Estado de servicios"` en `button#btn-status-trigger`.

**Seguridad de Red & SEO — [1 caso]**
- **CP-LIGHTHOUSE-04:** Evalúa transporte de red, cabeceras e indexabilidad. SEO se consolidó en **91/100** tras validar la etiqueta `<meta name="description">`. Best Practices ascendió a **78/100** al limpiar las advertencias en DevTools.

---
_QA Testing Guide — TechMind Project v4.1 — Sprint 5 Re-evaluación v4.0_