import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'motion/react'

export function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  // Content stays readable before animation and in static HTML.
  return (
    <m.div
      className={className}
      initial={false}
      whileInView={reduced ? {} : { y: [24, 0] }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reduced ? 0 : 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}

export function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <Reveal className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{number} /</span>
          {eyebrow}
        </p>
        <h2>{title}</h2>
      </div>
      {description ? <p className="section-description">{description}</p> : null}
    </Reveal>
  )
}
