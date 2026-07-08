// import React from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { Nav } from '../components/Nav';

export const StyleGuide = () => {
  return (
    <div style={{ minHeight: '200vh', backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      {/* Test Nav */}
      <Nav />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px 64px' }}>
        <h1 style={{ marginBottom: '48px', fontSize: '3rem' }}>Design System Components</h1>

        {/* Buttons */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', color: 'var(--text-secondary)' }}>Buttons</h2>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Button variant="primary">View Projects →</Button>
            <Button variant="ghost">Download Resume</Button>
            <Button variant="ghost" size="sm">Contact</Button>
            <Button variant="icon">{'>_'}</Button>
          </div>
        </section>

        {/* Badges */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', color: 'var(--text-secondary)' }}>Badges & Chips</h2>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Badge variant="availability" pulse>Available for opportunities</Badge>
            <Badge variant="tech">Python</Badge>
            <Badge variant="tech">TypeScript</Badge>
            <Badge variant="category">Personal</Badge>
          </div>
        </section>

        {/* Cards */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', color: 'var(--text-secondary)' }}>Cards (Hover over the interactive ones)</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            <Card variant="project" interactive>
              <Badge variant="category" style={{ alignSelf: 'flex-start' }}>[Personal]</Badge>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>PDFTalk</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
                AI-powered PDF Q&A using RAG, LangChain and OpenAI.
              </p>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: 'auto' }}>
                <Badge variant="tech">Python</Badge>
                <Badge variant="tech">React</Badge>
              </div>
            </Card>

            <Card variant="stat" interactive>
              <h3 style={{ fontSize: '3rem', margin: 0, fontFamily: 'Geist, sans-serif' }}>10+</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Projects Built</p>
            </Card>

            <Card>
              <h3 style={{ margin: 0 }}>Non-interactive Card</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Just a static container.</p>
            </Card>

          </div>
        </section>

        {/* Skeleton Loaders */}
        <section style={{ marginBottom: '64px' }}>
          <h2 style={{ marginBottom: '24px', fontSize: '1.5rem', color: 'var(--text-secondary)' }}>Skeleton Loaders</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
            <SkeletonLoader height="32px" width="60%" />
            <SkeletonLoader height="20px" width="100%" />
            <SkeletonLoader height="20px" width="80%" />
            <SkeletonLoader height="200px" width="100%" borderRadius="14px" />
          </div>
        </section>
        
      </div>
    </div>
  );
};
