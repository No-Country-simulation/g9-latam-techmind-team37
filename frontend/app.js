/**
 * TechMind AI — App JavaScript
 * Conecta la interfaz Stitch con el Backend de Spring Boot (localhost:8080) y FastAPI (localhost:8000)
 */

// URLs de API — se detectan automáticamente según el host donde corre el frontend.
// En local:  window.location.hostname = "localhost"
// En OCI:    window.location.hostname = "<IP-pública-OCI>" o dominio
const _HOST = window.location.hostname;
const API_BASE_URL = `http://${_HOST}:8080`;
const DS_API_URL   = `http://${_HOST}:8000`;

// Configuración visual por categoría
const CATEGORY_CONFIG = {
    'Backend': { icon: 'dns', colorClass: 'text-blue-700 dark:text-blue-400 border-blue-500/40 bg-blue-500/10' },
    'Frontend': { icon: 'view_quilt', colorClass: 'text-pink-700 dark:text-pink-400 border-pink-500/40 bg-pink-500/10' },
    'Data Science': { icon: 'analytics', colorClass: 'text-emerald-700 dark:text-emerald-400 border-emerald-500/40 bg-emerald-500/10' },
    'DevOps': { icon: 'terminal', colorClass: 'text-cyan-700 dark:text-cyan-400 border-cyan-500/40 bg-cyan-500/10' },
    'Mobile': { icon: 'smartphone', colorClass: 'text-amber-700 dark:text-amber-400 border-amber-500/40 bg-amber-500/10' },
    'Bases de Datos': { icon: 'storage', colorClass: 'text-orange-700 dark:text-orange-400 border-orange-500/40 bg-orange-500/10' },
    'Seguridad': { icon: 'shield', colorClass: 'text-rose-700 dark:text-rose-400 border-rose-500/40 bg-rose-500/10' },
    'Cloud': { icon: 'cloud_queue', colorClass: 'text-sky-700 dark:text-sky-400 border-sky-500/40 bg-sky-500/10' }
};

let lastJsonResponse = null;
let lastInput = null;
let allHistoryData = [];
let healthStates = {
    springboot: false,
    fastapi: false,
    postgres: true
};

document.addEventListener('DOMContentLoaded', () => {
    // Load theme setting
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }
    if (window.innerWidth < 768) {
        const toggleIcon = document.getElementById('sidebar-toggle-icon');
        if (toggleIcon) toggleIcon.textContent = 'chevron_right';
    }
    initHealthChecks();
    fetchSystemStats();
    setInterval(fetchSystemStats, 5000);
    setInterval(initHealthChecks, 15000);
    bindEvents();
    loadHistory(); // Carga el historial desde PostgreSQL al iniciar
});

// ── 1. Health Checks & Métricas de Servidor ───────────────────────────────

async function initHealthChecks() {
    // Check FastAPI
    try {
        const res = await fetch(`${DS_API_URL}/health`);
        const data = await res.json();
        if (data.status === 'ok') {
            setServiceStatus('status-fastapi', true, 'FastAPI ML :8000');
        } else {
            setServiceStatus('status-fastapi', false, 'FastAPI ML :8000');
        }
    } catch {
        setServiceStatus('status-fastapi', false, 'FastAPI ML :8000');
    }

    // Check Spring Boot
    try {
        const res = await fetch(`${API_BASE_URL}/actuator/health`);
        const data = await res.json();
        if (data.status === 'UP') {
            setServiceStatus('status-springboot', true, 'Spring Boot :8080');
        } else {
            setServiceStatus('status-springboot', false, 'Spring Boot :8080');
        }
    } catch {
        setServiceStatus('status-springboot', false, 'Spring Boot :8080');
    }

    // PostgreSQL status
    setServiceStatus('status-postgres', true, 'PostgreSQL :5432');
}

