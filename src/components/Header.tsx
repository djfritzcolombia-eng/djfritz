import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { brands, formatPrice, searchProducts } from '../data/site'
import { brandPath, departmentMenu, primaryNav, type MenuItem } from '../data/menu'
import { useCart } from '../cart/CartContext'
import { useFavorites } from '../favorites/FavoritesContext'
import { assetUrl } from '../utils/assetUrl'
import { HeaderLogo } from './HeaderLogo'
import './Header.css'

export function Header() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [catsOpen, setCatsOpen] = useState(false)
  const [activeDept, setActiveDept] = useState(departmentMenu[0]?.id ?? '')
  const [openMega, setOpenMega] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [showResults, setShowResults] = useState(false)
  const searchWrap = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const { count, openCart } = useCart()
  const { count: favCount, openFavorites } = useFavorites()

  const results = useMemo(() => searchProducts(query).slice(0, 8), [query])
  const activeDepartment = departmentMenu.find((d) => d.id === activeDept) ?? departmentMenu[0]
  const brandList = useMemo(() => brands.slice(0, 24), [])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (!searchWrap.current?.contains(target)) setShowResults(false)
      if (!navRef.current?.contains(target)) {
        setCatsOpen(false)
        setOpenMega(null)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  const closeAll = () => {
    setCatsOpen(false)
    setOpenMega(null)
    setMobileOpen(false)
    setShowResults(false)
  }

  const goSearch = (value?: string, productId?: string) => {
    const q = (value ?? query).trim()
    closeAll()
    if (!q) {
      navigate('/buscar')
      return
    }
    navigate(productId ? `/buscar?q=${encodeURIComponent(q)}#producto-${productId}` : `/buscar?q=${encodeURIComponent(q)}`)
  }

  const goMenu = (item: MenuItem) => {
    closeAll()
    navigate(item.path)
  }

  const goBrand = (brand: string) => {
    closeAll()
    navigate(brandPath(brand))
  }

  const isDesktop = () => window.matchMedia('(min-width: 901px)').matches

  return (
    <header className="site-header">
      <div className="container header__main">
        <HeaderLogo />

        <div className="search-wrap" ref={searchWrap}>
          <form
            className="search"
            role="search"
            onSubmit={(e) => {
              e.preventDefault()
              goSearch()
            }}
          >
            <input
              type="search"
              placeholder="Buscar: tornamesa, luces, JBL, cable, DJ..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setShowResults(e.target.value.trim().length > 0)
              }}
              onFocus={() => {
                if (query.trim()) setShowResults(true)
              }}
              aria-label="Buscar productos"
              aria-autocomplete="list"
              aria-controls="search-results"
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className="search__clear"
                aria-label="Limpiar búsqueda"
                onClick={() => {
                  setQuery('')
                  setShowResults(false)
                }}
              >
                ×
              </button>
            )}
            <button type="submit" aria-label="Buscar">
              <SearchIcon />
            </button>
          </form>

          {showResults && query.trim().length > 0 && (
            <div className="search-results" id="search-results" role="listbox">
              {results.length === 0 ? (
                <p className="search-results__empty">
                  Sin resultados para “{query.trim()}”. Prueba: luces, tornamesa, cabina, cable…
                </p>
              ) : (
                <ul>
                  {results.map((product) => (
                    <li key={product.id}>
                      <button
                        type="button"
                        role="option"
                        onClick={() => {
                          setQuery(query)
                          goSearch(query, product.id)
                        }}
                      >
                        <img src={assetUrl(product.image)} alt="" width={40} height={40} />
                        <span>
                          <strong>{product.name}</strong>
                          <em>
                            {product.brand} · {formatPrice(product.price)}
                          </em>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {results.length > 0 && (
                <button type="button" className="search-results__all" onClick={() => goSearch()}>
                  Ver todos los resultados ({searchProducts(query).length})
                </button>
              )}
            </div>
          )}
        </div>

        <div className="header__extras">
          <button type="button" className="extra" title="Favoritos" onClick={openFavorites}>
            <HeartIcon filled={favCount > 0} />
            {favCount > 0 && <span className="extra__badge">{favCount}</span>}
            <span>Favoritos</span>
          </button>
          <button type="button" className="extra extra--cart" title="Carrito" onClick={openCart}>
            <CartIcon />
            {count > 0 && <span className="extra__badge">{count}</span>}
            <span>Carrito</span>
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((v) => !v)
              setCatsOpen(false)
              setOpenMega(null)
            }}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <nav
        ref={navRef}
        className={`primary-nav ${mobileOpen ? 'is-open' : ''}`}
        aria-label="Principal"
      >
        <div className="container primary-nav__inner">
          <div className={`cats-wrap ${catsOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              className="cats-btn"
              aria-expanded={catsOpen}
              aria-controls="department-menu"
              onClick={() => {
                setCatsOpen((v) => !v)
                setOpenMega(null)
              }}
            >
              <MenuIcon />
              Todas las categorías
              <ChevronIcon open={catsOpen} />
            </button>

            {catsOpen && (
              <div className="department-menu" id="department-menu" role="menu">
                <ul className="department-menu__list">
                  {departmentMenu.map((dept) => (
                    <li key={dept.id}>
                      <button
                        type="button"
                        className={`department-menu__item ${activeDept === dept.id ? 'is-active' : ''}`}
                        onMouseEnter={() => setActiveDept(dept.id)}
                        onFocus={() => setActiveDept(dept.id)}
                        onClick={() => goMenu(dept)}
                      >
                        <span>{dept.label}</span>
                        <span aria-hidden>›</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="department-menu__panel">
                  <p className="department-menu__heading">{activeDepartment.label}</p>
                  <ul>
                    <li>
                      <button type="button" onClick={() => goMenu(activeDepartment)}>
                        Ver todo {activeDepartment.label}
                      </button>
                    </li>
                    {activeDepartment.children?.map((child) => (
                      <li key={child.id}>
                        <button type="button" onClick={() => goMenu(child)}>
                          {child.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          <ul className="primary-nav__links">
            {primaryNav.map((link) => {
              const dept = link.departmentId
                ? departmentMenu.find((d) => d.id === link.departmentId)
                : undefined
              const hasMega = !!link.mega
              const isOpen = openMega === link.label

              return (
                <li
                  key={link.label}
                  className={`nav-item ${hasMega ? 'has-mega' : ''} ${isOpen ? 'is-open' : ''}`}
                  onMouseEnter={() => {
                    if (isDesktop() && hasMega) {
                      setOpenMega(link.label)
                      setCatsOpen(false)
                    }
                  }}
                  onMouseLeave={() => {
                    if (isDesktop()) setOpenMega(null)
                  }}
                >
                  {hasMega ? (
                    <button
                      type="button"
                      className="nav-link"
                      aria-expanded={isOpen}
                      onClick={() => {
                        if (!isDesktop()) {
                          setOpenMega((v) => (v === link.label ? null : link.label))
                          setCatsOpen(false)
                        } else {
                          closeAll()
                          navigate(link.path)
                        }
                      }}
                    >
                      {link.label}
                      <ChevronIcon open={isOpen} />
                    </button>
                  ) : (
                    <Link className="nav-link" to={link.path} onClick={() => closeAll()}>
                      {link.label}
                    </Link>
                  )}

                  {isOpen && link.mega === 'department' && dept && (
                    <div className="mega-menu">
                      <Link
                        className="mega-menu__all"
                        to={dept.path}
                        onClick={() => closeAll()}
                      >
                        Ver todo {dept.label}
                      </Link>
                      <ul>
                        {dept.children?.map((child) => (
                          <li key={child.id}>
                            <button type="button" onClick={() => goMenu(child)}>
                              {child.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {isOpen && link.mega === 'brands' && (
                    <div className="mega-menu mega-menu--brands">
                      <p className="mega-menu__title">Buscar por marca</p>
                      <ul>
                        {brandList.map((brand) => (
                          <li key={brand}>
                            <button type="button" onClick={() => goBrand(brand)}>
                              {brand}
                            </button>
                          </li>
                        ))}
                      </ul>
                      <Link className="mega-menu__all" to="/marcas" onClick={() => closeAll()}>
                        Ver todas las marcas
                      </Link>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </header>
  )
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      aria-hidden
    >
      <path
        d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h2l1.5 10h11L21 8H7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17" cy="20" r="1.4" fill="currentColor" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ChevronIcon({ open }: { open?: boolean }) {
  return (
    <svg
      className={`chevron ${open ? 'is-open' : ''}`}
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}
