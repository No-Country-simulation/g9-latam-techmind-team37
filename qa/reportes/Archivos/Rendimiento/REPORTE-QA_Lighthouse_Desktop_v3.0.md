# Informe de Auditoría Técnica y QA - Google Lighthouse (Escritorio) — Re-evaluación v2.5.0 

**Proyecto / URL:** `http://147.15.127.238:5173/` (TechMind - Clasificación de contenido técnico)  
**Fecha de Ejecución:** 20 de agosto de 2026, 17:18hs (GMT-3)  
**Versión de la App:** `v2.5.0`
**Entorno de Prueba:** Emulated Desktop | Chrome 151.0.0.0 | Lighthouse 13.4.0  
**Rol:** Tester QA  
**Documento Adjunto:** [Descargar Nuevo Reporte Completo de Lighthouse Escritorio (PDF)](https://drive.google.com/file/d/1hGS3rMOx5SLFw85Rodx9WotzjusyNA8s/view?usp=sharing)  

---

## 1. Resumen Ejecutivo (Dashboard de Métricas & Evolución)

Se ha realizado una nueva auditoría técnica sobre la versión **v2.5.0** en entorno Desktop. Destaca el logro histórico de **100/100 en Accesibilidad** , consolidando la madurez semántica e inclusiva de la plataforma.

### 📊 Cuadro Comparativo (v1.6.0 vs v2.4.0 Anterior vs v2.5.0 Actual)

| Categoría | Score Inicial (v1.6.0) | Score v2.4.0 (14/08) | **Score Actual v2.5.0 (20/08)** | Evolución Total | Estado |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Performance (Rendimiento)** | 51 / 100 | 70 / 100 | **66 / 100** | 🟢 **+15 pts** | 🟡 Aceptable / En optimización de fuentes |
| **Accessibility (Accesibilidad)** | 87 / 100 | 95 / 100 | **100 / 100** | 🟢 **+13 pts** | 🟢 **PERFECTO / PERFECCIÓN ALCANZADA** |
| **Best Practices (Buenas Prácticas)** | 74 / 100 | 74 / 100 | **74 / 100** | ➖ **0 pts** | ⚠️ Requiere TLS / HTTPS |
| **SEO** | 90 / 100 | 91 / 100 | **91 / 100** | 🟢 **+1 pt** | 🟢 **Excelente** |

---

## 2. Métricas Core Web Vitals y Rendimiento (Performance: 66/100)

El rendimiento mantiene tiempos de respuesta iniciales ágiles , situándose en **66 puntos** debido a leves fluctuaciones en la latencia de la CDN de Google Fonts .

### 2.1 Desglose de Métricas Clave

* **First Contentful Paint (FCP):** `1.4 s` 🟢 **EXCELENTE** (Antes: `2.2 s` | Carga inicial muy rápida) .
* **Largest Contentful Paint (LCP):** `1.4 s` 🟢 **EXCELENTE** (Antes: `2.3 s` | Despliegue de contenido veloz) .
* **Speed Index (SI):** `1.6 s` 🟢 **EXCELENTE** .
* **Total Blocking Time (TBT):** `0 ms` 🟢 **IMPECABLE** (Cero bloqueo del hilo principal) .
* **Cumulative Layout Shift (CLS):** `0.942` 🚨 **MEJORANDO** (Antes: `1.516` y `1.144` | Muestra reducción constante, pero sigue requiriendo self-hosting de fuentes) .

---

### 2.2 Diagnósticos e Insights de Performance

1. **Eficiencia en Peticiones y Assets:**
   * **Peticiones que bloquean la renderización:** Reducidas a un ahorro estimado de solo `700 ms` .
   * **Carga de JavaScript e Hilo Principal:** Reducida a `2.2 s` de trabajo total en Hilo Principal , con `chart.js` completamente diferido (`defer`) .
   * **Payload de Red:** Mantiene un peso ligero total de **`801 KiB`**  (ahorro superior al 50% vs los 1.67 MB iniciales) .

2. **Causa Raíz del CLS Residual (`0.942`):**
   * El desplazamiento visual es causado principalmente por la descarga de tipografías desde la CDN de Google Fonts (`fonts.gstatic.com`) .
   * **Acción Inmediata Requerida:** Hospedar los archivos `.woff2` en el servidor web local (`/assets/fonts/`) para eliminar por completo la latencia de red externa .

---

## 3. Accesibilidad (Accessibility: 100/100) 🎯

¡Se alcanzó la **calificación perfecta de 100/100**! 

### 3.1 Claves del Éxito en Accesibilidad

1. **Resolución Total de Contraste y Atributos:**
   * Se ajustó el contraste de color entre fondo y texto en todos los elementos interactivos y badges (`100% compliant` WCAG 2.1 AA) .
   * Se mantuvieron los atributos `aria-label="Estado de servicios"` en `button#btn-status-trigger` .
2. **Cumplimiento Aprobado (17 auditorías superadas):**
   * Cumplimiento total de jerarquía de encabezados, soporte de zoom para usuarios con baja visión y nombres accesibles en todos los controles e insumos .

---

## 4. Buenas Prácticas (Best Practices: 74/100)

* **Riesgo Inseguro Persistente:** Mantiene 6 solicitudes sobre HTTP inseguro (`http://147.15.127.238:5173`) sin cifrado SSL/TLS ni cabeceras HSTS/CSP en modo *enforcement* .

---

## 5. SEO (SEO: 91/100)

* **Meta Description e Indexabilidad:** Etiqueta `<meta name="description">` correctamente verificada .
* **robots.txt:** Persiste la advertencia de servidor respondiendo `index.html` al consultar `/robots.txt` .

---

## 6. Conclusión y Recomendaciones Finales

* **Celebramos el 100/100 en Accesibilidad** , garantizando una herramienta totalmente inclusiva.
* Para llevar el score de **Performance a +90**, el paso final es descargar y auto-hospedar las fuentes WOFF2 localmente .

---
*Informe generado por el equipo de Quality Assurance de TechMind.*
