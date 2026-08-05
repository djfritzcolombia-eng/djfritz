import { useEffect, useState } from 'react'
import { assetUrl } from '../utils/assetUrl'
import './PageLoader.css'

const MIN_MS = 2200

export function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const started = performance.now()
    let leaveTimer: number | undefined
    let hideTimer: number | undefined

    const finish = () => {
      const elapsed = performance.now() - started
      const wait = Math.max(0, MIN_MS - elapsed)
      leaveTimer = window.setTimeout(() => {
        setLeaving(true)
        hideTimer = window.setTimeout(() => setVisible(false), 650)
      }, wait)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    document.documentElement.classList.add('is-loading')

    return () => {
      window.removeEventListener('load', finish)
      window.clearTimeout(leaveTimer)
      window.clearTimeout(hideTimer)
      document.documentElement.classList.remove('is-loading')
    }
  }, [])

  useEffect(() => {
    if (!visible) {
      document.documentElement.classList.remove('is-loading')
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className={`page-loader ${leaving ? 'is-leaving' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Cargando DJ Fritz"
    >
      <div className="page-loader__glow" aria-hidden />
      <div className="page-loader__stage page-loader__stage--wordmark">
        <div className="page-loader__orbit page-loader__orbit--a" aria-hidden />
        <div className="page-loader__orbit page-loader__orbit--b" aria-hidden />
        <div className="page-loader__orbit page-loader__orbit--c" aria-hidden />
        <div className="page-loader__bubbles" aria-hidden>
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <img
          className="page-loader__logo"
          src={assetUrl('/logo-fritz-white.png')}
          alt="DJ Fritz"
          width={280}
          height={117}
        />
        <span className="page-loader__spark" aria-hidden />
      </div>
      <p className="page-loader__text">Cargando DJ Fritz…</p>
      <div className="page-loader__bar" aria-hidden>
        <span />
      </div>
    </div>
  )
}
