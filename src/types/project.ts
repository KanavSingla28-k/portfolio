export interface ManualProjectMetadata {
  repo: string; // e.g., "KanavSingla28-k/PDFTalk"
  featured: boolean;
  order: number;
  descriptionOverride?: string;
  image?: string; // Optional custom thumbnail
  demoUrl?: string; // Optional custom demo URL (if different from GitHub homepage)
  contribution?: {
    role: string;
    highlights: string[];
    prLinks?: string[];
  };
}

export interface EnrichedProject extends ManualProjectMetadata {
  name: string;
  description: string;
  topics: string[];
  stars: number;
  language: string;
  githubUrl: string;
  isContribution: boolean;
  // Merged fallback logic happens in the API mapping:
  // e.g., demoUrl will be ManualProjectMetadata.demoUrl ?? GitHub.homepageUrl
}
