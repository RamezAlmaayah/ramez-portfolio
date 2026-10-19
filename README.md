# Ramez Ahmad ALMAAYE'H — Full-Stack Developer Portfolio

The latest CV update is documented in [docs/LATEST-CV-UPDATE.md](docs/LATEST-CV-UPDATE.md), including current project status, the verified resume asset, logo additions, and validation results.

A complete redesign of the existing React + TypeScript + Vite portfolio. Uses Tailwind CSS, Motion for React, Lucide, React Router, and self-hosted Manrope. The palette remains French Navy, Seal Grey, Deep Slate, and Soft White.

## Run locally

Use Node.js 22.12+ (Node 24 LTS recommended).

```sh
npm ci
npm run dev
```

Open the URL Vite prints, normally **http://127.0.0.1:5173/**.

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

The build emits the client app, builds the React server-render entry, and prerenders the homepage and five case studies to static HTML. Deploy **dist/**; `.ssr/` is temporary build output and is not deployed. The site is readable without JavaScript; theme controls, mobile navigation, and animations require JavaScript.

## Deploy on Netlify

Import this repository from GitHub, choose production branch `main`, and leave the base directory blank. The committed `netlify.toml` sets Node.js 24, build command `npm run build`, and publish directory `dist`. The SPA fallback in `public/_redirects` is copied into the production output. See [docs/NETLIFY-DEPLOYMENT.md](docs/NETLIFY-DEPLOYMENT.md) for setup and production verification. No Netlify deployment URL is assumed or reserved.

## Routes

| Route                        | Project                                          |
| ---------------------------- | ------------------------------------------------ |
| `/`                          | Complete portfolio                               |
| `/projects/planora`          | Planora — project management and Scrum workflows |
| `/projects/caeloterra`       | CaeloTerra — in-development decision support     |
| `/projects/unseen-jo`        | Unseen Jo — implemented React/Supabase tourism platform |
| `/projects/moodle-dashboard` | Moodle Excel administration dashboard            |
| `/projects/gym-management` | Gym Management System — additional work |

Featured projects are Unseen Jo, Planora, and CaeloTerra, in that order. Moodle and Gym are retained under Additional Work with their own detail routes. The supplied GitHub profile and official Planora repository/demo URLs are stored centrally; no URLs are invented for other projects.

## Edit the portfolio

- `src/data/portfolio.ts`: all supplied factual copy, contact details, skills, project scope, roles, stages, workflows, experience, education, and training. `unseenDetails` contains the complete discovery concept.
- `src/data/seo.ts`: title and description for each route.
- `src/styles/tokens.css`: all site color, type, layout, and timing tokens. Manrope is selected per the redesign brief and remains configurable.
- `src/styles/global.css`: editorial layouts, component styles, hover interactions, and responsive rules.
- `src/pages/ProjectPage.tsx`: common case-study layout and the project-specific Planora architecture / Unseen Jo concept sections.

Planora uses the supplied real Admin Dashboard and Project Analytics screenshots, with official demo and repository links in src/data/portfolio.ts. Its case-study gallery supports enlargement, previous/next controls, arrow keys, Escape, native modal focus containment, and reduced motion. Other project artwork is original SVG illustration. Captions and alternative text identify it as illustration, not real screenshots. Replace `image` and `imageAlt` with genuine screenshots when available, updating captions accordingly. SVGs define their own CSS color variables because standalone image files cannot inherit document variables. Their deterministic source is in `scripts/generate-artwork.mjs` (the optional Gym illustration is maintained directly).

### Resume

The latest matching Full-Stack CV was verified and copied unchanged from `Downloads/Ramez_ALMAAYEH_Full_Stack_ATS_Updated.pdf` to:

```text
public/ramez-ahmad-resume.pdf
```

`portfolio.cv` points to `/ramez-ahmad-resume.pdf`, and Download Resume is enabled. Replace this asset and review its contents when updating the CV again. If the file is removed, clear `portfolio.cv` so the UI accurately shows the unavailable state.

### SEO and the production domain

Every built route includes readable HTML and its own title, description, Open Graph title/description, Twitter metadata, and the original PNG social image. A real production domain was not supplied, so none is invented.

Optionally set the non-sensitive **SITE_URL** build environment variable to the actual HTTPS origin in Vercel's production project settings. The prerender script then emits absolute canonical URLs, `og:url`, absolute social image URLs, `sitemap.xml`, and `robots.txt`. This variable is optional; no credentials or backend services are required. For a local PowerShell build, set `$env:SITE_URL` to the real origin before `npm run build`. Standalone Node scripts do not automatically load Vite `.env` files.

## Tests and visual inspection

```sh
npx playwright install chromium
npm run build
npm run test:e2e
```

The Chromium desktop and mobile suites check:

- Heading readability and supplied factual project content.
- Mobile focus cycling, Escape behavior, body scrolling, and destination focus.
- Section navigation, case-study transitions, direct loading, metadata, and next-project navigation.
- Browser Back/Forward scroll restoration.
- Persistent themes and reduced-motion behavior.
- Homepage and every case study at 320, 375, 768, 1024, and 1440px.
- WCAG A/AA checks, including available WCAG 2.2 AA rules, in both themes.
- Project image loading, real contact destinations, and the actual resume download.
- Readable static pages with JavaScript disabled.

Automated accessibility audits supplement manual screenshot and keyboard checks; they are not a certification of complete WCAG compliance. External contact destinations are checked for correct supplied URLs, protocols, labels, and safe new-tab behavior; LinkedIn availability and authentication are controlled by LinkedIn. The actual resume asset and browser download are now covered by the CV tests.

With the dev server running on port 5173:

```sh
node scripts/capture-preview.mjs
```

This captures desktop, mobile, and dark-mode previews for all five pages in `test-results/previews/` and exports `public/social-preview.png` from the original vector artwork. Set `PREVIEW_URL` to another local server URL if needed. `node scripts/diagnose-layout.mjs` reports layout overflow candidates for troubleshooting.

## Deploy to Vercel

1. Commit this project and `package-lock.json` to your repository.
2. Import the repository into the intended Vercel team/project.
3. Select **Vite**, repository root, Build Command **npm run build**, and Output Directory **dist**.
4. Optionally set **SITE_URL** to the verified production origin in the Production environment.
5. Deploy a preview and review the homepage, all four project URLs, both themes, and supplied contact links.
6. Publish through the intended production branch or the Vercel CLI after inspecting the preview.

`vercel.json` supplies build settings, project-route rewrites to their prerendered HTML, and basic security headers. No deployment was performed as part of this redesign.

References: [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite), [Vercel environment variables](https://vercel.com/docs/environment-variables), [Manrope self-hosting](https://fontsource.org/fonts/manrope/use), [Motion page transitions](https://motion.dev/docs/react-animate-presence).

## Implementation report

See [docs/REDESIGN.md](docs/REDESIGN.md) for the complete changed-file manifest, design improvements, motion behavior, validation evidence, and remaining assets.

## Technology logos

Visual technology labels now use the shared `TechnologyBadge` / `TechnologyList` components and alias registry in `src/data/technologies.ts`. All SVGs are local under `public/technologies/`; provenance and upstream licenses are included. Missing or unverified logos fall back to the supplied text label. See [docs/TECHNOLOGY-LOGOS.md](docs/TECHNOLOGY-LOGOS.md) for the assets, fallback labels, changed files, and validation. With a preview server running on port 4173, `node scripts/capture-technology-preview.mjs` captures skills and project-stack screenshots in both themes.

## Layout proportions

The portfolio uses a 1120px content cap and a desktop density stylesheet at widths of 900px and above: 60px navigation, 44–52px hero type, 28–34px section type, and 40px action buttons. Narrow layouts retain their previous type sizes and touch targets. See [docs/COMPACT-LAYOUT.md](docs/COMPACT-LAYOUT.md) for the current dimensions and before/after captures; [docs/LAYOUT-PROPORTIONS.md](docs/LAYOUT-PROPORTIONS.md) records the preceding sizing update. With the production preview on port 4173, `node scripts/capture-layout.mjs compact-after` regenerates the compact screenshots and measurements.

## Custom RA branding

The supplied monogram replaces text branding in the shared header, About section, footer, browser icons, and social artwork. `Logo.tsx` and `branding.css` select the original or light asset without filters. See [docs/BRANDING-UPDATE.md](docs/BRANDING-UPDATE.md) for asset paths, exact dimensions, preparation checks, and validation. With the preview running on port 4173, `node scripts/capture-branding.mjs` captures the header, footer, About branding, and mobile menu in both themes.
