# Compact portfolio refinement

The desktop layout is deliberately smaller than the previous proportions update. The existing palette, Manrope font, project content, real Planora screenshots, official links, technology assets, theme controls, navigation, lightboxes, and animation logic are preserved. No page-wide CSS zoom or transform scaling was added. No deployment was performed, as requested.

## Exact desktop changes

The density rules live in `src/styles/compact.css`, loaded after the base stylesheet by `src/main.tsx`. They apply at viewport widths of 900px and above. The global content cap in `src/styles/tokens.css` is now 1120px.

| Setting | Previous | Compact version |
| --- | --- | --- |
| Content cap | 1240px | 1120px |
| Navigation height | 72px | 60px |
| Hero type | 59.5–68px at tested desktop sizes | 45.7–51.2px; fluid range 44–52px |
| Section type | 40.5–44px | 33.7–34px; fluid range 28–34px |
| Project titles | About 32px maximum | Fluid 22–26px |
| Main body type | 16.7–17.8px at tested desktop sizes | 15.4–15.9px; fluid range 15–16px |
| Navigation / buttons | 16px labels | 14px labels |
| Action buttons | 48px minimum height | 40px; 44px on wider touch screens |
| Section padding per side | About 82–96px at tested desktop sizes | About 55–64px; fluid range 48–64px |
| Hero padding / row gap | 48px top, 32px bottom / 32px | 32px top, 24px bottom / 20px |
| Decorative orbit | 320 × 260px | 244 × 200px, with smaller ring dimensions |
| Skill-card padding / grid gap | 24px / 24px | 18px / 16px |
| Skill-tile minimum height | 104px | 64px; text-only tiles 48px |
| Skill logos / labels | 40px / 16px | 30px / 14px |
| Stack logos | 28px | 26px |
| Technology tile layout | Logo above label | Logo beside label on desktop |
| Project row gap / collection gap | 40px / 64px | 28px / 44px |
| Homepage project image cap | Column width, roughly 570px | 480px |
| Case-study image cap | 800px wide / 560px high | 680px wide / 476px high |
| Planora preview height at maximum width | About 451px | About 384px |
| Timeline entry bottom spacing | 58px | 32px |
| Timeline column gap | 70px | 36px |
| Education-card padding / column gap | 38px / 80px | 24px / 36px |
| Training entry vertical padding | 21px | 14px |
| Case-section margin / top padding | 64px / 40px | 44px / 28px |

About, contact, footer, case-study paragraphs, facts, panels, captions, and headings also use tighter desktop spacing and smaller readable type. Images retain their original aspect ratios and lightbox behavior.

## Measured change at 100% zoom

Fresh Chromium contexts used visual viewport scale 1 and device pixel ratio 1. DPR 2 also has a dedicated browser check. The root font remains at the browser's 16px default.

| Viewport | Hero heading before → after | Hero bottom before → after | Homepage height before → after |
| --- | --- | --- | --- |
| 1366 × 768 | 59.5 → 45.7px | 719 → 583px | 9558 → 7159px |
| 1440 × 900 | 61.4 → 46.4px | 725 → 586px | 9706 → 7248px |
| 1536 × 864 | 63.9 → 47.4px | 734 → 590px | 9791 → 7303px |
| 1920 × 1080 | 68 → 51.2px | 747 → 605px | 9855 → 7359px |

The homepage is about 25% shorter with all content retained. At 1366 × 768, the About heading is now visible in the first screen. These before measurements refer to the immediately preceding version, not the original oversized site.

## Mobile behavior

Below 900px, the existing type sizes, layout rules, logos, and action-button dimensions are retained. Mobile navigation stays 68–72px tall, action buttons retain their 48px minimum, and icon/lightbox controls retain 44px targets. Wider screens with coarse pointers use at least 44px action buttons. The desktop rules follow available CSS width, rather than inferred device names.

## Visual evidence

Both phases contain homepage and case-study captures in both themes at 1366 × 768 and 1920 × 1080. The compact version also includes skills, projects, experience, and education section captures. JSON measurements cover all four desktop sizes.

| Viewport | Immediately previous version | Compact version |
| --- | --- | --- |
| 1366 × 768 | [Before](layout-previews/compact-before/home-light-1366x768.png) | [After](layout-previews/compact-after/home-light-1366x768.png) |
| 1920 × 1080 | [Before](layout-previews/compact-before/home-light-1920x1080.png) | [After](layout-previews/compact-after/home-light-1920x1080.png) |

Regenerate the compact captures with the preview server on port 4173:

```sh
node scripts/capture-layout.mjs compact-after
```

## Validation coverage

The responsive tests now enforce the new compact desktop targets while retaining the mobile bounds. The matrix covers 320, 375, 768, 1024, 1366, 1440, 1536, and 1920px across all five pages in both themes. Existing tests cover keyboard navigation, theme persistence, accessibility, screenshot rendering, aspect ratios, project links, lightboxes, logo loading, reduced motion, normal motion, and routing. A new layout-stability check observes layout shifts during font and image loading on every route in both desktop and mobile contexts.

## Final results

- `npm run typecheck`: passed.
- `npm run lint`: passed with no errors or warnings, including the final capture-script changes.
- `npm run build`: passed, including five prerendered pages.
- `npm run test:e2e -- --workers=2`: 29 tests passed. Three redundant mobile-project copies of the explicit viewport matrix were skipped; the matrix itself includes narrow widths, and the mobile interaction and stability tests ran.
- All 80 page/theme/viewport combinations passed compact sizing, image loading and aspect ratios, containment, navigation separation, decorative-art separation, and horizontal-overflow checks.
- Font/image layout-stability tests passed on every route in both desktop and mobile contexts (cumulative layout shift below 0.1).
- Accessibility, both theme modes, mobile navigation, lightbox controls and focus behavior, official project-link buttons, animation behavior, routing, and technology assets passed the available browser tests.
- Before/after screenshots at 1366 × 768 and 1920 × 1080 were captured at 100% zoom. The compact homepage in both themes, skills, experience, education, and Planora gallery were visually reviewed.

The local refinement and requested validation are complete. No Vercel inspection or deployment was performed during this task.
