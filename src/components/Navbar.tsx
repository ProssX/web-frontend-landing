import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/isologotipo-coral.svg'

const anchorLinks = [
  { label: 'Producto',      hash: '#solucion'      },
  { label: 'Cómo funciona', hash: '#como-funciona' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  const anchorHref = (hash: string) => isHome ? hash : `/${hash}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="container flex items-center justify-between py-5">

        {/* Logo + nombre */}
        <Link
          to="/"
          aria-label="Proocess - Inicio"
          onClick={closeMenu}
          className="flex items-center"
        >
          <img
            src={logo}
            alt="Proocess"
            className="h-7 w-auto transition-opacity duration-300"
            style={{ opacity: scrolled ? 0.45 : 1 }}
          />
        </Link>

        {/* Cápsula flotante — desktop */}
        <nav
          className={[
            'hidden md:flex items-center gap-1 px-2 py-2 rounded-pill border transition-all duration-300',
            scrolled || !isHome
              ? 'bg-ink/80 border-cream/10 backdrop-blur-xl shadow-lg'
              : 'bg-cream/[.06] border-cream/[.08] backdrop-blur-md',
          ].join(' ')}
        >
          {anchorLinks.map((l) => (
            <a
              key={l.hash}
              href={anchorHref(l.hash)}
              className="px-4 py-2 text-sm font-medium text-cream/60 hover:text-cream rounded-pill transition-colors duration-150 whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}

          <Link
            to="/faq"
            className="px-4 py-2 text-sm font-medium text-cream/60 hover:text-cream rounded-pill transition-colors duration-150 whitespace-nowrap"
          >
            Preguntas frecuentes
          </Link>

          {/* Separador */}
          <span className="w-px h-4 bg-cream/10 mx-1" aria-hidden="true" />

          {/* CTA dentro de la cápsula */}
          <a
            href={anchorHref('#cta-form')}
            className="px-4 py-2 text-sm font-semibold rounded-pill whitespace-nowrap transition-all duration-200 bg-coral text-cream hover:opacity-90"
            style={{ boxShadow: '0 4px 16px rgba(249,80,104,0.30)' }}
          >
            Probá gratis
          </a>
        </nav>

        {/* Hamburguesa — mobile */}
        <button
          className={[
            'flex md:hidden flex-col gap-[5px] p-2.5 rounded-xl border transition-all duration-300',
            scrolled || !isHome
              ? 'bg-ink/80 border-cream/10 backdrop-blur-xl'
              : 'bg-cream/[.06] border-cream/[.08] backdrop-blur-md',
          ].join(' ')}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className={['block w-[18px] h-px bg-cream/70 transition-transform duration-300', menuOpen ? 'translate-y-[6px] rotate-45' : ''].join(' ')} />
          <span className={['block w-[18px] h-px bg-cream/70 transition-opacity duration-300', menuOpen ? 'opacity-0' : ''].join(' ')} />
          <span className={['block w-[18px] h-px bg-cream/70 transition-transform duration-300', menuOpen ? '-translate-y-[6px] -rotate-45' : ''].join(' ')} />
        </button>
      </div>

      {/* Menú mobile desplegable */}
      <div className={['md:hidden overflow-hidden transition-all duration-300', menuOpen ? 'max-h-96' : 'max-h-0'].join(' ')}>
        <nav className={['mx-4 mb-4 rounded-xl border p-4 flex flex-col gap-1 transition-all duration-300', scrolled ? 'bg-ink/90 border-cream/10 backdrop-blur-xl' : 'bg-ink/75 border-cream/[.08] backdrop-blur-md'].join(' ')}>
          {anchorLinks.map((l) => (
            <a
              key={l.hash}
              href={anchorHref(l.hash)}
              onClick={closeMenu}
              className="py-2.5 px-2 text-sm font-medium text-cream/60 hover:text-cream border-b border-cream/[.05] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/faq"
            onClick={closeMenu}
            className="py-2.5 px-2 text-sm font-medium text-cream/60 hover:text-cream border-b border-cream/[.05] last:border-0 transition-colors"
          >
            Preguntas frecuentes
          </Link>
          <a
            href={anchorHref('#cta-form')}
            onClick={closeMenu}
            className="mt-2 px-4 py-2.5 bg-coral text-cream text-sm font-semibold rounded-xl text-center hover:opacity-90 transition-opacity"
          >
            Probá gratis
          </a>
        </nav>
      </div>
    </header>
  )
}
