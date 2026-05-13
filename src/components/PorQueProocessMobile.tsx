import { useRef, useState } from 'react'

export type Rating = 'pos' | 'mid' | 'neg'

export type Row = {
  label: string
  trad: Rating; tradText: string
  bpm: Rating;  bpmText: string
  proocess: Rating; proocText: string
}

const BADGE: Record<Rating, { bg: string; color: string; icon: string }> = {
  pos: { bg: 'var(--color-status-positive-bg)',  color: 'var(--color-status-positive-text)', icon: '✓' },
  mid: { bg: 'var(--color-status-warning-bg)',   color: 'var(--color-status-warning-text)',  icon: '~' },
  neg: { bg: 'var(--color-status-negative-bg)',  color: 'var(--color-status-negative-text)', icon: '✗' },
}

function Chip({ type, children }: { type: Rating; children: string }) {
  const { bg, color, icon } = BADGE[type]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
      background: bg, color,
      fontSize: '0.8125rem', fontWeight: 600,
      borderRadius: '9999px',
      padding: '0.3rem 0.75rem',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ fontWeight: 700, fontSize: '0.75rem' }}>{icon}</span>
      {children}
    </span>
  )
}

const COLS = [
  { key: 'trad'     as const, textKey: 'tradText'  as const, name: 'Consultoría',  sub: 'tradicional',          isProocess: false },
  { key: 'bpm'      as const, textKey: 'bpmText'   as const, name: 'Software BPM', sub: 'de modelado',           isProocess: false },
  { key: 'proocess' as const, textKey: 'proocText' as const, name: 'Proocess',      sub: 'plataforma inteligente', isProocess: true  },
]

const ROW_SEP    = 'rgba(var(--color-ink-rgb), 0.06)'
const LEFT_BDR   = 'rgba(var(--color-ink-rgb), 0.07)'
const CARD_BG    = 'var(--color-surface)'
const ACCENT_BG  = 'rgba(var(--color-accent-blue-rgb), 0.18)'
const PROOCESS_ROW_BG = 'rgba(var(--color-accent-blue-rgb), 0.10)'

function ArrowBtn({ onClick, disabled, dir }: { onClick: () => void; disabled: boolean; dir: 'prev' | 'next' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 30, height: 30,
        borderRadius: '50%',
        background: 'rgba(var(--color-ink-rgb), 0.06)',
        border: '1px solid rgba(var(--color-ink-rgb), 0.09)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        fontSize: '1rem', lineHeight: 1,
        color: 'rgba(var(--color-ink-rgb), 0.45)',
        opacity: disabled ? 0.25 : 1,
        fontFamily: 'var(--font-family)',
        flexShrink: 0,
      }}
    >
      {dir === 'prev' ? '‹' : '›'}
    </button>
  )
}

export default function PorQueProocessMobile({ rows }: { rows: Row[] }) {
  const [current, setCurrent] = useState(0)
  const touchStart = useRef(0)

  const goTo = (i: number) => setCurrent(Math.max(0, Math.min(COLS.length - 1, i)))

  const translateX = `translateX(-${current * 100}%)`
  const trackStyle = { display: 'flex', transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1)', transform: translateX } as const
  const slideStyle = { flex: '0 0 100%' } as const

  return (
    <>
      {/* Card */}
      <div
        style={{ background: CARD_BG, borderRadius: '1.25rem', border: `1px solid ${LEFT_BDR}`, overflow: 'hidden' }}
        onTouchStart={e => { touchStart.current = e.touches[0].clientX }}
        onTouchEnd={e => {
          const dx = e.changedTouches[0].clientX - touchStart.current
          if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1))
        }}
      >
        {/* Column header — swipeable */}
        <div style={{ overflow: 'hidden', borderBottom: `1px solid ${LEFT_BDR}` }}>
          <div style={trackStyle}>
            {COLS.map((col) => (
              <div
                key={col.key}
                style={{
                  ...slideStyle,
                  padding: '1.125rem 1.25rem 1rem',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                  ...(col.isProocess
                    ? { background: ACCENT_BG, borderTop: '2px solid var(--color-accent-blue)' }
                    : {}),
                }}
              >
                <div>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem', fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: col.isProocess ? 'var(--color-primary)' : 'var(--color-text)',
                    marginBottom: '0.125rem',
                  }}>
                    {col.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(var(--color-ink-rgb), 0.4)' }}>
                    {col.sub}
                  </div>
                  {col.isProocess && (
                    <span style={{
                      display: 'inline-flex', marginTop: '0.4rem',
                      fontSize: '0.5625rem', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      background: 'rgba(var(--color-accent-blue-rgb), 0.6)',
                      border: '1px solid rgba(var(--color-ink-rgb), 0.10)',
                      borderRadius: '9999px',
                      padding: '0.2rem 0.6rem',
                    }}>
                      Recomendado
                    </span>
                  )}
                </div>

                {/* Arrows */}
                <div style={{ display: 'flex', gap: '0.375rem', flexShrink: 0 }}>
                  <ArrowBtn dir="prev" onClick={() => goTo(current - 1)} disabled={current === 0} />
                  <ArrowBtn dir="next" onClick={() => goTo(current + 1)} disabled={current === COLS.length - 1} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div style={{ display: 'flex' }}>
          {/* Left: labels — fixed */}
          <div style={{ flex: '0 0 42%', borderRight: `1px solid ${LEFT_BDR}` }}>
            {rows.map((row, i) => (
              <div
                key={row.label}
                style={{
                  padding: '0.9375rem 1rem 0.9375rem 1.25rem',
                  fontSize: '0.875rem', fontWeight: 500,
                  color: 'rgba(var(--color-ink-rgb), 0.7)',
                  letterSpacing: '-0.01em',
                  borderBottom: i < rows.length - 1 ? `1px solid ${ROW_SEP}` : 'none',
                  display: 'flex', alignItems: 'center',
                  minHeight: 52,
                }}
              >
                {row.label}
              </div>
            ))}
          </div>

          {/* Right: values — swipeable */}
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={trackStyle}>
              {COLS.map(col => (
                <div key={col.key} style={slideStyle}>
                  {rows.map((row, i) => (
                    <div
                      key={row.label}
                      style={{
                        padding: '0.9375rem 1rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderBottom: i < rows.length - 1 ? `1px solid ${ROW_SEP}` : 'none',
                        minHeight: 52,
                        ...(col.isProocess ? { background: PROOCESS_ROW_BG } : {}),
                      }}
                    >
                      <Chip type={row[col.key]}>{row[col.textKey]}</Chip>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.375rem', marginTop: '1.125rem' }}>
        {COLS.map((col, i) => (
          <div
            key={col.key}
            onClick={() => goTo(i)}
            style={{
              height: 6,
              width: i === current ? 20 : 6,
              borderRadius: '9999px',
              cursor: 'pointer',
              background: i === current ? 'var(--color-primary)' : 'rgba(var(--color-ink-rgb), 0.15)',
              transition: 'background 0.2s, width 0.22s cubic-bezier(0.4,0,0.2,1)',
            }}
          />
        ))}
      </div>
    </>
  )
}
