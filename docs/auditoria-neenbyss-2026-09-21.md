# Auditoría, estrategia y mejora integral — neenbyss.com

**Fecha:** 21-sep-2026 · **URL:** https://neenbyss.com/ · **Objetivo:** captar solicitudes de presupuesto FiveM (scripts, configuración, reparación, optimización, UI/NUI, planes mensuales) · **Idioma:** español
**Método:** inspección de código en `D:\CODE\neenbyss\web` + fetch en vivo de `/`, `/services/fivem`, `/contact`, `robots.txt`, `sitemap.xml` + informe local `fivem_audience_analysis_es.md` (sí leído, 25-ago-2026).
**Regla:** cada conclusión se marca como **HECHO** / **INFERENCIA** / **HIPÓTESIS** / **RECOMENDACIÓN**. Nada de testimonios, métricas, clientes o precios inventados.

---

## 0. Inventario breve + limitaciones (lo pedido antes de proponer)

### Inventario verificado
- **Stack (HECHO):** Next.js 15.3.8 + React 19 + MDX (`pageExtensions` js/jsx/md/mdx/ts/tsx), Tailwind v4, Radix UI, `next-view-transitions`, `motion`, RHF + zod, nodemailer, upstash/ioredis. Fuente: `package.json:13-68`, `next.config.ts:1-26`.
- **Rutas reales, 17 `page.*` (HECHO):** `/` (`src/app/(static)/(landing)/page.tsx` + `section.hero/products/valores/projects/services/timeline/contact`), `/services` (+ `section.hero/categories`), `/services/fivem` (+ `section.hero/intro/service/valores/prices/glosario/faqs`), `/services/fivem/scripts`, `/services/fivem/ropa`, `/services/web-development`, `/services/ui-ux-design`, `/projects` + `/projects/[slug]`, `/blog` + `/blog/[slug]`, `/contact`, `/faqs`, `/privacy`, `/terms`, `/terms-software`, `/terms-fivem`, `not-found.tsx`. Sitemap vivo declara además 10 fichas `/projects/:slug` (aborigen-web, zeew, code_iq_pausemenu, equitransandreu, genex, hennus_web, hrcom_admin_panel, pactus-legis, singapur_panel, asvitrax_bot).
- **SEO base (HECHO):** `src/lib/metadata.ts` (`createMetadata` + `generateStructuredData` Organization/Service/WebPage, OG `og*.png` 1200x630, twitter `summary_large_image`, canonical, `es-MX/es`, verification google `XT7x…`), `src/app/robots.ts` (allow `/`, disallow admin/api/private/_next, sitemap + host), `src/app/sitemap.ts` (13 estáticas + proyectos dinámicos). FAQPage JSON-LD en `/faqs:121-132` y Service + FAQPage en `/services/fivem/scripts:22-66,221-232` y `/ropa:22-54`. **Verificado en vivo:** `robots.txt` y `sitemap.xml` responden 200 y coinciden con el código (fetch 21-sep-2026).
- **Conversión (HECHO):** `/contact?service=` preselecciona (`src/components/form/contact.tsx:43-50`). Campos: nombres*, email*, teléfono, compañía, servicio* agrupado (`src/utils/data/services.tsx:70-275`), mensaje* (mín. 10 caracteres y >5 palabras, `src/utils/schemas/contact.ts:41-49`), checkbox términos bloquea submit (`contact.tsx:102,202-203`). Server action valida zod + cooldown 60 s por IP + embed a `DISCORD_WEBHOOK_URL` (`contact.action.ts:16-62`). Secundarias: `team@neenbyss.com`, `/discord` → 308 a `discord.com/invite/w8fem9RDr4` (`next.config.ts:9-17`), meeting `calendar.app.google/sqTp4qA1dR6Z7J3g8` (`global-links.ts:10-13`), horario Lun–Sáb 6PM–1AM UTC (`contact/page.tsx:121-124`).
- **Analítica (HECHO):** solo GA4 `G-PNEFE3E0PD` pageview (`layout.tsx:34`, `google-analytics.tsx:11-30` `afterInteractive`) y hook `use-analytics.tsx:15-29` (`trackEvent`/`trackPageView`) **sin ninguna llamada real** (grep: 0 usos en pages/forms). Sin banner de consentimiento, sin Pixel/Clarity/Ads.

### Limitaciones
1. Sin acceso a GA4/Search Console/ventas/Discord: tráfico, keywords, conversiones, tasa de cierre = **no disponible**.
2. Sin Lighthouse/PageSpeed ejecutado en esta fase (solo lectura + fetch texto): CWV de campo = **no disponible**; rendimiento = inferencia de código.
3. Móvil evaluado por clases responsive + fetch, sin DevTools táctil ni lector de pantalla.
4. Competidores/foros solo como patrones de lenguaje; sin copiar textos, diseños ni código.

---

## 1. Resumen ejecutivo (10 conclusiones por impacto)

