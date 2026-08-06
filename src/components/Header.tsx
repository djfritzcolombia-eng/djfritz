import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../cart/CartContext'
import './Header.css'

const leftNav = [
  { to: '/shows', label: 'Shows' },
  { to: '/shop', label: 'Shop' },
  { to: '/escuchar', label: 'Escuchar' },
]

const rightNav = [
  { to: '/beats', label: 'Beats' },
  { to: '/bio', label: 'Bio' },
  { to: '/contacto', label: 'Contacto' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { count, setOpen: setCartOpen } = useCart()

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

        <div className="site-header__right">
          <nav className="site-header__nav site-header__nav--right" aria-label="Principal derecha">
            {rightNav.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <button
            type="button"
            className="site-header__cart"
            aria-label={`Carrito${count ? `, ${count} productos` : ''}`}
            onClick={() => setCartOpen(true)}
          >
            Bag{count > 0 ? ` (${count})` : ''}
          </button>
        </div>

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

      <div
        className="site-header__drawer"
        id="mobile-nav"
        hidden={!open}
        aria-hidden={!open}
      >
        <nav aria-label="Menú móvil">
          {[...leftNav, ...rightNav].map((item) => (
            <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              setCartOpen(true)
            }}
          >
            Carrito{count > 0 ? ` (${count})` : ''}
          </button>
        </nav>
      </div>
    </header>
  )
}
