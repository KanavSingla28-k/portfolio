import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';

import { skills } from '../data/skills';
import { projects } from '../data/projects';
import { resumeData } from '../data/resume';
import ProjectImageCarousel from '../components/ProjectImageCarousel';

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
  const topProjects = projects.filter(p => p.featured).slice(0, 4);

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
              <span className={`w-3 h-3 rounded-full ${profile.availability ? 'bg-success animate-pulse' : 'bg-text-muted'}`}></span>
              <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest text-[14px]">{profile.name}</span>
            </span>
          </Link>
          <h1 className="font-hero-heading-mobile md:font-hero-heading text-hero-heading-mobile md:text-hero-heading text-text-primary">
            Converting bugs into features <span className="text-primary italic">since 2023</span>
          </h1>
          <p className="font-body-lg text-body-main md:text-body-lg text-text-secondary max-w-2xl mx-auto">
            {profile.bio[0]}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-md pt-md">
            <Link className="w-full sm:w-auto px-xl py-4 border border-whisper bg-bg-surface rounded-3xl font-medium hover:border-hover hover:bg-bg-elevated transition-all flex items-center justify-center gap-2 text-text-primary" to="/about">
              About - {profile.name}
            </Link>
            <a className="w-full sm:w-auto px-xl py-4 border border-whisper bg-bg-surface rounded-3xl font-medium hover:border-hover hover:bg-bg-elevated transition-all flex items-center justify-center gap-2 text-text-primary" href={profile.links.resume} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </div>
        </motion.div>
      </section>

      <RevealSection id="about">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2xl">
          <div className="lg:col-span-7 space-y-md">
            <h2 className="font-section-heading text-section-heading text-text-primary">My Philosophy</h2>
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
          {topProjects.map((project, idx) => (
              <HoverCard key={project.id} className="bg-bg-surface rounded-[14px] hover:-translate-y-1 transition-all duration-400">
                <Link to={`/projects#${project.id}`} className="block">
                  <div className="w-full">
                    <ProjectImageCarousel 
                      images={project.images || (project.image ? [project.image] : [])} 
                      projectName={project.name} 
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
                        {project.techStack.slice(0, 4).map(topic => (
                          <span key={topic} className="px-3 py-1 bg-accent-bg border border-[rgba(124,58,237,0.1)] rounded-md font-label-mono text-label-mono text-primary uppercase">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </HoverCard>
            ))}
        </div>
      </RevealSection>

      <RevealSection id="activity">
        <div className="flex items-center justify-between mb-2xl">
          <h2 className="font-section-heading text-section-heading text-text-primary">Recent Activity</h2>
          <span className="font-label-mono text-label-mono text-text-muted">ACTIVITY / GITHUB</span>
        </div>
        <div className="space-y-md">
          {[
            { id: 1, type: 'Push', repo: 'portfolio', message: 'Update contact form and homepage routing', date: 'Just now' },
            { id: 2, type: 'Merge', repo: 'PDFTalk', message: 'Merge pull request #42 from feature/ui-refresh', date: '2 days ago' },
            { id: 3, type: 'Issue', repo: 'Resumint', message: 'Closed issue #15: Fix PDF generation bug', date: '1 week ago' }
          ].map((activity) => (
            <div key={activity.id} className="p-lg bg-bg-surface border border-whisper rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-border-hover transition-colors">
              <div className="flex items-center gap-md">
                <div className="p-3 bg-accent-bg rounded-lg text-primary">
                  {activity.type === 'Push' ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg> : activity.type === 'Merge' ? <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg> : <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                </div>
                <div>
                  <h3 className="font-medium text-text-primary group-hover:text-primary transition-colors">{activity.repo}</h3>
                  <p className="text-sm text-text-secondary">{activity.message}</p>
                </div>
              </div>
              <span className="font-label-mono text-xs text-text-muted">{activity.date}</span>
            </div>
          ))}
        </div>
      </RevealSection>

      <RevealSection id="resume">
        <h2 className="font-section-heading text-section-heading text-text-primary mb-2xl">Professional Trajectory</h2>
        <div className="relative border-l border-whisper ml-4 pl-8 space-y-2xl">
          {resumeData.experience.map((exp, idx) => (
            <div key={exp.id} className="relative">
              <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full border-4 ${idx === 0 ? 'bg-primary border-background' : 'bg-bg-surface border-whisper'}`}></div>
              <div className="space-y-sm">
                <span className="font-label-mono text-label-mono text-text-muted uppercase">{exp.period}</span>
                <h3 className="font-card-title text-card-title text-text-primary">{exp.title}</h3>
                <p className="font-body-main text-body-main text-primary">{exp.organization}</p>
                <p className="text-text-secondary max-w-2xl">{exp.description}</p>
              </div>
            </div>
          ))}
          {resumeData.education.map((edu, idx) => (
            <div key={edu.id} className="relative">
              <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full border-4 ${resumeData.experience.length === 0 && idx === 0 ? 'bg-primary border-background' : 'bg-bg-surface border-whisper'}`}></div>
              <div className="space-y-sm">
                <span className="font-label-mono text-label-mono text-text-muted uppercase">{edu.period}</span>
                <h3 className="font-card-title text-card-title text-text-primary">{edu.title}</h3>
                <p className="font-body-main text-body-main text-primary">{edu.organization}</p>
              </div>
            </div>
          ))}
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