1. **El home no convierte urgencia FiveM en 5 segundos.** H1 genérico "Desarrollo de Software, Scripts FiveM y UI/UX a Tu Medida" (`section.hero.tsx:68-76`) + marquee de ~50 servicios (`section.products.tsx:55-104`) diluyen al segmento prioritario (fundador/propietario FiveM con error, lag o lanzamiento). **HECHO + INFERENCIA.** → Hero segmentado + CTA "Cotizar / Diagnosticar" por encima del pliegue. **RECOMENDACIÓN P0.**
2. **Arquitectura FiveM incompleta para la intención real.** Existe `/services/fivem`, `/scripts`, `/ropa`, pero **no hay** páginas dedicadas crear-desde-cero / reparar-crashes / optimizar-lag / NUI-reskin, ni nada de Minecraft ni digitalización-proceso como rutas propias (Minecraft solo aparece en copy/FAQ). **HECHO.** → Crear 3–4 landings de intención, no 12. **RECOMENDACIÓN P1.**
3. **Precios y planes inconsistentes = fricción de confianza.** FAQ general dice scripts desde 50 USD / ropa desde 30 / planes "desde 40.50 USD/mes" y niveles Bronce–Diamante (`faqs/page.tsx:68-70,46-50`); JSON-LD FiveM dice `199–2000 USD` (`fivem/page.tsx:15`); precios reales `$199/$349/$599` + Personalizado con niveles Mantenimiento/Desarrollo/Integral (`section.prices.tsx:140-220`); FAQ FiveM dice respuesta "Oro/Platino/Diamante… Bronce" (`section.faqs.tsx:106-109`) que **no existen** en el catálogo. **HECHO.** → Unificar una sola tabla de planes + matriz incluido/no incluido. **P0 credibilidad.**
4. **Formulario con fricción alta para urgencia.** 6 campos + mensaje largo obligatorio + checkbox que deshabilita el botón sin explicar por qué + sin campo de contexto (framework, logs, urgencia, presupuesto) que el informe de audiencia pide (brief 12 campos). Éxito abre diálogo de Discord que puede confundirse con error. **HECHO** (`contact.tsx:96-211`, `contact.action.ts`). → Brief guiado por tipo de proyecto + consentimiento sin bloqueo opaco + confirmación con siguiente paso. **P0 conversión.**
5. **Medición ciega.** GA4 solo pageview; cero eventos de `contact_submit`, clic Discord/email/agenda, `service_preselect`, scroll/abandono; sin consentimiento documentado. **HECHO** (grep `trackEvent` sin usos). → Esquema mínimo de 6 eventos + página de privacidad con base legal. **P0.**
6. **SEO técnico base sano, pero con agujeros.** Bien: sitemap/robots/canonical/OG/Twitter/JSON-LD/404 propia. Mal: `/` con title genérico "Arquitectos digitales" (`layout.tsx:13-20`), keywords globales con relleno (`metadata.ts:30-47`), `logo.png` referenciado en Organization que **no existe** en `public/` (solo `og*.png` + 3 imágenes), OG reusada (`og_servicios_fivem.png` para scripts y ropa), `locale es_MX` sin `hreflang` real para ES/LatAm, `/blog` vacío ("No hay publicaciones aún", `blog/page.tsx:33-36`) pero indexable, `lastmod: now` en todas las URLs del sitemap (falsa frescura). **HECHO.** → Reescribir titles/descriptions por intención, logo real 112x112, OGs únicas, `lastmod` real, noindex a `/blog` vacío o primer post. **P1.**
7. **Accesibilidad y semántica frágiles.** H1 del home dentro de `Fade as='h1'` client-side (`section.hero.tsx:68-76`); `/contact` usa `h1.sr-only` + `h2` visual de 5xl (`contact/page.tsx:25-31`); decorativas con alt genérico (`alt='CIRCLES'/'VECTOR'`, `alt='TASK'` x2 en timeline) en vez de `alt="" aria-hidden`; iconos sin label; foco/contraste sin auditar (tema oscuro `#191B20` + primario `hsl(248,98%,63%)`). **HECHO.** → Jerarquía H1 única por página, decorativas silenciosas, labels y foco visible. **P1.**
8. **Confianza sin prueba verificable.** Hay proceso (Trello + changelog semanal), política escrow/CFX, compatibilidad ESX/QBCore + bridge, 10 fichas de proyecto y FAQ honesto "qué no hacemos". Faltan: antes/después con pruebas, demos navegables, alcance/entregables por servicio, backups/rollback, licencias de assets, SLA por plan, testimonios reales (no inventar). **HECHO + INFERENCIA.** → Convertir cada entrega en caso con problema→causa→cambio→pruebas→resultado + matriz de alcance. **P1.**
9. **Contenido habla de tecnología antes que de problema.** Copy sólido en `/services/fivem/*` (síntoma→solución→incluye→FAQ), pero home + `/services` listan capacidades ("transformar ideas en realidades tangibles") sin escenarios de uso (abrir / se cae / lag / quiero diferenciarme). Minecraft y digitalización sin promesa medible. **INFERENCIA.** → Reescribir por JTBD funcional/emocional/social del informe. **P1.**
10. **Riesgo operativo bajo pero real.** `DISCORD_WEBHOOK_URL!` con non-null assertion (cae feo si falta env), IP solo desde `x-forwarded-for`, lista `badWords` ingenua + mensaje de error que acusa al usuario ("contenido inapropiado"), `example.env` legible (no leer secretos), sin `security.txt`/headers documentados. **HECHO** (`contact.action.ts:40`, `contact.ts:52-68`). → Validación sin insultos, fallback si falta webhook, rate-limit real (Upstash ya instalado). **P2.**

---

## 2. Estado actual

