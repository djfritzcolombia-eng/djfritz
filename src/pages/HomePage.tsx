import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import './HomePage.css'

export function HomePage() {
  return (
    <>
      <Hero />
      <section className="home-strip">
        <div className="home-strip__grid">
          <Link to="/musica" className="home-strip__item">
            <span>Música</span>
            <strong>Escucha los sets</strong>
          </Link>
          <Link to="/shows" className="home-strip__item">
            <span>Shows</span>
            <strong>Próximas fechas</strong>
          </Link>
          <Link to="/contacto" className="home-strip__item">
            <span>Booking</span>
            <strong>Contrata a Fritz</strong>
          </Link>
        </div>
      </section>
    </>
  )
}
