import { getTechnology } from '../data/technologies'

export function TechnologyLogo({ name, size = 'compact', onError }: {
  name: string
  size?: 'skill' | 'compact'
  onError?: () => void
}) {
  const technology = getTechnology(name)
  if (!technology?.logo) return null
  return (
    <span className={`technology-logo technology-logo--${technology.surface ?? 'white'}`} aria-hidden="true"
      title={technology.family ? `${technology.family} family logo` : undefined}>
      <img src={technology.logo} alt="" width={size === 'skill' ? 40 : 28} height={size === 'skill' ? 40 : 28}
        loading="lazy" decoding="async" onError={onError} />
    </span>
  )
}
