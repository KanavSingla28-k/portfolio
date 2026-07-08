// import React from 'react';
import { Card } from '../ui/Card';
import { Timeline } from './Timeline';
import { resumeData } from '../../data/resume';
import { FadeIn } from '../ui/FadeIn';

export const ResumeSection = () => {
  return (
    <section id="resume" style={{ padding: '100px clamp(16px, 5vw, 48px)', maxWidth: '1200px', margin: '0 auto' }}>
      <FadeIn>
        <h2 style={{ fontFamily: 'Geist, sans-serif', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '48px' }}>
          Experience & Education
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Experience</h3>
            <Card>
              <Timeline items={resumeData.experience} />
            </Card>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>Education</h3>
            <Card>
              <Timeline items={resumeData.education} />
            </Card>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};
