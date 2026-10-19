import { portfolio } from '../data/portfolio'

export function Logo({ context = 'header', tone = 'auto', decorative = false }: {
  context?: 'header' | 'footer' | 'about'
  tone?: 'auto' | 'light'
  decorative?: boolean
}) {
  const alt = decorative ? '' : `${portfolio.name} RA monogram`
  return (
    <span className={`portfolio-logo portfolio-logo--${context}`} data-tone={tone} aria-hidden={decorative || undefined}>
      <img className="portfolio-logo__original" src="/branding/ra-logo.png" alt={alt} width="1010" height="578" decoding="async" />
      <img className="portfolio-logo__light" src="/branding/ra-logo-light.png" alt={alt} width="1010" height="578" decoding="async" />
    </span>
  )
}
