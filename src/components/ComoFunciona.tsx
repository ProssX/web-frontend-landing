import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '01',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    ),
    title: 'Contás cómo trabajás',
    desc: 'En lenguaje natural. La IA te guía con preguntas clave para no omitir nada importante.',
  },
  {
    number: '02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h.01M12 9h.01M15 9h.01M9 12h.01M12 12h.01M15 12h.01M9 15h.01M12 15h.01M15 15h.01" />
      </svg>
    ),
    title: 'La IA estructura tu proceso',
    desc: 'Genera el diagrama BPMN, identifica tareas y responsables. En minutos, automáticamente.',
  },
  {
    number: '03',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Tu equipo ejecuta con claridad',
    desc: 'Cada persona sabe qué hacer, cuándo, y con qué criterio. Sin preguntar de nuevo.',
  },
  {
    number: '04',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
        strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: 'Optimizás basándote en datos',
    desc: 'Identificás cuellos de botella, ajustás el proceso y lo mejorás continuamente.',
    isLoop: true,
  },
]

function StepCard({ step }: { step: typeof steps[number] }) {
  return (
    <div
      style={{
        width: '13.5rem',
        flexShrink: 0,
        background: step.isLoop
          ? 'rgba(var(--color-primary-rgb), 0.04)'
          : 'rgba(var(--color-surface-rgb), 0.04)',
        border: step.isLoop
          ? '1px solid rgba(var(--color-primary-rgb), 0.18)'
          : '1px solid rgba(var(--color-cream-rgb), 0.08)',
        borderRadius: '0.875rem',
        padding: '1.125rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 40, height: 40, borderRadius: '0.5rem',
          background: 'var(--color-primary-tint)',
          border: '1px solid var(--color-primary-glow)',
          color: 'var(--color-primary)',
          flexShrink: 0,
        }}>
          {step.icon}
        </span>
        <span style={{
          fontSize: '0.625rem', fontWeight: 800,
          color: 'rgba(var(--color-primary-rgb), 0.5)',
          letterSpacing: '0.06em',
        }}>
          {step.number}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        <h3 style={{
          margin: 0,
          fontSize: '0.8125rem', fontWeight: 700,
          color: 'var(--color-text-dark)',
          lineHeight: 1.3, letterSpacing: '-0.015em',
        }}>
          {step.title}
        </h3>
        <p style={{
          margin: 0,
          fontSize: '0.75rem',
          color: 'rgba(var(--color-cream-rgb), 0.42)',
          lineHeight: 1.55,
        }}>
          {step.desc}
        </p>
      </div>

      {step.isLoop && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
          alignSelf: 'flex-start',
          fontSize: '0.5625rem', fontWeight: 700,
          letterSpacing: '0.04em',
          color: 'var(--color-primary)',
          background: 'rgba(var(--color-primary-rgb), 0.08)',
          border: '1px solid rgba(var(--color-primary-rgb), 0.18)',
          borderRadius: '9999px',
          padding: '0.2rem 0.55rem',
          marginTop: '0.125rem',
        }}>
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <path d="M1 4v6h6M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
          vuelve al paso 01
        </span>
      )}
    </div>
  )
}

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

  // Card width + gap for one set = 4 × (216px + 14px) = 920px
  const CARD_W = 216
  const GAP = 14
  const ONE_SET = 4 * (CARD_W + GAP)

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

        @keyframes car-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${ONE_SET}px); }
        }

        @keyframes dot-pulse {
          0%, 22%   { width: 20px; background: var(--color-primary); border-radius: 4px; }
          28%, 100% { width: 6px;  background: rgba(var(--color-cream-rgb), 0.18); border-radius: 50%; }
        }

        #como-funciona .car-track {
          display: flex;
          gap: ${GAP}px;
          width: max-content;
          animation: car-scroll 16s linear infinite;
          will-change: transform;
        }
        #como-funciona .car-track:hover {
          animation-play-state: paused;
        }
        #como-funciona .car-wrap {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        /* Progress dots — one per step, synced with 16s animation */
        #como-funciona .prog-dot {
          height: 6px; border-radius: 50%;
          background: rgba(var(--color-cream-rgb), 0.18);
        }
        #como-funciona .prog-dot:nth-child(1) { animation: dot-pulse 16s linear infinite 0s;   width: 6px; }
        #como-funciona .prog-dot:nth-child(2) { animation: dot-pulse 16s linear infinite 4s;   width: 6px; }
        #como-funciona .prog-dot:nth-child(3) { animation: dot-pulse 16s linear infinite 8s;   width: 6px; }
        #como-funciona .prog-dot:nth-child(4) { animation: dot-pulse 16s linear infinite 12s;  width: 6px; }
      `}</style>

      <section
        ref={sectionRef}
        id="como-funciona"
        style={{
          position: 'relative',
          zIndex: 4,
          background: 'var(--color-bg-dark)',
          color: 'var(--color-text-dark)',
          paddingTop: '1.5rem',
          paddingBottom: '5.5rem',
          overflow: 'hidden',
        }}
      >
        <div
          className="container"
          style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
        >
          <div
            data-reveal
            data-delay="0"
            style={{
              textAlign: 'center',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '0.875rem',
            }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.6875rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: 'rgba(var(--color-primary-rgb), 0.07)',
              color: 'var(--color-primary)',
              border: '1px solid rgba(var(--color-primary-rgb), 0.14)',
              borderRadius: '9999px',
              padding: '0.3rem 0.9rem',
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: '50%',
                background: 'var(--color-primary)', flexShrink: 0,
              }} />
              Cómo funciona
            </span>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.875rem, 3.5vw, 2.875rem)',
              fontWeight: 700,
              color: 'var(--color-text-dark)',
              lineHeight: 1.1,
              letterSpacing: '-0.025em',
              margin: 0,
            }}>
              Un ciclo que mejora con el tiempo.
            </h2>

            <p style={{
              fontSize: '1rem',
              color: 'rgba(var(--color-cream-rgb), 0.5)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: '46ch',
            }}>
              Cada vuelta deja tu proceso más preciso que la anterior.
            </p>
          </div>

          <div data-reveal data-delay="100">
            <div className="car-wrap">
              <div className="car-track">
                {steps.map((step) => (
                  <StepCard key={`a-${step.number}`} step={step} />
                ))}
                {/* Set 2 — clone for seamless loop */}
                {steps.map((step) => (
                  <StepCard key={`b-${step.number}`} step={step} />
                ))}
              </div>
            </div>

            <div
              role="presentation"
              aria-hidden="true"
              style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: '0.4rem',
                marginTop: '1.25rem',
              }}
            >
              <div className="prog-dot" />
              <div className="prog-dot" />
              <div className="prog-dot" />
              <div className="prog-dot" />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
