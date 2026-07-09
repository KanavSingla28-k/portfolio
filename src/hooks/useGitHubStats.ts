import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../lib/api/github';
import type { ActivityStats } from '../types/github';

export const useGitHubStats = () => {
  return useQuery<ActivityStats, Error>({
    queryKey: ['github-stats'],
    queryFn: async () => {
      try {
        return await githubApi.getStats();
      } catch (error) {
        console.warn('API fetch failed, falling back to local static stats data.', error);
        return {
          totalCommits: 1420,
          totalRepositories: 42,
          totalStars: 156,
          pullRequests: 89,
          issues: 34,
          contributionsCollection: {
            contributionCalendar: {
              totalContributions: 1420,
              weeks: [],
            }
          },
          topLanguages: [
            { name: 'TypeScript', color: '#3178c6', count: 15 },
            { name: 'Python', color: '#3572A5', count: 8 },
            { name: 'Rust', color: '#dea584', count: 5 },
            { name: 'Go', color: '#00ADD8', count: 3 }
          ]
        };
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
  });
};
