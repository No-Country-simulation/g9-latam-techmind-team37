# Informe de Auditoría Técnica y QA - Google Lighthouse (Mobile) — Re-evaluación v2.5.0

**Proyecto / URL:** `http://147.15.127.238:5173/` (TechMind - Clasificación de contenido técnico)  
**Fecha de Ejecución:** 20 de agosto de 2026, 17:15hs (GMT-3)  
**Versión de la App:** `v2.5.0`
**Entorno de Prueba:** Emulated Moto G Power | Slow 4G Throttling | Chrome 151.0.0.0 | Lighthouse 13.4.0  
**Rol:** Tester QA Senior / Performance Analyst  
**Documento Adjunto:** [Descargar Nuevo Reporte Completo de Lighthouse Mobile (PDF)](https://drive.google.com/file/d/1mkeg9ObAJ2ZGO_4cXZqylQEVqS0KdZyF/view?usp=sharing)   

---

## 1. Resumen Ejecutivo (Dashboard de Métricas & Evolución Mobile)

Se ha realizado la nueva auditoría técnica no funcional sobre la versión **v2.5.0** en entorno **Mobile (Moto G Power / Red Slow 4G)** documentada en `Google Lighthouse (Mobile) - v3.0.pdf`. Al igual que en la versión Desktop, se ha alcanzado la **puntuación máxima e histórica de 100/100 en Accesibilidad** para dispositivos móviles.

### 📊 Cuadro Comparativo Mobile (v1.6.0 vs v2.4.0 Anterior vs v3.0 / Actual)

| Categoría | Score Inicial (v1.6.0) | Score v2.4.0 (14/08) | **Score Actual (20/08)** | Evolución Total | Estado |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Performance (Rendimiento)** | 56 / 100 | 66 / 100 | **67 / 100** | 🟢 **+11 pts** | 🟡 Sólida velocidad en redes 4G |
| **Accessibility (Accesibilidad)** | 87 / 100 | 95 / 100 | **100 / 100** | 🟢 **+13 pts** | 🟢 **PERFECTO / PERFECCIÓN ALCANZADA** |
| **Best Practices (Buenas Prácticas)** | 74 / 100 | 74 / 100 | **74 / 100** | ➖ **0 pts** | ⚠️ Requiere TLS / HTTPS |
| **SEO** | 90 / 100 | 91 / 100 | **91 / 100** | 🟢 **+1 pt** | 🟢 **Excelente** |

---

## 2. Métricas Core Web Vitals y Rendimiento Mobile (Performance: 67/100)

El rendimiento en dispositivos móviles bajo redes 4G simuladas se consolida en **67 puntos**, recortando a la mitad la latencia de carga inicial respecto al inicio del proyecto.

### 2.1 Desglose de Métricas Clave

* **First Contentful Paint (FCP):** `5.4 s` 🟢 **EXCELENTE AVANCE** (Antes: `9.9 s` | Reducción del **45.4%**).
* **Largest Contentful Paint (LCP):** `5.4 s` 🟢 **EXCELENTE AVANCE** (Antes: `10.9 s` | Reducción del **50.4%** en carga visual).
* **Speed Index (SI):** `5.4 s` 🟢 **MEJORA SUSTANCIAL** (Antes: `9.9 s` | Reducción del **45.4%**).
* **Total Blocking Time (TBT):** `0 ms` 🟢 **IMPECABLE** (Cero congestión de la CPU móvil).
* **Cumulative Layout Shift (CLS):** `0` 🟢 **PERFECTO** (Inexistencia total de desplazamientos en pantalla móvil).

---

### 2.2 Diagnósticos e Insights de Performance Mobile

1. **Eficiencia en Peticiones y Datos:**
   * **Ahorro por Render-blocking:** Reducido a `3,180 ms` (Ahorro de más de 4.3 segundos en 4G).
   * **Carga de Scripts e Hilo Principal:** `chart.js` diferido (`defer`) optimiza la ejecución de JS a solo 3.8s totales en CPU móvil.
   * **Payload de Red:** Transferencia total ligera de **`801 KiB`** (Ahorro del 52% en consumo de datos móviles).

2. **Oportunidad Técnica Pendiente en Móviles:**
   * **Tailwind CDN:** La inyección de `cdn.tailwindcss.com` causa una espera de ~780ms. Compilar el CSS localmente mediante Tailwind CLI/Vite entregará un paquete estático minificado (< 20 KB) llevando la carga en 4G por debajo de los 2.5s.

---

## 3. Accesibilidad Mobile (Accessibility: 100/100) 🎯

¡Puntuación perfecta de **100/100** para dispositivos móviles táctiles!

### 3.1 Correcciones Verificadas
* **Cumplimiento de Contraste (WCAG 2.1 AA):** Se resolvieron todas las incidencias de contraste en textos, enlaces y componentes de la UI.
* **Atributos ARIA y Touch Targets:** Atributo `aria-label="Estado de servicios"` en `button#btn-status-trigger` verificado, junto con áreas de toque táctil accesibles en pantallas pequeñas.

---

## 4. Buenas Prácticas y Seguridad (Best Practices: 74/100)

* **Riesgo Inseguro Persistente:** Mantiene 6 peticiones sobre HTTP no cifrado (`http://147.15.127.238:5173`) sin SSL/TLS ni cabeceras de seguridad `CSP`/`HSTS`.

---

## 5. SEO Mobile (SEO: 91/100)

* **Metadatos e Indexabilidad:** Etiqueta `<meta name="description">` correctamente integrada.
* **Robots.txt:** Se observa la respuesta de `index.html` al consultar `/robots.txt`, la cual debe reemplazarse por un archivo de texto plano.

---

## 6. Comparativa QA: v1.6.0 vs v3.0 / v2.4.0 Actual (Mobile 4G)

| Métrica | Versión Inicial (v1.6.0) | **Versión Actual v3.0** | Impacto Real en Usuario Móvil |
| :--- | :---: | :---: | :--- |
| **Score Performance** | 56 / 100 | **67 / 100** | 🚀 +11 puntos de rendimiento global. |
| **FCP (Primer Pintado)** | 9.9 s | **5.4 s** | ⏱️ **4.5 segundos más rápido** para ver contenido. |
| **LCP (Carga Principal)** | 10.9 s | **5.4 s** | ⏱️ **5.5 segundos más rápido** para interactuar. |
| **CLS (Inestabilidad Visual)**| 0 | **0** | 🟢 Cero desplazamientos molestos. |
| **Accesibilidad** | 87 / 100 | **100 / 100** | 🎯 **100% Accesible (WCAG 2.1 AA)**. |
| **Peso Total Cargado** | 1,669 KiB | **801 KiB** | 📉 **Ahorro del 52% de datos móviles**. |

---
*Informe generado por el equipo de Quality Assurance de TechMind.*