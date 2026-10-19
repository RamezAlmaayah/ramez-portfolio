import {
  Code2,
  Database,
  Layers,
  LayoutTemplate,
  ListChecks,
  Server,
  ShieldCheck,
  Terminal,
  Workflow,
} from 'lucide-react'
import { portfolio } from '../data/portfolio'
import { Reveal, SectionHeading } from './Section'
import { TechnologyList } from './TechnologyBadge'

const icons = {
  code: Code2,
  server: Server,
  layout: LayoutTemplate,
  database: Database,
  terminal: Terminal,
  workflow: Workflow,
  shield: ShieldCheck,
  layers: Layers,
  testing: ListChecks,
}

export function Skills() {
  return (
    <section id="skills" tabIndex={-1} className="section skills-section">
      <div className="container">
        <SectionHeading
          number="02"
          eyebrow="TECHNICAL EXPERTISE"
          title="A complete engineering toolkit."
          description="From the first requirement to the final interaction. A practical foundation across the full software lifecycle."
        />
        <div className="skills-grid">
          {portfolio.skills.map((skill, index) => {
            const Icon = icons[skill.icon as keyof typeof icons]
            return (
              <Reveal key={skill.name} className="skill-card" delay={(index % 3) * 0.06}>
                <div className="skill-top">
                  <Icon size={28} strokeWidth={1.4} />
                  <span>0{index + 1}</span>
                </div>
                <h3>{skill.name}</h3>
                <TechnologyList names={skill.items} size="skill" label={`${skill.name} skills`} />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
