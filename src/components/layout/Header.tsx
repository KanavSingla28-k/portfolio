import { Link } from 'react-router-dom';
import { Terminal } from 'lucide-react';
import { profile } from '../../data/profile';

export default function Header() {
  const initials = profile.name.split(' ').map((n) => n[0]).join('');

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-whisper bg-overlay">
      <nav className="max-w-max-width mx-auto flex justify-between items-center px-lg py-md">
        <Link className="font-hero-heading text-card-title font-bold text-primary" to="/">
          {initials}
        </Link>
        <div className="hidden md:flex items-center gap-xl">
          <Link className="font-body-main text-body-main text-text-secondary hover:text-text-primary transition-colors duration-150" to="/about">About</Link>
          <Link className="font-body-main text-body-main text-text-secondary hover:text-text-primary transition-colors duration-150" to="/projects">Projects</Link>
          <a className="font-body-main text-body-main text-text-secondary hover:text-text-primary transition-colors duration-150" href={profile.links.resume} target="_blank" rel="noopener noreferrer">Resume</a>
          <Link className="font-body-main text-body-main text-text-secondary hover:text-text-primary transition-colors duration-150" to="/contact">Contact</Link>
        </div>
        <div className="flex items-center gap-md">
          <button className="p-2 rounded-lg whisper-border hover:bg-accent-bg transition-all duration-250">
            <Terminal className="text-primary w-6 h-6" strokeWidth={1.5} />
          </button>
        </div>
      </nav>
    </header>
  );
}
