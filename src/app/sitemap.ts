import type { MetadataRoute } from "next";
import { projects } from "@/content/site";
import { canIndex, siteOrigin } from "@/lib/seo";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!canIndex) return [];
  return [{ url: `${siteOrigin}/`, priority: 1 }, ...projects.filter(p => p.verified).map(p => ({ url: `${siteOrigin}/projects/${p.slug}`, priority: .7 }))];
}
