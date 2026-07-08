import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position and determine if the user has scrolled past a certain threshold.
 * @param threshold The scroll Y value in pixels to trigger the scrolled state (default: 20px)
 */
export const useScrollPosition = (threshold = 20) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};
