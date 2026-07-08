export interface TimelineItem {
  id: string;
  title: string;          // e.g. "Software Engineer" or "B.Tech Computer Science"
  organization: string;   // e.g. "Google" or "University Name"
  period: string;         // e.g. "2024 - Present"
  location?: string;
  description?: string;
  highlights?: string[];
  logoUrl?: string;       // Path to logo in /public
  link?: string;
}

export interface ResumeData {
  experience: TimelineItem[];
  education: TimelineItem[];
  certifications?: TimelineItem[];
}
