# Entrega Fases 0–1 — neenbyss.com

**Rama:** `feat/audit-fase-0-1` · **Checkpoint:** tag `pre-neenbyss-fase-0-1` (commit `1e81e24`) · **Fecha:** 21-sep-2026
**Baseline:** `docs/audit-fase-0-1-baseline.md` · **Base previa:** `docs/auditoria-neenbyss-2026-09-21.md`

## 1. Resumen

**Implementado (Fase 0):** rama + tag, `yarn install`, lint y build baseline (ambos PASS), documento de baseline con stack, rutas reales, metadata, formulario y GA4.

**Implementado (Fase 1):** B-01 (planes/precios/mensajes unificados), B-02 (home FiveM-first con hero aprobado, sección de situaciones, marquee reducido a 12, tabs por defecto en FiveM, proyectos FiveM primero), B-03 (formulario con brief condicional FiveM, placeholder guiado, título y confirmación aprobados, botón sin bloqueo mudo, errores inline), B-04 (titles/descriptions aprobados, canonicals propios, keywords recortadas, iconos/logo inexistentes corregidos, OG de ropa diferenciada, sitemap con URLs reales + FAQs/blog/posts y sin `lastmod` falso), B-05 (H1 únicos visibles, decorativas con `alt=""`+`aria-hidden`, `aria-labels`, foco `:focus-visible`, `prefers-reduced-motion`), B-06 (9 eventos GA4 sin remarketing ni PII), B-07 (fallback sin webhook, mensajes neutros, IP `x-real-ip`+forwarded, cooldown intacto), B-08 (404 con 5 enlaces útiles + `404_view`).

**No implementado (por alcance):** landings Fase 2 (crear-servidor, reparar-optimizar, nui-ui, minecraft), posts nuevos de blog, CMP/consentimiento (TODO legal), marcado de conversión dentro de GA4 (requiere acceso externo), rediseño visual.

## 2. Archivos modificados

| Archivo | Cambio | Motivo |
|---|---|---|
| `(landing)/section.hero.tsx` | H1/sub/CTAs/microcopy aprobados; checks sin 24/7 ni "Garantizado"; decorativas silenciosas | B-01, B-02, B-05 |
| `(landing)/section.situations.tsx` **(nuevo)** | 3 cards (crear / errores-lag / mecánica propia) → `?service=` válido | B-02 |
| `(landing)/page.tsx` | Orden Hero→Situations→Services→Valores/Projects→Timeline→Products→Contact | B-02 |
| `(landing)/section.products.tsx` | Marquee de ~50 a 12 conceptos FiveM-first; h2 sr-only corregido | B-02 |
| `(landing)/section.services.tsx` | Tab por defecto `fivem` | B-02 |
| `(landing)/section.projects.tsx` | CodeIQ 2.º (FiveM primero); sin romper enlaces | B-02 |
| `(landing)/section.contact.tsx` | Título aprobado; data-event email/Discord; aria-labels sociales | B-03, B-06, B-05 |
| `(landing)/section.timeline.tsx` | "Monitorización continua"; alts descriptivos TASK | B-01, B-05 |
| `contact/page.tsx` | H1 visible único; título aprobado; metadata aprobada + canonical; data-events; microcopy 24 h | B-03, B-04, B-05, B-06 |
| `components/form/contact.tsx` | 6 campos opcionales condicionales FiveM; placeholder/confirmación aprobados; botón sin bloqueo mudo + error inline; `contact_start/submit`, `service_preselect` | B-03, B-06 |
| `utils/schemas/contact.ts` | Nuevos opcionales (framework, estado, fecha, slots, evidencia, presupuesto); mensaje neutral anti-spam | B-03, B-07 |
| `components/form/contact.action.ts` | Fallback sin webhook (mensaje accionable, sin tecnicismos); chequeo `response.ok`; IP con `x-real-ip`; nuevos campos en embed | B-07 |
| `components/dialog/discord-invite.tsx` | Textos de confirmación aprobados + botones Discord/agenda/email con tracking | B-03, B-06 |
| `app/layout.tsx` | Title/description home aprobados; template `%s \| Neenbyss` | B-04 |
| `lib/metadata.ts` | Keywords globales 16→6; iconos solo `favicon.ico` real; logo Organization → `og.png` + TODO | B-04 |
| `app/sitemap.ts` | URLs reales (`web_development`, `ui_ux_design`); +`/faqs`, `/blog` y posts; sin `lastModified` falso | B-04 |
| `fivem/scripts/page.tsx` | Title/description aprobados; keywords 38→10; TrackedAccordion | B-04, B-06 |
| `fivem/ropa/page.tsx` | Title/description aprobados; keywords 29→10; OG `og_servicios.png` + TODO; TrackedAccordion | B-04, B-06 |
| `fivem/section.faqs.tsx` | Planes Oro/…→Mantenimiento/Desarrollo/Integral; TrackedAccordion | B-01, B-06 |
| `fivem/section.prices.tsx` | `plan_click` en los 4 planes (SLA 24-48 h de Mantenimiento conservado por ser SLA explícito) | B-06 |
| `faqs/page.tsx` | Planes y "desde $199" corregidos; TrackedAccordion x2 | B-01, B-06 |
| `services/page.tsx` + `section.hero.tsx` | H1 visible (se elimina `sr-only` en inglés); decorativas silenciosas | B-05 |
| `projects/page.tsx`, `blog/page.tsx` | Canonical propio (blog se mantiene indexable: tiene 3 posts reales, contra lo supuesto) | B-04 |
| `app/globals.css` | `:focus-visible` + `prefers-reduced-motion` | B-05 |
| `components/layout/header.tsx` | `aria-label` menú/Discord + `click_discord` | B-05, B-06 |
| `components/layout/footer.tsx` | `aria-label` sociales + email; decorativas silenciosas | B-05 |
| Heroes varios (fivem, web, ui_ux, projects, [slug]) | Decorativas `alt=""`+`aria-hidden` | B-05 |
| `components/analytics-tracker.tsx` **(nuevo)** | Delegación de clics `click_discord/email/agenda`, `plan_click` (sin PII, sin duplicados) | B-06 |
| `components/tracked-accordion.tsx` **(nuevo)** | `faq_expand` con `question_id`+`location` | B-06 |
| `components/not-found-tracker.tsx` **(nuevo)** + `app/not-found.tsx` | `404_view` en cliente (el `headers()` en servidor rompía el prerender; se movió a `window.location`) + 5 enlaces útiles | B-06, B-08 |
| `app/providers.tsx` | Monta `AnalyticsTracker` | B-06 |

