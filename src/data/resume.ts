import type { ResumeData } from '../types/resume';

export const resumeData: ResumeData = {
  experience: [
    {
      id: "exp-1",
      title: "Business Analyst Intern",
      organization: "Outlook Publishing India",
      period: "May 2025 – July 2025",
      description: "Automated reporting and analyzed customer datasets.",
      highlights: [
        "Built interactive Power BI dashboards for subscriber, revenue, and campaign analytics, automating weekly reporting and reducing report preparation time from 2 hours to 40 minutes.",
        "Analyzed customer and sales datasets to identify growth opportunities, presenting actionable insights through visualizations that supported marketing strategy and business planning.",
      ],
    },
  ],
  education: [
    {
      id: "edu-1",
      title: "B.Tech in Computer Science and Data Science (CSDS)",
      organization: "NSUT (Main Campus), New Delhi",
      period: "2023 - 2027",
      highlights: [
        "CGPA: 7.94",
        "Course Work: Data Structures & Algorithms, OOPs, Computer Networks, Operating Systems, DBMS",
      ],
    },
    {
      id: "edu-2",
      title: "CBSE (Class XII)",
      organization: "Siddhartha Public School, Delhi",
      period: "2023",
      highlights: [
        "Percentage: 90.8%",
      ],
    },
    {
      id: "edu-3",
      title: "CBSE (Class X)",
      organization: "Tagore Public School, Haryana",
      period: "2021",
      highlights: [
        "Percentage: 94.6%",
      ],
    },
  ],
};
