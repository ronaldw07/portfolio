"use client";

import { useRef, useState } from "react";

type Status = "idle" | "submitting" | "sent" | "error";

const inputClass =
  "w-full rounded-lg border border-line bg-paper px-4 py-3 text-[15px] text-foreground placeholder:text-faint focus:border-foreground";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const renderedAt = useRef(Date.now());

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
      renderedAt: renderedAt.current,
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    if (!response.ok || !result.ok) {
      setErrors(result.errors ?? {});
      setStatus("error");
      return;
    }

    window.location.href = result.mailto;
    setStatus("sent");
    form.reset();
  }

  if (status === "sent") {
    return (
      <p className="text-[15px] text-muted">
        Opening your email client to send that now. If nothing opened,{" "}
        write to me directly instead.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0"
      />

      <div>
        <input name="name" placeholder="Name" required className={inputClass} />
        {errors.name && <p className="mt-1 text-[13px] text-accent">{errors.name[0]}</p>}
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={inputClass}
        />
        {errors.email && <p className="mt-1 text-[13px] text-accent">{errors.email[0]}</p>}
      </div>

      <div>
        <textarea
          name="message"
          placeholder="What are you working on?"
          required
          minLength={10}
          rows={4}
          className={`${inputClass} resize-none`}
        />
        {errors.message && (
          <p className="mt-1 text-[13px] text-accent">{errors.message[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="pressable rounded-full bg-foreground px-6 py-3 text-[14px] text-background transition-opacity duration-200 disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
