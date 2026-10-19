import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

await mkdir('test-results/technology-previews', { recursive: true })
const browser = await chromium.launch()
for (const [name, width, theme] of [
  ['desktop', 1440, 'light'],
  ['mobile', 375, 'light'],
  ['dark', 1440, 'dark'],
]) {
  const page = await browser.newPage({
    viewport: { width, height: 1000 },
    colorScheme: theme,
    reducedMotion: 'reduce',
  })
  const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4173'
  for (const [route, selector, label] of [
    ['/', '#skills', 'skills'],
    ['/', '.featured-project', 'featured'],
    ['/projects/planora', '.architecture-flow', 'architecture'],
    ['/projects/unseen-jo', '.technology-panel', 'stack'],
  ]) {
    await page.goto(`${base}${route}`)
    await page.evaluate(() => document.fonts.ready)
    const target = page.locator(selector).first()
    await target.scrollIntoViewIfNeeded()
    for (const image of await target.locator('img').all()) {
      await image.scrollIntoViewIfNeeded()
      await image.evaluate((element) =>
        element.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              element.onload = resolve
              element.onerror = resolve
            }),
      )
    }
    await target.screenshot({
      path: `test-results/technology-previews/${label}-${name}.png`,
      style: '.site-header, .skip-link { visibility: hidden !important; }',
    })
  }
  await page.close()
}
await browser.close()
