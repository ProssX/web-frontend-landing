import { useEffect, useRef, useState } from 'react'

const ITEMS = [
  {
    q: '¿Cuánto tiempo toma implementar Proocess?',
    a: 'La mayoría de los procesos quedan operativos en horas, no semanas. Dependiendo de la complejidad, algunos flujos más avanzados pueden tomar un par de días. No hay instalaciones ni migraciones complicadas.',
  },
  {
    q: '¿Necesito conocimientos técnicos para usar la plataforma?',
    a: 'No. Proocess está diseñado para que cualquier persona del equipo pueda mapear, automatizar y gestionar procesos sin escribir una línea de código. Si podés describir un proceso en palabras, podés implementarlo en Proocess.',
  },
  {
    q: '¿Qué tipo de procesos puedo automatizar?',
    a: 'Procesos de aprobación, onboarding de clientes, gestión de documentos, seguimiento comercial, control de calidad, operaciones internas, y más. Si implica pasos repetibles y personas responsables, Proocess lo puede manejar.',
  },
  {
    q: '¿Puedo integrarlo con las herramientas que ya uso?',
    a: 'Sí. Proocess se conecta con las herramientas más usadas en tu stack: Slack, Google Workspace, WhatsApp, CRMs, ERPs y más. Las integraciones están disponibles desde el primer día.',
  },
  {
    q: '¿Cómo es el soporte después de la implementación?',
    a: 'El soporte está incluido en todos los planes. Tenés acceso a un equipo dedicado por WhatsApp y mail, más documentación actualizada y sesiones de revisión periódicas para que tus procesos sigan evolucionando con tu empresa.',
  },
  {
    q: '¿Hay un período de prueba o demo disponible?',
    a: 'Sí. Podés agendar una demo personalizada donde mostramos Proocess con un caso de uso de tu industria. También ofrecemos un período de onboarding guiado para que tu equipo se familiarice antes de escalar.',
  },
]

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('faq-in-view')
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  function toggle(index: number) {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <>
      <style>{`
        #faq .faq-header,
        #faq .faq-item {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }

        #faq.faq-in-view .faq-header {
          opacity: 1;
          transform: none;
          transition-delay: 0ms;
        }

        #faq.faq-in-view .faq-item:nth-child(1) { opacity: 1; transform: none; transition-delay:  80ms; }
        #faq.faq-in-view .faq-item:nth-child(2) { opacity: 1; transform: none; transition-delay: 140ms; }
        #faq.faq-in-view .faq-item:nth-child(3) { opacity: 1; transform: none; transition-delay: 200ms; }
        #faq.faq-in-view .faq-item:nth-child(4) { opacity: 1; transform: none; transition-delay: 260ms; }
        #faq.faq-in-view .faq-item:nth-child(5) { opacity: 1; transform: none; transition-delay: 320ms; }
        #faq.faq-in-view .faq-item:nth-child(6) { opacity: 1; transform: none; transition-delay: 380ms; }

        #faq .faq-item {
          border-bottom: 1px solid rgba(var(--color-ink-rgb), 0.08);
        }

        #faq .faq-item:first-child {
          border-top: 1px solid rgba(var(--color-ink-rgb), 0.08);
        }

        #faq .faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 1.375rem 0;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: var(--font-family);
          font-size: clamp(0.9375rem, 1.4vw, 1.0625rem);
          font-weight: 600;
          color: var(--color-text);
          letter-spacing: -0.01em;
          line-height: 1.35;
          transition: color 0.18s ease;
        }

        #faq .faq-trigger:hover {
          color: var(--color-primary);
        }

        #faq .faq-icon {
          flex-shrink: 0;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          border: 1.5px solid rgba(var(--color-ink-rgb), 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.22s ease, border-color 0.22s ease, transform 0.3s ease;
        }

        #faq .faq-trigger[aria-expanded="true"] .faq-icon {
          background: var(--color-primary);
          border-color: var(--color-primary);
          transform: rotate(45deg);
        }

        #faq .faq-icon svg {
          width: 0.75rem;
          height: 0.75rem;
          stroke: rgba(var(--color-ink-rgb), 0.5);
          transition: stroke 0.22s ease;
        }

        #faq .faq-trigger[aria-expanded="true"] .faq-icon svg {
          stroke: #fff;
        }

        #faq .faq-body {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        #faq .faq-body.faq-open {
          grid-template-rows: 1fr;
        }

        #faq .faq-body-inner {
          overflow: hidden;
        }

        #faq .faq-answer {
          padding-bottom: 1.375rem;
          font-size: 0.9375rem;
          line-height: 1.7;
          color: rgba(var(--color-ink-rgb), 0.6);
          max-width: 72ch;
        }

      `}</style>

      <section
        ref={sectionRef}
        id="faq"
        style={{
          position: 'relative',
          zIndex: 5,
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
          paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        }}
      >
        <div className="container-narrow">

          {/* Section header */}
          <div className="faq-header" style={{ marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.6875rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: 'var(--color-primary-tint)',
              color: 'var(--color-primary)',
              border: '1px solid rgba(var(--color-primary-rgb), 0.20)',
              borderRadius: '9999px',
              padding: '0.3rem 0.9rem',
              marginBottom: '1.25rem',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />
              Preguntas frecuentes
            </span>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.875rem, 3.5vw, 2.875rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: '0 0 1rem',
            }}>
              Todo lo que necesitás<br />saber antes de empezar.
            </h2>

            <p style={{
              fontSize: '1rem', lineHeight: 1.65,
              color: 'rgba(var(--color-ink-rgb), 0.5)',
              margin: 0, maxWidth: '52ch',
            }}>
              Si hay algo que no está acá, escribinos directo. Respondemos rápido.
            </p>
          </div>

          {/* Accordion */}
          <div role="list">
            {ITEMS.map((item, i) => {
              const isOpen = openIndex === i
              return (
                <div key={i} className="faq-item" role="listitem">
                  <button
                    className="faq-trigger"
                    aria-expanded={isOpen}
                    onClick={() => toggle(i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      <svg viewBox="0 0 12 12" fill="none" strokeWidth="1.75" strokeLinecap="round">
                        <line x1="6" y1="1" x2="6" y2="11" />
                        <line x1="1" y1="6" x2="11" y2="6" />
                      </svg>
                    </span>
                  </button>

                  <div className={`faq-body${isOpen ? ' faq-open' : ''}`}>
                    <div className="faq-body-inner">
                      <p className="faq-answer">{item.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </section>
    </>
  )
}
