import { useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { FiMail as Mail, FiLinkedin as Linkedin, FiGithub as Github, FiMapPin as MapPin, FiArrowUpRight as ArrowUpRight } from 'react-icons/fi';
import { contactMethods } from '../data/contact';
import { profile } from '../data/profile';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

function HoverContactCard({ children, className = '', href, target }: { children: React.ReactNode, className?: string, href?: string, target?: string }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const content = (
    <>
      <div className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100" 
           style={{ background: 'radial-gradient(circle at var(--x) var(--y), rgba(124, 58, 237, 0.15), transparent 50%)' }} />
      <div className="relative z-10 w-full flex flex-col h-full justify-between gap-xl">
        {children}
      </div>
    </>
  );

  const wrapperClasses = `group block p-xl rounded-xl bg-bg-surface whisper-border relative overflow-hidden transition-all duration-400 hover:border-border-hover ${className}`;
  const inlineStyles = {
    '--x': `${mousePos.x}px`,
    '--y': `${mousePos.y}px`,
  } as React.CSSProperties;

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined} className={wrapperClasses} onMouseMove={handleMouseMove} style={inlineStyles}>
        {content}
      </a>
    );
  }

  return (
    <div className={wrapperClasses} onMouseMove={handleMouseMove} style={inlineStyles}>
      {content}
    </div>
  );
}

const iconMap: Record<string, React.ReactNode> = {
  'Email': <Mail className="w-8 h-8" strokeWidth={1.5} />,
  'LinkedIn': <Linkedin className="w-8 h-8" strokeWidth={1.5} />,
  'GitHub': <Github className="w-8 h-8" strokeWidth={1.5} />,
  'Location': <MapPin className="w-8 h-8" strokeWidth={1.5} />,
};

export default function Contact() {
  return (
    <motion.main 
      className="pt-[120px] pb-4xl px-lg max-w-max-width mx-auto min-h-screen"
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.1 } }
      }}
    >
      {/* Section Header */}
      <motion.div variants={fadeUpVariants} className="flex flex-col items-center text-center mb-3xl">
        <div className="flex items-center gap-sm bg-accent-bg px-md py-xs rounded-full border border-border-whisper mb-md">
          <span className="relative flex h-2 w-2">
            {profile.availability && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${profile.availability ? 'bg-primary-container' : 'bg-text-muted'}`}></span>
          </span>
          <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest">
            {profile.availability ? 'Available for hire' : 'Unavailable for hire'}
          </span>
        </div>
        <h1 className="font-section-heading text-section-heading md:text-hero-heading md:font-hero-heading tracking-tight mb-sm text-text-primary">Contact</h1>
        <p className="text-text-secondary font-body-main text-body-main max-w-[600px]">
          I’m currently open to new opportunities and collaborations. Reach out via any of the platforms below.
        </p>
      </motion.div>

      {/* Contact Grid */}
      <motion.div variants={fadeUpVariants} className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-lg">
        {contactMethods.map((method) => (
          <HoverContactCard 
            key={method.name}
            href={method.url || undefined}
            target={method.url && !method.url.startsWith('mailto:') ? '_blank' : undefined}
          >
            <div className="flex justify-between items-start">
              <div className="p-md rounded-lg bg-accent-bg border border-border-whisper text-primary">
                {iconMap[method.name]}
              </div>
              {method.url && (
                <ArrowUpRight className="text-text-muted group-hover:text-primary transition-colors duration-250 transform group-hover:translate-x-1 group-hover:-translate-y-1 w-6 h-6" strokeWidth={1.5} />
              )}
            </div>
            <div>
              <h3 className="font-card-title text-card-title text-text-primary mb-xs">{method.name}</h3>
              <p className="font-label-mono text-label-mono text-text-secondary">{method.value}</p>
            </div>
          </HoverContactCard>
        ))}
      </motion.div>
    </motion.main>
  );
}
