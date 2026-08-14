# 🧪 Informe de Ejecución de Pruebas QA — Sprint 5

**Proyecto:** TechMind — Organización Inteligente del Conocimiento Técnico  
**Componente:** Auditoría No Funcional de Rendimiento (Core Web Vitals), Accesibilidad (WCAG 2.1), Seguridad y SEO  
**Entorno de Prueba:** Google Lighthouse 13.4 (Emulated Desktop & Moto G Power / Slow 4G) | Target: `http://147.15.127.238:5173/`  
**Responsable QA:** Federico G. Gutierrez  
**Fecha de Ejecución:** 13 de Agosto de 2026  

---

## 📈 Resumen Ejecutivo

Durante el **Sprint 5** se llevó a cabo una auditoría técnica exhaustiva y no funcional enfocada en la calidad del cliente web en producción, utilizando la suite oficial de **Google Lighthouse 13.4** Se evaluaron dos perfiles de uso: **Escritorio (Desktop)** y **Dispositivos Móviles (Mobile - Moto G Power bajo simulación de red Slow 4G)**

El análisis cubrió los 4 pilares fundamentales de calidad web:
1. **Performance (Rendimiento & Core Web Vitals):** Medición de latencia FCP, LCP, TBT y estabilidad visual CLS
2. **Accessibility (Accesibilidad Web):** Cumplimiento de estándares WCAG 2.1 AA, contraste y semántica ARIA
3. **Best Practices (Buenas Prácticas & Trust/Safety):** Seguridad de transporte, cabeceras HTTP y compatibilidad
4. **SEO (Search Engine Optimization):** Indexabilidad, estructura semántica y metadatos

Se completaron con éxito los 4 bloques de auditoría planificados, identificando oportunidades críticas de optimización en la carga de activos (*bundles* JS/CSS, fuentes) y en la capa de seguridad de la red

---

### 📊 Métricas Consolidadas de Auditoría (Lighthouse)

| Categoría Auditada | Score Desktop | Score Mobile (Slow 4G) | Estado / Diagnóstico QA | Umbral Objetivo |
| :--- | :---: | :---: | :--- | :---: |
| **Performance** | **51 / 100** | **56 / 100** | ⚠️ Requiere optimización crítica de activos y fuentes[cite: 1, 2] | ≥ 90 |
| **Accessibility** | **87 / 100** | **87 / 100** | 🟡 Aceptable / Ajustar contraste y etiquetas ARIA[cite: 1, 2] | ≥ 95 |
| **Best Practices** | **74 / 100** | **74 / 100** | ⚠️ Inseguro / Ausencia de HTTPS y Security Headers[cite: 1, 2] | 100 |
| **SEO** | **90 / 100** | **90 / 100** | 🟢 Bueno / Añadir etiqueta `meta description`[cite: 1, 2] | 100 |

---

## 🧪 Desglose por Áreas y Tipos de Auditoría

| Categoría de Prueba | Planificado | PASÓ | Hallazgos Críticos | % Cobertura |
| :--- | :---: | :---: | :--- | :---: |
| Performance Desktop (CLS & Render Blocking) | 1 | 1 | Elevado CLS (`1.516`) por fuentes externas | 100% |
| Performance Mobile (FCP, LCP & Heavy Bundles) | 1 | 1 | FCP/LCP de ~10s bajo red 4G | 100% |
| Accessibility Audit (WCAG 2.1 AA) | 1 | 1 | Botón sin label y bajo contraste[cite: 1, 2] | 100% |
| Best Practices & SEO (Trust & Security) | 1 | 1 | Inexistencia de cifrado SSL/TLS[cite: 1, 2] | 100% |
| **TOTAL** | **4** | **4** | **4 Informes Generados** | **100%** |

---

## ⚡ Desglose de Métricas Core Web Vitals (Desktop vs. Mobile)

