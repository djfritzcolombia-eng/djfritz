import { posts } from '../data/site'
import './Blog.css'

export function Blog() {
  return (
    <section className="section blog">
      <div className="container">
        <div className="section__head">
          <h1 className="section__title">Lanzamientos, guías y tutoriales</h1>
        </div>
        <div className="blog__grid">
          {posts.map((post, i) => (
            <article className="blog__card" key={post.id}>
              <div
                className="blog__thumb"
                style={{
                  background: `linear-gradient(145deg, hsl(${i * 55 + 350} 40% 20%), hsl(${i * 55 + 10} 50% 40%))`,
                }}
              />
              <div className="blog__body">
                <span>{post.tag}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
