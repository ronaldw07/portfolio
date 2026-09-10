import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start px-6 pt-40 pb-28 sm:px-0 sm:pt-52">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-faint">404</p>
      <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
        Nothing shipped at this address.
      </h1>
      <p className="mt-4 max-w-md text-[16px] leading-relaxed text-muted">
        The page you're looking for doesn't exist, or moved. Here's the
        rest of the work.
      </p>
      <Link
        href="/"
        className="pressable mt-8 inline-block rounded-full bg-foreground px-6 py-3 text-[14px] text-background"
      >
        Back home
      </Link>
    </section>
  );
}
