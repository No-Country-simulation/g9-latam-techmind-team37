<div align="center">

# 🧠 TechMind
### Organización Inteligente del Conocimiento Técnico

[![Python](https://img.shields.io/badge/Python-3.12.3-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.4+-F7931E?style=flat&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Jupyter](https://img.shields.io/badge/Jupyter-Notebook-F37626?style=flat&logo=jupyter&logoColor=white)](https://jupyter.org/)
[![OCI](https://img.shields.io/badge/Oracle-OCI-F80000?style=flat&logo=oracle&logoColor=white)](https://www.oracle.com/cloud/)
[![Hackathon](https://img.shields.io/badge/G9_LATAM-Team_37-blueviolet?style=flat)](https://github.com/No-Country-simulation/g9-latam-techmind-team37)

**Hackathon TechMind · G9 LATAM · Equipo 37**

</div>

---

## 📌 ¿Qué es TechMind?

TechMind es un sistema de **organización inteligente de contenido técnico**. Dado el título y texto de un artículo, documentación o apunte técnico, el sistema responde automáticamente con:

- 📂 La **categoría temática** del contenido (Backend, Data Science, DevOps, etc.)
- 📊 La **probabilidad** de esa clasificación
- 🔑 Las **palabras clave** más relevantes del texto

Todo en formato JSON, listo para ser consumido por la API REST del equipo.

```json
{
  "categoria": "Backend",
  "probabilidad": 0.8879,
  "informaciones_adicionales": ["spring boot", "java", "api rest", "creación apis", "spring"]
}
```

---

## 🏗️ Arquitectura del Proyecto

```
  Postman / Cliente
       │  POST /contenido
       ▼
┌──────────────────────────────────┐
│   Spring Boot — Puerto 8080      │
└───────────────┬──────────────────┘
                │  HTTP interno POST /predecir
                ▼
┌──────────────────────────────────┐
│   FastAPI (Python) — Puerto 8000 │
│   TF-IDF + Regresión Logística   │
└──────────┬───────────────────────┘
           │
           ▼
┌──────────────────────────────────┐
│   PostgreSQL — Puerto 5432       │
│   contenidos · predicciones      │
└──────────────────────────────────┘
```

| Componente | Tecnología | Responsable |
|-----------|-----------|-------------|
| **Ciencia de Datos** | Python · Scikit-Learn · FastAPI | Ernesto |
| **Back-End** | Java · Spring Boot | Equipo Backend |
| **Nube** | Oracle Cloud Infrastructure (OCI) | Todo el equipo |

---

## 📁 Estructura del Repositorio

```
g9-latam-techmind-team37/
│
├── app/                                   # Microservicio FastAPI (Backend Python)
│   ├── __init__.py
│   ├── main.py                            # API REST: /predecir, /health, /categorias
│   └── database.py                        # Conexión PostgreSQL y registro de predicciones
│
├── documentos/                            # PDFs / DOCXs para ingesta masiva
│
├── data-science/                          # Módulo de Ciencia de Datos y Machine Learning
│   ├── data/
│   │   ├── raw/
│   │   │   └── contenidos_tecnicos.csv    # Dataset inicial de entrenamiento
│   │   └── processed/                     # Datos procesados / intermedios
│   ├── notebooks/
│   │   └── TechMind_DataScience.ipynb     # Notebook Jupyter principal
│   ├── src/
│   │   ├── ingest_documents.py            # Script para ingestión de PDFs/DOCXs
│   │   └── migrate_to_postgres.py         # Script de migración CSV -> PostgreSQL
│   ├── models/
│   │   ├── modelo_clasificador.joblib     # Modelo binario serializado
│   │   └── tfidf_vectorizer.joblib        # Vectorizador TF-IDF serializado
│   ├── docs/                              # Documentación técnica de Data Science
│   │   ├── BACKEND_INTEGRATION.md
│   │   ├── DIAGRAMA_PIPELINE.md
│   │   ├── INGESTA_DOCUMENTOS.md
│   │   ├── EXPLICACION_PROYECTO.md
│   │   ├── REQUIREMENTS.md
│   │   ├── ROADMAP.md
│   │   └── CHANGELOG.md
│   ├── assets/
│   │   └── pipeline_flowchart.png        # Diagrama de flujo del pipeline
│   ├── requirements.txt                  # Dependencias de Python
│   └── README.md                         # Documentación específica del módulo DS
│
├── qa/                                   # Módulo de Quality Assurance
│   ├── casos-de-prueba/                  # Documentación de diseño de pruebas
│   │   └── (v1.0) Matriz de Casos de Prueba – Sprint 1.xlsx          
│   ├── evidencias/                       # Respaldos y ejecuciones de las pruebas
│   │   ├── capturas/                     
│   │   └── respuestas-json/
│   ├── reportes/                         # Informes y resultados finales
│   │   ├── informes/
│   │   │   └── (v1.0) Matriz de Casos de Prueba – Sprint 1.xlsx
│   │   └── resultados-sprint-1.md        # Resumen ejecutivo de métricas, bugs encontrados y estado de ejecución del Sprint 1
│   └── README.md                         # Documentación específica del módulo QA
│
├── docker-compose.yml                    # Servidor PostgreSQL 16
├── setup.py                              # Script automático de instalación y arranque
├── how-to-run.md                         # Guía paso a paso para el equipo de Backend
├── .env.example                          # Plantilla de variables de entorno
├── .gitignore
└── README.md                             # Documentación principal del repositorio
```

---

## 🚀 Cómo ejecutar el proyecto

### Opción rápida — Script automático (recomendado)

```bash
# Primera vez — instala todo y arranca
python setup.py

# Las veces siguientes
python setup.py --start
```

> Ver la guía completa paso a paso en [`how-to-run.md`](how-to-run.md) (especialmente útil para el equipo de Backend en Windows).

### Pasos manuales

#### 1. Clonar el repositorio

```bash
git clone https://github.com/No-Country-simulation/g9-latam-techmind-team37.git
cd g9-latam-techmind-team37
```

#### 2. Crear entorno virtual e instalar dependencias

```bash
python3 -m venv venv
source venv/bin/activate          # macOS / Linux
# venv\Scripts\activate           # Windows

pip install -r data-science/requirements.txt
```

#### 3. Levantar PostgreSQL con Docker

```bash
docker-compose up -d
# PostgreSQL disponible en localhost:5432
```

#### 4. Configurar variables de entorno y migrar datos

```bash
cp .env.example .env
python3 data-science/src/migrate_to_postgres.py
```

#### 5. Iniciar la API FastAPI

```bash
uvicorn app.main:app --reload --port 8000
```

---

## 🧪 Pipeline de Ciencia de Datos

![Diagrama del Pipeline](data-science/assets/pipeline_flowchart.png)

| Paso | Descripción | Función / Herramienta |
|------|-------------|----------------------|
| 1 | **Carga de datos** desde PostgreSQL (`contenidos`) | `pd.read_sql_query()` |
| 2 | **EDA** — distribución de categorías, longitud de textos, nulos | `matplotlib` / `seaborn` |
| 3 | **Preprocesamiento** — minúsculas, remover puntuación, stopwords | `limpiar_texto()` |
| 4 | **Vectorización TF-IDF** — unigramas y bigramas, max 1500 features | `TfidfVectorizer` |
| 5a | **Entrenamiento** — Regresión Logística balanceada | `LogisticRegression` |
| 5b | **Extracción de keywords** — top 5 tokens por peso TF-IDF | `extraer_keywords()` |
| 6 | **Evaluación** — accuracy, precision/recall/F1 | `classification_report` |
| 7 | **Serialización** de artefactos en `data-science/models/` | `joblib.dump()` |

> Ver [`data-science/docs/DIAGRAMA_PIPELINE.md`](data-science/docs/DIAGRAMA_PIPELINE.md) para el diagrama interactivo Mermaid.

---

## 📬 Contrato de la API

### Endpoint: `POST /predecir`

**Request:**
```json
{
  "titulo": "Introducción a Spring Boot",
  "texto": "Conceptos básicos para la creación de APIs REST con Java y Spring Boot."
}
```

**Response:**
```json
{
  "categoria": "Backend",
  "probabilidad": 0.8879,
  "informaciones_adicionales": ["spring boot", "java", "api rest", "creación apis", "spring"]
}
```

---

## 📚 Documentación Técnica

- **Guía de arranque para Backend (Windows):** [`how-to-run.md`](how-to-run.md)
- Guía de integración Java/Spring Boot: [`data-science/docs/BACKEND_INTEGRATION.md`](data-science/docs/BACKEND_INTEGRATION.md)
- Guía de entrenamiento y ejecución del modelo: [`data-science/docs/ENTRENAMIENTO_Y_EJECUCION.md`](data-science/docs/ENTRENAMIENTO_Y_EJECUCION.md)
- Ingesta de documentos PDF/DOCX: [`data-science/docs/INGESTA_DOCUMENTOS.md`](data-science/docs/INGESTA_DOCUMENTOS.md)
- Diagrama interactivo del pipeline: [`data-science/docs/DIAGRAMA_PIPELINE.md`](data-science/docs/DIAGRAMA_PIPELINE.md)
- Explicación conceptual para presentaciones: [`data-science/docs/EXPLICACION_PROYECTO.md`](data-science/docs/EXPLICACION_PROYECTO.md)
- Requerimientos técnicos: [`data-science/docs/REQUIREMENTS.md`](data-science/docs/REQUIREMENTS.md)
- Historial de cambios: [`data-science/docs/CHANGELOG.md`](data-science/docs/CHANGELOG.md)

---

## 👥 Equipo

| Rol | Tecnología | Integrante |
|-----|-----------|-----------|
| **Ciencia de Datos** | Python · Scikit-Learn · FastAPI · PostgreSQL | Equipo Data Science |
| **Back-End** | Java · Spring Boot | Equipo Backend |
| **Cloud** | Oracle Cloud Infrastructure | Equipo QA |
| **Cloud** | Oracle Cloud Infrastructure | Todo el equipo |

---

<div align="center">

**TechMind · Hackathon G9 LATAM · Equipo 37**

</div>
