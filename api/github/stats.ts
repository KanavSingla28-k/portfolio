import { z } from 'zod';
import { GraphQLClient, gql } from 'graphql-request';
import type { ActivityStats } from '../../src/types/github';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const StatsSchema = z.object({
  user: z.object({
    repositories: z.object({
      totalCount: z.number(),
      nodes: z.array(z.object({
        stargazerCount: z.number(),
        primaryLanguage: z.object({
          name: z.string()
        }).nullable()
      }))
    }),
    pullRequests: z.object({
      totalCount: z.number()
    }),
    issues: z.object({
      totalCount: z.number()
    })
  })
});

const STATS_QUERY = gql`
  query GetGitHubStats($username: String!) {
    user(login: $username) {
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: STARGAZERS, direction: DESC}) {
        totalCount
        nodes {
          stargazerCount
          primaryLanguage {
            name
          }
        }
      }
      pullRequests(first: 1) {
        totalCount
      }
      issues(first: 1) {
        totalCount
      }
    }
  }
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  if (!token || !username) {
    return res.status(500).json({ error: 'GITHUB_TOKEN or GITHUB_USERNAME is not configured' });
  }

  const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  try {
    const data = await client.request(STATS_QUERY, { username });
    const parsed = StatsSchema.parse(data);

    // Aggregate stats
    const totalRepos = parsed.user.repositories.totalCount;
    let totalStars = 0;
    const languageMap: Record<string, number> = {};

    parsed.user.repositories.nodes.forEach(repo => {
      totalStars += repo.stargazerCount;
      if (repo.primaryLanguage?.name) {
        languageMap[repo.primaryLanguage.name] = (languageMap[repo.primaryLanguage.name] || 0) + 1;
      }
    });

    // Get top 3 languages
    const topLanguages = Object.entries(languageMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3);

    const activityStats: ActivityStats = {
      totalRepositories: totalRepos,
      totalStars,
      pullRequests: parsed.user.pullRequests.totalCount,
      issues: parsed.user.issues.totalCount,
      topLanguages
    };

    return res.status(200).json(activityStats);
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return res.status(500).json({ error: 'Failed to fetch GitHub stats' });
  }
}
