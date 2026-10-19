import { m, useReducedMotion } from 'motion/react'
import type { Project } from '../data/portfolio'

export function ProjectPreview({
  project,
  priority = false,
}: {
  project: Project
  priority?: boolean
}) {
  const reduced = useReducedMotion()
  return (
    <figure className={`project-preview preview-${project.slug}`}>
      <m.img
        src={project.image}
        srcSet={project.gallery?.[0].srcSet}
        sizes="(min-width: 900px) 560px, (min-width: 600px) 80vw, 92vw"
        alt={project.imageAlt}
        width={project.gallery?.[0].width ?? 1200}
        height={project.gallery?.[0].height ?? 840}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        initial={false}
        whileInView={reduced || project.gallery ? {} : { scale: [1.035, 1] }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
      <figcaption>{project.gallery ? `${project.gallery[0].title} · Real project screenshot` : 'Editorial illustration · Not a project screenshot'}</figcaption>
    </figure>
  )
}
