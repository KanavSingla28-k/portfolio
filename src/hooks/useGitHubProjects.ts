import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../lib/api/github';
import { projects } from '../data/projects';
import type { EnrichedProject } from '../types/project';

export const useGitHubProjects = () => {
  return useQuery<EnrichedProject[], Error>({
    queryKey: ['github-projects'],
    queryFn: async () => {
      try {
        return await githubApi.getProjects();
      } catch (error) {
        console.warn('API fetch failed, falling back to local static projects data.', error);
        
        // Mock data mapping to prevent UI crash in local dev (missing Vercel API)
        const mocks: EnrichedProject[] = projects.map((p) => ({
          name: p.repo.split('/')[1] || 'Mock Project',
          description: p.descriptionOverride || 'A beautiful placeholder description for local development since the API is down.',
          githubUrl: `https://github.com/${p.repo}`,
          demoUrl: p.demoUrl || '#',
          topics: ['React', 'TypeScript', 'CSS'],
          stars: 42,
          language: 'TypeScript',
          repo: p.repo,
          featured: p.featured,
          order: p.order,
          isContribution: p.featured === false,
          contribution: p.contribution,
          // Placeholder gradient
          image: p.image || `https://via.placeholder.com/800x450/111113/7c3aed?text=${p.repo.split('/')[1]}`
        }));
        
        return mocks;
      }
    },
    staleTime: 1000 * 60 * 60, // 1 hour (aligns with API Cache-Control)
    retry: false, // Don't retry since we fallback immediately
  });
};