async function fetchSystemStats() {
    try {
        const res = await fetch(`${DS_API_URL}/system-stats`);
        if (!res.ok) return;
        const data = await res.json();

        // Uptime
        const uptimeValEl = document.getElementById('sys-uptime-val');
        if (uptimeValEl && data.uptime) uptimeValEl.textContent = data.uptime;

        // CPU
        const cpuValEl = document.getElementById('sys-cpu-val');
        const cpuBarEl = document.getElementById('sys-cpu-bar');
        if (cpuValEl) cpuValEl.textContent = `${data.cpu_percent}%`;
        if (cpuBarEl) cpuBarEl.style.width = `${Math.min(100, data.cpu_percent)}%`;

        // RAM
        const ramValEl = document.getElementById('sys-ram-val');
        const ramBarEl = document.getElementById('sys-ram-bar');
        const ramFreeEl = document.getElementById('sys-ram-free-badge');
        const ramPctEl = document.getElementById('sys-ram-pct');

        if (ramValEl) ramValEl.textContent = `${data.ram_used_mb} / ${data.ram_total_mb} MB`;
        if (ramPctEl) ramPctEl.textContent = `${data.ram_percent}%`;
        if (ramFreeEl) ramFreeEl.textContent = `Libre: ${data.ram_free_mb} MB`;
        if (ramBarEl) {
            ramBarEl.style.width = `${Math.min(100, data.ram_percent)}%`;
            if (data.ram_percent > 90) {
                ramBarEl.className = 'bg-rose-500 h-full transition-all duration-500';
            } else if (data.ram_percent > 80) {
                ramBarEl.className = 'bg-amber-500 h-full transition-all duration-500';
            } else {
                ramBarEl.className = 'bg-purple-500 h-full transition-all duration-500';
            }
        }

        // Swap
        const swapValEl = document.getElementById('sys-swap-val');
        const swapBarEl = document.getElementById('sys-swap-bar');
        if (swapValEl) swapValEl.textContent = `${data.swap_used_mb} / ${data.swap_total_mb} MB`;
        if (swapBarEl) swapBarEl.style.width = `${Math.min(100, data.swap_percent)}%`;

    } catch (e) {
        // Ignorar si no está disponible
    }
}

function setServiceStatus(elementId, isOk, text) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const led = el.querySelector('.rounded-full');
    const label = el.querySelector('span');

    if (isOk) {
        led.className = 'w-2.5 h-2.5 rounded-full led-pulse shrink-0';
        led.style.backgroundColor = 'var(--led-ok-bg)';
        label.className = 'font-label-sm text-[11px] font-medium';
        label.style.color = 'var(--led-ok-text)';
    } else {
        led.className = 'w-2.5 h-2.5 rounded-full shrink-0';
        led.style.backgroundColor = 'var(--led-error-bg)';
        label.className = 'font-label-sm text-[11px] font-medium';
        label.style.color = 'var(--led-error-text)';
    }
    label.textContent = text;

    // Update trackers
    if (elementId === 'status-springboot') healthStates.springboot = isOk;
    if (elementId === 'status-fastapi') healthStates.fastapi = isOk;
    if (elementId === 'status-postgres') healthStates.postgres = isOk;

    // Update overall indicator
    const overallLed = document.getElementById('overall-status-led');
    if (overallLed) {
        const allUp = healthStates.springboot && healthStates.fastapi && healthStates.postgres;
        if (allUp) {
            overallLed.className = 'w-2.5 h-2.5 rounded-full led-pulse';
            overallLed.style.backgroundColor = 'var(--led-ok-bg)';
        } else {
            overallLed.className = 'w-2.5 h-2.5 rounded-full led-pulse';
            overallLed.style.backgroundColor = 'var(--led-error-bg)';
        }
    }
}

// ── 2. Event Listeners ──────────────────────────────────────────────────────

