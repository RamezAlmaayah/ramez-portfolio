import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../data/portfolio'
import { ProjectPreview } from './ProjectPreview'
import { ProjectLinks } from './ProjectLinks'
import { Magnetic } from './Button'
import { Reveal, SectionHeading } from './Section'
import { TechnologyList } from './TechnologyBadge'

export function Projects() {
  return (
    <section id="projects" tabIndex={-1} className="section projects-section">
      <div className="container">
        <SectionHeading
          number="03"
          eyebrow="SELECTED WORK / 2026"
          title="Real problems. Thoughtful systems."
          description="An inside look at the decisions, workflows, and engineering behind my work."
        />
        <div className="project-collection">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <Reveal key={project.slug} className={`featured-project project-${project.slug}`}>
                <ProjectPreview project={project} />
                <div className="project-content">
                  <div className="project-kicker">
                    <span>
                      {project.number} / {project.context}
                    </span>
                    {project.stage ? <span className="project-stage">{project.stage}</span> : null}
                  </div>
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-description">{project.description}</p>
                  <TechnologyList
                    names={project.technologies.slice(0, 4)}
                    className="project-stack"
                    label={`${project.title} technology stack`}
                  />
                  <Magnetic>
                    <Link
                      to={`/projects/${project.slug}`}
                      className="button button-white"
                      aria-label={`Explore ${project.title} case study`}
                    >
                      Explore Case Study
                      <ArrowUpRight size={21} />
                    </Link>
                  </Magnetic>
                  <ProjectLinks project={project} />
                </div>
              </Reveal>
            ))}
        </div>
        <div className="additional-work">
          <h3>Additional Work</h3>
          {projects.filter((project) => !project.featured).map((project) => (
            <Reveal key={project.slug} className={`additional-project${project.slug === 'fr-compare' ? ' additional-project-visual' : ''}`}>
              {project.slug === 'fr-compare' ? <ProjectPreview project={project} /> : null}
              <div>
                <p className="eyebrow">{project.context}</p>
                <h3>{project.title}</h3>
                {project.slug === 'fr-compare' ? <p className="project-subtitle">{project.subtitle}</p> : null}
                <p>{project.description}</p>
                {project.slug === 'fr-compare' ? <TechnologyList names={project.technologies} className="project-stack" label={`${project.title} technology stack`} /> : null}
                <Link to={`/projects/${project.slug}`} className="text-action" aria-label={`Explore ${project.title} case study`}>
                  Explore Case Study <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <ProjectLinks project={project} />
              </div>
              {project.slug !== 'fr-compare' ? <TechnologyList names={project.technologies} className="project-stack" label={`${project.title} technology stack`} /> : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
