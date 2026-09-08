import Image from "next/image";
import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";
import { slugifyHeading } from "@/lib/projects";

type HeadingProps = { children?: React.ReactNode };

function headingId(children: React.ReactNode): string {
  return slugifyHeading(String(children));
}

function H2({ children }: HeadingProps) {
  const id = headingId(children);
  return (
    <h2
      id={id}
      className="mt-16 scroll-mt-28 font-serif text-2xl leading-snug first:mt-0 sm:text-[28px]"
    >
      {children}
    </h2>
  );
}

function H3({ children }: HeadingProps) {
  return (
    <h3 className="mt-10 font-serif text-xl leading-snug">{children}</h3>
  );
}

function P({ children }: HeadingProps) {
  return (
    <p className="mt-5 text-[16px] leading-[1.75] text-muted first:mt-0">
      {children}
    </p>
  );
}

function Ul({ children }: HeadingProps) {
  return (
    <ul className="mt-5 list-disc space-y-2 pl-5 text-[16px] leading-[1.75] text-muted marker:text-faint">
      {children}
    </ul>
  );
}

function Ol({ children }: HeadingProps) {
  return (
    <ol className="mt-5 list-decimal space-y-2 pl-5 text-[16px] leading-[1.75] text-muted marker:text-faint">
      {children}
    </ol>
  );
}

function Blockquote({ children }: HeadingProps) {
  return (
    <blockquote className="mt-8 border-l-2 border-accent pl-5 font-serif text-xl italic leading-snug text-foreground">
      {children}
    </blockquote>
  );
}

function A(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = props.href?.startsWith("http");
  return (
    <a
      {...props}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className="link-underline text-foreground"
    />
  );
}

function Img({ src, alt }: ImgHTMLAttributes<HTMLImageElement>) {
  if (!src) return null;
  return (
    <span className="mt-8 block overflow-hidden rounded-xl border border-line bg-paper">
      <Image
        src={typeof src === "string" ? src : ""}
        alt={alt ?? ""}
        width={1200}
        height={800}
        className="h-auto w-full"
      />
    </span>
  );
}

/**
 * A labeled fact, dropped inline in a case study — e.g. a metric, a decision,
 * a date — without breaking the reading flow into a sidebar.
 */
function Callout({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mt-8 rounded-xl border border-line bg-paper px-6 py-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
        {label}
      </p>
      <div className="mt-2 text-[15px] leading-relaxed text-foreground">
        {children}
      </div>
    </div>
  );
}

export const mdxComponents = {
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  blockquote: Blockquote,
  a: A,
  img: Img,
  Callout,
};
