import { chromium } from '@playwright/test'
const browser = await chromium.launch()
const page = await browser.newPage({ reducedMotion: 'reduce' })
await page.goto('http://127.0.0.1:5173/')
for (const width of [320, 375, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 })
  await page.evaluate(() => document.fonts.ready)
  console.log(
    width,
    await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      offenders: [...document.querySelectorAll('body *')]
        .map((element) => ({
          tag: element.tagName,
          class: element.className,
          right: element.getBoundingClientRect().right,
          width: element.getBoundingClientRect().width,
        }))
        .filter((item) => item.right > window.innerWidth + 1 && item.width > 0)
        .slice(0, 16),
    })),
  )
}
await browser.close()
