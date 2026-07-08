import React from 'react';
import styles from './Card.module.css';

type CardVariant = 'default' | 'project' | 'stat';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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
  ...props
}: CardProps) => {
  const combinedClassName = [
    styles.card,
    styles[variant],
    interactive ? styles.interactive : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName} {...props}>
      <div className={styles.cardContent}>
        {children}
      </div>
    </div>
  );
};
