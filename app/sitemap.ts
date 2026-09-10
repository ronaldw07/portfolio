import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = getAllProjects().map((project) => ({
    url: `${site.url}/work/${project.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: site.url, lastModified: new Date() },
    { url: `${site.url}/privacy`, lastModified: new Date() },
    { url: `${site.url}/terms`, lastModified: new Date() },
    ...projectRoutes,
  ];
}
