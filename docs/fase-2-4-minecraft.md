# Fase 2.4 — Servicios Minecraft

**Rama:** `feat/fase-2-4-minecraft` · **Base:** `e3afa62` (cierre Fase 2.3)
**Commit de cierre:** `65064cc` (`feat: add Minecraft services landing`)
**Checkpoint:** tag `pre-fase-2-4-minecraft` · **Tag de cierre:** `fase-2-4-cierre`
**Estado:** aprobado por revisión humana. Sin push ni deploy. Fase 3 no iniciada al cierre.

## Objetivo

Landing consultiva (`/services/minecraft`) para administradores que necesitan una función,
integración o extensión: primero se evalúa si conviene configurar, extender o desarrollar.

## Decisiones sobre capacidades (auditoría previa)

- El repositorio tenía **0 UIDs, 0 menciones de código y 0 fichas** de Minecraft.
- Con aprobación del propietario se creó `minecraft_plugin_consulting` (categoría
  `minecraft`, icono neutro) en `services.tsx`; el schema deriva enums dinámicamente.
- Todo claim técnico (Paper/Spigot/Fabric, versiones) quedó condicionado
  ("según versión, entorno y alcance") + TODO de validación con casos reales.
- Sin caso de éxito inventado (Hennus es UI para hosting, no desarrollo de plugins).

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `services/minecraft/page.tsx` | **Creada**: landing completa (metadata, Service+FAQPage JSON-LD, 10 secciones + tabla comparativa + bloque decisión, `TrackedAccordion`, `dynamic='error'`) |
| `utils/data/services.tsx` | Categoría `minecraft` + servicio `minecraft_plugin_consulting` (aprobado) |
| `app/sitemap.ts` | URL `/services/minecraft/` (pública e indexable) |
| `components/common/app-breadcrumb.tsx` | `minecraft: 'Minecraft'` |

## SEO y pruebas

H1 único · title/description/canonical exactos · OG `og_servicios.png` (+TODO) ·
Service + FAQPage JSON-LD · 10 FAQs · 0 claims prohibidos ·
sitemap, preselect `?service=minecraft_plugin_consulting`, UID en bundle: OK.
`yarn lint` PASS · `yarn build` PASS (38/38).
Las 4 landings (reparar, crear, nui-ui, minecraft) responden 200.

## Pendientes

| Pendiente | Prioridad | Acción |
|---|---|---|
| Validar Paper/Spigot/Fabric con casos reales | Media | Propietario (TODO en código) |
| OG específica Minecraft | Baja | Propietario (TODO en código) |
| `faq_expand` (`minecraft`) en DebugView | Baja | Al publicar |
| Revisión visual/teclado en preview | Media | Propietario |
