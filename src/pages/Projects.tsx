import { useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectImageCarousel from '../components/ProjectImageCarousel';
import { RevealGroup, RevealItem } from '../components/ui/RevealFx';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }
};

function HoverProjectCard({ children, className = '', id }: { children: React.ReactNode, className?: string, id?: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.article 
      id={id}
      variants={fadeUpVariants}
      className={`relative group bg-bg-surface border border-whisper rounded-xl p-xl overflow-hidden hover:-translate-y-1 transition-all duration-400 hover:border-border-hover md:p-2xl scroll-mt-32 ${className}`}
      onMouseMove={handleMouseMove}
      style={{
        '--x': `${mousePos.x}%`,
        '--y': `${mousePos.y}%`,
      } as React.CSSProperties}
    >
      <div className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100" 
           style={{ background: 'radial-gradient(circle at var(--x) var(--y), rgba(124, 58, 237, 0.08) 0%, transparent 40%)' }} />
      <div className="relative z-10 w-full">
        {children}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <RevealGroup 
      className="max-w-max-width mx-auto px-lg pt-16 pb-4xl"
      staggerDelay={0.1}
    >
      <div className="flex flex-col gap-xl lg:gap-2xl relative">
        <div className="space-y-xl w-full">
          <div className="mb-2xl flex flex-col items-center">
            <RevealItem>
              <h1 className="font-hero-heading text-center text-hero-heading-mobile md:text-hero-heading text-text-primary mb-md">
                Projects
              </h1>
            </RevealItem>
          </div>

          {projects.map((project) => (
              <HoverProjectCard key={project.id} id={project.id}>
                <div className="flex justify-between items-start mb-lg">
                  <div>
                    <h2 className="font-card-title text-card-title text-text-primary group-hover:text-primary transition-colors">{project.name}</h2>
                  </div>
                </div>
                
                <div className="w-full mb-lg">
                  <ProjectImageCarousel 
                    images={project.images || (project.image ? [project.image] : [])} 
                    projectName={project.name} 
                  />
                </div>
                
                <p className="font-body-main text-body-main text-text-secondary mb-lg">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-xs mb-xl">
                  {project.techStack.map(topic => (
                    <span key={topic} className="bg-accent-bg px-sm py-xs rounded font-label-mono text-label-mono text-secondary uppercase">
                      {topic}
                    </span>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-md">
                  {project.demoUrl && project.demoUrl !== '#' && (
                    <a className="px-lg py-2 bg-primary-container text-on-primary-container font-label-mono text-label-mono rounded-lg hover:brightness-110 transition-all flex items-center gap-xs" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Rocket className="w-4 h-4" strokeWidth={1.5} />
                      LIVE DEMO
                    </a>
                  )}
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a className="px-lg py-2 border border-whisper text-text-secondary font-label-mono text-label-mono rounded-lg hover:border-hover hover:text-text-primary transition-all flex items-center gap-xs" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Code className="w-4 h-4" strokeWidth={1.5} />
                      SOURCE
                    </a>
                  )}
                </div>
              </HoverProjectCard>
            ))}
        </div>
      </div>
    </RevealGroup>
  );
}
