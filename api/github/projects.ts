import { z } from 'zod';
import { GraphQLClient, gql } from 'graphql-request';
import { projects as manualProjects } from '../../src/data/projects';
import type { EnrichedProject } from '../../src/types/project';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Zod schema for runtime validation of the GitHub GraphQL response
const RepositorySchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  stargazerCount: z.number(),
  homepageUrl: z.string().nullable(),
  primaryLanguage: z.object({
    name: z.string(),
  }).nullable(),
  repositoryTopics: z.object({
    nodes: z.array(z.object({
      topic: z.object({
        name: z.string(),
      })
    }))
  })
});

// Since we can query multiple repositories in one go, we dynamically construct the query
const generateQuery = (repos: { owner: string; name: string }[]) => {
  const queryParts = repos.map((repo, i) => `
    repo${i}: repository(owner: "${repo.owner}", name: "${repo.name}") {
      name
      description
      stargazerCount
      homepageUrl
      primaryLanguage {
        name
      }
      repositoryTopics(first: 5) {
        nodes {
          topic {
            name
          }
        }
      }
    }
  `);

  return gql`
    query {
      ${queryParts.join('\n')}
    }
  `;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set Cache-Control header
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'GITHUB_TOKEN is not configured' });
  }

  const client = new GraphQLClient('https://api.github.com/graphql', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  try {
    const reposToFetch = manualProjects.map(p => {
      const [owner, name] = p.repo.split('/');
      return { owner, name };
    });

    const query = generateQuery(reposToFetch);
    const data = await client.request<Record<string, unknown>>(query);

    const enrichedProjects: EnrichedProject[] = manualProjects.map((manualMeta, i) => {
      const repoData = data[`repo${i}`];
      
      // Parse and validate the GitHub data
      const parsed = RepositorySchema.parse(repoData);

      return {
        ...manualMeta,
        name: parsed.name,
        description: manualMeta.descriptionOverride ?? parsed.description ?? '',
        stars: parsed.stargazerCount,
        language: parsed.primaryLanguage?.name ?? 'Unknown',
        topics: parsed.repositoryTopics.nodes.map(n => n.topic.name),
        githubUrl: `https://github.com/${manualMeta.repo}`,
        demoUrl: manualMeta.demoUrl ?? parsed.homepageUrl,
        isContribution: !!manualMeta.contribution,
      };
    });

    // Sort by order specified in manual data
    enrichedProjects.sort((a, b) => a.order - b.order);

    return res.status(200).json(enrichedProjects);
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    return res.status(500).json({ error: 'Failed to fetch GitHub projects' });
  }
}
