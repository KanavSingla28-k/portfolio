export const projects = [
  {
    repo: "KanavSingla28-k/PDFTalk",
    featured: true,
    order: 1,
  },
  {
    repo: "DushyantBhardwaj2/resumeDatabase",
    featured: false,
    order: 2,
    contribution: {
      role: "Backend Engineer",
      highlights: [
        "Architected scalable backend systems.",
      ],
      prLinks: [],
    },
  },
] as const;

// Types for the enriched data we'll eventually fetch from GitHub
export interface ContributionMeta {
  role: string;
  highlights: string[];
  prLinks: string[];
}

export interface EnrichedProject {
  repo: string;
  name: string;
  description: string;
  topics: string[];
  stars: number;
  language: string;
  githubUrl: string;
  demoUrl: string | null;
  thumbnail: string | null;
  isContribution: boolean;
  contribution?: ContributionMeta;
  featured: boolean;
  order: number;
}