| URL / ruta | Propósito | Segmento | Intención | CTA principal | Estado | Problemas (HECHO) | Prioridad |
|---|---|---|---|---|---|---|---|
| `/` (`(landing)/page.tsx`, `section.hero.tsx`) | Puerta de entrada genérica | Todos, nadie en concreto | Navegacional / descubrimiento | "Consulta Gratis" → `/contact` | H1 genérico + marquee 50 servicios + 4 checks vagos ("Proyectos atractivos", "Resultados Garantizado" sic) | No responde qué/para quién/resultado en 5 s; jerga (ESX/QBCore/NUI) sin glosa; prueba social ausente | P0 |
| `/services` (`services/page.tsx`, `section.categories`) | Índice de servicios | Todos | Navegacional | "Explorar servicios" | Correcto pero genérico; `h1.sr-only` "Services" en inglés | H1 invisible en inglés; sin segmentación por problema | P1 |
| `/services/fivem` (`fivem/page.tsx`, `section.hero/intro/service/prices/glosario/faqs`) | Hub FiveM | Fundador / propietario / creador | Comercial + informacional | Cards → `/contact?service=` o sub-landings; planes → `/contact?service=plan_*` | Mejor página del sitio: H1 con keyword, intro por líneas, 9 servicios, planes $199/$349/$599, glosario, 13 FAQs con JSON-LD | Sin subpáginas para crear/reparar/optimizar/NUI; planes vs FAQ desalineados (Bronce–Diamante vs Mantenimiento–Integral); glosario solo 5 términos | P1 |
| `/services/fivem/scripts` | Landing script custom | Creador / propietario | Transaccional "scripts fivem personalizados" | "Cotizar Script" → `/contact?service=fivem_scripts` | Excelente estructura: tipos, incluye (8), FAQ 9 con precio/plazo/escrow/rendimiento, internas a CodeIQ | OG reusada; keywords con 38 variantes (riesgo relleno); sin demo/caso incrustado | P1 |
| `/services/fivem/ropa` | Landing ropa/EUP | Creador visual | Transaccional "pack ropa/EUP" | "Solicitar Pack" → `?service=fivem_clothing_packs` | Gemela de scripts, muy sólida; precio 30–600 USD declarado | Misma OG que scripts; sin galería antes/después | P1 |
| `/services/web-development` | Línea web | Negocio tradicional | Comercial genérico | → `/contact` | Metadata + tabs + valores + FAQ; `priceRange 500–15000 MXN` | Sin nicho/proceso concreto; mezcla con FiveM confunde | P2 |
| `/services/ui-ux-design` | Línea diseño | Creador / negocio | Comercial genérico | → `/contact` | Igual que web; incluye "UI para FiveM" | Canibaliza con NUI de FiveM; sin casos visuales comparativos | P2 |
| `/projects` + `/projects/[slug]` (10 fichas) | Prueba | Todos | Investigación | "Saber más" / contacto | Filtro + fichas (CodeIQ Pause Menu = joya FiveM) | Sin métricas/pruebas visibles en el extracto; huérfanas sin enlaces desde servicios salvo 1 a CodeIQ | P1 |
| `/blog` + `/blog/[slug]` | Autoridad SEO | Informacional | Informacional | "Leer" | Vacío ("No hay publicaciones aún") pero indexable | Blog vacío indexado = señal de abandono; `lastmod now` lo empeora | P1 |
| `/contact` (`contact/page.tsx` + `ContactForm`) | Conversión primaria | Todos | Transaccional | Submit + Discord/email/agenda | Preselección por `?service=` funciona; email/Discord/agenda/horario visibles | 6 campos + mensaje largo + checkbox bloqueante; sin contexto (framework/logs/urgencia/presupuesto); diálogo post-envío ambiguo; sin eventos | P0 |
| `/faqs` | Objeciones | Todos | Informacional | → `/contact`, internas a FiveM | 10 generales + 7 FiveM con FAQPage JSON-LD; precios y Trello declarados | Precios/planes contradictorios con `/services/fivem`; enlaces internos solo 3 | P1 |
| `/privacy`, `/terms`, `/terms-software`, `/terms-fivem` (MDX) | Legal/confianza | Todos | Navegacional | — | Existen y enlazadas en footer + checkbox | Sin banner/consentimiento GA4; revisar base legal MX/ES/LatAm | P0 |
| `/discord` (redirect 308) | Conversión secundaria | Todos | Transaccional | Discord externo | `next.config.ts:9-17` a invite `w8fem9RDr4` | Depende de invite vigente; sin evento de clic | P2 |
| `404` (`not-found.tsx`) | Error | Todos | — | "Regresar Al Inicio" | Propia, simple | Sin buscador, sin enlaces a FiveM/contacto, sin evento `404_view` | P3 |

**Páginas ausentes (justificación):** crear **SÍ** `/services/fivem/crear-servidor` (intención "crear servidor fivem", embudo TOFU→MOFU, evita que el hub lo explique todo), `/services/fivem/reparar-optimizar` (**SÍ**, urgencia "crashea/lag", mejor/quick-win, unifica reparación+optimización para no duplicar), `/services/fivem/nui-ui` (**SÍ**, diferenciador visual con caso CodeIQ). Minecraft (**SÍ pero 1 sola** `/services/minecraft` tipo "configurar vs extender vs desarrollar", sin subpáginas hasta tener 5 casos). Digitalización (**NO** como sección; 1 bloque en web-development por proceso concreto hasta validar nicho). Proceso/cómo-trabajamos (**NO** página nueva; sección en home + FAQ, ya existe timeline). Precios separados (**NO**; integrar en cada landing).

---

## 3. Diagnóstico por área

