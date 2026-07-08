import { Badge } from './ui/Badge';
import { skills } from '../data/skills';
import { FadeIn } from './ui/FadeIn';

export const Skills = () => {
  return (
    <section id="skills" style={{ padding: '100px clamp(16px, 5vw, 48px)', maxWidth: '1200px', margin: '0 auto' }}>
      <FadeIn>
        <h2 style={{ fontFamily: 'Geist, sans-serif', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '48px' }}>
          Skills & Technologies
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px' }}>
          {skills.map(group => (
            <div key={group.category}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '24px', fontWeight: 500 }}>
                {group.category}
              </h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {group.items.map(skill => (
                  <Badge key={skill} variant="tech" className="skill-badge">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
      
      <style>{`
        .skill-badge {
          font-size: 0.875rem !important; /* Slightly larger for the skills section */
          padding: 8px 16px !important;
          border-radius: 8px !important;
        }
      `}</style>
    </section>
  );
};
