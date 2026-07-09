import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';

import { skills } from '../data/skills';
import { useGitHubProjects } from '../hooks/useGitHubProjects';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

function RevealSection({ children, id, className = '' }: { children: React.ReactNode, id?: string, className?: string }) {
  return (
    <motion.section
      id={id}
      className={`py-4xl max-w-max-width mx-auto px-lg ${className}`}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.section>
  );
}

function HoverCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      className={`relative whisper-border overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100" 
           style={{ background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(124, 58, 237, 0.08), transparent 40%)' }} />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const { data: projectsData, isLoading } = useGitHubProjects();
  const topProjects = projectsData?.slice(0, 3) || [];

  return (
    <>
      <section className="relative pt-20 pb-4xl flex flex-col items-center text-center px-lg overflow-hidden bg-background">
        <motion.div 
          className="max-w-4xl mx-auto space-y-xl z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link className="relative inline-flex overflow-hidden rounded-full p-[1px] mb-md group/badge hover:-translate-y-0.5 transition-transform" to="/projects">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#7c3aed_100%)]"></span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background relative w-full h-full">
              <span className={`w-2 h-2 rounded-full ${profile.availability ? 'bg-success animate-pulse' : 'bg-text-muted'}`}></span>
              <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest text-[14px]">{profile.name}</span>
            </span>
          </Link>
          <h1 className="font-hero-heading-mobile md:font-hero-heading text-hero-heading-mobile md:text-hero-heading text-text-primary">
            Precision Crafting for the <span className="text-primary italic">Modern Web</span>
          </h1>
          <p className="font-body-lg text-body-main md:text-body-lg text-text-secondary max-w-2xl mx-auto">
            {profile.bio[0]}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-md pt-md">
            <Link className="w-full sm:w-auto px-xl py-4 border border-whisper bg-bg-surface rounded-[14px] font-medium hover:border-hover hover:bg-bg-elevated transition-all flex items-center justify-center gap-2 text-text-primary" to="/about">
              About - {profile.name}
            </Link>
            <a className="w-full sm:w-auto px-xl py-4 border border-whisper bg-bg-surface rounded-[14px] font-medium hover:border-hover hover:bg-bg-elevated transition-all flex items-center justify-center gap-2 text-text-primary" href={profile.links.resume} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </div>
        </motion.div>
      </section>

      <RevealSection id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2xl">
          <div className="lg:col-span-7 space-y-md">
            <h2 className="font-section-heading text-section-heading text-text-primary">The Obsidian Ethos</h2>
            <p className="font-body-main text-body-main text-text-secondary leading-relaxed">
              I am {profile.name}, a developer driven by the pursuit of technical perfection. {profile.bio[1]} With a focus on performance, scalability, and user-centric design, I transform complex problems into elegant architectural solutions.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-md">
              <HoverCard className="p-lg bg-bg-surface rounded-xl">
                <span className="font-stat-display text-stat-display text-primary block">0{profile.stats.yearsOfCoding}+</span>
                <span className="font-label-mono text-label-mono text-text-muted uppercase">Years Experience</span>
              </HoverCard>
              <HoverCard className="p-lg bg-bg-surface rounded-xl">
                <span className="font-stat-display text-stat-display text-primary block">{profile.stats.projectsBuilt}+</span>
                <span className="font-label-mono text-label-mono text-text-muted uppercase">Projects Shipped</span>
              </HoverCard>
              <HoverCard className="p-lg bg-bg-surface rounded-xl">
                <span className="font-stat-display text-stat-display text-primary block">{profile.stats.technologiesUsed}+</span>
                <span className="font-label-mono text-label-mono text-text-muted uppercase">Tech Stack</span>
              </HoverCard>
              <HoverCard className="p-lg bg-bg-surface rounded-xl">
                <span className="font-stat-display text-stat-display text-primary block">{profile.stats.keyMetric.value}</span>
                <span className="font-label-mono text-label-mono text-text-muted uppercase">{profile.stats.keyMetric.label}</span>
              </HoverCard>
            </div>
          </div>
        </div>
      </RevealSection>

      <RevealSection id="projects">
        <div className="flex items-center justify-between mb-2xl">
          <h2 className="font-section-heading text-section-heading text-text-primary">Featured Works</h2>
          <span className="font-label-mono text-label-mono text-text-muted">PROJECTS / {String(1).padStart(3, '0')} — {String(topProjects.length).padStart(3, '0')}</span>
        </div>
        <div className="space-y-4xl">
          {isLoading ? (
            <div className="text-text-muted">Loading projects...</div>
          ) : (
            topProjects.map((project, idx) => (
              <HoverCard key={project.repo} className="bg-bg-surface rounded-[14px] hover:-translate-y-1 transition-all duration-400">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="aspect-video w-full bg-surface-container overflow-hidden">
                    <img 
                      alt={project.name} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                      src={project.image || `https://via.placeholder.com/800x450/111113/7c3aed?text=${project.name}`} 
                    />
                  </div>
                  <div className="p-xl lg:flex items-start gap-2xl">
                    <div className="hidden lg:block lg:w-1/12">
                      <span className="font-label-mono text-label-mono text-primary">0{idx + 1}.</span>
                    </div>
                    <div className="lg:w-11/12 space-y-md">
                      <h3 className="font-card-title text-card-title text-text-primary group-hover:text-primary transition-colors">{project.name}</h3>
                      <p className="font-body-main text-body-main text-text-secondary">{project.description}</p>
                      <div className="flex flex-wrap gap-xs">
                        {project.topics.slice(0, 4).map(topic => (
                          <span key={topic} className="px-3 py-1 bg-accent-bg border border-[rgba(124,58,237,0.1)] rounded-md font-label-mono text-label-mono text-primary uppercase">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              </HoverCard>
            ))
          )}
        </div>
      </RevealSection>


      <RevealSection>
        <h2 className="font-section-heading text-section-heading text-text-primary mb-2xl">Toolkit</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-xl">
          {skills.map(group => (
            <div key={group.category} className="space-y-md">
              <h3 className="font-label-mono text-label-mono text-text-muted uppercase">{group.category}</h3>
              <div className="flex flex-wrap gap-xs">
                {group.items.map(item => (
                  <span key={item.name} className="px-3 py-1 bg-accent-bg border border-[rgba(124,58,237,0.1)] rounded-md font-label-mono text-label-mono text-primary uppercase">
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </RevealSection>
    </>
  );
}
