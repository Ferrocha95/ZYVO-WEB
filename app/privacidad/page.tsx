import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Aviso de Privacidad — ZYVO',
  description:
    'Aviso de Privacidad de ZYVO conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) y su Reglamento.',
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-zyvo-dark pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zyvo-white/40 text-sm hover:text-zyvo-white/70 transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={20} className="text-zyvo-gold/60" />
            <span className="text-zyvo-white/30 text-xs uppercase tracking-widest font-medium">
              Documento legal
            </span>
          </div>
          <h1 className="font-(family-name:--font-instrument-serif) text-4xl md:text-5xl text-zyvo-white leading-tight mb-3">
            Aviso de Privacidad
          </h1>
          <p className="text-zyvo-white/40 text-sm">
            Última actualización: mayo 2026
          </p>
          <div className="mt-4 h-px bg-linear-to-r from-zyvo-gold/30 via-zyvo-gold/10 to-transparent" />
        </div>

        {/* Sections */}
        <div className="space-y-10 text-zyvo-white/65 text-sm leading-relaxed">

          <Section title="1. Responsable del tratamiento de datos personales">
            <p>
              <strong className="text-zyvo-white/85">ZYVO</strong> (en adelante "el Responsable"), con domicilio en México,
              es responsable del tratamiento de sus datos personales. Para cualquier consulta relacionada
              con este aviso de privacidad, puede contactarnos a través del correo electrónico{' '}
              <a href="mailto:direccion@zyvo.com.mx" className="text-zyvo-gold/80 hover:text-zyvo-gold transition-colors">
                direccion@zyvo.com.mx
              </a>.
            </p>
          </Section>

          <Section title="2. Datos personales que recabamos">
            <p>Para las finalidades descritas en este aviso, el Responsable podrá recabar los siguientes datos personales:</p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-zyvo-gold/40">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono / WhatsApp</li>
              <li>Nombre de empresa u organización</li>
              <li>Facturación mensual aproximada (rango)</li>
              <li>Descripción del proceso o necesidad de negocio</li>
            </ul>
            <p className="mt-3">
              No recabamos datos personales sensibles conforme a la definición establecida en el artículo 3,
              fracción VI de la LFPDPPP.
            </p>
          </Section>

          <Section title="3. Finalidades del tratamiento">
            <p>Sus datos personales serán utilizados para las siguientes finalidades <strong className="text-zyvo-white/85">primarias</strong> (necesarias para la relación jurídica):</p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-zyvo-gold/40">
              <li>Contactarle para atender su solicitud de auditoría de fricción operativa o consulta.</li>
              <li>Dar seguimiento a los proyectos de automatización e inteligencia artificial contratados.</li>
              <li>Elaborar propuestas comerciales personalizadas.</li>
              <li>Cumplir con las obligaciones derivadas de la relación contractual.</li>
            </ul>
            <p className="mt-4">Finalidades <strong className="text-zyvo-white/85">secundarias</strong> (requieren su consentimiento):</p>
            <ul className="mt-3 space-y-2 list-disc list-inside marker:text-zyvo-white/20">
              <li>Envío de información sobre nuevos servicios, productos o contenido educativo de ZYVO.</li>
              <li>Realización de encuestas de satisfacción.</li>
            </ul>
            <p className="mt-3">
              Si no desea que sus datos sean tratados para las finalidades secundarias, puede manifestarlo
              enviando un correo a{' '}
              <a href="mailto:direccion@zyvo.com.mx" className="text-zyvo-gold/80 hover:text-zyvo-gold transition-colors">
                direccion@zyvo.com.mx
              </a>{' '}
              con el asunto "Oposición finalidades secundarias".
            </p>
          </Section>

          <Section title="4. Transferencia de datos personales">
            <p>
              ZYVO no realiza transferencias de datos personales a terceros, salvo aquellas que sean necesarias
              para la prestación del servicio contratado (por ejemplo, plataformas de infraestructura tecnológica
              como Supabase o servicios de comunicación), o cuando la transferencia sea requerida por autoridad
              competente en términos de la ley aplicable.
            </p>
            <p className="mt-3">
              En todo caso, los encargados de tratamiento están obligados contractualmente a guardar la misma
              confidencialidad que el Responsable.
            </p>
          </Section>

          <Section id="lfpdppp" title="5. Derechos ARCO y mecanismo para ejercerlos">
            <p>
              Usted tiene derecho a <strong className="text-zyvo-white/85">Acceder, Rectificar, Cancelar u Oponerse</strong> (derechos ARCO)
              al tratamiento de sus datos personales, conforme a lo establecido en la LFPDPPP y su Reglamento.
            </p>
            <p className="mt-3">Para ejercer sus derechos ARCO, deberá enviar una solicitud a:</p>
            <div className="mt-3 glass rounded-xl p-4 space-y-1">
              <p><strong className="text-zyvo-white/85">Correo:</strong>{' '}
                <a href="mailto:direccion@zyvo.com.mx" className="text-zyvo-gold/80 hover:text-zyvo-gold transition-colors">
                  direccion@zyvo.com.mx
                </a>
              </p>
              <p><strong className="text-zyvo-white/85">Asunto:</strong> Solicitud ARCO</p>
            </div>
            <p className="mt-3">Su solicitud deberá contener:</p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside marker:text-zyvo-gold/40">
              <li>Nombre completo y correo electrónico con el que se registró.</li>
              <li>Descripción clara de los datos sobre los que ejerce su derecho.</li>
              <li>Documento que acredite su identidad.</li>
            </ul>
            <p className="mt-3">
              El Responsable responderá en un plazo máximo de <strong className="text-zyvo-white/85">20 días hábiles</strong> contados
              a partir de la fecha de recepción de la solicitud.
            </p>
          </Section>

          <Section title="6. Uso de cookies y tecnologías de rastreo">
            <p>
              Este sitio web puede utilizar cookies propias y de terceros para mejorar la experiencia de
              navegación, analizar el tráfico y, en su caso, mostrar contenido relevante. Al navegar en
              nuestro sitio, usted acepta el uso de cookies conforme a su configuración de privacidad.
            </p>
            <p className="mt-3">
              Puede gestionar o desactivar las cookies desde la configuración de su navegador. También puede
              modificar sus preferencias a través del banner de cookies disponible en el sitio.
            </p>
            <p className="mt-3">
              Las cookies esenciales son necesarias para el funcionamiento técnico del sitio y no pueden
              desactivarse sin afectar la experiencia.
            </p>
          </Section>

          <Section title="7. Modificaciones al aviso de privacidad">
            <p>
              El Responsable se reserva el derecho de efectuar en cualquier momento modificaciones o
              actualizaciones al presente aviso de privacidad. Estas modificaciones estarán disponibles
              al público a través de esta misma página web. Le recomendamos revisar este aviso periódicamente.
            </p>
          </Section>

          <Section title="8. Autoridad competente">
            <p>
              Si considera que el Responsable ha vulnerado su derecho a la protección de datos personales,
              tiene derecho a acudir ante el Instituto Nacional de Transparencia, Acceso a la Información
              y Protección de Datos Personales (INAI) en{' '}
              <span className="text-zyvo-white/85">www.inai.org.mx</span>.
            </p>
          </Section>

        </div>

        {/* Footer note */}
        <div className="mt-16 pt-6 border-t border-white/4 flex items-center gap-2 text-zyvo-white/20 text-xs">
          <Shield size={11} className="text-zyvo-gold/30 shrink-0" />
          <span>
            Documento elaborado conforme a la{' '}
            <strong className="text-zyvo-white/35">LFPDPPP</strong>
            {' '}y su Reglamento vigente en los Estados Unidos Mexicanos.
          </span>
        </div>

      </div>
    </div>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id?: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id}>
      <h2 className="font-(family-name:--font-instrument-serif) text-xl text-zyvo-white/90 mb-4">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}
