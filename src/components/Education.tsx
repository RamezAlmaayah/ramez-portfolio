import { ArrowUpRight, GraduationCap } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal, SectionHeading } from './Section'

export function Education() {
  return (
    <section id="education" tabIndex={-1} className="section education-section">
      <div className="container">
        <SectionHeading
          number="05"
          eyebrow="EDUCATION & TRAINING"
          title="A foundation. An ongoing pursuit."
        />
        <div className="education-grid">
          <Reveal className="education-card">
            <GraduationCap size={40} strokeWidth={1.3} />
            <p className="eyebrow">{portfolio.education.duration}</p>
            <h3>{portfolio.education.degree}</h3>
            <p>{portfolio.education.school}</p>
            <span>{portfolio.education.location}</span>
          </Reveal>
          <div className="training-list">
            <h3>Training & certificates</h3>
            {portfolio.training.map((training, index) => (
              <Reveal className="training-item" key={training.title} delay={index * 0.06}>
                <div>
                  <h4>{training.title}</h4>
                  <p>{training.provider}</p>
                  {training.status ? <span className="eyebrow">{training.status}</span> : null}
                </div>
                <ArrowUpRight size={24} aria-hidden="true" />
              </Reveal>
            ))}
            <p className="training-note">
              Continuing professional learning. The AI Engineering program is in progress.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