### 3.1 Propuesta de valor y conversión
- **HECHO:** hero dice qué hacen (software/scripts/UI) pero no para quién ni qué resultado medible; checks "Soporte 24/7" contradice horario Lun–Sáb 6PM–1AM UTC; "Resultados Garantizado" (sic, singular) es promesa sin alcance.
- **INFERENCIA:** el visitante con crash/lag no ve "reparo sin romper" ni "diagnóstico en X horas" por encima del pliegue.
- **HIPÓTESIS:** titular por problema + CTA doble (Cotizar / Diagnosticar error) sube `contact_start` >20 %.
- **RECOMENDACIÓN (P0):** H1 alternativo ES: "Servidor FiveM estable, único y listo para abrir: scripts a medida, reparación y optimización para ESX y QBCore". Sub: "Cuéntanos qué falla o qué quieres lograr; te devolvemos alcance, plazo orientativo y siguiente paso en menos de 24 h. Sin jerga: explicamos todo en tus términos." CTAs: primario "Cotizar mi proyecto" (`/contact?service=fivem_*`), secundario "Tengo un error / lag" (`/services/fivem/reparar-optimizar`). Microcopy: "Respuesta en <24 h · Sin compromiso · No tocamos producción sin backup".

### 3.2 UX y contenido
- **HECHO:** nav simple (Inicio/Servicios/Proyectos/Contacto/FAQ + Discord + Área clientes + Consulta Gratis, `header.tsx:22-44`). Home larguísimo (hero → marquee 50 → valores → proyectos → tabs servicios → timeline 5 fases → contacto). Tabs de servicios sin enlaces profundos en home (sí en `/services/fivem`).
- **RECOMENDACIÓN:** mantener 3 líneas separadas con FiveM como principal; Minecraft como línea especializada; digitalización como secundaria hasta validar. Nav propuesta: FiveM (dropdown: Crear / Reparar-Optimizar / Scripts / Ropa-EUP / NUI-UI / Planes) · Minecraft · Web y automatización · Proyectos · FAQ · Contacto + CTA "Cotizar".
- JTBD → contenido: funcional (crear/reparar/optimizar/personalizar/digitalizar un proceso) + emocional (control, alivio, orgullo) + social (ser visto como serio/innovador). Cada landing cierra con "qué recibes, qué no incluye, qué necesitamos de ti".

### 3.3 SEO técnico
- **HECHO (sano):** index/follow, canonical por página, sitemap/robots 200, OG/Twitter, JSON-LD, 404 propia, `lang='es'` (`layout.tsx:32`), breadcrumb (`AppBreadcrumb` en fivem/scripts/ropa/faqs/contact).
- **HECHO (a corregir):** title home genérico; keyword stuffing global (`metadata.ts:30-47`, 38 keywords en scripts); `logo.png` inexistente en Organization (`metadata.ts:133` vs `public/` solo `og*.png`+3 imgs); OGs duplicadas; `locale es_MX` sin hreflang LatAm/ES; `lastModified: now` (`sitemap.ts:32`); `/blog` vacío indexable; H1 en cliente (`Fade as='h1'`); decorativas con alt ruidoso; `/icon.png`, `/apple-icon.png`, `logo.png` no verificados en `public/`.
- **Metadatos propuestos (listos para pegar):**
  - `/`: title "Programador FiveM y desarrollo a medida | Neenbyss" (≤60). description "Scripts FiveM a medida, reparación y optimización para ESX y QBCore, ropa/EUP y NUI. Webs y UI que convierten. Cotiza sin compromiso, respuesta en <24 h." (≤155).
  - `/services/fivem`: mantener title actual (bueno) + description actual (buena). Añadir canonical ya existente.
  - `/services/fivem/scripts`: mantener; recortar keywords a 8–10 ("scripts fivem personalizados, desarrollo scripts fivem lua, scripts esx, scripts qbcore, script economía/inventario/trabajos fivem").
  - `/services/fivem/ropa`: mantener; keywords a 8–10 ("pack ropa fivem, eup fivem policía ems, ropa stream ready fivem").
  - `/contact`: title "Cotiza tu proyecto FiveM o web | Neenbyss". description "Cuéntanos tu objetivo, framework y urgencia. Te devolvemos alcance y plazo orientativo en <24 h. Email, Discord o agenda."
  - Nuevas: `/crear-servidor` title "Crear servidor FiveM desde cero (ESX/QBCore) | Neenbyss"; `/reparar-optimizar` title "Reparar y optimizar servidor FiveM (crash/lag) | Neenbyss"; `/nui-ui` title "Diseño NUI/HUD para FiveM (pause menu, HUD, inventario) | Neenbyss".

### 3.4 SEO de contenidos (mapa por intención)
| Intención | Situación | Consulta posible | Página que responde | Embudo | Validación pendiente |
|---|---|---|---|---|---|
| Crear | Quiere abrir RP, no sabe coste/plazo | crear servidor fivem desde cero / cuánto cuesta | NUEVA `/crear-servidor` (+ hub) | TOFU→MOFU | GSC: impresiones/clics 90 d |
| Urgencia error | Crash / recurso rojo / no arranca | servidor fivem crashea / error script fivem | NUEVA `/reparar-optimizar` §error | MOFU→BOFU | Formularios con "error" + logs adjuntos |
| Rendimiento | Lag con más jugadores | optimizar servidor fivem lag / ticks altos | NUEVA `/reparar-optimizar` §rendimiento | MOFU | Auditorías vendidas vs rebotes |
| Custom | Mecánica única por job/economía | script fivem personalizado / mdt fivem | EXISTE `/scripts` | BOFU | `contact?service=fivem_scripts` |
| Visual | Plantilla genérica, quiere marca | ropa eup fivem / pause menu hud fivem | EXISTE `/ropa` + NUEVA `/nui-ui` | MOFU→BOFU | Galería antes/después + demos |
| Framework | Duda ESX/QBCore/Qbox | migrar esx a qbcore / qbox fivem | Hub `/fivem` §migración (sin página Qbox dedicada) | MOFU | Preguntas en llamada |
| Minecraft | Función que no existe / versión | plugin minecraft a medida / compatibilidad paper-spigot | NUEVA `/services/minecraft` única | MOFU | 5 briefs reales |
| Digitalizar | Proceso manual concreto | automatizar reservas/facturación + next.js | `/web-development` §proceso (sin sección propia) | MOFU | 1 caso medible |

