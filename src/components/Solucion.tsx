import { useEffect, useRef } from 'react'

const checks = [
  'Sin consultorías que cuestan miles de dólares',
  'Sin manuales en PDF que nadie lee',
  'Procesos versionados, trazables, auditables',
  'Onboarding de nuevo personal: en horas, no en semanas',
]

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2 7l3 3 7-7" />
  </svg>
)

export default function Solucion() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reveals = section.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.transitionDelay = `${el.dataset.delay ?? '0'}ms`
            el.classList.add('revealed')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 720px) {
          #solucion .sol-grid {
            grid-template-columns: 1fr !important;
          }
          #solucion .sol-video-col { order: 2; }
          #solucion .sol-copy-col  { order: 1; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="solucion"
        style={{
          position: 'relative',
          zIndex: 3,
          background: 'var(--color-surface-dark)',
          color: 'var(--color-text-dark)',
          paddingBlock: '5.5rem',
          overflow: 'hidden',
          borderTop: '1px solid rgba(233,225,255,0.06)',
        }}
      >
        {/* ── Ambient background glows ── */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 55% 40% at 75% 30%, rgba(233,225,255,0.045) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 15% 70%, rgba(199,231,242,0.04) 0%, transparent 65%)
          `,
        }} />

        {/* ── Lavanda dot grid (decorative) ── */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle, rgba(233,225,255,0.09) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 80% 40%, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 80% 40%, black 0%, transparent 70%)',
        }} />

        <div
          className="container sol-grid"
          style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.1fr)',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'center',
          }}
        >

          {/* ── Video placeholder ── */}
          <div className="sol-video-col" data-reveal data-delay="0">
            <div
              style={{
                position: 'relative',
                borderRadius: '0.875rem',
                background: '#1b2229',
                /* Celeste border — informative container */
                border: '1px solid rgba(199,231,242,0.14)',
                overflow: 'hidden',
                aspectRatio: '16 / 11',
                boxShadow: '0 0 0 1px rgba(199,231,242,0.05), 0 24px 48px rgba(0,0,0,0.35)',
              }}
            >
              {/* Lavanda grid texture */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0,
                backgroundImage: `
                  linear-gradient(rgba(233,225,255,0.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(233,225,255,0.04) 1px, transparent 1px)
                `,
                backgroundSize: '32px 32px',
              }} />

              {/* Celeste corner glow (top-left) */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: 0, left: 0,
                width: 160, height: 120,
                background: 'radial-gradient(ellipse at top left, rgba(199,231,242,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }} />

              {/* Inner content */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '0.75rem', textAlign: 'center', padding: '1.5rem',
              }}>
                <button
                  aria-label="Reproducir demo"
                  style={{
                    width: 58, height: 58,
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                    color: '#fff',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 0 0 10px rgba(249,80,104,0.10)',
                    marginBottom: '0.375rem',
                    transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)'
                    e.currentTarget.style.boxShadow = '0 0 0 16px rgba(249,80,104,0.07)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                    e.currentTarget.style.boxShadow = '0 0 0 10px rgba(249,80,104,0.10)'
                  }}
                >
                  <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                    <path d="M9 6.5v15l12-7.5L9 6.5z" fill="currentColor" />
                  </svg>
                </button>

                <span style={{
                  fontSize: '0.8125rem', fontWeight: 600,
                  color: 'rgba(247,245,242,0.5)',
                }}>
                  Demo de elicitación con IA
                </span>

                {/* Celeste hint — informative label */}
                <span style={{
                  fontSize: '0.625rem', fontWeight: 700,
                  color: 'rgba(199,231,242,0.5)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  30–60s · Flujo completo
                </span>
              </div>
            </div>
          </div>

          {/* ── Copy ── */}
          <div
            className="sol-copy-col"
            data-reveal
            data-delay="150"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.375rem' }}
          >
            {/* Eyebrow — lavanda tint */}
            <span style={{
              display: 'inline-flex', alignSelf: 'flex-start',
              alignItems: 'center', gap: '0.5rem',
              fontSize: '0.6875rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: 'rgba(233,225,255,0.07)',
              color: 'rgba(233,225,255,0.6)',
              border: '1px solid rgba(233,225,255,0.11)',
              borderRadius: '9999px',
              padding: '0.3rem 0.9rem',
            }}>
              {/* Lavanda dot */}
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: 'rgba(233,225,255,0.7)',
                flexShrink: 0,
              }} />
              La solución
            </span>

            {/* Headline */}
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.875rem, 3.5vw, 2.875rem)',
                fontWeight: 700,
                color: 'var(--color-text-dark)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              Convertimos el conocimiento de tu equipo en{' '}
              <span style={{ color: 'var(--color-text-dark)', opacity: 1 }}>
                procesos ejecutables.
              </span>
            </h2>

            {/* Subtitle */}
            <p style={{
              fontSize: '1rem', lineHeight: 1.7,
              color: 'rgba(247,245,242,0.45)',
              margin: 0, maxWidth: '46ch',
            }}>
              Vos describís cómo trabajan, en lenguaje natural. La IA arma el proceso versionado,
              listo para que tu equipo lo siga.
            </p>

            {/* Checklist — lavanda card container */}
            <div style={{
              background: 'rgba(233,225,255,0.035)',
              border: '1px solid rgba(233,225,255,0.07)',
              borderRadius: '0.75rem',
              padding: '1.25rem 1.375rem',
              marginTop: '0.25rem',
            }}>
              <ul style={{
                listStyle: 'none', margin: 0, padding: 0,
                display: 'flex', flexDirection: 'column', gap: '0.875rem',
              }}>
                {checks.map((text) => (
                  <li
                    key={text}
                    style={{
                      display: 'flex', alignItems: 'flex-start',
                      gap: '0.875rem',
                      fontSize: '0.9375rem',
                      color: 'rgba(247,245,242,0.72)',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 21, height: 21,
                      borderRadius: '50%',
                      background: 'var(--color-primary)',
                      color: '#fff',
                      flexShrink: 0,
                      marginTop: 1,
                    }}>
                      <CheckIcon />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
