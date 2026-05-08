import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '01',
    title: 'Contás cómo trabajás',
    desc: 'En lenguaje natural, como se lo explicarías a alguien nuevo. La IA te guía con preguntas clave.',
    hint: 'Paso 1 · 8–10s',
    delay: 0,
  },
  {
    number: '02',
    title: 'La IA estructura tu proceso',
    desc: 'Genera el diagrama BPMN, identifica tareas, responsables y versiones. En minutos.',
    hint: 'Paso 2 · 8–10s',
    delay: 150,
  },
  {
    number: '03',
    title: 'Tu equipo ejecuta sobre algo claro',
    desc: 'Cada persona sabe qué hacer, cuándo, y con qué criterio. Sin preguntar de nuevo.',
    hint: 'Paso 3 · 8–10s',
    delay: 300,
  },
]

const ArrowConnector = () => (
  <svg width="48" height="16" viewBox="0 0 48 16" fill="none" aria-hidden="true">
    <path
      d="M0 8 L40 8 M34 2 L40 8 L34 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default function ComoFunciona() {
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
      { threshold: 0.1 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        #como-funciona [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        #como-funciona [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }
        #como-funciona .steps-grid {
          display: grid;
          grid-template-columns: 1fr 48px 1fr 48px 1fr;
          gap: 0;
          align-items: start;
        }
        #como-funciona .step-connector {
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 2.75rem;
          color: rgba(26, 30, 35, 0.18);
          flex-shrink: 0;
        }
        @media (max-width: 720px) {
          #como-funciona .steps-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          #como-funciona .step-connector {
            display: none;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="como-funciona"
        style={{
          position: 'relative',
          zIndex: 4,
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
          paddingBlock: '5.5rem',
          overflow: 'hidden',
          marginTop: '-2rem',
          boxShadow: '0 -24px 64px rgba(0,0,0,0.12)',
        }}
      >
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>

          {/* Header */}
          <div
            data-reveal
            data-delay="0"
            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.6875rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              background: 'rgba(249,80,104,0.07)',
              color: 'var(--color-primary)',
              border: '1px solid rgba(249,80,104,0.14)',
              borderRadius: '9999px',
              padding: '0.3rem 0.9rem',
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: 'var(--color-primary)',
                flexShrink: 0,
              }} />
              Cómo funciona
            </span>

            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.875rem, 3.5vw, 2.875rem)',
                fontWeight: 700,
                color: 'var(--color-text)',
                lineHeight: 1.1,
                letterSpacing: '-0.025em',
                margin: 0,
              }}
            >
              Tres pasos. Sin consultores. Sin esperas.
            </h2>
          </div>

          {/* Steps grid */}
          <div className="steps-grid">
            {steps.map((step, i) => (
              <>
                <div
                  key={step.number}
                  data-reveal
                  data-delay={step.delay}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.75rem',
                    padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Step number */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}>
                    {step.number}
                    <span style={{
                      display: 'block',
                      height: 1,
                      flex: 1,
                      background: 'var(--color-primary)',
                      opacity: 0.2,
                    }} />
                  </div>

                  {/* Content */}
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <h3 style={{
                      margin: '0 0 0.5rem',
                      fontSize: '1.0625rem',
                      fontWeight: 700,
                      color: 'var(--color-text)',
                      lineHeight: 1.3,
                      letterSpacing: '-0.015em',
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      color: 'var(--color-text-soft)',
                      lineHeight: 1.65,
                    }}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Video placeholder */}
                  <div style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    marginTop: '0.25rem',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.625rem',
                  }}>
                    <button
                      aria-label={`Reproducir paso ${i + 1}`}
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: '50%',
                        background: 'var(--color-primary)',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 0 7px rgba(249,80,104,0.08)',
                        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)'
                        e.currentTarget.style.boxShadow = '0 0 0 12px rgba(249,80,104,0.06)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                        e.currentTarget.style.boxShadow = '0 0 0 7px rgba(249,80,104,0.08)'
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 28 28" fill="none" aria-hidden="true">
                        <path d="M9 6.5v15l12-7.5L9 6.5z" fill="currentColor" />
                      </svg>
                    </button>
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: 'var(--color-text-soft)',
                      opacity: 0.5,
                      letterSpacing: '0.04em',
                    }}>
                      {step.hint}
                    </span>
                  </div>
                </div>

                {/* Connector between steps */}
                {i < steps.length - 1 && (
                  <div key={`connector-${i}`} className="step-connector">
                    <ArrowConnector />
                  </div>
                )}
              </>
            ))}
          </div>

          {/* Roadmap note */}
          <div
            data-reveal
            data-delay="0"
            style={{
              margin: '0 auto',
              maxWidth: 720,
              width: '100%',
              padding: '0.875rem 1.375rem',
              background: 'rgba(199, 231, 242, 0.35)',
              border: '1px solid rgba(199, 231, 242, 0.6)',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#4a90a8',
              flexShrink: 0,
            }} />
            Estás viendo el primer pilar de Proocess.{' '}
            <strong style={{ color: 'var(--color-text)' }}>Próximamente:</strong>{' '}
            ejecución, auditoría y mejora continua.
          </div>

        </div>
      </section>
    </>
  )
}
