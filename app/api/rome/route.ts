import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { rateLimit } from '@/lib/rate-limit'

// ─── Master prompt de Rome (identidad 2026) ──────────────────────────────────
const SYSTEM_PROMPT = `## Identidad
Tu nombre es Rome. Eres el asistente de IA de ZYVO y el primer punto de contacto en el sitio: parte atención, parte filtro comercial.
Si te preguntan, sí: eres una inteligencia artificial. Lo dices con naturalidad, sin aspavientos, y puedes conectar a la persona con alguien del equipo cuando lo pida.
Eres inteligente, directo, humano y eficiente. Sin rodeos, sin vender humo, sin frases de call-center.

## Qué es ZYVO
ZYVO diseña e implementa sistemas inteligentes (agénticos) para empresas que quieren crecer sin perder el control de su operación.
Claim: "Crece sin perder el control." No es agencia de marketing ni vende software genérico. No promete "rápido y fácil".

Tres formas de sistematizar una empresa:
1. Sistema operativo agéntico — agentes que operan áreas de la empresa con criterio y bajo las reglas del cliente: ejecutan tareas y procesos, escalan a una persona cuando toca decidir, y dejan registro de todo.
2. Sistema comercial inteligente — captación, seguimiento y cierre asistidos, con todo trazable.
3. Apps y plataformas a medida — software propio para la operación, no plantillas genéricas.

Principios de control (clave para la confianza): human in the loop (el sistema propone, la persona aprueba lo que importa), trazabilidad (cada acción queda registrada), permisos y auditoría, y los datos del cliente son suyos y viven en su infraestructura.

## Tu único objetivo
Entender rápido la fricción del prospecto y llevarlo a agendar la ConsultorIA 1a1 gratuita: una sesión de 60 minutos para ver su operación con claridad, sin costo y sin compromiso. Es el único cierre por chat. No hay otro producto que vender aquí.
La forma concreta de agendar y seguir con una persona del equipo es por WhatsApp: https://wa.me/527291216435. Cuando cierres, comparte ese enlace con naturalidad e invita a escribir por ahí. Si además te dan nombre, empresa y un contacto, regístralos con la herramienta capturar_lead.

## Reglas DURAS (nunca romper)
- NO menciones precios, ROI, ahorros, porcentajes, plazos garantizados ni "resultados en X semanas". ZYVO no promete resultados sin diagnóstico. Si preguntan cuánto cuesta o cuánto tarda: "Depende de tu operación; se define en la ConsultorIA, que es gratuita."
- NO inventes casos de éxito, testimonios ni clientes.
- NO hables de herramientas técnicas (n8n, modelos, APIs) salvo que lo pidan; habla de impacto operativo.
- NO existen "Departamentos Digitales", "Asistente Directiva", "ZYVO Hub", "CRM/ERP" como productos — eso es de una versión vieja de ZYVO; nunca lo menciones.
- Si no sabes algo, dilo: "Eso lo aclaramos en la ConsultorIA" o conecto con el equipo.

## Comportamiento
- Frases cortas. Una sola pregunta por mensaje si necesitas contexto. Cada mensaje acerca al CTA.
- Si el prospecto ya sabe lo que quiere, valida en una frase y llévalo directo a la ConsultorIA.
- Mantén el foco; vuelve siempre al hilo central.

## Objeciones (sin promesas)
- "¿Mis datos están seguros?" → "Tu información vive en tu infraestructura y bajo tu control, con permisos y registro de accesos. Tú decides quién puede hacer qué."
- "¿Pierdo el control de mi operación?" → "No. Todo se diseña con human in the loop: el sistema propone y tú apruebas lo que importa. Cada acción queda registrada."
- "¿Cuánto cuesta / cuánto tarda?" → "Depende de tu operación; se define en la ConsultorIA, y la sesión es gratuita."
- "Estoy comparando opciones" → "La ConsultorIA te da una lectura concreta de tu operación para comparar. Sin humo."
- "No tengo tiempo ahora" → "Entendido. ¿Cuándo te queda bien? Te aparto el espacio."
- "¿Qué pasa si no funciona?" → "Se trabaja por fases, con una etapa de estabilización. Si algo no opera como debe, se corrige. No entregamos y desaparecemos."

## Tono de Rome
Directo sin ser grosero. Seguro sin ser arrogante. Cálido sin ser servil. Humor seco cuando cuadra, nunca forzado.
Rome no dice "con gusto", "claro que sí", "por supuesto". No abre con "¡Hola!" seguido de relleno. Dice lo que hay que decir y punto.

## CTA (varía según el contexto; cierra invitando al WhatsApp)
- "¿Agendamos la ConsultorIA? Es gratis, 60 minutos. Escríbenos por WhatsApp y lo cuadramos: https://wa.me/527291216435"
- "El siguiente paso es la ConsultorIA, sin costo. ¿Te paso el WhatsApp para agendar? https://wa.me/527291216435"
- "Mejor por WhatsApp para no perderte: https://wa.me/527291216435 — ahí agendamos tu ConsultorIA."

## Captura de datos
Pide los datos de forma natural conforme avanza la charla, no todos de golpe. Cuando tengas el nombre de la persona, su empresa y un medio de contacto (WhatsApp o email), usa la herramienta capturar_lead una sola vez para registrar el prospecto. Después de capturar, confirma brevemente que el equipo lo contactará para agendar la ConsultorIA.
Si la persona solo quiere información general y no deja datos, NO uses la herramienta.`

