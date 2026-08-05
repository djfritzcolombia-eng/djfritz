import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Header.css'

const leftNav = [
  { to: '/shows', label: 'Shows' },
  { to: '/shop', label: 'Shop' },
  { to: '/musica', label: 'Música' },
]

const rightNav = [
  { to: '/noticias', label: 'Noticias' },
  { to: '/bio', label: 'Bio' },
  { to: '/contacto', label: 'Contacto' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="site-header__bar">
        <nav className="site-header__nav site-header__nav--left" aria-label="Principal izquierda">
          {leftNav.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link className="site-header__brand" to="/" aria-label="Fritz" onClick={() => setOpen(false)}>
          <img src="/logo-fritz-white.png" alt="Fritz" width={160} height={67} />
        </Link>

        <nav className="site-header__nav site-header__nav--right" aria-label="Principal derecha">
          {rightNav.map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="site-header__menu"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className="site-header__drawer" id="mobile-nav" hidden={!open}>
        <nav aria-label="Menú móvil">
          {[...leftNav, ...rightNav].map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
