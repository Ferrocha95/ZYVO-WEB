import { NextRequest, NextResponse } from 'next/server'

type PartnerPayload = {
  nombre: string
  email: string
  whatsapp?: string
  empresa?: string
  tipoInteres: 'Partner' | 'Asociado'
  comoConocio?: string
  contexto?: string
}

export async function POST(req: NextRequest) {
  try {
    const body: PartnerPayload = await req.json()

    if (!body.nombre || !body.email || !body.tipoInteres) {
      return NextResponse.json(
        { success: false, error: 'Campos requeridos: nombre, email, tipoInteres' },
        { status: 400 },
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Email inválido' },
        { status: 400 },
      )
    }

    // Empaquetar campos extra en mensaje para reutilizar la tabla leads
    const mensajeParts = [
      `Tipo: ${body.tipoInteres}`,
      body.comoConocio ? `Cómo conoció: ${body.comoConocio}` : null,
      body.contexto    ? `Contexto: ${body.contexto}`         : null,
    ].filter(Boolean)
    const mensaje = mensajeParts.join(' | ')

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey) {
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { error } = await supabase.from('leads').insert([
        {
          nombre:   body.nombre,
          email:    body.email,
          whatsapp: body.whatsapp ?? null,
          empresa:  body.empresa  ?? null,
          mensaje:  mensaje       || null,
          tipo:     'partner',
          created_at: new Date().toISOString(),
        },
      ])

      if (error) {
        console.error('[ZYVO] Supabase partner insert error:', error)
      }
    } else {
      console.log('[ZYVO] Nuevo partner lead:', {
        nombre: body.nombre,
        email: body.email,
        tipoInteres: body.tipoInteres,
        timestamp: new Date().toISOString(),
      })
    }

    const resendKey = process.env.RESEND_API_KEY
    if (resendKey) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(resendKey)
        await resend.emails.send({
          from: 'ZYVO Partners <noreply@zyvo.com.mx>',
          to: 'direccion@zyvo.com.mx',
          subject: `Nuevo Partner ZYVO — ${body.nombre}${body.empresa ? ` (${body.empresa})` : ''}`,
          html: `
            <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#080C14;color:#F5F5F5;padding:32px;border-radius:12px;border:1px solid rgba(0,170,255,0.25)">
              <h2 style="color:#00AAFF;margin:0 0 24px">Nuevo Partner / Asociado — ZYVO</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td style="padding:8px 0;color:#aaa;width:140px">Nombre</td><td style="padding:8px 0">${body.nombre}</td></tr>
                <tr><td style="padding:8px 0;color:#aaa">Email</td><td style="padding:8px 0">${body.email}</td></tr>
                ${body.whatsapp   ? `<tr><td style="padding:8px 0;color:#aaa">WhatsApp</td><td style="padding:8px 0">${body.whatsapp}</td></tr>` : ''}
                ${body.empresa    ? `<tr><td style="padding:8px 0;color:#aaa">Empresa</td><td style="padding:8px 0">${body.empresa}</td></tr>` : ''}
                <tr><td style="padding:8px 0;color:#aaa">Tipo de interés</td><td style="padding:8px 0;color:#00AAFF;font-weight:bold">${body.tipoInteres}</td></tr>
                ${body.comoConocio ? `<tr><td style="padding:8px 0;color:#aaa">Cómo conoció</td><td style="padding:8px 0">${body.comoConocio}</td></tr>` : ''}
                ${body.contexto    ? `<tr><td style="padding:8px 0;color:#aaa">Contexto / red</td><td style="padding:8px 0">${body.contexto}</td></tr>` : ''}
              </table>
            </div>
          `,
        })
      } catch (e) {
        console.error('[ZYVO] Resend partners error:', e)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Registro recibido. Te contactaremos en menos de 24 horas.',
    })
  } catch (err) {
    console.error('[ZYVO] Partners route error:', err)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 },
    )
  }
}
