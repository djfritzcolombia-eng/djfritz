import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { assetUrl } from '../utils/assetUrl'
import './Footer.css'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div>
          <Link className="footer__logo" to="/" aria-label={site.name}>
            <img
              src={assetUrl('/logo-fritz-white.png')}
              alt="DJ Fritz"
              width={160}
              height={67}
            />
          </Link>
          <p>
            Equipos DJ, sonido e iluminación profesional. Arma tu setup en{' '}
            {site.domain}.
          </p>
        </div>
        <div>
          <h3>Categorías</h3>
          <ul>
            <li>
              <Link to="/categoria/dj">Equipos DJ</Link>
            </li>
            <li>
              <Link to="/categoria/dj/tornamesas">Tornamesas</Link>
            </li>
            <li>
              <Link to="/categoria/sonido">Sonido</Link>
            </li>
            <li>
              <Link to="/categoria/iluminacion">Iluminación</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Ayuda</h3>
          <ul>
            <li>
              <Link to="/contacto">Cómo vender</Link>
            </li>
            <li>
              <Link to="/contacto">Envíos</Link>
            </li>
            <li>
              <Link to="/contacto">Garantía</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>Contacto</h3>
          <ul>
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>{site.city}</li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.domain}
          </p>
        </div>
      </div>
    </footer>
  )
}
