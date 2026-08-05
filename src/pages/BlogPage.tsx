import { Link } from 'react-router-dom'
import { Blog } from '../components/Blog'
import '../components/CatalogView.css'

export function BlogPage() {
  return (
    <>
      <div className="container" style={{ paddingTop: '1.25rem' }}>
        <nav className="catalog-view__crumbs" aria-label="Miga de pan">
          <Link to="/">Inicio</Link>
          <span className="catalog-view__sep">/</span>
          <span>Blog</span>
        </nav>
      </div>
      <Blog />
    </>
  )
}
