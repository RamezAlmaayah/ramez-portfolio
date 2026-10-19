# Planora showcase update

The Planora homepage cover now uses the supplied Admin Dashboard screenshot. The case-study gallery includes that dashboard and the supplied Project Analytics screenshot. Both PNG files are unchanged copies of the originals (matching SHA-256 hashes), at 1360 × 767 pixels, and render without cropping.

## Changes

- `public/work/planora-dashboard.png` and `public/work/planora-analytics.png`: supplied project screenshots.
- `src/data/portfolio.ts`: exact official demo and repository URLs, screenshot metadata, descriptions, and gallery captions.
- `src/components/ProjectPreview.tsx`: real screenshot cover, intrinsic dimensions, truthful caption, and no zoom cropping for screenshots.
- `src/components/ProjectLinks.tsx`: shared Live Demo and View on GitHub buttons with their icons, new-tab behavior, and `noopener noreferrer`.
- `src/components/Projects.tsx`: visible official links alongside the Planora case-study action.
- `src/components/ProjectGallery.tsx`: screenshot crossfade, named image selectors, previous/next navigation, click-to-enlarge modal, arrow keys, close button, Escape, focus cycling and restoration, and scroll locking.
- `src/pages/ProjectPage.tsx`: gallery and prominent official links in the case-study introduction.
- `src/styles/global.css`: responsive gallery and lightbox styles, hover effects, and reduced-motion support using the existing design palette and typography.
- `tests/planora-gallery.spec.ts`: desktop and mobile coverage for screenshots, aspect ratios, external links and popups, lightbox navigation, keyboard focus, Escape, restoration, and WCAG accessibility scans in both themes.
- `README.md`: updated Planora asset and gallery documentation.

## Deployment

No `.vercel/project.json` exists in this workspace. The connected Vercel account returned only `prince-auto-care` and `great-choice-auto`, with no portfolio match and no listed teams. An existing deployment for this portfolio could not be identified, so no deployment was changed. Updating an existing deployment requires its project identity and access through the connected account.

## External link verification

The GitHub repository returned HTTP 200 and was readable in web verification. The supplied live demo initially returned HTTP 200, but subsequent browser and HTTP checks encountered hostname resolution failures (`Could not resolve host: planora.dynv6.net`). Its availability could not be confirmed consistently from this environment. The supplied exact URL remains unchanged. Automated popup checks intercept the external response to verify the portfolio's destination and new-tab behavior independently of third-party availability; these checks do not claim the remote app always loads.

## Validation results

- `npm run typecheck`: passed.
- `npm run lint`: passed with no errors or warnings.
- `npm run build`: passed, including five prerendered pages.
- `npm run test:e2e -- --workers=2`: all 24 tests passed in the final clean run (desktop and mobile Chromium).
- Screenshot rendering and unchanged source hashes verified; gallery aspect ratios checked at 320, 375, 768, and 1440 pixels.
- Lightbox navigation, focus cycling, focus restoration, scroll locking, close button, and Escape verified on desktop and mobile.
- WCAG accessibility scans passed for the open lightbox in both themes and for existing portfolio routes.
- Generated desktop/mobile gallery images and the desktop lightbox were visually inspected. Preview images are in `test-results/planora-gallery-*.png` and `test-results/planora-lightbox-*.png`.

The only remaining limitations are identifying and accessing an existing portfolio deployment, and consistently reaching the external live-demo hostname. The local showcase implementation and requested local validation are complete.
