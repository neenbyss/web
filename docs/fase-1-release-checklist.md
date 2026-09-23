# Fase 1 — Release checklist

**Rama:** `feat/audit-fase-0-1` · **Commit de cierre:** `5bca1f1` (`feat: complete Neenbyss audit phases 0 and 1`)
**Base:** `1e81e24` · **Checkpoint previo:** tag `pre-neenbyss-fase-0-1` · **Tag de cierre:** `fase-1-cierre`
**Estado:** validación técnica completa. Sin push, deploy ni publicación realizados.

> **La Fase 2 no debe iniciarse hasta completar la revisión visual y la prueba del webhook.**

## Verificado en este cierre

- `yarn lint`: PASS, 0 warnings/errors.
- `yarn build`: PASS, 34 rutas estáticas, sin errores de TypeScript ni warnings de metadata/rutas/imágenes.
- Sin cambios fuera del alcance Fase 0-1: no se tocaron precios, textos comerciales, legales, variables de entorno, webhooks ni configuración de producción (`next.config.ts` intacto, sin secretos en el repo).

## Rutas verificadas (200 en local; 404 solo la inexistente de prueba)

`/` · `/services` · `/services/fivem` · `/services/fivem/scripts` · `/services/fivem/ropa` ·
`/services/web_development` · `/services/ui_ux_design` · `/projects` (+10 fichas) · `/contact` ·
`/faqs` · `/blog` (+3 posts) · `/robots.txt` · `/sitemap.xml`.

Nota: `/services/web-development` y `/services/ui-ux-design` (con guion) **no existen**; las reales usan guion bajo. El sitemap y los enlaces internos ya usan las reales.

## SEO verificado

- H1 único y visible en las 11 páginas principales.
- Titles únicos sin duplicación de sufijo; descriptions únicas; canonicals autorreferentes reales.
- OG por línea (`og.png`, `og_servicios*.png`, `og_proyectos.png`); ropa usa `og_servicios.png` genérica (TODO: OG específica, propietario).
- JSON-LD: Organization, Service (+ planes), FAQPage donde corresponde. Sin Review/AggregateRating.
- Sitemap: 15 estáticas + 10 proyectos + 3 posts, sin `lastmod` falso, sin URLs 404/privadas.
- Cero referencias a Bronce/Plata/Oro/Diamante/$40.50/24-7/"garantizado".

## Planes y precios vigentes (únicos)

| Plan          | Precio    |
| ------------- | --------- |
| Mantenimiento | $199/mes  |
| Desarrollo    | $349/mes  |
| Integral      | $599/mes  |
| Personalizado | A cotizar |

Promesa general: "Respuesta inicial en menos de 24 horas". Soporte "según el plan contratado".

## Eventos GA4 implementados (ID `G-PNEFE3E0PD`, sin remarketing)

`contact_start` · `contact_submit` (primaria, solo en éxito) · `service_preselect` ·
`click_discord` · `click_email` · `click_agenda` · `plan_click` · `faq_expand` · `404_view`.
Sin PII en eventos; `page_location` del pageview limitado a `origin+pathname`.

## Pendiente externo (bloquea o condiciona producción)

- [x] **Prueba de formulario en staging** (bloqueante o con bloqueo explícito).
- [x] **Revisión responsive/teclado manual** 390/768/1280 (recomendado).
- [x] **DebugView + marcado de conversiones** en GA4 (externo; separable).
- [x] **CMP/legal** (decisión del propietario).

## Instrucciones exactas para validar staging

1. Desplegar la rama `feat/audit-fase-0-1` en un entorno staging/preview con:
   `DISCORD_WEBHOOK_URL=<webhook de un canal privado de pruebas>`.
   Nunca usar el webhook productivo. Nunca mostrar su valor en terminal, logs o informe.
2. Abrir `/contact?service=fivem_support` con datos **ficticios**:
   nombre `Test E2E`, email `test+e2e@neenbyss.com`, mensaje `[STAGING] Prueba controlada…`.
3. Confirmar: validación inline, embed completo en el canal privado, IP solo dentro del canal,
   diálogo "Recibimos tu solicitud" con botones Discord/agenda/email, sin stack traces ni secretos.
4. Reenviar de inmediato: debe rechazar por cooldown 60 s con mensaje neutral.
5. Retirar `DISCORD_WEBHOOK_URL`, reenviar: mensaje accionable, sin tecnicismos ni nombre de variable.
6. Limpieza: borrar mensajes de prueba, rotar el webhook temporal, no guardar nada en el repo.
7. Sin webhook de pruebas disponible: **no sustituir por uno real**; dejar la prueba como pendiente bloqueante.
