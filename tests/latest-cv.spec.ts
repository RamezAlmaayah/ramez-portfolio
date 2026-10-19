import { expect, test } from '@playwright/test'

test('latest CV identity, skills, featured order, secondary work, and actual resume download', async ({ page, request }) => {
  await page.goto('/')
  await expect(page.getByText("Ramez Ahmad ALMAAYE'H", { exact: true })).toBeVisible()
  await expect(page.locator('.hero .eyebrow')).toHaveText('FULL-STACK DEVELOPER | SOFTWARE ENGINEER')
  await expect(page.locator('.hero-actions').getByRole('link', { name: 'View Projects' })).toHaveAttribute('href', '#projects')
  await expect(page.locator('.hero-actions').getByRole('link', { name: 'Contact Me' })).toHaveAttribute('href', '#contact')
  const profile = page.getByRole('link', { name: /View GitHub Profile/ })
  await expect(profile).toHaveAttribute('href', 'https://github.com/RamezAlmaayah')
  await expect(profile).toHaveAttribute('target', '_blank')
  await expect(profile).toHaveAttribute('rel', 'noopener noreferrer')
  await expect(page.locator('.featured-project h3')).toHaveText(['Unseen Jo', 'Planora', 'CaeloTerra'])
  await expect(page.locator('.additional-work .additional-project h3')).toHaveText(['Moodle Excel Management Dashboard', 'Gym Management System'])
  await expect(page.locator('#skills .skill-card h3')).toHaveText([
    'Programming Languages', 'Frontend Development', 'Backend Development & APIs', 'Databases & Cloud',
    'Authentication, Security & Architecture', 'DevOps & Development Tools', 'Testing & Methodologies',
  ])
  for (const name of ['TypeScript', 'JavaScript (ES6+)', 'React Hooks', 'React Router', 'PostgreSQL', 'Supabase Auth', 'Docker Compose', 'GitHub Actions', 'Jira', 'Swagger / OpenAPI', 'Motion']) {
    const badge = page.locator('#skills').getByText(name, { exact: true })
    await expect(badge).toBeAttached()
    const image = badge.locator('..').locator('img')
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
  }
  for (const name of ['SOLID Principles', 'LINQ', 'Row Level Security (RLS)', 'CI/CD']) {
    await expect(page.locator('#skills').getByText(name, { exact: true }).locator('..')).toHaveClass(/fallback/)
  }
  const resume = await request.get('/ramez-ahmad-resume.pdf')
  expect(resume.status()).toBe(200)
  expect(resume.headers()['content-type']).toContain('application/pdf')
  expect((await resume.body()).subarray(0, 5).toString()).toBe('%PDF-')
  expect((await resume.body()).length).toBe(77225)
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('.hero-actions').getByRole('link', { name: 'Download Resume' }).click(),
  ])
  expect(download.suggestedFilename()).toBe('ramez-ahmad-resume.pdf')
  expect(await download.failure()).toBeNull()
})

test('Unseen Jo implementation is synchronized and CaeloTerra remains in development', async ({ page }) => {
  await page.goto('/projects/unseen-jo')
  const main = page.locator('main')
  for (const phrase of ['Supabase', 'PostgreSQL', 'React Leaflet', 'Tailwind CSS', 'Motion', 'Vite', 'Route-based code splitting']) {
    await expect(main.getByText(phrase, { exact: false }).first()).toBeAttached()
  }
  await expect(main).not.toContainText(/Firebase|Firestore|Proposed MVP|planned registration|implementation is not presented as completed/i)
  await expect(main).toContainText('not a trained machine-learning model')
  await expect(page.locator('.stage-notice')).toHaveCount(0)
  await expect(page.locator('.case-intro')).toContainText('responsive tourism discovery platform')
  await page.goto('/projects/caeloterra')
  await expect(page.locator('.stage-notice')).toContainText('IN DEVELOPMENT')
  await expect(page.locator('.stage-notice')).toContainText('No production release or agricultural validation is claimed.')
  await expect(page.getByRole('heading', { name: 'Planned technology stack' })).toBeAttached()
})
