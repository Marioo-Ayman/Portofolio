import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("project artwork stays in its column across scroll pin boundaries", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/#projects");
  for (const row of await page.locator(".project-row").all()) {
    await row.scrollIntoViewIfNeeded();
    await expect(row).toHaveCSS("opacity", "1");
    const start = await row.evaluate(el => el.getBoundingClientRect().top + scrollY - 115);
    const art = row.locator(".project-art-link");
    const sample = async (y: number) => {
      await page.evaluate(async top => {
        window.scrollTo({ top, behavior: "instant" });
        await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
      }, y);
      return (await art.boundingBox())!;
    };
    const before = await sample(start - 5);
    // Enter, leave, and re-enter each pin, including the reversed middle card.
    for (const offset of [5, 55, 115, 55, -5]) {
      const current = await sample(start + offset);
      expect(Math.abs(current.x - before.x)).toBeLessThan(1);
      expect(Math.abs(current.width - before.width)).toBeLessThan(1);
    }
  }
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
  expect((await page.request.get("/opengraph-image")).status()).toBe(200);
  expect(await (await page.request.get("/robots.txt")).text()).toContain("Disallow: /");
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
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
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
