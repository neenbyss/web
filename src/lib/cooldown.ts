// lib/cooldown.ts
import { redis } from './redis';

// Usamos un Map local para fallback en desarrollo si no se define REDIS_URL
const localCooldown = new Map<string, number>();

export async function isOnCooldown(key: string, ttlSeconds = 60): Promise<boolean> {
  if (process.env.REDIS_URL) {
    const value = await redis.get(key);
    return Boolean(value);
  } else {
    const last = localCooldown.get(key);
    const now = Date.now();
    if (last && now - last < ttlSeconds * 1000) return true;
    localCooldown.set(key, now);

    // Limpieza automática: se borra la entrada luego de 2× TTL
    setTimeout(() => {
      localCooldown.delete(key);
    }, ttlSeconds * 2000);
    return false;
  }
}

export async function setCooldown(key: string, ttlSeconds = 60): Promise<void> {
  if (process.env.REDIS_URL) {
    await redis.set(key, '1', { ex: ttlSeconds });
  } else {
    localCooldown.set(key, Date.now());
    setTimeout(() => {
      localCooldown.delete(key);
    }, ttlSeconds * 2000);
  }
}
