# Latest Full-Stack CV update

## Content and project changes

- Updated the full name to **Ramez Ahmad ALMAAYE'H** and professional title to **Full-Stack Developer | Software Engineer**. Preserved the supplied Madaba location, email, phone, and LinkedIn URL; added the actual GitHub profile URL.
- Replaced the professional summary with the three supplied paragraphs and added a shorter hero introduction. Hero actions are View Projects, Download Resume, and Contact Me.
- Replaced the skills with all 56 entries across the seven supplied categories. Updated both internships, education duration, training, and languages from the CV.
- Featured projects now appear as **Unseen Jo, Planora, CaeloTerra**, numbered 01–03. Moodle and Gym remain in the centralized data and appear under **Additional Work**, with accessible detail routes.
- Unseen Jo is presented as an implemented React/JavaScript, Tailwind, Supabase Auth, PostgreSQL, RLS, React Router, React Leaflet/OpenStreetMap, Motion, and Vite application. The case study covers preferences, authentication/data security, maps/interface, and performance engineering. Firebase, Firestore, proposed-MVP status, planned registration, and stale team/name copy were removed from the active content. No trained machine-learning model or unsupported performance metrics are claimed.
- Planora uses the updated Scrum feature list, eight-item stack, and four CV roles. The exact official demo/repository URLs, both original screenshots, gallery, keyboard controls, and lightbox remain intact. Both remote Planora URLs returned HTTP 200 during this update.
- CaeloTerra is explicitly marked **IN DEVELOPMENT**. Integration design, architecture, planning logic, robustness scoring, and explainability are described as development scope; no completed production release or agricultural validation is claimed.
- Retained the previously verified Moodle and Gym content. Gym's detail page omits empty problem/solution/workflow sections rather than inventing new material.
- Updated page metadata, source HTML, social-preview SVG/PNG, and the artwork generator to use the corrected identity. Homepage and case-study content come from the same centralized data.

Project brand names remain concise in the compact card headings; their descriptive titles appear alongside them as subtitles/context (Tourism Discovery Platform, Project Management System, and NASA Space Apps 2026).

## Technologies and logo rendering

The existing centralized registry is extended and the shared **TechnologyLogo** component is reused by badges and the GitHub contact action. Labels remain visible; failed image loads retain the text fallback.

New logo assets: PostgreSQL, Supabase, React Router, Vite, Docker, GitHub Actions, Jira, Swagger, and Motion. Existing TypeScript, Tailwind CSS, Bootstrap, and other verified assets are reused. JavaScript (ES6+) resolves to JavaScript; React Hooks, Supabase Auth, Docker Compose, and React Leaflet use their corresponding brand-family marks, identified as such in the registry. Motion's PNG is the official asset linked from the installed Motion package README. Other additions use the same pinned Devicon source as the existing assets. Source URLs, hashes, and licenses are retained under `public/technologies/`.

Concepts such as SOLID, LINQ, RLS, CI/CD, security patterns, architecture principles, and testing methods use text fallbacks. The obsolete Firebase registry entry was removed; unused historical artwork files were not presented as current technologies.

## Compact design preservation

No compact density tokens were increased. Desktop navigation remains **60px**, content caps at **1120px**, hero type remains approximately **46–51px** at the tested desktop sizes, and normal project media remains capped at **680px** in case studies. At 1366 × 768, the updated hero ends around **525px**. The existing Manrope font, palette, animations, page transitions, theme toggle, reduced-motion behavior, mobile navigation, and accessible image viewer are preserved.

Current captures and computed browser measurements are in `docs/layout-previews/cv-update/`. They cover the homepage and all five detail pages in both themes at 1366 × 768 and 1920 × 1080, with additional section and gallery captures. The PDF was separately rendered and visually reviewed in `docs/latest-cv-preview.png`.

## Resume status

The matching latest PDF was found at:

`C:/Users/Magic Systems/Downloads/Ramez_ALMAAYEH_Full_Stack_ATS_Updated.pdf`

Its one-page content matches the supplied updated CV. It was copied unchanged to **public/ramez-ahmad-resume.pdf** and the centralized `portfolio.cv` now enables Download Resume. Source and destination SHA-256 hashes match:

`7912166d139632359b45196c405ccfa1308cab1237b6d829adaa98c9f79f629f`

The browser test checks the real served PDF, filename, file size, and an actual successful download.

## Files changed

- Data/SEO: `src/data/portfolio.ts`, `src/data/technologies.ts`, `src/data/seo.ts`.
- UI: `src/components/Hero.tsx`, `Header.tsx`, `Contact.tsx`, `Projects.tsx`, `TechnologyBadge.tsx`, new `TechnologyLogo.tsx`, and `src/pages/ProjectPage.tsx`.
- Routing/prerendering: `src/App.tsx`, `src/entry-server.tsx`. All five project routes remain available, including secondary work.
- Styles: `src/styles/global.css` adds only the compact Additional Work heading/spacing rules. `compact.css` and its density tokens remain intact.
- Public assets: resume PDF, nine technology logo files, `public/technologies/sources.json`, Motion license, and social-preview SVG/PNG.
- Scripts: `scripts/generate-artwork.mjs`, `scripts/capture-layout.mjs`.
- Tests: new `tests/latest-cv.spec.ts`; updates to `portfolio.spec.ts`, `technology-logos.spec.ts`, `layout-proportions.spec.ts`, and `layout-stability.spec.ts`. The layout observer now uses a typed Window declaration.
- Documentation/evidence: `README.md`, this report, the CV preview, and `docs/layout-previews/cv-update/`.

No new application dependency or backend service was introduced.

## Deployment status

No deployment was performed and no live portfolio URL is claimed. No `.vercel/project.json` is present locally. The connected Vercel account exposes only `prince-auto-care` and `great-choice-auto`, with no identifiable portfolio project. Updating an existing production deployment requires the correct Vercel account/team access or the intended project identity; establishing a new deployment requires selecting the intended project and deploying the validated `dist/` output. No domain purchase or paid service activation was attempted.

## Executed validation results

- `npm run typecheck`: passed after updating the layout-observer typing; rerun successfully after the final test update.
- `npm run lint`: passed with no errors or warnings, including the final source and test changes.
- `npm run build`: passed, including the homepage and all five project detail pages as six readable prerendered routes.
- `npm run test:e2e -- --workers=2`: 34 passed, three redundant mobile-project copies of the explicit viewport matrix skipped, and one legacy mobile-menu assertion failed because the now-enabled Resume link participates in focus order.
- Updated that assertion to verify the Resume link and then Contact in the correct keyboard order. `npx playwright test --last-failed --workers=1`: the mobile check passed. All **35 distinct browser checks** are therefore validated across the main run and corrective rerun; no application change was needed for that focus-order expectation.
- The desktop matrix verified all six pages at eight widths in both themes: 96 page/theme/viewport combinations. No horizontal overflow, broken images, out-of-bounds compact typography, navigation overlap, or decorative-art overlap was found. DPR 2 also passed.
- The actual CV download passed on desktop and mobile. Identity, seven skill categories, visible logos and concept fallbacks, featured ordering, secondary links, Unseen Jo implementation copy, CaeloTerra status, GitHub profile URL, official Planora links/popups, and image navigation passed their checks.
- Accessibility scans passed across all routes in both themes. Mobile navigation, theme persistence, reduced motion, normal animations, layout stability, no-JavaScript content, and browser back/forward behavior passed the available tests.
- Browser captures at 1366 × 768 and 1920 × 1080 were generated and reviewed for the compact homepage and updated case-study presentation. The current resume PDF and official Motion asset were also visually inspected.
