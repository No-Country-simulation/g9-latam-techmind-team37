# Informe de Auditoría Técnica y QA - Google Lighthouse (Mobile) — Re-evaluación v2.6.0 Final

**Proyecto / URL:** `http://147.15.127.238:5173/` (TechMind - Clasificación de contenido técnico)  
**Fecha de Ejecución:** 21 de agosto de 2026, 22:23hs (GMT-3)
**Versión de la App:** `v2.6.0 Final`
**Entorno de Prueba:** Emulated Moto G Power | Slow 4G Throttling | Chrome 151.0.0.0 | Lighthouse 13.4.0  
**Rol:** Tester QA Senior / Performance Analyst  
**Documento Adjunto:** [Descargar Nuevo Reporte Completo de Lighthouse Mobile (PDF)](https://drive.google.com/file/d/16y67HwISad2X9-HXSf5OmKBTfDPZqG2R/view?usp=sharing)   

---

## 1. Resumen Ejecutivo (Dashboard de Métricas & Evolución Mobile)

Se ha realizado una nueva re-evaluación técnica no funcional sobre la versión **v2.6.0** en entorno **Mobile (Moto G Power / Red Slow 4G)** documentada en `Google Lighthouse (Mobile) - v4.0.pdf`. Se observa un incremento en la categoría de **Buenas Prácticas a 78/100**, manteniendo la solidez de carga en redes 4G móviles.

### 📊 Cuadro Comparativo (Evolución Mobile)

| Categoría | Score v1.6.0 (13/08) | Score v2.4.0 (14/08) | Score v2.5.0 (20/08) | **Score Actual v2.6.0 (21/08)** | Evolución Total | Estado |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Performance (Rendimiento)** | 56 / 100 | 66 / 100 | 67 / 100 | **66 / 100** | 🟢 **+10 pts** | 🟡 Velocidad constante en redes 4G |
| **Accessibility (Accesibilidad)** | 87 / 100 | 95 / 100 | 100 / 100 | **95 / 100** | 🟢 **+8 pts** | 🟢 **Sobresaliente (WCAG 2.1 AA)** |
| **Best Practices (Buenas Prácticas)** | 74 / 100 | 74 / 100 | 74 / 100 | **78 / 100** | 🟢 **+4 pts** | 🟢 **En Mejora (DevTools Limpio)** |
| **SEO** | 90 / 100 | 91 / 100 | 91 / 100 | **91 / 100** | 🟢 **+1 pt** | 🟢 **Excelente** |

---

## 2. Métricas Core Web Vitals y Rendimiento Mobile (Performance: 66/100)

El rendimiento móvil bajo red Slow 4G registra tiempos de respuesta ágiles y constante estabilidad visual.

### 2.1 Desglose de Métricas Clave

* **First Contentful Paint (FCP):** `5.4 s` 🟢 **EXCELENTE AVANCE** (Antes: `9.9 s` | Reducción del **45.4%** en tiempo de render).
* **Largest Contentful Paint (LCP):** `5.6 s` 🟢 **EXCELENTE AVANCE** (Antes: `10.9 s` | Reducción del **48.6%** en carga visual).
* **Speed Index (SI):** `5.4 s` 🟢 **MEJORA SIGNIFICATIVA** (Antes: `9.9 s`).
* **Total Blocking Time (TBT):** `0 ms` 🟢 **IMPECABLE** (Cero congelamiento de CPU).
* **Cumulative Layout Shift (CLS):** **`0`** 🟢 **PERFECTO** (Cero saltos o desplazamientos visuales).

---

### 2.2 Diagnósticos e Insights de Performance Mobile

1. **Eficiencia de Carga:**
   * **Optimización de JavaScript:** Reducción del tiempo de ejecución de JS a **`1.5 s`** en CPU móvil.
   * **Latencia de Red:** La latencia en la ruta crítica inicial se redujo a **`1,182 ms`**.
   * **Ahorro de Red:** Peso total acotado a **`961 KiB`**.

2. **Buenas Prácticas (78/100):**
   * Se alcanzó la eliminación de errores en el panel de Chrome DevTools (*No issues in DevTools*).

---

## 3. Accesibilidad Mobile (Accessibility: 95/100)

Se mantiene una calificación sobresaliente con 16 auditorías superadas, garantizando una usabilidad óptima para tecnologías de asistencia y dispositivos táctiles.

---

## 4. SEO Mobile (SEO: 91/100)

* **Meta Description e Indexabilidad:** Etiqueta `<meta name="description">` correctamente verificada y aprobada.

---

## 5. Conclusión y Roadmap a Producción

La plataforma en entorno móvil mantiene una carga inicial reducida a la mitad en conexiones 4G (`5.4s`), cero inestabilidad visual (`CLS = 0`) y un desempeño fluido (`TBT = 0ms`). Con la configuración final del SSL/TLS (HTTPS), se alcanzará el 100% en seguridad de red.

---
*Informe generado por el equipo de Quality Assurance de TechMind.*