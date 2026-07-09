// Skill proficiency levels — optional, used only where granularity adds value.
// Leave 'level' undefined if you don't want to show tiers for a skill.
export type SkillLevel = 'core' | 'proficient' | 'familiar';

export interface SkillItem {
  name: string;
  level?: SkillLevel;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

// Placeholder — replace with real skills and optionally set 'level' per item.
// The UI renders 'core' skills with a slightly brighter badge, 'proficient' normal,
// 'familiar' slightly muted — when levels are present. All undefined = no visual diff.
export const skills: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "C++", level: "core" },
      { name: "Python", level: "core" },
      { name: "TypeScript", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "SQL", level: "proficient" },
    ],
  },
  {
    category: "Backend & APIs",
    items: [
      { name: "FastAPI", level: "core" },
      { name: "Node.js", level: "core" },
      { name: "Express.js", level: "proficient" },
      { name: "REST API", level: "core" },
      { name: "JWT Auth", level: "proficient" },
    ],
  },
  {
    category: "AI/ML",
    items: [
      { name: "OpenAI API", level: "core" },
      { name: "DeepSeek", level: "proficient" },
      { name: "RAG", level: "core" },
      { name: "Embeddings", level: "proficient" },
      { name: "OCR Pipelines", level: "familiar" },
    ],
  },
  {
    category: "Databases",
    items: [
      { name: "PostgreSQL", level: "core" },
      { name: "pgvector", level: "proficient" },
      { name: "MongoDB", level: "core" },
      { name: "MySQL", level: "proficient" },
      { name: "Redis", level: "core" },
    ],
  },
  {
    category: "Async & Queues",
    items: [
      { name: "Redis Queue (RQ)", level: "proficient" },
      { name: "BullMQ", level: "proficient" },
      { name: "Async Processing", level: "core" },
    ],
  },
  {
    category: "DevOps & Testing",
    items: [
      { name: "AWS", level: "core" },
      { name: "Docker", level: "core" },
      { name: "GitHub Actions", level: "proficient" },
      { name: "Prometheus", level: "familiar" },
      { name: "Grafana", level: "familiar" },
      { name: "Pytest", level: "proficient" },
    ],
  },
  {
    category: "Course Work",
    items: [
      { name: "DSA", level: "core" },
      { name: "OOPs", level: "core" },
      { name: "Computer Networks", level: "familiar" },
      { name: "Operating Systems", level: "familiar" },
      { name: "DBMS", level: "core" },
    ],
  },
];
