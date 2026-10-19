import { useState } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { getTechnology } from '../data/technologies'
import { TechnologyLogo } from './TechnologyLogo'

export function TechnologyBadge({
  name,
  size = 'compact',
  index = 0,
}: {
  name: string
  size?: 'skill' | 'compact'
  index?: number
}) {
  const technology = getTechnology(name)
  const [failed, setFailed] = useState(false)
  const reduced = useReducedMotion()
  const hasLogo = Boolean(technology?.logo && !failed)
  return (
    <m.span
      className={`technology-badge technology-badge--${size}${hasLogo ? '' : ' technology-badge--fallback'}`}
      data-technology={name}
      data-logo={hasLogo ? technology?.id : undefined}
      initial={false}
      whileInView={reduced ? {} : { y: [10, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduced ? 0 : 0.4,
        delay: Math.min(index, 6) * 0.035,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {hasLogo ? (
        <TechnologyLogo name={name} size={size} onError={() => setFailed(true)} />
      ) : null}
      <span className="technology-name">{name}</span>
    </m.span>
  )
}

export function TechnologyList({
  names,
  size = 'compact',
  className = '',
  label = 'Technologies',
}: {
  names: string[]
  size?: 'skill' | 'compact'
  className?: string
  label?: string
}) {
  return (
    <ul className={`technology-badges technology-badges--${size} ${className}`} aria-label={label}>
      {names.map((name, index) => (
        <li
          key={name}
          className={
            size === 'skill' && !getTechnology(name)?.logo && name.length > 22
              ? 'technology-item--wide'
              : undefined
          }
        >
          <TechnologyBadge name={name} size={size} index={index} />
        </li>
      ))}
    </ul>
  )
}
