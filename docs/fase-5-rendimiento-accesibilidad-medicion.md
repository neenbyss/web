# Fase 5 — Rendimiento, accesibilidad y medición

Rama: `feat/fase-5-rendimiento-accesibilidad-medicion`
Base: `cf8e13c` (cierre Fase 4) · Checkpoint previo: `pre-fase-5-rendimiento-accesibilidad-medicion`
Commit: **perf: improve accessibility and measurement readiness**
Tag: **fase-5-cierre**

Sin nuevas páginas, sin rediseño, sin cambios en precios/planes/claims,
legales, webhooks, secretos, Analytics ni remarketing. Fase 3 no tocada.

## Problemas encontrados (confirmados por código, sin métricas inventadas)

1. Labels sin asociación programática (`ui/input`, `ui/textarea`, `ui/select`):
   `<label>` sin `htmlFor`, controles sin `id`, errores sin `aria-describedby`.
2. Tipos inválidos `type="name"` / `type="phone"` en el formulario.
3. Sin foco al primer campo con error tras submit inválido.
4. `use-server-action` interpolaba el error crudo en el mensaje al usuario.
5. `console.log(pending)` olvidado en `progress-bar`.
6. `Fade`/`motion` ignoraban `prefers-reduced-motion` (el media query CSS no
   detiene animaciones JS; no había `MotionConfig`).
7. Imágenes debajo del pliegue sin `loading="lazy"`/`decoding="async"`
   (cards de proyectos, `ProductCard`, `img` de MDX) y `alt` débil
   (`title + '_image'`).
8. ~20 enlaces externos `target="_blank"` sin `rel="noopener noreferrer"`.
9. Landmarks sin distinguir (3 `<nav>` en footer) y `DrawerTitle` en inglés.
10. Código muerto aparente: `trackPageView` sin llamadas, `next-view-transitions`
    sin uso (se decidió **no eliminar**, ver abajo).

## Correcciones aplicadas

- `ui/input.tsx`, `ui/textarea.tsx`: `useId` estable por instancia, `htmlFor`/
  `id`, `aria-invalid`, `aria-describedby` al mensaje de error.
- `ui/select.tsx`: trigger Radix asociado vía `aria-labelledby` (+ error con
  `aria-describedby`, `aria-invalid`); `htmlFor` no aplica a `<button>`.
- `form/contact.tsx`: `text`/`tel`, `autoComplete` (`name`, `email`, `tel`,
  `organization`), `onInvalid` enfoca el primer `[aria-invalid="true"]`.
  Sin cambios en `name`, validación Zod, preselección `?service=` ni eventos.
- `hooks/use-server-action.tsx`: mensaje neutral fijo; detalle solo en log.
  Contrato intacto.
- `layout/progress-bar.tsx`: eliminado el único `console.log` de `src/`.
- `app/providers.tsx`: `MotionConfig reducedMotion="user"` (cubre Fade, header
  y splash; el CSS ya cubría marquee/transiciones).
- `ui/fade.tsx`: prop `rel` explícita (el tipo genérico la excluía).
- Imágenes: `lazy` + `async` en proyectos, landing y MDX; `alt={title}`;
  decorativas conservan `alt=""` + `aria-hidden`; sin migración a `next/image`.
- `rel="noopener noreferrer"` en todos los externos con `_blank` (header,
  footer, contact, landing, projects, MDX). Comportamiento intacto.
- Footer: `aria-label` ("Navegación de la compañía", "Navegación legal",
  "Redes sociales"). Header: import sin uso eliminado (lint lo confirma),
  `DrawerTitle` → "Navegación".
- Nuevo `docs/analytics-manual-checklist.md`: guía DebugView de los 8 eventos.
- Código muerto **conservado**: `trackPageView` y `next-view-transitions`
  podrían servir a una integración futura; eliminarlos solo ahorraría bytes
  marginales y el riesgo/beneficio no compensa sin medición.

## Pruebas ejecutadas (local)

| Prueba | Resultado |
|---|---|
| `yarn lint` | 0 warnings/errors |
| `yarn build` | exit 0, 41 rutas |
| `npx tsc --noEmit` | exit 0 |
| Rutas (15 + post + robots + sitemap) | 200, H1 único; 404 correcto |
| JSON-LD/canonicals/OG/sitemap | intactos (BlogPosting, Service, 7 entradas blog) |
| `?service=fivem_scripts` | 200, preselección intacta en código |
| Bundles | `tel`/`autoComplete`/foco-error y `reducedMotion="user"` presentes |
| `console.log` / `_blank` sin `rel` | 0 casos |
| Eventos GA4 (código) | 9 eventos sin cambios, sin duplicación, sin PII |
| Alcance/Fase 3 | 17 archivos solo de Fase 5; Fase 3 intacta |

## Pruebas manuales realizadas

Revisión humana del propietario (aprobada): responsive 390/768/1280,
navegación con teclado, foco en errores del formulario, labels (básica o con
lector), `prefers-reduced-motion`, contenido above-the-fold visible, toasts,
diálogos y mensajes de éxito/error.

## Pendientes de Lighthouse

Sin Chrome/navegador en este entorno: no se midieron LCP/CLS/INP ni contraste
exacto. Medir en preview contra esta base cuando haya navegador disponible.
Hipótesis abiertas: splash overlay ~10 ms, marquee 2×4 nodos, `SpotlightCard`
por mousemove, peso de `motion`.

## Pendientes de GA4 DebugView

Seguir `docs/analytics-manual-checklist.md` (8 eventos). Marcar
`contact_submit` como conversión manualmente en GA4. Nunca deben aparecer:
nombres, emails, teléfonos, mensajes, IP, logs, query strings.

## Pendientes de CMP/legal

Sin cambios en esta fase. No instalar CMP ni añadir tracking sin decisión del
propietario. `next-view-transitions` y `trackPageView` quedan como están.
