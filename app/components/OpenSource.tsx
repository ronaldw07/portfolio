import { openSourceEntries } from "@/lib/opensource";
import { Reveal } from "./Reveal";

const STAGGER_MS = 60;

export function OpenSource() {
  return (
    <section id="open-source" className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <Reveal>
        <h2 className="font-serif text-2xl sm:text-3xl">Open source</h2>
        <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted">
          Shipping into code I don&apos;t own: someone else&apos;s review bar,
          someone else&apos;s users already depending on it.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {openSourceEntries.map((entry, index) => (
          <Reveal key={entry.prUrl} delay={index * STAGGER_MS}>
            <a
              href={entry.prUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col bg-paper p-7 transition-colors duration-300 hover:bg-background"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                  {entry.repo}
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.1em]"
                  style={{ color: entry.merged ? "var(--accent)" : "var(--faint)" }}
                >
                  {entry.merged ? "Merged" : "Open"}
                </span>
              </div>

              <h3 className="mt-3 font-serif text-lg leading-snug transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1">
                {entry.title}
              </h3>

              <p className="mt-2 text-[14px] leading-relaxed text-muted">
                {entry.description}
              </p>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
