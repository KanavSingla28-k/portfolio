import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { profile } from '../data/profile';
import styles from './Hero.module.css';

export const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.heroBg} aria-hidden="true" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {profile.availability && (
          <motion.div variants={itemVariants} className={styles.availabilityWrapper}>
            <Badge variant="availability" pulse>
              Available for opportunities
            </Badge>
          </motion.div>
        )}

        <motion.h1 variants={itemVariants} className={styles.heading}>
          Hello, I'm {profile.name.split(' ')[0]}.<br />
          <span className={styles.highlight}>{profile.tagline}</span>
        </motion.h1>

        <motion.p variants={itemVariants} className={styles.tagline}>
          Software Engineer building scalable web applications and cloud-native systems.
        </motion.p>

        <motion.div variants={itemVariants} className={styles.actions}>
          <Button variant="primary" href="#projects">
            View Projects →
          </Button>
          <Button variant="ghost" href={profile.links.resume} target="_blank" rel="noopener noreferrer">
            Download Resume
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};
