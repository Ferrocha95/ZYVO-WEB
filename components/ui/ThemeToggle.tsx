'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

// Interruptor noche/día. Usa resolvedTheme (resuelve "system" a light/dark).
// Antes de montar renderiza un hueco estable para no provocar hydration mismatch.
export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'
  // Etiqueta estable antes de montar (evita hydration mismatch: el tema del
  // servidor no se conoce hasta que next-themes resuelve en el cliente).
  const label = mounted ? (isDark ? 'Activar modo día' : 'Activar modo noche') : 'Cambiar tema'

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 text-ink/70 hover:text-ink hover:border-cyan/40 transition-colors ${className}`}
    >
      {mounted ? (isDark ? <Sun size={16} /> : <Moon size={16} />) : <span className="w-4 h-4" />}
    </button>
  )
}
