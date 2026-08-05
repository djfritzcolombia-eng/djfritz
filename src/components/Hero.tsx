import { Link } from 'react-router-dom'
import { heroCategories } from '../data/menu'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero section" aria-label="Inicio">
      <div className="container hero__grid">
        <aside className="hero__cats" id="categorias">
          <h2>Categorías</h2>
          <ul>
            {heroCategories.map((cat) => (
              <li key={cat.id}>
                <Link to={cat.item.path}>
                  <span
                    className="hero__dot"
                    style={{ background: `hsl(${cat.hue} 55% 42%)` }}
                    aria-hidden
                  />
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="hero__banner">
          <div className="hero__slide hero__slide--main">
            <div className="hero__copy">
              <p className="hero__eyebrow">www.djfritz.com</p>
              <h1>DJ Fritz</h1>
              <p>
                Controladores, tornamesas, sonido e iluminación profesional. Arma tu setup en un
                solo lugar.
              </p>
              <Link className="hero__cta" to="/categoria/dj">
                Ver equipos DJ
              </Link>
            </div>
            <div className="hero__visual" aria-hidden>
              <div className="hero__deck" />
              <div className="hero__glow" />
            </div>
          </div>

          <div className="hero__side">
            <Link className="hero__promo" to="/categoria/iluminacion">
              <strong>Luces pro</strong>
              <span>Hasta -45% en Par LED y cabezas móviles</span>
            </Link>
            <Link className="hero__promo hero__promo--alt" to="/categoria/sonido">
              <strong>Sonido vivo</strong>
              <span>Cabinas activas y monitores listos para fiesta</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
