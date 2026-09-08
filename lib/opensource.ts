export type OpenSourceEntry = {
  repo: string;
  repoUrl: string;
  title: string;
  description: string;
  prUrl: string;
  merged: boolean;
};

/**
 * Contributions into codebases owned by someone else — the shipping signal a
 * case study can't show, since there's no product ownership to narrate.
 */
export const openSourceEntries: OpenSourceEntry[] = [
  {
    repo: "icssc/AntAlmanac",
    repoUrl: "https://github.com/icssc/AntAlmanac",
    title: "Schedule selector on the mobile Added Pane",
    description:
      "UCI's course scheduler, used by most of the student body every registration cycle. Added the ability to pick which schedule a course gets added to from the mobile view.",
    prUrl: "https://github.com/icssc/AntAlmanac/pull/1428",
    merged: true,
  },
  {
    repo: "icssc/AntAlmanac",
    repoUrl: "https://github.com/icssc/AntAlmanac",
    title: "Standardized mobile breakpoint detection",
    description:
      "Replaced ad-hoc width checks scattered across components with one shared breakpoint source, removing a class of layout bugs that only showed up on specific devices.",
    prUrl: "https://github.com/icssc/AntAlmanac/pull/1432",
    merged: true,
  },
  {
    repo: "google/ml-flashpoint",
    repoUrl: "https://github.com/google/ml-flashpoint",
    title: "Abstracted torch.distributed APIs in CheckpointLoader",
    description:
      "A memory-first ML checkpointing library. Refactored the loader so distributed-training APIs sit behind one boundary instead of being called directly throughout.",
    prUrl: "https://github.com/google/ml-flashpoint/pull/47",
    merged: true,
  },
  {
    repo: "google/ml-flashpoint",
    repoUrl: "https://github.com/google/ml-flashpoint",
    title: "Extracted local-aware Megatron save logic",
    description:
      "Pulled the Megatron adapter's local-checkpoint save path into its own helper function, separating it from the general save flow it was previously tangled into.",
    prUrl: "https://github.com/google/ml-flashpoint/pull/43",
    merged: true,
  },
];
