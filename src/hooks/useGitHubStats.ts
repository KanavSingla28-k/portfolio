import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../lib/api/github';
import type { ActivityStats } from '../types/github';

export const useGitHubStats = () => {
  return useQuery<ActivityStats, Error>({
    queryKey: ['github-stats'],
    queryFn: githubApi.getStats,
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: 2,
  });
};
