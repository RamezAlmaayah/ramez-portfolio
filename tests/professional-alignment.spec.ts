import { expect, test } from '@playwright/test'
import { projects } from '../src/data/portfolio'

test('professional profile, training status, and internship scope', async ({ page }) => {
  await page.goto('/')
  const skills = page.locator('#skills')
  await expect(skills).not.toContainText(/Python|Docker|Kubernetes|expert level/i)
  for (const name of ['Express.js', 'JWT', 'RBAC', 'OOP', 'Dependency Injection', 'Integration Testing'])
    await expect(skills.getByText(name, { exact: true })).toBeAttached()
  const experience = page.locator('#experience')
  for (const name of ['DOT Jordan', 'The Hope International', 'FR Compare', 'PhpSpreadsheet'])
    await expect(experience).toContainText(name)
  await expect(experience.getByText('July 2026 – September 2026', { exact: true })).toHaveCount(2)
  const training = page.locator('.training-item').filter({ hasText: 'AI Engineering Training Program' })
  await expect(training).toContainText('Apex Company')
  await expect(training).toContainText('In Progress')
  await expect(page.locator('#education')).toContainText('English for IT 1')
})

test('FR Compare details, safe links, route metadata, and published route inventory', async ({ page, request }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Explore FR Compare case study' }).click()
  await expect(page.locator('h1')).toHaveText('FR Compare')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://ramez-dev-portfolio.netlify.app/projects/fr-compare')
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://ramez-dev-portfolio.netlify.app/projects/fr-compare')
  for (const title of ['Technical architecture', 'Authentication and security', 'Supplier quotation comparison logic', 'Challenges and solutions', 'Results and learning outcomes'])
    await expect(page.getByRole('heading', { name: title, exact: true })).toBeAttached()
  await expect(page.locator('main')).toContainText('not guaranteed savings')
  for (const [name, href] of [['Live Demo', 'https://frcompare.netlify.app'], ['View on GitHub', 'https://github.com/RamezAlmaayah/FR-Compare']]) {
    const link = page.locator('.case-intro').getByRole('link', { name: new RegExp(name) })
    await expect(link).toHaveAttribute('href', href)
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  }
  await page.reload()
  await expect(page.locator('h1')).toHaveText('FR Compare')
  const sitemap = await (await request.get('/sitemap.xml')).text()
  expect(sitemap).toContain('/projects/fr-compare')
  expect(sitemap).not.toMatch(/gym/i)
  for (const path of ['/', ...projects.map(project => `/projects/${project.slug}`)]) {
    const response = await request.get(path)
    expect(response.ok(), path).toBe(true)
    expect(await response.text()).not.toMatch(/Gym Management|gym-management|Graduation Project/i)
  }
})
