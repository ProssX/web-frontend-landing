import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logoSvg from '../assets/isologotipo.svg'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const logoRef    = useRef<HTMLImageElement>(null)

  useGSAP(() => {
    const vH = window.innerHeight

    gsap.set(logoRef.current, {
      xPercent: -50,
      yPercent: -50,
      y: vH / 2,
    })

    // Fase 1: logo sube desde el borde inferior hasta el centro.
    gsap.to(logoRef.current, {
      y: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100vh',
        scrub: 1.2,
        pin: true,
      },
    })
  })

  return (
    <>
      {/* Logo trama — position fixed, cubierto por secciones subsiguientes (zIndex > 1) */}
      <img
        id="logo-trama"
        ref={logoRef}
        src={logoSvg}
        alt=""
        aria-hidden="true"
        className="pointer-events-none"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '90vw',
          opacity: 0.045,
          zIndex: 1,
          willChange: 'transform',
        }}
      />

      {/* Hero section */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{ height: '100vh', zIndex: 2 }}
      >
        {/* Glow coral */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[10%] -left-[5%] w-[60%] h-[80%]"
          style={{
            background: 'radial-gradient(ellipse at 20% 30%, rgba(var(--color-primary-rgb), 0.09) 0%, transparent 60%)',
          }}
        />

        {/* Contenido: headline arriba, párrafo abajo */}
        <div
          className="container absolute inset-0 flex flex-col justify-between"
          style={{ paddingTop: '8rem', paddingBottom: '3rem', zIndex: 3 }}
        >
          <h1
            className="font-display font-normal text-cream leading-[1.05] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 5rem)', maxWidth: '18ch' }}
          >
            Que tu empresa funcione,
            <br />
            <em className="italic">incluso cuando vos no estés.</em>
          </h1>

          <p
            className="max-w-sm text-sm leading-relaxed"
            style={{ color: 'rgba(var(--color-cream-rgb), 0.45)' }}
          >
            Proocess convierte el conocimiento de tu equipo en procesos claros y ejecutables.
            Sin consultoría, sin manuales que nadie lee.
          </p>
        </div>
      </section>

      {/* Video placeholder — fondo transparente para que el logo trama se vea */}
      <div
        style={{
          background: 'transparent',
          paddingTop: '4rem',
          paddingBottom: '5rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div className="container">
          <div style={{
            border: '1px solid rgba(var(--color-cream-rgb), 0.08)',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            background: 'rgba(var(--color-surface-dark-rgb), 0.35)',
          }}>
            {/* Chrome bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.375rem',
              padding: '0.5rem 1rem',
              borderBottom: '1px solid rgba(var(--color-cream-rgb), 0.06)',
            }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--color-primary)', display: 'block', flexShrink: 0 }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(var(--color-cream-rgb), 0.1)', display: 'block', flexShrink: 0 }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'rgba(var(--color-cream-rgb), 0.1)', display: 'block', flexShrink: 0 }} />
              <span style={{ marginLeft: 'auto', fontSize: '0.6875rem', fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(var(--color-cream-rgb), 0.25)' }}>
                proocess · demo
              </span>
            </div>
            {/* Área de video */}
            <div style={{
              aspectRatio: '16 / 9',
              background: 'rgba(var(--color-ink-rgb), 0.65)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}>
              <button
                aria-label="Reproducir demo"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  border: '1px solid rgba(var(--color-primary-rgb), 0.4)',
                  background: 'rgba(var(--color-primary-rgb), 0.12)',
                  color: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.22)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(var(--color-primary-rgb), 0.12)')}
              >
                <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                  <path d="M9 6.5v15l12-7.5L9 6.5z" fill="currentColor" />
                </svg>
              </button>
              <span style={{ fontSize: '0.8125rem', color: 'rgba(var(--color-cream-rgb), 0.35)', letterSpacing: '0.04em' }}>
                Demo del producto
              </span>
              <span style={{ fontSize: '0.6875rem', color: 'rgba(var(--color-cream-rgb), 0.18)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Loop 8–15s · Hero principal
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
