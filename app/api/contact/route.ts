import { NextRequest, NextResponse } from 'next/server'

type ContactPayload = {
  nombre: string
  email: string
  whatsapp?: string
  empresa?: string
  facturacion?: string
  mensaje?: string
  tipo: 'auditoria' | 'contacto'
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()

    // Validación básica
    if (!body.nombre || !body.email || !body.tipo) {
      return NextResponse.json(
        { success: false, error: 'Campos requeridos: nombre, email, tipo' },
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
