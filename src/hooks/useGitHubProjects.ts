import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../lib/api/github';
import type { EnrichedProject } from '../types/project';

export const useGitHubProjects = () => {
  return useQuery<EnrichedProject[], Error>({
    queryKey: ['github-projects'],
    queryFn: githubApi.getProjects,
    staleTime: 1000 * 60 * 60, // 1 hour (aligns with API Cache-Control)
    retry: 2,
  });
};
