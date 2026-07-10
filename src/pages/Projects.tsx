
import { motion } from 'framer-motion';
import { Rocket, Code } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectImageCarousel from '../components/ProjectImageCarousel';
import { RevealGroup, RevealItem } from '../components/ui/RevealFx';
import { InteractiveHoverCard } from '../components/ui/InteractiveHoverCard';
import { Button } from '../components/ui/Button';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } }
};

// Removed local HoverProjectCard in favor of InteractiveHoverCard

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
              <InteractiveHoverCard 
                key={project.id} 
                id={project.id}
                as={motion.article}
                variants={fadeUpVariants}
                className="bg-bg-surface border border-whisper rounded-xl p-xl hover:-translate-y-1 transition-all duration-400 hover:border-border-hover md:p-2xl scroll-mt-32"
                usePercentage={true}
                gradientStyle="radial-gradient(circle at var(--x) var(--y), rgba(124, 58, 237, 0.08) 0%, transparent 40%)"
              >
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
                    <Button as="a" variant="primary-container" href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Rocket className="w-4 h-4" strokeWidth={1.5} />
                      LIVE DEMO
                    </Button>
                  )}
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <Button as="a" variant="outline" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Code className="w-4 h-4" strokeWidth={1.5} />
                      SOURCE
                    </Button>
                  )}
                </div>
              </InteractiveHoverCard>
            ))}
        </div>
      </div>
    </RevealGroup>
  );
}
