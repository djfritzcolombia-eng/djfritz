import { Link } from 'react-router-dom'
import { About } from '../components/About'
import { site } from '../data/site'
import '../components/CatalogView.css'

export function ContactPage() {
  return (
    <>
      <div className="container" style={{ paddingTop: '1.25rem' }}>
        <nav className="catalog-view__crumbs" aria-label="Miga de pan">
          <Link to="/">Inicio</Link>
          <span className="catalog-view__sep">/</span>
          <span>Contacto</span>
        </nav>
      </div>
      <About />
      <section className="section">
        <div className="container">
          <h2 className="section__title">Habla con nosotros</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 0', lineHeight: 1.9 }}>
            <li>
              WhatsApp / Tel:{' '}
              <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
            </li>
            <li>
              Email: <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>{site.city}</li>
          </ul>
        </div>
      </section>
    </>
  )
}
