import { useEffect, useRef } from 'react'
import PorQueProocessMobile, { type Rating, type Row } from './PorQueProocessMobile'

const ROWS: Row[] = [
  { label: 'Velocidad',        trad: 'neg', tradText: 'Meses',          bpm: 'mid', bpmText: 'Semanas',        proocess: 'pos', proocText: 'Horas'      },
  { label: 'Costo',            trad: 'neg', tradText: 'Alto',            bpm: 'neg', bpmText: 'Licencias + IT', proocess: 'pos', proocText: 'Eficiente'  },
  { label: 'Escalabilidad',    trad: 'neg', tradText: 'Baja',            bpm: 'mid', bpmText: 'Con IT',          proocess: 'pos', proocText: 'Alta'       },
  { label: 'Consistencia',     trad: 'neg', tradText: 'Variable',        bpm: 'mid', bpmText: 'Rígida',          proocess: 'pos', proocText: 'Adaptable'  },
  { label: 'Implementación',   trad: 'neg', tradText: 'Compleja',        bpm: 'neg', bpmText: 'Requiere IT',     proocess: 'pos', proocText: 'Guiada'     },
  { label: 'Soporte continuo', trad: 'neg', tradText: 'Por proyecto',    bpm: 'mid', bpmText: 'Por plan',        proocess: 'pos', proocText: 'Incluido'   },
]

const BADGE: Record<Rating, { bg: string; color: string; icon: string }> = {
  pos: { bg: 'var(--color-status-positive-bg)',   color: 'var(--color-status-positive-text)', icon: '✓' },
  mid: { bg: 'var(--color-status-warning-bg)',    color: 'var(--color-status-warning-text)',  icon: '~' },
  neg: { bg: 'var(--color-status-negative-bg)',   color: 'var(--color-status-negative-text)', icon: '✗' },
}

function Badge({ type, children }: { type: Rating; children: string }) {
  const { bg, color, icon } = BADGE[type]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
      background: bg, color,
      fontSize: '0.8125rem', fontWeight: 500,
      borderRadius: '9999px',
      padding: '0.25rem 0.75rem',
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ fontWeight: 700, fontSize: '0.75rem' }}>{icon}</span>
      {children}
    </span>
  )
}

const PROOCESS_BG     = 'rgba(var(--color-accent-blue-rgb), 0.35)'
const PROOCESS_BORDER = 'rgba(var(--color-ink-rgb), 0.12)'
const PROOCESS_ACCENT = 'var(--color-accent-blue)'

