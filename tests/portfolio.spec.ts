import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("brand favicon, metadata, and footer credit", async ({ page }) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/#contact");
    await expect(page).toHaveTitle("Mario Ayman | Full-Stack Developer");
    await expect(page.locator('link[rel="icon"][href="/favicon-32.png"]')).toHaveAttribute("sizes", "32x32");
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute("href", "/apple-touch-icon.png");
    await expect(page.locator(".logo-designer-credit")).toHaveText("· Logo designed by Designer Name");
    await expect(page.locator(".logo-designer-credit a")).toHaveCount(0);
    await expect(page.locator('.contact-footer a[href="#home"]')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  for (const path of ["/favicon-32.png", "/icon-192.png", "/apple-touch-icon.png", "/favicon.ico"]) {
    expect((await page.request.get(path)).status()).toBe(200);
  }
});

test("project artwork remains naturally positioned across the former pin boundaries", async ({ page }) => {
  for (const width of [1100, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/#projects", { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    });
    await expect.poll(async () => (await page.locator(".project-art-link").first().boundingBox())?.x ?? 0).toBeGreaterThan(0);

    for (const row of await page.locator(".project-row").all()) {
      const art = row.locator(".project-art-link");
      const rowTop = await row.evaluate(el => el.getBoundingClientRect().top + scrollY);
      const formerPinStart = rowTop - 115;
      const sample = async (top: number) => {
        await page.evaluate(async scrollTop => {
          window.scrollTo({ top: scrollTop, behavior: "instant" });
          await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
        }, top);
        return art.evaluate(el => {
          const rect = el.getBoundingClientRect();
          return {
            documentX: rect.x + scrollX,
            documentY: rect.y + scrollY,
            width: rect.width,
            height: rect.height,
            transform: getComputedStyle(el).transform,
          };
        });
      };

      const baseline = await sample(formerPinStart - 5);
      // Cross both old pin edges in both directions to catch movement and snapping.
      for (const offset of [0, 5, 55, 109, 115, 55, 5, -5]) {
        const current = await sample(formerPinStart + offset);
        expect(current.documentX).toBeCloseTo(baseline.documentX, 0);
        expect(current.documentY).toBeCloseTo(baseline.documentY, 0);
        expect(current.width).toBeCloseTo(baseline.width, 0);
        expect(current.height).toBeCloseTo(baseline.height, 0);
        expect(current.transform).toBe("none");
      }
    }
  }
});

test("project artwork stays fixed in reduced-motion mode", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#projects");
  const art = page.locator(".project-art-link").first();
  const before = await art.evaluate(el => {
    const rect = el.getBoundingClientRect();
    return { x: rect.x + scrollX, y: rect.y + scrollY, width: rect.width };
  });
  await page.evaluate(() => window.scrollBy({ top: 250, behavior: "instant" }));
  const after = await art.evaluate(el => {
    const rect = el.getBoundingClientRect();
    return { x: rect.x + scrollX, y: rect.y + scrollY, width: rect.width, transform: getComputedStyle(el).transform };
  });
  expect(after).toEqual({ ...before, transform: "none" });
});

test("intro is dismissible and does not replay", async ({ page }) => {
  await page.goto("/");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await page.reload();
  await expect(page.locator("#hero-title")).toBeVisible();
  await expect(dialog).toHaveCount(0);
});

for (const width of [320, 375, 768, 1024, 1440, 1920]) {
  test(`layout and navigation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.getByRole("tab", { name: /Databases/ }).click();
    await expect(page.getByRole("tabpanel")).toContainText("SQL Server");
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("tab", { name: /Development Tools/ })).toBeFocused();
    if (width <= 1024) {
      await page.getByRole("button", { name: "Open menu" }).click();
      await expect(page.locator("main")).toHaveAttribute("inert", "");
      await page.keyboard.press("Escape");
      await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
      await page.getByRole("button", { name: "Open menu" }).click();
      await page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", { name: /Work/ }).click();
    } else {
      await page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: /Work/ }).click();
    }
    await expect(page).toHaveURL(/#projects$/);
    await expect(page.locator("main")).not.toHaveAttribute("inert", "");
    await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true });
    expect(errors).toEqual([]);
  });
}

test("case studies, missing route, metadata and accessibility", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const slug of ["live-support-system", "investment-experience", "ai-task-management", "safarni", "cure-app", "online-quiz-platform"]) {
    await page.setViewportSize({ width: 375, height: 900 });
    const response = await page.goto(`/projects/${slug}`);
    await page.evaluate(() => document.fonts.ready);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".content-note")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "My contribution" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    const caseStudyAudit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(caseStudyAudit.violations).toEqual([]);
  }
  await page.goto("/projects/stock-market-simulator");
  await expect(page.locator(".content-note")).toContainText("Unverified portfolio draft");
  expect((await page.goto("/projects/does-not-exist"))?.status()).toBe(404);
  await page.goto("/");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
  const socialPreview = await page.request.get("/og-preview.png");
  expect(socialPreview.status()).toBe(200);
  expect(socialPreview.headers()["content-type"]).toContain("image/png");
  expect(await (await page.request.get("/robots.txt")).text()).toContain("Allow: /");
});

test("CV-backed contact actions and public resume", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#contact");
  await expect(page.locator('a[href="mailto:mario.ayman098@gmail.com"]')).toBeVisible();
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("status")).toHaveText("Email copied.");
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("mario.ayman098@gmail.com");
  await expect(page.locator('.social-links a[href="https://github.com/Marioo-Ayman"]')).toBeVisible();
  await expect(page.locator('.social-links a[href="https://www.linkedin.com/in/mario-ayman-4822522a3"]')).toBeVisible();
  const download = page.waitForEvent("download");
  await page.locator("#contact").getByRole("link", { name: "Download CV" }).click();
  expect((await download).suggestedFilename()).toBe("Mario-Ayman-CV.pdf");
  const pdf = await page.request.get("/Mario-Ayman-CV.pdf");
  expect(pdf.status()).toBe(200);
  expect((await pdf.body()).subarray(0, 5).toString()).toBe("%PDF-");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://portofolio-gamma-gilt.vercel.app");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", "https://portofolio-gamma-gilt.vercel.app/og-preview.png");
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
});

test("animated chapters remain usable and respond to reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/#home");
  await page.getByRole("navigation", { name: "Chapters", exact: true }).getByRole("link", { name: /WORK/ }).click();
  await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: /Work/ })).toHaveAttribute("aria-current", "location");
  await page.locator(".project-art-link").first().click();
  await expect(page).toHaveURL(/projects\/live-support-system$/);
  await page.getByRole("link", { name: "BACK TO SELECTED WORK" }).click();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".project-row").first()).toHaveCSS("opacity", "1");
  expect(errors).toEqual([]);
});
