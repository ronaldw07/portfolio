import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms for using ronaldwen.vercel.app.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="September 2026">
      <p>
        This is a personal portfolio, not a product with an account or a
        subscription. These terms are short because there isn&apos;t much to
        agree to.
      </p>

      <h2>Content</h2>
      <p>
        The writing, case studies, and code samples on this site are mine
        unless stated otherwise, and are here to show my work, not to be
        republished elsewhere without asking first.
      </p>

      <h2>No warranty</h2>
      <p>
        Everything here is provided as is. Case studies describe real
        projects at a point in time; details like status, metrics, and links
        can go stale as those projects keep moving.
      </p>

      <h2>Third-party links</h2>
      <p>
        Links to GitHub repositories, LinkedIn, and other external sites are
        provided for reference. I don&apos;t control and am not responsible
        for their content.
      </p>

      <h2>Changes</h2>
      <p>
        I may update this site, including these terms, at any time without
        notice.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can go to{" "}
        <a href={`mailto:${site.links.email}`}>{site.links.email}</a>.
      </p>
    </LegalPage>
  );
}