export default function PorQueProocess() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add('pq-in-view')
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        #porque-proocess {
          --pq-row-sep: rgba(var(--color-ink-rgb), 0.07);
        }
        #porque-proocess .pq-header,
        #porque-proocess .pq-row {
          opacity: 0;
          transform: translateY(14px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        #porque-proocess.pq-in-view .pq-header { opacity: 1; transform: none; transition-delay: 0ms; }
        #porque-proocess.pq-in-view .pq-row:nth-child(1) { opacity: 1; transform: none; transition-delay: 80ms;  }
        #porque-proocess.pq-in-view .pq-row:nth-child(2) { opacity: 1; transform: none; transition-delay: 150ms; }
        #porque-proocess.pq-in-view .pq-row:nth-child(3) { opacity: 1; transform: none; transition-delay: 220ms; }
        #porque-proocess.pq-in-view .pq-row:nth-child(4) { opacity: 1; transform: none; transition-delay: 290ms; }
        #porque-proocess.pq-in-view .pq-row:nth-child(5) { opacity: 1; transform: none; transition-delay: 360ms; }
        #porque-proocess.pq-in-view .pq-row:nth-child(6) { opacity: 1; transform: none; transition-delay: 430ms; }

        /* Desktop */
        @media (min-width: 641px) {
          #porque-proocess .pq-mobile { display: none; }
        }
        /* Mobile */
        @media (max-width: 640px) {
          #porque-proocess .pq-desktop { display: none; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="porque-proocess"
        style={{
          position: 'relative',
          zIndex: 4,
          background: 'var(--color-bg)',
          color: 'var(--color-text)',
          paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        }}
      >
        <div className="container">

          {/* Section header */}
          <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: 600 }}>
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
              Por qué Proocess
            </span>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.875rem, 3.5vw, 2.875rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: '0 0 1rem',
            }}>
              La diferencia que se nota<br />desde el primer día.
            </h2>

            <p style={{
              fontSize: '1rem', lineHeight: 1.65,
              color: 'rgba(var(--color-ink-rgb), 0.5)',
              margin: 0, maxWidth: '52ch',
            }}>
              Sin configuraciones eternas ni consultores costosos. Proocess hace
              lo que los otros métodos prometen pero raramente cumplen.
            </p>
          </div>

          {/* ── DESKTOP TABLE ── */}
          <div className="pq-desktop">
            <table style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
              tableLayout: 'fixed',
            }}>
              <colgroup>
                <col style={{ width: '28%' }} />
                <col />
                <col />
                <col style={{ background: PROOCESS_BG }} />
              </colgroup>

              <thead>
                <tr className="pq-header">
                  <th style={{ padding: '0 0 1.5rem', textAlign: 'left' }} />

                  <th style={{
                    padding: '0 1rem 1.5rem', textAlign: 'center',
                    fontSize: '0.875rem', fontWeight: 500,
                    color: 'rgba(var(--color-ink-rgb), 0.4)', letterSpacing: '-0.01em',
                  }}>
                    Consultoría<br />
                    <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>tradicional</span>
                  </th>

                  <th style={{
                    padding: '0 1rem 1.5rem', textAlign: 'center',
                    fontSize: '0.875rem', fontWeight: 500,
                    color: 'rgba(var(--color-ink-rgb), 0.4)', letterSpacing: '-0.01em',
                  }}>
                    Software BPM<br />
                    <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>de modelado</span>
                  </th>

                  <th style={{
                    padding: '0 1rem 0', textAlign: 'center',
                    background: PROOCESS_BG,
                    borderTop: `2px solid ${PROOCESS_ACCENT}`,
                    borderLeft: `1px solid ${PROOCESS_BORDER}`,
                    borderRight: `1px solid ${PROOCESS_BORDER}`,
                    borderRadius: '0.5rem 0.5rem 0 0',
                  }}>
                    <span style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.9375rem', fontWeight: 700,
                      color: 'var(--color-primary)',
                      letterSpacing: '-0.01em',
                      paddingTop: '0.875rem',
                    }}>
                      Proocess
                    </span>
                    <span style={{
                      display: 'inline-flex',
                      marginTop: '0.375rem',
                      marginBottom: '1.5rem',
                      fontSize: '0.625rem', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      background: 'rgba(var(--color-accent-blue-rgb), 0.5)',
                      color: 'var(--color-text)',
                      border: '1px solid rgba(var(--color-ink-rgb), 0.10)',
                      borderRadius: '9999px',
                      padding: '0.2rem 0.6rem',
                    }}>
                      Recomendado
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {ROWS.map((row, i) => {
                  const isLast = i === ROWS.length - 1
                  const cellBase: React.CSSProperties = {
                    padding: '1.125rem 1rem',
                    borderBottom: isLast ? 'none' : '1px solid var(--pq-row-sep)',
                    textAlign: 'center',
                    verticalAlign: 'middle',
                  }
                  return (
                    <tr key={row.label} className="pq-row">
                      <td style={{
                        ...cellBase,
                        textAlign: 'left', paddingLeft: 0,
                        fontSize: '0.9375rem', fontWeight: 500,
                        color: 'rgba(var(--color-ink-rgb), 0.88)',
                        letterSpacing: '-0.01em',
                      }}>
                        {row.label}
                      </td>
                      <td style={cellBase}><Badge type={row.trad}>{row.tradText}</Badge></td>
                      <td style={cellBase}><Badge type={row.bpm}>{row.bpmText}</Badge></td>
                      <td style={{
                        ...cellBase,
                        background: PROOCESS_BG,
                        borderLeft: `1px solid rgba(var(--color-accent-blue-rgb), 0.13)`,
                        borderRight: `1px solid rgba(var(--color-accent-blue-rgb), 0.13)`,
                        borderBottom: isLast
                          ? `2px solid rgba(var(--color-accent-blue-rgb), 0.28)`
                          : '1px solid rgba(var(--color-accent-blue-rgb), 0.08)',
                        borderRadius: isLast ? '0 0 0.5rem 0.5rem' : 0,
                      }}>
                        <Badge type={row.proocess}>{row.proocText}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* ── MOBILE ── */}
          <div className="pq-mobile">
            <PorQueProocessMobile rows={ROWS} />
          </div>

        </div>
      </section>
    </>
  )
}
