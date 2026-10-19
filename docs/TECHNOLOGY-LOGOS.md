# Technology logo update

## Implementation

`TechnologyBadge` and `TechnologyList` render every visual technology label from one alias-aware registry in `src/data/technologies.ts`. Supplied labels stay unchanged. Unknown technologies, unverified marks, and failed image requests retain readable text instead of a broken-image placeholder. Explanatory paragraphs, project descriptions, experience, navigation, SEO, and Vercel configuration are preserved.

Skills use 40px logos on 56px contrasting plates, with names below. Project and case-study stacks use 28px logos on 40px plates, with names beside them. Labels use 16px text (15px in the conceptual architecture blocks). The grid wraps at narrow widths. Original multicolor artwork is preserved; monochrome marks sit on white plates in both themes. React, Firebase, and Tailwind use navy plates for visibility.

Interactions include staggered viewport entrance, a 2px hover lift, 1.04× logo scaling, a subtle shadow, and background transitions. Reduced-motion preferences remove movement. Badges are informational, so they do not add unnecessary keyboard tab stops or pretend to be buttons.

## Assets added

27 locally served SVGs:

- React, C#, .NET Core, JavaScript, HTML5, CSS3, Python, PHP, Node.js.
- MongoDB, MySQL, Microsoft SQL Server, Entity Framework Core.
- Git, GitHub, Visual Studio, Visual Studio Code, Postman.
- Firebase, Figma, Moodle, Leaflet, OpenStreetMap.
- Tailwind CSS, TypeScript, Angular, Bootstrap (registry support; portfolio content is unchanged).

ASP.NET Core MVC, Web API, and Identity use the Microsoft .NET family mark. Firebase Authentication, Hosting, and Cloud Firestore use the Firebase family mark. Aliases such as React.js, HTML, CSS, EF Core, and VS Code resolve through the same registry.

The artwork is copied from [Devicon](https://github.com/devicons/devicon) and [Simple Icons](https://github.com/simple-icons/simple-icons), without changing paths or brand colors. `public/technologies/sources.json` records each exact upstream commit, source URL, local filename, and SHA-256 hash. Upstream licenses are included beside the assets. Refreshing assets with `node scripts/fetch-technology-logos.mjs` is an explicit authoring action; the production build and browser do not contact these sources.

## Text fallbacks

The registry explicitly preserves text for SQL, Razor, AJAX, RESTful APIs / REST APIs, NASA POWER, GPM IMERG, PhpSpreadsheet, and Browser Geolocation API. No unverified product/dataset mark is imported or replaced with an unrelated logo. Engineering methods and practices—such as testing, requirements analysis, architectures, Agile/Scrum, RBAC, JWT/cookie authentication, validation, UML, MVC, and CRUD—also remain readable text when no corresponding verified mark is registered.

## Changed files

Added:

- `src/components/TechnologyBadge.tsx`
- `src/data/technologies.ts`
- `scripts/fetch-technology-logos.mjs`
- `scripts/capture-technology-preview.mjs`
- `tests/technology-logos.spec.ts`
- `docs/TECHNOLOGY-LOGOS.md`
- `public/technologies/*.svg` — all 27 filenames and exact sources are in `sources.json`.
- `public/technologies/sources.json`
- `public/technologies/DEVICON-LICENSE.txt`
- `public/technologies/SIMPLE-ICONS-LICENSE.md`

Updated:

- `src/components/Skills.tsx`
- `src/components/Projects.tsx`
- `src/pages/ProjectPage.tsx`
- `src/styles/global.css`
- `src/styles/tokens.css`
- `tests/portfolio.spec.ts` — audit timeout accommodates the expanded page content.
- `playwright.config.ts` — browser timeout accommodates local machine load.
- `README.md`

## Validation and deployment

TypeScript, ESLint, and the production build are run before browser tests. New tests cover all asset URLs, alias mappings, actual image decoding, both themes, readable sizing, required viewport widths, failure fallback, hover, and reduced motion. Existing regression tests cover accessibility, content, navigation, case-study routes, history, and static metadata.

Validation passed:

- `npm run typecheck`, `npm run lint`, and `npm run build`.
- Full regression suite: **22 browser tests passed**.
- After refining long-label wrapping, **8 focused browser tests passed** again, covering local logos, failure fallback, hover/reduced motion, both themes, WCAG A/AA audits, and widths 320, 375, 768, 1024, and 1440px.
- No broken registered SVGs or horizontal document overflow were detected.

Long fallback labels span a full skills-grid row, avoiding awkward word breaks. Desktop/mobile/light/dark screenshots are generated with `node scripts/capture-technology-preview.mjs` into `test-results/technology-previews/`; fixed navigation is hidden only during isolated component capture. Automated accessibility checks supplement visual and keyboard review and are not a complete independent WCAG certification.

No `.vercel/project.json` link exists locally. The connected Vercel account contains no matching portfolio project, and no additional teams were returned. No deployment was published and no unrelated project was modified. The existing deployment configuration remains unchanged.
