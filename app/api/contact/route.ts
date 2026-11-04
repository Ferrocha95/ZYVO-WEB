import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'

type ContactPayload = {
  nombre: string
  email: string
  whatsapp?: string
  empresa?: string
  facturacion?: string
  mensaje?: string
  tipo: 'auditoria' | 'contacto'
  website?: string // honeypot anti-bot (campo oculto en el formulario)
}

const MAX = { nombre: 120, email: 160, whatsapp: 40, empresa: 160, facturacion: 60, mensaje: 2000 }

function clientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
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

    // Honeypot: si el campo oculto viene lleno, es un bot → aceptamos en silencio
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ success: true, message: 'Solicitud recibida.' })
    }

    // Validación básica
    if (!body.nombre || !body.email || !body.tipo) {
      return NextResponse.json(
        { success: false, error: 'Campos requeridos: nombre, email, tipo' },
        { status: 400 },
      )
    }

    if (body.tipo !== 'auditoria' && body.tipo !== 'contacto') {
      return NextResponse.json({ success: false, error: 'Tipo inválido' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
        { status: 400 },
      )
    }

    // Topes de tamaño (anti-abuso)
    if (
      body.nombre.length > MAX.nombre ||
      body.email.length > MAX.email ||
      (body.whatsapp?.length ?? 0) > MAX.whatsapp ||
      (body.empresa?.length ?? 0) > MAX.empresa ||
      (body.facturacion?.length ?? 0) > MAX.facturacion ||
      (body.mensaje?.length ?? 0) > MAX.mensaje
    ) {
      return NextResponse.json({ success: false, error: 'Algún campo excede el tamaño permitido' }, { status: 413 })
    }

    // Intentar guardar en Supabase si está configurado
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { error } = await supabase.from('leads').insert([
        {
          nombre: body.nombre,
          email: body.email,
          whatsapp: body.whatsapp ?? null,
          empresa: body.empresa ?? null,
          facturacion: body.facturacion ?? null,
          mensaje: body.mensaje ?? null,
          tipo: body.tipo,
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        console.error('[ZYVO] Supabase insert error:', error)
        // No fallamos — el lead se registra en console como fallback
      }
    } else {
      // Fallback: log del lead cuando Supabase no está configurado
      console.log('[ZYVO] Nuevo lead recibido:', {
        nombre: body.nombre,
        email: body.email,
        tipo: body.tipo,
        facturacion: body.facturacion,
        timestamp: new Date().toISOString(),
      })
    }

    // Enviar email de notificación
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(resendKey)
        await resend.emails.send({
          from: 'ZYVO Leads <noreply@zyvo.com.mx>',
          to: 'direccion@zyvo.com.mx',
          subject: `Nuevo lead ZYVO — ${body.nombre}${body.empresa ? ` (${body.empresa})` : ''}`,
          html: `
            <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#080C14;color:#F5F5F5;padding:32px;border-radius:12px;border:1px solid rgba(212,175,55,0.2)">
              <h2 style="color:#D4AF37;margin:0 0 24px">Nuevo lead — Formulario ZYVO</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#aaa;width:120px">Nombre</td><td style="padding:8px 0">${body.nombre}</td></tr>
                <tr><td style="padding:8px 0;color:#aaa">Email</td><td style="padding:8px 0">${body.email}</td></tr>
                ${body.whatsapp ? `<tr><td style="padding:8px 0;color:#aaa">WhatsApp</td><td style="padding:8px 0">${body.whatsapp}</td></tr>` : ''}
                ${body.empresa ? `<tr><td style="padding:8px 0;color:#aaa">Empresa</td><td style="padding:8px 0">${body.empresa}</td></tr>` : ''}
                ${body.facturacion ? `<tr><td style="padding:8px 0;color:#aaa">Facturación</td><td style="padding:8px 0">${body.facturacion}</td></tr>` : ''}
                ${body.mensaje ? `<tr><td style="padding:8px 0;color:#aaa">Mensaje</td><td style="padding:8px 0">${body.mensaje}</td></tr>` : ''}
                <tr><td style="padding:8px 0;color:#aaa">Tipo</td><td style="padding:8px 0">${body.tipo}</td></tr>
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
