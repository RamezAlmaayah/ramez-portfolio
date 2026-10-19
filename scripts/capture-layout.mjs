import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'

const phase = process.argv[2] || 'after'
const directory = `docs/layout-previews/${phase}`
await mkdir(directory, { recursive: true })
const browser = await chromium.launch()
const measurements = []
for (const theme of ['light', 'dark']) {
  const context = await browser.newContext({ deviceScaleFactor: 1, reducedMotion: 'reduce', colorScheme: theme })
  await context.addInitScript((value) => localStorage.setItem('ramez-theme-v1', value), theme)
  const page = await context.newPage()
  for (const [width, height] of [[1366, 768], [1440, 900], [1536, 864], [1920, 1080]]) {
    await page.setViewportSize({ width, height })
    for (const route of ['/', '/projects/planora', '/projects/caeloterra', '/projects/unseen-jo', '/projects/moodle-dashboard', '/projects/gym-management']) {
      if (route !== '/' && width !== 1366 && width !== 1920) continue
      await page.goto(`http://127.0.0.1:4173${route}`)
      await page.evaluate(() => document.fonts.ready)
      await page.evaluate((value) => document.documentElement.dataset.theme = value, theme)
      const metrics = await page.evaluate(() => {
        const measure = (selector) => {
          const el = document.querySelector(selector)
          if (!el) return null
          const box = el.getBoundingClientRect()
          const style = getComputedStyle(el)
          return { width: box.width, height: box.height, top: box.top, bottom: box.bottom, fontSize: style.fontSize, paddingTop: style.paddingTop, paddingBottom: style.paddingBottom }
        }
        return {
          viewport: [innerWidth, innerHeight], dpr: devicePixelRatio, visualScale: visualViewport.scale,
          rootFont: getComputedStyle(document.documentElement).fontSize,
          rootZoom: getComputedStyle(document.documentElement).zoom,
          bodyTransform: getComputedStyle(document.body).transform,
          pageHeight: document.documentElement.scrollHeight,
          overflow: document.documentElement.scrollWidth > innerWidth,
          container: measure('.container'), header: measure('.header-inner'), hero: measure('.hero'),
          heading: measure('h1'), description: measure('.hero-description > p'), actions: measure('.hero-actions'),
          section: measure('.section'), sectionHeading: measure('.section-heading h2'),
          caseImage: measure('.case-hero .project-preview img, .gallery-stage .gallery-image-stack img'),
        }
      })
      measurements.push({ theme, route, ...metrics })
      if (width === 1366 || width === 1920) {
        const slug = route === '/' ? 'home' : route.split('/').pop()
        await page.screenshot({ path: `${directory}/${slug}-${theme}-${width}x${height}.png` })
        if (route === '/' && ['compact-after', 'cv-update'].includes(phase)) {
          for (const section of ['skills', 'projects', 'experience', 'education']) {
            await page.locator(`#${section}`).screenshot({ path: `${directory}/${section}-${theme}-${width}x${height}.png` })
          }
        }
        if (route === '/projects/planora') {
          await page.locator('.project-gallery').screenshot({ path: `${directory}/planora-gallery-${theme}-${width}x${height}.png` })
        }
      }
    }
  }
  await context.close()
}
await browser.close()
await writeFile(`${directory}/measurements.json`, JSON.stringify(measurements, null, 2))
console.log(JSON.stringify(measurements.filter((item) => item.route === '/' && item.theme === 'light'), null, 2))
