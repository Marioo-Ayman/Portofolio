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

## Content and assets

Edit src/content/site.ts, the source of truth for identity, skills, projects, and experience.

Identity, contact details, three experience entries, education, seven training entries and six projects are populated from the supplied CV. Interests come from the owner's brief. `verified` identifies CV-backed project content; it does not claim an independent employment or repository audit.

- The canonical origin is `https://portofolio-gamma-gilt.vercel.app`. `readyToIndex` remains false pending the content review in `CODEX_NEXT_STEPS.md`. Metadata and robots block indexing, and the sitemap remains empty.
- The original Market Simulator route is preserved as a visibly labeled draft, excluded from featured work and the sitemap.
- Add a personal photo under `public/images`, then set `site.portrait` to `{ src: "/images/mario.webp", alt: "Mario Ayman", position: "center" }`. The existing illustration remains until an authentic portrait is supplied. The frame handles cropping, grayscale/color, zoom and glow.
- Add authentic project screenshots through `screenshot: { src: "/images/example.webp", alt: "Describe the actual interface" }`. All existing fallback artwork is labeled illustrative.
- Missing facts and uncertain older content are recorded in `contentTodos` and the handoff notes, rather than invented in public copy.

## Public CV

`public/Mario-Ayman-CV.pdf` is a three-page public edition generated from the curated portfolio data. It includes the public email, profile links and city/country; it does not copy the private phone number or original DOCX into the repository.

After editing the content, regenerate and review it before committing:

```sh
npm run cv:generate
# Optional print-layout screenshots in ignored test-results/:
npm run cv:generate -- --preview
```

Generation needs installed Google Chrome and development dependencies. Vercel serves the committed PDF and does not run Chrome during builds. The download link renders only if the configured local PDF exists at build time.

## Implementation

Server Components render the page and project routes. Client boundaries cover navigation, intro, tabs, contact clipboard, and animations.

Typography is configured in `src/app/fonts.ts` with `next/font/google`, and exposed through Tailwind v4 `font-display`, `font-ui`, `font-body`, `font-hud`, and `font-code` tokens. Dela Gothic One supplies display headlines and branding; Zen Kaku Gothic New supplies UI and Japanese subtitles; Inter supplies readable body text; DotGothic16 supplies selective HUD labels and numbers. Code samples use the system monospace stack.

Only Dela and Inter Latin files are preloaded. Zen uses two weights (400/700); DotGothic16 uses its native 400 weight. Japanese unicode-range files load only when their glyphs are used. All fonts use `display: swap` and are self-hosted by Next.js, so visitors do not contact Google. A fresh build needs access to Google's font servers. Body and display fallback metrics are provided by Next.js where available. Do not claim field Core Web Vitals without measuring a deployed site.

GSAP matchMedia reverts scroll effects when reduced motion is enabled. Desktop artwork pinning and subtle pointer parallax are restricted to fine pointers at widths above 1050px. Smaller screens retain normal scrolling. The intro lasts under two seconds, supports Escape/skip, runs once per tab, and tolerates blocked storage. Hash navigation skips it. A native dialog supplies modal focus behavior.

Skills support arrow keys, Home, End and Tab. Mobile navigation contains keyboard focus, supports Escape, closes at desktop widths and makes the underlying main content inert while open. Project routes include draft labels, individual metadata and missing-slug handling. Optional screenshot rendering uses next/image.

## Deployment

Import `Marioo-Ayman/Portofolio` into Vercel with the Next.js preset. Use the repository root, `npm ci`, and `npm run build`; leave the output directory at its Next.js default. No backend credentials are required. Commit the generated public PDF with the source. Fresh builds need Google Fonts network access. Review a preview deployment before promoting to production. Enable `site.readyToIndex` only after the remaining content review, then rebuild. This task does not publish the site.

Metadata includes Open Graph/Twitter previews, a generated local social image, the existing SVG icon, sitemap and robots routes. An error boundary supplies retry/home actions.

## Validation and limits

See CODEX_NEXT_STEPS.md for the final validation record and remaining content/dependency work. Automated accessibility checks supplement manual review; they do not establish full accessibility conformance or measured Core Web Vitals.

