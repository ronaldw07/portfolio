import { NextResponse } from "next/server";
import { z } from "zod";
import { site } from "@/lib/site";

const MIN_SUBMIT_TIME_MS = 1500;

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().email("Enter a valid email"),
  message: z.string().trim().min(10, "Message is a bit short").max(4000),
  company: z.string().max(0, "Spam detected"), // honeypot: real users never fill this
  renderedAt: z.number(),
});

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json({ ok: false, errors: fieldErrors }, { status: 400 });
  }

  const { name, email, message, renderedAt } = parsed.data;

  if (Date.now() - renderedAt < MIN_SUBMIT_TIME_MS) {
    return NextResponse.json(
      { ok: false, errors: { message: ["Please try again"] } },
      { status: 400 },
    );
  }

  const subject = `Portfolio contact from ${name}`;
  const body_ = `${message}\n\nFrom: ${name} <${email}>`;
  const mailto = `mailto:${site.links.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body_)}`;

  return NextResponse.json({ ok: true, mailto });
}
