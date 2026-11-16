import { existsSync } from "node:fs";
import path from "node:path";
import { site } from "@/content/site";
export function ResumeLink() {
  const publicRoot = path.resolve(process.cwd(), "public");
  const file = path.resolve(publicRoot, `.${site.resumePath}`);
  if (!site.resumePath.startsWith("/") || !site.resumePath.endsWith(".pdf") || !file.startsWith(publicRoot + path.sep) || !existsSync(file)) return null;
  return <a className="text-link resume-link" href={site.resumePath} download>Download resume ↓</a>;
}
