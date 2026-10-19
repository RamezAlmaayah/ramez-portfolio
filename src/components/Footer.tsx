import { ArrowUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolio } from '../data/portfolio'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <Link to="/#home" className="footer-brand" aria-label={`${portfolio.name}, home`}>
          <Logo context="footer" tone="light" decorative />
        </Link>
        <p>
          © {new Date().getFullYear()} {portfolio.name}
          <span>Considered design. Thoughtful engineering.</span>
        </p>
        <a
          href="#top"
          className="back-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'instant'
                : 'smooth',
            })
          }
        >
          Back to top
          <ArrowUp size={20} />
        </a>
      </div>
    </footer>
  )
}
