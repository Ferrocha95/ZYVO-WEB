import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Eres Rome, el asesor comercial de ZYVO — una firma de arquitectura de IA y automatización para PyMEs mexicanas.

Tu misión: calificar al prospecto de forma conversacional, entender su dolor operativo real y convertirlo en una solicitud de auditoría.

PERSONALIDAD:
- Directo, clínico, confiante. Como un CFO, no como un vendedor genérico.
- Nunca uses emojis en exceso. Máximo uno por mensaje cuando sea natural.
- Habla siempre en español mexicano formal-relajado.
- Eres conciso: respuestas de 2-4 oraciones máximo, a menos que expliques servicios.

CONTEXTO DE ZYVO:
- Servicio: Automatización de Procesos (desde $800 USD), Agentes IA Personalizados (desde $1,200 USD), Sistemas Agénticos (a medida)
- Auditoría de fricción: $250-$500 USD (incluida en toda implementación)
- Retainer mensual: desde $400 USD
- ROI garantizado: mínimo 3x sobre costo de implementación
- Entrega: primera implementación en 10 días
- Stack: n8n, Supabase, Docker, Claude AI, agentes personalizados

FLUJO DE CALIFICACIÓN:
1. Saluda brevemente y pregunta el nombre.
2. Pregunta el giro/tipo de empresa y número de empleados administrativos.
3. Identifica el dolor principal: ¿qué proceso consume más tiempo o genera más errores?
4. Pregunta la facturación mensual aproximada (para dimensionar el ROI).
5. Si califica (empresa real con 3+ empleados admin o proceso evidente), invita a dejar datos para la auditoría.
6. Si pide hablar por WhatsApp, dale el número: +52 [número configurado].

DATOS A CAPTURAR (cuando el prospecto los dé):
- nombre, empresa, WhatsApp, email, facturación mensual, problema principal

Cuando tengas nombre + empresa + un medio de contacto (WhatsApp o email), termina tu respuesta con este bloque exacto en JSON en una línea, sin explicación adicional:
LEAD_CAPTURE:{"nombre":"...","empresa":"...","whatsapp":"...","email":"...","facturacion":"...","problema":"...","intencion":"calificado"}

Si el usuario solo quiere info general y no califica todavía, NO generes el bloque LEAD_CAPTURE.`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface RequestBody {
  messages: Message[]
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json()
    const { messages } = body

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'messages requerido' }, { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Servicio no configurado' }, { status: 503 })
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.slice(-12),
        ],
        max_tokens: 350,
        temperature: 0.55,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('[Rome] OpenAI error:', err)
      return NextResponse.json({ error: 'Error al procesar' }, { status: 502 })
    }

    const data = await response.json()
    const raw: string = data.choices?.[0]?.message?.content ?? ''

    // Extraer bloque LEAD_CAPTURE si existe
    const leadMatch = raw.match(/LEAD_CAPTURE:(\{.*?\})/)
    const text = raw.replace(/LEAD_CAPTURE:\{.*?\}/, '').trim()

    if (leadMatch) {
      try {
        const lead = JSON.parse(leadMatch[1])
        await captureLead({ ...lead, resumen: text })
      } catch {
        console.error('[Rome] Error parsing lead JSON')
      }
    }

    return NextResponse.json({ text, hasLead: !!leadMatch })
  } catch (err) {
    console.error('[Rome] Unexpected error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

async function captureLead(lead: Record<string, string>) {
  const timestamp = new Date().toISOString()
  const payload = { ...lead, timestamp, source: 'landing_zyvo_rome' }

  // Guardar en Supabase
  const supabaseUrl  = process.env.SUPABASE_URL
  const supabaseKey  = process.env.SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/rome_leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(payload),
      })
    } catch (e) {
      console.error('[Rome] Supabase insert error:', e)
    }
  }

  // Enviar a n8n webhook
  const webhookUrl = process.env.N8N_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch (e) {
      console.error('[Rome] n8n webhook error:', e)
    }
  }

  // Enviar email de notificación
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'Rome IA <noreply@zyvo.com.mx>',
        to: 'direccion@zyvo.com.mx',
        subject: `Nuevo lead Rome — ${lead.nombre ?? 'Sin nombre'}${lead.empresa ? ` (${lead.empresa})` : ''}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#080C14;color:#F5F5F5;padding:32px;border-radius:12px;border:1px solid rgba(212,175,55,0.2)">
            <h2 style="color:#D4AF37;margin:0 0 24px">Nuevo lead — Agente Rome</h2>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px 0;color:#aaa;width:120px">Nombre</td><td style="padding:8px 0">${lead.nombre ?? '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#aaa">Empresa</td><td style="padding:8px 0">${lead.empresa ?? '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#aaa">WhatsApp</td><td style="padding:8px 0">${lead.whatsapp ?? '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#aaa">Email</td><td style="padding:8px 0">${lead.email ?? '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#aaa">Facturación</td><td style="padding:8px 0">${lead.facturacion ?? '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#aaa">Problema</td><td style="padding:8px 0">${lead.problema ?? '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#aaa">Resumen</td><td style="padding:8px 0">${lead.resumen ?? '—'}</td></tr>
            </table>
          </div>
        `,
      })
    } catch (e) {
      console.error('[Rome] Resend error:', e)
    }
  }

  if (!supabaseUrl && !webhookUrl && !resendKey) {
    console.log('[Rome] Lead capturado:', payload)
  }
}