function bindEvents() {
    const classifyBtn = document.getElementById('btn-classify');
    const jsonBtn = document.getElementById('btn-view-json');
    const jsonModalClose = document.getElementById('modal-close');

    if (classifyBtn) {
        classifyBtn.addEventListener('click', handleClassification);
    }
    if (jsonBtn) {
        jsonBtn.addEventListener('click', toggleJsonModal);
    }
    if (jsonModalClose) {
        jsonModalClose.addEventListener('click', toggleJsonModal);
    }

    // Sidebar selectors
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const mainContent = document.getElementById('main-content');

    const closeSidebar = () => {
        if (!sidebar) return;
        sidebar.classList.add('-translate-x-full');
        sidebar.classList.remove('translate-x-0');
        // Solo en desktop se descarta la clase md: y el margen del contenido.
        // En mobile se conservan, para que al agrandar la ventana el sidebar
        // reaparezca alineado con su margen en lugar de dejar un hueco vacío.
        if (window.innerWidth >= 768) {
            sidebar.classList.remove('md:translate-x-0');
            if (mainContent) mainContent.classList.remove('md:ml-64');
        }
        if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
        const toggleIcon = document.getElementById('sidebar-toggle-icon');
        if (toggleIcon) toggleIcon.textContent = 'chevron_right';
    };

    // Al cruzar el breakpoint md (768px) se restablece el estado por defecto
    // de cada tamaño: visible y fijo en desktop, oculto tras el overlay en mobile.
    let wasDesktop = window.innerWidth >= 768;
    const syncSidebarToBreakpoint = () => {
        if (!sidebar) return;
        const isDesktop = window.innerWidth >= 768;
        if (isDesktop === wasDesktop) return; // ignora resize de teclado/toolbar móvil
        wasDesktop = isDesktop;

        const toggleIcon = document.getElementById('sidebar-toggle-icon');
        sidebar.classList.add('md:translate-x-0');
        if (mainContent) mainContent.classList.add('md:ml-64');

        if (isDesktop) {
            sidebar.classList.remove('-translate-x-full', 'translate-x-0');
            if (toggleIcon) toggleIcon.textContent = 'chevron_left';
        } else {
            sidebar.classList.add('-translate-x-full');
            sidebar.classList.remove('translate-x-0');
            if (toggleIcon) toggleIcon.textContent = 'chevron_right';
        }
        if (sidebarOverlay) sidebarOverlay.classList.add('hidden');
    };
    window.addEventListener('resize', syncSidebarToBreakpoint);

    // Toggle Sidebar Control
    const sidebarToggle = document.getElementById('btn-sidebar-toggle');
    const sidebarClose = document.getElementById('btn-sidebar-close');

    if (sidebarToggle && sidebar && sidebarOverlay && mainContent) {
        const toggleSidebar = () => {
            const isOpen = (window.innerWidth >= 768 && sidebar.classList.contains('md:translate-x-0')) ||
                           (window.innerWidth < 768 && sidebar.classList.contains('translate-x-0'));

            const toggleIcon = document.getElementById('sidebar-toggle-icon');

            if (isOpen) {
                closeSidebar();
                if (toggleIcon) toggleIcon.textContent = 'chevron_right';
            } else {
                // Open it
                sidebar.classList.remove('-translate-x-full');
                if (window.innerWidth >= 768) {
                    sidebar.classList.add('md:translate-x-0');
                    mainContent.classList.add('md:ml-64');
                } else {
                    sidebar.classList.add('translate-x-0');
                    sidebarOverlay.classList.remove('hidden');
                }
                if (toggleIcon) toggleIcon.textContent = 'chevron_left';
            }
        };

        sidebarToggle.addEventListener('click', toggleSidebar);
        if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Service Status Popover Control
    const statusTrigger = document.getElementById('btn-status-trigger');
    const statusPopover = document.getElementById('status-popover');
    const statusChevron = document.getElementById('status-chevron');

    if (statusTrigger && statusPopover) {
        statusTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !statusPopover.classList.contains('pointer-events-none');
            if (isOpen) {
                statusPopover.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
                statusPopover.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
                if (statusChevron) statusChevron.style.transform = 'rotate(0deg)';
            } else {
                statusPopover.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-2');
                statusPopover.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
                if (statusChevron) statusChevron.style.transform = 'rotate(180deg)';
            }
        });

        // Close popover when clicking anywhere else
        document.addEventListener('click', () => {
            statusPopover.classList.add('opacity-0', 'pointer-events-none', 'translate-y-2');
            statusPopover.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
            if (statusChevron) statusChevron.style.transform = 'rotate(0deg)';
        });

        // Prevent closing when clicking inside the popover
        statusPopover.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // View Switcher Control (SPA subpage logic)
    const navClassifier = document.getElementById('nav-classifier');
    const navHistory = document.getElementById('nav-history');
    const classifierView = document.getElementById('classifier-view-section');
    const historyView = document.getElementById('history-view-section');

    if (navClassifier && navHistory && classifierView && historyView) {
        const showClassifier = () => {
            classifierView.classList.remove('hidden');
            historyView.classList.add('hidden');
            
            navClassifier.className = "sidebar-nav-item active-nav flex items-center gap-3 transition-all cursor-pointer";
            navHistory.className = "sidebar-nav-item flex items-center gap-3 transition-all text-on-surface-variant cursor-pointer";

            if (window.innerWidth < 768) {
                closeSidebar();
            }
        };

        const showHistory = () => {
            classifierView.classList.add('hidden');
            historyView.classList.remove('hidden');
            
            navHistory.className = "sidebar-nav-item active-nav flex items-center gap-3 transition-all cursor-pointer";
            navClassifier.className = "sidebar-nav-item flex items-center gap-3 transition-all text-on-surface-variant cursor-pointer";

            loadDetailedHistory();

            if (window.innerWidth < 768) {
                closeSidebar();
            }
        };

        navClassifier.addEventListener('click', showClassifier);
        navHistory.addEventListener('click', showHistory);

        const brandHome = document.getElementById('btn-brand-home');
        if (brandHome) {
            brandHome.addEventListener('click', showClassifier);
        }
    }

    // Theme Toggle Control
    const themeToggle = document.getElementById('btn-theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    if (themeToggle && themeToggleIcon) {
        const isDark = document.documentElement.classList.contains('dark');
        themeToggleIcon.textContent = isDark ? 'light_mode' : 'dark_mode';

        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const nowDark = document.documentElement.classList.contains('dark');
            themeToggleIcon.textContent = nowDark ? 'light_mode' : 'dark_mode';
            localStorage.setItem('theme', nowDark ? 'dark' : 'light');
        });
    }

    // Filter Category and Search listeners
    const filterCategory = document.getElementById('filter-category');
    const searchHistory = document.getElementById('search-history');
    
    if (filterCategory) {
        filterCategory.addEventListener('change', (e) => {
            const searchQuery = searchHistory ? searchHistory.value.trim().toLowerCase() : '';
            loadDetailedHistory(e.target.value, searchQuery);
        });
    }

    if (searchHistory) {
        searchHistory.addEventListener('input', (e) => {
            const category = filterCategory ? filterCategory.value : 'all';
            loadDetailedHistory(category, e.target.value.trim().toLowerCase());
        });
    }

    // JSON Modal Controls (View JSON button and Close button X)
    const btnViewJson = document.getElementById('btn-view-json');
    const modalClose = document.getElementById('modal-close');
    
    if (btnViewJson) {
        btnViewJson.addEventListener('click', toggleJsonModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', toggleJsonModal);
    }
}

