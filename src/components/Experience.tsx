import { m, useReducedMotion } from 'motion/react'
import { portfolio } from '../data/portfolio'
import { Reveal, SectionHeading } from './Section'

export function Experience() {
  const reduced = useReducedMotion()
  return (
    <section id="experience" tabIndex={-1} className="section experience-section">
      <div className="container">
        <SectionHeading
          number="04"
          eyebrow="PROFESSIONAL EXPERIENCE"
          title="Learning through building."
          description="Hands-on internships, practical development, and collaborative problem solving."
        />
        <div className="experience-timeline">
          <m.div
            className="timeline-line"
            initial={false}
            whileInView={reduced ? {} : { scaleY: [0, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          />
          {portfolio.experience.map((experience, index) => (
            <Reveal key={experience.company} className="timeline-item" delay={index * 0.12}>
              <span className="timeline-dot" />
              <div className="timeline-meta">
                <span className="eyebrow">INTERNSHIP</span>
                <p>{experience.duration}</p>
              </div>
              <article>
                <h3>{experience.company}</h3>
                <p className="experience-role">{experience.role}</p>
                <p>{experience.description}</p>
                <ul className="responsibilities">
                  {experience.responsibilities.map((responsibility) => (
                    <li key={responsibility}>{responsibility}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
