import { Link } from 'react-router-dom'
import { Hero } from '../components/Hero'
import { Featured } from '../components/Featured'
import { Brands } from '../components/Brands'
import { About } from '../components/About'
import { departmentMenu } from '../data/menu'
import { catalogBySection } from '../data/catalog'
import './HomePage.css'

export function HomePage() {
  return (
    <>
      <Hero />

      <section className="section home-dirs">
        <div className="container">
          <div className="section__head">
            <h2 className="section__title">Explora por categoría</h2>
            <Link className="section__link" to="/marcas">
              Ver marcas
            </Link>
          </div>
          <div className="home-dirs__grid">
            {departmentMenu.map((dept) => {
              const count = dept.section ? catalogBySection[dept.section].length : 0
              return (
                <Link key={dept.id} className="home-dirs__card" to={dept.path}>
                  <strong>{dept.label}</strong>
                  <span>{count} productos</span>
                  <em>Ver página →</em>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <Featured />
      <Brands />
      <About
        compact
        cta={
          <Link className="section__link" to="/contacto">
            Ir a contacto
          </Link>
        }
      />
    </>
  )
}
