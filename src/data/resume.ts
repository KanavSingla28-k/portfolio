import type { ResumeData } from '../types/resume';

export const resumeData: ResumeData = {
  experience: [
    {
      id: "exp-1",
      title: "Backend Engineer",
      organization: "Open Source Contributor",
      period: "2023 - Present",
      description: "Architected scalable backend systems and contributed to indexing and parsing logic.",
      highlights: [
        "Reduced response times by optimizing database queries.",
        "Implemented robust REST APIs.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      title: "B.Tech Computer Science",
      organization: "University",
      period: "2022 - 2026",
      highlights: [
        "Specializing in Software Engineering and Cloud Computing.",
        "Active member of the programming club.",
      ],
    },
  ],
};
