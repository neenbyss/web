# Analytics — Checklist manual (GA4 DebugView)

> Estos eventos **no pueden validarse en local sin acceso a GA4 ni navegador con
> DebugView**. Pasos para cuando el propietario abra DebugView en preview/producción.
> No se marcó ninguna conversión en GA4 desde código: `contact_submit` debe
> marcarse manualmente como conversión en la consola de GA4 si aún no lo está.

Medición actual: solo GA4 (`G-PNEFE3E0PD`, `afterInteractive`), sin Ads,
remarketing, Pixel ni Clarity. `page_location` se envía **sin query string**
(ver `google-analytics.tsx`).

## 1. `contact_start`

1. Abrir `/contact`, enfocar cualquier campo del formulario.
2. Debe verse **un solo** `contact_start` con `page_location: /contact` y
   `service_uid` (vacío o UID preseleccionado).
3. Repetir focos: **no** debe dispararse de nuevo.

## 2. `service_preselect`

1. Abrir `/contact?service=fivem_scripts` (probar también `fivem_support`,
   `fivem_nui_ui`, `fivem_configuration_plan_personalizado`).
2. Debe verse **un solo** `service_preselect` con ese `service_uid` y el campo
   "Servicio de interés" mostrando la etiqueta legible.
3. Recargar sin query: **no** debe dispararse.

## 3. `contact_submit`

1. Enviar el formulario con datos de prueba.
2. Debe verse **un solo** `contact_submit` **solo tras éxito**, con:
   `service_uid`, `service_category`, `has_phone` (boolean), `message_len`
   (número), `preselected` (boolean), `page_location` (pathname, sin query).
3. Con envío fallido (p. ej. rate limit): **no** debe dispararse.

## 4. CTA de Discord (`click_discord`)

1. Clic en Discord desde header, home, contact y diálogo post-envío.
2. Cada clic = **un** evento con `location` (`header`, `home_contact`,
   `contact`, `post_submit`).

## 5. CTA de agenda (`click_agenda`)

1. Clic en "Agenda/Agendar" desde contact y diálogo post-envío.
2. Verificar `location` (`contact`, `post_submit`).

## 6. CTA de email (`click_email`)

1. Clic en tarjeta de email desde home y contact.
2. Verificar `location` (`home_contact`, `contact`).

## 7. `faq_expand`

1. Abrir una pregunta en `/faqs` o landings con acordeón.
2. Debe verse `faq_expand` con `question_id` (= value del item) y `location`.
3. Cerrar y reabrir cuenta como interacciones separadas (esperado).

## 8. `404_view`

1. Abrir una ruta inexistente (p. ej. `/no-existe-xyz`).
2. Debe verse **un solo** `404_view` con `path` = pathname (sin query).

## Datos que NUNCA deben aparecer en ningún evento

Nombres, emails, teléfonos, mensajes, IP, logs, contenido del formulario,
URLs con query strings (`?service=`, `?email=`), datos de proyecto,
presupuesto, enlaces de evidencia. Si alguno aparece: es un bug P1.

## Duplicación

- Un solo `gtag('config')` automático por page view (más `page_view` por
  defecto de GA4): no llamar a `trackPageView` salvo integración futura.
- Delegación global (`AnalyticsTracker`) solo acepta `click_discord`,
  `click_email`, `click_agenda`, `plan_click`; el resto se emite desde su
  componente dedicado para evitar dobles disparos por re-render.
