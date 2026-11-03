import { expect, test } from '@playwright/test'

declare global {
  interface Window { layoutShiftScore: number }
}

test('font and image loading do not cause substantial layout shifts', async ({ page }) => {
  await page.addInitScript(() => {
    const state = window
    state.layoutShiftScore = 0
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
        if (!shift.hadRecentInput) state.layoutShiftScore += shift.value
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })
  for (const route of ['/', '/projects/planora', '/projects/caeloterra', '/projects/unseen-jo', '/projects/moodle-dashboard', '/projects/fr-compare']) {
    await page.goto(route)
    await page.evaluate(() => document.fonts.ready)
    for (const image of await page.locator('main img:visible').all()) {
      await image.scrollIntoViewIfNeeded()
      await image.evaluate((el) => (el as HTMLImageElement).decode())
    }
    await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    const score = await page.evaluate(() => window.layoutShiftScore)
    expect(score, `${route} cumulative layout shift`).toBeLessThan(0.1)
  }
})
