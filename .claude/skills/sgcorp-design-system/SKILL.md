---
name: sgcorp-design-system
description: Design system para todas las UIs del proyecto NewLifeRP / SGCORP en FiveM. Usa esta skill SIEMPRE que crees, modifiques o revises NUI HTML/CSS/JS para los recursos del servidor (tablets, paneles admin, popups, banners, modales, HUDs, F6, formularios). Incluye paleta de colores oficial, tipografía, componentes (botones, pills, paneles, modales flotantes, popups laterales), reglas de layout, dimensionado de tablets, patrones de iconografía con emojis y restricciones técnicas críticas de CEF/FiveM (no backdrop-filter, no localStorage). Aplica también al revisar mockups antes de implementarlos para asegurar coherencia entre recursos.
---

# SGCORP Design System

Sistema de diseño visual unificado para todos los recursos NUI del servidor NewLifeRP.

## Identidad de marca

- **Servidor**: NewLifeRP (NLRP)
- **Branding interno**: SGCORP
- **Idioma**: Español de España (Spain register). Nunca neutro/LATAM.
- **Tono**: directo, sin descripciones largas en headers, sin literatura corporativa.

## Restricciones técnicas críticas

Estas reglas vienen de bugs reales en CEF/FiveM. **No son opinión, son obligatorias**:

- **NUNCA usar `backdrop-filter`** (blur, brightness, etc). Causa artefactos de renderizado en CEF de FiveM. Para profundidad usar gradients sólidos.
- **NUNCA usar `localStorage` ni `sessionStorage`** en NUI. No son persistentes y pueden fallar.
- **NUNCA `fetch` a URLs externas** desde NUI sin proxy server-side.
- **NUNCA usar `<form>` con submit nativo** — interceptar siempre con `onClick`.
- **Modales: sin overlay negro fullscreen.** Solo la card visible centrada. Es estándar SGCORP.
- **Box-shadow**: máximo `0 12px 40px rgba(0,0,0,.45)` para profundidad. **No halos grandes**, hace que parezca render de Photoshop.
- **El borde lila es 1px**, no más: `box-shadow: 0 0 0 1px rgba(206,105,247,0.10)` o `0.18`. Sutil.

## Paleta oficial

```css
:root {
  /* Backgrounds */
  --color-bg-base:       #070607;  /* fondo del juego, casi negro */
  --color-bg-soft:       #130618;  /* fondo con tinte morado */
  --color-bg-panel-1:    #1A1020;  /* paneles primarios */
  --color-bg-panel-2:    #24122D;  /* paneles secundarios / hover */

  /* Morados (graduación oscuro → claro) */
  --color-purple-dark:   #5C1E65;
  --color-purple-main:   #7B218A;  /* purple-main, color principal */
  --color-purple-mid:    #962BA7;
  --color-purple-light:  #B034C5;
  --color-purple-neon:   #A52CDF;  /* acento neón, gradients */

  /* Lilas (acentos brillantes) */
  --color-lilac:         #CE69F7;  /* lilac, color de acento principal */
  --color-lilac-soft:    #DA9FF1;

  /* Texto */
  --color-text-primary:  #FCFCFC;
  --color-text-soft:     #CFCFCF;
  --color-text-muted:    #949494;

  /* Estados (semánticos) */
  --color-success:       #38d996;
  --color-danger:        #ff4d6d;
  --color-warning:       #f7c948;

  /* Severidades de sanción (warns) */
  --color-sev-leve:      #FFCB8A;  /* ámbar */
  --color-sev-media:     #FFB088;  /* naranja */
  --color-sev-grave:     #F5B5BE;  /* rojo */
}
```

