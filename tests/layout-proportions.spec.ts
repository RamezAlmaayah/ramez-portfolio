import { expect, test } from '@playwright/test'

const sizes = [[320, 900], [375, 900], [768, 1024], [1024, 900], [1366, 768], [1440, 900], [1536, 864], [1920, 1080]]
const routes = ['/', '/projects/planora', '/projects/caeloterra', '/projects/unseen-jo', '/projects/moodle-dashboard', '/projects/fr-compare']

for (const theme of ['light', 'dark']) {
  test(`${theme}: proportional layout at 100% zoom across all requested sizes and pages`, async ({ page, isMobile }) => {
    test.skip(isMobile, 'This matrix uses explicit CSS viewport sizes; mobile interactions have separate coverage.')
    test.setTimeout(180000)
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.addInitScript((value) => localStorage.setItem('ramez-theme-v1', value), theme)
    for (const [width, height] of sizes) {
      await page.setViewportSize({ width, height })
      for (const route of routes) {
        await page.goto(route)
        await page.evaluate(() => document.fonts.ready)
        await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
        const metrics = await page.evaluate(() => {
          const style = (selector: string) => getComputedStyle(document.querySelector(selector)!)
          const box = (selector: string) => document.querySelector(selector)!.getBoundingClientRect()
          return {
            rootFont: style('html').fontSize,
            scale: visualViewport!.scale,
            zoom: style('html').zoom,
            transform: style('body').transform,
            overflow: document.documentElement.scrollWidth > innerWidth,
            container: box('.container').width,
            header: box('.header-inner').height,
            heading: parseFloat(style('h1').fontSize),
            body: parseFloat(style('body').fontSize),
          }
        })
        expect(metrics.rootFont).toBe('16px')
        expect(metrics.scale).toBe(1)
        expect(metrics.zoom).toBe('1')
        expect(metrics.transform).toBe('none')
        expect(metrics.overflow, `${route} ${theme} ${width}px`).toBe(false)
        expect(metrics.container).toBeLessThanOrEqual(1120)
        expect(metrics.header).toBe(width >= 900 ? 60 : width <= 620 ? 68 : 72)
        expect(metrics.body).toBeGreaterThanOrEqual(width >= 900 ? 15 : 16)
        expect(metrics.body).toBeLessThanOrEqual(width >= 900 ? 16 : 18)
        expect(metrics.heading).toBeGreaterThanOrEqual(36)
        expect(metrics.heading).toBeLessThanOrEqual(width >= 900 ? 52 : 68)
        if (route === '/' && width >= 1366) {
          expect(metrics.heading).toBeGreaterThanOrEqual(44)
          const fit = await page.evaluate(() => ({
            hero: document.querySelector('.hero')!.getBoundingClientRect().bottom,
            cta: document.querySelector('.hero-actions')!.getBoundingClientRect().bottom,
            sectionSize: parseFloat(getComputedStyle(document.querySelector('.section-heading h2')!).fontSize),
            artBottom: document.querySelector('.hero-art')!.getBoundingClientRect().bottom,
            descriptionTop: document.querySelector('.hero-description')!.getBoundingClientRect().top,
          }))
          expect(fit.hero).toBeLessThanOrEqual(height)
          expect(fit.cta).toBeLessThan(height - 40)
          expect(fit.sectionSize).toBeGreaterThanOrEqual(28)
          expect(fit.sectionSize).toBeLessThanOrEqual(34)
          expect(fit.artBottom).toBeLessThan(fit.descriptionTop)
          const headerItems = page.locator('.header-inner > *')
          const boxes = await headerItems.evaluateAll((items) => items.map((item) => {
            const rect = item.getBoundingClientRect()
            return { left: rect.left, right: rect.right }
          }))
          for (let i = 1; i < boxes.length; i++) expect(boxes[i].left).toBeGreaterThanOrEqual(boxes[i - 1].right)
        }
        const images = page.locator('.project-preview img, .gallery-stage img')
        for (const image of await images.all()) {
          await image.scrollIntoViewIfNeeded()
          await expect.poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
          const ratios = await image.evaluate(async (el) => {
            const img = el as HTMLImageElement
            const rect = img.getBoundingClientRect()
            if (!img.srcset) return { rendered: rect.width / rect.height, original: img.naturalWidth / img.naturalHeight }
            // srcset density correction rounds naturalWidth/naturalHeight to CSS pixels.
            // Decode the selected file without srcset to compare its actual pixel ratio.
            const source = new Image()
            source.src = img.currentSrc
            await source.decode()
            return { rendered: rect.width / rect.height, original: source.naturalWidth / source.naturalHeight }
          })
          expect(ratios.rendered).toBeCloseTo(ratios.original, 2)
        }
        if (route !== '/') {
          await expect(page.locator('.project-gallery')).toBeVisible()
          const box = await page.locator('.gallery-stage img').first().boundingBox()
          expect(box!.width).toBeLessThanOrEqual(width >= 900 ? 680 : 800)
          expect(box!.height).toBeLessThanOrEqual(width >= 900 ? 476 : 560)
        }
      }
    }
    for (const route of routes.slice(2)) {
      await page.goto(route)
      await page.getByRole('button', { name: /^Enlarge / }).click()
      await expect(page.getByRole('dialog')).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(page.getByRole('dialog')).not.toBeVisible()
      await expect(page.getByRole('button', { name: /^Enlarge / })).toBeFocused()
    }
    expect(errors).toEqual([])
  })
}

test('desktop proportions remain stable at device pixel ratio 2', async ({ browser, isMobile }) => {
  test.skip(isMobile)
  const context = await browser.newContext({ viewport: { width: 1366, height: 768 }, deviceScaleFactor: 2, reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173/')
  const metrics = await page.evaluate(() => ({
    dpr: devicePixelRatio,
    scale: visualViewport!.scale,
    header: document.querySelector('.header-inner')!.getBoundingClientRect().height,
    heroBottom: document.querySelector('.hero')!.getBoundingClientRect().bottom,
  }))
  expect(metrics.dpr).toBe(2)
  expect(metrics.scale).toBe(1)
  expect(metrics.header).toBe(60)
  expect(metrics.heroBottom).toBeLessThanOrEqual(768)
  await context.close()
})
