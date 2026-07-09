import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import { skills } from '../data/skills';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

export default function About() {
  return (
    <main className="relative z-10 pt-16 pb-4xl max-w-max-width mx-auto px-lg min-h-screen flex flex-col lg:flex-row gap-2xl items-start">
      {/* Left Column: Bio */}
      <motion.section 
        className="lg:w-[60%]"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.h1 variants={fadeUpVariants} className="font-hero-heading text-hero-heading mb-xl leading-none">
          {profile.name}
        </motion.h1>
        
        <motion.p variants={fadeUpVariants} className="font-body-main text-body-lg text-text-secondary mb-lg">
          Full-Stack Developer | ML Engineer
        </motion.p>
        
        <div className="space-y-md font-body-main text-body-main text-text-secondary max-w-prose">
          {profile.bio.map((paragraph, idx) => (
            <motion.p key={idx} variants={fadeUpVariants}>
              {idx === 0 ? (
                <>I am a systems architect and developer driven by a single core principle: technical perfection. My approach, which I call <span className="text-primary font-medium">"Obsidian Precision,"</span> is characterized by architectural rigor and an obsessive focus on the minute details that separate good software from exceptional engineering. {paragraph}</>
              ) : (
                paragraph
              )}
            </motion.p>
          ))}
          <motion.p variants={fadeUpVariants}>
            Every line of code I write is a commitment to longevity and craftsmanship. Whether I'm orchestrating complex cloud deployments or refining a micro-interaction, I treat every project as a proof of craft—a testament to the belief that software should be as beautiful internally as it is externally.
          </motion.p>
        </div>

        {/* Visual Separator / Image Integration */}
        <motion.div variants={fadeUpVariants} className="mt-2xl rounded-xl overflow-hidden whisper-border h-64 w-full relative">
          <img 
            className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
            alt={`${profile.name} workstation placeholder`} 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200&h=800"
          />
        </motion.div>
      </motion.section>

      {/* Right Column: Skills Grid */}
      <motion.aside 
        className="lg:w-[40%] w-full"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="bg-surface/50 whisper-border p-lg rounded-xl">
          <h3 className="font-card-title text-card-title text-text-primary mb-md">Technical Foundation</h3>
          
          <div className="space-y-lg overflow-y-auto pr-sm" style={{ maxHeight: '600px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(124, 58, 237, 0.3) transparent' }}>
            {skills.map((group) => (
              <div key={group.category}>
                <h4 className="font-label-mono text-label-mono text-text-muted mb-sm uppercase tracking-wider">{group.category}</h4>
                <div className="flex flex-wrap gap-sm">
                  {group.items.map(item => (
                    <span 
                      key={item.name} 
                      className="bg-accent-bg text-primary px-sm py-1 rounded-[6px] font-label-mono text-[10px] border border-primary/10"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>
    </main>
  );
}
