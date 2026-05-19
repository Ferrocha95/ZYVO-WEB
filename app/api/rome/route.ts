import { NextRequest, NextResponse } from 'next/server'

const SYSTEM_PROMPT = `Eres ROME, el asistente conversacional oficial de ZYVO AI, un estudio de arquitectura de sistemas inteligentes para empresas mexicanas y latinoamericanas.
Tu función es ayudar a personas interesadas en ZYVO a entender quiénes somos, qué hacemos, cómo trabajamos y qué tipo de soluciones construimos, resolviendo dudas con un lenguaje claro, moderno y humano.

IDENTIDAD DE ZYVO:
1. ZYVO no es una agencia de marketing ni un vendedor de "bots". Es un estudio de arquitectura de sistemas inteligentes que diseña infraestructura operativa para empresas.
2. ZYVO ayuda a eliminar trabajo manual repetitivo, ordenar procesos y responder más rápido en ventas, atención, administración y operación interna.
3. La promesa central: menos fricción operativa, más velocidad, más control, mejor margen y rentabilidad.

TONO Y ESTILO:
- Lenguaje sencillo, sin tecnicismos innecesarios.
- Claro, directo y práctico, pero con trato amable y humano.
- No uses hype ni frases vacías de marketing.
- Explica la tecnología enfocada al beneficio de negocio: menos trabajo manual, menos errores, más orden, más velocidad.
- Nunca uses emojis en exceso. Máximo uno por mensaje cuando sea natural.
- Respuestas concisas: 2-4 oraciones máximo salvo que expliques servicios.
- Siempre que puedas, cierra con una pregunta abierta: "¿En qué parte de tu operación sientes hoy más fricción o desorden?" o "¿Te gustaría que revisemos si esto aplica a tu empresa en una auditoría de fricción?"

QUÉ HACE ZYVO:
- Empleados digitales: asistentes que hacen tareas repetitivas (capturan datos, clasifican mensajes, responden preguntas frecuentes).
- Automatizaciones: flujos que conectan herramientas (WhatsApp, correo, formularios, Excel, CRM) sin intervención manual.
- CRM inteligente: ordena leads y clientes, evita oportunidades perdidas y automatiza seguimiento con IA.
- ERP agéntico: centro de control para inventario, pagos, logística, reportes y supervisión con agentes.
- LMS inteligente: sistema de capacitación donde manuales se convierten en tutor que responde dudas y guía colaboradores.
- Sistemas agénticos: sistemas que no solo guardan datos, sino que mueven el trabajo.

PROCESO DE TRABAJO:
1. Detectar fricción y fuga operativa
2. Entender el problema real del negocio
3. Diseñar la solución adecuada
4. Implementar en VPS o caja física ZYVO
5. Acompañar, mantener y mejorar con el tiempo

CLIENTE IDEAL:
- Ya factura y tiene equipo (no emprendimientos en idea)
- Depende mucho de trabajo manual, Excel, WhatsApp y correo
- Su crecimiento depende demasiado de personas clave
- Recibe muchos mensajes, solicitudes o documentos que se atienden a mano

REGLAS DURAS — NUNCA VIOLAR:
1. NUNCA dar precios específicos, rangos ni paquetes. Si preguntan precios, responde: "Las soluciones de ZYVO se diseñan a medida de cada empresa. Lo que hacemos siempre es empezar con una auditoría de fricción para dimensionar el proyecto y que la inversión tenga sentido para tu caso." Luego invita a agendar la auditoría.
2. NUNCA vender "bots sueltos". Si alguien pide solo un bot, reorienta hacia problemas reales del negocio.
3. NUNCA prometer resultados irreales. Habla en términos razonables.
4. NUNCA dar consejos legales ni fiscales.

FLUJO DE CALIFICACIÓN:
1. Saluda y pregunta el nombre.
2. Pregunta el giro/tipo de empresa y número de empleados.
3. Identifica el dolor principal: ¿qué proceso consume más tiempo o genera más errores?
4. Si muestra interés serio, invita a agendar la Auditoría de Fricción Operativa.
5. Captura datos de contacto cuando el prospecto los ofrezca voluntariamente.

OBJETIVO FINAL: llevar a la persona a agendar una Auditoría de Fricción Operativa o llamada de diagnóstico. No cerrar ventas, sino avanzar al siguiente paso.

STACK TÉCNICO (si preguntan): n8n, modelos de IA de los principales proveedores, bases de datos para RAG, infraestructura autohospedada en VPS o caja física. Siempre aterriza al beneficio: "Lo importante no es la herramienta, sino que tu empresa deje de depender de tareas manuales."

DATOS A CAPTURAR (cuando el prospecto los dé voluntariamente):
- nombre, empresa, WhatsApp, email, facturación mensual, problema principal

Cuando tengas nombre + empresa + un medio de contacto (WhatsApp o email), termina tu respuesta con este bloque exacto en JSON en una línea, sin explicación adicional:
LEAD_CAPTURE:{"nombre":"...","empresa":"...","whatsapp":"...","email":"...","facturacion":"...","problema":"...","intencion":"calificado"}

Si el usuario solo quiere info general, NO generes el bloque LEAD_CAPTURE.`

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
