import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectLogo } from "./ProjectLogo";
import { Reveal } from "./Reveal";

const STAGGER_MS = 60;

export function WorkIndex({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <Reveal>
        <h2 className="font-serif text-2xl sm:text-3xl">Selected work</h2>
      </Reveal>

      <div className="mt-12 border-t border-line">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * STAGGER_MS}>
            <Link
              href={`/work/${project.slug}`}
              className="group flex flex-col gap-3 border-b border-line py-9 transition-colors duration-300 hover:bg-paper sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-2 sm:-mx-2"
            >
              <div className="flex items-start gap-4 sm:w-[42%]">
                {project.logo && (
                  <ProjectLogo src={project.logo} alt={`${project.title} logo`} />
                )}
                <div>
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-serif text-2xl transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1 sm:text-[26px]">
                      {project.title}
                    </h3>
                    {project.status && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                        {project.status}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13px] text-faint">{project.role}</p>
                </div>
              </div>

              <p className="max-w-md text-[15px] leading-relaxed text-muted">
                {project.blurb}
              </p>

              <span className="hidden shrink-0 font-mono text-[13px] text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inline">
                View case study →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
