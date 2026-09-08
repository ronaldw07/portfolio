"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";

export function Nav() {
  const pathname = usePathname();
  const isCaseStudy = pathname.startsWith("/work/");
  const [lifted, setLifted] = useState(false);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300"
      style={{
        backgroundColor: lifted ? "color-mix(in srgb, var(--background) 82%, transparent)" : "transparent",
        borderColor: lifted ? "var(--line)" : "transparent",
        backdropFilter: lifted ? "saturate(140%) blur(12px)" : "none",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link
          href="/"
          className="pressable font-serif text-[17px] tracking-tight"
          aria-label="Home"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-6 text-[13px] text-muted sm:gap-8">
          {isCaseStudy ? (
            <Link href="/#work" className="pressable link-underline">
              All work
            </Link>
          ) : (
            navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="pressable link-underline hidden sm:inline">
                {link.label}
              </Link>
            ))
          )}
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="pressable link-underline text-foreground"
          >
            LinkedIn
          </a>
        </div>
      </nav>
    </header>
  );
}
