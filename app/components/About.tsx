import { Reveal } from "./Reveal";

const facts = [
  { label: "Based in", value: "Irvine, CA" },
  { label: "Studying", value: "Computer Science, UC Irvine" },
  { label: "Fellowship", value: "Break Through Tech AI Studio" },
];

const currentlyLearning = [
  "Product management",
  "Product design",
  "Product engineering",
  "AI",
  "Agents",
  "Infrastructure",
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
      <div className="grid gap-12 sm:grid-cols-[1fr_auto] sm:gap-20">
        <Reveal>
          <h2 className="font-serif text-2xl sm:text-3xl">About me</h2>
          <div className="mt-6 max-w-xl space-y-4 text-[15px] leading-relaxed text-muted">
            <p>
              I care about the whole lifecycle of a product: the problem worth
              solving, the person it&apos;s actually for, and whether the thing
              I shipped changed their behavior. The code is the part I enjoy
              most, but it&apos;s in service of that, not the point of it.
            </p>
            <p>
              I&apos;m part of Break Through Tech&apos;s AI Studio fellowship,
              on a small team building Chewy, a machine learning system for
              detecting AI-generated text. Outside of that, I&apos;m
              deliberately building range across the full product stack:
              management, design, and engineering, plus the AI, agent, and
              infrastructure layers most products now run on.
            </p>
            <p>
              Every case study on this site follows the same process: a real
              problem, a specific target user, a look at what already exists,
              the insight that made the solution different, how it got in
              front of people, and what changed after they used it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <dl className="flex flex-col gap-6 sm:min-w-[220px]">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                  {fact.label}
                </dt>
                <dd className="mt-1 text-[15px] text-foreground">{fact.value}</dd>
              </div>
            ))}

            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                Currently learning
              </dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {currentlyLearning.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-line px-3 py-1 text-[13px] text-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
