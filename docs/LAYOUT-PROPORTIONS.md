# Portfolio proportions at 100% browser zoom

## Root cause

The oversized appearance came from the original CSS scale: a 1360px maximum container, 96px navigation, desktop hero text reaching 81–88px, section headings reaching 52–56px, body text reaching 20px, 112px section padding, and large hero row gaps and padding. At 1366 × 768, navigation plus the 881px hero extended to roughly 978px, putting the CTA row partly below the viewport.

Fresh Chromium browser measurements confirmed a 16px root font, CSS zoom of 1, visual viewport scale of 1, and no body transform. There was no page-wide zoom or scale workaround. Tailwind utility classes only arrange the hero actions; the primary sizing comes from the global stylesheet and design tokens. The home hero has no forced viewport-height minimum. The existing `65vh` minimum belongs to the missing-page fallback. Decorative transforms and local animation effects remain scoped to their existing elements.

## Changes

- `src/styles/tokens.css`: 1240px content cap, 72px desktop header, fluid section spacing of 72–96px, 800px case-study media cap, and smaller fluid typography.
- `src/styles/global.css`: compact hero padding and row gaps; 48px buttons; adjusted navigation indicators; reduced section and project spacing, case-study rhythm, and skill-tile heights; intrinsic image ratios and contained rendering; 68–72px responsive navigation. The decorative orbit's own dimensions were reduced to prevent overlap with the description while preserving its animations.
- `src/components/ProjectGallery.tsx` and `src/pages/ProjectPage.tsx`: all case-study images use the accessible enlargement viewer. Planora retains its two real screenshots and navigation. The other projects retain their existing illustrations, clearly captioned as concept artwork. Normal previews are capped at 800px wide: about 451px tall for Planora and 560px for the illustrations. The lightbox uses the available viewport.
- `tests/portfolio.spec.ts`: updated the old minimum-72px hero assertion to enforce the requested smaller type range.
- `tests/layout-proportions.spec.ts`: viewport and theme matrix, typography bounds, hero/CTA fit, navigation separation, decorative-art separation, image loading and ratios, image sizing, single-image enlargement, console errors, and device-pixel-ratio checks.
- `scripts/capture-layout.mjs`: repeatable before/after screenshots and computed browser measurements.

The palette, Manrope font, content, technology assets, official Planora URLs, theme toggle, mobile navigation, and existing motion remain in place. No page-wide zoom or scaling was introduced. The root font remains at the browser's accessible default.

## Measured desktop results

Values below are CSS pixels measured at 100% browser zoom with device pixel ratio 1.

| Viewport | Hero text before → after | Section text before → after | Body text before → after | Hero height before → after |
| --- | --- | --- | --- | --- |
| 1366 × 768 | 80.6 → 59.5 | 51.9 → 40.5 | 18.4 → 16.7 | 880.5 → 645.9 |
| 1440 × 900 | 85 → 61.4 | 54.7 → 41.6 | 19.4 → 16.9 | 895.1 → 652.4 |
| 1536 × 864 | 88 → 63.9 | 56 → 43 | 20 → 17.1 | 905.4 → 660.8 |
| 1920 × 1080 | 88 → 68 | 56 → 44 | 20 → 17.8 | 905.4 → 674.4 |

The 72px header plus hero fits within each specified desktop viewport. At 1366 × 768 the hero ends at roughly 719px and the CTA row ends at roughly 576px. Navigation links remain 16px. Main content caps at 1240px.

## Visual evidence

Before and after captures include the homepage and all four case studies in both themes at 1366 × 768 and 1920 × 1080. Planora also has dedicated gallery captures. JSON measurements cover all four desktop viewports.

| Viewport | Before | After |
| --- | --- | --- |
| 1366 × 768 | [Homepage](layout-previews/before/home-light-1366x768.png) | [Homepage](layout-previews/after/home-light-1366x768.png) |
| 1920 × 1080 | [Homepage](layout-previews/before/home-light-1920x1080.png) | [Homepage](layout-previews/after/home-light-1920x1080.png) |

Generate updated captures while the preview server runs on port 4173:

```sh
node scripts/capture-layout.mjs after
```

## Deployment

No local `.vercel/project.json` was found. The connected Vercel account still lists only `prince-auto-care` and `great-choice-auto`, with no identifiable portfolio project. No deployment was changed. Updating an existing portfolio deployment requires its project identity and access through the connected account.

## Validation results

- TypeScript: `npm run typecheck` passed.
- ESLint: `npm run lint` passed with no errors or warnings.
- Production build: `npm run build` passed, including five prerendered pages.
- Complete browser suite: 27 tests passed, with three redundant mobile-project copies of the explicit viewport matrix skipped. The matrix itself includes 320px and 375px layouts; mobile interactions also have their own tests.
- Final media containment and animation refinements: seven focused browser tests passed after rebuilding, covering both-theme viewport matrices, DPR 2, desktop/mobile Planora interactions, and desktop/mobile normal motion and routing.
- The explicit matrix checked eight requested CSS viewport widths across the homepage and four detail pages in both themes: 80 page/theme/viewport combinations. No horizontal overflow, broken images, out-of-bounds typography, navigation overlap, decorative-art overlap, or browser script errors were found.
- Accessibility scans passed across the portfolio pages in both themes. Mobile navigation, theme persistence, lightbox focus and Escape behavior, existing animations, and technology logos passed the available browser tests.
- Final before/after evidence was captured in real Chromium browser contexts at visual viewport scale 1, with no page-wide scaling. The homepage in both desktop sizes, selected detail pages, and Planora gallery were visually inspected. The viewport matrix and captures provide coverage for every detail page and both themes.

All requested local implementation and validation are complete. The existing Vercel deployment update remains unavailable because no matching portfolio project is identifiable through the connected account.
