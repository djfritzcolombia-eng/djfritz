import { Navigate, useParams } from 'react-router-dom'
import { CatalogView } from '../components/CatalogView'
import { brandPath, slugify } from '../data/menu'
import { brands, filterByBrand } from '../data/site'

export function BrandPage() {
  const { slug = '' } = useParams()
  const brand = brands.find((b) => slugify(b) === slug)

  if (!brand) {
    return <Navigate to="/marcas" replace />
  }

  const products = filterByBrand(brand)

  return (
    <CatalogView
      title={brand}
      subtitle={`${products.length} producto${products.length === 1 ? '' : 's'} de esta marca`}
      products={products}
      crumbs={[
        { label: 'Inicio', to: '/' },
        { label: 'Marcas', to: '/marcas' },
        { label: brand },
      ]}
      filters={brands.slice(0, 12).map((b) => ({
        label: b,
        to: brandPath(b),
        active: b === brand,
      }))}
    />
  )
}
