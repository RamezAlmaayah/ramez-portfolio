import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { render, routes } from '../.ssr/entry-server.js'

const template = await readFile('dist/index.html', 'utf8')
const escape = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
// Optional real production origin. Never infer or invent a domain.
const siteUrl = process.env.SITE_URL ? new URL(process.env.SITE_URL).origin : null
for (const path of routes) {
  const { html, metadata } = render(path)
  let output = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(metadata.title)}</title>`)
  for (const [attribute, key, value] of [
    ['name', 'description', metadata.description],
    ['property', 'og:title', metadata.title],
    ['property', 'og:description', metadata.description],
    ['name', 'twitter:title', metadata.title],
    ['name', 'twitter:description', metadata.description],
  ])
    output = output.replace(
      new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*/?>`),
      `<meta ${attribute}="${key}" content="${escape(value)}" />`,
    )
  if (siteUrl) {
    const canonical = new URL(path, siteUrl).href
    const image = new URL('/social-preview.png', siteUrl).href
    output = output
      .replace(
        '</head>',
        `<link rel="canonical" href="${escape(canonical)}" /><meta property="og:url" content="${escape(canonical)}" /></head>`,
      )
      .replaceAll('content="/social-preview.png"', `content="${escape(image)}"`)
  }
  const directory = path === '/' ? 'dist' : join('dist', path.slice(1))
  await mkdir(directory, { recursive: true })
  await writeFile(join(directory, 'index.html'), output)
  // Vite preview resolves extensionless paths through matching .html files.
  if (path !== '/') await writeFile(join('dist', `${path.slice(1)}.html`), output)
}
if (siteUrl) {
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((path) => `<url><loc>${escape(new URL(path, siteUrl).href)}</loc></url>`).join('')}</urlset>`,
  )
  await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`)
}
console.log(`Prerendered ${routes.length} readable pages with per-page metadata.`)
