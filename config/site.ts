import {
  Bot,
  BarChart3,
  Users,
  GraduationCap,
  Search,
  Network,
  Workflow,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Activity,
} from 'lucide-react'

// ─── Metadata del Sitio ───────────────────────────────────────────────────────
export const SITE_CONFIG = {
  name: 'ZYVO',
  tagline: 'Erradicamos la fuga operativa de tu empresa',
  subtitle:
    'Arquitectura de sistemas inteligentes para PyMEs que no pueden darse el lujo de seguir operando como en 2020',
  description:
    'ZYVO es una boutique de Arquitectura de IA y Automatización Ética para PyMEs latinoamericanas. No somos una agencia de marketing — somos una firma de ingeniería de eficiencia operativa.',
  email: 'direccion@zyvo.com.mx',
  whatsapp: '+52 55 0000 0000',
  linkedin: 'https://linkedin.com/company/zyvo-ai',
  ctaPrimary: 'Solicita tu Auditoría de Fricción',
  ctaSecondary: 'Ver el método',
  filosofia: 'Infraestructura inteligente. Resultados medibles.',
} as const

// ─── Acrónimo ZYVO ────────────────────────────────────────────────────────────
export const ACRONIMO_ZYVO = [
  {
    letra: 'Z',
    titulo: 'Zero-Fricción',
    descripcion: 'Eliminamos cada punto de fricción operativa con sistemas que piensan y actúan por sí solos.',
    metrica: '85% reducción de carga manual',
    color: '#D4AF37',
  },
  {
    letra: 'Y',
    titulo: 'Yield-Focused',
    descripcion: 'Cada implementación se mide en ROI real. Sin vanity metrics. Solo resultados financieros tangibles.',
    metrica: 'ROI mínimo 3x garantizado',
    color: '#4A7FD4',
  },
  {
    letra: 'V',
    titulo: 'Valor-Arquitectado',
    descripcion: 'No vendemos herramientas. Construimos arquitectura de valor que escala con tu negocio.',
    metrica: 'Entrega en 10 días',
    color: '#264653',
  },
  {
    letra: 'O',
    titulo: 'Operaciones-Inteligentes',
    descripcion: 'Tus operaciones dejan de depender de humanos para tareas repetitivas y pasan a ser autónomas.',
    metrica: '$425 USD/mes de ahorro',
    color: '#1D3557',
  },
]

