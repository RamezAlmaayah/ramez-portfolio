import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('Unseen Jo live demo and verified GitHub links are shared by the homepage and case study', async ({ page }) => {
  const url = 'https://unseenjo.netlify.app/'
  const repository = 'https://github.com/RamezAlmaayah/unseen-jo'
  // Test link navigation independently of third-party availability.
  await page.context().route(url, (route) => route.fulfill({ contentType: 'text/html', body: '<title>Unseen Jo demo destination</title>' }))
  await page.context().route(repository, (route) => route.fulfill({ contentType: 'text/html', body: '<title>Verified Unseen Jo repository destination</title>' }))
  for (const path of ['/', '/projects/unseen-jo']) {
    await page.goto(path)
    const actions = page.locator(path === '/' ? '.project-unseen-jo .project-links' : '.case-intro .project-links')
    const live = actions.getByRole('link', { name: /Live Demo/ })
    await expect(live).toBeVisible()
    await expect(live).toHaveAttribute('href', url)
    await expect(live).toHaveAttribute('target', '_blank')
    await expect(live).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(live).toHaveClass('button button-white')
    await expect(live.locator('svg')).toHaveClass(/lucide-external-link/)
    const github = actions.getByRole('link', { name: /View on GitHub/ })
    await expect(github).toHaveAttribute('href', repository)
    await expect(github).toHaveAttribute('target', '_blank')
    await expect(github).toHaveAttribute('rel', 'noopener noreferrer')
    await expect(github).toHaveClass('button button-white')
    await expect(github.locator('svg')).toBeAttached()
    if (path === '/') {
      await expect(page.getByRole('link', { name: 'Explore Unseen Jo case study' })).toHaveAttribute('href', '/projects/unseen-jo')
      await expect(page.locator('.project-planora .project-links').getByRole('link', { name: /Live Demo/ })).toHaveAttribute('href', 'https://planora.dynv6.net/')
    }
    for (const theme of ['light', 'dark']) {
      await page.evaluate((value) => document.documentElement.dataset.theme = value, theme)
      for (const width of [320, 375, 768, 1366, 1920]) {
        await page.setViewportSize({ width, height: 900 })
        await live.scrollIntoViewIfNeeded()
        await expect(live).toBeVisible()
        await expect(github).toBeVisible()
        const liveBox = await live.boundingBox()
        const githubBox = await github.boundingBox()
        expect(liveBox!.x + liveBox!.width <= githubBox!.x || liveBox!.y + liveBox!.height <= githubBox!.y).toBe(true)
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
      }
    }
    const [popup] = await Promise.all([page.waitForEvent('popup'), live.click()])
    await expect.poll(() => popup.url()).toBe(url)
    await popup.close()
    const [repositoryPopup] = await Promise.all([page.waitForEvent('popup'), github.click()])
    await expect.poll(() => repositoryPopup.url()).toBe(repository)
    expect(await repositoryPopup.evaluate(() => window.opener === null)).toBe(true)
    await repositoryPopup.close()
  }
})

test('Unseen Jo real screenshots, responsive thumbnails, swipe, and accessible lightbox', async ({ page }, info) => {
  test.setTimeout(120000)
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  const cover = page.locator('.preview-unseen-jo img')
  await cover.scrollIntoViewIfNeeded()
  await expect(cover).toHaveAttribute('src', '/projects/unseen-jo/homepage.png')
  await expect.poll(() => cover.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0)
  await expect(cover).toHaveAttribute('srcset', /homepage-640.webp/)
  await page.goto('/projects/unseen-jo')
  const gallery = page.getByRole('region', { name: 'Unseen Jo screenshot gallery' })
  await gallery.scrollIntoViewIfNeeded()
  const titles = ['Homepage', 'Explore and Map', 'Surprise Me Preferences']
  for (const width of [320, 375, 768, 1024, 1366, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 })
    for (const [index, title] of titles.entries()) {
      await gallery.getByRole('button', { name: new RegExp(`^0${index + 1}\\s*${title}$`) }).click()
      const image = gallery.locator('.gallery-stage img.is-active')
      await image.evaluate((el: HTMLImageElement) => el.decode())
      expect(await image.evaluate((el: HTMLImageElement) => Math.abs(el.width / el.height - el.naturalWidth / el.naturalHeight))).toBeLessThan(0.02)
      await expect(gallery.locator('.gallery-stage figcaption strong')).toHaveText(title)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await page.setViewportSize({ width: info.project.name === 'mobile' ? 375 : 1366, height: 900 })
  await gallery.getByRole('button', { name: /^01\s*Homepage$/ }).click()
  await page.keyboard.press('ArrowRight')
  await expect(gallery.locator('.gallery-stage figcaption strong')).toHaveText('Explore and Map')
  const enlarge = gallery.locator('.gallery-enlarge')
  await enlarge.dispatchEvent('touchstart', { touches: [{ identifier: 0, clientX: 250, clientY: 200 }] })
  await enlarge.dispatchEvent('touchend', { changedTouches: [{ identifier: 0, clientX: 100, clientY: 205 }] })
  await expect(gallery.locator('.gallery-stage figcaption strong')).toHaveText('Surprise Me Preferences')
  await enlarge.click()
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await enlarge.click()
  const dialog = page.getByRole('dialog')
  const close = dialog.getByRole('button', { name: 'Close screenshot viewer' })
  await expect(close).toBeFocused()
  await expect(dialog.locator('figcaption')).toContainText('fixed Figma sample')
  await page.keyboard.press('Shift+Tab')
  await expect(dialog.getByRole('button', { name: 'Next screenshot' })).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(close).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(dialog.locator('figcaption strong')).toHaveText('Homepage')
  await page.keyboard.press('ArrowLeft')
  await expect(dialog.locator('figcaption strong')).toHaveText('Surprise Me Preferences')
  await dialog.getByRole('button', { name: 'Previous screenshot' }).click()
  await expect(dialog.locator('figcaption strong')).toHaveText('Explore and Map')
  for (const theme of ['light', 'dark']) {
    await page.evaluate((value) => document.documentElement.dataset.theme = value, theme)
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
    await dialog.screenshot({ path: `test-results/unseen-lightbox-${theme}-${info.project.name}.png` })
  }
  await page.keyboard.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(enlarge).toBeFocused()
  await enlarge.click()
  await close.click()
  await expect(dialog).not.toBeVisible()
  for (const theme of ['light', 'dark']) {
    await page.evaluate((value) => document.documentElement.dataset.theme = value, theme)
    // Scan from the top so the sticky header does not partially cover header actions.
    await page.evaluate(() => window.scrollTo(0, 0))
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze()).violations).toEqual([])
    await gallery.screenshot({ path: `test-results/unseen-gallery-${theme}-${info.project.name}.png` })
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await gallery.getByRole('button', { name: 'Next screenshot' }).click()
  await expect(gallery.locator('.gallery-stage img.is-active')).toHaveCSS('transition-duration', '0.35s')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(await gallery.locator('.gallery-stage img.is-active').evaluate((el) => parseFloat(getComputedStyle(el).transitionDuration))).toBeLessThanOrEqual(0.001)
  expect(errors).toEqual([])
})
