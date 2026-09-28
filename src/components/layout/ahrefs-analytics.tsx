interface AhrefsAnalyticsProps {
  analyticsKey: string;
}

// Ahrefs Web Analytics (cookieless). Se renderiza como <script async> para que
// React lo hoistee al <head> del HTML servido: así el tag real está presente en
// la respuesta inicial (requisito de la verificación de Ahrefs) y no bloquea.
export function AhrefsAnalytics({ analyticsKey }: AhrefsAnalyticsProps) {
  // Sin data-key (env var vacía/no definida) → no renderiza nada para que el
  // tracker no cargue (p. ej. desarrollo local sin medición).
  if (!analyticsKey) {
    return null;
  }
  return <script src='https://analytics.ahrefs.com/analytics.js' data-key={analyticsKey} async />;
}
