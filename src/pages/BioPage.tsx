import './BioPage.css'

export function BioPage() {
  return (
    <section className="bio">
      <div className="bio__media">
        <img
          className="bio__photo"
          src="/media/bio/fritz-bio.jpg"
          alt="Fritz en la cabina"
          width={684}
          height={1024}
        />
        <span className="bio__filter" aria-hidden="true" />
      </div>

      <div className="bio__copy">
        <p className="bio__eyebrow">Hecho en Medellín</p>
        <h1 className="bio__title">Donde suena Fritz, la ciudad tiembla.</h1>

        <div className="bio__story">
          <p>
            Antes de los festivales y las giras, hubo una ciudad aprendiendo a
            bailar reggaetón. En esas noches de Medellín nació Edwin Fritz —
            conocido simplemente como Fritz — y con él, una forma de hacer que
            la gente grite, cante y no quiera que amanezca.
          </p>
          <p>
            Empezó en cabinas que ya son leyenda local: Sixxtina, Bolívar,
            Malayerba, Vintrash. Ahí no aprendió a poner canciones; aprendió a
            leer rostros, a sentir cuándo la pista pide clásico y cuándo pide
            futuro. Más de dieciocho años después, ese pulso sigue intacto:
            reggaetón de raíz mezclado con lo más crudo de lo urbano actual.
          </p>
          <p>
            El salto llegó cuando se convirtió en DJ oficial de Dálmata
            (2017–2022). De las discotecas de Medellín pasó a las grandes
            tarimas: multitudes, giras, festivales. Después sumó el camino
            junto a Víctor &amp; Gabo (2020–2022), afinando esa capacidad rara
            de potenciar a un artista principal sin apagar la propia firma.
          </p>
          <p>
            Ha compartido tarima y escenarios con artistas que marcan época:
            Karol G, Zion, Rauw Alejandro, Feid, Blessd, Ryan Castro, Ñejo,
            Beéle, Lui G 21+, La Factoría y muchos más. En 2024, en el Mañana
            Será Bonito Fest Bogotá, fue el DJ de la artista invitada Sharik:
            prueba de que su lugar no es solo la cabina del club — es el
            escenario grande, frente a miles.
          </p>
          <p>
            Hoy prende Colombia club por club. En Cali prende La Pérgola
            Clandestina — reconocida entre los 100 mejores clubes del mundo y
            #1 de Colombia — y Callao, la discoteca urbana más sobresaliente de
            la ciudad hoy, con propuesta fresca y el sello de El Mindo como
            socio. En Bogotá sube la temperatura en Neutro y Onírico; en
            Medellín enciende Envy Rooftop, en El Poblado; en el Oriente
            antioqueño manda en The Room by View y eleva la noche en Zelavi.
            Misma promesa en cada set: no solo mezclar — hacer que la pista
            grite, cante y arda hasta el final.
          </p>
        </div>

        <p className="bio__tagline">
          Gritos. Coros. Euforia. Eso es un set de Fritz.
        </p>
      </div>
    </section>
  )
}
