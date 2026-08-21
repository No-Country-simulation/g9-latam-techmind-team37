<div align="center">

# 🧠 TechMind
### Intelligent Organization of Technical Knowledge

[![Java](https://img.shields.io/badge/Java-17-ED8B00?style=flat&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-4.x-6DB33F?style=flat&logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=flat&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.4+-F7931E?style=flat&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-24+-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![Hackathon](https://img.shields.io/badge/G9_LATAM-Team_37-blueviolet?style=flat)](https://github.com/No-Country-simulation/g9-latam-techmind-team37)

**Hackathon TechMind · G9 LATAM · Team 37**

[ 🇪🇸 Español ](README.md) · [ 🇬🇧 English ](README_EN.md)

</div>

---

## 📌 What is TechMind?

TechMind is an intelligent web platform designed for the **automated organization and classification of technical content**. By analyzing the title and body of an article, document, or code snippet, the platform processes the text and returns real-time insights:

- 📂 **Thematic Category**: (`Backend`, `Frontend`, `Data Science`, `DevOps`, `Mobile`, `Databases`, `Security`, `Cloud`)
- 📊 **Prediction Confidence / Probability Score**
- 🔑 **Relevant Keywords**: Automatically extracted using TF-IDF feature vectors
- 📄 **PDF & DOCX Document Import**: Automatic text extraction, title inference, and editable preview before classifying
- 📜 **Persistent Query History**: Accessible from the web UI with all recorded classifications

---

## 🏗️ System Architecture

<div align="center">

![TechMind System Architecture and Workflow](assets/techmind_project_flow.png)

</div>

```
┌───────────────────────────────────────────────────────────────────────────────────┐
│                    Oracle Cloud Infrastructure (OCI)                              │
│ ┌───────────────────────────────────────────────────────────────────────────────┐ │
│ │                  Docker & Docker Compose Multi-Container                      │ │
│ │                                                                               │ │
│ │ ┌───────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │                   Web Client / Frontend (Nginx)                           │ │ │
│ │ │                   HTML5 + Vanilla JS + TailwindCSS                        │ │ │
│ │ │                   http://localhost:5173                                   │ │ │
│ │ └─────────────────────────────────────┬─────────────────────────────────────┘ │ │
│ │                                       │ HTTP POST /contenido                  │ │
│ │                                       ▼                                       │ │
│ │ ┌───────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │            Main Backend API — Spring Boot (Java 17)                       │ │ │
│ │ │            Port 8080 · JPA / Hibernate · Flyway Migrations                │ │ │
│ │ └──────────────┬──────────────────────────────────────────┬─────────────────┘ │ │
│ │                │ HTTP POST /predecir                      │ JDBC              │ │
│ │                ▼                                          ▼                   │ │
│ │ ┌──────────────────────────────┐          ┌──────────────────────────────┐    │ │
│ │ │ Data Science Microservice    │          │ PostgreSQL 16 Database       │    │ │
│ │ │ FastAPI (Python) · :8000     │          │ Port 5432                    │    │ │
│ │ │ Calibrated Ensemble (LR+SVC) │          │ contents · predictions       │    │ │
│ │ └──────────────────────────────┘          └──────────────────────────────┘    │ │
│ └───────────────────────────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### ☕ Back-End (Java / Spring Boot)
- **Java 17 (LTS)**: Primary language for transactional backend services.
- **Spring Boot 4.x**: Core framework for REST APIs.
- **Spring Data JPA / Hibernate**: ORM for relational data persistence.
- **Flyway**: Database version control and automated migrations (`V1__create_tables.sql`).
- **Lombok**: Boilerplate code reduction (Getters, Setters, Constructors).
- **Maven Wrapper**: Dependency management and reproducible builds.

### 🤖 Data Science & Machine Learning (Python / FastAPI)
- **Python 3.12**: Runtime environment for AI and NLP pipelines.
- **FastAPI & Uvicorn**: High-performance asynchronous microservice.
- **Scikit-Learn**:
  - `TfidfVectorizer` (sublinear TF scaling, 6,000 max features, n-grams 1 to 3) for feature and keyword extraction.
  - **Calibrated Ensemble (`VotingClassifier` Soft Voting)**: Combines `LogisticRegression`, `CalibratedClassifierCV(LinearSVC)`, and `ComplementNB` for maximum precision and calibrated probabilities.
  - **Stratified K-Fold Cross Validation (K=5)** in development notebook (87.28% CV Accuracy, 90.38% Holdout).
- **Pandas & NumPy**: Data manipulation, dataset cleaning, and technical text augmentation.
- **Document Ingestion & Parsing**: `pdfplumber` (PDFs up to 15 pages), `python-docx` (DOCX up to 4,500 words), and `python-multipart` (secure file stream handling).
- **Joblib**: Serialization and deserialization of trained ML models.

### 🎨 Front-End (Web UI)
- **HTML5 & CSS3**: Modern semantic structure with custom design tokens.
- **TailwindCSS v3**: **Cyber AI Dark Mode** interface with cinematic Glassmorphism aesthetics.
- **Vanilla JavaScript (ES6+)**: SPA navigation, REST API integration, i18n localization (ES ⇄ EN), and dynamic Chart.js dashboards.
- **Nginx Alpine**: Lightweight web server for containerized deployment.

### 🗄️ Database & Infrastructure
- **PostgreSQL 16**: Primary relational storage.
- **Docker & Docker Compose**: Multi-container orchestration (PostgreSQL, FastAPI, Spring Boot, Frontend).
- **Oracle Cloud Infrastructure (OCI)**: Cloud production hosting.

---

## 👥 Team & Roles

| Member | Role / Specialty | Key Responsibilities |
|--------|------------------|----------------------|
| **Ernesto Llampa** | Data Science / Fullstack / Cloud | NLP pipeline, TF-IDF vectorization, ML model training, Full Integration, Web Frontend UI, Docker auto-healing & `setup.py`, OCI cloud deployment & optimization |
| **Leandro Villamil** | Data Science / ML | NLP pipeline, TF-IDF vectorization & model training, pilot testing and demonstration, analysis, Frontend responsive UI/UX |
| **Rómulo García Maygua** | Data Science / ML | Data ingestion, exploratory data analysis (EDA), and Jupyter notebooks |
| **Sergio Pablo Vilte** | Backend Java | Spring Boot REST API development, controllers, and prediction service |
| **Andrés Felipe Rojas** | Backend Java | Spring Boot configuration, JPA entities and DTOs, Frontend responsive UI/UX |
| **Noelia Rementeria** | Backend Java | Spring Boot REST API development, database configuration, and backend support |
| **Camila Fagina** | Backend Java | Backend support and transactional business logic |
| **Federico Gutierrez** | Quality Assurance (QA) | Test matrix, manual endpoint testing, Swagger validation, Frontend QA |

---

## 📁 Repository Structure

```
g9-latam-techmind-team37/
│
├── app/                                   # FastAPI Microservice (Python)
│   ├── main.py                            # REST API: /predecir, /extraer-texto, /health, /analytics
│   ├── documento_extractor.py             # Secure parsing and ingestion for PDF & DOCX
│   ├── database.py                        # PostgreSQL database queries for query history
│   └── Dockerfile                         # FastAPI Docker Image
│
├── backend/                               # Main Backend API (Spring Boot / Java)
│   ├── Dockerfile                         # Spring Boot Multi-Stage Docker Image
│   └── api                                # Maven / Spring Boot project
│       ├── pom.xml
│       ├── src/main/java/api/             # Controllers, JPA Entities, DTOs, and Services
│       └── src/main/resources/            # application.properties & db/migration (Flyway)
│
├── frontend/                              # Web Frontend (Cyber AI UI)
│   ├── index.html                         # Graphic UI (Cyber AI Dark Mode Glassmorphism)
│   ├── app.js                             # API consumption, i18n, and SPA history rendering
│   └── Dockerfile                         # Nginx Alpine Docker Image for production
│
├── data-science/                          # Data Science & Machine Learning module
│   ├── data/raw/contenidos_tecnicos.csv   # Technical dataset (221 curated records)
│   ├── models/                            # Serialized binary models (.joblib)
│   ├── notebooks/TechMind_DataScience.ipynb # Interactive Jupyter Notebook
│   └── src/
│       ├── generate_models.py             # Ultra-fast offline model trainer for auto-healing
│       ├── ingest_documents.py            # Batch document ingestion for PDF / DOCX
│       └── migrate_to_postgres.py         # Initial database seeder for PostgreSQL
│
├── qa/                                    # Quality Assurance Module
│   ├── casos-de-prueba/                   # Test design documentation & matrices
│   ├── evidencias/                        # Test execution logs and screenshots
│   └── reportes/                          # Sprint execution summaries & bug reports
│
├── docker-compose.yml                     # 4-Service Docker orchestration configuration
├── setup.py                               # Universal cross-platform installer (Windows/Mac/Linux)
├── how-to-run.md                          # Step-by-step execution guide
├── README_EN.md                           # English documentation (this file)
└── README.md                              # Main documentation (Spanish)
```

---

## 🚀 How to Run the Project

### 🐳 Option 1: 100% Dockerized Deployment (Recommended)
To start the entire solution without needing Java or Python installed on your local machine:

```bash
python setup.py --docker
```

> 🔐 **Administrator Credentials Setup (First Deployment):**
> When running `setup.py` or `setup.py --docker` for the first time, the installer will interactively prompt you in the terminal to set your preferred **username** (`ADMIN_USER`) and **password** (`ADMIN_PASSWORD`). These will be saved automatically in your `.env` file. If you press *Enter* without typing, default credentials (`admin` / `admin123`) will be assigned. These credentials allow you to log in via the Web UI to delete query records and manage the platform without limits.

Or directly with Docker Compose:
```bash
docker compose --profile full up -d --build
```

This will spin up all 4 services:
- 🎨 **Frontend Web UI:** [http://localhost:5173](http://localhost:5173)
- ☕ **Spring Boot API:** [http://localhost:8080](http://localhost:8080)
- 🤖 **FastAPI ML Service:** [http://localhost:8000](http://localhost:8000)
- 📖 **Swagger Documentation:** [http://localhost:8000/docs](http://localhost:8000/docs)

### 💻 Option 2: Local Development (Mode A)
```bash
python setup.py
```
The installer will create the Python virtual environment, prompt for admin credentials if running for the first time, install dependencies, spin up the PostgreSQL container, and launch all services.

> 📖 For a complete step-by-step walkthrough on Windows/macOS/Linux, see [`how-to-run.md`](how-to-run.md).

---

## 📬 REST API Contract

### Endpoint: `POST /predecir` (FastAPI / Spring Boot)

**Request Body:**
```json
{
  "titulo": "Dependency Injection in Spring Boot",
  "texto": "Tutorial explaining @Autowired, @Component, and bean configuration inside the IoC container."
}
```

**Response 200 OK:**
```json
{
  "categoria": "Backend",
  "probabilidad": 0.8879,
  "informaciones_adicionales": [
    "spring boot",
    "java",
    "autowired",
    "component",
    "beans"
  ]
}
```

---

## 📚 Additional Documentation

- 📄 **Quickstart & Execution Guide**: [`how-to-run.md`](how-to-run.md)
- 📄 **Changelog & Version History**: [`CHANGELOG.md`](CHANGELOG.md)
- 📄 **Technical Bugfix Register**: [`data-science/docs/BUGFIX_REGISTRO.md`](data-science/docs/BUGFIX_REGISTRO.md)
- 📄 **Backend / ML Integration**: [`data-science/docs/BACKEND_INTEGRATION.md`](data-science/docs/BACKEND_INTEGRATION.md)
- 📄 **PDF/DOCX Document Ingestion**: [`data-science/docs/INGESTA_DOCUMENTOS.md`](data-science/docs/INGESTA_DOCUMENTOS.md)
- 📄 **QA Executive Report**: [`qa/reportes/Informes/RESULTADOS.md`](qa/reportes/Informes/RESULTADOS.md)

---

<div align="center">

**TechMind · Hackathon G9 LATAM · Team 37**

</div>
