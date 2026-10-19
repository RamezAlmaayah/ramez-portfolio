import { expect, test } from '@playwright/test'

test('custom RA branding, theme variants, compact navigation, icons, and homepage links', async ({ page, request, isMobile }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await expect(page.locator('.brand-mark, .editorial-monogram')).toHaveCount(0)
  const header = page.locator('.header-inner')
  const initialHeight = (await header.boundingBox())!.height
  for (const theme of ['light', 'dark']) {
    if (await page.locator('html').getAttribute('data-theme') !== theme) {
      await page.getByRole('button', { name: `Switch to ${theme} theme` }).click()
    }
    const headerLogo = page.locator('.brand .portfolio-logo')
    await expect(headerLogo).toBeVisible()
    const current = headerLogo.locator(`.portfolio-logo__${theme === 'light' ? 'original' : 'light'}`)
    await expect(current).toBeVisible()
    await expect(current).toHaveJSProperty('naturalWidth', 1010)
    await expect(current).toHaveJSProperty('naturalHeight', 578)
    const box = (await headerLogo.boundingBox())!
    expect(box.width).toBe(isMobile ? 34 : 38)
    expect(box.width / box.height).toBeCloseTo(1010 / 578, 2)
    expect(await current.evaluate((el) => getComputedStyle(el).filter)).toBe('none')
    expect((await header.boundingBox())!.height).toBe(initialHeight)
    expect(initialHeight).toBe(isMobile ? 68 : 60)
    await expect(page.locator('.about-aside .portfolio-logo img:visible')).toHaveAttribute('alt', /RA monogram/)
    await expect(page.locator('.footer-brand .portfolio-logo__light')).toBeVisible()
    expect((await page.locator('.footer-brand .portfolio-logo').boundingBox())!.width).toBe(46)
    await page.screenshot({ path: `test-results/branding-${theme}-${test.info().project.name}.png` })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  for (const [file, size] of [['favicon-16.png', 16], ['favicon-32.png', 32], ['favicon-180.png', 180], ['apple-touch-icon.png', 180]] as const) {
    const response = await request.get(`/branding/${file}`)
    expect(response.status()).toBe(200)
    const dimensions = await page.evaluate(async (path) => {
      const image = new Image()
      image.src = path
      await image.decode()
      return [image.naturalWidth, image.naturalHeight]
    }, `/branding/${file}`)
    expect(dimensions).toEqual([size, size])
  }
  await expect(page.locator('link[rel="icon"][sizes="32x32"]')).toHaveAttribute('href', '/branding/favicon-32.png')
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', '/branding/apple-touch-icon.png')
  expect((await request.get('/favicon.ico')).status()).toBe(200)
  const legacy = await request.get('/favicon.svg')
  expect(await legacy.text()).toContain('data:image/png;base64,')
  await page.goto('/projects/planora')
  await page.locator('.brand').click()
  await expect(page).toHaveURL('/#home')
  await page.locator('.footer-brand').click()
  await expect(page).toHaveURL('/#home')
  if (isMobile) {
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused()
  } else {
    const logo = page.locator('.brand .portfolio-logo')
    // The existing global reduced-motion reset uses a near-zero duration.
    expect(await logo.evaluate(el => parseFloat(getComputedStyle(el).transitionDuration))).toBeLessThanOrEqual(0.001)
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.locator('.brand').hover()
    await expect.poll(() => logo.evaluate(el => getComputedStyle(el).transform)).not.toBe('none')
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(logo).toHaveCSS('transform', 'none')
  }
  expect(errors).toEqual([])
})
