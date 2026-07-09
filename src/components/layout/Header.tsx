import { Link, NavLink } from 'react-router-dom';

import { profile } from '../../data/profile';

export default function Header() {

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-whisper bg-overlay">
      <nav className="max-w-max-width mx-auto flex items-center px-lg py-md">
        <div className="flex-1 flex justify-start">
          <Link className="flex items-center" to="/">
            <img src="/icon.png" alt="Logo" className="w-8 h-auto" />
          </Link>
        </div>
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
      </nav>
    </header>
  );
}
