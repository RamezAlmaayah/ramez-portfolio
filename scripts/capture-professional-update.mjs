import { mkdir } from 'node:fs/promises'
import { chromium } from '@playwright/test'

const baseURL = process.env.PORTFOLIO_BASE_URL || 'http://127.0.0.1:4173'
const directory = 'docs/validation/professional-update'
await mkdir(directory, { recursive: true })
const browser = await chromium.launch()
try {
  for (const [device, width, height] of [['desktop', 1366, 768], ['mobile', 390, 844]]) {
    for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: 'reduce' })
      await page.addInitScript(value => localStorage.setItem('ramez-theme-v1', value), theme)
      for (const [name, route, selector] of [
        ['home', '/', '.hero'],
        ['fr-compare', '/projects/fr-compare', '.case-hero'],
        ['project-card', '/', '.additional-project-visual'],
      ]) {
        await page.goto(new URL(route, baseURL).href)
        await page.evaluate(() => document.fonts.ready)
        const target = page.locator(selector)
        await target.scrollIntoViewIfNeeded()
        for (const image of await target.locator('img').all())
          await image.evaluate(element => element.decode())
        // Section captures omit floating navigation to avoid occlusion during capture.
        await target.screenshot({
          path: `${directory}/${name}-${theme}-${device}.png`,
          style: '.site-header, .skip-link { visibility: hidden !important; }',
        })
      }
      await page.close()
    }
  }
} finally {
  await browser.close()
}
