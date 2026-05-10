import { useEffect, useRef, useState } from 'react'

type Rating = 'pos' | 'mid' | 'neg'

const ROWS: {
  label: string
  trad: Rating; tradText: string
  bpm: Rating; bpmText: string
  proocess: Rating; proocText: string
}[] = [
  { label: 'Velocidad',        trad: 'neg', tradText: 'Meses',          bpm: 'mid', bpmText: 'Semanas',        proocess: 'pos', proocText: 'Horas'      },
  { label: 'Costo',            trad: 'neg', tradText: 'Alto',            bpm: 'neg', bpmText: 'Licencias + IT', proocess: 'pos', proocText: 'Eficiente'  },
  { label: 'Escalabilidad',    trad: 'neg', tradText: 'Baja',            bpm: 'mid', bpmText: 'Con IT',          proocess: 'pos', proocText: 'Alta'       },
  { label: 'Consistencia',     trad: 'neg', tradText: 'Variable',        bpm: 'mid', bpmText: 'Rígida',          proocess: 'pos', proocText: 'Adaptable'  },
  { label: 'Implementación',   trad: 'neg', tradText: 'Compleja',        bpm: 'neg', bpmText: 'Requiere IT',     proocess: 'pos', proocText: 'Guiada'     },
  { label: 'Soporte continuo', trad: 'neg', tradText: 'Por proyecto',    bpm: 'mid', bpmText: 'Por plan',        proocess: 'pos', proocText: 'Incluido'   },
]

