import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { getPageMetadata } from './data/seo'
import { projects } from './data/portfolio'

export const routes = [
  '/',
  ...projects.map((project) => `/projects/${project.slug}`),
]
export function render(path: string) {
  return {
    html: renderToString(
      <StaticRouter location={path}>
        <App />
      </StaticRouter>,
    ),
    metadata: getPageMetadata(path),
  }
}
