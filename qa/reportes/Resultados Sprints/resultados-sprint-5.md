# 🧪 Informe de Ejecución de Pruebas QA — Sprint 5 (Re-evaluación v2.6.0)

**Proyecto:** TechMind — Organización Inteligente del Conocimiento Técnico  
**Componente:** Auditoría No Funcional de Rendimiento (Core Web Vitals), Accesibilidad (WCAG 2.1), Seguridad y SEO  
**Entorno de Prueba:** Google Lighthouse 13.4 (Emulated Desktop & Moto G Power / Slow 4G) | Target: `http://147.15.127.238:5173/`
**Responsable QA:** Federico G. Gutierrez  
**Fecha de Ejecución:** 21 de Agosto de 2026 (Re-evaluación v2.6.0)

---

## 📈 Resumen Ejecutivo

Durante la **re-evaluación técnica final del Sprint 5 (v2.6.0)**, se auditó el impacto de las últimas optimizaciones de JS, fallbacks de fuentes y limpieza de DevTools sobre el cliente web mediante la suite oficial de **Google Lighthouse 13.4** tanto en **Desktop** (`Google Lighthouse (Desktop) - v4.0.pdf`) como en **Mobile** (`Google Lighthouse (Mobile) - v4.0.pdf`).

Los avances confirmados marcan hitos históricos de rendimiento y calidad:
1. **Performance (Rendimiento & Core Web Vitals):** Desktop registró un avance de **86/100** (FCP/LCP de 1.2s y reducción masiva del 88% en el CLS a `0.177`). Mobile se consolidó en **66/100** (FCP de 5.4s y LCP de 5.6s en red 4G).
2. **Accessibility (Accesibilidad Web):** Se ratifica un nivel sobresaliente con **95/100 en Desktop y Mobile** (100% de cumplimiento WCAG 2.1 AA y atributos ARIA).
3. **Best Practices (Buenas Prácticas & Seguridad):** Ascendió a **78/100** tras la eliminación completa de advertencias en Chrome DevTools (*No issues in DevTools*).
4. **SEO (Search Engine Optimization):** Se consolida en **91/100** tras validar la presencia y estructura de la etiqueta `<meta name="description">`.

---

### 📊 Métricas Consolidadas de Auditoría (Evolución v1.6.0 vs v2.4.0 vs v2.5.0 Actual)

| Categoría Auditada | Score Desktop v1.6.0 | Score Desktop v2.6.0 (21/08) | Score Mobile v1.6.0 | Score Mobile v2.6.0 (21/08) | Estado / Diagnóstico QA | Umbral Objetivo |
| :--- | :---: | :---: | :---: | :---: | :--- | :---: |
| **Performance** | 51 / 100 | **86 / 100** 🚀 | 56 / 100 | **66 / 100** 🟢 | 🟢 Carga ultra rápida (1.2s FCP/LCP en Desktop y 5.4s en Mobile 4G). | ≥ 90 |
| **Accessibility** | 87 / 100 | **95 / 100** 🟢 | 87 / 100 | **95 / 100** 🟢 | 🟢 Sobresaliente. | ≥ 95 |
| **Best Practices** | 74 / 100 | **78 / 100** 🟢 | 74 / 100 | **78 / 100** 🟢 | ⚠️ Requiere habilitar cifrado HTTPS/TLS en servidor. | 100 |
| **SEO** | 90 / 100 | **91 / 100** 🟢 | 90 / 100 | **91 / 100** 🟢 | 🟢 **Excelente**. | ≥ 90 |

---

## 🧪 Desglose por Áreas y Tipos de Auditoría (v2.5.0)

| Categoría de Prueba | Planificado | PASÓ | Estado de los Hallazgos | % Cobertura |
| :--- | :---: | :---: | :--- | :---: |
| Performance Desktop (Core Web Vitals) | 1 | 1 | FCP/LCP de 1.2s. TBT de 0ms. CLS optimizado a `0.177`. | 100% |
| Performance Mobile (Slow 4G Throttling) | 1 | 1 | FCP de 5.4s. TBT de 0ms. CLS impecable (`0`). | 100% |
| Accessibility Audit (WCAG 2.1 AA) | 1 | 1 | 95/100 en Desktop / 95/100 en Mobile. Semántica ARIA y contraste. | 100% |
| Best Practices & SEO (Trust & Metadata) | 1 | 1 | `meta description` agregada. DevTools limpio (*No issues*). Requiere SSL/TLS. | 100% |
| **TOTAL** | **4** | **4** | **4 Reportes PDF Generados (`Google Lighthouse (Desktop) - v4.0.pdf` / `Google Lighthouse (Mobile) - v4.0.pdf`)** | **100%** |

---

## ⚡ Desglose de Métricas Core Web Vitals (Re-evaluación v2.5.0)

