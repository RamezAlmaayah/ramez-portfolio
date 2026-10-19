import { chromium } from '@playwright/test'
import { mkdir, readFile } from 'node:fs/promises'

await mkdir('test-results/previews', { recursive: true })
const browser = await chromium.launch()
const baseUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:5173'
for (const [name, width, theme] of [
  ['desktop', 1440, 'light'],
  ['mobile', 375, 'light'],
  ['dark', 1440, 'dark'],
]) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    reducedMotion: 'reduce',
    colorScheme: theme,
  })
  for (const [route, slug] of [
    ['/', 'home'],
    ['/projects/planora', 'planora'],
    ['/projects/caeloterra', 'caeloterra'],
    ['/projects/unseen-jo', 'unseen-jo'],
    ['/projects/moodle-dashboard', 'moodle'],
  ]) {
    await page.goto(`${baseUrl}${route}`)
    await page.evaluate(() => document.fonts.ready)
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded()
      await image.evaluate((element) =>
        element.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              element.onload = resolve
            }),
      )
    }
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({ path: `test-results/previews/${slug}-${name}.png`, fullPage: true })
    await page.screenshot({ path: `test-results/previews/${slug}-lead-${name}.png` })
    if (slug === 'home') await page.screenshot({ path: `test-results/previews/hero-${name}.png` })
  }
  await page.close()
}
// Raster social artwork is exported from our original vector illustration.
const social = await browser.newPage({ viewport: { width: 1200, height: 840 } })
const artwork = await readFile('public/social-preview.svg', 'utf8')
await social.setContent(
  `<style>body{margin:0}svg{width:1200px;height:840px}</style>${artwork}`,
)
await social.screenshot({ path: 'public/social-preview.png' })
await browser.close()
console.log(
  'Captured desktop, mobile, and dark-theme homepage/case-study previews, plus the social image.',
)
