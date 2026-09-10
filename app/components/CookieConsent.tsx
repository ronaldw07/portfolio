"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent-dismissed";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl flex-col gap-3 rounded-2xl border border-line bg-paper p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between">
      <p className="text-[13px] leading-relaxed text-muted">
        This site uses cookieless analytics to see aggregate page views. See
        the <Link href="/privacy" className="link-underline text-foreground">privacy policy</Link> for details.
      </p>
      <button
        onClick={dismiss}
        className="pressable shrink-0 rounded-full bg-foreground px-5 py-2 text-[13px] text-background"
      >
        Got it
      </button>
    </div>
  );
}
