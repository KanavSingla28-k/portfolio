import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { FocusTrap } from 'focus-trap-react';

import { profile } from '../../data/profile';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = () => {
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-whisper bg-overlay">
      <nav className="max-w-max-width mx-auto flex items-center px-lg py-md relative">
        <div className="flex-1 flex justify-start">
          <Link className="flex items-center" to="/" onClick={handleHomeClick} aria-label="Home">
            <img src="/icon.png" alt="Logo" className="w-8 h-auto" />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-xl">
          <NavLink 
            className={({ isActive }) => `font-body-main text-body-main transition-colors duration-150 ${isActive ? 'text-text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}`} 
            to="/about"
          >
            About
          </NavLink>
          <NavLink 
            className={({ isActive }) => `font-body-main text-body-main transition-colors duration-150 ${isActive ? 'text-text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}`} 
            to="/projects"
          >
            Projects
          </NavLink>
          <a className="font-body-main text-body-main text-text-secondary hover:text-text-primary transition-colors duration-150" href={profile.links.resume} target="_blank" rel="noopener noreferrer">Resume</a>
          <NavLink 
            className={({ isActive }) => `font-body-main text-body-main transition-colors duration-150 ${isActive ? 'text-text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}`} 
            to="/contact"
          >
            Contact
          </NavLink>
        </div>

        <div className="flex-1 hidden md:block"></div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center justify-end">
          <button 
            onClick={toggleMobileMenu} 
            className="text-text-primary hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1"
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <FocusTrap
            focusTrapOptions={{
              clickOutsideDeactivates: true,
              onDeactivate: closeMobileMenu,
            }}
          >
            <div className="absolute top-full left-0 w-full bg-surface border-b border-whisper shadow-xl md:hidden py-lg px-xl flex flex-col gap-lg animate-in slide-in-from-top-4 fade-in duration-200">
              <NavLink 
                className={({ isActive }) => `block font-body-main text-body-lg transition-colors duration-150 ${isActive ? 'text-text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}`} 
                to="/about"
                onClick={closeMobileMenu}
              >
                About
              </NavLink>
              <NavLink 
                className={({ isActive }) => `block font-body-main text-body-lg transition-colors duration-150 ${isActive ? 'text-text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}`} 
                to="/projects"
                onClick={closeMobileMenu}
              >
                Projects
              </NavLink>
              <a 
                className="block font-body-main text-body-lg text-text-secondary hover:text-text-primary transition-colors duration-150" 
                href={profile.links.resume} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
              >
                Resume
              </a>
              <NavLink 
                className={({ isActive }) => `block font-body-main text-body-lg transition-colors duration-150 ${isActive ? 'text-text-primary font-bold' : 'text-text-secondary hover:text-text-primary'}`} 
                to="/contact"
                onClick={closeMobileMenu}
              >
                Contact
              </NavLink>
            </div>
          </FocusTrap>
        )}
      </nav>
    </header>
  );
}
