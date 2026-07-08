import React from 'react';
import { Card } from '../ui/Card';
import { SkeletonLoader } from '../ui/SkeletonLoader';
import { useGitHubStats } from '../../hooks/useGitHubStats';
import { Badge } from '../ui/Badge';

export const GitHubActivity = () => {
  const { data: stats, isLoading, isError } = useGitHubStats();

  return (
    <section id="github" style={{ padding: '100px clamp(16px, 5vw, 48px)', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'Geist, sans-serif', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '48px' }}>
        GitHub Activity
      </h2>

      {isLoading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {[1, 2, 3, 4].map(i => <SkeletonLoader key={i} height="120px" />)}
        </div>
      )}

      {isError && (
        <Card>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Failed to load GitHub activity. Please try again later.</p>
        </Card>
      )}

      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <Card variant="stat" interactive>
            <h3 style={{ fontSize: '2.5rem', margin: 0, fontFamily: 'Geist, sans-serif' }}>{stats.totalRepositories}</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Repositories</p>
          </Card>

          <Card variant="stat" interactive>
            <h3 style={{ fontSize: '2.5rem', margin: 0, fontFamily: 'Geist, sans-serif' }}>{stats.totalStars}</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Total Stars</p>
          </Card>

          <Card variant="stat" interactive>
            <h3 style={{ fontSize: '2.5rem', margin: 0, fontFamily: 'Geist, sans-serif' }}>{stats.pullRequests}</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Pull Requests</p>
          </Card>

          <Card variant="stat" interactive>
            <h3 style={{ fontSize: '2.5rem', margin: 0, fontFamily: 'Geist, sans-serif' }}>{stats.issues}</h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Issues</p>
          </Card>
          
          {stats.topLanguages.length > 0 && (
             <Card style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Most Used Languages:</span>
                {stats.topLanguages.map(lang => (
                  <Badge key={lang.name} variant="tech">{lang.name}</Badge>
                ))}
             </Card>
          )}
        </div>
      )}
    </section>
  );
};
