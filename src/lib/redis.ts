import { Redis } from '@upstash/redis';

// Usamos las variables de entorno para obtener la conexión de Redis
export const redis = Redis.fromEnv();