const LEAD_TOOL: Anthropic.Tool = {
  name: 'capturar_lead',
  description:
    'Registra un prospecto calificado cuando ya tienes su nombre, su empresa y un medio de contacto (WhatsApp o email). Úsala una sola vez por conversación.',
  input_schema: {
    type: 'object',
    properties: {
      nombre: { type: 'string', description: 'Nombre de la persona' },
      empresa: { type: 'string', description: 'Nombre de su empresa o negocio' },
      whatsapp: { type: 'string', description: 'WhatsApp, si lo dio' },
      email: { type: 'string', description: 'Correo, si lo dio' },
      friccion: { type: 'string', description: 'La fricción o problema principal que describió' },
      resumen: { type: 'string', description: 'Resumen breve de la conversación y la intención' },
    },
    required: ['nombre', 'empresa'],
  },
}

const MODEL = 'claude-haiku-5-5'
const MAX_MSG_LEN = 2000

interface Msg {
  role: 'user' | 'assistant'
  content: string
}

const asString = (v: unknown): string => (typeof v === 'string' ? v.trim() : '')

function clientIp(req: NextRequest): string {
  const vercel = req.headers.get('x-vercel-forwarded-for')
  if (vercel) return vercel.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
}

function textFrom(content: Anthropic.ContentBlock[]): string {
  return content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map(b => b.text)
    .join(' ')
    .trim()
}

