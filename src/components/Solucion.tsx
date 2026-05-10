import { useEffect, useRef } from 'react'

const checks = [
  'Sin consultorías de miles de dólares',
  'Procesos versionados, trazables, auditables',
  'Onboarding en horas, no en semanas',
  'Sin manuales en PDF que nadie lee',
]

const CheckIcon = () => (
  <svg
    width="8" height="8" viewBox="0 0 14 14" fill="none"
    stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
  >
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
        #solucion [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        #solucion [data-reveal].revealed {
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
          paddingTop: '5.5rem',
          paddingBottom: '1.5rem',
          overflow: 'hidden',
          marginTop: '-100vh',
          borderRadius: '1.25rem 1.25rem 0 0',
          boxShadow: '0 -20px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 55% 40% at 75% 30%, rgba(233,225,255,0.045) 0%, transparent 70%),
            radial-gradient(ellipse 40% 50% at 15% 70%, rgba(199,231,242,0.04) 0%, transparent 65%)
          `,
        }} />

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
            gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,1fr)',
            gap: 'clamp(3rem, 6vw, 6rem)',
            alignItems: 'center',
          }}
        >
          <div
            className="sol-copy-col"
            data-reveal
            data-delay="0"
            style={{ display: 'flex', flexDirection: 'column', gap: '1.375rem' }}
          >
            <span style={{
              display: 'inline-flex', alignSelf: 'flex-start',
              alignItems: 'center', gap: '0.5rem',
              fontSize: '0.6875rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: 'rgba(233,225,255,0.07)',
              color: 'rgba(233,225,255,0.65)',
              border: '1px solid rgba(233,225,255,0.11)',
              borderRadius: '9999px',
              padding: '0.3rem 0.9rem',
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: 'rgba(233,225,255,0.7)', flexShrink: 0,
              }} />
              La solución
            </span>

            <h2 style={{
              fontSize: 'clamp(1.875rem, 3.5vw, 2.875rem)',
              fontWeight: 800,
              color: 'var(--color-text-dark)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: 0,
            }}>
              El conocimiento de tu equipo, convertido en proceso ejecutable.
            </h2>

            <p style={{
              fontSize: '1rem', lineHeight: 1.65,
              color: 'rgba(247,245,242,0.42)',
              margin: 0, maxWidth: '40ch',
            }}>
              Describís cómo trabajan, en lenguaje natural. La IA arma el proceso
              versionado, listo para que tu equipo lo siga.
            </p>

            <div style={{
              background: 'rgba(233,225,255,0.04)',
              border: '1px solid rgba(233,225,255,0.07)',
              borderRadius: '0.75rem',
              padding: '1.25rem 1.375rem',
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
                      gap: '0.75rem',
                      fontSize: '0.9375rem',
                      color: 'rgba(247,245,242,0.72)',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 20, height: 20, borderRadius: '50%',
                      background: 'var(--color-primary)',
                      color: '#fff', flexShrink: 0, marginTop: 1,
                    }}>
                      <CheckIcon />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="sol-video-col" data-reveal data-delay="150">
            <div style={{
              position: 'relative',
              borderRadius: '0.875rem',
              background: '#111518',
              border: '1px solid rgba(199,231,242,0.10)',
              overflow: 'hidden',
              aspectRatio: '4 / 3',
              boxShadow: '0 0 0 1px rgba(199,231,242,0.05)',
            }}>
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0,
                backgroundImage: `radial-gradient(circle, rgba(233,225,255,0.07) 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
              }} />

              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: '0.625rem',
              }}>
                <button
                  aria-label="Reproducir demo"
                  style={{
                    width: 58, height: 58, borderRadius: '50%',
                    background: 'var(--color-primary)',
                    color: '#fff', border: 'none', cursor: 'pointer',
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
                  color: 'rgba(247,245,242,0.4)',
                }}>
                  Demo · 30–60s
                </span>
                <span style={{
                  fontSize: '0.625rem', fontWeight: 700,
                  color: 'rgba(199,231,242,0.4)',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  Flujo completo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
