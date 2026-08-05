import { Link } from 'react-router-dom'
import './Footer.css'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link className="site-footer__brand" to="/" aria-label="Fritz">
          <img src="/logo-fritz-white.png" alt="Fritz" width={140} height={58} />
        </Link>
        <p>Shows · Música · Booking</p>
        <p className="site-footer__copy">© {new Date().getFullYear()} Fritz · www.djfritz.com</p>
      </div>
    </footer>
  )
}
