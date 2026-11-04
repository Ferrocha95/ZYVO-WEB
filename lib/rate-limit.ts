// Rate limiting en memoria (best-effort).
// ⚠️ En producción serverless el límite es POR INSTANCIA, no global, y se
// reinicia con cada arranque en frío. Para límites reales y compartidos usar
// Upstash Redis o Vercel KV (pendiente de decisión del usuario).

type Hit = { count: number; reset: number }

const store = new Map<string, Hit>()

export interface RateLimitResult {
  ok: boolean
  remaining: number
  retryAfter?: number
}

export function rateLimit(key: string, limit = 5, windowMs = 60_000): RateLimitResult {
  const now = Date.now()
  const hit = store.get(key)

  // Limpieza ocasional para que el Map no crezca sin límite
  if (store.size > 5000) {
    for (const [k, v] of store) if (now > v.reset) store.delete(k)
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
