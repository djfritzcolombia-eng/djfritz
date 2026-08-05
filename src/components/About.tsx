import type { ReactNode } from 'react'
import { trust } from '../data/site'
import './About.css'

type Props = {
  compact?: boolean
  cta?: ReactNode
}

export function About({ compact, cta }: Props) {
  return (
    <section className="section about" id={compact ? undefined : 'contacto'}>
      <div className="container about__grid">
        <div className="about__copy">
          <h2>Equipos DJ, sonido e iluminación</h2>
          <p>
            DJ Fritz reúne un catálogo amplio de controladores, sonido, luces y accesorios
            profesionales. Encontrarás marcas como Pioneer, HK Audio, Audio-Technica, VA Proled y
            más, listas para tu próximo setup.
          </p>
          {!compact && (
            <p>
              Encuentra ofertas y arma tu setup completo con búsqueda por marca, envíos nacionales
              y catálogo claro por categoría.
            </p>
          )}
          {cta}
        </div>
        <div className="about__trust">
          {trust.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
