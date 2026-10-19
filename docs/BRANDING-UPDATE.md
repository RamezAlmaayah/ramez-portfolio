# Custom RA monogram update

## Supplied asset and preparation

The supplied `شعار هندسي مدمج بحرفي R وA.png` was used directly. No new logo was designed, traced, or generated. The 1254 × 1254 transparent PNG contained large margins and nearly invisible export speckles outside the visible monogram. The preparation script finds the visible bounds at alpha ≥8 and retains a two-pixel antialiasing margin, producing a **1010 × 578** transparent image.

The cropped original's RGBA pixels were compared byte-for-byte with the corresponding source crop and are unchanged. The dark-background variant changes RGB colors only: the navy shape becomes Soft White and the grey crossbar becomes a lighter grey. Its alpha channel is exactly identical to the cropped original. There are no CSS color filters or geometric alterations. Source/crop metadata and hashes are recorded in `public/branding/source.json`.

## Asset paths

- `public/branding/ra-logo.png`: cropped original navy/grey monogram.
- `public/branding/ra-logo-light.png`: light variant for dark surfaces.
- `public/branding/favicon-16.png`, `favicon-32.png`, `favicon-180.png`: square browser/touch derivatives containing the original monogram on a Soft White field for reliable contrast.
- `public/branding/apple-touch-icon.png`: 180 × 180 Apple touch icon.
- `public/favicon.ico`: 16, 32, 48, and 64px frames.
- `public/favicon.svg`: legacy URL now embeds the supplied monogram rather than the previous letter-R drawing.
- `public/social-preview.svg` and `public/social-preview.png`: existing social artwork with the light monogram added; dimensions are 1200 × 840 and the Open Graph metadata matches.

## Replaced locations

- Shared desktop/mobile header: **38px** wide on desktop, **34px** on narrow screens. The existing homepage link, name alignment, navigation structure, and 60px desktop / 68–72px narrow header heights are retained.
- Footer: **46px** wide, using the light variant because the footer stays dark in both themes. The link has an explicit accessible homepage label.
- About: replaced the old `RA.` text monogram with the supplied mark, **68px** wide on desktop and **64px** on narrow screens.
- Browser favicon, Apple touch icon, and social/Open Graph image.

No separate loading-screen or mobile-menu-panel logo existed. The mobile menu retains the updated shared header. No ordinary words, project descriptions, case-study assets, technology logos, or CV content were replaced.

## Component and styling

`src/components/Logo.tsx` is the reusable source for header, About, and footer branding. Explicit image dimensions and a matching aspect ratio reserve space before images decode. CSS selects the correct original/light image from the existing theme attribute; the footer explicitly selects the light variant. Linked logos are decorative inside named links, while the About image has a descriptive accessible alternative.

`src/styles/branding.css` applies sizing and a subtle **200ms** hover scale/opacity effect on logo links for hover-capable pointers. Reduced motion removes the hover movement and uses the existing global near-zero transition reset. Obsolete text-monogram rules were removed from the base and compact stylesheets. No compact sizing token was increased.

## Files changed

- New: `src/components/Logo.tsx`, `src/styles/branding.css`, and `tests/branding.spec.ts`.
- UI/imports: `src/components/Header.tsx`, `About.tsx`, `Footer.tsx`, and `src/main.tsx`.
- Cleanup: `src/styles/global.css` and `src/styles/compact.css` remove obsolete text-logo rules.
- Head metadata/icons: `index.html`.
- Assets: `public/branding/`, root favicon SVG/ICO, social preview SVG/PNG.
- Tools: new `scripts/prepare-branding.py`, new `scripts/capture-branding.mjs`, updated `scripts/generate-artwork.mjs` and `scripts/capture-preview.mjs` so future exports preserve the supplied branding.
- Tests: `tests/layout-stability.spec.ts` checks visible images, since alternate theme logo images are deliberately hidden.
- Documentation: this report, README branding notes, and screenshots in `docs/branding-previews/`.

The asset-preparation script uses Pillow as an authoring tool; no application dependency or build-time image service was added. Reproduce the derivatives with `python scripts/prepare-branding.py <source-png>`.

## Deployment

No matching portfolio project is accessible in the connected Vercel account, which still lists only `prince-auto-care` and `great-choice-auto`. No unrelated project was changed and no production deployment is claimed. Deployment requires access to the intended portfolio project/account or its project identity.

## Executed validation results

- `npm run typecheck`: passed, including the new branding tests.
- `npm run lint`: passed with no errors or warnings; rerun after the final capture-script refinement.
- `npm run build`: passed, including six prerendered routes.
- `npm run test:e2e -- --workers=2`: **37 passed**, with three redundant mobile-project copies of the explicit viewport matrix skipped. No tests failed in the final full run.
- Branding checks passed on desktop and mobile: correct original/light theme asset, 38px/34px header logo, 46px footer logo, unchanged 60px/68px navigation, accessible About labeling, homepage links, menu keyboard behavior, 16/32/180px icons, ICO/SVG asset loading, and reduced-motion/hover behavior.
- The full matrix checked all six pages across eight viewport widths and both themes. Compact sizing, no horizontal overflow, layout stability, accessibility scans, existing project galleries, resume downloads, technology logos, page transitions, and theme switching passed.
- Original crop pixels match the supplied PNG exactly. Original and light variant alpha channels match exactly. ICO frames were verified as 16, 32, 48, and 64px.
- Header, About, footer, and mobile-menu captures were generated at 320, 375, 1366, and 1920px widths in both themes. Desktop headers, the mobile footer and menu, and the social preview were visually inspected. Evidence is in `docs/branding-previews/`.
- No old text-monogram elements or styling references remain in `src/`. Ordinary words, CV content, projects, and technology branding were preserved.

All requested local branding work and validation are complete. Updating a public Vercel deployment remains dependent on identifying and accessing the correct project.
