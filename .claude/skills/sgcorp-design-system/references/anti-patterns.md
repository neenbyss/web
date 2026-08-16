# Anti-patterns — Qué NO hacer

Errores comunes en NUI de FiveM y la corrección equivalente en SGCORP design system.

## 1. Overlay negro fullscreen para modales

❌ **Mal**:
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);  /* además rompe en CEF */
}
```

✅ **Bien**: solo el card visible, sin oscurecer el resto:
```css
.modal-overlay {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}
.modal-overlay > .modal {
  pointer-events: auto;
}
```

**Por qué**: la tablet ya tiene su propio backdrop visual (es un overlay sobre el juego). Añadir otro overlay encima crea capas de oscuridad innecesarias.

---

## 2. `backdrop-filter`

❌ **Mal**:
```css
.glass-panel { backdrop-filter: blur(10px); }
.frosted     { backdrop-filter: blur(20px) saturate(150%); }
```

✅ **Bien**: usar gradients sólidos para profundidad:
```css
.panel {
  background: linear-gradient(180deg, #130618, #1A1020);
}
```

**Por qué**: CEF en FiveM (Chromium embedded) tiene bugs conocidos de renderizado con `backdrop-filter` que producen artefactos visuales (rectángulos negros, parpadeos). **Está prohibido en este design system**, sin excepciones.

---

## 3. Box-shadow excesivos

❌ **Mal**:
```css
.card {
  box-shadow:
    0 0 60px rgba(165, 44, 223, 0.5),
    0 20px 80px rgba(0, 0, 0, 0.8),
    0 0 0 4px rgba(206, 105, 247, 0.4);
}
```

✅ **Bien**: máximo 2 shadows, valores bajos:
```css
.card {
  box-shadow:
    inset 0 0 0 1px rgba(206,105,247,.10),
    0 12px 40px rgba(0,0,0,.45);
}
```

**Por qué**: los halos grandes parecen "render de Photoshop" en lugar de UI nativa. La identidad SGCORP es clean, no neon-glow.

---

## 4. Bordes gruesos

❌ **Mal**:
```css
.panel { border: 2px solid #CE69F7; }
.button { border: 3px solid var(--purple); }
```

✅ **Bien**: máximo 1px:
```css
.panel { box-shadow: inset 0 0 0 1px rgba(206,105,247,.22); }
```

**Por qué**: 2px+ en CEF se ve aliased y poco profesional. Si necesitas más presencia visual, usa background, no border.

---

## 5. Subtítulos descriptivos en headers de paneles

❌ **Mal**:
```html
<div class="panel-header">
  <h3>Sanciones</h3>
  <p>Aquí puedes ver todas las sanciones del negocio. Las leves caducan a los 10 días, las medias a los 20 y las graves a los 30. Pulsa el botón eliminar para borrar.</p>
</div>
```

✅ **Bien**: solo el título, el contexto va fuera o en tooltips:
```html
<div class="panel-header">
  <h3>Sanciones</h3>
</div>
```

**Por qué**: los textos descriptivos repiten información que ya está en la UI o se puede inferir. Generan ruido visual y alargan paneles innecesariamente. **Excepción única**: cuando un panel es nuevo y el usuario no tiene contexto de qué hace.

---

## 6. Emojis decorativos

❌ **Mal**:
```html
<h3>🎉 Bienvenido al panel ✨</h3>
<button>📌 Guardar 💾</button>
```

✅ **Bien**: emojis solo como icons funcionales en tabs/cards:
```html
<button class="nl-tab"><div class="nl-tab-icon">🏠</div><span>Inicio</span></button>
```

**Por qué**: SGCORP es identidad seria/profesional. Los emojis decorativos rompen el tono.

---

## 7. Mezcla de unidades de border-radius

❌ **Mal**:
```css
.btn-1 { border-radius: 5px; }
.btn-2 { border-radius: 7px; }
.btn-3 { border-radius: 9px; }
.card-1 { border-radius: 11px; }
.card-2 { border-radius: 13px; }
```

✅ **Bien**: solo valores de la escala oficial:
```
6, 8, 10, 12, 14, 18, 38
```

**Por qué**: la escala consistente es lo que hace que el sistema "se sienta" cohesivo. Pequeñas variaciones (5 vs 6, 11 vs 12) pasan desapercibidas pero degradan la impresión global.

---

## 8. Animaciones lentas

❌ **Mal**:
```css
.modal { transition: all 0.6s ease-out; }
.tab    { transition: background 1s; }
```

✅ **Bien**: máximo 300ms, idealmente 150–240ms:
```css
.modal { transition: opacity .24s ease, transform .24s ease; }
.tab    { transition: .18s ease; }
```

**Por qué**: en juego, las animaciones lentas hacen que la UI se sienta pesada. Estás compitiendo con otras animaciones del HUD.

---

## 9. Texto en mayúsculas largo

❌ **Mal**:
```html
<button>HACER UN PEDIDO DE PROVEEDOR AL PUNTO DE ENTREGA</button>
```

✅ **Bien**: mayúsculas solo para kickers cortos (1–3 palabras):
```html
<button>Hacer pedido</button>
<div class="kicker">GESTIÓN DEL NEGOCIO</div>
```

**Por qué**: el texto en mayúsculas es difícil de leer si supera 3-4 palabras. Solo apto para etiquetas (kickers).

---

## 10. localStorage / sessionStorage

❌ **Mal**:
```js
localStorage.setItem('user_pref', JSON.stringify(prefs));
```

✅ **Bien**: persistir en server vía NUI callback:
```js
fetch(`https://${GetParentResourceName()}/savePref`, {
  method: 'POST',
  body: JSON.stringify(prefs)
});
```

**Por qué**: el storage del navegador NUI no es persistente en FiveM. Cada vez que el cliente cierra el juego o se actualiza el resource, se pierde.

---

## 11. Forms con submit nativo

❌ **Mal**:
```html
<form action="/submit" method="POST">
  <input name="reason" />
  <button type="submit">Enviar</button>
</form>
```

✅ **Bien**: interceptar con onClick:
```html
<input id="reason" />
<button onclick="submitWarn()">Enviar</button>
```

**Por qué**: el submit nativo de form intenta navegar a la URL relativa, que en NUI causa errores extraños o page reload del overlay.

---

## 12. Padding inconsistente entre paneles del mismo nivel

❌ **Mal**: tres cards de stats con padding diferente:
```html
<div style="padding: 18px"><!-- card 1 --></div>
<div style="padding: 22px"><!-- card 2 --></div>
<div style="padding: 16px"><!-- card 3 --></div>
```

✅ **Bien**: usar la misma clase y dejar que el design system mande:
```html
<div class="nl-stat"><!-- card 1 --></div>
<div class="nl-stat"><!-- card 2 --></div>
<div class="nl-stat"><!-- card 3 --></div>
```

**Por qué**: la consistencia en spacing es lo más visible para el ojo del usuario. Diferencias de 2-4px se notan.

---

## 13. Múltiples fuentes en el mismo panel

❌ **Mal**:
```css
h3       { font-family: 'Evogria'; }
.label   { font-family: 'Roboto'; }
.value   { font-family: 'Open Sans'; }
.button  { font-family: system-ui; }
```

✅ **Bien**: una fuente para títulos (Evogria), una para body (Inter/system stack):
```css
h1, h2, h3 { font-family: 'Evogria', 'Inter', sans-serif; }
body, .nl-content { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
```

---

## 14. Headings en cursiva

❌ **Mal**:
```css
h1, h2, h3 { font-style: italic; }
```

✅ **Bien**: cursiva solo para empty states o citas:
```css
.nl-empty { font-style: italic; color: rgba(207,207,207,.45); }
```

**Por qué**: cursiva en headings rompe la jerarquía. Reservada para texto secundario emocional/sutil.

---

## 15. Headers sin color de acento (kicker)

❌ **Mal**:
```html
<h1>Inicio</h1>
```

✅ **Bien**: añadir kicker arriba para contexto:
```html
<header class="nl-main-header">
  <div class="nl-kicker">GESTIÓN DEL NEGOCIO</div>
  <h1>Inicio</h1>
</header>
```

```css
.nl-kicker {
  font-size: 11px;
  letter-spacing: .14em;
  color: rgba(218,159,241,.85);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 4px;
}
```

**Por qué**: el kicker da contexto rápido y refuerza la identidad lila del sistema.
