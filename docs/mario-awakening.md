# MARIO Awakening

The production intro uses one isolated GSAP timeline (3.85 seconds), original-pixel PNG layers, SVG reveal masks and two diagonal viewport halves. It does not display or play the reference GIF. The existing Neo-Tokyo hero and its entrance animation are revealed by the cut.

## Artwork provenance and limits

Source: `WhatsApp Image 2026-11-17 at 9.53.07 AM.jpeg`, 1600 × 1551, flattened JPEG. The supplied storyboard is a nine-frame, 506 × 337 GIF. Geometry comes from the JPEG; the GIF supplies the sequence and motion direction.

`scripts/prepare-brand.mjs` extracts the five disconnected white components by connected-pixel masks. It retains detached brush flecks, removes the black matte and low-level JPEG noise, and exports nine transparent PNGs in `public/images/brand/`. The vertical layers share a 390 × 1210 coordinate system; crop rectangles and component bounds are recorded in `geometry.json`. Complete vertical and compact arrangements are extracted independently from their respective source regions. No font, generated character or new logo is substituted.

The flattened source has no vector stroke order or red pixels beneath its white lettering. Brush movement therefore uses approximate reveal paths over the original pixel silhouettes, with the full source mask restored at the end of each letter. Concealed stamp/disk areas are filled using sampled source reds; exposed edges and scratches remain from the source. This is a mask-based interpretation, not recovery of original vector strokes or hidden artwork.

Regenerate assets with:

```powershell
node scripts/prepare-brand.mjs 'C:\path\to\original-logo.jpeg'
```

## Motion and integration

| Time | Action |
| --- | --- |
| 0.04–1.17s | M, A, R, I, O brush masks in sequence |
| 1.27–1.51s | Directional crimson stamp |
| 1.51–1.78s | Complete identity held on screen |
| 1.78–2.54s | Curved M/A/R collapse; contracting stamp and expanding source disk |
| 2.13–2.63s | Shared camera translation centers I/O without separating its layers |
| 2.54–3.02s | Dim, one activation pulse, indigo ring and outward particles |
| 3.02–3.85s | Katana slash and diagonal separation of both logo and overlay |
| 3.18s onward | Existing hero/header entrance begins beneath the opening |

The navbar occupies a fixed box. At the homepage top it displays the vertical source emblem; beyond 100px it transitions to the complete compact source arrangement in 520ms. Reverse scrolling restores the vertical state. Project pages use the compact state. Both share one accessible home link. Hover glow lasts 350ms and does not loop.

The intro is gated before paint, skipped for hash navigation and reduced motion, and marked seen in session storage with an in-memory fallback. Skip and Escape restore focus, inert state and scrolling. Asset decode failure opens the page immediately; a 6.5-second watchdog handles stalled assets/hydration. GSAP context and event handlers are cleaned up on dismissal or unmount. Mobile retains the sequence with fewer particles and a responsive composition.

## Verification and preview

Run `npm run typecheck`, `npm run lint`, `npm run build`, then `npm run test:e2e`. On PowerShell installations that block `npm.ps1`, use `npm.cmd`.

Playwright normally starts an isolated production server on port 3102. `PLAYWRIGHT_PORT` overrides that port. To use a deliberately started production server (also useful where Windows process-tree cleanup is restricted):

```powershell
node node_modules/next/dist/bin/next start --port 3103
# In another terminal:
$env:PLAYWRIGHT_BASE_URL='http://localhost:3103'
npm.cmd run test:e2e
node scripts/capture-awakening.mjs http://localhost:3103
```

The capture script advances the real GSAP ticker with Playwright's browser clock. It produces nine checkpoint PNGs at 1440px and 375px, contact sheets, navbar captures, a 20fps GIF preview and runtime-error logs in `artifacts/mario-awakening/` (local review artifacts, ignored by Git). These artifacts are for review, not runtime assets.

The browser suite covers checkpoint progression, full asset loading, natural completion, Skip/Escape, session replay prevention, reverse scrolling, header geometry, reduced motion (initial and changed mid-playback), missing assets, denied storage, project navigation, mobile menus, portfolio content, and accessibility. The original portfolio suite remains in place.

Verified on November 17, 2026: all 18 Playwright tests passed against the local production build. Nine rendered checkpoints at both 1440px and 375px were inspected against the supplied storyboard and artwork, including an additional capture during the diagonal split. Both capture runs recorded zero runtime errors. The GIF is a 4.45-second review preview including the hero entrance, with 50ms source frames. The implementation intentionally starts on the requested dark screen and reveals the existing hero; it does not reproduce the storyboard's painted background as a separate loading image.
