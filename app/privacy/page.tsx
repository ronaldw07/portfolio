import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ronaldwen.vercel.app handles data.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="September 2026">
      <p>
        This site is a personal portfolio. It collects very little, and this
        page explains exactly what.
      </p>

      <h2>Analytics</h2>
      <p>
        This site uses Vercel Web Analytics to see aggregate page views. It is
        cookieless and does not track you individually across sites or build
        a profile of you. It cannot identify you personally.
      </p>

      <h2>The contact form</h2>
      <p>
        If you use the contact form, your name, email, and message are
        validated by a server function and then handed to your own email
        client to send. Nothing you type is stored on a server or database
        controlled by this site.
      </p>

      <h2>Cookies</h2>
      <p>
        The only cookie-like storage this site uses is a single entry in your
        browser&apos;s local storage that remembers you dismissed the cookie
        notice, so it doesn&apos;t show again. Nothing is sent anywhere as a
        result of it.
      </p>

      <h2>Third-party links</h2>
      <p>
        Case studies link out to GitHub, LinkedIn, and similar third-party
        sites. Once you click through, their own privacy policy applies, not
        this one.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can go to{" "}
        <a href={`mailto:${site.links.email}`}>{site.links.email}</a>.
      </p>
    </LegalPage>
  );
}
