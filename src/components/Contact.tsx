// import React from 'react';
import { Card } from './ui/Card';
import { contactMethods } from '../data/contact';
import { profile } from '../data/profile';
import { Badge } from './ui/Badge';

export const Contact = () => {
  return (
    <section id="contact" style={{ padding: '100px clamp(16px, 5vw, 48px)', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ fontFamily: 'Geist, sans-serif', fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
          Get In Touch
        </h2>
        {profile.availability && (
          <Badge variant="availability" pulse>
            Available for new opportunities
          </Badge>
        )}
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {contactMethods.map((method) => {
          const content = (
            <>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 500 }}>
                {method.name}
              </h3>
              <p style={{ color: 'var(--text-primary)', margin: 0, wordBreak: 'break-word' }}>
                {method.value}
              </p>
            </>
          );

          if (method.url) {
            return (
              <a 
                key={method.name} 
                href={method.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ textDecoration: 'none' }}
              >
                <Card interactive>
                  {content}
                </Card>
              </a>
            );
          }

          return (
            <Card key={method.name}>
              {content}
            </Card>
          );
        })}
      </div>
    </section>
  );
};
