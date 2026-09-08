export const site = {
  name: "Ronald Wen",
  role: "Product engineer",
  location: "Irvine, CA",
  url: "https://ronaldwen.vercel.app",

  /** The one line someone remembers after they close the tab. */
  positioning:
    "I build products end to end: the insight, the interface, and the code underneath.",

  intro: [
    "I'm a computer science student at UC Irvine who works the whole width of a product: figuring out who it's actually for, deciding what's worth building, then shipping it.",
    "Most of what's below started as a problem I kept running into personally. I care about the part most engineering stops short of: whether anyone wants the thing, and whether they come back.",
  ],

  links: {
    linkedin: "https://www.linkedin.com/in/ronaldwen/",
    github: "https://github.com/ronaldw07",
    email: "ronaldwen10@gmail.com",
  },
} as const;

export const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/#open-source", label: "Open source" },
  { href: "/#about", label: "About" },
] as const;
