# CV refactor and launch handoff

## Completed

- Populated Mario Ayman Mofeed's professional data from the supplied CV: Alexandria, email/social links, Dot Net employment (October 2025–present), Huma-Volve and Odoo internships (2024), Assiut University CS degree (2020–2024), and seven training/certification entries.
- Created six CV-backed case studies: Live Support System, Honest EGY, AI-Powered Task Management, Safarni, Cure App and Online Quiz Platform. Included roles, features, stack and documented technical approach. No invented metrics, challenges or outcomes.
- Preserved the existing investment URL and the unverified Market Simulator draft route. The draft remains labeled, excluded from homepage work and the sitemap.
- Refined the hero, About copy, four skills categories, project library, professional timeline, education and training layouts. Added coordinated GSAP entrances, project masks and timeline highlights while preserving the section 4 transform-pinning fix.
- Retained the Dela Gothic One / Zen Kaku Gothic New / Inter / DotGothic16 font system, Japanese accents and Tailwind v4 tokens. Only two Latin font resources are preloaded; Japanese unicode ranges remain on demand.
- Added a configurable portrait with the existing illustration as fallback. Preserved the 700ms grayscale/color, zoom and crimson glow, with touch and reduced-motion support.
- Enabled email, clipboard, social and download actions. Generated a three-page public PDF from curated data, excluding the private phone number and original DOCX.
- Set the production canonical origin and CV-backed metadata. Indexing remains disabled pending review.

## Files changed

- `src/content/site.ts`: identity, projects, experience, training, portrait settings, editorial TODOs.
- `src/components/sections/{Hero,About,Arsenal,Projects,Journey,Contact}.tsx`: homepage content/layouts.
- `src/components/effects/ScrollAtmosphere.tsx`: scroll choreography.
- `src/components/layout/SiteHeader.tsx`: compact brand name.
- `src/components/ui/{ProjectArtwork,ResumeLink}.tsx`: illustrative variants and CV action.
- `src/app/globals.css`: responsive layout, typography, timeline and contrast.
- `src/app/page.tsx`: server-rendered resume slot for Contact.
- `src/app/projects/[slug]/page.tsx`: case studies and metadata.
- `scripts/generate-cv.mjs`, `public/Mario-Ayman-CV.pdf`, `package.json`: reproducible public CV.
- `tests/portfolio.spec.ts`, `README.md`, this file: validation and handoff.

## Owner content review

1. Provide a portrait and authentic project screenshots. Existing project artwork is explicitly illustrative. Configure `site.portrait` and each project's `screenshot` in `src/content/site.ts`; see README examples.
2. Resolve the CV discrepancy: Huma-Volve experience says **2024**, while Cure/Safarni projects say **2025**. Both dates remain in their original contexts, including the public PDF.
3. Supply the Odoo internship organization and the September 2023 PHP/MySQL course provider. Missing provider names are omitted publicly.
4. Supply the AI task-management date and public links for AI and Honest EGY. No date or URL was guessed.
5. Confirm whether older investment details (English/Arabic localization, RTL, i18next, packages and application validation) belong to Honest EGY. These were unverified starter claims, so they were not promoted into the CV-backed copy.
6. Confirm the starter's Live Support TypeScript/MySQL claims and starter-only skills (Motion, Sanctum, Vercel, Insomnia) before including them as CV-backed professional skills.
7. Confirm whether Market Simulator is real work; its original description, stack and features remain in the draft record.
8. Verify the CV widget URL `https://platform.tkdsservers.com/events` before enabling a live-demo action.
9. Supply documented engineering challenges if deeper retrospectives are desired.
10. Review the public PDF, contact destinations, current employment and metadata before setting `site.readyToIndex: true`.

The CV supplied the social/repository links. GitHub profile, Cure, Safarni and Online Quizzer pages were accessible during review. LinkedIn, Live Support's repository, the widget destination and deployed portfolio could not be independently fetched by the browsing tool. The CV links are retained, except the unverified widget demo. No credential verification URLs were supplied.

## Validation — 16 November 2026

- `npm run typecheck`: passed.
- `npm run lint`: passed without warnings.
- `npm run build`: passed with seven generated project routes (six CV-backed plus one draft).
- Final `npm run test:e2e`: **11 passed (46.8s)**. Covers all requested widths (320, 375, 768, 1024, 1440, 1920), keyboard tabs/menu, intro, scroll pinning in both directions, case studies, 404/draft handling, email clipboard, CV download, canonical/noindex metadata and axe WCAG A/AA checks on the homepage and all six mobile case studies.
- Fixed a low-contrast case-study illustration caption by increasing its contrast and size. The production rebuild and expanded accessibility checks passed afterward.
- Additional Chrome checks: no text ranges crossed the viewport at the six widths. Desktop/mobile hero, contact, timeline and About were visually reviewed. About transitioned grayscale(1)/scale(1) to grayscale(0)/scale(1.05) and back in 700ms with the requested shadow. Frame width/height stayed stable; reduced motion disabled zoom and touch used full color.
- `npm run cv:generate -- --preview`: passed. Three PDF pages; all print sections fit and their previews were visually reviewed. Only curated public data enters the generator.

Screenshots are ignored local artifacts under `test-results/`. Tests use installed Chrome against a production build. These checks do not establish full accessibility conformance or deployed Core Web Vitals. Physical devices, Safari/Firefox, screen readers, email delivery and field performance were not tested. Four font families and Japanese ranges still incur font transfer costs; only body/display Latin faces are preloaded.

An earlier audit recorded seven moderate findings in development lint-tool dependencies. No runtime library was added by this refactor; that historical audit was not rerun during the CV work.

## Deploy to Vercel

1. Commit the source and generated `public/Mario-Ayman-CV.pdf`. Keep the private DOCX and ignored screenshots out of the repository.
2. Import `Marioo-Ayman/Portofolio`; choose Next.js, repository root, `npm ci`, `npm run build` and the default output directory. Use a Node release supported by the installed Next.js version (minimum 20.9).
3. Allow Google Fonts access during a fresh build. No secrets, database or backend service is required; the committed PDF is served without Chrome on Vercel.
4. Review a preview deployment, navigation, downloads and metadata. Keep indexing disabled until the content review is complete.
5. Set `site.readyToIndex: true` and rebuild when ready. Draft projects remain noindex and outside the sitemap.

Regenerate the PDF after changing professional data: `npm run cv:generate`. Optional print previews: `npm run cv:generate -- --preview`.

No commit, push or deployment was performed by this task.
