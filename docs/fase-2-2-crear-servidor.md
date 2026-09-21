# Fase 2.2 — Crear servidor FiveM desde cero

**Rama:** `feat/fase-2-2-crear-servidor` · **Base:** `0fd010d` (cierre Fase 2.1)
**Commit de cierre:** `967be2b` (`feat: add FiveM server creation landing`)
**Checkpoint:** tag `pre-fase-2-2-crear-servidor` · **Tag de cierre:** `fase-2-2-cierre`
**Estado:** aprobado por revisión humana. Sin push ni deploy. Fase 2.3+ no iniciada al cierre.

## Objetivo

Landing para convertir una idea de servidor FiveM en una base funcional, ordenada y lista
para evolucionar. Vende claridad, estructura, configuración y acompañamiento; sin prometer
instantaneidad ni éxito de comunidad.

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `services/(mdx)/fivem/crear-servidor/page.tsx` | **Creada**: landing completa (metadata, Service+FAQPage JSON-LD, 10 secciones, `TrackedAccordion`, `dynamic='error'`) |
| `services/(mdx)/fivem/section.service.tsx` | Card estática "Crear servidor FiveM desde cero" → landing (sin distorsionar el catálogo) |
| `(landing)/section.situations.tsx` | Card 1 ("crear mi servidor") → nueva landing |
| `app/sitemap.ts` | URL `/services/fivem/crear-servidor/` (pública e indexable) |
| `components/common/app-breadcrumb.tsx` | `crear-servidor: 'Crear Servidor'` |

## Contenido y SEO verificados (HTML 200)

H1 único aprobado · title/description/canonical exactos · OG `og_servicios_fivem.png` (+TODO) ·
Service JSON-LD sin precios · 10 FAQs visibles = JSON-LD · 0 términos prohibidos ·
sitemap, hub, home, breadcrumb y preselect `?service=fivem_configuration_plan_personalizado` OK.

## Pruebas

- `yarn lint`: PASS, 0 warnings/errors. `yarn build`: PASS, exit 0, 36/36 rutas.
- Sin cambios en precios, legales, webhooks, secretos ni producción.

## Pendientes

| Pendiente | Prioridad | Acción |
|---|---|---|
| Revisión visual/teclado en preview | Media | Propietario |
| `faq_expand` (`fivem_crear_servidor`) en DebugView | Baja | Al publicar |
| OG específica crear-servidor | Baja | Propietario (TODO en código) |
| nui-ui / minecraft | — | No iniciadas |
