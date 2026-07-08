// import React from 'react';
import type { TimelineItem } from '../../types/resume';
import styles from './Timeline.module.css';

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  return (
    <div className={styles.timeline}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
          <div className={styles.header}>
            <h4 className={styles.title}>
              {item.title} <span className={styles.org}>@ {item.organization}</span>
            </h4>
            <span className={styles.period}>{item.period}</span>
          </div>
          
          {item.description && (
            <p className={styles.description}>{item.description}</p>
          )}

          {item.highlights && item.highlights.length > 0 && (
            <ul className={styles.highlights}>
              {item.highlights.map((highlight, i) => (
                <li key={i} className={styles.highlightItem}>
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};
