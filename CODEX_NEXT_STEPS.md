# Completion and launch checklist

## Implemented
- Preserved original hero artwork and existing portfolio sections/routes.
- GSAP staggered hero/reveal animation, desktop pointer/scroll parallax, and selective project-art pinning with matchMedia cleanup.
- Persistent section-aware chapter navigation; mobile keyboard containment, Escape, focus restoration, and responsive closing.
- Native skippable intro dialog, once-per-tab behavior, storage fallback, and reduced-motion support.
- Four keyboard-operable skill categories.
- Verified/draft project controls, authentic local screenshot support, and clearly labeled illustrative fallbacks.
- Resume download guarded by local PDF existence.
- Clipboard feedback and timeout cleanup; absent contacts remain explicitly unavailable.
- next/font/google typography with Dela Gothic One, Zen Kaku Gothic New, Inter and DotGothic16; Open Graph image, metadata, sitemap, robots, error retry, and existing favicon.
- Reusable Playwright/axe browser checks.

## Validation (16 November 2026)
- npm install: completed.
- npm run typecheck: passed.
- npm run lint: passed with no warnings.
- npm run build: passed, including three prerendered project detail pages.
- Browser assertions: nine tests cover intro dismissal/reload, 320/375/768/1024/1440/1920 widths, overflow, skill keyboard controls, mobile menu, chapter navigation, project routes, 404, reduced motion, generated social image, robots and axe WCAG A/AA checks.
- Reviewed desktop and mobile full-page screenshots. Screenshots are local ignored artifacts in test-results/.
- Real-user Core Web Vitals, physical-device testing, Firefox/Safari, email delivery, and deployment were not measured/tested.

Scroll regression fix: section 4 artwork now uses transform-based pinning so the
row entrance transform cannot offset a fixed-position image. The regression test
reproduced an 80px jump before the fix and passed afterward across all three
cards, scrolling both directions. The animated-navigation test, TypeScript,
ESLint and production build also passed after this fix.

## Required owner content
1. Set site.email, github and linkedin to real values.
2. Confirm existing identity, availability, skills and personal narrative.
3. Verify project copy and supply real links/screenshots; set each verified flag only when accurate.
4. Verify journey descriptions; set journeyVerified after confirmation. No employment dates were invented.
5. Optionally add a real resume PDF and resumePath.
6. Set site.url to the deployed HTTPS origin and readyToIndex to true when ready. The missing URL currently causes a documented Next.js localhost metadata warning. Draft projects stay noindex and out of the sitemap.

## Dependencies
npm audit reports seven moderate findings in the development-only TypeScript ESLint/minimatch dependency chain. npm audit fix completed but did not resolve them within compatible ranges. No forced major-version override was applied. Review upstream lint-tool updates before release; these findings are not in the production dependency tree.

## Deploy
Use Vercel's Next.js preset, repository root, npm ci and npm run build. No secrets are required. No site was published during this task.