const BADGE: Record<Rating, { bg: string; color: string; icon: string }> = {
  pos: { bg: 'rgba(52,211,153,0.12)',  color: '#6EE7B7', icon: '✓' },
  mid: { bg: 'rgba(251,191,36,0.12)',  color: '#FCD34D', icon: '~' },
  neg: { bg: 'rgba(239,68,68,0.10)',   color: '#EF4444', icon: '✗' },
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

type TabKey = 'trad' | 'bpm'

const TABS: Record<TabKey, { label: string; sub: string }> = {
  trad: { label: 'Consultoría', sub: 'tradicional' },
  bpm:  { label: 'Software BPM', sub: 'de modelado' },
}

const PROOCESS_BG     = 'rgba(199,231,242,0.06)'
const PROOCESS_BORDER = 'rgba(199,231,242,0.22)'
const PROOCESS_ACCENT = '#C7E7F2'

export default function PorQueProocess() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState<TabKey>('trad')

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
          --pq-row-sep: rgba(247,245,242,0.06);
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
          background: 'var(--color-bg-dark)',
          color: 'var(--color-text-dark)',
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
              background: 'rgba(249,80,104,0.10)',
              color: 'var(--color-primary)',
              border: '1px solid rgba(249,80,104,0.20)',
              borderRadius: '9999px',
              padding: '0.3rem 0.9rem',
              marginBottom: '1.25rem',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />
              Por qué Proocess
            </span>

            <h2 style={{
              fontFamily: 'Syne, sans-serif',
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
              color: 'rgba(247,245,242,0.45)',
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
                    color: 'rgba(247,245,242,0.38)', letterSpacing: '-0.01em',
                  }}>
                    Consultoría<br />
                    <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>tradicional</span>
                  </th>

                  <th style={{
                    padding: '0 1rem 1.5rem', textAlign: 'center',
                    fontSize: '0.875rem', fontWeight: 500,
                    color: 'rgba(247,245,242,0.38)', letterSpacing: '-0.01em',
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
                      fontFamily: 'Syne, sans-serif',
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
                      background: 'rgba(199,231,242,0.10)',
                      color: PROOCESS_ACCENT,
                      border: '1px solid rgba(199,231,242,0.25)',
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
                        color: 'rgba(247,245,242,0.88)',
                        letterSpacing: '-0.01em',
                      }}>
                        {row.label}
                      </td>
                      <td style={cellBase}><Badge type={row.trad}>{row.tradText}</Badge></td>
                      <td style={cellBase}><Badge type={row.bpm}>{row.bpmText}</Badge></td>
                      <td style={{
                        ...cellBase,
                        background: PROOCESS_BG,
                        borderLeft: `1px solid rgba(199,231,242,0.13)`,
                        borderRight: `1px solid rgba(199,231,242,0.13)`,
                        borderBottom: isLast
                          ? `2px solid rgba(199,231,242,0.28)`
                          : '1px solid rgba(199,231,242,0.08)',
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

          {/* ── MOBILE TAB SWITCHER ── */}
          <div className="pq-mobile">
            {/* Tabs bar */}
            <div style={{
              display: 'flex', gap: '0.375rem',
              marginBottom: '1.5rem',
              background: '#27323B',
              borderRadius: '0.625rem',
              padding: '0.3rem',
              border: '1px solid rgba(247,245,242,0.06)',
            }}>
              {(['trad', 'bpm'] as TabKey[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    flex: 1,
                    padding: '0.625rem 0.75rem',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: activeTab === tab ? 'rgba(247,245,242,1)' : 'rgba(247,245,242,0.22)',
                    background: activeTab === tab ? '#2F3D48' : 'none',
                    border: 'none',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    transition: 'color 0.18s ease, background 0.18s ease',
                    textAlign: 'center',
                    lineHeight: 1.3,
                  }}
                >
                  {TABS[tab].label}
                  <small style={{ display: 'block', fontSize: '0.6875rem', fontWeight: 400, marginTop: '0.1rem' }}>
                    {TABS[tab].sub}
                  </small>
                </button>
              ))}
            </div>

            {/* Mobile table */}
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th style={{ width: '36%', padding: '0 0 1.125rem', textAlign: 'left' }} />
                    <th style={{
                      padding: '0 0.75rem 1.125rem', textAlign: 'center',
                      fontSize: '0.75rem', fontWeight: 600,
                      color: 'rgba(247,245,242,0.22)',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                    }}>
                      {TABS[activeTab].label}<br />
                      <span style={{ fontSize: '0.6875rem', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                        {TABS[activeTab].sub}
                      </span>
                    </th>
                    <th style={{
                      padding: '0 0.75rem 0', textAlign: 'center',
                      background: PROOCESS_BG,
                      borderTop: `2px solid ${PROOCESS_ACCENT}`,
                      borderLeft: `1px solid ${PROOCESS_BORDER}`,
                      borderRight: `1px solid ${PROOCESS_BORDER}`,
                      borderRadius: '0.5rem 0.5rem 0 0',
                    }}>
                      <span style={{
                        display: 'block',
                        paddingTop: '0.875rem',
                        fontFamily: 'Syne, sans-serif',
                        fontSize: '0.875rem', fontWeight: 700,
                        color: 'var(--color-primary)',
                        textTransform: 'none',
                        letterSpacing: '-0.01em',
                      }}>
                        Proocess
                      </span>
                      <span style={{
                        display: 'inline-flex',
                        marginTop: '0.3rem',
                        marginBottom: '0.75rem',
                        fontSize: '0.5625rem', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        background: 'rgba(199,231,242,0.10)',
                        color: PROOCESS_ACCENT,
                        border: '1px solid rgba(199,231,242,0.25)',
                        borderRadius: '9999px',
                        padding: '0.15rem 0.5rem',
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
                      padding: '0.875rem 0.75rem',
                      textAlign: 'center',
                      verticalAlign: 'middle',
                      borderBottom: isLast ? 'none' : '1px solid var(--pq-row-sep)',
                    }
                    return (
                      <tr key={row.label}>
                        <td style={{
                          ...cellBase,
                          textAlign: 'left', paddingLeft: 0,
                          fontSize: '0.875rem', fontWeight: 500,
                          color: 'rgba(247,245,242,0.88)',
                        }}>
                          {row.label}
                        </td>
                        <td style={cellBase}>
                          <Badge type={row[activeTab]}>{row[`${activeTab}Text`]}</Badge>
                        </td>
                        <td style={{
                          ...cellBase,
                          background: PROOCESS_BG,
                          borderLeft: `1px solid rgba(199,231,242,0.13)`,
                          borderRight: `1px solid rgba(199,231,242,0.13)`,
                          borderBottom: isLast
                            ? `2px solid rgba(199,231,242,0.28)`
                            : '1px solid rgba(199,231,242,0.08)',
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

        </div>
      </section>
    </>
  )
}
