import styles from './SkeletonLoader.module.css';

interface SkeletonLoaderProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  borderRadius?: string | number;
}

export const SkeletonLoader = ({
  width = '100%',
  height = '100%',
  className = '',
  borderRadius,
}: SkeletonLoaderProps) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        height,
        ...(borderRadius ? { borderRadius } : {}),
      }}
      aria-hidden="true"
    />
  );
};
