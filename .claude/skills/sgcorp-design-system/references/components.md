# Componentes — Snippets copiables

Snippets de los componentes principales del design system SGCORP. Pegar y adaptar.

## Tabla de contenidos
- [Tablet container completa](#tablet-container)
- [Botón base + variantes](#boton)
- [Pill / Badge](#pill)
- [Panel con header](#panel-header)
- [Modal flotante](#modal-flotante)
- [Popup lateral derecho](#popup-lateral)
- [Banner global](#banner-global)
- [Tabs sidebar](#tabs-sidebar)
- [Severidad tabs (warn modals)](#severidad-tabs)
- [Empty state](#empty-state)
- [Card de empleado / fila](#card-fila)
- [Stat box](#stat-box)
- [Avatar con iniciales](#avatar-iniciales)
- [Form input + label](#form-input)

---

## Tablet container

```html
<div class="nl-tablet">
  <div class="nl-layout">
    <aside class="nl-sidebar">
      <div class="nl-brand">
        <img class="nl-brand-logo" src="img/logo.png" alt="NewLifeRP">
        <div>
          <div class="nl-brand-title">NOMBRE</div>
          <div class="nl-brand-subtitle">SUBTÍTULO</div>
        </div>
      </div>
      <nav class="nl-tabs"><!-- tabs aquí --></nav>
    </aside>
    <main class="nl-main">
      <header class="nl-main-header">
        <div class="nl-kicker">KICKER MAYÚSCULAS</div>
        <h1>Título principal</h1>
      </header>
      <section class="nl-content custom-scroll">
        <!-- contenido -->
      </section>
    </main>
  </div>
</div>
```

```css
.nl-tablet {
  position: relative;
  width: min(96vw, 1620px);
  height: min(92vh, 980px);
  padding: 12px;
  border-radius: 38px;
  border: 1px solid rgba(206,105,247,.18);
  background: rgba(11,7,15,.92);
  box-shadow: 0 0 0 1px rgba(206,105,247,.10), 0 12px 40px rgba(0,0,0,.45);
}
.nl-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  height: 100%;
}
```

---

## Botón

```html
<button class="nl-btn">Acción primaria</button>
<button class="nl-btn ghost">Acción secundaria</button>
<button class="nl-btn soft">Suave</button>
<button class="nl-btn warn">Sancionar</button>
<button class="nl-btn danger">Despedir</button>
<button class="nl-btn full">Ocupa todo</button>
```

```css
.nl-btn {
  padding: 9px 16px;
  border: 0;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: .04em;
  cursor: pointer;
  font-family: inherit;
  background: linear-gradient(135deg, #B034C5, #7B218A);
  color: #fff;
  transition: filter .15s ease;
}
.nl-btn:hover { filter: brightness(1.08); }
.nl-btn:disabled { opacity: 0.4; cursor: not-allowed; filter: none; }

.nl-btn.ghost {
  background: rgba(255,255,255,.04);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.10);
  color: rgba(207,207,207,.85);
  font-weight: 600;
}
.nl-btn.soft {
  background: rgba(165,44,223,.15);
  box-shadow: inset 0 0 0 1px rgba(206,105,247,.25);
  color: #DA9FF1;
}
.nl-btn.warn {
  background: rgba(255,170,80,.18);
  color: #FFCB8A;
  box-shadow: inset 0 0 0 1px rgba(255,170,80,.35);
}
.nl-btn.danger {
  background: linear-gradient(135deg, #D4536D, #A32D2D);
  color: #fff;
}
.nl-btn.full { width: 100%; }
.nl-btn.compact, .nl-btn.small { padding: 6px 11px; font-size: 11px; }
```

---

## Pill

```html
<span class="nl-pill">Default</span>
<span class="nl-pill ok">Activo</span>
<span class="nl-pill danger">Cerrado</span>
<span class="nl-pill warn">Revisar</span>
<span class="nl-pill purple">Servicio</span>
```

```css
.nl-pill {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .04em;
  background: rgba(255,255,255,.06);
  color: rgba(207,207,207,.85);
}
.nl-pill.ok      { background: rgba(56,217,150,.20); color: #38d996; }
.nl-pill.danger  { background: rgba(255,77,109,.20); color: #ff4d6d; }
.nl-pill.warn    { background: rgba(247,201,72,.20); color: #f7c948; }
.nl-pill.purple  { background: rgba(165,44,223,.25); color: #DA9FF1; }
```

---

## Panel header

```html
<div class="nl-panel">
  <div class="nl-panel-header">
    <div><h3>Sanciones</h3></div>
    <!-- Botón de acción / filtros (opcional) -->
  </div>
  <!-- contenido -->
</div>
```

```css
.nl-panel {
  background: linear-gradient(180deg, #130618, #1A1020);
  border-radius: 12px;
  padding: 18px;
  box-shadow: inset 0 0 0 1px rgba(206,105,247,.10);
}
.nl-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
}
.nl-panel-header h3 {
  font-size: 16px;
  font-weight: 800;
  color: #fff;
}
```

**No añadir `<p>` descriptivo dentro del header** salvo que el contexto se pierda sin él.

---

## Modal flotante

```html
<div class="nl-admin-modal-overlay">
  <div class="nl-admin-modal">
    <div class="nl-admin-modal-head">
      <h3>Título del modal</h3>
      <button class="nl-admin-modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="nl-admin-modal-body">
      <!-- contenido del modal -->
    </div>
  </div>
</div>
```

```css
/* OVERLAY: NO oscurece todo el fondo (solo blur ligero del propio overlay) */
.nl-admin-modal-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 9999;
}
.nl-admin-modal {
  width: min(90vw, 460px);
  background: linear-gradient(180deg, #130618, #1A1020);
  border: 1px solid rgba(206,105,247,.30);
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 12px 40px rgba(0,0,0,.55);
}
.nl-admin-modal-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}
.nl-admin-modal-close {
  width: 24px; height: 24px;
  border-radius: 50%;
  background: rgba(255,255,255,.06);
  border: 0;
  color: rgba(207,207,207,.7);
  cursor: pointer;
}
```

---

## Popup lateral

```html
<div class="lateral-popup sev-grave hidden" aria-hidden="true">
  <div class="lateral-popup-head">
    <div class="lateral-popup-icon">⚠️</div>
    <div class="lateral-popup-titles">
      <div class="lateral-popup-tag">SANCIÓN RECIBIDA</div>
      <div class="lateral-popup-business"><b>Negocio</b> · Sanción <span>grave</span></div>
    </div>
  </div>
  <div class="lateral-popup-body"><!-- contenido --></div>
  <button class="lateral-popup-btn">Entendido</button>
</div>
```

```css
.lateral-popup {
  position: fixed;
  right: 20px;
  top: calc(50% + 130px);
  transform: translateY(-50%);
  width: 260px;
  padding: 14px 16px 12px;
  background: rgba(7,6,12,.92);
  border: 1px solid rgba(212,83,109,.55);
  border-radius: 14px;
  box-shadow: inset 0 0 0 1px rgba(212,83,109,.14), 0 12px 32px rgba(0,0,0,.55);
  color: #fff;
  z-index: 9999;
  user-select: none;
  pointer-events: auto;
  transition: opacity .24s, transform .24s;
}
.lateral-popup.hidden { display: none; }
.lateral-popup.sev-leve { border-color: rgba(255,170,80,.55); }
.lateral-popup.sev-media { border-color: rgba(255,120,80,.55); }
.lateral-popup.sev-grave { border-color: rgba(212,83,109,.65); }
```

---

## Banner global

```html
<div class="nl-global-warn-banner sev-grave">
  <div class="nl-global-warn-icon">⚠️</div>
  <div class="nl-global-warn-body">
    <div class="nl-global-warn-head">
      <span class="nl-global-warn-tag">SANCIÓN AL NEGOCIO</span>
      <span class="nl-warn-sev-pill sev-grave">GRAVE</span>
    </div>
    <div class="nl-global-warn-reason">Motivo del aviso aquí.</div>
    <div class="nl-global-warn-meta">Por Staff · hace 5 min</div>
  </div>
</div>
```

```css
.nl-global-warn-banner {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  padding: 12px 16px;
  margin-bottom: 16px;
  background: linear-gradient(90deg, rgba(212,83,109,.18), rgba(212,83,109,.08));
  border-radius: 12px;
  box-shadow: inset 0 0 0 1px rgba(212,83,109,.45);
}
```

---

## Tabs sidebar

```html
<nav class="nl-tabs">
  <button class="nl-tab active" onclick="setTab('home')">
    <div class="nl-tab-icon">🏠</div>
    <span>Inicio</span>
  </button>
  <button class="nl-tab" onclick="setTab('orders')">
    <div class="nl-tab-icon">🚚</div>
    <span>Pedidos</span>
  </button>
</nav>
```

```css
.nl-tabs {
  display: flex;
  flex-direction: column;
  gap: 6px;
  overflow-y: auto;
  padding-right: 5px;
  padding-bottom: 4px;
}
.nl-tab {
  width: 100%;
  display: flex;
  gap: 13px;
  align-items: center;
  padding: 8px 14px;
  min-height: 48px;
  color: rgba(255,255,255,.48);
  border: 1px solid transparent;
  border-radius: 18px;
  background: transparent;
  cursor: pointer;
  transition: .18s ease;
}
.nl-tab.active {
  background: rgba(165,44,223,.20);
  box-shadow: inset 0 0 0 1px rgba(206,105,247,.40);
  color: #fff;
}
.nl-tab-icon {
  width: 38px; height: 38px;
  display: grid; place-items: center;
  font-size: 16px;
}
```

---

## Severidad tabs

Para modales de sanción (warn). Tres estados visuales según severidad seleccionada.

```html
<div class="nl-warn-sev-tabs">
  <button class="nl-warn-sev-tab sev-leve active">LEVE</button>
  <button class="nl-warn-sev-tab sev-media">MEDIA</button>
  <button class="nl-warn-sev-tab sev-grave">GRAVE</button>
</div>
```

```css
.nl-warn-sev-tabs {
  display: flex;
  gap: 4px;
  padding: 3px;
  background: rgba(7,6,12,.55);
  border-radius: 10px;
  box-shadow: inset 0 0 0 1px rgba(206,105,247,.10);
}
.nl-warn-sev-tab {
  flex: 1;
  padding: 8px 12px;
  background: transparent;
  border: 0;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .08em;
  color: rgba(207,207,207,.55);
  cursor: pointer;
}
.nl-warn-sev-tab.active.sev-leve {
  background: rgba(255,170,80,.20);
  box-shadow: inset 0 0 0 1px rgba(255,170,80,.40);
  color: #FFCB8A;
}
.nl-warn-sev-tab.active.sev-media {
  background: rgba(255,120,80,.25);
  box-shadow: inset 0 0 0 1px rgba(255,120,80,.40);
  color: #FFB088;
}
.nl-warn-sev-tab.active.sev-grave {
  background: rgba(212,83,109,.22);
  box-shadow: inset 0 0 0 1px rgba(212,83,109,.50);
  color: #F5B5BE;
}
```

---

## Empty state

Para listas vacías. Texto sutil, centrado, sin iconos grandes.

```html
<div class="nl-empty">No hay sanciones registradas en el negocio.</div>
```

```css
.nl-empty {
  text-align: center;
  padding: 32px 20px;
  color: rgba(207,207,207,.45);
  font-size: 12px;
  font-style: italic;
}
```

---

## Card fila

Para listas de elementos (empleados, sanciones, pedidos).

```html
<div class="row-card">
  <div class="row-card-avatar">JS</div>
  <div class="row-card-info">
    <div class="row-card-name">Juan Smith</div>
    <div class="row-card-meta">Cajero · Servicio activo</div>
  </div>
  <div class="row-card-actions">
    <button class="nl-btn small soft">Editar</button>
  </div>
</div>
```

```css
.row-card {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) auto;
  gap: 12px;
  padding: 10px 14px;
  background: rgba(36,18,45,.45);
  border-radius: 10px;
  align-items: center;
}
```

---

## Stat box

```html
<div class="nl-stat">
  <div class="nl-stat-top">
    <div class="nl-card-icon">$</div>
    <span class="nl-pill ok">Activo</span>
  </div>
  <div class="nl-label">CAJA SOCIEDAD</div>
  <div class="nl-stat-value">$2,496,000</div>
  <div class="nl-muted">Dinero disponible</div>
</div>
```

---

## Avatar iniciales

```js
function initials(name) {
  const safe = String(name || '').trim();
  if (!safe) return '??';
  const parts = safe.split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return safe.slice(0, 2).toUpperCase();
}
```

```html
<div class="avatar">${initials('Juan Smith')}</div>
```

```css
.avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: rgba(165,44,223,.20);
  color: #DA9FF1;
  display: grid; place-items: center;
  font-weight: 800;
  font-size: 12px;
}
```

---

## Form input

```html
<div class="form-field">
  <div class="nl-hire-field-label">MOTIVO</div>
  <textarea class="nl-input" placeholder="Describe el motivo..." maxlength="250"></textarea>
</div>
```

```css
.nl-hire-field-label {
  font-size: 9px;
  letter-spacing: .14em;
  color: rgba(218,159,241,.85);
  font-weight: 700;
  margin-bottom: 6px;
  text-transform: uppercase;
}
.nl-input, textarea.nl-input {
  width: 100%;
  background: rgba(7,6,12,.70);
  border: 1px solid rgba(206,105,247,.22);
  border-radius: 10px;
  padding: 10px 12px;
  color: #fff;
  font-size: 12px;
  font-family: inherit;
  box-sizing: border-box;
}
.nl-input:focus {
  outline: none;
  border-color: rgba(206,105,247,.55);
}
textarea.nl-input { min-height: 80px; resize: vertical; }
```
