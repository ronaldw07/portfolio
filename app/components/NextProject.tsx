import Link from "next/link";
import type { Project } from "@/lib/projects";

export function NextProject({ project }: { project: Project }) {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-28 sm:px-0">
      <Link
        href={`/work/${project.slug}`}
        className="group flex items-center justify-between border-t border-line pt-10"
      >
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
            Next
          </p>
          <p className="mt-2 font-serif text-2xl transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1">
            {project.title}
          </p>
        </div>
        <span className="font-mono text-sm text-faint transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  );
}
