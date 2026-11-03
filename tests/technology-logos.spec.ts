import { expect, test } from '@playwright/test'
import { getTechnology, technologies } from '../src/data/technologies'

test('every registered logo is a valid local image and aliases resolve consistently', async ({
  request,
}) => {
  await Promise.all(
    technologies
      .filter((technology) => technology.logo)
      .map(async (technology) => {
        const response = await request.get(technology.logo!)
        expect(response.status(), technology.name).toBe(200)
        if (technology.logo!.endsWith('.svg')) {
          expect(response.headers()['content-type'], technology.name).toContain('image/svg+xml')
          expect(await response.text(), technology.name).toContain('<svg')
        } else {
          expect(response.headers()['content-type'], technology.name).toContain('image/png')
          expect((await response.body()).subarray(1, 4).toString()).toBe('PNG')
        }
      }),
  )
  expect(getTechnology('React.js')?.id).toBe('react')
  expect(getTechnology('ASP.NET Core MVC')?.id).toBe('dotnetcore')
  expect(getTechnology('Cloud Firestore')).toBeUndefined()
  expect(getTechnology('Supabase Auth')?.id).toBe('supabase')
  expect(getTechnology('JavaScript (ES6+)')?.id).toBe('javascript')
  expect(getTechnology('Docker Compose')?.id).toBe('docker')
  expect(getTechnology('VS Code')?.id).toBe('vscode')
  expect(getTechnology('Entity Framework Core')?.id).toBe('entityframeworkcore')
  for (const name of ['AJAX', 'Razor', 'NASA POWER', 'GPM IMERG', 'LINQ', 'SOLID Principles', 'CI/CD', 'Row Level Security (RLS)'])
    expect(getTechnology(name)?.logo).toBeUndefined()
})

test('badges render legibly in skills and all project stacks in both themes', async ({ page }) => {
  test.setTimeout(120000)
  const failedAssets: string[] = []
  page.on('response', (response) => {
    if (response.url().includes('/technologies/') && response.status() >= 400)
      failedAssets.push(response.url())
  })
  await page.emulateMedia({ colorScheme: 'light', reducedMotion: 'reduce' })
  for (const theme of ['light', 'dark']) {
    await page.goto('/')
    if (theme === 'dark') await page.getByRole('button', { name: 'Switch to dark theme' }).click()
    for (const card of await page
      .locator('.skill-card, .featured-project, .additional-project')
      .all()) {
      await card.scrollIntoViewIfNeeded()
      for (const image of await card.locator('.technology-logo img').all()) {
        await expect
          .poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth))
          .toBeGreaterThan(0)
      }
    }
    const react = page.locator('#skills [data-technology="React.js"]')
    await expect(react.locator('img')).toHaveAttribute('src', '/technologies/react.svg')
    expect(
      await react.locator('img').evaluate((element) => element.getBoundingClientRect().width),
    ).toBe(page.viewportSize()!.width >= 900 ? 30 : 40)
    expect(
      await react
        .locator('.technology-name')
        .evaluate((element) => parseFloat(getComputedStyle(element).fontSize)),
    ).toBeGreaterThanOrEqual(page.viewportSize()!.width >= 900 ? 14 : 15)
    await expect(page.locator('#skills [data-technology="AJAX"]')).toHaveClass(/fallback/)
    for (const slug of ['planora', 'caeloterra', 'unseen-jo', 'moodle-dashboard', 'fr-compare']) {
      await page.goto(`/projects/${slug}`)
      const stack = page.locator('.technology-panel .technology-badges')
      await stack.scrollIntoViewIfNeeded()
      for (const image of await stack.locator('img').all()) {
        await expect
          .poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth))
          .toBeGreaterThan(0)
        expect(await image.evaluate((element) => element.getBoundingClientRect().width)).toBe(page.viewportSize()!.width >= 900 ? 26 : 28)
      }
      for (const width of [320, 375, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 })
        await expect
          .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
          .toBe(true)
      }
    }
  }
  expect(failedAssets).toEqual([])
})

test('missing assets degrade to readable labels and hover respects reduced motion', async ({
  page,
}) => {
  await page.route('**/technologies/react.svg', (route) => route.abort())
  await page.goto('/')
  const missing = page.locator('#skills [data-technology="React.js"]')
  await missing.scrollIntoViewIfNeeded()
  await expect(missing).toHaveClass(/fallback/)
  await expect(missing).toHaveText('React.js')
  await expect(missing.locator('img')).toHaveCount(0)
  const badge = page.locator('#skills [data-technology="C#"]')
  await badge.scrollIntoViewIfNeeded()
  await badge.hover()
  expect(
    await badge
      .locator('.technology-logo')
      .evaluate((element) => getComputedStyle(element).transform),
  ).toBe('none')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.mouse.move(0, 0)
  await badge.hover()
  await expect
    .poll(() =>
      badge.locator('.technology-logo').evaluate((element) => getComputedStyle(element).transform),
    )
    .not.toBe('none')
})
