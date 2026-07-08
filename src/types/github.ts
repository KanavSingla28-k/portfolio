// Type definitions for the GitHub GraphQL responses we expect

export interface GitHubRepositoryNode {
  name: string;
  owner: {
    login: string;
  };
  description: string | null;
  stargazerCount: number;
  forkCount: number;
  homepageUrl: string | null;
  pushedAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
}

export interface GitHubStatsResponse {
  user: {
    repositories: {
      totalCount: number;
      nodes: GitHubRepositoryNode[];
    };
    pullRequests: {
      totalCount: number;
    };
    issues: {
      totalCount: number;
    };
  };
}

// The clean mapped stats object we send to the frontend
export interface ActivityStats {
  totalRepositories: number;
  totalStars: number;
  pullRequests: number;
  issues: number;
  topLanguages: Array<{ name: string; count: number }>;
}
