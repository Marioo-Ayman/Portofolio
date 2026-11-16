import { readFile, mkdir } from "node:fs/promises";
import { chromium } from "@playwright/test";
import ts from "typescript";
import { fileURLToPath } from "node:url";

// Generate only from the curated public content, never from the private DOCX.
const source = await readFile(new URL("../src/content/site.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { site, journey, projects, education, training, techGroups, about } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`);
const escape = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const link = (url, label) => `<a href="${escape(url)}">${escape(label)}</a>`;
const header = `<header><h1>${escape(site.name)}</h1><p class="role">${escape(site.role)}</p><p>${escape(site.location)} · ${link(`mailto:${site.email}`, site.email)}</p><p>${link(site.github, "GitHub: Marioo-Ayman")} · ${link(site.linkedin, "LinkedIn: Mario Ayman")} · ${link(site.url, "Portfolio")}</p></header>`;
const html = `<!doctype html><html lang="en"><head><meta charset="UTF-8"><title>${escape(site.displayName)} — Public CV</title><style>
@page { size:A4; margin:14mm 18mm; }
* { box-sizing:border-box; } body { font:9.5pt/1.35 Arial,sans-serif; color:#20202b; margin:0; }
h1 { font-size:25pt; margin:0; letter-spacing:-.8pt; } h2 { font-size:12pt; text-transform:uppercase; letter-spacing:1.2pt; border-bottom:1px solid #c82245; padding-bottom:5pt; margin:15pt 0 8pt; } h3 { font-size:11pt; margin:0 0 4pt; } p { margin:4pt 0; } a { color:#6e2338; text-decoration:none; }
header { border-bottom:2px solid #c82245; padding-bottom:12pt; } .role { font-size:13pt; color:#6e2338; } .meta { color:#5d5b67; font-size:9pt; } article { break-inside:avoid; margin-bottom:15pt; } ul { padding-left:15pt; margin:6pt 0; } li { margin:3pt 0; }
.page { break-before:page; } .project { margin-bottom:10pt; } .project p { font-size:9pt; margin:3pt 0; } .training { display:grid; grid-template-columns:1fr auto; gap:5pt 15pt; margin-bottom:10pt; } footer { margin-top:20pt; color:#666; font-size:8pt; }
</style></head><body><section>${header}<h2>Professional summary</h2><p>${escape(site.description)}</p>
<h2>Experience</h2>${journey.map(item => `<article><h3>${escape(item.title)}${item.organization ? ` | ${escape(item.organization)}` : ""}</h3><p class="meta">${escape(item.dates)} · ${escape(item.location)}</p><p>${escape(item.description)}</p>${item.responsibilities.length ? `<ul>${item.responsibilities.map(text => `<li>${escape(text)}</li>`).join("")}</ul>` : ""}<p class="meta">${escape(item.stack)}</p></article>`).join("")}
<h2>Education</h2><article><h3>${escape(education.degree)}</h3><p>${escape(education.organization)} · ${escape(education.dates)}</p><p class="meta">${escape(education.department)}</p></article></section>
<section class="page"><h2>Selected projects</h2>${projects.filter(project => project.verified).map(project => `<article class="project"><h3>${escape(project.name)}</h3><p class="meta">${escape(project.year)} · ${escape(project.category)}</p><p>${escape(project.description)}</p><p><strong>Contribution:</strong> ${escape(project.role)}</p><p class="meta">${escape([...new Set([...(project.frontend || []), ...(project.backend || []), ...project.stack])].join(" · "))}</p>${project.repoUrl ? `<p>${link(project.repoUrl, project.repoUrl)}</p>` : ""}</article>`).join("")}</section>
<section class="page"><h2>Technical skills</h2>${techGroups.map(group => `<article><h3>${escape(group.label)}</h3><p>${escape(group.technologies.join(" · "))}</p></article>`).join("")}
<h2>Training &amp; certifications</h2>${training.map(item => `<article class="training"><div><h3>${escape(item.title)}</h3>${item.provider ? `<p>${escape(item.provider)}</p>` : ""}</div><p class="meta">${escape(item.date)}<br>${escape(item.format)}</p></article>`).join("")}
<h2>Languages</h2><p>${escape(about.languages.join(" · "))}</p><footer>Public CV · ${escape(site.displayName)} · ${escape(site.url)}</footer></section></body></html>`;
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await mkdir(new URL("../public", import.meta.url), { recursive: true });
  await page.pdf({ path: fileURLToPath(new URL("../public/Mario-Ayman-CV.pdf", import.meta.url)), printBackground: true, preferCSSPageSize: true });
  if (process.argv.includes("--preview")) {
    await mkdir(new URL("../test-results", import.meta.url), { recursive: true });
    await page.setViewportSize({ width: 658, height: 1016 });
    await page.emulateMedia({ media: "print" });
    const sections = await page.locator("body > section").all();
    for (const [index, section] of sections.entries()) {
      console.log(`CV section ${index + 1}: ${Math.ceil((await section.boundingBox()).height)}px / 1016px printable height`);
      await section.screenshot({ path: fileURLToPath(new URL(`../test-results/cv-page-${index + 1}.png`, import.meta.url)) });
    }
  }
  console.log("Generated public/Mario-Ayman-CV.pdf from public portfolio content.");
} finally { await browser.close(); }
