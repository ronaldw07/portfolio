import Image from "next/image";
import type { Project } from "@/lib/projects";
import { Reveal } from "./Reveal";

export function CaseStudyHeader({ project }: { project: Project }) {
  const facts: Array<{ label: string; value: string }> = [
    project.role && { label: "Role", value: project.role },
    project.context && { label: "Context", value: project.context },
    project.timeline && { label: "Timeline", value: project.timeline },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <header className="mx-auto max-w-3xl px-6 pt-36 pb-14 sm:px-0 sm:pt-44">
      <Reveal>
        {project.status && (
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
            {project.status}
          </p>
        )}
        <h1 className="mt-4 font-serif text-4xl leading-[1.1] sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">
          {project.tagline}
        </p>
      </Reveal>

      {project.cover && (
        <Reveal delay={40}>
          <div className="relative mt-10 aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-paper">
            <Image
              src={project.cover}
              alt={project.coverAlt ?? project.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        </Reveal>
      )}

      {facts.length > 0 && (
        <Reveal delay={60}>
          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-8 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-[14px] text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      )}

      {project.metrics.length > 0 && (
        <Reveal delay={100}>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <p className="font-serif text-2xl text-accent">{metric.value}</p>
                <p className="mt-1 text-[13px] text-faint">{metric.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {(project.stack.length > 0 || project.links.length > 0) && (
        <Reveal delay={140}>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            {project.stack.length > 0 && (
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}
            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="pressable link-underline text-accent"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      )}
    </header>
  );
}
