import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import './HomePage.css'

const stripLinks = [
  { to: '/beats', label: 'Beats' },
  { to: '/escuchar?tab=sets', label: 'Sets' },
  { to: '/shows', label: 'Eventos' },
  { to: '/shop', label: 'Merchandise' },
  { to: '/escuchar?tab=remixes', label: 'Remix' },
] as const

export function HomePage() {
  return (
    <>
      <Hero />
      <section className="home-strip" aria-label="Explorar">
        <div className="home-strip__grid">
          {stripLinks.map((item) => (
            <Link key={item.label} to={item.to} className="home-strip__item">
              <strong>{item.label}</strong>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
