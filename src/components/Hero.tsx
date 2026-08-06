import { Link } from 'react-router-dom'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero" aria-label="Inicio">
      <div className="hero__media" aria-hidden>
        <div className="hero__grain" />
        <div className="hero__wash" />
      </div>

      <div className="hero__content">
        <img
          className="hero__logo"
          src="/logo-fritz-white.png"
          alt="Fritz"
          width={520}
          height={217}
        />
        <h1 className="hero__title">Fritz</h1>
        <p className="hero__tag">DJ Productor · Colombia</p>
        <p className="hero__copy">
          Gritos, coros y euforia desde Medellín. Sets que prenden la pista,
          beats listos para firmar… y la próxima noche que todavía no te
          cuentas.
        </p>
        <div className="hero__cta">
          <Link className="btn btn--accent" to="/shows">
            Ver shows
          </Link>
          <Link className="btn btn--ghost" to="/escuchar">
            Escuchar
          </Link>
        </div>
      </div>
    </section>
  )
}
