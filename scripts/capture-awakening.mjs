// Run against a local production server: node scripts/capture-awakening.mjs http://localhost:3103
// Uses the real GSAP ticker, advanced through Playwright's deterministic browser clock.
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.argv[2] || 'http://localhost:3103';
const output = 'artifacts/mario-awakening';
await mkdir(output,{recursive:true});
const browser = await chromium.launch({channel:'chrome',headless:true});
const checkpoints=[180,460,780,1220,1600,2160,2880,3180,4400];
try {
  for(const width of [1440,375]) {
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'no-preference'});
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    const time=new Date('2026-11-17T08:00:00Z');
    await page.clock.install({time});
    await page.clock.pauseAt(time);
    await page.goto(base,{waitUntil:'load'});
    for(let i=0;i<200;i++) {
      if(await page.locator('html').getAttribute('data-intro')==='playing')break;
      await page.clock.runFor(10);
    }
    if(await page.locator('html').getAttribute('data-intro')!=='playing')throw new Error('Intro did not start');
    const frames=[],rawFrames=[],log=[];
    const times=[...new Set([...checkpoints,...Array.from({length:89},(_,i)=>i*50)])].sort((a,b)=>a-b);
    let elapsed=0;
    for(const t of times) {
      await page.clock.runFor(t-elapsed);elapsed=t;
      const capture=await page.screenshot();
      if(checkpoints.includes(t)) {
        const index=checkpoints.indexOf(t);
        await writeFile(`${output}/frame-${index+1}-${width}.png`,capture);
        frames.push({input:await sharp(capture).resize(width===1440?480:188,width===1440?300:450).png().toBuffer(),left:(index%3)*(width===1440?480:188),top:Math.floor(index/3)*(width===1440?300:450)});
        log.push({frame:index+1,time:t,stage:await page.evaluate(()=>document.querySelector('.awakening')?.getAttribute('data-stage') || 'complete')});
      }
      if(width===1440&&t%50===0)rawFrames.push(await sharp(capture).resize(800,500).removeAlpha().raw().toBuffer());
    }
    await sharp({create:{width:width===1440?1440:564,height:width===1440?900:1350,channels:3,background:'#06060b'}}).composite(frames).png().toFile(`${output}/checkpoints-${width}.png`);
    if(rawFrames.length)await sharp(Buffer.concat(rawFrames),{raw:{width:800,height:500*rawFrames.length,channels:3,pageHeight:500}}).gif({delay:rawFrames.map(()=>50),loop:0,effort:7}).toFile(`${output}/mario-awakening-preview.gif`);
    await writeFile(`${output}/capture-${width}.json`,JSON.stringify({width,errors,checkpoints:log},null,2));
    await page.clock.resume();
    await page.evaluate(()=>scrollTo({top:220,behavior:'instant'}));
    await page.waitForTimeout(650);
    await page.screenshot({path:`${output}/navbar-compact-${width}.png`});
    await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
    await page.waitForTimeout(650);
    await page.screenshot({path:`${output}/navbar-vertical-${width}.png`});
    await page.close();
    console.log(`Captured ${width}px, runtime errors: ${errors.length}`);
  }
} finally { await browser.close(); }
