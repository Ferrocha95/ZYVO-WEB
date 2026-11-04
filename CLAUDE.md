# ZYVO Web — Instrucciones para Claude Code

> **Identidad 2026 (vigente).** Este archivo reemplaza por completo la identidad anterior
> (dorado/magenta/serif, ROI 3x, "Departamentos Digitales", ZYVO Hub/CRM/ERP). Si ves esos
> conceptos o colores en el código, son restos a migrar, no la referencia.

## Identidad del Proyecto
ZYVO diseña e implementa sistemas inteligentes (agénticos) para empresas que quieren crecer sin
perder el control de su operación.
- **Claim:** "Crece sin perder el control."
- Tono: serio, técnico, sobrio. Sin humo, sin promesas de resultados.

## Reglas de contenido (NO negociables)
PROHIBIDO en toda la web: promesas de ROI, ahorros, cifras de resultados, testimonios, logos de
clientes, sellos tipo "Verificado" / "garantizado" / "Self-Hosted" / "IA Ética" / "sin vendor
lock-in". Nada de magenta, violeta/púrpura ni tipografías serif.

## Identidad Visual
- **Colores (tokens):** fondo `#0A0A0B` · superficie `#17181C` · texto `#F5F7FA` ·
  cian `#00E5FF` · azul `#2F6BFF` · gris `#8B93A1` · gradiente cian→azul.
- **Tipografía:** Manrope (títulos) · Inter (texto), vía `next/font`.
- **Modo noche/día:** `next-themes`. Sigue la preferencia del sistema, recuerda la elección del
  visitante y no parpadea al cargar. Base dark-first.
- Fondo de página: `var(--c-bg)` — NUNCA `#000000` puro.

## Sistema de tokens (globals.css)
- Tokens semánticos nuevos → clases Tailwind: `bg-base` `bg-surface` `text-ink` `text-muted`
  `*-cyan` `*-blue` `*-grey`. Mapean a variables `--c-*` que cambian según el tema
  (`:root` = noche, `.light` = día).
- Fuentes nuevas: `font-display` (Manrope) · `font-sans` (Inter).
- **Puente temporal:** las variables viejas `--font-instrument-serif` / `--font-plus-jakarta` /
  `--font-jetbrains-mono` están aliasadas a Manrope/Inter para no romper componentes aún no
  migrados. Los tokens `--color-zyvo-*` siguen definidos y se retiran sección por sección.

## Tailwind v4 — Clases canónicas (OBLIGATORIO)
`bg-linear-to-r` · `bg-white/4` · `border-white/6` · `z-99998` · `min-w-175` · `mask-[...]`
ease arrays siempre `as const`.
NO usar: `bg-gradient-to-r`, `bg-white/[0.04]`, `z-[99998]`, `min-w-[700px]`, `[mask-image:...]`.

## Stack
- Next.js 16 App Router · React 19 · TypeScript strict (sin `any`) · Tailwind CSS v4 ·
  Framer Motion v12 · Lenis (smooth scroll) · Supabase · Resend · sonner · lucide-react.
- `next-themes` para el tema. `three` (fondo WebGL) en revisión (debe hacerse theme-aware).

## Estructura de la home (orden objetivo en page.tsx)
1. Navbar — logo, 4 enlaces, interruptor noche/día, CTA "ConsultorIA gratuita"
2. Hero — "Crece sin perder el control." + subtítulo + 2 botones + visual de sistema + fila de hechos
3. Fricción operativa — 6 señales
4. ConsultorIA 1a1 — 60 min, qué incluye / qué no
5. Sistemas — SO agéntico · comercial inteligente · apps y plataformas a medida
6. Cómo trabajamos — 7 pasos
7. Control y seguridad — human in the loop, trazabilidad, permisos y auditoría, tus datos son tuyos
8. Evidencia — "casos en construcción" (marcador para captura real)
9. Rutas laterales — EscuderIA + Fuelle Studio
10. Estimador de fricción — fórmula visible
11. FAQ — 6 preguntas
12. Contacto (formulario) + Footer

