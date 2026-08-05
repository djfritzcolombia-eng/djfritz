import { Link } from 'react-router-dom'
import { brandPath } from '../data/menu'
import { brands, filterByBrand } from '../data/site'
import '../components/Brands.css'
import '../components/CatalogView.css'

export function BrandsPage() {
  return (
    <section className="section brands">
      <div className="container">
        <nav className="catalog-view__crumbs" aria-label="Miga de pan">
          <Link to="/">Inicio</Link>
          <span className="catalog-view__sep">/</span>
          <span>Marcas</span>
        </nav>
        <div className="section__head">
          <h1 className="section__title">Marcas</h1>
        </div>
        <p className="catalog-view__subtitle" style={{ marginBottom: '1.25rem' }}>
          Elige una marca para ver solo sus productos.
        </p>
        <div className="brands__track" role="list">
          {brands.map((brand) => {
            const count = filterByBrand(brand).length
            return (
              <Link
                className="brands__item"
                key={brand}
                to={brandPath(brand)}
                role="listitem"
              >
                <span>
                  {brand}
                  <em style={{ display: 'block', fontStyle: 'normal', opacity: 0.65, fontSize: '0.75em' }}>
                    {count} productos
                  </em>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
