import { Card } from './ui/Card';
import { profile } from '../data/profile';
import { FadeIn } from './ui/FadeIn';
import styles from './About.module.css';

export const About = () => {
  return (
    <section id="about" className={styles.about}>
      <FadeIn className={styles.grid}>
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
      </FadeIn>
    </section>
  );
};
