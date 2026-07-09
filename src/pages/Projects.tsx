import { useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code } from 'lucide-react';
import { useGitHubProjects } from '../hooks/useGitHubProjects';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

function HoverProjectCard({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.article 
      variants={fadeUpVariants}
      className={`relative group bg-bg-surface border border-whisper rounded-xl p-xl overflow-hidden hover:-translate-y-1 transition-all duration-400 hover:border-border-hover md:p-2xl ${className}`}
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
  const { data: projectsData, isLoading } = useGitHubProjects();

  return (
    <motion.div 
      className="max-w-max-width mx-auto px-lg pt-16 pb-4xl"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
    >
      <div className="flex flex-col gap-xl lg:gap-2xl relative">
        <div className="space-y-xl w-full">
          <div className="mb-2xl flex flex-col items-center">
            <motion.h1 variants={fadeUpVariants} className="font-hero-heading text-center text-hero-heading-mobile md:text-hero-heading text-text-primary mb-md">
              Projects
            </motion.h1>
          </div>

          {isLoading ? (
            <div className="text-center text-text-muted">Loading projects...</div>
          ) : (
            projectsData?.map((project, idx) => (
              <HoverProjectCard key={project.repo}>
                <div className="flex justify-between items-start mb-lg">
                  <div>
                    <span className="font-label-mono text-label-mono text-primary block mb-xs">PROJECT / {String(idx + 1).padStart(3, '0')}</span>
                    <h2 className="font-card-title text-card-title text-text-primary group-hover:text-primary transition-colors">{project.name}</h2>
                  </div>
                  <span className="font-label-mono text-label-mono text-text-muted">{project.stars} ★</span>
                </div>
                
                <div className="aspect-video w-full bg-surface-container-low rounded-lg mb-lg border border-whisper overflow-hidden relative">
                  <img 
                    alt={project.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    src={project.image || `https://via.placeholder.com/1200x675/111113/7c3aed?text=${project.name}`} 
                  />
                </div>
                
                <p className="font-body-main text-body-main text-text-secondary mb-lg">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-xs mb-xl">
                  {project.topics.map(topic => (
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
                  <a className="px-lg py-2 border border-whisper text-text-secondary font-label-mono text-label-mono rounded-lg hover:border-hover hover:text-text-primary transition-all flex items-center gap-xs" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Code className="w-4 h-4" strokeWidth={1.5} />
                    SOURCE
                  </a>
                </div>
              </HoverProjectCard>
            ))
          )}
        </div>
      </div>
    </motion.div>
  );
}