No crear una URL por variación: agrupar sinónimos en la misma landing con H2 por caso.

### 3.5 Rendimiento (inferencia, sin Lighthouse)
- **HECHO:** `motion` + `Fade` en casi todo, `Marquee` x2 con ~50 nodos, imágenes `img` sin `next/image` en heroes/proyectos/SVGs decorativos a `-right-50`, `afterInteractive` GA4, `dynamic='error'` en scripts/ropa/projects (estático, bien).
- **HIPÓTESIS:** LCP afectado por hero animado + marquee + PNGs de proyectos (`img_cover*.png`) sin `priority`/`sizes`.
- **RECOMENDACIÓN (P2):** migrar a `next/image` con `priority` en hero/proyecto principal, `loading=lazy` resto, AVIF/WebP, `sizes`, preconnect GTM, diferir marquee bajo pliegue, auditar con `next build + Lighthouse CI` (ver §10).

### 3.6 Accesibilidad (básica)
- **HECHO:** ver §3.3 + iconos en botones (`header.tsx:133-146`, `Socials`) sin `aria-label` visible; acordeones Radix (bien) pero triggers con `text-center` en móvil que dificultan lectura; contraste primario-sobre-oscuro sin test.
- **RECOMENDACIÓN (P1):** `alt="" aria-hidden="true"` en `CIRCLES/VECTOR/TASK/circles_footer`; alt descriptivos en proyectos (`alt={title}` ya existe, ampliar); `aria-label` en Discord/sociales/clientes; H1 único textual por página; foco `:focus-visible` con outline primario; test teclado completo del formulario y tabs.

### 3.7 Confianza y reputación
- **HECHO (existe):** Trello + changelog viernes (`section.faqs.tsx:101-104`), validación server-side/anti-cheat, no-escrow/no-CFX-violation (`scripts/page.tsx:94-98,108-114`), bridge ESX/QBCore, precios y plazos declarados, 10 proyectos, términos FiveM/software.
- **HECHO (falta):** cero antes/después, cero demos/vídeos, cero testimonios (bien no inventar), alcance vago ("soluciones personalizadas"), backups/rollback sin declarar, licencias de assets sin política pública, SLA por plan inconsistente (Bronce–Diamante fantasma), propiedad del código solo en scripts ("escrow por defecto, fuente con costo adicional", `scripts/page.tsx:80-83`) sin equivalente web/MLO/ropa.
- **RECOMENDACIÓN (ética, P1):** plantilla de caso (contexto → síntoma → causa → cambio → pruebas → resultado comprensible → qué no incluía); pedir a 3 últimos clientes: logo/testimonio de 2 líneas + permiso de captura; publicar matriz incluido/no incluido por servicio; política "backup + staging antes de producción + rollback"; página/§ licencias (sin marcas reales, procedencia, entrega).

### 3.8 Analítica y medición
- **HECHO:** GA4 pageview sin eventos ni consentimiento; `use-analytics` muerto; formulario sin `trackEvent`; footer-email-capture (`footer.tsx:161-176` push a `/contact?email=`) sin evento; 404 sin evento.
- **Esquema mínimo (nombres exactos):**
  - `contact_submit` (primaria): params `service_uid, service_category, has_phone, message_len, preselected(bool), page_location`. Conversión primaria en GA4.
  - `contact_start` (foco en primer campo), `service_preselect` (`service_uid` desde URL), `click_discord` (`location: header|contact|footer|post_submit`), `click_email`, `click_agenda` (`location`), `footer_email_capture`, `404_view` (`path`), `plan_click` (`plan_uid`), `faq_expand` (`question_id`, no conversión).
  - Secundarias: `click_discord`, `click_agenda`, `click_email`, `plan_click`.
- **RECOMENDACIÓN (P0):** cablear 6 eventos + marcar 1 conversión primaria + privacy con base legal + (opcional) CMP barato solo si se añade Ads/remarketing. Sin esto, fases 1–4 no son medibles.

---

## 4. Comparativa de segmentos

| Segmento | Situación de búsqueda | Detonante | Funcional | Emocional | Social | Mensaje | CTA |
|---|---|---|---|---|---|---|---|
| Fundador FiveM desde cero | Idea RP sin arquitectura ni presupuesto | Fecha de apertura / equipo reunido | Elegir base, desplegar, configurar, dejar testeable | Guiado, seguro | Serio y profesional | "De la idea al servidor jugable: alcance, fases y presupuesto orientativo antes de la llamada" | Cotizar armado (`/crear-servidor`) |
| Propietario con errores/lag | Crash, recurso rojo, lag con jugadores | Beta/evento/captación próxima | Diagnosticar, reparar sin romper, optimizar SQL/callbacks | Alivio, control | Fiable ante su comunidad | "Diagnóstico con pruebas en staging y plan de reparación sin improvisar en producción" | Diagnosticar (`/reparar-optimizar`) |
| Creador diferenciador | Servidor = plantilla genérica | Rebrand / streamers / temporada | Job/economía/UI/reskin únicos | Orgullo propio | Innovador y cuidado | "Tu idea de rol → especificación → script/UI probada y documentada" | Cotizar script/NUI (`/scripts`, `/nui-ui`, `/ropa`) |
| Admin Minecraft | Función/integración/versión sin resolver | Temporada / cambio versión | Decidir configurar vs extender vs crear + compatibilidad | No desperdiciar | Técnico y estable | "Primero decidimos si existe, se extiende o se programa; luego lo mantenemos" | Pedir diagnóstico (`/services/minecraft`) |
| Negocio tradicional | Proceso manual sin seguimiento | Pico de consultas / planificación | Web/formulario/automatización de 1 cuello de botella | Moderno sin perder control | Profesional y eficiente | "Un proceso concreto mejorado y medido, sin sobrecomplicar" | Agendar llamada (web-development §proceso) |

