import React from 'react';
import styles from './Card.module.css';

type CardVariant = 'default' | 'project' | 'stat';

interface CardProps {
  variant?: CardVariant;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Card = ({
  variant = 'default',
  interactive = false,
  className = '',
  children,
}: CardProps) => {
  const combinedClassName = [
    styles.card,
    styles[variant],
    interactive ? styles.interactive : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName}>
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
};
