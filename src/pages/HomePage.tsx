import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import './HomePage.css'

export function HomePage() {
  return (
    <>
      <Hero />
      <section className="home-strip">
        <div className="home-strip__grid">
          <Link to="/escuchar" className="home-strip__item">
            <span>Escuchar</span>
            <strong>Sets · Beats · Remix</strong>
          </Link>
          <Link to="/shows" className="home-strip__item">
            <span>Shows</span>
            <strong>Fotos y videos</strong>
          </Link>
          <Link to="/beats" className="home-strip__item">
            <span>Beats</span>
            <strong>Compra o agenda</strong>
          </Link>
        </div>
      </section>
    </>
  )
}