// ── 3. Clasificación via Spring Boot ────────────────────────────────────────

async function handleClassification() {
    const titleInput = document.getElementById('content-title');
    const bodyInput = document.getElementById('content-body');

    const titulo = titleInput.value.trim();
    const texto = bodyInput.value.trim();

    if (!titulo || !texto) {
        showToast('Por favor, llena todos los campos', 'warning');
        return;
    }

    setLoadingState(true);

    try {
        const response = await fetch(`${API_BASE_URL}/contenido`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ titulo, texto })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.message || errData.titulo || `Error HTTP ${response.status}`);
        }

        const data = await response.json();
        // Redondear probabilidad a 2 decimales
        if (data.probabilidad != null) {
            data.probabilidad = Math.round(data.probabilidad * 100) / 100;
        }
        lastJsonResponse = data;
        lastInput = { titulo, texto };

        // Renderizar resultado
        renderResult(data);

        // Limpiar los campos de entrada para nuevas búsquedas
        document.getElementById('content-title').value = '';
        document.getElementById('content-body').value = '';

        // Recargar el historial actualizado desde PostgreSQL
        setTimeout(() => loadHistory(), 600);

        showToast('Contenido clasificado y guardado', 'success');

    } catch (err) {
        console.error('Error al clasificar:', err);
        showToast('Hubo un error, por favor intenta de nuevo más tarde', 'error');
    } finally {
        setLoadingState(false);
    }
}

// ── 4. Render de Resultados ─────────────────────────────────────────────────

function renderResult(data) {
    const { categoria, probabilidad, informaciones_adicionales } = data;

    // 1. Categoría
    const badgeContainer = document.getElementById('category-badge-container');
    const config = CATEGORY_CONFIG[categoria] || { icon: 'topic', colorClass: 'text-primary-fixed border-primary/30 bg-primary/10' };

    badgeContainer.innerHTML = `
        <div class="inline-flex max-w-full items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 rounded-full border text-lg sm:text-xl font-bold shadow-[0_0_25px_rgba(139,92,246,0.25)] ${config.colorClass} transition-all duration-300 transform scale-105">
            <span class="material-symbols-outlined text-xl sm:text-2xl shrink-0">${config.icon}</span>
            <span class="min-w-0">${categoria}</span>
        </div>
    `;

    // 2. Porcentaje de Confianza (Entero sin decimales)
    const percentage = Math.round((probabilidad || 0) * 100);
    document.getElementById('confidence-score').textContent = `${percentage}%`;
    const bar = document.getElementById('confidence-bar');
    bar.style.width = `${percentage}%`;

    // 3. Keywords
    const keywordsList = document.getElementById('keywords-list');
    if (informaciones_adicionales && informaciones_adicionales.length > 0) {
        keywordsList.innerHTML = informaciones_adicionales.map(kw => {
            const capitalized = kw.charAt(0).toUpperCase() + kw.slice(1);
            return `
                <span class="px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary-fixed font-label-sm text-sm hover:scale-105 hover:bg-primary/20 transition-all cursor-default flex items-center gap-1.5 shadow-sm">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span>
                    ${escapeHtml(capitalized)}
                </span>
            `;
        }).join('');
    } else {
        keywordsList.innerHTML = `<span class="text-on-surface-variant text-sm italic">Sin términos clave destacados</span>`;
    }

    // Efecto visual
    const card = document.getElementById('results-card');
    if (card) {
        card.style.boxShadow = '0 0 35px rgba(208, 188, 255, 0.3)';
        setTimeout(() => card.style.boxShadow = '', 1000);
    }
}