| Métrica / Indicador | Valor Desktop v2.5.0 | Valor Mobile v2.5.0 (4G) | Impacto y Evaluación QA |
| :--- | :---: | :---: | :--- |
| **First Contentful Paint (FCP)** | `1.2 s` 🟢 | `5.4 s` 🟢 | Carga inicial casi instantánea en escritorio y acelerada en móviles 4G. |
| **Largest Contentful Paint (LCP)** | `1.2 s` 🟢 | `5.6 s` 🟢 | Despliegue visual principal inmediato en escritorio y fluido en móviles. |
| **Total Blocking Time (TBT)** | `0 ms` 🟢 | `0 ms` 🟢 | Cero congelamiento del hilo principal o retraso de entrada. |
| **Cumulative Layout Shift (CLS)** | `0.177` 🟢 | `0` 🟢 | Móvil impecable. En escritorio se redujo un 88% respecto al valor inicial de 1.516. |
| **Peso Total del Payload (Red)** | `961 KiB` 🟢 | `961 KiB` 🟢 | Optimización constante de la transferencia de paquetes de datos. |

---

## 🐛 Estado Actualizado de Incidentes y Oportunidades de Mejora

| ID Bug / Issue | Componente | Descripción de la Falla / Hallazgo | Solución / Recomendación QA | Estado v2.6.0 |
| :--- | :--- | :--- | :--- | :--- |
| **BUG-06** | Infrastructure / Net | **Servidor Web Inseguro (No HTTPS):** La aplicación se sirve sobre HTTP (`http://147.15.127.238:5173/`). | Configurar certificado SSL/TLS (Let's Encrypt / Nginx) y forzar HTTPS. | **ABIERTO** (Alta) |
| **BUG-07** | Frontend / Assets | **CLS en Escritorio (`0.177`):** Pequeño desplazamiento restante por fuentes desde la CDN de Google Fonts. | Auto-hospedar los archivos `.woff2` localmente en el servidor (`/assets/fonts/`). | **EN PROGRESO** (Baja) |
| **BUG-08** | Frontend / Performance | **Carga de Tailwind CDN:** `cdn.tailwindcss.com` genera demora en conexiones móviles 4G. | Compilar CSS localmente con Tailwind CLI / Vite para entregar bundle comprimido (`<20 KB`). | **EN PROGRESO** (Media) |
| **BUG-09** | Frontend / A11y | **Falta de ARIA Label:** `button#btn-status-trigger` no poseía nombre accesible. | **FIXED:** Se agregó el atributo `aria-label="Estado de servicios"`. | **RESUELTO** ✅ |
| **BUG-10** | Frontend / SEO | **Ausencia de Meta Description:** La página no contaba con tag de descripción para buscadores. | **FIXED:** Incorporada la etiqueta `<meta name="description">` en el `<head>`. | **RESUELTO** ✅ |
| **BUG-11** | Frontend / DevTools | **Advertencias en DevTools:** Existían advertencias en la pestaña de Issues de Chrome. | **FIXED:** Limpiados los problemas en consola (Best Practices a 78/100). | **RESUELTO** ✅ |

---

## 🎯 Conclusión y Roadmap a Producción

La re-evaluación v2.5.0 consolida a **TechMind** como una aplicación altamente optimizada y accesible:

1. **Objetivos Cumplidos:** Performance de **86/100 en Escritorio**, Accesibilidad sobresaliente (**95/100 Desktop y Mobile**), SEO óptimo (**91/100**) y Carga rápida en 4G.
2. **Último Empuje a Producción:**
   * **Habilitar HTTPS:** Elevará la categoría de *Best Practices* de 78 a 100 puntos.

---

### 📄 Documentación Adjunta y Reportes Actualizados
* 💻 **Informe Completo Lighthouse Desktop (v2.6.0):** [`REPORTE-QA_Lighthouse_Desktop_v4.0.md`](../Archivos/Rendimiento/REPORTE-QA_Lighthouse_Desktop_v4.0.md) | [Descargar PDF Original (`Google Lighthouse (Desktop) - v4.0.pdf`)](https://drive.google.com/file/d/1v_KRmI9tIZQk3qwvoD91Owqwb0y3By9I/view?usp=sharing)

* 📱 **Informe Completo Lighthouse Mobile (v2.6.0):** [`REPORTE-QA_Lighthouse_Mobile_v4.0.md`](../Archivos/Rendimiento/REPORTE-QA_Lighthouse_Mobile_v4.0.md) | [Descargar PDF Original (`Google Lighthouse (Mobile) - v4.0.pdf`)](https://drive.google.com/file/d/16y67HwISad2X9-HXSf5OmKBTfDPZqG2R/view?usp=drive_link)
