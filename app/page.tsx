import { Hero } from "./components/Hero";
import { WorkIndex } from "./components/WorkIndex";
import { OpenSource } from "./components/OpenSource";
import { About } from "./components/About";
import { getAllProjects } from "@/lib/projects";

export default function Home() {
  const projects = getAllProjects();

  return (
    <>
      <Hero />
      <About />
      <WorkIndex projects={projects} />
      <OpenSource />
    </>
  );
}
