export const site = {
  name: "Ronald Wen",
  role: "Product designer",
  location: "San Francisco, CA",
  url: "https://ronaldwen.vercel.app",

  /** The one line someone remembers after they close the tab. */
  positioning:
    "I design products people reach for every day, then build them so I can watch them get used.",

  intro: [
    "I'm a Computer Science and Informatics student at UC Irvine who designs the whole experience: who it's for, what it should feel like, and the small decisions that decide whether someone comes back.",
    "I prototype in real code, so every idea gets tested on a real screen, and I ship what holds up. Most of what's below started as a problem I kept running into myself.",
  ],

  links: {
    linkedin: "https://www.linkedin.com/in/ronaldwen/",
    github: "https://github.com/ronaldw07",
    email: "ronaldwen10@gmail.com",
  },
} as const;

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#open-source", label: "Open source" },
  { href: "/#travel", label: "Travel" },
] as const;
