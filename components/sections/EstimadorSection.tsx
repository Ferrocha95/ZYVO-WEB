'use client'

import { useState } from 'react'
import SectionHeading from './SectionHeading'

const fmt = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

// Estimador de fricción. Fórmula visible, sin % de recuperación ni promesa de ahorro.
// costo mensual = personas × horas/semana × 4.33 × costo/hora
export default function EstimadorSection() {
  const [personas, setPersonas] = useState(3)
  const [horas, setHoras] = useState(10)
  const [costo, setCosto] = useState(120)

  const mensual = personas * horas * 4.33 * costo

  return (
    <section id="estimador" className="scroll-mt-24 px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          n="08"
          eyebrow="Estimador de fricción"
          title="El costo mensual de operar a mano"
          intro="Una estimación de cuánto te cuesta el tiempo que tu equipo dedica a tareas repetitivas. No es una promesa de ahorro."
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-stretch">
          {/* Controles */}
          <div className="rounded-2xl border border-white/8 bg-surface/40 p-6 space-y-7">
            <Control
              label="Personas en tareas repetitivas"
              value={`${personas}`}
              min={1} max={50} step={1} current={personas}
              onChange={setPersonas}
            />
            <Control
              label="Horas por semana (cada una)"
              value={`${horas} h`}
              min={1} max={40} step={1} current={horas}
              onChange={setHoras}
            />
            <Control
              label="Costo por hora"
              value={fmt.format(costo)}
              min={40} max={800} step={10} current={costo}
              onChange={setCosto}
            />

            {/* Fórmula visible */}
            <div className="pt-2 border-t border-white/6">
              <p className="font-mono text-xs text-muted leading-relaxed">
                costo mensual = personas × horas/semana × 4.33 × costo/hora
              </p>
              <p className="font-mono text-xs text-ink/70 mt-1">
                = {personas} × {horas} × 4.33 × {fmt.format(costo)}
              </p>
            </div>
          </div>

          {/* Resultado */}
          <div className="rounded-2xl border border-cyan/20 bg-cyan/4 p-8 flex flex-col justify-center items-center text-center lg:min-w-75">
            <span className="text-xs uppercase tracking-[0.2em] text-muted">Costo mensual estimado</span>
            <span className="mt-2 font-display font-extrabold text-4xl md:text-5xl text-gradient leading-none">
              {fmt.format(mensual)}
            </span>
            <span className="mt-3 text-xs text-muted">
              Ese es el tiempo operativo que un sistema puede ayudarte a liberar.
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Control({
  label, value, min, max, step, current, onChange,
}: {
  label: string
  value: string
  min: number
  max: number
  step: number
  current: number
  onChange: (n: number) => void
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm text-ink/80">{label}</label>
        <span className="font-mono text-sm text-cyan">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={e => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-cyan cursor-pointer"
      />
    </div>
  )
}
