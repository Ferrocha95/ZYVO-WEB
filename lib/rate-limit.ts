// Rate limiting en memoria (best-effort).
// ⚠️ En producción serverless el límite es POR INSTANCIA, no global, y se
// reinicia con cada arranque en frío. Para límites reales y compartidos usar
// Upstash Redis o Vercel KV (pendiente de decisión del usuario).

type Hit = { count: number; reset: number }

const store = new Map<string, Hit>()
const MAX_KEYS = 10_000

export interface RateLimitResult {
  ok: boolean
  remaining: number
  retryAfter?: number
}

export function rateLimit(key: string, limit = 5, windowMs = 60_000): RateLimitResult {
  const now = Date.now()
  const hit = store.get(key)

  // Tope duro del store: evita crecimiento sin límite (ataques con muchas IPs)
  if (store.size >= MAX_KEYS) {
    for (const [k, v] of store) if (now > v.reset) store.delete(k)
    // Si sigue lleno (todas activas), elimina las más viejas por inserción
    if (store.size >= MAX_KEYS) {
      let over = store.size - MAX_KEYS + 1
      for (const k of store.keys()) {
        store.delete(k)
        if (--over <= 0) break
      }
    }
  }

  if (!hit || now > hit.reset) {
    store.set(key, { count: 1, reset: now + windowMs })
    return { ok: true, remaining: limit - 1 }
  }

  hit.count++
  if (hit.count > limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((hit.reset - now) / 1000) }
  }
  return { ok: true, remaining: limit - hit.count }
}
