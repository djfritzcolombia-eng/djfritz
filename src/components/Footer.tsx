import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { useContent } from '../content/content-context'
import './Footer.css'

export function Footer() {
  const { content } = useContent()
  const instagram = content.settings.instagram?.trim()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link className="site-footer__brand" to="/" aria-label="Fritz">
          <img src="/logo-fritz-white.png" alt="Fritz" width={140} height={58} />
        </Link>
        <p>
          <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
          {' · '}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
        {instagram && (
          <p className="site-footer__social">
            <a href={instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </p>
        )}
        <p className="site-footer__copy">© {new Date().getFullYear()} Fritz · {site.domain}</p>
      </div>
    </footer>
  )
}
