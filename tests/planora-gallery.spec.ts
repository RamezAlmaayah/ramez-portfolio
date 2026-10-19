import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('Planora screenshots, official links, responsive gallery, and accessible lightbox', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  const cover = page.locator('.preview-planora img')
  await cover.scrollIntoViewIfNeeded()
  await expect(cover).toHaveAttribute('src', '/work/planora-dashboard.png')
  await expect(cover).toHaveJSProperty('naturalWidth', 1360)
  const project = page.locator('.project-planora')
  await expect(project.getByRole('link', { name: /Live Demo/ })).toHaveAttribute('href', 'https://planora.dynv6.net/')
  await page.goto('/projects/planora')
  for (const [name, url] of [
    ['Live Demo', 'https://planora.dynv6.net/'],
    ['View on GitHub', 'https://github.com/RamezAlmaayah/Planora-Project-Management-System'],
  ]) {
    const link = page.getByRole('link', { name: new RegExp(name) })
    await expect(link).toBeVisible()
    await expect(link).toHaveAttribute('href', url)
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    // Verify popup navigation independently of the third-party site's uptime.
    await page.context().route(url, (route) => route.fulfill({ contentType: 'text/html', body: '<title>External destination</title>' }))
    const [popup] = await Promise.all([page.waitForEvent('popup'), link.click()])
    await expect.poll(() => popup.url()).toContain(new URL(url).hostname)
    await popup.close()
    await page.context().unroute(url)
  }
  const gallery = page.getByRole('region', { name: 'Planora screenshot gallery' })
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    for (const image of await gallery.locator('.gallery-stage img').all()) {
      await expect(image).toHaveJSProperty('naturalWidth', 1360)
      await expect(image).toHaveJSProperty('naturalHeight', 767)
      const ratio = await image.evaluate((el) => el.getBoundingClientRect().width / el.getBoundingClientRect().height)
      expect(ratio).toBeCloseTo(1360 / 767, 2)
    }
  }
  await page.setViewportSize({ width: test.info().project.name === 'mobile' ? 375 : 1440, height: 900 })
  await gallery.getByRole('button', { name: 'Next screenshot' }).click()
  await expect(gallery.getByRole('button', { name: /02\s*Project Analytics/ })).toHaveAttribute('aria-pressed', 'true')
  await gallery.getByRole('button', { name: 'Previous screenshot' }).click()
  await gallery.getByRole('button', { name: 'Enlarge Admin Dashboard' }).click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Close screenshot viewer' })).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden')
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('button', { name: 'Next screenshot' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(dialog.getByRole('button', { name: 'Close screenshot viewer' })).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(dialog.locator('figcaption strong')).toHaveText('Project Analytics')
  await page.keyboard.press('ArrowLeft')
  await expect(dialog.locator('figcaption strong')).toHaveText('Admin Dashboard')
  await dialog.getByRole('button', { name: 'Next screenshot' }).click()
  await expect(dialog.locator('figcaption strong')).toHaveText('Project Analytics')
  await dialog.getByRole('button', { name: 'Previous screenshot' }).click()
  for (const theme of ['light', 'dark']) {
    await page.evaluate((value) => document.documentElement.dataset.theme = value, theme)
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
  }
  await page.screenshot({ path: `test-results/planora-lightbox-${test.info().project.name}.png`, fullPage: true })
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(gallery.getByRole('button', { name: 'Enlarge Admin Dashboard' })).toBeFocused()
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
  await gallery.getByRole('button', { name: 'Enlarge Admin Dashboard' }).click()
  await dialog.getByRole('button', { name: 'Close screenshot viewer' }).click()
  await expect(dialog).not.toBeVisible()
  await page.evaluate(() => document.documentElement.dataset.theme = 'light')
  await gallery.screenshot({ path: `test-results/planora-gallery-${test.info().project.name}.png` })
  expect(errors).toEqual([])
})