Fuente de JTBD: `fivem_audience_analysis_es.md` §2–§4.

---

## 5. Arquitectura recomendada

**Actual (HECHO):** `/` · `/services` · `/services/fivem` · `/services/fivem/scripts` · `/services/fivem/ropa` · `/services/web-development` · `/services/ui-ux-design` · `/projects` (+10) · `/blog` (vacío) · `/contact` · `/faqs` · 4 legales · `/discord` (redirect).

**Propuesta (justificada):**
```
/ (hero segmentado FiveM-first + prueba + proceso resumido)
/services (índice por problema, no por tecnología)
/services/fivem (hub: crear / reparar-optimizar / scripts / ropa / nui-ui / migración / planes)
  /crear-servidor (NUEVA: de idea a base jugable, fases, requisitos, rango)
  /reparar-optimizar (NUEVA: crash+lag, diagnóstico, staging, antes/después)
  /scripts (existe: reforzar demo CodeIQ + caso)
/services/fivem/ropa (existe: añadir galería)
/services/fivem/nui-ui (NUEVA: HUD/pause/phone/inventario, comparativa visual)
/services/minecraft (NUEVA única: configurar vs extender vs desarrollar)
/services/web-development (recortar a 1 proceso concreto + caso)
/services/ui-ux-design (mantener, enlazar NUI como especialización)
/projects (+10, cada ficha con alcance/pruebas/resultado)
/blog (noindex hasta 3 posts útiles: configurar-vs-programar, checklist contratación segura, antes/después optimización)
/faqs (dividir Generales/FiveM/Minecraft/Web con JSON-LD por grupo)
/contact (brief guiado por servicio)
/discord, /agenda, /email (con eventos)
```
**Por qué:** cada URL nueva responde a una intención con volumen y urgencia distintos (crear vs arreglar vs diferenciar); Minecraft/digitalización no se mezclan con FiveM para no diluir; nada de páginas por sinónimo (scripts = 1 URL que absorbe economía/inventario/jobs).

---

## 6. Brief de cada página prioritaria

### 6.1 `/services/fivem/reparar-optimizar` (P0, nueva, mayor urgencia comercial)
- Objetivo: convertir crash/lag en diagnóstico pagado o plan. Audiencia: propietario operativo. Intención: "arreglar sin romper + cuánto tarda".
- Promesa: "Devolvemos tu servidor a estable con causa documentada y pruebas, sin tocar producción sin backup".
- H1: "Reparación y optimización de servidores FiveM: crash, errores y lag". H2: Síntomas que atendemos / Cómo diagnosticamos (staging→causa→fix→regresión→rollback) / Qué optimizamos (ticks, callbacks, SQL, streaming) / Qué no tocamos (escrow/CFX) / Planes y tiempos / FAQ. H3 por síntoma (no arranca, recurso rojo, lag con X jugadores, inventario/HUD roto).
- Dolores: miedo a romper, precio incierto, downtime. Pruebas: 2 casos antes/después + checklist de pruebas. CTA primario "Pedir diagnóstico" (`?service=fivem_support` + campo síntoma), secundario Discord urgente. FAQ: 6 (¿tocan producción? ¿necesitan accesos? ¿cuánto tarda? ¿qué si es escrow? ¿garantía? ¿horario?). Internas: recibe de home/hub/FAQ/blog; envía a planes/contacto/proyectos.
- Falta del propietario: 2 logs reales anonimizados + 1 caso con métrica comprensible (ej. "de X a Y en pantalla de lag", sin inventar: usar staging medido).

### 6.2 `/` home (P0, reescribir hero + prueba)
- Objetivo: que en 5 s se entienda para quién y qué hacer. Audiencia: fundador/propietario FiveM 70 %, resto 30 %.
- H1 (propuesto): "Servidor FiveM estable y único, listo para abrir". Sub (propuesto): "Scripts a medida, reparación y optimización para ESX y QBCore + ropa/EUP y NUI. Te decimos alcance y plazo orientativo en <24 h, en lenguaje claro." CTAs: "Cotizar proyecto" / "Tengo un error o lag".
- Estructura: hero (H1+sub+2 CTA+microcopy) → síntomas (3 cards: crear / se cae / quiero diferenciarme) → prueba (CodeIQ + 2 mini-casos) → planes resumidos → proceso 4 pasos → FAQ 5 → contacto. Recortar marquee a 12 items o mover bajo pliegue.
- Falta: 1 captura CodeIQ con permiso + 2 testimonios de 1 línea (reales, verificables).

