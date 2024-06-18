export function formatDate(date: Date) {
    const options: any = {
      weekday: 'long',    // Nombre completo del día de la semana (e.g., lunes)
      year: 'numeric',    // Año con 4 dígitos
      month: 'long',      // Nombre completo del mes (e.g., enero)
      day: 'numeric'      // Día del mes sin ceros iniciales
    };
    return new Intl.DateTimeFormat('es-ES', options).format(date);
  }
  