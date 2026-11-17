import { test, expect, type Page } from "@playwright/test";

async function freezeIntro(page: Page) {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const time = new Date("2026-11-17T08:00:00Z");
  await page.clock.install({ time });
  await page.clock.pauseAt(time);
  await page.goto("/", { waitUntil:"load" });
  // Let Next's hydration timers run, then keep GSAP on the controlled clock.
  for(let i=0;i<100;i++) {
    if(await page.locator("html").getAttribute("data-intro")==="playing") break;
    await page.clock.runFor(10);
  }
  await expect(page.locator("html")).toHaveAttribute("data-intro","playing");
}

for (const width of [1440,375]) {
  test(`nine cinematic checkpoints and natural completion at ${width}px`, async ({page},testInfo) => {
    await page.setViewportSize({width,height:900});
    const errors:string[]=[];
    page.on("pageerror",error=>errors.push(error.message));
    await freezeIntro(page);
    const stages = ["ink","ink","ink","ink","seal","collapse","power","katana","done"];
    const points = [180,460,780,1220,1600,2160,2880,3180,4400];
    let elapsed=0;
    for (let i=0;i<points.length;i++) {
      await page.clock.runFor(points[i]-elapsed); elapsed=points[i];
      const dialog=page.getByRole("dialog");
      if(i<8)await expect(dialog).toHaveAttribute("data-stage",stages[i]);
      else await expect(dialog).toHaveCount(0);
      if(i===0) {
        expect(parseFloat(await page.locator('[data-brush="M"]').first().evaluate(el=>getComputedStyle(el).strokeDashoffset))).toBeLessThan(1);
        for(const path of await page.locator('[data-brush="A"]').all())await expect(path).toHaveCSS("stroke-dashoffset","1px");
        await expect(page.locator('[data-wave]')).toHaveCSS("opacity","0");
      }
      if(i===3)for(const path of await page.locator('[data-brush]').all())await expect(path).toHaveCSS("stroke-dashoffset","0px");
      if(i===6) {
        for(const letter of ["M","A","R"])await expect(page.locator(`[data-letter="${letter}"]`)).toHaveCSS("opacity","0");
        await expect(page.locator('[data-circle]')).toHaveCSS("opacity","1");
        await expect(page.locator('[data-power]')).toHaveCSS("opacity","1");
      }
      const path=testInfo.outputPath(`frame-${i+1}-${width}.png`);
      await page.screenshot({path});
      await testInfo.attach(`frame-${i+1}`,{path,contentType:"image/png"});
    }
    await expect(page.locator("main")).not.toHaveAttribute("inert","");
    await expect(page.locator(".navbar-logo")).toHaveAttribute("data-variant","vertical");
    expect(await page.evaluate(()=>({x:scrollX,y:scrollY,overflow:document.documentElement.scrollWidth>innerWidth}))).toEqual({x:0,y:0,overflow:false});
    await expect(page.locator("[data-hero-line]").first()).toHaveCSS("opacity","1");
    expect(errors).toEqual([]);
  });
}

test("skip works immediately, restores input and prevents replay", async ({page})=>{
  await freezeIntro(page);
  await page.getByRole("button",{name:/Skip intro/}).click({force:true});
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("html")).not.toHaveAttribute("data-intro",/pending|playing/);
  await page.clock.resume();
  await page.mouse.wheel(0,450);
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(100);
  await page.reload();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("both source logos load and scroll reverses without shifting the header",async({page})=>{
  await page.goto("/#home");
  const logo=page.locator(".navbar-logo");
  await expect(logo).toHaveAttribute("data-variant","vertical");
  await expect.poll(()=>logo.locator("img").evaluateAll(imgs=>imgs.every(img=>(img as HTMLImageElement).complete&&(img as HTMLImageElement).naturalWidth>0))).toBe(true);
  await expect(logo.locator("img")).toHaveCount(2);
  await expect(page.getByRole("link",{name:"MARIO — Return to home"})).toHaveAttribute("href","/#home");
  await expect(page.locator(".site-header")).toHaveCSS("opacity","1");
  const before=await page.locator(".brand").boundingBox();
  await page.evaluate(()=>scrollTo({top:200,behavior:"instant"}));
  await expect(logo).toHaveAttribute("data-variant","compact");
  await expect(page.locator(".navbar-logo-compact")).toHaveCSS("opacity","1");
  expect(await page.locator(".brand").boundingBox()).toEqual(before);
  await page.evaluate(()=>scrollTo({top:0,behavior:"instant"}));
  await expect(logo).toHaveAttribute("data-variant","vertical");
  await expect(page.locator(".navbar-logo-vertical")).toHaveCSS("opacity","1");
  expect(await page.locator(".brand").boundingBox()).toEqual(before);
  await page.locator(".project-art-link").first().click();
  await expect(page).toHaveURL(/projects\/live-support-system$/);
  await expect(logo).toHaveAttribute("data-variant","compact");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.getByRole("link",{name:"MARIO — Return to home"}).click();
  await expect(logo).toHaveAttribute("data-variant","vertical");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("changing reduced motion during playback releases the page",async({page})=>{
  await freezeIntro(page);
  await page.clock.runFor(800);
  await page.emulateMedia({reducedMotion:"reduce"});
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("main")).not.toHaveAttribute("inert","");
  await expect(page.locator("[data-hero-line]").first()).toHaveCSS("opacity","1");
});

test("missing artwork fails open and storage denial still permits dismissal",async({page})=>{
  await page.addInitScript(()=>{Object.defineProperty(window,"sessionStorage",{get(){throw new Error("Storage disabled");}});});
  await page.route("**/images/brand/m.png",route=>route.abort());
  await page.goto("/");
  await expect(page.locator(".route-loading")).toHaveCount(0);
  await expect(page.locator(".awakening")).toHaveCount(0);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("main")).not.toHaveAttribute("inert","");
  await expect(page.locator("#hero-title")).toBeVisible();
});