export async function POST(req: NextRequest) {
  try {
    if (!req.headers.get('content-type')?.includes('application/json')) {
      return NextResponse.json({ error: 'Content-Type inválido' }, { status: 415 })
    }

    // Rate limit por IP (chat: permite conversación activa, bloquea floods)
    const rl = rateLimit(`rome:${clientIp(req)}`, 20, 60_000)
    if (!rl.ok) {
      return NextResponse.json(
        { error: 'Demasiados mensajes. Espera un momento.' },
        { status: 429, headers: { 'Retry-After': String(rl.retryAfter ?? 60) } },
      )
    }

    const body: unknown = await req.json().catch(() => null)
    const rawMessages = (body as { messages?: unknown })?.messages
    if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
      return NextResponse.json({ error: 'messages requerido' }, { status: 400 })
    }

    // Normaliza y acota los mensajes (anti type-confusion / abuso)
    const messages: Msg[] = rawMessages
      .map((m): Msg | null => {
        const role = (m as { role?: unknown })?.role
        const content = asString((m as { content?: unknown })?.content).slice(0, MAX_MSG_LEN)
        if ((role === 'user' || role === 'assistant') && content) return { role, content }
        return null
      })
      .filter((m): m is Msg => m !== null)
      .slice(-12)

    if (messages.length === 0) {
      return NextResponse.json({ error: 'messages inválido' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Servicio no configurado' }, { status: 503 })
    }

    const client = new Anthropic({ apiKey })

    const anthropicMessages: Anthropic.MessageParam[] = messages.map(m => ({
      role: m.role,
      content: m.content,
    }))

    const first = await client.messages.create({
      model: MODEL,
      max_tokens: 400,
      system: SYSTEM_PROMPT,
      tools: [LEAD_TOOL],
      output_config: { effort: 'low' },
      messages: anthropicMessages,
    })

    let text = textFrom(first.content)
    let hasLead = false

    const toolUse = first.content.find(
      (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use' && b.name === 'capturar_lead',
    )

    if (toolUse) {
      const input = toolUse.input as Record<string, unknown>
      // Validación del lead (paridad con /api/contact): requeridos + regex + topes
      const nombre = asString(input.nombre).slice(0, 120)
      const empresa = asString(input.empresa).slice(0, 160)
      const whatsapp = asString(input.whatsapp).slice(0, 40)
      let email = asString(input.email).slice(0, 160)
      const friccion = asString(input.friccion).slice(0, 500)
      const resumen = (asString(input.resumen) || text).slice(0, 1000)
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) email = ''
      const validLead = Boolean(nombre && empresa && (email || whatsapp))

      // Rate limit propio y más estricto para la captura (anti lead-spam)
      let captured = false
      if (validLead) {
        const leadRl = rateLimit(`rome-lead:${clientIp(req)}`, 3, 3_600_000)
        if (leadRl.ok) {
          captured = true
          hasLead = true
          await captureLead({ nombre, empresa, whatsapp, email, friccion, resumen })
        }
      }

      const toolResultMsg = captured
        ? 'Lead registrado. Confirma breve y cálidamente que el equipo lo contactará para agendar su ConsultorIA.'
        : validLead
          ? 'No se pudo registrar por ahora. Dile que lo intente en un momento o que escriba por WhatsApp.'
          : 'Faltan datos para registrar (nombre, empresa y un contacto: WhatsApp o email). Pídelos de forma natural, sin presionar.'

      // Segunda llamada: Rome cierra tras el intento de captura
      const follow = await client.messages.create({
        model: MODEL,
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        tools: [LEAD_TOOL],
        output_config: { effort: 'low' },
        messages: [
          ...anthropicMessages,
          { role: 'assistant', content: first.content },
          {
            role: 'user',
            content: [{ type: 'tool_result', tool_use_id: toolUse.id, content: toolResultMsg }],
          },
        ],
      })
      text = textFrom(follow.content) || text
    }

    return NextResponse.json({
      text: text || 'Listo. El equipo te contacta para agendar tu ConsultorIA.',
      hasLead,
    })
  } catch (err) {
    console.error('[Rome] Error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

// ─── Captura de lead → Supabase + n8n + Resend ───────────────────────────────
interface Lead {
  nombre: string
  empresa: string
  whatsapp: string
  email: string
  friccion: string
  resumen: string
}

function esc(s: string): string {
  return s.replace(
    /[&<>"']/g,
    c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string,
  )
}

async function captureLead(lead: Lead) {
  const timestamp = new Date().toISOString()
  // Mapea a las columnas existentes de la tabla rome_leads
  const row = {
    nombre: lead.nombre,
    empresa: lead.empresa,
    whatsapp: lead.whatsapp || null,
    email: lead.email || null,
    facturacion: null,
    problema: lead.friccion || null,
    resumen: lead.resumen || null,
    intencion: 'calificado',
    source: 'landing_zyvo_rome',
    timestamp,
  }

  // Supabase (acepta los nombres de variable de /api/contact o los antiguos)
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  // Clave anónima (insert-only vía RLS), NO la service-role: este endpoint es público
  const supabaseKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
        body: JSON.stringify(row),
      })
    } catch (e) {
      console.error('[Rome] Supabase insert error:', e)
    }
  }

  // Email de notificación (valores escapados, paleta nueva)
  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)
      const rowHtml = (label: string, value: string) =>
        value
          ? `<tr><td style="padding:8px 0;color:#8B93A1;width:120px">${label}</td><td style="padding:8px 0">${esc(value)}</td></tr>`
          : ''
      await resend.emails.send({
        from: 'Rome IA <noreply@zyvo.com.mx>',
        to: 'direccion@zyvo.com.mx',
        subject: `Nuevo lead Rome — ${esc(lead.nombre || 'Sin nombre')}${lead.empresa ? ` (${esc(lead.empresa)})` : ''}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#0A0A0B;color:#F5F7FA;padding:32px;border-radius:12px;border:1px solid rgba(0,229,255,0.2)">
            <h2 style="color:#00E5FF;margin:0 0 24px">Nuevo lead — Agente Rome</h2>
            <table style="width:100%;border-collapse:collapse">
              ${rowHtml('Nombre', lead.nombre)}
              ${rowHtml('Empresa', lead.empresa)}
              ${rowHtml('WhatsApp', lead.whatsapp)}
              ${rowHtml('Email', lead.email)}
              ${rowHtml('Fricción', lead.friccion)}
              ${rowHtml('Resumen', lead.resumen)}
            </table>
          </div>
        `,
      })
    } catch (e) {
      console.error('[Rome] Resend error:', e)
    }
  }

  if (!supabaseUrl && !resendKey) {
    console.log('[Rome] Lead capturado:', row)
  }
}
