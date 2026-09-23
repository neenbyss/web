# Baseline Fase 0 — neenbyss.com (Fases 0–1)

**Fecha:** 21-sep-2026 · **Rama:** `feat/audit-fase-0-1` · **Checkpoint/tag:** `pre-neenbyss-fase-0-1` · **Commit base:** `1e81e24` ("feat: added discord invitation after sen message")
**Directorio:** `D:\CODE\neenbyss\web` · **Package manager:** yarn 1.22.22 (lockfile `yarn.lock`) · **Node:** v26.2.0

## Stack verificado (no asumido)
Next.js 15.3.8 · React 19 · MDX (`@next/mdx`, `pageExtensions` js/jsx/md/mdx/ts/tsx) · Tailwind v4 (`@tailwindcss/postcss`) · Radix UI · `next-view-transitions` 0.3.4 · `motion` 11.15.0 · RHF 7.54.2 + `@hookform/resolvers` + zod 3.24.2 · nodemailer 6.10.1 · `@upstash/redis` + `ioredis` · `next-mdx-remote`. Fuente: `package.json`.

## Comandos baseline
| Comando | Resultado |
|---|---|
| `yarn install --frozen-lockfile` | OK en 127 s (warnings de peer deps React 18 vs 19 en `next-view-transitions`, `react-remove-scroll`; `tailwindcss-animate` pide tailwind >=3; no bloquean) |
| `yarn lint` (`next lint`) | **PASS — 0 warnings/errors** (36 s). Nota: falla sin `node_modules`; requiere install previo |
| `yarn build` | **PASS** — compilado 51 s + 34 páginas estáticas (ver rutas). Sin errores de tipos |

## Rutas reales del build (34) — OJO: difieren del prompt en 2 casos
`/` · `/blog` · `/blog/[slug]` x3 (`contratar-programador-fivem-costos-tiempos`, `porque-tu-servidor-de-fivem-va-lento-errores-programacion`, `scripts-esenciales-servidor-fivem-lista-completa`) · `/contact` · `/faqs` · `/privacy` · `/projects` + 10 slugs · `/robots.txt` · `/services` · `/services/fivem` · `/services/fivem/ropa` · `/services/fivem/scripts` · **`/services/ui_ux_design`** (prompt decía `ui-ux-design` — no existe) · **`/services/web_development`** (prompt decía `web-development` — no existe) · `/sitemap.xml` · `/terms*` x3 · `/_not-found`.
**Hallazgo P0:** `src/app/sitemap.ts` declara `/services/web-development/` y `/services/ui-ux-design/` (404 reales) y omite `/faqs`, `/blog` y posts. `lastModified: new Date()` = frescura falsa en todas.

## Metadata observada
- `/`: title default "Neenbyss - Arquitectos digitales" (genérico), description genérica. Template `%s | Neenbyss - Arquitectos digitales`.
- `/services/fivem`: title/description con keyword, canonical propio, Service JSON-LD (planes correctos Mantenimiento $199/Desarrollo $349/Integral $599/Personalizado). OK base.
- `/scripts`: title largo, 38 keywords (relleno), OG `og_servicios_fivem.png`. `/ropa`: misma OG (duplicada), 29 keywords.
- `/contact`: **sin canonical** (cae a `https://neenbyss.com/`). `/projects`, `/blog`: sin canonical. Resto con canonical propio.
- Organization JSON-LD referencia `logo.png` inexistente en `public/` (solo `og*.png` + `images/` con 3 archivos + `projects/`).
- Contradicciones comerciales (B-01): `section.hero.tsx` ("Soporte 24/7", "Resultados Garantizado"), `faqs/page.tsx` (Bronce/Plata/Oro/Platino/Diamante + "desde 40.50 USD/mes"), `contact/page.tsx` ("24-48 horas"), `fivem/section.faqs.tsx` ("Oro/Platino/Diamante…Bronce"). SLA explícito 24-48 h del plan Mantenimiento (`section.prices.tsx:148`) se conserva por ser SLA del plan.

## Formulario (`/contact`)
6 campos (nombres*, email*, teléfono, compañía, servicio* agrupado, mensaje* mín. 10 caracteres/>5 palabras), checkbox fuera de zod que deshabilita el botón en silencio, preselección `?service=` OK, cooldown 60 s/IP, embed a `DISCORD_WEBHOOK_URL` con `!` (revienta si falta env), IP solo de `x-forwarded-for`, mensaje acusatorio "contenido inapropiado", éxito abre `DiscordInviteDialog` ambiguo. Env vars necesarias (nombres, sin valores): `DISCORD_WEBHOOK_URL`, `Email/EMAIL?`, `MAIL_PASSWORD`, `REDIS_URL`, `REDIS_PASSWORD`.

## GA4
ID `G-PNEFE3E0PD` solo pageview (`afterInteractive`). Hook `use-analytics.tsx` (`trackEvent`/`trackPageView`) con **0 llamadas** en el código. Sin eventos, sin consentimiento/CMP, sin conversión marcada. Tráfico/CWV/GSC: **no disponible**.

## Limitaciones
Sin acceso a GA4/GSC/ventas/Discord; sin Lighthouse (solo inferencia); móvil por clases responsive; foros/competidores solo patrones.

## Archivos a modificar (previsto)
`section.hero.tsx`, `section.products.tsx`, `section.situations.tsx` (nuevo), `(landing)/page.tsx`, `section.services.tsx` (landing), `faqs/page.tsx`, `fivem/section.faqs.tsx`, `contact/page.tsx`, `components/form/contact.tsx`, `utils/schemas/contact.ts`, `components/form/contact.action.ts`, `app/layout.tsx`, `lib/metadata.ts`, `app/sitemap.ts`, `scripts/page.tsx`, `ropa/page.tsx`, `blog/page.tsx`, `projects/page.tsx`, `services/page.tsx` (h1), `globals.css`, `not-found.tsx`, `hooks/use-analytics.tsx` (+ `components/analytics-tracker.tsx` nuevo), `header/footer/landing-contact` (data-event), `fivem/section.prices.tsx` (plan_click), acordeones FAQ (faq_expand).
**NO tocar (Fase 2):** nuevas landings crear/reparar/nui/minecraft. **NO tocar:** legales, precios aprobados, secretos, providers externos.
