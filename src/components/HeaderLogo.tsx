import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { assetUrl } from '../utils/assetUrl'
import './HeaderLogo.css'

export function HeaderLogo() {
  const [active, setActive] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => {
    const pulse = () => {
      setActive(false)
      window.requestAnimationFrame(() => {
        setActive(true)
        window.clearTimeout(timer.current)
        timer.current = window.setTimeout(() => setActive(false), 1200)
      })
    }

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (!target) return
      // ignore clicks inside the logo itself to avoid double-fire from logo link
      if (target.closest('.header-logo')) {
        pulse()
        return
      }
      if (target.closest('a, button, [role="button"], input[type="submit"]')) {
        pulse()
      }
    }

    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('click', onClick, true)
      window.clearTimeout(timer.current)
    }
  }, [])

  return (
    <Link
      className={`header-logo ${active ? 'is-active' : ''}`}
      to="/"
      aria-label={site.name}
    >
      <span className="header-logo__stage">
        <span className="header-logo__orbit header-logo__orbit--a" aria-hidden />
        <span className="header-logo__orbit header-logo__orbit--b" aria-hidden />
        <span className="header-logo__bubbles" aria-hidden>
          <i />
          <i />
          <i />
          <i />
        </span>
        <img
          className="header-logo__img"
          src={assetUrl('/logo-fritz-white.png')}
          alt="DJ Fritz"
          width={140}
          height={58}
        />
        <span className="header-logo__spark" aria-hidden />
      </span>
    </Link>
  )
}
