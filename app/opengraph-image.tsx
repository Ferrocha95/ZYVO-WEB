import { ImageResponse } from 'next/og'

// OG image dinámica (1200×630) generada con la identidad 2026.
export const alt = 'ZYVO — Crece sin perder el control'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '96px',
          background: '#0A0A0B',
          color: '#F5F7FA',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '44px' }}>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-1px' }}>ZYVO</div>
          <div style={{ width: 11, height: 11, borderRadius: 999, background: '#00E5FF' }} />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', fontSize: 78, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2px' }}>
          <span>Crece sin perder el&nbsp;</span>
          <span style={{ color: '#00E5FF' }}>control.</span>
        </div>

        <div style={{ display: 'flex', fontSize: 30, color: '#8B93A1', marginTop: '36px' }}>
          Sistemas inteligentes · Human in the loop
        </div>

        <div style={{ display: 'flex', height: 6, width: 220, marginTop: '48px', borderRadius: 999, background: 'linear-gradient(90deg,#00E5FF,#2F6BFF)' }} />
      </div>
    ),
    { ...size },
  )
}
