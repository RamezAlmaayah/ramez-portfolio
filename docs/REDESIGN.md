# Portfolio redesign report

## Result

Redesigned the existing portfolio in place. No disconnected project was created. The homepage now includes Hero → About → Technical Expertise → Featured Work → Experience → Education and Training → Contact → Footer.

## Visual improvements

- Self-hosted Manrope with configurable typography tokens. Desktop hero scales to 88px; section titles to 56px; project titles to 36px. Body copy is 17–20px, navigation 16px, and buttons 16px. Supporting artwork captions and editorial eyebrows are smaller, secondary labels.
- Wide, asymmetric editorial composition, restrained navy/grey palette, brighter content sections, and a contrasting dark work collection.
- Four substantial, alternating project presentations with original vector covers. Covers are explicitly labeled illustration; no invented project screenshots.
- Full supplied biography, language information, nine expertise groups, practical strengths, detailed internship timeline, degree dates, and training/coursework.
- Prominent supplied name, working email/phone/LinkedIn actions, and consistent desktop/mobile navigation.

## Motion and interaction

- Masked, staggered hero headline reveal; coordinated subtitle/name/CTA entrance.
- Brief abstract orbit artwork animation that settles within five seconds. No perpetual motion or typewriter effect.
- Viewport-triggered, staggered content movement and gentle preview scaling.
- Animated experience timeline, shared-layout active navigation line, and navigation hover underlines.
- Gentle magnetic behavior for primary desktop CTAs, button arrow movement, project image movement, and technology hover states.
- Coordinated page enter/exit transitions, destination focus, anchor scrolling, and browser-history scroll handling.
- Animated mobile navigation, Escape to close, focus cycling, body-scroll restoration, and touch-size controls.
- OS reduced-motion preferences disable motion and smooth scrolling. Content is readable before animation and in prerendered HTML without JavaScript.

## Case studies

- `/projects/planora`: documented Scrum, Kanban, authorization, QA, full technology stack, supplied individual roles, and an explicitly conceptual architecture/workflow visualization.
- `/projects/caeloterra`: NASA Space Apps 2026 context and **In Development** status; features are clearly development/design goals, without claims of production release or validated agricultural outcomes.
- `/projects/unseen-jo`: **Design / Proposed MVP**; all eight proposed features, target audiences, categories, preference inputs, recommendation explanations, place details, team names without assigned responsibilities, planned technical architecture, and preference-based filtering rather than a trained AI model.
- `/projects/moodle-dashboard`: supplied Excel administration workflow, PHP/MySQL/PhpSpreadsheet/Moodle stack, local environment setup, and functional/integration testing.

## Validation

TypeScript, ESLint, production build, and browser suites are run from package scripts. The build prerenders five pages. The browser suite covers routes, supplied contact destinations, resume absence, desktop/mobile navigation, keyboard focus, both themes, reduced motion, normal animation completion, required widths, image loading, history navigation, and static readability without JavaScript.

Final validation results:

- `npm run typecheck` — passed.
- `npm run lint` — passed.
- `npm run build` — passed; five pages prerendered with page-specific metadata.
- `npm run test:e2e` — **16 passed (47.8 seconds)** on Chromium desktop and mobile.
- Accessibility checks — no violations from the available WCAG A/AA rules, including WCAG 2.2 AA, across the homepage and every case study in both themes.
- Required widths — 320, 375, 768, 1024, and 1440px checked on the homepage and every case study; no horizontal document overflow.
- Production output — main JavaScript 140.31 kB gzip, CSS 12.29 kB gzip, and a 24.83 kB Latin variable font. Browser performance scores were not measured.

Desktop/mobile/dark screenshots are stored in the ignored `test-results/previews/` directory. Automated audits supplement manual visual and keyboard checks; this does not replace a comprehensive independent accessibility audit. Extensionless local preview paths resolve to the prerendered project HTML using matching `.html` artifacts; Vercel uses the configured project rewrites.

## Remaining assets

- Actual resume PDF: `public/ramez-ahmad-resume.pdf`. Resume actions are intentionally disabled and explicitly labeled unavailable.
- Genuine project screenshots, optional repository/live-demo URLs, and a verified GitHub profile were not supplied. No URLs or screenshots were invented.
- A production origin for domain-specific canonical/Open Graph URLs and sitemap generation. Set optional `SITE_URL` only to the real origin.

## Complete changed-file manifest

Updated existing files:

- `.gitignore`
- `package.json`
- `package-lock.json`
- `eslint.config.js`
- `index.html`
- `vercel.json`
- `README.md`
- `src/App.tsx`
- `src/main.tsx`
- `src/hooks/useTheme.ts`
- `src/data/portfolio.ts`
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/components/Header.tsx`
- `src/components/Hero.tsx`
- `src/components/About.tsx`
- `src/components/Skills.tsx`
- `src/components/Projects.tsx`
- `src/components/ProjectPreview.tsx`
- `src/components/Experience.tsx`
- `src/components/Contact.tsx`
- `src/components/Footer.tsx`
- `src/components/Section.tsx`
- `tests/portfolio.spec.ts`
- `scripts/capture-preview.mjs`

Added files:

- `src/components/Button.tsx`
- `.prettierrc.json`
- `src/components/ResumeAction.tsx`
- `src/components/Education.tsx`
- `src/components/RouteEffects.tsx`
- `src/pages/HomePage.tsx`
- `src/pages/ProjectPage.tsx`
- `src/data/seo.ts`
- `src/entry-server.tsx`
- `src/lib/routing.ts`
- `scripts/generate-artwork.mjs`
- `scripts/prerender.mjs`
- `scripts/diagnose-layout.mjs`
- `public/work/planora.svg`
- `public/work/caeloterra.svg`
- `public/work/unseen-jo.svg`
- `public/work/moodle.svg`
- `public/social-preview.svg`
- `public/social-preview.png`
- `public/fonts/OFL-Manrope.txt`
- `docs/REDESIGN.md`

Generated, ignored artifacts: `dist/`, `.ssr/`, `test-results/`, and TypeScript build-info files. Existing Vite, TypeScript, and Playwright configuration files are retained.
