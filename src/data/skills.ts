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
      { name: "TypeScript", level: "core" },
      { name: "JavaScript", level: "core" },
      { name: "Python", level: "proficient" },
      { name: "HTML", level: "core" },
      { name: "CSS", level: "core" },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: "core" },
      { name: "Next.js", level: "proficient" },
      { name: "Vite", level: "core" },
      { name: "CSS Modules", level: "core" },
      { name: "Framer Motion", level: "proficient" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: "proficient" },
      { name: "Express", level: "proficient" },
      { name: "REST APIs", level: "core" },
    ],
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Git", level: "core" },
      { name: "GitHub", level: "core" },
      { name: "Vercel", level: "proficient" },
      { name: "VS Code", level: "core" },
    ],
  },
];
