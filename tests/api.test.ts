import { describe, it, expect } from 'vitest';
import { z } from 'zod';

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

describe('GitHub GraphQL Schema Validation', () => {
  it('should successfully parse valid GitHub GraphQL stats response', () => {
    const mockResponse = {
      user: {
        repositories: {
          totalCount: 15,
          nodes: [
            { stargazerCount: 5, primaryLanguage: { name: 'TypeScript' } },
            { stargazerCount: 10, primaryLanguage: { name: 'Python' } },
            { stargazerCount: 0, primaryLanguage: null }
          ]
        },
        pullRequests: { totalCount: 20 },
        issues: { totalCount: 5 }
      }
    };

    const parsed = StatsSchema.parse(mockResponse);
    expect(parsed.user.repositories.totalCount).toBe(15);
    expect(parsed.user.repositories.nodes.length).toBe(3);
    expect(parsed.user.repositories.nodes[2].primaryLanguage).toBeNull();
  });

  it('should throw ZodError on invalid response payload', () => {
    const invalidResponse = {
      user: {
        repositories: { totalCount: "not a number", nodes: [] },
        pullRequests: { totalCount: 20 },
        issues: { totalCount: 5 }
      }
    };

    expect(() => StatsSchema.parse(invalidResponse)).toThrow();
  });
});
