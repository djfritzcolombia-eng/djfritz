import { Navigate, useParams } from 'react-router-dom'
import { CatalogView } from '../components/CatalogView'
import {
  departmentMenu,
  findDepartment,
  findSubcategory,
} from '../data/menu'
import { filterByMenuItem } from '../data/site'

export function CategoryPage() {
  const { section = '', sub } = useParams()
  const dept = findDepartment(section)

  if (!dept) {
    return <Navigate to="/" replace />
  }

  const subItem = sub ? findSubcategory(section, sub) : undefined
  if (sub && !subItem) {
    return <Navigate to={dept.path} replace />
  }

  const current = subItem ?? dept
  const list = filterByMenuItem(current)

  const filters = [
    { label: 'Ver todo', to: dept.path, active: !sub },
    ...(dept.children ?? []).map((child) => ({
      label: child.label,
      to: child.path,
      active: child.id === sub,
    })),
  ]

  return (
    <CatalogView
      title={current.label}
      subtitle={
        subItem
          ? `Subcategoría de ${dept.label}`
          : `Catálogo completo de ${dept.label.toLowerCase()}`
      }
      products={list}
      crumbs={[
        { label: 'Inicio', to: '/' },
        ...(subItem
          ? [
              { label: dept.label, to: dept.path },
              { label: subItem.label },
            ]
          : [{ label: dept.label }]),
      ]}
      filters={filters}
    />
  )
}

export function categoryRoutes() {
  return departmentMenu.map((d) => d.id)
}
