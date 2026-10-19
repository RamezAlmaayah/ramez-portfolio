# Publish from GitHub to Netlify

## Build configuration

- Repository: `RamezAlmaayah/ramez-portfolio`
- Production branch: `main`
- Base directory: repository root (leave blank)
- Build command: `npm run build`
- Publish directory: `dist`
- Node.js: 24, configured in `netlify.toml`
- No application secrets or environment variables are required for this static portfolio.

`public/_redirects` contains `/* /index.html 200`. Vite copies this into `dist/_redirects`. Netlify serves existing prerendered project pages and assets first; unmatched application paths fall back to React Router.

## Manual setup when Netlify authentication is unavailable

1. Sign in securely at https://app.netlify.com/ using your own browser.
2. Select **Add new project → Import an existing project → GitHub**.
3. Authorize access to **RamezAlmaayah/ramez-portfolio**. If the repository is absent from the list, adjust the Netlify GitHub app's repository permissions.
4. Choose `main`. Keep the base directory blank, use `npm run build`, and publish `dist`. The committed `netlify.toml` supplies these build settings.
5. Choose the free plan. Use `ramez` as the project/site name if available; otherwise try `ramez-dev`. Neither name has been reserved. If both are unavailable, choose a unique free name.
6. Select **Deploy**. Wait for the production deployment to show **Published**. Record the actual assigned `https://...netlify.app` address.
7. Confirm the repository is linked under **Project configuration → Build & deploy → Continuous deployment**, production branch is `main`, and builds are active. Future pushes to `main` should trigger deployments.
8. Optionally set `SITE_URL` to the actual production origin and redeploy to generate absolute social metadata, canonical links, sitemap, and robots file. Do not use a guessed address.

## Production verification after deployment

Open each URL directly, then refresh it:

- `/`
- `/projects/planora`
- `/projects/unseen-jo`
- `/projects/caeloterra`
- `/projects/moodle-dashboard`
- `/projects/gym-management`

Check mobile navigation, both themes, project screenshots/lightboxes, technology and RA logos, and external links. Download `/ramez-ahmad-resume.pdf` and confirm it opens as a PDF. Planora's links must remain:

- https://planora.dynv6.net/
- https://github.com/RamezAlmaayah/Planora-Project-Management-System

No domain purchase or paid service is needed. A GitHub push alone does not establish a Netlify deployment. No Netlify URL should be described as live until its actual production pages are verified.

Official references: https://docs.netlify.com/start/quickstarts/deploy-from-repository/ and https://docs.netlify.com/build/configure-builds/javascript-spas/.

## Publication preparation verified on 2026-10-19

- Public GitHub repository created: https://github.com/RamezAlmaayah/ramez-portfolio.
- `npm run typecheck`, `npm run lint`, and `npm run build` passed. The build generated the homepage and five project pages, with the required SPA fallback copied into `dist`.
- All 76 public assets were verified in the production output, including screenshots, branding, technology logos, and the 77,225-byte resume PDF with a valid PDF signature.
- 32 Playwright tests passed in desktop and mobile Chromium contexts across `portfolio`, `technology-logos`, `latest-cv`, `planora-gallery`, and `unseen-gallery`. Coverage includes routes/direct reloads, navigation, both themes, responsive layouts, animations/reduced motion, image galleries, accessibility, resume download, and supplied external-link destinations.
- All 355 staged files were checked for forbidden/generated paths, sensitive filenames, and common credential patterns. No matches were found. Existing GitHub CLI authentication was used for the requested account; no credentials were placed in project files.
- No authenticated Netlify connector, CLI session, or deployment token was available. No Netlify site was created or published, and production URL checks remain pending the manual import above. Local test results do not represent a verified Netlify deployment.
