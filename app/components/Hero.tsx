import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-40 pb-24 sm:px-10 sm:pt-52 sm:pb-32">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
        {site.role} · {site.location}
      </p>

      <h1 className="mt-6 max-w-4xl font-serif text-4xl leading-[1.1] sm:text-6xl sm:leading-[1.06]">
        {site.positioning}
      </h1>

      <div className="mt-10 max-w-xl space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
        {site.intro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
