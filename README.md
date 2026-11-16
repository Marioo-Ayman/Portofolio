# NEON RONIN

A cinematic Next.js App Router portfolio for Mario Ayman. Original torii-and-moon artwork, GSAP scroll choreography, Motion magnetic links, and responsive layouts retain the starter's visual identity.

## Run locally

Use Node.js 20.9+ and npm. On Windows PowerShell, use npm.cmd if execution policy blocks npm.ps1.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Browser tests use installed Google Chrome (Playwright channel "chrome") and start the production server on port 3100. Build before testing. Screenshots are written to ignored test-results/. No browser binaries are downloaded automatically.

## Content required before launch

Edit src/content/site.ts, the source of truth for identity, skills, projects, and experience.

- Add a real email and GitHub/LinkedIn URLs. Contact actions appear only when configured; no invented addresses are shipped.
- Set site.url to the final HTTPS origin. Set readyToIndex to true only when public copy is verified. Until then, metadata and robots block indexing and the sitemap is empty. Next.js warns about its localhost social-image fallback until a real URL is configured.
- Verify each starter project, then set verified: true. Drafts remain visibly labeled and excluded from the sitemap.
- Add authentic screenshots as screenshot: { src: "/images/example.webp", alt: "Describe the actual interface" }. Use local files in public/images. Illustrative fallback artwork is explicitly labeled.
- Confirm or replace the journey entries, then set journeyVerified to true. No dates, employers, or metrics have been added.
- Add a real PDF under public/ and set resumePath. The resume download renders only if that local PDF exists at build time.
- Confirm the existing location, availability, technologies, and personal narrative.

## Implementation

Server Components render the page and project routes. Client boundaries cover navigation, intro, tabs, contact clipboard, and animations.

Typography is configured in `src/app/fonts.ts` with `next/font/google`, and exposed through Tailwind v4 `font-display`, `font-ui`, `font-body`, `font-hud`, and `font-code` tokens. Dela Gothic One supplies display headlines and branding; Zen Kaku Gothic New supplies UI and Japanese subtitles; Inter supplies readable body text; DotGothic16 supplies selective HUD labels and numbers. Code samples use the system monospace stack.

Only Dela and Inter Latin files are preloaded. Zen uses two weights (400/700); DotGothic16 uses its native 400 weight. Japanese unicode-range files load only when their glyphs are used. All fonts use `display: swap` and are self-hosted by Next.js, so visitors do not contact Google. A fresh build needs access to Google's font servers. Body and display fallback metrics are provided by Next.js where available. Do not claim field Core Web Vitals without measuring a deployed site.

GSAP matchMedia reverts scroll effects when reduced motion is enabled. Desktop artwork pinning and subtle pointer parallax are restricted to fine pointers at widths above 1050px. Smaller screens retain normal scrolling. The intro lasts under two seconds, supports Escape/skip, runs once per tab, and tolerates blocked storage. Hash navigation skips it. A native dialog supplies modal focus behavior.

Skills support arrow keys, Home, End and Tab. Mobile navigation contains keyboard focus, supports Escape, closes at desktop widths and makes the underlying main content inert while open. Project routes include draft labels, individual metadata and missing-slug handling. Optional screenshot rendering uses next/image.

## Deployment

Import this repository into Vercel with the Next.js preset. Use the repository root, npm ci, and npm run build. No backend credentials are required. Set the canonical URL in content, verify content, rebuild, and deploy. This task does not publish the site.

Metadata includes Open Graph/Twitter previews, a generated local social image, the existing SVG icon, sitemap and robots routes. An error boundary supplies retry/home actions.

## Validation and limits

See CODEX_NEXT_STEPS.md for the final validation record and remaining content/dependency work. Automated accessibility checks supplement manual review; they do not establish full accessibility conformance or measured Core Web Vitals.

