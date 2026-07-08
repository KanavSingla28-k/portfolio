export const MOTION = {
  FAST: 0.15,
  NORMAL: 0.25,
  SLOW: 0.4,
  EASE: [0.16, 1, 0.3, 1], // Standard springy ease out
} as const;

// Reusable transition configurations
export const transitions = {
  default: {
    duration: MOTION.NORMAL,
    ease: MOTION.EASE,
  },
  slow: {
    duration: MOTION.SLOW,
    ease: MOTION.EASE,
  },
  fast: {
    duration: MOTION.FAST,
    ease: MOTION.EASE,
  },
};
