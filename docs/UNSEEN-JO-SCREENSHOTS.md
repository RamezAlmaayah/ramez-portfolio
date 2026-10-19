# Unseen Jo screenshot integration

The supplied screenshots were copied into `public/projects/unseen-jo/`; that directory did not previously exist.

| Original attachment timestamp | Retained original | Dimensions | Presentation |
| --- | --- | --- | --- |
| 2026-10-17 204442 | `homepage.png` | 1362 × 766 | Homepage cover and gallery image 1 |
| 2026-10-17 204453 | `explore-map.png` | 1362 × 764 | Explore and Map, gallery image 2 |
| 2026-10-17 204505 | `surprise-me-preferences.png` | 1361 × 767 | Surprise Me Preferences, gallery image 3 |

Original PNG hashes match the supplied attachments. Each full-size `.webp` is lossless and was verified against the original RGB pixels. Each screenshot also has 960px, 640px, and 320px WebP derivatives; resized derivatives use Lanczos resampling and WebP quality 90. No screenshot was cropped or retouched.

The three original PNGs total 1,510,856 bytes. Full-size lossless WebP versions total 966,632 bytes, a 36% reduction. The 640px versions total 82,700 bytes. Responsive `srcset` selects an appropriate file, and thumbnails use the 320px versions. Width and height attributes reserve space; below-the-fold Unseen Jo gallery images and thumbnails load lazily.

Screenshot metadata remains centralized in `src/data/portfolio.ts`. The shared `ProjectPreview` and `ProjectGallery` components render the cover, captions, crossfades, thumbnails, next/previous navigation, keyboard navigation, touch swipes, and native dialog lightbox. The existing focus trap, Escape behavior, focus restoration, and reduced-motion support are preserved. Planora retains its original image paths and text selectors.

Captions describe the captures accurately: the homepage and Explore screen show unpublished-content empty states. The Surprise Me screenshot explicitly describes its fixed Figma sample demo flow. Existing CV project descriptions and technology data were preserved. No authentication, saved-discovery, place-detail, or mobile application screenshots were supplied; none were fabricated.

Source and test files changed:

- `src/data/portfolio.ts`
- `src/components/ProjectPreview.tsx`
- `src/components/ProjectGallery.tsx`
- `src/styles/global.css`
- `tests/unseen-gallery.spec.ts`
- `tests/layout-proportions.spec.ts` — compare actual selected-file pixels rather than rounded density-corrected `srcset` dimensions.

No deployment was requested or performed.

Validation evidence:

- TypeScript validation, ESLint, and the production client/SSR build succeeded; six pages were prerendered.
- `tests/unseen-gallery.spec.ts` passed in both desktop Chromium and mobile Chromium emulation. It exercises the three screenshots at 320, 375, 768, 1024, 1366, 1440, and 1920px; thumbnails, previous/next, touch events, arrow keys, Escape, close-button behavior, focus trapping/restoration, normal crossfades, reduced motion, and both themes. Automated WCAG checks found no violations in the inline gallery or open dialog in either theme.
- All 15 original and derivative asset URLs returned HTTP 200 with image content types.
- Original hashes and full-size WebP RGB pixel equality were independently verified.
- Gallery and lightbox captures for both themes and desktop/mobile are saved in `docs/validation/unseen-jo/`. The actual homepage cover was also captured at 1366 × 768 and 1920 × 1080 browser viewports and visually reviewed.
- The broader regression coverage passed: Planora gallery/links/lightbox in desktop and mobile contexts, latest CV content and resume download, loading stability on all six routes, device pixel ratio 2, and all six pages at 320, 375, 768, 1024, 1366, 1440, 1536, and 1920px in both themes. The layout matrix verifies 100% visual viewport scale, readable compact dimensions, image proportions, and no horizontal overflow.
- Combined final coverage: 13 relevant browser cases passed across runs; three duplicate mobile-project matrix cases were intentionally skipped. A concurrent light-theme matrix run reached its time limit; its isolated rerun passed in 45.6 seconds. Earlier checks caught and resolved thumbnail-label overflow at 320px. Responsive image ratio checks now use the actual selected file instead of rounded density-corrected dimensions; reduced-motion checks accept the existing global 0.01ms transition policy.

Executed commands:

```text
npm run typecheck
npm run lint
npm run build
npx playwright test tests/unseen-gallery.spec.ts tests/layout-proportions.spec.ts --workers=2
npx playwright test tests/layout-proportions.spec.ts tests/planora-gallery.spec.ts tests/layout-stability.spec.ts tests/latest-cv.spec.ts --workers=2
npx playwright test tests/layout-proportions.spec.ts --project=desktop --grep 'light: proportional' --workers=1
```

No required screenshot assets are missing. Browser checks used real Chromium with desktop and mobile emulation, rather than physical mobile hardware.
