import type { ManualProjectMetadata } from '../types/project';

// This file ONLY contains manual overrides and curation.
// Live metadata (stars, description, topics, etc.) is fetched via GraphQL.

export const projects: ManualProjectMetadata[] = [
  {
    repo: "KanavSingla28-k/PDFTalk",
    featured: true,
    order: 1,
    descriptionOverride: "AI-powered PDF Q&A using RAG, LangChain, and OpenAI. Process documents and chat with their content seamlessly.", // Overrides GitHub if needed
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
];
