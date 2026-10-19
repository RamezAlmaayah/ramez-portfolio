import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const directory = 'docs/branding-previews'
await mkdir(directory, { recursive: true })
const browser = await chromium.launch()
for (const [width, height] of [[320, 900], [375, 900], [1366, 768], [1920, 1080]]) {
  for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: width <= 620, hasTouch: width <= 620, colorScheme: theme, reducedMotion: 'reduce' })
    await context.addInitScript(value => localStorage.setItem('ramez-theme-v1', value), theme)
    const page = await context.newPage()
    await page.goto('http://127.0.0.1:4173/')
    await page.evaluate(() => document.fonts.ready)
    await page.locator('.brand img:visible').evaluate(img => img.decode())
    await page.screenshot({ path: `${directory}/home-${theme}-${width}.png` })
    for (const [name, selector] of [['header', '.site-header'], ['about', '.about-aside'], ['footer', '.site-footer']]) {
      await page.locator(selector).scrollIntoViewIfNeeded()
      await page.locator(selector).locator('img:visible').evaluateAll(images => Promise.all(images.map(img => img.decode())))
      // Let late scroll-triggered layout and font work settle before clipping.
      await page.waitForTimeout(350)
      await page.locator(selector).screenshot({ path: `${directory}/${name}-${theme}-${width}.png` })
    }
    if (width === 375) {
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.getByRole('button', { name: 'Open navigation' }).click()
      await page.screenshot({ path: `${directory}/menu-${theme}-${width}.png` })
    }
    await context.close()
  }
}
await browser.close()
console.log('Captured supplied RA logo in header, About, footer, and mobile menu in both themes.')
