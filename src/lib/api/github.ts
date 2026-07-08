import type { EnrichedProject } from '../../types/project';
import type { ActivityStats } from '../../types/github';

const API_BASE = '/api/github';

export const githubApi = {
  getProjects: async (): Promise<EnrichedProject[]> => {
    const res = await fetch(`${API_BASE}/projects`);
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  getStats: async (): Promise<ActivityStats> => {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },
};