// ── 5. Cargar e Renderizar Historial ─────────────────────────────────────────

async function loadHistory() {
    const historyGrid = document.getElementById('history-grid');
    if (!historyGrid) return;

    try {
        const res = await fetch(`${DS_API_URL}/predicciones?limit=50`);
        if (!res.ok) throw new Error('No se pudo consultar el historial');

        allHistoryData = await res.json();

        if (allHistoryData && allHistoryData.length > 0) {
            // Mostrar los 3 más recientes en el grid de la página
            const recent = allHistoryData.slice(0, 3);
            historyGrid.innerHTML = recent.map(entry => {
                const config = CATEGORY_CONFIG[entry.categoria] || { colorClass: 'text-primary-fixed border-primary/30 bg-primary/10' };
                const prob = entry.probabilidad != null ? Number(entry.probabilidad) : 0;
                const probPct = Math.round(prob * 100);
                const timeLabel = formatTimeString(entry.created_at);
                const textStr = entry.texto || entry.titulo || '';
                const isLong = textStr.length > 30;
                const expandBtnHtml = isLong ? `
                    <div class="flex justify-end mt-1.5">
                        <button type="button" class="btn-toggle-expand px-2.5 py-1 rounded-full border border-primary/25 bg-primary/10 hover:bg-primary/20 text-primary-fixed text-[11px] font-label-sm font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-sm" title="Expandir o contraer descripción">
                            <span>Ver más</span>
                            <span class="material-symbols-outlined text-xs pointer-events-none">expand_more</span>
                        </button>
                    </div>
                ` : '';

                return `
                    <div class="glass-panel p-4 sm:p-5 rounded-xl border border-black/5 dark:border-white/5 hover:border-primary/30 transition-all group hover:-translate-y-1 duration-300 min-w-0 flex flex-col justify-between">
                        <div>
                            <div class="flex flex-wrap justify-between items-start gap-2 mb-3">
                                <span class="px-2.5 py-1 rounded-md text-[11px] font-label-sm border font-medium ${config.colorClass}">${escapeHtml(entry.categoria || 'Sin categoría')}</span>
                                <span class="text-on-surface-variant font-label-sm text-[11px] shrink-0">${timeLabel}</span>
                            </div>
                            <h4 class="font-body-md text-body-md text-on-surface font-medium group-hover:text-primary-fixed transition-colors line-clamp-1">${escapeHtml(entry.titulo || 'Sin título')}</h4>
                            <p class="history-card-body text-on-surface-variant text-xs mt-1 line-clamp-2 opacity-80 leading-relaxed transition-all">${escapeHtml(textStr)}</p>
                            ${expandBtnHtml}
                        </div>
                        <div class="mt-4 flex flex-wrap items-center justify-between opacity-90 pt-2.5 border-t border-black/5 dark:border-white/5 gap-2">
                            <div class="flex items-center gap-1.5">
                                <span class="font-label-sm text-[11px] text-on-surface-variant font-medium">Confianza: ${probPct}%</span>
                            </div>
                            <button type="button" class="btn-view-entry-json px-2.5 py-1 rounded-lg border border-primary/30 bg-primary/15 hover:bg-primary/25 text-primary-fixed text-[11px] font-label-sm font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-sm" data-id="${entry.id}" title="Ver JSON de esta consulta">
                                <span class="material-symbols-outlined text-xs pointer-events-none">code</span>
                                <span class="pointer-events-none">Ver JSON</span>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            historyGrid.innerHTML = `
                <div class="col-span-full py-8 text-center glass-panel rounded-xl">
                    <p class="text-on-surface-variant text-sm font-label-sm">No hay publicaciones guardadas en la base de datos aún.</p>
                </div>
            `;
        }
    } catch (err) {
        console.warn('Error al cargar historial desde PostgreSQL:', err);
        historyGrid.innerHTML = `
            <div class="col-span-full py-8 text-center glass-panel rounded-xl border border-rose-500/30 dark:border-rose-500/20 bg-rose-500/10 dark:bg-rose-950/20">
                <span class="material-symbols-outlined text-4xl text-rose-600 dark:text-rose-400 mb-2">error</span>
                <p class="text-rose-700 dark:text-rose-200 text-sm font-semibold">Error al conectar con la base de datos.</p>
                <p class="text-rose-600/80 dark:text-rose-400/80 text-xs mt-1 font-label-sm">${err.message || 'No se pudo consultar PostgreSQL.'}</p>
            </div>
        `;
    }
}

// ── 6. Historial Detallado (Subpágina) ──────────────────────────────────────

async function loadDetailedHistory(categoryFilter = 'all', searchQuery = '') {
    const listContainer = document.getElementById('detailed-history-list');
    if (!listContainer) return;

    try {
        listContainer.innerHTML = `
            <div class="py-8 text-center glass-panel rounded-xl">
                <span class="material-symbols-outlined text-4xl text-outline mb-2 animate-spin">refresh</span>
                <p class="text-on-surface-variant text-sm font-label-sm">Cargando historial detallado ...</p>
            </div>
        `;

        const res = await fetch(`${DS_API_URL}/predicciones?limit=100`);
        if (!res.ok) throw new Error('No se pudo consultar el historial');
        
        allHistoryData = await res.json();
        
        let filteredData = allHistoryData;
        if (categoryFilter !== 'all') {
            filteredData = allHistoryData.filter(entry => entry.categoria === categoryFilter);
        }

        if (searchQuery) {
            filteredData = filteredData.filter(entry => {
                const matchTitle = entry.titulo && entry.titulo.toLowerCase().includes(searchQuery);
                const matchKeywords = entry.keywords && entry.keywords.some(k => k.toLowerCase().includes(searchQuery));
                return matchTitle || matchKeywords;
            });
        }

        if (filteredData && filteredData.length > 0) {
            listContainer.innerHTML = filteredData.map(entry => {
                const config = CATEGORY_CONFIG[entry.categoria] || { icon: 'topic', colorClass: 'text-primary-fixed border-primary/30 bg-primary/10' };
                const prob = entry.probabilidad != null ? Number(entry.probabilidad) : 0;
                const probPct = Math.round(prob * 100);
                
                let dateStr = 'Fecha no disponible';
                if (entry.created_at) {
                    const d = new Date(entry.created_at);
                    if (!isNaN(d.getTime())) {
                        dateStr = d.toLocaleString([], { dateStyle: 'short', timeStyle: 'medium' });
                    }
                }

                const keywordsPills = (entry.keywords || []).map(k => {
                    const capitalized = k.charAt(0).toUpperCase() + k.slice(1);
                    return `
                        <span class="px-2.5 py-1 rounded bg-primary/10 border border-primary/20 text-primary-fixed text-[11px] font-mono">${escapeHtml(capitalized)}</span>
                    `;
                }).join(' ');

                const textStr = entry.texto || entry.titulo || '';
                const isLong = textStr.length > 30;
                const expandBtnHtml = isLong ? `
                    <div class="flex justify-end mt-1.5">
                        <button type="button" class="btn-toggle-expand px-2.5 py-1 rounded-full border border-primary/25 bg-primary/10 hover:bg-primary/20 text-primary-fixed text-[11px] font-label-sm font-bold transition-all flex items-center gap-1 cursor-pointer active:scale-95 shadow-sm" title="Expandir o contraer descripción">
                            <span>Ver más</span>
                            <span class="material-symbols-outlined text-xs pointer-events-none">expand_more</span>
                        </button>
                    </div>
                ` : '';

                return `
                    <div class="p-4 sm:p-5 rounded-2xl glass-panel border border-black/5 dark:border-white/5 hover:border-primary/20 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-5 group hover:shadow-lg hover:shadow-primary/5 duration-300">
                        <div class="flex-1 min-w-0 space-y-2">
                            <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                                <span class="px-3 py-1 rounded-full text-xs font-label-sm border font-semibold ${config.colorClass} flex items-center gap-1.5 shadow-sm">
                                    <span class="material-symbols-outlined text-sm">${config.icon}</span>
                                    ${escapeHtml(entry.categoria || 'Sin categoría')}
                                </span>
                                <span class="text-xs font-mono text-outline opacity-60">ID #${entry.id}</span>
                                <span class="text-xs text-on-surface-variant font-medium flex items-center gap-1">
                                    <span class="material-symbols-outlined text-sm opacity-60">schedule</span>
                                    ${dateStr}
                                </span>
                            </div>
                            <h5 class="text-on-surface font-bold text-base sm:text-lg group-hover:text-primary-fixed transition-colors">${escapeHtml(entry.titulo)}</h5>
                            <p class="history-card-body text-on-surface-variant text-sm line-clamp-2 opacity-80 leading-relaxed transition-all">${escapeHtml(textStr || 'Sin descripción disponible')}</p>
                            ${expandBtnHtml}
                            <div class="flex flex-wrap gap-1.5 pt-1">
                                ${keywordsPills || '<span class="text-xs text-on-surface-variant italic opacity-60">Sin palabras clave</span>'}
                            </div>
                        </div>
                        <div class="flex flex-row md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 md:border-l border-black/10 dark:border-white/10 pt-3 md:pt-0 md:pl-5 md:min-w-[140px] shrink-0">
                            <div class="text-left md:text-right">
                                <span class="block text-xs font-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Confianza</span>
                                <span class="text-xl sm:text-2xl font-black text-primary-fixed">${probPct}%</span>
                            </div>
                            <button type="button" class="btn-view-entry-json px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/15 hover:bg-primary/25 text-primary-fixed text-xs font-label-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-sm" data-id="${entry.id}" title="Ver JSON de esta consulta">
                                <span class="material-symbols-outlined text-sm pointer-events-none">code</span>
                                <span class="pointer-events-none">Ver JSON</span>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            listContainer.innerHTML = `
                <div class="py-12 text-center glass-panel rounded-xl border border-black/5 dark:border-white/5">
                    <span class="material-symbols-outlined text-5xl text-outline mb-3 opacity-60">filter_list_off</span>
                    <p class="text-on-surface-variant text-base font-semibold">No se encontraron registros para la categoría seleccionada.</p>
                </div>
            `;
        }
    } catch (err) {
        console.warn('Error al cargar historial detallado:', err);
        listContainer.innerHTML = `
            <div class="py-12 text-center glass-panel rounded-xl border border-rose-500/30 dark:border-rose-500/20 bg-rose-500/10 dark:bg-rose-950/20">
                <span class="material-symbols-outlined text-5xl text-rose-600 dark:text-rose-400 mb-3">error</span>
                <p class="text-rose-700 dark:text-rose-200 text-base font-semibold">Error al conectar con la base de datos.</p>
                <p class="text-rose-600/80 dark:text-rose-400/80 text-xs mt-1 font-label-sm">${err.message}</p>
            </div>
        `;
    }
}

// ── 7. Modal JSON Crudo y Visualización de Consultas ─────────────────────────

function showHistoryEntryJsonInModal(id) {
    if (!id) return;
    const entry = allHistoryData.find(item => String(item.id) === String(id));
    if (!entry) {
        showToast('⚠️ No se encontró la información de la consulta', 'warning');
        return;
    }

    const fullPayload = {
        entrada: { titulo: entry.titulo, texto: entry.texto },
        resultado: {
            id: entry.id,
            categoria: entry.categoria,
            probabilidad: entry.probabilidad,
            informaciones_adicionales: entry.keywords,
            created_at: entry.created_at
        }
    };

    const modal = document.getElementById('json-modal');
    const jsonPre = document.getElementById('json-content');
    if (modal && jsonPre) {
        jsonPre.textContent = JSON.stringify(fullPayload, null, 2);
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function toggleJsonModal() {
    const modal = document.getElementById('json-modal');
    if (!modal) return;

    if (modal.classList.contains('hidden')) {
        const jsonPre = document.getElementById('json-content');
        if (lastJsonResponse) {
            const fullPayload = {
                entrada: lastInput || { titulo: "", texto: "" },
                resultado: lastJsonResponse
            };
            jsonPre.textContent = JSON.stringify(fullPayload, null, 2);
        } else {
            jsonPre.textContent = '{\n  "mensaje": "Aún no se ha realizado ninguna clasificación en esta sesión."\n}';
        }
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function copyJsonToClipboard() {
    const jsonPre = document.getElementById('json-content');
    const copyBtn = document.getElementById('btn-copy-json');
    const copyText = document.getElementById('copy-btn-text');
    if (!jsonPre || !jsonPre.textContent) return;

    navigator.clipboard.writeText(jsonPre.textContent).then(() => {
        if (copyBtn && copyText) {
            const originalText = copyText.textContent;
            const originalIcon = copyBtn.querySelector('.material-symbols-outlined').textContent;
            
            copyText.textContent = '¡Copiado!';
            copyBtn.querySelector('.material-symbols-outlined').textContent = 'check';
            copyBtn.classList.add('bg-emerald-500/20', 'border-emerald-500/40', 'text-emerald-300');
            
            showToast('📋 JSON copiado al portapapeles con éxito', 'info');

            setTimeout(() => {
                copyText.textContent = originalText;
                copyBtn.querySelector('.material-symbols-outlined').textContent = originalIcon;
                copyBtn.classList.remove('bg-emerald-500/20', 'border-emerald-500/40', 'text-emerald-300');
            }, 2000);
        }
    }).catch(err => {
        console.error('Error al copiar JSON:', err);
        showToast('⚠️ No se pudo copiar el contenido', 'error');
    });
}

// Global Backdrop Click & Escape Key listeners for JSON Modal, Expand & View buttons
document.addEventListener('click', (e) => {
    const modal = document.getElementById('json-modal');
    if (modal && !modal.classList.contains('hidden') && e.target === modal) {
        toggleJsonModal();
    }

    const copyBtn = e.target.closest('#btn-copy-json');
    if (copyBtn) {
        copyJsonToClipboard();
    }

    const expandBtn = e.target.closest('.btn-toggle-expand');
    if (expandBtn) {
        // Encontrar el párrafo .history-card-body que es previo al div contenedor del botón
        const parentDiv = expandBtn.parentElement;
        const p = parentDiv ? parentDiv.previousElementSibling : null;
        if (p && p.classList.contains('history-card-body')) {
            const isExpanded = p.classList.contains('line-clamp-none');
            if (isExpanded) {
                p.classList.remove('line-clamp-none');
                p.classList.add('line-clamp-2');
                expandBtn.innerHTML = `<span>Ver más</span><span class="material-symbols-outlined text-xs pointer-events-none">expand_more</span>`;
            } else {
                p.classList.remove('line-clamp-2');
                p.classList.add('line-clamp-none');
                expandBtn.innerHTML = `<span>Ver menos</span><span class="material-symbols-outlined text-xs pointer-events-none">expand_less</span>`;
            }
        }
    }

    const viewItemBtn = e.target.closest('.btn-view-entry-json');
    if (viewItemBtn) {
        const id = viewItemBtn.getAttribute('data-id');
        showHistoryEntryJsonInModal(id);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('json-modal');
        if (modal && !modal.classList.contains('hidden')) {
            toggleJsonModal();
        }
    }
});

// ── Helpers ─────────────────────────────────────────────────────────────────

function formatTimeString(isoStr) {
    if (!isoStr) return 'Reciente';
    try {
        const cleaned = isoStr.replace(/(\.\d{3})\d+/, '$1');
        const d = new Date(cleaned);
        if (isNaN(d.getTime())) return 'Reciente';
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
        return 'Reciente';
    }
}

function setLoadingState(isLoading) {
    const btn = document.getElementById('btn-classify');
    if (!btn) return;

    if (isLoading) {
        btn.disabled = true;
        btn.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-r from-inverse-primary to-primary-container opacity-80"></div>
            <div class="relative flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-lg animate-spin">refresh</span>
                Analizando...
            </div>
        `;
    } else {
        btn.disabled = false;
        btn.innerHTML = `
            <div class="absolute inset-0 bg-gradient-to-r from-inverse-primary to-primary-container group-hover:scale-105 transition-transform duration-300"></div>
            <div class="relative flex items-center justify-center gap-2">
                Clasificar con TechMind
            </div>
        `;
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const isError = type === 'error';
    const bgClass = isError ? 'bg-red-100 dark:bg-rose-950/90 border-red-500/50 text-red-600 dark:text-red-400 font-semibold' :
        type === 'warning' ? 'bg-amber-100 dark:bg-amber-950/90 border-amber-500/50 text-amber-800 dark:text-amber-200' :
            'bg-emerald-100 dark:bg-emerald-950/90 border-emerald-500/50 text-emerald-800 dark:text-emerald-200';

    toast.className = `glass-panel px-4 py-3 rounded-xl border ${bgClass} font-label-sm text-sm shadow-xl backdrop-blur-xl transition-all duration-300 transform translate-y-2 opacity-0 flex items-center gap-2 break-words`;
    if (isError) {
        toast.style.color = '#dc2626';
    }
    toast.innerHTML = `<span class="min-w-0" style="${isError ? 'color: #dc2626 !important;' : ''}">${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-2', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('opacity-0', '-translate-y-2');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}
