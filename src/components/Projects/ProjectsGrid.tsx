import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { EnrichedProject } from '../../data/projects';

// Mock data to render until Phase 5 (GitHub fetch) is implemented
const mockProjects: EnrichedProject[] = [
  {
    repo: 'KanavSingla28-k/PDFTalk',
    name: 'PDFTalk',
    description: 'AI-powered PDF Q&A using RAG, LangChain, and OpenAI. Process documents and chat with their content seamlessly.',
    topics: ['python', 'react', 'langchain', 'openai'],
    stars: 12,
    language: 'Python',
    githubUrl: 'https://github.com/KanavSingla28-k/PDFTalk',
    demoUrl: 'https://pdftalk.demo.com',
    thumbnail: null,
    isContribution: false,
    featured: true,
    order: 1,
  },
  {
    repo: 'DushyantBhardwaj2/resumeDatabase',
    name: 'resumeDatabase',
    description: 'A scalable backend system for parsing and indexing resume documents.',
    topics: ['nodejs', 'postgresql', 'express'],
    stars: 5,
    language: 'TypeScript',
    githubUrl: 'https://github.com/DushyantBhardwaj2/resumeDatabase',
    demoUrl: null,
    thumbnail: null,
    isContribution: true,
    contribution: {
      role: 'Backend Engineer',
      highlights: ['Architected scalable backend systems.'],
      prLinks: []
    },
    featured: false,
    order: 2,
  }
];

export const ProjectsGrid = () => {
  return (
    <section id="projects" style={{ padding: '100px clamp(16px, 5vw, 48px)', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ fontFamily: 'Geist, sans-serif', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '48px' }}>
        Selected Projects
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px',
        gridAutoFlow: 'dense'
      }}>
        {mockProjects.map(project => (
          <Card 
            key={project.repo} 
            variant="project" 
            interactive 
            className={project.featured ? 'featured-card' : ''}
            // Using inline styles for the grid-span for simplicity in the mock
            // In a real implementation we'd use the CSS module classes
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <Badge variant="category">
                {project.isContribution ? `Contributor: ${project.contribution?.role}` : 'Personal Project'}
              </Badge>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                {project.stars}
              </div>
            </div>

            <h3 style={{ fontSize: project.featured ? '1.75rem' : '1.25rem', margin: '0 0 8px 0', fontFamily: 'Geist, sans-serif' }}>
              {project.name}
            </h3>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.6', margin: '0 0 24px 0', flex: 1 }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {project.topics.slice(0, 4).map(topic => (
                <Badge key={topic} variant="tech">{topic}</Badge>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: 'auto' }}>
              {project.demoUrl && (
                <Button variant="primary" size="sm" href={project.demoUrl} target="_blank">
                  View Live
                </Button>
              )}
              <Button variant="ghost" size="sm" href={project.githubUrl} target="_blank">
                GitHub ↗
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {/* We add a global style override just for the featured card span for the mock */}
      <style>{`
        @media (min-width: 768px) {
          .featured-card {
            grid-column: span 2;
            grid-row: span 2;
          }
        }
      `}</style>
    </section>
  );
};
