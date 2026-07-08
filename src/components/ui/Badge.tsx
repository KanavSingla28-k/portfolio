import React from 'react';
import styles from './Badge.module.css';

export type BadgeVariant = 'availability' | 'tech' | 'category';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pulse?: boolean;
}

export const Badge = ({
  variant = 'tech',
  pulse = false,
  className = '',
  style,
  children,
  ...props
}: BadgeProps) => {
  const combinedClassName = [
    styles.badge,
    styles[variant],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={combinedClassName} style={style} {...props}>
      {pulse && <span className={`${styles.dot} ${styles.pulse}`} aria-hidden="true" />}
      {children}
    </span>
  );
};
