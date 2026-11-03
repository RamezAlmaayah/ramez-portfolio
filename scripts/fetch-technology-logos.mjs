import { mkdir, writeFile } from 'node:fs/promises'
import { createHash } from 'node:crypto'

const destination = 'public/technologies'
await mkdir(destination, { recursive: true })
async function fetchText(url) {
  const response = await fetch(url, { headers: { 'User-Agent': 'ramez-portfolio-asset-import' } })
  if (!response.ok) throw new Error(`${response.status}: ${url}`)
  return response.text()
}
async function revision(repository) {
  const result = JSON.parse(
    await fetchText(`https://api.github.com/repos/${repository}/commits/HEAD`),
  )
  return result.sha
}
const deviconRevision = await revision('devicons/devicon')
const simpleRevision = await revision('simple-icons/simple-icons')
const devicon = [
  'react',
  'csharp',
  'dotnetcore',
  'javascript',
  'html5',
  'css3',
  'python',
  'php',
  'nodejs',
  'express',
  'mongoose',
  'mongodb',
  'mysql',
  'microsoftsqlserver',
  'git',
  'github',
  'visualstudio',
  'vscode',
  'firebase',
  'figma',
  'postman',
  'tailwindcss',
  'typescript',
  'angular',
  'bootstrap',
  'moodle',
  'entityframeworkcore',
]
const assets = [
  ...devicon.map((slug) => ({
    slug,
    repository: 'devicons/devicon',
    revision: deviconRevision,
    path: `icons/${slug}/${slug}-original.svg`,
  })),
  ...['leaflet', 'openstreetmap'].map((slug) => ({
    slug,
    repository: 'simple-icons/simple-icons',
    revision: simpleRevision,
    path: `icons/${slug}.svg`,
  })),
]
// Downloads are build-time authoring work only. Every production image is local.
const manifest = await Promise.all(
  assets.map(async (asset) => {
    const url = `https://raw.githubusercontent.com/${asset.repository}/${asset.revision}/${asset.path}`
    const svg = await fetchText(url)
    if (
      !svg.includes('<svg') ||
      /<script|<foreignObject|\bonload=|\bonerror=|(?:href|src)=["']https?:/i.test(svg)
    )
      throw new Error(`Unexpected SVG content: ${asset.slug}`)
    await writeFile(`${destination}/${asset.slug}.svg`, svg)
    return {
      ...asset,
      source: url,
      local: `/technologies/${asset.slug}.svg`,
      sha256: createHash('sha256').update(svg).digest('hex'),
    }
  }),
)
await writeFile(`${destination}/sources.json`, JSON.stringify(manifest, null, 2) + '\n')
for (const [repository, sha, source, local] of [
  ['devicons/devicon', deviconRevision, 'LICENSE', 'DEVICON-LICENSE.txt'],
  ['simple-icons/simple-icons', simpleRevision, 'LICENSE.md', 'SIMPLE-ICONS-LICENSE.md'],
])
  await writeFile(
    `${destination}/${local}`,
    await fetchText(`https://raw.githubusercontent.com/${repository}/${sha}/${source}`),
  )
console.log(`Saved ${manifest.length} local SVG logos with pinned provenance and licenses.`)
