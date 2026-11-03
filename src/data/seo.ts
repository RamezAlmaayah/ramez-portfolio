import { portfolio, projects } from './portfolio'
import { normalizePathname } from '../lib/routing'

export function getPageMetadata(path: string) {
  path = normalizePathname(path)
  const project = projects.find((item) => `/projects/${item.slug}` === path)
  return {
    canonical: new URL(path, 'https://ramez-dev-portfolio.netlify.app').href,
    title: project
      ? `${project.title} — Case Study | ${portfolio.name}`
      : path === '/'
        ? `${portfolio.name} — ${portfolio.role}`
        : `Page Not Found | ${portfolio.name}`,
    description: project
      ? project.description
      : `${portfolio.name}, Full-Stack Developer and Software Engineer in ${portfolio.location}. React, TypeScript, ASP.NET Core, PostgreSQL, Supabase, and database-driven applications.`,
    image: project ? project.image : '/social-preview.svg',
  }
}
