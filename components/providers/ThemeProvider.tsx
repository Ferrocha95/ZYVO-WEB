'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

// Envuelve la app con next-themes.
// - attribute="class": aplica la clase "light" / "dark" en <html>
// - defaultTheme="system" + enableSystem: sigue la preferencia del sistema
// - la elección del visitante se recuerda (localStorage) y no parpadea al cargar
//   (next-themes inyecta un script bloqueante; <html> lleva suppressHydrationWarning)
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
