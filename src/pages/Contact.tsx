import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail as Mail, FiLinkedin as Linkedin, FiGithub as Github, FiMapPin as MapPin, FiArrowUpRight as ArrowUpRight } from 'react-icons/fi';
import { contactMethods } from '../data/contact';
import { profile } from '../data/profile';
import { InteractiveHoverCard } from '../components/ui/InteractiveHoverCard';
import { Button } from '../components/ui/Button';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

// Removed local HoverContactCard in favor of InteractiveHoverCard

const iconMap: Record<string, React.ReactNode> = {
  'Email': <Mail className="w-8 h-8" strokeWidth={1.5} />,
  'LinkedIn': <Linkedin className="w-8 h-8" strokeWidth={1.5} />,
  'GitHub': <Github className="w-8 h-8" strokeWidth={1.5} />,
  'Location': <MapPin className="w-8 h-8" strokeWidth={1.5} />,
};

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('loading');
    
    try {
      const formspreeEndpoint = import.meta.env.FORMSPREE_ENDPOINT;
      if (!formspreeEndpoint) {
        console.error('Formspree endpoint is not configured.');
        setStatus('error');
        return;
      }

      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setStatus('idle');
  };

  return (
    <motion.section 
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
        <h1 className="font-section-heading text-section-heading md:text-hero-heading md:font-hero-heading mb-sm text-text-primary">Contact</h1>
        <p className="text-text-secondary font-body-main text-body-main max-w-[600px]">
          I’m currently open to new opportunities and collaborations. Reach out via any of the platforms below.
        </p>
      </motion.div>

      {/* Contact Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2xl">
        {/* Contact Grid */}
        <motion.div variants={fadeUpVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-lg h-fit">
          {contactMethods.map((method) => {
            const innerContent = (
              <>
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
              </>
            );

            const commonProps = {
              className: "block p-xl rounded-xl bg-bg-surface whisper-border hover:border-border-hover transition-all duration-400 h-full flex flex-col justify-between gap-xl",
              gradientStyle: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(124, 58, 237, 0.15), transparent 50%)"
            };

            return method.url ? (
              <InteractiveHoverCard
                key={method.name}
                as="a"
                href={method.url}
                target={!method.url.startsWith('mailto:') ? '_blank' : undefined}
                rel={!method.url.startsWith('mailto:') ? 'noopener noreferrer' : undefined}
                {...commonProps}
              >
                {innerContent}
              </InteractiveHoverCard>
            ) : (
              <InteractiveHoverCard key={method.name} as="div" {...commonProps}>
                {innerContent}
              </InteractiveHoverCard>
            );
          })}
        </motion.div>

        {/* Contact Form */}
        <motion.div variants={fadeUpVariants} className="p-xl rounded-xl bg-bg-surface whisper-border relative h-fit">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center text-center h-full py-2xl space-y-md">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center text-success mb-2">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Message Sent!</h3>
              <p className="text-text-secondary">Thanks for reaching out. I'll get back to you shortly.</p>
              <Button 
                onClick={() => setStatus('idle')}
                variant="surface"
                className="mt-4"
              >
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-lg">
              <div>
                <h3 className="text-xl font-bold text-text-primary mb-2">Send a message</h3>
                <p className="text-text-secondary text-sm mb-6">Fill out the form below and I'll respond as soon as I can.</p>
                {status === 'error' && (
                  <div className="bg-danger/10 border border-danger/20 text-danger p-3 rounded-lg text-sm mb-6">
                    Failed to send message. Please try again later.
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-text-primary">Name <span className="text-primary">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background border border-whisper rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                  placeholder="Kanav Singla"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-text-primary">Email <span className="text-primary">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-background border border-whisper rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors"
                  placeholder="kanav@example.com"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-sm font-medium text-text-primary">Message <span className="text-primary">*</span></label>
                <textarea 
                  id="message" 
                  name="message" 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-background border border-whisper rounded-lg px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <Button 
                type="submit" 
                disabled={status === 'loading'}
                variant="primary"
              >
                {status === 'loading' ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}
