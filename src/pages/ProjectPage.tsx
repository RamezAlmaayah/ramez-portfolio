import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/portfolio'
import { projects, unseenDetails } from '../data/portfolio'
import { ProjectGallery } from '../components/ProjectGallery'
import { ProjectLinks } from '../components/ProjectLinks'
import { Reveal } from '../components/Section'
import { Contact } from '../components/Contact'
import { TechnologyList } from '../components/TechnologyBadge'

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <Reveal className="detail-list">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Reveal>
  )
}

export function ProjectPage({ project }: { project: Project }) {
  const featured = projects.filter((item) => item.featured)
  const next = featured[(featured.findIndex((item) => item.slug === project.slug) + 1) % featured.length]
  const planned = Boolean(project.stage)
  return (
    <>
      <section className={`case-hero case-${project.slug}`}>
        <div className="container">
          <Link className="text-action case-back" to="/#projects">
            <ArrowLeft size={20} />
            Back to selected work
          </Link>
          <div className="case-title-grid">
            <div>
              <p className="eyebrow">
                CASE STUDY {project.number}{project.year ? ` / ${project.year}` : ''}
              </p>
              <h1 tabIndex={-1}>{project.title}</h1>
              <p className="case-subtitle">{project.subtitle}</p>
            </div>
            <div className="case-intro">
              <p>{project.description}</p>
              <ProjectLinks project={project} />
              {project.stage ? (
                <p className="stage-notice">
                  <span className="status-dot" />
                  {project.stage}
                  <span>
                    {project.slug === 'caeloterra'
                      ? 'Capabilities below describe development goals. No production release or agricultural validation is claimed.'
                      : project.stage}
                  </span>
                </p>
              ) : null}
            </div>
          </div>
          <div className="case-facts">
            <div>
              <span>CONTEXT</span>
              <p>{project.context}</p>
            </div>
            <div>
              <span>DISCIPLINE</span>
              <p>{project.category}</p>
            </div>
            {project.roles.length ? (
              <div>
                <span>MY ROLE</span>
                <p>{project.roles.join(' · ')}</p>
              </div>
            ) : null}
          </div>
          <ProjectGallery key={project.slug} project={project} />
        </div>
      </section>
      <div className="case-body container">
        {project.problem || project.solution ? <div className="case-problem-grid">
          <Reveal>
            <p className="eyebrow">01 / THE CHALLENGE</p>
            <h2>The problem worth solving.</h2>
            <p>{project.problem}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow">02 / {planned ? 'PROPOSED APPROACH' : 'THE APPROACH'}</p>
            <h2>{planned ? 'A direction, designed with purpose.' : 'A connected solution.'}</h2>
            <p>{project.solution}</p>
          </Reveal>
        </div> : null}
        {project.flow.length ? <section className="case-section">
          <Reveal>
            <p className="eyebrow">
              03 / {project.slug === 'unseen-jo' ? 'EXPERIENCE FLOW' : 'WORKFLOW'}
            </p>
            <h2>
              {planned
                ? 'How the proposed system comes together.'
                : 'How the system comes together.'}
            </h2>
            <p className="case-section-intro">
              {planned ? 'An architectural direction for the application in development.' : 'The implemented workflows and engineering decisions behind the application.'}
            </p>
          </Reveal>
          <ol className="flow-grid">
            {project.flow.map((step, index) => (
              <li key={step.title}>
                <Reveal delay={index * 0.08}>
                  <div className="flow-top">
                    <span>0{index + 1}</span>
                    {index < project.flow.length - 1 ? (
                      <ArrowRight size={25} aria-hidden="true" />
                    ) : (
                      <Check size={25} aria-hidden="true" />
                    )}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </section> : null}
        {project.slug === 'planora' ? (
          <section className="case-section">
            <p className="eyebrow">ARCHITECTURE / CONCEPTUAL VIEW</p>
            <h2>Separation that supports the workflow.</h2>
            <div className="architecture-flow">
              <div>
                <h3>Presentation</h3>
                <TechnologyList
                  names={['Razor', 'JavaScript', 'AJAX']}
                  label="Presentation technologies"
                />
                <p>Kanban and role-based interactions</p>
              </div>
              <ArrowRight size={28} aria-hidden="true" />
              <div>
                <h3>Application</h3>
                <TechnologyList
                  names={['ASP.NET Core MVC', 'Identity']}
                  label="Application technologies"
                />
                <p>Authorization and QA workflows</p>
              </div>
              <ArrowRight size={28} aria-hidden="true" />
              <div>
                <h3>Persistence</h3>
                <TechnologyList
                  names={['Entity Framework Core', 'SQL Server']}
                  label="Persistence technologies"
                />
                <p>Database-driven task management</p>
              </div>
            </div>
            <p className="case-section-intro">
              An explanatory grouping of the supplied stack, informed by Clean and Onion
              Architecture principles; not a repository-level class diagram.
            </p>
          </section>
        ) : null}
        <section className="case-section features-section">
          <Reveal>
            <p className="eyebrow">
              04 / {planned ? 'DESIGN GOALS & PLANNED FEATURES' : 'FUNCTIONAL SCOPE'}
            </p>
            <h2>
              {planned
                ? 'Designed to do more, thoughtfully.'
                : 'The details behind the experience.'}
            </h2>
          </Reveal>
          <ul className="case-feature-grid">
            {project.features.map((feature, index) => (
              <li key={feature}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{feature}</p>
              </li>
            ))}
          </ul>
        </section>
        {project.slug === 'unseen-jo' ? (
          <section className="case-section unseen-concept">
            <p className="eyebrow">DISCOVERY / IMPLEMENTED EXPERIENCE</p>
            <h2>Discovery starts with the person.</h2>
            <p className="case-section-intro">{unseenDetails.value}</p>
            <div className="unseen-details-grid">
              <DetailList title="Surprise Me preferences" items={unseenDetails.preferences} />
              <DetailList title="Authentication and data security" items={unseenDetails.security} />
              <DetailList title="Maps and interface" items={unseenDetails.interface} />
              <DetailList title="Performance engineering" items={unseenDetails.performance} />
            </div>
          </section>
        ) : null}
        <section className="case-section engineering-grid">
          <div>
            <p className="eyebrow">05 / ENGINEERING</p>
            <h2>Intentional foundations.</h2>
            <ul className="engineering-highlights">
              {project.highlights.map((highlight) => (
                <li key={highlight}>
                  <Check size={20} />
                  <p>{highlight}</p>
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="technology-panel">
            <h3>{planned ? 'Planned technology stack' : 'Technology stack'}</h3>
            <TechnologyList
              names={project.technologies}
              className="technology-list"
              label={`${project.title} full technology stack`}
            />
          </Reveal>
        </section>
        <Link to={`/projects/${next.slug}`} className="next-project">
          <span>
            CONTINUE EXPLORING<h2>{next.title}</h2>
          </span>
          <ArrowUpRight size={42} strokeWidth={1.3} />
        </Link>
      </div>
      <Contact />
    </>
  )
}
