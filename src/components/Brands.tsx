import { Link } from 'react-router-dom'
import { brandPath } from '../data/menu'
import { brands } from '../data/site'
import './Brands.css'

export function Brands() {
  return (
    <section className="section brands">
      <div className="container">
        <div className="section__head">
          <h2 className="section__title">Marcas que encontrarás en DJ Fritz</h2>
          <Link className="section__link" to="/marcas">
            Ver todas
          </Link>
        </div>
        <div className="brands__track" role="list">
          {brands.map((brand) => (
            <Link className="brands__item" key={brand} to={brandPath(brand)} role="listitem">
              <span>{brand}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
