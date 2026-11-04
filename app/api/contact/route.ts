import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'

type ContactPayload = {
  nombre?: unknown
  email?: unknown
  whatsapp?: unknown
  empresa?: unknown
  facturacion?: unknown
  mensaje?: unknown
  tipo?: unknown
  website?: unknown // honeypot anti-bot
}

const MAX = { nombre: 120, email: 160, whatsapp: 40, empresa: 160, facturacion: 60, mensaje: 2000 }

// IP del cliente. En Vercel, x-vercel-forwarded-for lo fija la plataforma y el
// cliente no lo puede falsear; x-forwarded-for sí es falsificable (último recurso).
function clientIp(req: NextRequest): string {
  const vercel = req.headers.get('x-vercel-forwarded-for')
  if (vercel) return vercel.split(',')[0].trim()
  const real = req.headers.get('x-real-ip')
  if (real) return real.trim()
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return 'unknown'
}

const asString = (v: unknown): string => (typeof v === 'string' ? v : '')

// Escapa HTML para evitar inyección en el email de notificación
function esc(s: string): string {
  return s.replace(
    /[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  )
}

export async function POST(req: NextRequest) {
  try {
    // Content-Type esperado
    if (!req.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json({ success: false, error: 'Content-Type inválido' }, { status: 415 })
    }

    // Rate limit por IP (best-effort en memoria; ver lib/rate-limit.ts)
    const rl = rateLimit(`contact:${clientIp(req)}`, 5, 60_000)
    if (!rl.ok) {
      return NextResponse.json(
        { success: false, error: 'Demasiadas solicitudes. Intenta de nuevo en un momento.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
      )
    }

    let body: ContactPayload
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ success: false, error: 'JSON inválido' }, { status: 400 })
    }
    if (typeof body !== 'object' || body === null) {
      return NextResponse.json({ success: false, error: 'Payload inválido' }, { status: 400 })
    }

    // Honeypot: si el campo oculto viene lleno, es un bot → aceptamos en silencio
    if (asString(body.website).trim() !== '') {
      return NextResponse.json({ success: true, message: 'Solicitud recibida.' })
    }

    // Normalización a strings (evita type confusion: números/objetos no pasan)
    const nombre = asString(body.nombre).trim()
    const email = asString(body.email).trim()
    const whatsapp = asString(body.whatsapp).trim()
    const empresa = asString(body.empresa).trim()
    const facturacion = asString(body.facturacion).trim()
    const mensaje = asString(body.mensaje).trim()
    const tipo = body.tipo === 'auditoria' || body.tipo === 'contacto' ? body.tipo : null

    // Validación
    if (!nombre || !email || !tipo) {
      return NextResponse.json(
        { success: false, error: 'Campos requeridos: nombre, email, tipo' },
        { status: 400 },
      )
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Email inválido' }, { status: 400 })
    }
    if (
      nombre.length > MAX.nombre ||
      email.length > MAX.email ||
      whatsapp.length > MAX.whatsapp ||
      empresa.length > MAX.empresa ||
      facturacion.length > MAX.facturacion ||
      mensaje.length > MAX.mensaje
    ) {
      return NextResponse.json(
        { success: false, error: 'Algún campo excede el tamaño permitido' },
        { status: 413 },
      )
    }

    // Guardar en Supabase si está configurado
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { error } = await supabase.from('leads').insert([
        {
          nombre,
          email,
          whatsapp: whatsapp || null,
          empresa: empresa || null,
          facturacion: facturacion || null,
          mensaje: mensaje || null,
          tipo,
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        console.error('[ZYVO] Supabase insert error:', error)
        // No fallamos — el lead se registra en console como fallback
      }
    } else {
      console.log('[ZYVO] Nuevo lead recibido:', {
        nombre,
        email,
        tipo,
        facturacion,
        timestamp: new Date().toISOString(),
      })
    }

    // Email de notificación (todos los valores escapados)
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(resendKey)
        const row = (label: string, value: string) =>
          value
            ? `<tr><td style="padding:8px 0;color:#8B93A1;width:120px">${label}</td><td style="padding:8px 0">${esc(value)}</td></tr>`
            : ''
        await resend.emails.send({
          from: 'ZYVO Leads <noreply@zyvo.com.mx>',
          to: 'direccion@zyvo.com.mx',
          subject: `Nuevo lead ZYVO — ${esc(nombre)}${empresa ? ` (${esc(empresa)})` : ''}`,
          html: `
            <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0A0A0B;color:#F5F7FA;padding:32px;border-radius:12px;border:1px solid rgba(0,229,255,0.2)">
              <h2 style="color:#00E5FF;margin:0 0 24px">Nuevo lead — Formulario ZYVO</h2>
              <table style="width:100%;border-collapse:collapse">
                ${row('Nombre', nombre)}
                ${row('Email', email)}
                ${row('WhatsApp', whatsapp)}
                ${row('Empresa', empresa)}
                ${row('Facturación', facturacion)}
                ${row('Mensaje', mensaje)}
                ${row('Tipo', tipo)}
              </table>
            </div>
          `,
        })
      } catch (e) {
        console.error('[ZYVO] Resend error:', e)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitud recibida. Te contactaremos en menos de 24 horas.',
    })
  } catch (err) {
    console.error('[ZYVO] Contact route error:', err)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 },
    )
  }
}
