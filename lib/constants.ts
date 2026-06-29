export const empleados = [
  { id:'directiva', nombre:'Asistente Directiva IA', badge:'Producto de Entrada', badgeColor:'violet' as const, descripcion:'Tu mano derecha digital disponible 24/7.', capacidades:['Gestiona agenda, correos y prioridades','Redacta, resume y da seguimiento','Aprende el contexto de tu negocio'], destacado:true, emoji:'🧠' },
  { id:'ventas', nombre:'Agente de Ventas', badge:'Comercial', badgeColor:'cyan' as const, descripcion:'Pipeline que se mueve solo.', capacidades:['Califica leads automáticamente','Da seguimiento sin que nadie lo persiga','Mueve prospectos por el pipeline'], destacado:false, emoji:'📈' },
  { id:'atencion', nombre:'Agente de Atención', badge:'Soporte', badgeColor:'cyan' as const, descripcion:'Sin tiempos de espera, sin horarios.', capacidades:['Responde al instante en todos los canales','Resuelve, filtra y escala casos','Atención 24/7 sin aumentar nómina'], destacado:false, emoji:'⚡' },
  { id:'marketing', nombre:'Agente de Marketing', badge:'Contenido', badgeColor:'purple' as const, descripcion:'Contenido en piloto automático.', capacidades:['Genera copies e imágenes con IA','Programa y publica en redes','Reporta rendimiento en tiempo real'], destacado:false, emoji:'🎨' },
  { id:'recepcionista', nombre:'Recepcionista Digital', badge:'Atención', badgeColor:'violet' as const, descripcion:'Tu primera línea, siempre activa.', capacidades:['Recibe, filtra y dirige cada contacto','Responde básicos, escala lo urgente','Cero oportunidades perdidas'], destacado:false, emoji:'🔀' },
  { id:'rrhh', nombre:'Agente de RRHH', badge:'Interno', badgeColor:'purple' as const, descripcion:'Onboarding y gestión interna automáticos.', capacidades:['Gestiona onboarding de colaboradores','Responde dudas internas y políticas','Automatiza procesos de personal'], destacado:false, emoji:'👥' },
]

export const pasos = [
  { numero:'00', titulo:'Auditoría de Fricción', descripcion:'Auditamos tus procesos, identificamos dónde pierdes tiempo y dinero y entregamos un mapa de oportunidades priorizado por impacto financiero real.', tiempo:'1–3 días hábiles', badge:'Gratuita durante lanzamiento' },
  { numero:'01', titulo:'Diagnóstico y Roadmap', descripcion:'Presentamos los resultados, definimos qué se automatiza primero y diseñamos la arquitectura del sistema específico para tu operación.', tiempo:'Incluido en auditoría', badge:null },
  { numero:'02', titulo:'Diseño e Implementación', descripcion:'Construimos los sistemas sobre tu infraestructura. Sin vendor lock-in, sin dependencias externas. Todo queda bajo tu control.', tiempo:'7–14 días hábiles', badge:null },
  { numero:'03', titulo:'Estabilización y Mejora', descripcion:'Monitoreamos en producción, corregimos lo necesario y mejoramos de forma iterativa según los resultados reales.', tiempo:'Continuo', badge:null },
]
