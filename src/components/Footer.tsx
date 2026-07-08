import React from 'react';

const technologies = ["React", "TypeScript", "Vite", "Framer Motion", "Vercel"];

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ 
      padding: '48px clamp(16px, 5vw, 48px)', 
      borderTop: '1px solid var(--border)',
      maxWidth: '1200px', 
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
        © {currentYear} Kanav Singla. All rights reserved.
      </p>
      
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
        Built with{' '}
        {technologies.map((tech, index) => (
          <React.Fragment key={tech}>
            <span style={{ color: 'var(--text-primary)' }}>{tech}</span>
            {index < technologies.length - 1 ? ' · ' : ''}
          </React.Fragment>
        ))}
      </div>
    </footer>
  );
};