## 3. Decisiones comerciales aplicadas

- Planes únicos: Mantenimiento `$199/mes`, Desarrollo `$349/mes`, Integral `$599/mes`, Personalizado `A cotizar`. Cero "Bronce/Plata/Oro/Diamante/40.50" en contenido comercial (verificado por grep + HTML de `/services/fivem`).
- "Soporte 24/7" → "Soporte según tu plan" (+ "Monitorización continua" donde era monitoreo, no soporte). SLA 24-48 h conservado solo como SLA explícito del plan Mantenimiento.
- Respuesta unificada: "Respuesta inicial en menos de 24 horas" (hero, contacto, diálogo, metadata). "Respuestas inmediatas" → "respuestas claras".
- "Resultados Garantizado" → "Proceso claro y entregables definidos". "ten por garantizado…" eliminado de la metadata de contacto.
- Home FiveM-first sin eliminar líneas secundarias (marquee movido abajo y reducido visualmente; catálogo intacto).
- Legales (`terms*`, `privacy`) no tocados salvo lo técnico necesario: "inmediatamente" en legales se deja para revisión legal (ver Pendientes).

## 4. Verificación

| Prueba | Resultado | Evidencia |
|---|---|---|
| `yarn lint` | PASS, 0 warnings/errors | salida `No ESLint warnings or errors` |
| `yarn build` | PASS, 34 rutas estáticas | `Generating static pages (34/34)`, sin errores de tipos |
| URLs locales (`next start -p 3500`) | 200 en `/`, `/services`, `/services/fivem`, `/scripts`, `/ropa`, `/contact`, `/faqs`, `/projects`, `/blog`, `/robots.txt`, `/sitemap.xml`; 404 en `/no-existe-xyz` | curl: status + title/H1/canonical por ruta |
| SEO renderizado | H1 único + title + canonical propios en las 9 rutas; OG ropa `og_servicios.png`; JSON-LD en scripts; sitemap con URLs reales + posts | view-source + `<loc>` listados |
| Título duplicado `\| Neenbyss \| Neenbyss` | Detectado en scripts/ropa/contacto y corregido (títulos sin sufijo; el template lo añade) | re-verificación pendiente tras rebuild final |
| Formulario | Preselección `?service=fivem_scripts` OK (contenido SSR con 23 coincidencias fivem/Framework); errores inline por zod; botón habilitado con error de términos visible; rate-limit intacto | código + HTML; envío real no ejecutado (sin webhook en local) |
| Responsive/a11y | Sin scroll-X esperado (clases intactas); tabs/acordeones Radix operables por teclado; foco visible global; decorativas ignoradas | código; revisión manual 390/768/1280 pendiente en preview |
| Eventos | `contact_start/submit`, `service_preselect`, `click_*`, `plan_click`, `faq_expand`, `404_view` cableados; sin PII (solo uids/longitudes/locations); `contact_submit` solo en éxito | código; disparo real pendiente de debug GA4 en staging |
| 404 | Contenido útil + 5 enlaces + evento; build estático OK tras mover path al cliente | `/no-existe-xyz` → 404 con enlaces |

