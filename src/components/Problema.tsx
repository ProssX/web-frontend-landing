import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FADE_VH      = 80   // duración del fade del logo (vh)
const CARD_HOLD_VH = 350  // ← ajustá esto para cambiar cuánto tiempo queda cada card
const CROSSFADE_VH = 80   // duración de la transición entre cards (vh)

// Total del scroll: fade + (hold × 3 cards) + (crossfade × 2 transiciones)
const TOTAL_VH = FADE_VH + CARD_HOLD_VH * 3 + CROSSFADE_VH * 2

const TL_ACTIVE = 'var(--color-primary)'
const TL_BASE   = 'rgba(var(--color-ink-rgb), 0.18)'

const cards = [
  {
    num: '01',
    title: 'Todo pasa por vos',
    desc: 'Tu equipo te pregunta cada decisión. Nadie ejecuta sin consultarte.',
  },
  {
    num: '02',
    title: 'Sin vos, no avanza',
    desc: 'Te enfermás, te vas de vacaciones, y la operación se frena.',
  },
  {
    num: '03',
    title: '100% urgencia, 0% estrategia',
    desc: 'Vivís apagando incendios y nunca tenés tiempo de pensar.',
  },
]

export default function Problema() {
  const sectionRef      = useRef<HTMLElement>(null)
  const cardRefs        = useRef<(HTMLDivElement | null)[]>([])
  const activeLayerRef  = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const logo = document.getElementById('logo-trama')
    const tl = gsap.timeline()

    // 0–FADE_VH: logo desaparece
    if (logo) {
      tl.to(logo, { opacity: 0, ease: 'power1.inOut', duration: FADE_VH })
    } else {
      tl.to({}, { duration: FADE_VH })
    }

    // Ola activa: recorre el timeline de arriba a abajo de forma continua
    // durante todo el período de las cards (sin pausas).
    tl.to(activeLayerRef.current, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: CARD_HOLD_VH * 3 + CROSSFADE_VH * 2,
      ease: 'none',
    }, FADE_VH)

    // Cross-fades de cards en sus posiciones absolutas dentro del timeline
    const t1 = FADE_VH + CARD_HOLD_VH
    tl.to(cardRefs.current[0], { opacity: 0, duration: CROSSFADE_VH, ease: 'power2.inOut' }, t1)
    tl.to(cardRefs.current[1], { opacity: 1, duration: CROSSFADE_VH, ease: 'power2.inOut' }, t1)

    const t2 = FADE_VH + 2 * CARD_HOLD_VH + CROSSFADE_VH
    tl.to(cardRefs.current[1], { opacity: 0, duration: CROSSFADE_VH, ease: 'power2.inOut' }, t2)
    tl.to(cardRefs.current[2], { opacity: 1, duration: CROSSFADE_VH, ease: 'power2.inOut' }, t2)

    // Extender el pin por exactamente 1 viewport de scroll al final:
    // durante ese tramo Solucion sube en flujo normal sin transiciones JS.
    // ACOPLAMIENTO: este valor debe coincidir con marginTop: -100vh de Solucion.tsx.
    const slideScroll = window.innerHeight
    tl.to({}, { duration: slideScroll })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${TOTAL_VH + slideScroll}vh`,
      scrub: 1.2,
      pin: true,
      animation: tl,
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id="problema"
      className="section-light"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingBlock: '4rem' }}
    >
      <div
        className="container"
        style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', alignItems: 'center' }}
      >

        {/* Header */}
        <div style={{ textAlign: 'center', width: '100%' }}>
          <span className="eyebrow" style={{ marginBottom: '0.875rem', display: 'inline-flex' }}>
            ¿Te suena familiar?
          </span>
          <h2
            className="font-display font-normal"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              color: 'var(--color-text)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              margin: 0,
            }}
          >
            Si tu empresa depende de tu memoria,
            <br />
            tarde o temprano se traba.
          </h2>
          <p style={{
            color: 'var(--color-text-soft)',
            fontSize: '0.9375rem',
            maxWidth: '42ch',
            margin: '0.625rem auto 0',
          }}>
            Tres señales de que sos el cuello de botella de tu propio negocio:
          </p>
        </div>

        {/* Card centrada respecto al texto; timeline absoluto a su izquierda */}
        <div style={{ position: 'relative', maxWidth: 420, width: '100%', margin: '0 auto' }}>

          {/* Timeline vertical: ●─●─● — anclado fuera de la card */}
          <div style={{ position: 'absolute', right: 'calc(100% + 2rem)', top: 0, bottom: 0, width: 20 }}>

            {/* Capa base — siempre visible */}
            <div style={{ position: 'absolute', inset: 0 }}>
              <div style={{ position: 'absolute', top: 4, bottom: 4, left: '50%', transform: 'translateX(-50%)', width: 2, background: TL_BASE }} />
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: TL_BASE }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 8, height: 8, borderRadius: '50%', background: TL_BASE }} />
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: TL_BASE }} />
            </div>

            {/* Capa activa — se revela de arriba a abajo via clip-path */}
            <div
              ref={activeLayerRef}
              style={{ position: 'absolute', inset: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            >
              <div style={{ position: 'absolute', top: 4, bottom: 4, left: '50%', transform: 'translateX(-50%)', width: 2, background: TL_ACTIVE }} />
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: TL_ACTIVE }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 8, height: 8, borderRadius: '50%', background: TL_ACTIVE }} />
              <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, borderRadius: '50%', background: TL_ACTIVE }} />
            </div>

          </div>

          {/* Cards — grid stack para cross-fade */}
          <div style={{ display: 'grid' }}>
            {cards.map(({ num, title, desc }, i) => (
              <div
                key={num}
                ref={el => { cardRefs.current[i] = el }}
                className="prob-card"
                style={{
                  gridRow: 1,
                  gridColumn: 1,
                  opacity: i === 0 ? 1 : 0,
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.875rem',
                  padding: '2rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '0.625rem',
                }}
              >
                <h3
                  className="font-display"
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    margin: 0,
                  }}
                >
                  {title}
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-text-soft)',
                  margin: 0,
                  lineHeight: 1.6,
                }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cierre */}
        <p
          style={{
            textAlign: 'center',
            fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            color: 'var(--color-text)',
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          No te falta esfuerzo.
          <br />
          <span style={{ color: 'var(--color-primary)' }}>Te faltan procesos claros.</span>
        </p>

      </div>
    </section>
  )
}
