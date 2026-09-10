import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { CookieConsent } from "./components/CookieConsent";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const description =
  "Product-minded software engineer. Case studies on Mindtrail, Framelight, and Boring Notch: the problem, the insight, and the process behind each.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Ronald Wen, Product engineer",
    template: "%s, Ronald Wen",
  },
  description,
  openGraph: {
    title: "Ronald Wen, Product engineer",
    description,
    url: site.url,
    siteName: "Ronald Wen",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ronald Wen, Product engineer",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
