import Image from "next/image";

const SIZES = {
  sm: { box: "h-11 w-11", px: 44 },
  lg: { box: "h-16 w-16", px: 64 },
} as const;

/**
 * The three logos arrive with wildly different native backgrounds (white,
 * cream, near-black). Rather than editing each image, every logo sits in an
 * identical bordered, rounded frame so the row reads as one system.
 */
export function ProjectLogo({
  src,
  alt,
  size = "sm",
}: {
  src: string;
  alt: string;
  size?: keyof typeof SIZES;
}) {
  const { box, px } = SIZES[size];
  return (
    <span
      className={`inline-flex ${box} shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-paper`}
    >
      <Image src={src} alt={alt} width={px} height={px} className="h-full w-full object-cover" />
    </span>
  );
}
