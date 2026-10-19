import { expect, test } from '@playwright/test'
import type { Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const caseStudies = [
  { slug: 'planora', title: 'Planora', proof: 'QA Pass/Fail' },
  { slug: 'caeloterra', title: 'CaeloTerra', proof: 'IN DEVELOPMENT' },
  { slug: 'unseen-jo', title: 'Unseen Jo', proof: 'Row Level Security (RLS)' },
  { slug: 'moodle-dashboard', title: 'Moodle Excel Management Dashboard', proof: 'PhpSpreadsheet' },
  { slug: 'gym-management', title: 'Gym Management System', proof: 'Postman' },
]
const widths = [320, 375, 768, 1024, 1440]
const violations = async (page: Page) => {
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze()
  return result.violations.map((violation) => ({
    id: violation.id,
    nodes: violation.nodes.map((node) => ({ target: node.target, summary: node.failureSummary })),
  }))
}

test('homepage, accessible menu, section indication, and truthful resume state', async ({
  page,
  isMobile,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Engineering')
  await expect(page.getByText("Ramez Ahmad ALMAAYE'H", { exact: true })).toBeVisible()
  for (const link of await page.getByRole('link', { name: /Download Resume/ }).all()) {
    await expect(link).toHaveAttribute('href', '/ramez-ahmad-resume.pdf')
    await expect(link).toHaveAttribute('download', '')
  }
  await expect(page.getByRole('link', { name: /EMAIL ramezmayaa/ })).toHaveAttribute(
    'href',
    'mailto:ramezmayaa@gmail.com',
  )
  await expect(page.getByRole('link', { name: /Connect on LinkedIn/ })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/ramez-al-maayah-b076ba425',
  )
  await expect(page.getByRole('link', { name: /PHONE/ })).toHaveAttribute(
    'href',
    'tel:+962779149585',
  )
  if (isMobile) {
    await page.getByRole('button', { name: 'Open navigation' }).click()
    const menu = page.getByRole('navigation', { name: 'Mobile navigation' })
    await expect(menu.getByRole('link', { name: 'Home' })).toBeFocused()
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('hidden')
    await page.keyboard.press('Shift+Tab')
    await expect(page.getByRole('button', { name: 'Close navigation' })).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(menu.getByRole('link', { name: 'Resume', exact: true })).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(menu.getByRole('link', { name: 'Contact' })).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused()
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await menu.getByRole('link', { name: 'Projects' }).click()
    await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
      'aria-expanded',
      'false',
    )
    expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
  } else {
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Projects' })
      .click()
    await expect(
      page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name: 'Projects' }),
    ).toHaveAttribute('aria-current', 'location')
  }
  await expect(page).toHaveURL(/#projects$/)
  await expect(page.locator('#projects')).toBeFocused()
  expect(errors).toEqual([])
})

for (const project of caseStudies) {
  test(`${project.title}: route, content, metadata, accessibility, and back navigation`, async ({
    page,
  }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/')
    await page.getByRole('link', { name: `Explore ${project.title} case study` }).click()
    await expect(page).toHaveURL(`/projects/${project.slug}`)
    await expect(page.getByRole('heading', { level: 1, name: project.title })).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toBeFocused()
    await expect(page).toHaveTitle(new RegExp(project.title))
    await expect(page.getByText(project.proof).first()).toBeAttached()
    await page.reload()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(project.title)
    expect(await violations(page)).toEqual([])
    await page.evaluate(() => document.fonts.ready)
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 })
      await expect
        .poll(
          () => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
          { message: `No case-study overflow at ${width}px` },
        )
        .toBe(true)
      expect(
        await page
          .getByRole('heading', { level: 1 })
          .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
      ).toBeGreaterThanOrEqual(36)
    }
    await page.getByRole('link', { name: 'Back to selected work' }).click()
    await expect(page).toHaveURL('/#projects')
    await expect(page.locator('#projects')).toBeFocused()
    expect(errors).toEqual([])
  })
}

