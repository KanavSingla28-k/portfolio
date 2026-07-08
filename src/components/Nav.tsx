import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { useScrollPosition } from '../hooks/useScrollPosition';
import styles from './Nav.module.css';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export const Nav = () => {
  const isScrolled = useScrollPosition(20);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // We use standard <a> tags with href="#hash" since this is a single page portfolio for now.
  // If moving to multi-page, replace <a> with react-router-dom <NavLink>.

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.nav}>
        {/* Logo Monogram */}
        <a href="#top" className={styles.logo}>
          KS
        </a>

        {/* Desktop Links */}
        <div className={styles.links}>
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className={styles.link}>
              {item.label}
            </a>
          ))}
          <Button variant="icon" title="Open Terminal">
            {'>_'}
          </Button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button 
          className={styles.hamburger}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
            ) : (
              <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className={styles.mobileMenu}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className={styles.mobileLinks}>
              {navItems.map((item) => (
                <a 
                  key={item.label} 
                  href={item.href} 
                  className={styles.mobileLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className={styles.mobileTerminalBtn}>
                <Button variant="icon" style={{ width: '100%' }}>
                  {'>_'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