## Fila de hechos de proceso (Hero)
`Human in the loop · Trazabilidad · Roadmap por fases · ConsultorIA sin costo`

## Estimador de fricción
Reemplaza la antigua Calculadora. Fórmula **visible** en la UI:
`costo mensual = personas × horas/semana × 4.33 × costo/hora`.
Sin porcentaje de recuperación y sin promesa de ahorro.

## Fuelle Studio
Nuevo nombre de lo que antes era "ZYVO Studio" (ruta para sitios web / landings aisladas).
- Aparece SOLO en: la tarjeta "¿No es tu caso?" (botón "Hablar con Fuelle Studio" → `#contacto`
  provisional) y en una pregunta del FAQ.
- No tiene página ni dominio aún. No inventar logo, claims ni textos extra.
- NUNCA usar "ZYVO Studio" en ningún texto.

## Rutas
- `/` (home) · `/blog` + `/blog/[slug]` · `/privacidad` · `/auditoria` (restilizadas).
- `/partners` se conserva pero SALE del menú de navegación (no se borra la ruta).
- APIs: `/api/contact`, `/api/rome`, `/api/partners`.

## Formulario de contacto
- NO filtra por facturación. Campos: nombre, **empresa (obligatoria)**, correo, WhatsApp,
  tamaño de equipo, fricción principal.
- Reutiliza el endpoint existente `/api/contact` (los campos nuevos se mapean al payload actual
  mientras no se autorice tocar el route).
- WhatsApp: `https://wa.me/527291216435` · Correo: `direccion@zyvo.com.mx`.

## APIs (no tocar la lógica en fases de diseño)
- `app/api/contact/route.ts` — POST leads → Supabase tabla `leads` + email Resend.
- `app/api/rome/route.ts` — OpenAI gpt-4o-mini, temp 0.55, max_tokens 350, últimos 12 mensajes
  → Supabase `rome_leads` + webhook n8n + Resend. El prompt de Rome se reescribe en tarea aparte.
- La seguridad de estas rutas (rate limiting, validación, captcha) se añade en su fase propia.

## Seguridad y arquitectura (plan activo)
- Repo **PÚBLICO**: jamás subir secretos. Llaves solo en variables de entorno de Vercel.
- `service_role` de Supabase NUNCA con prefijo `NEXT_PUBLIC_`.
- Fases dedicadas: cabeceras de seguridad HTTP (`next.config.ts`), sin source-maps en prod,
  rate limiting + honeypot/captcha + validación zod en APIs, RLS en Supabase.
- No ocultamos el bundle del navegador (imposible al 100%); sí evitamos exponer fuente/secretos.

## Variables de Entorno (.env.local — NUNCA commitear)
`OPENAI_API_KEY` · Supabase (URL + keys) · `N8N_WEBHOOK_URL` · `RESEND_API_KEY` ·
`NEXT_PUBLIC_WHATSAPP_NUMBER`.
⚠️ Pendiente: unificar nombres de Supabase entre `/api/contact`
(`NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`) y `/api/rome`
(`SUPABASE_URL` + `SUPABASE_ANON_KEY`).

## Reglas de Código
- `'use client'` SOLO para hooks/eventos/animaciones.
- API routes: try/catch, retornan `{ success, data?, error? }`, credenciales solo por `process.env`.
- Comentarios en español · PascalCase componentes · camelCase hooks/utils.
- `data-lenis-prevent=""` en contenedores con scroll propio dentro de Lenis.
- Navegación cross-route: `usePathname()==='/'` → scroll a `#id`, si no `router.push('/#id')`.

## Flujo de trabajo del rediseño
- Identidad + estructura primero; limpieza de código/deps muertas al final, en commits separados
  y solo tras aprobación con lista de evidencia.
- Cada fase cierra con `npm run lint` + `npm run build` en verde.
- No hacer commit, push ni merge sin aprobación explícita del usuario.
