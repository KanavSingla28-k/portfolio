
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { RevealGroup, RevealItem, RevealFx } from '../components/ui/RevealFx';
import { Button } from '../components/ui/Button';
import { InteractiveHoverCard } from '../components/ui/InteractiveHoverCard';


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

import { TimelineBox } from '../components/TimelineBox';



// Removed local HoverCard in favor of InteractiveHoverCard

export default function Home() {
  const topProjects = projects.filter(p => p.featured).slice(0, 4);

  return (
    <>
      <section className="relative pt-20 pb-4xl flex flex-col items-center text-center px-lg overflow-hidden bg-transparent">
        <RevealGroup 
          className="max-w-4xl mx-auto space-y-xl z-10"
          staggerDelay={0.15}
        >
          <RevealItem>
            <Link className="relative inline-flex overflow-hidden rounded-full p-[1px] mb-md group/badge hover:-translate-y-0.5 transition-transform" to="/projects">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,#7c3aed_100%)]"></span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-background relative w-full h-full">
                <span className={`w-3 h-3 rounded-full ${profile.availability ? 'bg-success animate-pulse' : 'bg-text-muted'}`}></span>
                <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest text-[14px]">{profile.name}</span>
              </span>
            </Link>
          </RevealItem>
          
          <RevealItem>
            <h1 className="font-hero-heading-mobile md:font-hero-heading text-hero-heading-mobile md:text-hero-heading text-text-primary">
              Converting bugs into features <span className="text-primary italic">since 2023</span>
            </h1>
          </RevealItem>
          
          <RevealItem>
            <p className="font-body-lg text-body-main md:text-body-lg text-text-secondary max-w-2xl mx-auto">
              {profile.bio[0]}
            </p>
          </RevealItem>
          
          <RevealItem>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-md pt-md">
              <Button variant="surface" as={Link} to="/about">
                About - {profile.name}
              </Button>
              <Button variant="surface" as="a" href={profile.links.resume} target="_blank" rel="noopener noreferrer">
                Resume
              </Button>
            </div>
          </RevealItem>
        </RevealGroup>
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
            <div className="grid grid-cols-2 gap-md">
              <InteractiveHoverCard className="p-lg whisper-border bg-bg-surface rounded-xl">
                <span className="font-stat-display text-stat-display text-primary block">0{profile.stats.yearsOfCoding}+</span>
                <span className="font-label-mono text-label-mono text-text-muted uppercase">Years Experience</span>
              </InteractiveHoverCard>
              <InteractiveHoverCard className="p-lg whisper-border bg-bg-surface rounded-xl">
                <span className="font-stat-display text-stat-display text-primary block">{profile.stats.projectsBuilt}+</span>
                <span className="font-label-mono text-label-mono text-text-muted uppercase">Projects Shipped</span>
              </InteractiveHoverCard>
              <InteractiveHoverCard className="p-lg whisper-border bg-bg-surface rounded-xl">
                <span className="font-stat-display text-stat-display text-primary block">{profile.stats.technologiesUsed}+</span>
                <span className="font-label-mono text-label-mono text-text-muted uppercase">Tech Stack</span>
              </InteractiveHoverCard>
              <InteractiveHoverCard className="p-lg whisper-border bg-bg-surface rounded-xl">
                <span className="font-stat-display text-stat-display text-primary block">{profile.stats.keyMetric.value}</span>
                <span className="font-label-mono text-label-mono text-text-muted uppercase">{profile.stats.keyMetric.label}</span>
              </InteractiveHoverCard>
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
              <InteractiveHoverCard key={project.id} className="bg-bg-surface whisper-border rounded-[14px] hover:-translate-y-1 transition-all duration-400 flex flex-col">
                <div className="w-full">
                  <ProjectImageCarousel 
                    images={project.images || (project.image ? [project.image] : [])} 
                    projectName={project.name} 
                  />
                </div>
                <Link to={`/projects#${project.id}`} className="block p-xl lg:flex items-start gap-2xl group/link hover:bg-white/5 transition-colors flex-1 rounded-b-[14px]">
                  <div className="hidden lg:block lg:w-1/12">
                    <span className="font-label-mono text-label-mono text-primary">0{idx + 1}.</span>
                  </div>
                  <div className="lg:w-11/12 space-y-md">
                    <h3 className="font-card-title text-card-title text-text-primary group-hover/link:text-primary transition-colors">{project.name}</h3>
                    <p className="font-body-main text-body-main text-text-secondary">{project.description}</p>
                    <div className="flex flex-wrap gap-xs">
                      {project.techStack.slice(0, 4).map(topic => (
                        <span key={topic} className="px-3 py-1 bg-accent-bg border border-[rgba(124,58,237,0.1)] rounded-md font-label-mono text-label-mono text-primary uppercase">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </InteractiveHoverCard>
            ))}
        </div>
      </RevealSection>



      <section id="resume" className="py-4xl max-w-max-width mx-auto px-lg">
        <RevealFx>
          <h2 className="font-section-heading text-section-heading text-text-primary mb-2xl">Professional Trajectory</h2>
        </RevealFx>
        <div className="relative border-l border-whisper ml-4 pl-8 space-y-xl">
          {resumeData.experience.map((exp, idx) => (
            <TimelineBox key={exp.id} item={exp} isFirst={idx === 0} />
          ))}
          {resumeData.education.map((edu, idx) => (
            <TimelineBox key={edu.id} item={edu} isFirst={resumeData.experience.length === 0 && idx === 0} />
          ))}
        </div>
      </section>
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
