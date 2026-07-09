import type { ActivityStats } from '../../types/github';

const API_BASE = '/api/github';

export const githubApi = {

  getStats: async (): Promise<ActivityStats> => {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },
};