// ─── Navegación ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'El Problema', href: '#problema' },
  { label: 'Solución', href: '#solucion' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Agentes IA', href: '#agentes' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

// ─── Servicios ────────────────────────────────────────────────────────────────
export const PRODUCTOS_AGENTICOS = [
  {
    id: 'erp-agentico',
    categoria: 'Producto Agéntico',
    titulo: 'ERP Agéntico',
    descripcion:
      'Sistema de planificación empresarial operado por agentes IA. Gestiona inventario, finanzas, compras y operaciones sin intervención manual. Tu empresa funciona aunque nadie esté mirando.',
    precio: null,
    cta: 'Agendar demostración',
    ctaHref: 'mailto:contacto@zyvo.ai?subject=Demo ERP Agéntico',
    icon: BarChart3,
    destacado: true,
    tags: ['Claude AI', 'n8n', 'Supabase', 'PostgreSQL'],
  },
  {
    id: 'crm-agentico',
    categoria: 'Producto Agéntico',
    titulo: 'CRM Agéntico',
    descripcion:
      'Pipeline de ventas con agentes que califican leads, hacen seguimiento automático, redactan propuestas y cierran ciclos sin que el equipo toque cada contacto.',
    precio: null,
    cta: 'Agendar demostración',
    ctaHref: 'mailto:contacto@zyvo.ai?subject=Demo CRM Agéntico',
    icon: Users,
    destacado: false,
    tags: ['Claude AI', 'n8n', 'Supabase'],
  },
  {
    id: 'lms-agentico',
    categoria: 'Producto Agéntico',
    titulo: 'LMS Agéntico',
    descripcion:
      'Sistema de aprendizaje empresarial con tutor IA personalizado. Onboarding de empleados, capacitación continua y evaluación automatizada que se adapta a cada persona.',
    precio: null,
    cta: 'Agendar demostración',
    ctaHref: 'mailto:contacto@zyvo.ai?subject=Demo LMS Agéntico',
    icon: GraduationCap,
    destacado: false,
    tags: ['Claude AI', 'n8n', 'Qdrant'],
  },
]

export const SERVICIOS_ARQUITECTURA = [
  {
    id: 'auditoria',
    categoria: 'Servicio de Arquitectura',
    titulo: 'Auditoría de Fricción Operativa',
    descripcion:
      'Diagnóstico financiero de dónde se pierde tiempo y dinero. Entregable: roadmap de automatización priorizado por ROI. El primer paso obligatorio antes de cualquier implementación.',
    precio: 'Desde $250 USD',
    precioDetalle: 'Se paga sola en el primer mes',
    cta: 'Solicitar auditoría',
    ctaHref: '#auditoria',
    icon: Search,
    destacado: true,
    tags: ['Diagnóstico', 'Roadmap', 'ROI'],
  },
  {
    id: 'agentes-ia',
    categoria: 'Servicio de Arquitectura',
    titulo: 'Arquitectura de Agentes IA',
    descripcion:
      'Diseño e implementación de agentes autónomos custom para procesos específicos de tu negocio. Empleados digitales con memoria, razonamiento y autonomía real.',
    precio: 'Desde $1,200 USD',
    precioDetalle: 'Por agente implementado',
    cta: 'Conocer más',
    ctaHref: 'mailto:contacto@zyvo.ai?subject=Arquitectura de Agentes IA',
    icon: Network,
    destacado: false,
    tags: ['Claude AI', 'n8n', 'Supabase', 'Qdrant'],
  },
  {
    id: 'automatizaciones',
    categoria: 'Servicio de Arquitectura',
    titulo: 'Automatizaciones con n8n',
    descripcion:
      'Flujos de trabajo automatizados con n8n self-hosted. Integraciones entre sistemas, eliminación de trabajo manual repetitivo. Self-hosted = soberanía total de datos.',
    precio: 'Desde $800 USD',
    precioDetalle: 'Por flujo implementado',
    cta: 'Conocer más',
    ctaHref: 'mailto:contacto@zyvo.ai?subject=Automatizaciones n8n',
    icon: Workflow,
    destacado: false,
    tags: ['n8n', 'Docker', 'Self-hosted'],
  },
]

// ─── Agentes IA ───────────────────────────────────────────────────────────────
export const AGENTES_IA = [
  {
    id: 'sdr',
    nombre: 'Agente SDR',
    descripcion:
      'Califica leads entrantes, responde preguntas frecuentes, agenda llamadas y actualiza el CRM automáticamente. Trabaja 24/7 sin descanso ni comisiones.',
    metricas: ['Procesa 200 leads/día', 'Responde en < 30 segundos', 'Ahorra 40 hrs/semana'],
    stack: ['Claude AI', 'n8n', 'Supabase'],
    icon: '🎯',
    color: '#D4AF37',
  },
  {
    id: 'onboarding',
    nombre: 'Agente Onboarding',
    descripcion:
      'Guía a nuevos empleados o clientes a través del proceso de incorporación. Responde dudas en tiempo real, asigna tareas y reporta avances al equipo.',
    metricas: ['Reduce tiempo de onboarding 60%', 'Disponible 24/7', 'Aprende de cada interacción'],
    stack: ['Claude AI', 'n8n', 'LMS'],
    icon: '🚀',
    color: '#4A7FD4',
  },
  {
    id: 'contabilidad',
    nombre: 'Agente Contabilidad',
    descripcion:
      'Procesa facturas, categoriza gastos, genera reportes financieros y detecta anomalías en el estado de resultados antes de que se conviertan en problemas.',
    metricas: ['Procesa 500 facturas/día', 'Detecta anomalías en tiempo real', 'Genera reportes automáticos'],
    stack: ['Claude AI', 'n8n', 'PostgreSQL'],
    icon: '📊',
    color: '#264653',
  },
  {
    id: 'soporte',
    nombre: 'Agente Soporte',
    descripcion:
      'Resuelve tickets de soporte nivel 1 y 2, escala casos complejos a humanos con contexto completo. Aprende de cada interacción para mejorar continuamente.',
    metricas: ['Resuelve 80% sin humano', 'Tiempo de respuesta < 1 min', 'CSAT promedio 4.8/5'],
    stack: ['Claude AI', 'n8n', 'Qdrant'],
    icon: '🛡️',
    color: '#1D3557',
  },
  {
    id: 'customer-success',
    nombre: 'Agente Customer Success',
    descripcion:
      'Monitorea el health score de cada cliente, detecta señales de churn antes de que ocurran, genera reportes de ROI y programa QBRs automáticamente.',
    metricas: ['Reduce churn 35%', 'Health score en tiempo real', 'QBRs automáticos'],
    stack: ['Claude AI', 'n8n', 'Supabase'],
    icon: '💎',
    color: '#D4AF37',
  },
  {
    id: 'propuestas',
    nombre: 'Agente Propuestas',
    descripcion:
      'Genera propuestas comerciales personalizadas basadas en la auditoría de fricción. Calcula ROI proyectado, prepara contratos y hace seguimiento automático.',
    metricas: ['Propuesta lista en 15 min', 'ROI calculado con precisión', 'Seguimiento automático'],
    stack: ['Claude AI', 'n8n', 'PostgreSQL'],
    icon: '📋',
    color: '#4A7FD4',
  },
]

// ─── Proceso ZYVO ─────────────────────────────────────────────────────────────
export const FASES_PROCESO = [
  {
    numero: 1,
    nombre: 'Atracción y primer contacto',
    descripcion: 'El PyME descubre ZYVO a través de contenido técnico o referencia directa.',
    icon: '📡',
  },
  {
    numero: 2,
    nombre: 'Calificación del lead',
    descripcion: 'Verificamos que el negocio cumple el perfil: >$100K MXN/mes, procesos definidos, disposición al cambio.',
    icon: '🔍',
  },
  {
    numero: 3,
    nombre: 'Auditoría de Fricción',
    descripcion: 'Diagnóstico profundo de procesos operativos. Identificamos fugas, cuellos de botella y oportunidades de automatización.',
    icon: '🔬',
  },
  {
    numero: 4,
    nombre: 'Propuesta y cierre',
    descripcion: 'Presentamos roadmap priorizado con ROI proyectado por fase. Precio justo, valor demostrable.',
    icon: '📄',
  },
  {
    numero: 5,
    nombre: 'Kickoff técnico',
    descripcion: 'Acceso a sistemas, reunión de arquitectura, definición de stack y establecimiento de KPIs.',
    icon: '⚡',
  },
  {
    numero: 6,
    nombre: 'Onboarding intensivo',
    descripcion: 'Capacitación del equipo cliente en los nuevos flujos. Resistencia cero al cambio.',
    icon: '🎓',
  },
  {
    numero: 7,
    nombre: 'Traducción a lógica ejecutable',
    descripcion: 'Convertimos procesos en papel a lógica de sistema. Cada regla de negocio se vuelve código.',
    icon: '⚙️',
  },
  {
    numero: 8,
    nombre: 'Construcción del sistema',
    descripcion: 'Build acelerado con agentes IA, n8n, Supabase. Self-hosted desde el día uno.',
    icon: '🏗️',
  },
  {
    numero: 9,
    nombre: 'Pruebas y validación',
    descripcion: 'Human-in-the-loop en fase crítica. Cero tolerancia a errores antes del go-live.',
    icon: '✅',
  },
  {
    numero: 10,
    nombre: 'Entrega y posventa',
    descripcion: 'Go-live monitoreado, estabilización de 30 días, retainer opcional para mejora continua.',
    icon: '🚀',
  },
]

// ─── Métricas ─────────────────────────────────────────────────────────────────
export const METRICAS = [
  {
    valor: 3,
    sufijo: 'x',
    label: 'ROI mínimo',
    descripcion: 'Sobre el costo de implementación, garantizado contractualmente',
    icon: TrendingUp,
    color: '#D4AF37',
  },
  {
    valor: 85,
    sufijo: '%',
    label: 'Reducción de carga manual',
    descripcion: 'De tareas operativas repetitivas eliminadas en el primer trimestre',
    icon: Zap,
    color: '#4A7FD4',
  },
  {
    valor: 425,
    prefijo: '$',
    sufijo: ' USD',
    label: 'Ahorro mensual',
    descripcion: 'Por cada administrativo automatizado con sistema agéntico',
    icon: Activity,
    color: '#264653',
  },
  {
    valor: 99.9,
    sufijo: '%',
    label: 'Uptime garantizado',
    descripcion: 'Infraestructura self-hosted con redundancia y monitoreo 24/7',
    icon: Shield,
    color: '#1D3557',
  },
]

// ─── Tech Stack ───────────────────────────────────────────────────────────────
export const TECH_STACK = [
  { nombre: 'n8n', descripcion: 'Automatización de flujos', categoria: 'Orquestación' },
  { nombre: 'Docker', descripcion: 'Contenedorización', categoria: 'Infraestructura' },
  { nombre: 'PostgreSQL', descripcion: 'Base de datos relacional', categoria: 'Datos' },
  { nombre: 'Redis', descripcion: 'Caché y colas', categoria: 'Infraestructura' },
  { nombre: 'Qdrant', descripcion: 'Base de datos vectorial', categoria: 'IA' },
  { nombre: 'Supabase', descripcion: 'Backend as a Service', categoria: 'Backend' },
  { nombre: 'Claude AI', descripcion: 'Modelo de lenguaje', categoria: 'IA' },
  { nombre: 'Next.js', descripcion: 'Framework frontend', categoria: 'Frontend' },
]

// ─── Datos Financieros ────────────────────────────────────────────────────────
export const DATOS_FINANCIEROS = {
  salarioMinimoMX2026: 315.04,
  costoRealEmpleadoMes: 14468,
  porcentajeCargaSocial: '46-51%',
  horasPerdidasManual: 40,
  ahorroMensualUSD: 425,
  roiMinimo: 3,
  reduccionCargaManual: 85,
  reduccionCurvaAprendizaje: 60,
  uptimeGarantizado: 99.9,
  precioAuditoriaMin: 250,
  precioAuditoriaMax: 500,
  retainerDesde: 400,
}