### 6.3 `/contact` (P0, brief guiado)
- Objetivo: subir `contact_submit` sin perder calidad. H1: "Cotiza tu proyecto: te respondemos con alcance y siguiente paso". H2: elige tu caso (nuevo/error-lag/script/UI/Minecraft/web) → campos dinámicos: framework (ESX/QBCore/Qbox/otro), estado (qué falla desde cuándo), recursos/hosting, escala (slots/jugadores), plazo (beta/apertura), rango presupuesto, evidencias (logs/captura/vídeo/enlace). Mantener email+nombre+servicio; teléfono/compañía opcionales; mensaje mínimo a 20 caracteres con placeholder guiado; checkbox con resumen, no bloqueo mudo (botón siempre clicable, error inline si falta).
- CTA primario "Enviar solicitud", secundario "Agendar llamada (Google Calendar)" + "Discord para urgencias". Internas: recibe `?service=` de todas; envía a Discord/agenda tras éxito con resumen del siguiente paso (no diálogo ambiguo).

### 6.4 `/services/fivem/crear-servidor` (P1, nueva)
- H1: "Crear servidor FiveM desde cero: base limpia, documentada y lista para crecer". H2: qué incluye (framework, DB, permisos, economía base, jobs/vehículos/UI esencial, pruebas) / qué NO incluye (hosting, scripts de pago, assets con licencia) / fases y plazos / requisitos que pedimos / FAQ (coste, plazo, demo, hosting, soporte). CTA "Cotizar armado". Falta: rango orientativo aprobado + checklist de requisitos.

### 6.5 `/services/fivem/scripts` (P1, reforzar, ya existe)
- Mantener estructura; añadir: demo CodeIQ incrustada, tabla "configurar vs extender vs desarrollar", matriz de entrega (escrow vs fuente), 1 caso con pruebas. Recortar keywords a 10. OG propia (no reusar fivem.png).

### 6.6 `/services/minecraft` (P1, nueva única)
- H1: "Plugins y mods Minecraft a medida: solo programamos lo que merece ser custom". H2: diagnóstico (existente/extensión/custom) / compatibilidad (Paper/Spigot/Fabric + versiones) / mantenimiento ante cambios de versión / FAQ. CTA "Pedir diagnóstico". Falta: 1 caso o decisión documentada real.

---

## 7. Backlog priorizado

| ID | Cambio | Área | Impacto | Esfuerzo | Riesgo | Dependencias | Prioridad |
|---|---|---|---|---|---|---|---|
| B-01 | Unificar planes y precios (una tabla $199/$349/$599+Personalizado, borrar Bronce–Diamante y "desde 40.50", matriz incluido/no incluido) | Confianza/contenido | Alto (credibilidad) | S | Bajo | Aprobación propietario | P0 |
| B-02 | Brief guiado en `/contact` por caso + consentimiento no bloqueante + confirmación con siguiente paso | Conversión | Alto (submit útil) | M | Medio (lógica form) | B-01, textos aprobados | P0 |
| B-03 | Cablear GA4: `contact_submit/start`, `service_preselect`, `click_discord/email/agenda`, `plan_click`, `404_view` + 1 conversión primaria | Analítica | Alto (medir todo) | S | Bajo | Privacidad actualizada | P0 |
| B-04 | Reescribir hero home (H1/sub/doble CTA/microcopy) + recortar marquee | Conversión/UX | Alto | S | Medio (mensaje) | Aprobación copy | P0 |
| B-05 | Titles/descriptions únicos por intención + recorte keywords + OG únicas + `logo.png` real + `lastmod` real + noindex `/blog` vacío | SEO técnico | Alto orgánico | S | Bajo | Diseño OG | P1 |
| B-06 | Nueva `/reparar-optimizar` (crash+lag, staging, FAQ, JSON-LD) | Contenido/SEO | Alto (urgencia) | M | Medio | 1 caso real, B-01 | P1 |
| B-07 | Nueva `/crear-servidor` (fases, no-incluye, requisitos) | Contenido/SEO | Alto | M | Medio | Rango aprobado | P1 |
| B-08 | Nueva `/nui-ui` + galería ropa/EUP antes-después | Contenido/confianza | Medio-alto | M | Medio | Permisos imágenes | P1 |
| B-09 | Nueva `/services/minecraft` única | Contenido | Medio | S | Bajo | 1 caso/brief | P1 |
| B-10 | Accesibilidad: H1 únicos, `alt=""` decorativas, labels, foco visible, teclado | A11y/SEO | Medio | S | Bajo | — | P1 |
| B-11 | Casos con pruebas (plantilla problema→pruebas→resultado) + licencias/backups/SLA públicos | Confianza | Medio-alto | M | Bajo | Clientes reales | P1 |
| B-12 | Rendimiento: `next/image`, AVIF/WebP, `priority` hero, diferir marquee, preconnect | Rendimiento | Medio | M | Bajo | Lighthouse CI | P2 |
| B-13 | Endurecer contacto: fallback sin webhook, rate-limit Upstash, mensajes sin insultos, IP `x-real-ip` | Seguridad/UX | Medio | S | Bajo | Env config | P2 |
| B-14 | 404 útil (buscador + links FiveM/contacto + evento) + internas hub↔fichas↔FAQ | UX/SEO | Bajo-medio | S | Bajo | B-03 | P3 |
| B-15 | Blog: 3 posts útiles o mantener noindex; hreflang ES/MX/LatAm si hay contenido localizado | Contenido/i18n | Bajo (ahora) | M | Bajo | Redacción real | P3 |

P0 = bloquea conversión/rastreo/credibilidad. P1 = alto impacto comercial/SEO. P2 = importante no urgente. P3 = optimización posterior.

---

## 8. Plan de ejecución por fases