test('both themes, readable typography, reduced motion, images, and responsive layouts', async ({
  page,
}) => {
  test.setTimeout(120000)
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
  await page.goto('/')
  for (const theme of ['light', 'dark']) {
    if (theme === 'dark') await page.getByRole('button', { name: 'Switch to dark theme' }).click()
    await expect(page.locator('html')).toHaveAttribute('data-theme', theme)
    expect(await violations(page)).toEqual([])
    for (const project of caseStudies) {
      await page.goto(`/projects/${project.slug}`)
      expect(await violations(page)).toEqual([])
    }
    await page.goto('/')
  }
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark')
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe(
    'auto',
  )
  await page.evaluate(() => document.fonts.ready)
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 })
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), {
        message: `No homepage overflow at ${width}px`,
      })
      .toBe(true)
    const heroSize = await page
      .locator('.hero h1')
      .evaluate((element) => parseFloat(getComputedStyle(element).fontSize))
    expect(heroSize).toBeGreaterThanOrEqual(width >= 900 ? 44 : 40)
    expect(heroSize).toBeLessThanOrEqual(width >= 900 ? 52 : 68)
    expect(
      await page
        .locator('.hero-description > p')
        .first()
        .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
    ).toBeGreaterThanOrEqual(width >= 900 ? 15 : 17)
  }
  for (const image of await page.locator('.project-preview img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect(image).toHaveJSProperty('complete', true)
    expect(
      await image.evaluate((element) => (element as HTMLImageElement).naturalWidth),
    ).toBeGreaterThan(0)
  }
})

test('static HTML remains readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  for (const path of ['/', ...caseStudies.map((project) => `/projects/${project.slug}`)]) {
    await page.goto(`http://127.0.0.1:4173${path}`)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(page.getByRole('link', { name: /Connect on LinkedIn/ })).toBeAttached()
    const project = caseStudies.find((item) => path === `/projects/${item.slug}`)
    if (project) {
      await expect(page).toHaveTitle(new RegExp(project.title))
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        'content',
        new RegExp(project.title),
      )
      await expect(page.locator('meta[name="description"]')).not.toHaveAttribute(
        'content',
        /Explore the work of Ramez/,
      )
    }
  }
  await context.close()
})

test('normal motion finishes, project navigation restores scroll, and unknown paths recover', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await page.waitForTimeout(1400)
  const headlines = page.locator('.headline-mask > span')
  for (const line of await headlines.all())
    expect(await line.evaluate((element) => getComputedStyle(element).transform)).toBe('none')
  await page.getByRole('link', { name: 'Explore Planora case study' }).scrollIntoViewIfNeeded()
  // Capture departure at the click, after viewport reveals and pointer scrolling settle.
  await page.evaluate(() =>
    document.addEventListener(
      'click',
      () => {
        document.body.dataset.departureScroll = String(window.scrollY)
      },
      { once: true, capture: true },
    ),
  )
  await page.getByRole('link', { name: 'Explore Planora case study' }).click()
  const previousScroll = await page.evaluate(() => Number(document.body.dataset.departureScroll))
  await expect(page.getByRole('heading', { level: 1, name: 'Planora' })).toBeVisible()
  expect(await page.evaluate(() => window.scrollY)).toBeLessThan(30)
  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Engineering')
  await expect
    .poll(() => page.evaluate((previous) => Math.abs(window.scrollY - previous), previousScroll))
    .toBeLessThan(30)
  await page.goForward()
  await expect(page.getByRole('heading', { level: 1, name: 'Planora' })).toBeVisible()
  await page.getByRole('link', { name: /CONTINUE EXPLORING/ }).click()
  await expect(page.getByRole('heading', { level: 1, name: 'CaeloTerra' })).toBeVisible()
  await page.getByRole('link', { name: 'Back to selected work' }).click()
  await expect(page.locator('#projects')).toBeFocused()
  await page.goto('/missing-page')
  await expect(page.getByRole('heading', { name: 'A different path.' })).toBeVisible()
  await page.getByRole('link', { name: 'Return home' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Engineering')
})
