import { ExternalLink } from 'lucide-react'
import type { Project } from '../data/portfolio'

export function ProjectLinks({ project }: { project: Project }) {
  if (!project.demo && !project.github) return null
  return (
    <div className="project-links" aria-label={`${project.title} project links`}>
      {project.demo ? (
        <a className="button button-white" href={project.demo} target="_blank" rel="noopener noreferrer">
          Live Demo <ExternalLink size={20} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null}
      {project.github ? (
        <a className="button button-white" href={project.github} target="_blank" rel="noopener noreferrer">
          View on GitHub <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.29-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.1 1.16A10.8 10.8 0 0 1 12 6.14c.96 0 1.92.13 2.81.38 2.15-1.46 3.1-1.16 3.1-1.16.61 1.56.23 2.71.11 3 .72.79 1.16 1.8 1.16 3.03 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.11c0 .3.21.65.77.54A11.25 11.25 0 0 0 12 .75Z" /></svg>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null}
    </div>
  )
}