- **Fase 0 (medición, backup, objetivos — 3–5 d):** rama `audit/fase-0`; fijar objetivo (ej. +30 % `contact_submit` cualificado en 60 d); cablear B-03 en staging; snapshot `git tag pre-audit`; inventariar accesos (GA4/GSC/Calendar/Discord); aprobar rangos y SLA reales. Salida: baseline medible.
- **Fase 1 (críticas + conversión — 1–2 sem):** B-01, B-02, B-04, privacidad/consentimiento. Verificar con checklist §10. Salida: formulario que convierte y se mide.
- **Fase 2 (arquitectura + páginas — 2–4 sem):** B-06, B-07, B-08, B-09 + internas. Una URL por intención, JSON-LD, OGs únicas. Salida: hub FiveM completo sin canibalización.
- **Fase 3 (SEO técnico + contenidos — 2 sem):** B-05, B-10, B-12, 3 posts o noindex blog, `lastmod` real. Salida: CWV verde + titles por intención.
- **Fase 4 (autoridad + experimentos — continuo):** B-11, B-14, B-15 + A/B hero/formulario, registro post-llamada (detonante, objeción, alternativa, presupuesto, motivo pérdida) del informe §12. Salida: casos y aprendizaje propio.

---

## 9. Cambios implementables ahora

**Seguros y reversibles (puedo ejecutar sin aprobación comercial):**
- B-05 técnico parcial: `logo.png`/`icon.png`/`apple-icon.png` reales o quitar referencia; OGs por página ya existentes en `public/`; `lastmod` real por git; `noindex` a `/blog` vacío; `alt="" aria-hidden` en decorativas; H1 únicos; `aria-label` en sociales/Discord.
- B-03 analítica (solo código, sin cambiar copy): 6 eventos + `404_view`, sin activar remarketing.
- B-13 endurecimiento contacto + B-14 404 útil + B-12 `next/image` (sin cambiar diseño).

**Requieren aprobación del propietario (no ejecutar sin OK):**
- Cualquier precio, plan, nivel, SLA, horario, garantía, testimonio, caso, logo de cliente, afirmación ("24/7", "garantizado"), rango de plazos, política escrow/fuente, licencias. En concreto B-01, B-04, textos de B-02/B-06/B-07/B-08/B-09 y cualquier OG con cifras.

**Información faltante antes de escribir/publicar:**
1. Rangos aprobados por línea (armado, script S/M/L, ropa/EUP, NUI, optimización) + qué incluye/no incluye cada uno.
2. SLA real por plan (horas, respuesta, canales, urgencias) + horario y zona.
3. 2–3 casos publicables (problema, stack, cambio, pruebas, resultado, permiso escrito).
4. Política de backups/staging/rollback + accesos mínimos + licencias de assets.
5. Estado del invite Discord + calendario (¿siguen vigentes?) + email de soporte real.
6. Accesos GA4/GSC para baseline + decisión de CMP/privacidad (MX/ES/LatAm).
7. Nicho de digitalización a validar (1 proceso concreto con presupuesto real) y si Minecraft tiene 1 caso para sostener la página.

---

## 10. Checklist de verificación

**Comandos (desde `D:\CODE\neenbyss\web`):**
```powershell
yarn install; yarn lint; yarn build; yarn start -p 3500
# SEO/archivos
Invoke-WebRequest https://neenbyss.com/robots.txt | Select-Object StatusCode
Invoke-WebRequest https://neenbyss.com/sitemap.xml | Select-Object StatusCode
# En build local: http://localhost:3500/sitemap.xml , /robots.txt
# Consola: 0 errores en / , /services/fivem , /services/fivem/scripts , /contact , /faqs
```

**Pruebas manuales (criterios):**
- [ ] 5 URLs vivas muestran H1 único + CTA primario sobre pliegue + canonical/OG correctos (View Source: 1 `<h1>`, `og:title/description/image`, `canonical`).
- [ ] `/contact?service=fivem_scripts` preselecciona "Desarrollo de Scripts"; submit válido dispara `contact_submit` con `service_uid`; inválido muestra error inline sin bloquear mudo; éxito muestra siguiente paso (no diálogo ambiguo).
- [ ] `/discord` 308 al invite vigente; clics Discord/email/agenda disparan eventos con `location`.
- [ ] 404 muestra buscador + links FiveM/contacto y dispara `404_view`.
- [ ] Responsive 390px: hero, planes, formulario sin scroll-X; tabs y acordeón operables por teclado; foco visible; decorativas ignoradas por lector (`alt=""`).
- [ ] JSON-LD válido (Rich Results Test) en home (Organization), fivem/scripts/ropa (Service+FAQ), faqs (FAQPage).
- [ ] OG/Twitter con imagen 1200x630 única por línea; `logo.png` 112x112 existe si se referencia.
- [ ] No hay "Bronce–Diamante" ni "desde 40.50" en ningún copy; planes = Mantenimiento/Desarrollo/Integral/Personalizado con precios $199/$349/$599.
- [ ] `git status` solo muestra archivos aprobados; rollback con `git revert` o tag `pre-audit`.

**Criterio final (urgencia):** un visitante con crash, lag, lanzamiento o idea custom encuentra en <2 clics una página de su caso, entiende sin jerga qué recibe y qué no, ve 1 prueba real, sabe plazo orientativo y completa el brief en <90 s.

*Fin del informe. Siguiente paso propuesto: aprobar B-01 (precios/SLA reales) + textos hero/contacto, luego ejecuto Fase 0/1 en rama separada.*
