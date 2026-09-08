import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <p className="font-serif text-3xl leading-[1.15] sm:text-5xl sm:leading-[1.1]">
          Working on something where
          <br className="hidden sm:block" /> the product question is the hard part?
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]">
          <a
            href={`mailto:${site.links.email}`}
            className="pressable link-underline text-accent"
          >
            {site.links.email}
          </a>
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="pressable link-underline text-muted"
          >
            LinkedIn
          </a>
          <a
            href={site.links.github}
            target="_blank"
            rel="noreferrer"
            className="pressable link-underline text-muted"
          >
            GitHub
          </a>
        </div>

        <p className="mt-16 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
      </div>
    </footer>
  );
}
