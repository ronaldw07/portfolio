import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAdjacentProject, getAllProjects, getProject } from "@/lib/projects";
import { CaseStudyHeader } from "@/app/components/CaseStudyHeader";
import { SectionRail } from "@/app/components/SectionRail";
import { NextProject } from "@/app/components/NextProject";
import { mdxComponents } from "@/app/components/mdx";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);

  return (
    <article>
      <CaseStudyHeader project={project} />

      <div className="mx-auto flex max-w-5xl gap-16 px-6 sm:px-10">
        <div className="min-w-0 max-w-3xl flex-1 pb-20">
          <MDXRemote source={project.body} components={mdxComponents} />
        </div>
        <SectionRail headings={project.headings} />
      </div>

      {next && <NextProject project={next} />}
    </article>
  );
}
