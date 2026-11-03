# Existing Netlify production deployment

- Site: https://ramez-dev-portfolio.netlify.app/
- Site ID: `71bc1f04-e9c3-4a70-810b-cec8ad564e16`
- Repository: https://github.com/RamezAlmaayah/ramez-portfolio
- Production branch: `main`
- Build: `npm run build`
- Publish directory: `dist`
- Node.js: 24, configured in `netlify.toml`

The authenticated Netlify API confirmed this existing GitHub connection on 4 November 2026. Use this existing project; do not create another site.

The build prerenders `/`, `/projects/planora`, `/projects/unseen-jo`, `/projects/caeloterra`, `/projects/moodle-dashboard`, and `/projects/fr-compare`. `public/_redirects` supplies the SPA fallback. The default SEO origin is the verified production URL, with `SITE_URL` available as a build override.

Push the tested portfolio commit to `origin/main`, then verify the resulting Netlify deployment's commit reference and published status. Check each route directly and after refresh, both themes, desktop/mobile layouts, project actions, image assets, sitemap, and `/ramez-ahmad-resume.pdf`. The served PDF must match the SHA-256 recorded in `LATEST-CV-UPDATE.md`.

No credentials are committed. The FR Compare application repository is read-only during portfolio maintenance.
