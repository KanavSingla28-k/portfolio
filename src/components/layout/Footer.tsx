import { FiMail as Mail, FiFileText as FileText, FiGithub as Github, FiLinkedin as Linkedin } from 'react-icons/fi';
import { profile } from '../../data/profile';

export default function Footer() {
  return (
    <footer className="w-full py-xl px-lg border-t border-whisper mt-4xl">
      <div className="max-w-max-width mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
        <span className="font-label-mono text-label-mono text-text-muted">© {new Date().getFullYear()} / {profile.name}</span>
        <div className="flex items-center gap-xl">
          <a aria-label="Email" className="text-text-muted hover:text-text-primary transition-colors" href={`mailto:${profile.email}`}>
            <Mail className="w-5 h-5" strokeWidth={1.5} />
          </a>
          <a aria-label="Resume" className="text-text-muted hover:text-text-primary transition-colors" href={profile.links.resume}>
            <FileText className="w-5 h-5" strokeWidth={1.5} />
          </a>
          <a aria-label="GitHub" className="text-text-muted hover:text-text-primary transition-colors" href={profile.links.github} target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5" strokeWidth={1.5} />
          </a>
          <a aria-label="LinkedIn" className="text-text-muted hover:text-text-primary transition-colors" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