**Reglas de uso de la paleta**:
- **Color principal de acción**: `--color-purple-main` (#7B218A) en gradient con `--color-lilac` (#CE69F7).
- **Acento sutil (textos secundarios, kickers)**: `--color-lilac` con opacidad 0.65–0.85.
- **Bordes de panel**: `rgba(206,105,247,.10)` a `.22` según jerarquía.
- **Fondos de pill por estado**: ver "Pills" más abajo.

## Tipografía

- **Familia**: `'Evogria', 'Inter', 'Segoe UI', sans-serif` para títulos. La fuente Evogria es la oficial (incluida en `web/app/fonts/Evogria.woff2`).
- **Body**: `'Inter', 'Segoe UI', Roboto, sans-serif`.
- **Kickers (etiquetas pequeñas mayúsculas)**: `font-size: 9–11px`, `letter-spacing: .12em–.14em`, `font-weight: 700`, color `--color-lilac` con opacidad `.85`.
- **Títulos h1**: `26–32px`, weight 800.
- **Títulos panel h3**: `15–17px`, weight 700.
- **Body**: `12–13px`, weight 400–500.
- **Botones**: `11–12px`, weight 700, `letter-spacing: .04em`.

## Border radius (escala)

Solo usar estos valores, no inventar otros:
- `6px`: pill / chip pequeño / icon container interno
- `8px`: botones, inputs, pills medianos
- `10px`: tabs activos, cards de fila
- `12px`: cards grandes, banners
- `14px`: popups laterales
- `18px`: tabs sidebar, secciones grandes
- `38px`: solo el container de la tablet (estilo iPad)

## Tablets (containers principales)

**Tamaño en desktop** (1920x1080):
```css
.tablet {
  width: min(96vw, 1620px);
  height: min(92vh, 980px);
  border-radius: 38px;
  background: rgba(11,7,15,.92);
  border: 1px solid rgba(206,105,247,.18);
  box-shadow: 0 0 0 1px rgba(206,105,247,.10), 0 12px 40px rgba(0,0,0,.45);
  padding: 12px;
}
```

**Layout interno**: `grid-template-columns: 280px minmax(0, 1fr)` (sidebar + main).

**Sidebar**: tabs verticales con `gap: 6px`. Cada tab `min-height: 48px`, `padding: 8px 14px`, `border-radius: 18px`. Activo: fondo `rgba(165,44,223,.20)` + `box-shadow: inset 0 0 0 1px rgba(206,105,247,.40)`.

**Sidebar overflow**: `overflow-y: auto; max-height: 100%` como red de seguridad para resoluciones bajas.

## Componentes

Para snippets concretos copiables ver `references/components.md`.

### Botones (`.nl-btn`)

Variantes obligatorias:
- `.nl-btn` (base): fondo lila gradient, texto blanco
- `.nl-btn.soft`: fondo morado oscuro suave
- `.nl-btn.ghost`: solo borde, fondo transparente, para acciones secundarias
- `.nl-btn.danger`: gradient rojo `#D4536D → #A32D2D`
- `.nl-btn.warn`: ámbar `rgba(255,170,80,.18)` con texto `#FFCB8A`
- `.nl-btn.full`: ocupa todo el ancho disponible
- `.nl-btn.compact` / `.nl-btn.small`: paddings reducidos

**Reglas**:
- Hover: `filter: brightness(1.08)`. Nada de cambios de color drásticos.
- Disabled: `opacity: 0.4`, `cursor: not-allowed`. Mantener el color base.
- Padding base: `8–10px 14–16px`.

### Pills / Badges (`.nl-pill`)

Usadas para mostrar estado: "Activo", "Cerrado", "Servicio", "+3 más".
- `.nl-pill.ok`: verde `rgba(56,217,150,.20)`
- `.nl-pill.danger`: rojo `rgba(255,77,109,.20)`
- `.nl-pill.warn`: ámbar `rgba(247,201,72,.20)`
- `.nl-pill.purple`: morado `rgba(165,44,223,.25)`

Tamaño: `font-size: 10px`, `padding: 4px 10px`, `border-radius: 999px` (pill total).

### Paneles (`.nl-panel`)

Card básica para agrupar contenido.
```css
.nl-panel {
  background: linear-gradient(180deg, #130618, #1A1020);
  border-radius: 12px;
  padding: 18px;
  box-shadow: inset 0 0 0 1px rgba(206,105,247,.10);
}
.nl-panel.purple-panel {
  /* variante con tinte morado más fuerte */
}
```

**Headers de panel**: solo título h3, **sin subtítulos descriptivos**. Si hace falta contexto se pone fuera del panel. (Excepción única: redesigns donde el contexto se perdería).

### Modales flotantes (`showAdminModal`)

Modales que abren ENCIMA del panel actual sin overlay fullscreen oscuro.
- Centrados, máximo 460px de ancho.
- Background `linear-gradient(180deg, #130618, #1A1020)`.
- Border `1px solid rgba(206,105,247,.30)`.
- Header con icon + título + botón × en esquina.
- Cuerpo con campos y al final botones de acción.

### Popups laterales

Popups discretos que aparecen en lateral derecho sin requerir focus completo.
- Posición: `top: calc(50% + 130px); right: 20px;` (no centrados).
- Width: 240–270px.
- Slide + fade in/out.
- **Hire offer**: focus completo (NUI focus) porque requiere acción.
- **Warn popup**: focus completo (informativo, requiere clicar "Entendido").

### Banner global (sanción al negocio)

Banner que aparece arriba de la tablet del jefe/empleado. Color según severidad:
- `.sev-leve`: gradient ámbar `rgba(255,170,80,.18) → .06`.
- `.sev-media`: gradient naranja `rgba(255,120,80,.20) → .08`.
- `.sev-grave`: gradient rojo `rgba(212,83,109,.18) → .08`.

Estructura: icon ⚠️ a la izquierda, título + severidad pill, motivo, "Por X · hace Y".

### Forms / Inputs

```css
.nl-input, .nl-warn-textarea {
  background: rgba(7,6,12,.70);
  border: 1px solid rgba(206,105,247,.22);
  border-radius: 10px;
  padding: 10px 12px;
  color: #fff;
  font-size: 12px;
  font-family: inherit;
}
.nl-input:focus {
  outline: none;
  border-color: rgba(206,105,247,.55);
}
```

**Labels de campos**: clase `.nl-hire-field-label` (mayúsculas, tracking ancho, lila opacidad .85).

## Iconografía

**Emojis permitidos para tabs/sidebar** (consistencia entre recursos):
- 🏠 Inicio / Dashboard
- 🏢 Negocios / Empresas
- 👥 Empleados
- ⏱ Actividad / Tiempo
- ★ Rangos
- $ Sociedad / Dinero (símbolo, no emoji)
- 📦 Almacén
- 🛒 Tienda / NPC
- 🚚 Pedidos / Delivery
- ⚠️ Sanciones / Alertas
- 🪪 Permisos
- 🧾 Facturas
- ✦ Blip / Mapa
- 📍 Ubicación
- 📌 Puntos / Markers
- 🟢 En servicio (estado activo)
- ✓ Confirmar / Completado
- ⚙ Ajustes
- 📩 Oferta / Mensaje

**Reglas**:
- Tamaño en sidebar tabs: contenedor 38px × 38px con icono centrado a 15–18px.
- Cuando el icono es un símbolo Unicode (`★`, `$`, `✦`, `⚙`), se renderiza con la fuente del sistema, no con emoji.
- **No usar emojis dobles ni emojis decorativos** en headers/titulares fuera de los listados arriba.

## Avatares

Cuando no hay imagen real, usar **iniciales** sobre círculo con fondo morado:
```js
function initials(name) {
  const parts = String(name).trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
```

Estilo: círculo 36–38px, fondo `rgba(165,44,223,.20)`, texto `#DA9FF1`, weight 800. Para severidades de warn cambiar a colores ámbar/naranja/rojo según corresponda.

## Notificaciones (in-game)

El proyecto usa **`origen_notify`** como sistema principal. Tipos válidos:
- `'info'`: gris
- `'success'`: verde
- `'warning'`: ámbar
- `'error'`: rojo
- `'business'`: morado SGCORP

Export: `exports['origen_notify']:ShowNotification(text, type, time)`. Tiempo default 3500ms.

Para textUI persistente: `CreateHelp / UpdateHelp / RemoveHelp` (también de `origen_notify`).

**Caída a ESX nativo si origen_notify no está disponible** (ya manejado en `Business.Notify`).

## Anti-patrones

Cosas que **nunca hacer** y que indican código no profesional:
- Texto en mayúsculas largas (>40 chars).
- Subtítulos descriptivos en headers de panel ("Asigna ID y rango antes de enviar").
- Mezclar fuentes diferentes en un mismo panel.
- Modales con overlay negro fullscreen.
- Usar `box-shadow` con halos grandes para "destacar".
- Usar `backdrop-filter` (rompe en CEF).
- Usar borders de >1px excepto separadores intencionales.
- Animaciones >300ms (lentas en juego).
- Usar colores fuera de la paleta para estados ("verde manzana", "rojo Coca-Cola", etc).
- Headings en cursiva.
- Padding inconsistente entre paneles del mismo nivel.

## Flujo de trabajo al crear un panel nuevo

1. **Identificar tipo**: ¿es un tab dentro de tablet existente? ¿modal? ¿popup? ¿F6?
2. **Ver `references/components.md`** para snippets copiables del componente base.
3. **Aplicar la paleta** SOLO con CSS variables (`var(--color-purple-main)` etc).
4. **Validar**: el panel debe respetar tablet size, sidebar layout y reglas anti-patrones.
5. **Bumpear versión de assets** en `index.html` (`?v=NNN`) para invalidar cache CEF.

## Recursos del proyecto donde se aplica

Esta skill aplica a cualquier UI de:
- `nl_business` (tablet jefe + admin + creación + popups warn/hire + HUD pedidos)
- `okokReports` (tema rebrandeado)
- `codem-billingv2` (rebrand)
- `nb-pausemenu-esx` (rebrand)
- `lb-phone` (theming opcional)
- Cualquier resource futuro que renderice NUI.

## Más referencia

- `references/components.md` — Snippets copiables de cada componente.
- `references/colors.md` — Paleta completa con códigos hex y casos de uso.
- `references/anti-patterns.md` — Ejemplos visuales de qué NO hacer y la corrección equivalente.
