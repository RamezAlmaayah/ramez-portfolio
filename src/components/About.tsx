import { ArrowUpRight } from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal, SectionHeading } from './Section'
import { Logo } from './Logo'

export function About() {
  return (
    <section id="about" tabIndex={-1} className="section about-section">
      <div className="container">
        <SectionHeading
          number="01"
          eyebrow="BEYOND THE INTERFACE"
          title="Beyond Code. Building Solutions That Matter."
        />
        <div className="about-grid">
          <Reveal className="about-aside">
            <Logo context="about" />
            <p className="aside-statement">
              A considered approach.
              <br />
              From problem to possibility.
            </p>
            <a className="text-action" href="#experience">
              Explore my background
              <ArrowUpRight size={19} />
            </a>
            <div className="language-list">
              <h3>Languages</h3>
              {portfolio.languages.map((language) => (
                <p key={language}>{language}</p>
              ))}
            </div>
          </Reveal>
          <div className="about-copy">
            {portfolio.about.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.06}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="about-foundations">
          <Reveal>
            <h3>Where I focus</h3>
            <ul className="focus-list">
              {portfolio.focus.map((focus, index) => (
                <li key={focus}>
                  <span>0{index + 1}</span>
                  {focus}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <h3>How I work</h3>
            <ul className="strength-list">
              {portfolio.strengths.map((strength) => (
                <li key={strength}>{strength}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
