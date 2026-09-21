# Fase 2.3 — Diseño NUI/HUD para FiveM

**Rama:** `feat/fase-2-3-nui-ui` · **Base:** `307fa28` (cierre Fase 2.2)
**Commit de cierre:** `988ee7b` (`feat: add FiveM NUI UI landing`)
**Checkpoint:** tag `pre-fase-2-3-nui-ui` · **Tag de cierre:** `fase-2-3-cierre`
**Estado:** aprobado por revisión humana. Sin push ni deploy. Minecraft no iniciado al cierre.

## Objetivo

Landing para propietarios/creadores FiveM que necesitan una interfaz visual propia y
coherente (pause menu, HUD, teléfono, inventario, paneles), ya sea rediseño o creación
nueva. Sin prometer retención, ventas ni resultados no demostrados.

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `services/(mdx)/fivem/nui-ui/page.tsx` | **Creada**: landing completa (metadata, Service+FAQPage JSON-LD, 10 secciones, `TrackedAccordion`, `dynamic='error'`) |
| `services/(mdx)/fivem/section.service.tsx` | Card estática "Diseño NUI/HUD" → landing (2.ª card, sin alterar catálogo) |
| `app/sitemap.ts` | URL `/services/fivem/nui-ui/` (pública e indexable) |
| `components/common/app-breadcrumb.tsx` | `nui-ui: 'NUI y UI'` |

## Contenido y SEO verificados (HTML 200)

H1 único aprobado · title/description/canonical exactos · OG `og_servicios_fivem.png` (+TODO) ·
Service JSON-LD sin precios · 10 FAQs visibles = JSON-LD · caso CodeIQ descrito solo con lo
publicado (rediseño UI, crédito de desarrollo a CodeIQ, sin métricas) · 0 términos prohibidos ·
sitemap, hub, preselect `?service=fivem_nui_ui` OK.

## Pruebas

- `yarn lint`: PASS, 0 warnings/errors. `yarn build`: PASS, exit 0, 37/37 rutas.
- Ruta `/services/fivem/nui-ui` responde 200 en local.
- Sin cambios en precios, legales, webhooks, secretos ni producción.

## Pendientes

| Pendiente | Prioridad | Acción |
|---|---|---|
| Revisión visual/teclado en preview | Media | Propietario |
| `faq_expand` (`fivem_nui_ui`) en DebugView | Baja | Al publicar |
| OG específica NUI | Baja | Propietario (TODO en código) |
| Minecraft | — | Fase 2.4 |