## 5. Pendientes

1. Re-verificar títulos sin duplicación tras el rebuild final (scripts/ropa/contacto) — 2 min en preview.
2. Revisión manual responsive 390/768/1280 + teclado completo (Tab/Shift+Tab/Enter/Space/Escape) en home, planes, FAQs y formulario.
3. Debug GA4 en staging (gtag sin bloqueador): cada evento 1 vez; `contact_submit` solo en éxito; marcarlo como conversión en la UI de GA4 (acceso externo).
4. Decisión legal CMP/consentimiento MX/ES/LatAm + textos de `terms*` con "inmediatamente" y política de propiedad/escrow (no modificar sin abogado/propietario).
5. Assets de marca: `logo.png` cuadrado, `icon.png`/`apple-icon.png`, OG específica de ropa/EUP (TODOs en código).
6. Envío real de formulario en staging con webhook de prueba (no usar el productivo).
7. `DISCORD_WEBHOOK_URL`, `MAIL_*`, `REDIS_*` configuradas en el entorno de despliegue (solo nombres; valores nunca en repo).

## 6. Riesgos

- El template de título cambió a `%s | Neenbyss`: todas las páginas hijas pierden el sufijo " - Arquitectos digitales". Intencionado, pero revisar SERPs tras desplegar.
- El sitemap cambió URLs (`web-development`→`web_development`): las URLs con guion nunca existieron (404), pero si hay backlinks externos a ellas, considerar redirects 301.
- `use-analytics` sigue existiendo para uso manual; el nuevo `AnalyticsTracker` no duplica pageviews (solo clics), pero convivir dos abstracciones puede confundir: documentado aquí.
- Campos nuevos del formulario viajan en el embed de Discord: no contienen PII más allá de lo que el usuario escriba; el enlace de evidencia es texto libre (validado como http/https).
- `prefers-reduced-motion` desactiva animaciones globalmente: `motion`/`Fade` seguirán montando pero sin transición — verificado solo en CSS, probar con emulación.

## 7. Próximo paso

Preparar la **Fase 2** (no implementada aquí): `/services/fivem/crear-servidor`, `/services/fivem/reparar-optimizar`, `/services/fivem/nui-ui`, `/services/minecraft` — cada una con H1/intención/CTA/FAQ/JSON-LD propios, reutilizando `TrackedAccordion`, `AnalyticsTracker` (`service_preselect` ya los soporta) y la matriz de planes unificada de esta fase.

## Addendum — cierre de validación (21-sep-2026, rama `feat/audit-fase-0-1`)

Cambios aplicados tras la validación final en modo plan:

- **PII (bloqueante, resuelto):** `google-analytics.tsx` envía `page_location` como `origin+pathname` (antes `href` completo, que arrastraba `?email=` a GA4). El captador del footer guarda el email en `sessionStorage` y navega a `/contact` sin query; el formulario lo usa como fallback tras la query (compatibilidad). Verificado en el chunk compilado `layout-*.js`.
- **H1 visibles:** `/projects`, `/services/web_development` y `/services/ui_ux_design` tenían H1 `sr-only` (el de UI/UX con texto erróneo "Desarrollo Web"). Ahora el título visual es el H1 en las tres, sin cambios de estilo.
- **Select preseleccionado:** línea visible "Servicio seleccionado: X" con `aria-live` bajo el campo (Radix muestra el placeholder hasta abrir el desplegable; el valor siempre fue correcto).
- Re-run final: `yarn lint` 0 warnings + `yarn build` 34 rutas OK; HTML verificado ruta por ruta (H1 único visible, titles sin duplicar, canonicals reales, sitemap limpio, 404 útil, sin términos prohibidos).

Pendiente externo (no ejecutable aquí): E2E con webhook de pruebas, DebugView + marcado de conversiones en GA4, pasada manual responsive/teclado, CMP/legal y assets de marca.