| Métrica / Indicator | Valor Desktop | Valor Mobile (4G) | Impacto y Evaluación QA |
| :--- | :---: | :---: | :--- |
| **First Contentful Paint (FCP)** | `2.2 s` | **`9.9 s`** 🚨 | Muy lento en redes móviles. Carga inicial bloqueada por scripts. |
| **Largest Contentful Paint (LCP)** | `2.3 s` | **`10.9 s`** 🚨 | El contenido principal tarda ~11s en desplegarse en 4G. |
| **Total Blocking Time (TBT)** | `0 ms` | `0 ms` | 🟢 Excelente capacidad de respuesta tras la renderización inicial |
| **Cumulative Layout Shift (CLS)** | **`1.516`** 🚨 | **`0`** 🟢 | Inestabilidad visual masiva en escritorio por descarga asíncrona de tipografías. |
| **Peso Total del Payload (Red)** | `1,668 KiB` | `1,669 KiB` | ⚠️ 1.2 MB pertenecen únicamente a Google Fonts (`.woff2`) |

---

## 🐛 Registro de Incidentes, Riesgos de Seguridad y Mejoras (Sprint 5)

| ID Bug / Issue | Componente | Descripción de la Falla / Hallazgo | Solución / Recomendación QA | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-06** | Infrastructure / Net | **Servidor Web Inseguro (No HTTPS):** La aplicación se sirve sobre HTTP (`http://147.15.127.238:5173/`) Sin cifrado SSL ni redirección | Configurar certificado SSL/TLS (Let's Encrypt / Nginx) y forzar HTTPS | **ABIERTO** (Alta) |
| **BUG-07** | Frontend / Assets | **Desplazamiento Visual Severo (CLS = 1.516):** La carga de fuentes externas desde Google Fonts provoca saltos del DOM durante el renderizado. | Aplicar `font-display: swap`, definir métricas *fallback* y auto-hospedar fuentes `.woff2`. | **ABIERTO** (Alta) |
| **BUG-08** | Frontend / Performance | **Recursos Bloqueantes de Render (Render-blocking):** `tailwindcss.com`, `chart.js` y `app.js` bloquean la pantalla hasta por 7.5s en móviles. | Compilar CSS localmente con Tailwind CLI y diferir (`defer`) scripts de librerías | **ABIERTO** (Media) |
| **BUG-09** | Frontend / A11y | **Falta de ARIA Label:** `button#btn-status-trigger` no posee nombre accesible para lectores de pantalla | Agregar atributo `aria-label="Estado de conexión del sistema"` | **ABIERTO** (Baja) |
| **BUG-10** | Frontend / SEO | **Ausencia de Meta Description:** La página no cuenta con tag de descripción para buscadores | Incluir `<meta name="description" content="...">` dentro del `<head>` | **ABIERTO** (Baja) |

---

## 🎯 Conclusión y Plan de Acción QA

La auditoría de calidad no funcional del **Sprint 5** ha aportado métricas objetivas indispensables para llevar el proyecto a un nivel de madurez listo para producción:

1. **Prioridad Inmediata (Seguridad y TLS):** Es obligatorio implementar un proxy inverso con HTTPS para corregir la penalización en *Best Practices* (74/100) y mitigar riesgos de interceptación de tráfico
2. **Prioridad en Performance (Optimización de Assets):** La eliminación del CDN externo de Tailwind y la reducción de la carga tipográfica (que actualmente representa más del 70% del tráfico total) reducirá el tiempo de carga en móviles de 10.9s a menos de 2.5s.
3. **Estabilidad Visual en Escritorio:** El ajuste de las declaraciones CSS para fuentes tipográficas erradicará el CLS de 1.516, llevando el score de Performance en Desktop de 51 a más de 90 puntos.

---

### 📄 Documentación Adjunta y Reportes Generados
* 💻 **Informe Completo Lighthouse Desktop:** [`informe_lighthouse_escritorio.md`](./informe_lighthouse_escritorio.md) | [Descargar PDF Original](https://drive.google.com/file/d/1hABBis34oLTwinbT57K0m6-Q1qVM08Z9/view?usp=sharing)
* 📱 **Informe Completo Lighthouse Mobile:** [`QA-REPORT_Lighthouse_Mobile_2026-08-13.md`](./QA-REPORT_Lighthouse_Mobile_2026-08-13.md) | [Descargar PDF Original](https://drive.google.com/file/d/1e_xcBMoTtd0rkCGdtV3kbzkdpGTfC-0z/view?usp=sharing)
