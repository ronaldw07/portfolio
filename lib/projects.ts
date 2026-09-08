import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content", "projects");

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectMeta = {
  slug: string;
  title: string;
  tagline: string;
  /** One-sentence positioning shown on the work index. */
  blurb: string;
  role: string;
  context: string;
  timeline: string;
  status: string;
  stack: string[];
  links: ProjectLink[];
  metrics: ProjectMetric[];
  /** Sort key on the home page; lower comes first. */
  order: number;
  cover?: string;
  coverAlt?: string;
};

export type Project = ProjectMeta & {
  body: string;
  headings: Heading[];
};

export type Heading = {
  id: string;
  title: string;
};

export function slugifyHeading(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Section rail entries come from the `##` headings in the MDX itself, so adding
 * or reordering a section in a write-up needs no code change.
 */
function extractHeadings(body: string): Heading[] {
  const headings: Heading[] = [];
  let inFence = false;

  for (const line of body.split("\n")) {
    if (line.trimStart().startsWith("```")) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^##\s+(.+?)\s*$/.exec(line);
    if (match) {
      const title = match[1];
      headings.push({ id: slugifyHeading(title), title });
    }
  }

  return headings;
}

function toMeta(slug: string, data: Record<string, unknown>): ProjectMeta {
  const asString = (key: string, fallback = "") =>
    typeof data[key] === "string" ? (data[key] as string) : fallback;
  const asArray = <T,>(key: string): T[] =>
    Array.isArray(data[key]) ? (data[key] as T[]) : [];

  return {
    slug,
    title: asString("title", slug),
    tagline: asString("tagline"),
    blurb: asString("blurb"),
    role: asString("role"),
    context: asString("context"),
    timeline: asString("timeline"),
    status: asString("status"),
    stack: asArray<string>("stack"),
    links: asArray<ProjectLink>("links"),
    metrics: asArray<ProjectMetric>("metrics"),
    order: typeof data.order === "number" ? data.order : 99,
    cover: asString("cover") || undefined,
    coverAlt: asString("coverAlt") || undefined,
  };
}

function readProject(fileName: string): Project {
  const slug = fileName.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(CONTENT_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    ...toMeta(slug, data as Record<string, unknown>),
    body: content,
    headings: extractHeadings(content),
  };
}

export function getAllProjects(): Project[] {
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readProject)
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug);
}

export function getAdjacentProject(slug: string): Project | undefined {
  const projects = getAllProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
