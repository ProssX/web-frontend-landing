import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE  = 'service_hcy9th2'
const EMAILJS_TEMPLATE = 'template_neft65k'
const EMAILJS_PUBLIC   = '5cE5lxTocUFz_Xaqq'

const teamOptions = [
  { value: '', label: '¿Cuántas personas trabajan en tu empresa?' },
  { value: '1-5', label: '1–5 personas' },
  { value: '6-20', label: '6–20 personas' },
  { value: '+20', label: '+20 personas' },
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.8125rem 1.125rem',
  fontSize: '0.9375rem',
  background: 'rgba(var(--color-cream-rgb), 0.05)',
  border: '1px solid rgba(var(--color-cream-rgb), 0.1)',
  borderRadius: '0.625rem',
  color: 'var(--color-text-dark)',
  transition: 'border-color 0.18s ease, box-shadow 0.18s ease',
}

export default function CTAForm() {
  const sectionRef = useRef<HTMLElement>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [team, setTeam] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

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
      { threshold: 0.15 }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !company || !team || status !== 'idle') return
    setStatus('loading')
    try {
      await emailjs.send(
        EMAILJS_SERVICE,
        EMAILJS_TEMPLATE,
        { from_name: name, from_email: email, company, team_size: team },
        EMAILJS_PUBLIC,
      )
      setStatus('success')
    } catch {
      setStatus('idle')
      alert('Hubo un error al enviar. Intentá de nuevo.')
    }
  }

  return (
    <>
      <style>{`
        #cta-form [data-reveal] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        #cta-form [data-reveal].revealed {
          opacity: 1;
          transform: translateY(0);
        }
        #cta-form .cta-input:focus,
        #cta-form .cta-select:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.14);
        }
        #cta-form .cta-input::placeholder {
          color: rgba(var(--color-cream-rgb), 0.25);
        }
        #cta-form .cta-select option {
          background: var(--color-bg-dark);
          color: var(--color-text-dark);
        }
        @keyframes ctaFadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        #cta-form { display: flex; flex-direction: row; }
        .cta-video-col { width: 40%; padding: 10%; }
        .cta-form-col  { width: 60%; }
        @media (max-width: 768px) {
          #cta-form { flex-direction: column-reverse; }
          .cta-video-col { width: 100%; min-height: 280px; padding: 20%; }
          .cta-form-col  { width: 100%; }
        }
      `}</style>

      <section
        ref={sectionRef}
        id="cta-form"
        style={{
          position: 'relative',
          color: 'var(--color-text-dark)',
          overflow: 'hidden',
        }}
      >
        {/* Video column */}
        <div
          className="cta-video-col"
          style={{
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            src="/catch-the-logo.mp4"
            style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'contain' }}
          />
        </div>

        {/* Form column */}
        <div
          className="cta-form-col"
          style={{
            background: 'var(--color-bg-dark)',
            position: 'relative',
            padding: '7rem 4rem',
          }}
        >
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 60% 50% at 50% 100%, rgba(var(--color-primary-rgb), 0.07) 0%, transparent 70%),
            radial-gradient(ellipse 40% 35% at 20% 20%, rgba(var(--color-accent-lavender-rgb), 0.03) 0%, transparent 65%)
          `,
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `radial-gradient(circle, rgba(var(--color-cream-rgb), 0.04) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black 0%, transparent 75%)',
        }} />

        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2rem',
            maxWidth: '520px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <span
            data-reveal
            data-delay="0"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              fontSize: '0.6875rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              background: 'var(--color-primary-tint)',
              color: 'var(--color-primary)',
              border: '1px solid rgba(var(--color-primary-rgb), 0.18)',
              borderRadius: '9999px',
              padding: '0.3rem 0.9rem',
            }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />
            Empezá hoy
          </span>

          <h2
            data-reveal
            data-delay="80"
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700,
              color: 'var(--color-text-dark)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            Tu empresa puede funcionar sin que todo dependa de vos.
          </h2>

          <p
            data-reveal
            data-delay="160"
            style={{
              fontSize: '1.0625rem', lineHeight: 1.65,
              color: 'rgba(var(--color-cream-rgb), 0.45)',
              margin: 0,
            }}
          >
            Dejanos tus datos y te mostramos cómo Proocess funciona para tu negocio — sin demos genéricas ni presentaciones de una hora.
          </p>

          {status === 'success' ? (
            <div
              style={{
                animation: 'ctaFadeIn 0.5s ease forwards',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '0.75rem',
                padding: '2rem 2.5rem',
                background: 'rgba(var(--color-primary-rgb), 0.06)',
                border: '1px solid rgba(var(--color-primary-rgb), 0.14)',
                borderRadius: '1rem',
                width: '100%',
              }}
            >
              <span style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'var(--color-primary-tint)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="var(--color-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10l4 4 8-8" />
                </svg>
              </span>
              <p style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>
                ¡Listo, {name}! Te escribimos pronto.
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgba(var(--color-cream-rgb), 0.4)' }}>
                Revisá tu bandeja — te llegará algo interesante.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              data-reveal
              data-delay="240"
              style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <input
                  className="cta-input"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  disabled={status === 'loading'}
                  style={inputStyle}
                />
                <input
                  className="cta-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  disabled={status === 'loading'}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <input
                  className="cta-input"
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Tu empresa"
                  disabled={status === 'loading'}
                  style={inputStyle}
                />
                <select
                  className="cta-select"
                  required
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  disabled={status === 'loading'}
                  style={{
                    ...inputStyle,
                    color: team ? 'var(--color-text-dark)' : 'rgba(var(--color-cream-rgb), 0.25)',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(247,245,242,0.3)' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    paddingRight: '2.5rem',
                    cursor: 'pointer',
                  }}
                >
                  {teamOptions.map((o) => (
                    <option key={o.value} value={o.value} disabled={o.value === ''}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  width: '100%',
                  padding: '0.875rem 1.5rem',
                  fontSize: '0.9375rem',
                  fontWeight: 700,
                  background: status === 'loading' ? 'rgba(var(--color-primary-rgb), 0.6)' : 'var(--color-primary)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.625rem',
                  cursor: status === 'loading' ? 'wait' : 'pointer',
                  transition: 'opacity 0.18s ease',
                }}
                onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.opacity = '0.88' }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
              >
                {status === 'loading' ? 'Enviando…' : 'Quiero verlo'}
              </button>

              <p style={{
                margin: 0, fontSize: '0.8125rem',
                color: 'rgba(var(--color-cream-rgb), 0.28)',
              }}>
                Sin tarjeta. Sin compromiso. Solo claridad.
              </p>
            </form>
          )}
        </div>
        </div>
      </section>
    </>
  )
}
