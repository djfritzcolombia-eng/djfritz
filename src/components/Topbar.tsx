import { Link } from 'react-router-dom'
import { site } from '../data/site'
import './Topbar.css'

export function Topbar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <p className="topbar__msg">
          Envíos a todo {site.city} · Equipos DJ verificados · {site.domain}
        </p>
        <div className="topbar__links">
          <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
          <Link to="/contacto">Ayuda</Link>
          <Link to="/contacto">Mi cuenta</Link>
        </div>
      </div>
    </div>
  )
}
