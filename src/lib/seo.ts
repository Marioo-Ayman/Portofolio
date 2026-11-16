import { site } from "@/content/site";

function getOrigin() {
  try { const url = new URL(site.url); return url.protocol === "https:" ? url.origin : undefined; }
  catch { return undefined; }
}
export const siteOrigin = getOrigin();
export const canIndex = Boolean(site.readyToIndex && siteOrigin);
