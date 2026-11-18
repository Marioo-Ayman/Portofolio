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
        for(const letter of ["M","A","R"])await expect(page.locator(`.awakening [data-letter="${letter}"]`)).toHaveCSS("opacity","0");
        await expect(page.locator('.awakening [data-circle]')).toHaveCSS("opacity","1");
        await expect(page.locator('.awakening [data-power]')).toHaveCSS("opacity","1");
      }
      const path=testInfo.outputPath(`frame-${i+1}-${width}.png`);
      await page.screenshot({path});
      await testInfo.attach(`frame-${i+1}`,{path,contentType:"image/png"});
    }
    await expect(page.locator("main")).not.toHaveAttribute("inert","");
    await expect(page.locator('.navbar-logo [data-letter="M"]')).toBeVisible();
    expect(await page.evaluate(()=>({x:scrollX,y:scrollY,overflow:document.documentElement.scrollWidth>innerWidth}))).toEqual({x:0,y:0,overflow:false});
    await expect(page.locator("[data-hero-line]").first()).toHaveCSS("opacity","1");
    expect(errors).toEqual([]);
  });
}

test("navbar honors reduced motion and keeps the original I/O destination",async({page})=>{
  await page.setViewportSize({width:375,height:900});
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/#home");
  const logo=page.locator(".navbar-logo");
  await expect(logo.locator('[data-letter="M"]')).toHaveCSS("opacity","1");
  await page.evaluate(()=>scrollTo({top:200,behavior:"instant"}));
  await expect(logo.locator('[data-letter="M"]')).toHaveCSS("opacity","0");
  await expect(logo.locator('[data-circle]')).toHaveCSS("opacity","1");
  await page.evaluate(()=>scrollTo({top:0,behavior:"instant"}));
  await expect(logo.locator('[data-letter="M"]')).toHaveCSS("opacity","1");
});

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

for (const width of [1440,375]) {
  test(`navbar shares the storyboard collapse and scrubs reversibly at ${width}px`,async({page},testInfo)=>{
    await page.setViewportSize({width,height:900});
    await page.emulateMedia({reducedMotion:"no-preference"});
    await page.goto("/#home");
    const logo=page.locator(".navbar-logo");
    await expect(logo.locator("image")).toHaveCount(7);
    await expect(page.getByRole("link",{name:"MARIO — Return to home"})).toHaveAttribute("href","/#home");
    const before=await logo.boundingBox();
    const sample=async(top:number)=>{
      await page.evaluate(async y=>{
        scrollTo({top:y,behavior:"instant"});
        await new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve())));
      },top);
      return logo.evaluate(el=>{
        const letter=el.querySelector('[data-letter="M"]')!;
        const seal=el.querySelector('[data-seal]')!;
        const circle=el.querySelector('[data-circle]')!;
        const camera=el.querySelector('[data-camera]')!;
        return {
          m:getComputedStyle(letter).transform,
          mOpacity:Number(getComputedStyle(letter).opacity),
          sealOpacity:Number(getComputedStyle(seal).opacity),
          circleOpacity:Number(getComputedStyle(circle).opacity),
          camera:getComputedStyle(camera).transform,
        };
      });
    };
    const checkpoints=[];
    for(const [index,top] of [40,80,120,160,200].entries()){
      checkpoints.push(await sample(top));
      const path=`artifacts/mario-awakening/navbar-collapse-${width}-${index*25}.png`;
      await logo.screenshot({path});
      await testInfo.attach(`${index*25}%`,{path,contentType:"image/png"});
      const box=await logo.boundingBox();
      expect(box?.width).toBeCloseTo(before!.width,2);
      expect(box?.height).toBeCloseTo(before!.height,2);
    }
    expect(checkpoints[0].circleOpacity).toBe(0);
    expect(checkpoints[0].mOpacity).toBe(1);
    expect(checkpoints[1].m).not.toBe(checkpoints[0].m);
    expect(checkpoints[2].circleOpacity).toBeGreaterThan(0);
    expect(checkpoints[3].mOpacity).toBeLessThan(1);
    expect(checkpoints[4].mOpacity).toBe(0);
    expect(checkpoints[4].sealOpacity).toBe(0);
    expect(checkpoints[4].circleOpacity).toBe(1);
    expect(checkpoints[4].camera).not.toBe(checkpoints[0].camera);
    const halfway=await sample(120);
    expect(halfway.mOpacity).toBeCloseTo(checkpoints[2].mOpacity,1);
    await sample(200);
    const reverse=await sample(120);
    expect(reverse.mOpacity).toBeCloseTo(halfway.mOpacity,1);
    const restored=await sample(0);
    expect(restored.mOpacity).toBe(1);
    expect(restored.circleOpacity).toBe(0);
    await sample(500);
    expect((await sample(0)).mOpacity).toBe(1);
    await page.locator(".project-art-link").first().click();
    await expect(page).toHaveURL(/projects\/live-support-system$/);
    await expect(logo.locator('[data-letter="M"]')).toHaveCSS("opacity","0");
    await page.getByRole("link",{name:"MARIO — Return to home"}).click();
    await expect(logo.locator('[data-letter="M"]')).toHaveCSS("opacity","1");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
}

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
