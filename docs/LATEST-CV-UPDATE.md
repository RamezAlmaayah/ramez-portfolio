# Professional portfolio alignment — 4 November 2026

The existing React/TypeScript/Vite portfolio is maintained at https://ramez-dev-portfolio.netlify.app/. Its compact navy design, themes, animations, routes, and existing galleries are preserved.

## Approved content and CV

The user supplied `C:/Users/Magic Systems/Downloads/Ramez_Ats_Resume_.pdf` as the new approved CV on 4 November 2026. It was inspected and copied byte-for-byte to `public/ramez-ahmad-resume.pdf`. The PDF was not recreated or edited.

- Public download: `/ramez-ahmad-resume.pdf`
- Size: 353,903 bytes
- SHA-256: `6efae7259eab3b75dbbac7f81743c4cd81d4cc8854e102511526d879a040731c`
- Visual inspection: `docs/approved-cv-preview.png`

The profile now states the junior full-stack/software engineering career target, both July–September 2026 internships, six aligned skill groups, the Software Engineering degree (2022–2026), Apex AI Engineering training marked In Progress, ASP.NET & Oracle APEX training, and English for IT 1. Unsupported general Python/Docker/CI/CD skill claims were removed. CaeloTerra remains an additional valid project with its existing in-development scope.

## Projects

FR Compare replaces the removed project in the same Additional Work position, with a cover, stack, live/repository actions, and `/projects/fr-compare` case study. Planora is described as a project management system with the Team Leader & Full-Stack Developer role; its descriptions no longer label it a graduation project. Existing Unseen Jo and Planora screenshot galleries remain intact.

FR Compare technical claims were checked against repository revision `2e89db774e8e87d3227fa63e372b16b891ef1f0c`, particularly:

- `backend/utils/comparisonCalculations.js`, `weightedScore.js`, and `quotationCalculations.js`
- `backend/controllers/comparisonController.js`, `decisionController.js`, `priceHistoryController.js`, and `dashboardController.js`
- `backend/controllers/authController.js`, `models/User.js`, `middleware/requireAuth.js`, and `app.js`
- `backend/middleware/upload.js`, `services/uploadStorage.js`, and `controllers/uploadController.js`
- `frontend/src/components/Sidebar.jsx` and the project README

The case study covers workflow, contribution, architecture, JWT and ownership checks, GridFS uploads, comparison formulas, ties, missing delivery data, neutral supplier ratings, implementation challenges, and learning outcomes. Split-award results are correctly described as item subtotals without guaranteed final savings. No user counts, performance metrics, or business results are invented.

FR Compare's public frontend opens its login page. No authenticated records or customer data were accessed. The branded editorial cover follows the project's FR monogram and “Procurement, considered.” identity; it is explicitly labeled as illustration. The existing optional `gallery` data model is ready for verified screenshots.

## Design, assets, and SEO

- The FR Compare cover uses the existing 1200×840 artwork proportions.
- Express and Mongoose logos reuse the project's pinned Devicon source and license, with provenance and hashes in `public/technologies/sources.json`.
- Six skill cards balance across the existing desktop/tablet grids.
- Obsolete project artwork, CSS, and isolated validation captures were removed after checking references.
- The generated sitemap and canonical URLs use the verified production origin. Client navigation updates canonical and Open Graph URLs.
- External project links retain `target="_blank"` and `rel="noopener noreferrer"`.

## Validation

Production build and ESLint pass. The full Playwright run completed with 45 passed, 3 intentionally skipped desktop-only cases in the mobile project, and zero failures. Playwright covers all five project routes, refreshes, static HTML, accessible navigation, themes, reduced motion, responsive widths from 320 to 1920 pixels, image loading, galleries, layout shifts, real PDF download, and the updated professional content. Current desktop/mobile screenshots in both themes are in `docs/validation/professional-update/`.

See `docs/NETLIFY-DEPLOYMENT.md` for the existing deployment configuration and publication verification.

External checks: FR Compare, Unseen Jo, Planora, both project GitHub repositories, and the GitHub profile returned HTTP 200. LinkedIn returned its automated-access block (HTTP 999); the supplied destination is retained, but automated profile-content verification is unavailable.
