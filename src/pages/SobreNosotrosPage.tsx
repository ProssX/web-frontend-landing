import { useEffect } from 'react'

export default function SobreNosotrosPage() {
  useEffect(() => { document.title = 'Sobre nosotros — Proocess' }, [])
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        paddingBlock: 'clamp(6rem, 12vw, 10rem)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            marginBottom: '1rem',
          }}
        >
          Sobre nosotros
        </h1>
        <p style={{ color: 'rgba(var(--color-ink-rgb), 0.5)', fontSize: '1.125rem' }}>
          Próximamente.
        </p>
      </div>
    </section>
  )
}
