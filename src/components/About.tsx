import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Card } from './ui/Card';
import { profile } from '../data/profile';
import styles from './About.module.css';

export const About = () => {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="about" className={styles.about}>
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Bio text */}
        <div className={styles.content}>
          <h2 className={styles.title}>About Me</h2>
          {profile.bio.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Quick Stats Grid */}
        <div className={styles.statsGrid}>
          <Card variant="stat" interactive>
            <h3 style={{ fontSize: '3rem', margin: 0, fontFamily: 'Geist, sans-serif' }}>
              {profile.stats.yearsOfCoding}+
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Years Coding</p>
          </Card>
          
          <Card variant="stat" interactive>
            <h3 style={{ fontSize: '3rem', margin: 0, fontFamily: 'Geist, sans-serif' }}>
              {profile.stats.projectsBuilt}+
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Projects Built</p>
          </Card>

          <Card variant="stat" interactive>
            <h3 style={{ fontSize: '3rem', margin: 0, fontFamily: 'Geist, sans-serif' }}>
              {profile.stats.technologiesUsed}+
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Technologies</p>
          </Card>

          <Card variant="stat" interactive>
            <h3 style={{ fontSize: '3rem', margin: 0, fontFamily: 'Geist, sans-serif' }}>
              {profile.stats.keyMetric.value}
            </h3>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{profile.stats.keyMetric.label}</p>
          </Card>
        </div>
      </motion.div>
    </section>
  );
};
