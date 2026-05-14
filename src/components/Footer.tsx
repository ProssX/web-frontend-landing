import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/isologotipo-coral.svg'

const navLinks = [
  { label: 'Producto',      hash: '#solucion'      },
  { label: 'Cómo funciona', hash: '#como-funciona' },
]

export default function Footer() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const anchorHref = (hash: string) => isHome ? hash : `/${hash}`

  return (
    <footer
      style={{
        background: 'var(--color-bg-dark)',
        color: 'var(--color-text-dark)',
        borderTop: '1px solid rgba(var(--color-cream-rgb), 0.08)',
      }}
    >
      {/* Fila principal */}
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '3rem',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          paddingBlock: '3.5rem',
        }}
      >
        {/* Logo + tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link to="/" aria-label="Proocess - Inicio">
            <img src={logo} alt="Proocess" style={{ height: '1.75rem', width: 'auto' }} />
          </Link>
          <p style={{
            fontSize: '0.875rem',
            color: 'rgba(var(--color-cream-rgb), 0.45)',
            maxWidth: '20ch',
            lineHeight: 1.5,
            margin: 0,
          }}>
            Que tu empresa funcione,<br />incluso cuando vos no estés.
          </p>
        </div>

        {/* Links */}
        <nav style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          {/* Navegación */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(var(--color-cream-rgb), 0.3)',
            }}>
              Navegación
            </span>
            {navLinks.map((l) => (
              <a
                key={l.hash}
                href={anchorHref(l.hash)}
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(var(--color-cream-rgb), 0.6)',
                  textDecoration: 'none',
                  transition: 'color 150ms',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-dark)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(var(--color-cream-rgb), 0.6)')}
              >
                {l.label}
              </a>
            ))}
            <Link
              to="/faq"
              style={{
                fontSize: '0.875rem',
                color: 'rgba(var(--color-cream-rgb), 0.6)',
                textDecoration: 'none',
                transition: 'color 150ms',
              }}
            >
              FAQ
            </Link>
          </div>

          {/* Redes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <span style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(var(--color-cream-rgb), 0.3)',
            }}>
              Redes
            </span>
            <a
              href="https://instagram.com/proocess_"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.875rem',
                color: 'rgba(var(--color-cream-rgb), 0.6)',
                textDecoration: 'none',
                transition: 'color 150ms',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-dark)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(var(--color-cream-rgb), 0.6)')}
            >
              @proocess_
            </a>
          </div>
        </nav>
      </div>

      {/* Barra inferior — copyright */}
      <div
        className="container"
        style={{
          borderTop: '1px solid rgba(var(--color-cream-rgb), 0.06)',
          paddingBlock: '1.25rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <p style={{
          fontSize: '0.75rem',
          color: 'rgba(var(--color-cream-rgb), 0.25)',
          margin: 0,
        }}>
          © {new Date().getFullYear()} Proocess. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
