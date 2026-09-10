import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <article className="mx-auto max-w-2xl px-6 pt-36 pb-28 sm:px-0 sm:pt-44">
      <h1 className="font-serif text-4xl leading-tight">{title}</h1>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
        Last updated {updated}
      </p>
      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-xl [&_h2]:text-foreground [&_h2]:first:mt-0 [&_a]:link-underline [&_a]:text-accent">
        {children}
      </div>
    </article>
  );
}
