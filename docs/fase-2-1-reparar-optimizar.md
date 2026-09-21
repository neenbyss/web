# Fase 2.1 — Reparar y optimizar servidor FiveM

**Rama:** `feat/fase-2-reparar-optimizar` · **Base aprobada:** `16afafb`
**Commit de cierre:** `2882e14` (`feat: add FiveM repair and optimization landing`)
**Checkpoint:** tag `pre-fase-2-reparar-optimizar` · **Tag de cierre:** `fase-2-1-cierre`
**Estado:** aprobado por revisión humana (contenido, diseño, formulario, navegación, SEO, responsive).
Sin push ni deploy. Fase 2.2+ no iniciada.

## Objetivo

Landing para propietarios de servidores FiveM con urgencias de estabilidad y rendimiento
(no inicia, crashes, errores de recursos, lag, conflictos, SQL/callbacks, streaming, updates
rotas, optimización pre-beta/evento) que convierte en solicitud de diagnóstico vía
`/contact?service=fivem_support`.

## Archivos modificados

| Archivo | Cambio |
|---|---|
| `services/(mdx)/fivem/reparar-optimizar/page.tsx` | **Creada**: landing completa (metadata, Service+FAQPage JSON-LD, 9 secciones, `TrackedAccordion`, `dynamic='error'`) |
| `utils/data/services.tsx` | `href` a la landing en la entrada `fivem_support` (card del hub → "Ver detalles") |
| `(landing)/section.situations.tsx` | Card "errores o lag" → nueva landing |
| `app/sitemap.ts` | URL `/services/fivem/reparar-optimizar/` (pública e indexable) |
| `components/common/app-breadcrumb.tsx` | `reparar-optimizar: 'Reparar y Optimizar'` |
| `(static)/projects/layout.tsx` | Eliminado prop `modal` muerto (sin ruta `@modal`; renderizaba `undefined`) |

## Contenido implementado

Hero (H1/sub/CTAs/microcopy aprobados) · 8 síntomas en cards con CTA · qué revisamos (12) ·
cómo trabajamos (5 pasos, "cuando es posible") · qué recibes (7) · qué necesitamos (8,
informativos) · alcance y límites (5, alineado a términos sin modificarlos) · CTA final ·
8 FAQs visibles (= JSON-LD, sin plazos inventados) · enlaces internos (fivem, scripts, ropa,
projects, faqs, contacto).

## SEO verificado (HTML renderizado, 200)

H1 único · title/description/canonical (`/services/fivem/reparar-optimizar`) exactos ·
OG `og_servicios_fivem.png` (TODO propietario: OG específica) · Service JSON-LD sin precios ·
8 FAQs · 0 términos prohibidos (Bronce/Plata/Oro/Diamante/40.50/24-7/garantizado).

## Pruebas ejecutadas

- `yarn lint`: PASS, 0 warnings/errors.
- `yarn build`: PASS, exit 0, 35/35 rutas incl. `reparar-optimizar`.
- Sitemap, hub (card → landing), home (card → landing), breadcrumb, preselect
  `?service=fivem_support` (200): verificados en local.

## Arreglo del modal muerto

El build fallaba en `.next/types/.../projects/layout.ts`: el layout declaraba el slot `modal`
sin que exista ninguna ruta `@modal` (verificado: jamás en git). Bisect con 6 builds:
árbol limpio `16afafb` pasa; cualquier cambio disparaba el error de forma determinista.
Fix: eliminar el prop (cero cambio de comportamiento, `{modal}` siempre fue `undefined`).
Sin este fix ningún cambio futuro compila.

## Pendientes

| Pendiente | Prioridad | Acción |
|---|---|---|
| Revisión visual 390/768/1280 + teclado en preview | Media | Propietario (checklist Fase 1) |
| `faq_expand` con `location=fivem_reparar_optimizar` en DebugView | Baja | Al publicar, GA4 |
| OG específica de reparación/optimización | Baja | Propietario (TODO en código, no eliminar) |
| Siguientes landings (crear-servidor, nui-ui, minecraft) | — | No iniciadas a propósito |
