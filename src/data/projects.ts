import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    id: "pdftalk",
    name: "PDFTalk",
    description: "A production-grade SaaS for intelligent document interaction. Upload, chat, and extract insights from your PDFs using RAG and advanced OCR.",
    techStack: ["FastAPI", "PostgreSQL", "pgvector", "Redis", "RQ", "OpenAI", "Next.js 16", "TypeScript", "AWS S3", "Docker"],
    githubUrl: "https://github.com/KanavSingla28-k/PDFTalk",
    demoUrl: "https://pdftalk.kanavsingla.fyi/",
    image: "/portfolio-content/pdftalk/pdftalk.png",
    images: [
      "/portfolio-content/pdftalk/pdftalk.png",
      "/portfolio-content/pdftalk/pdftalk-1.png",
      "/portfolio-content/pdftalk/pdftalk-2.png",
      "/portfolio-content/pdftalk/pdftalk-3.png",
      "/portfolio-content/pdftalk/pdftalk-4.png"
    ],
    featured: true,
    order: 1,
  },
  {
    id: "Resumint",
    name: "Resumint",
    description: "Architected a modular backend using domain, application, and infrastructure layers with dependency injection, enabling LLM providers to be replaced without modifying logic.",
    techStack: ["Next.js 16", "TypeScript", "Hono", "Prisma", "PostgreSQL", "BullMQ", "Redis", "DeepSeek LLM", "Better-Auth", "Zustand", "Render", "Vercel"],
    githubUrl: "https://github.com/DushyantBhardwaj2/resumeDatabase",
    demoUrl: "https://resume-database.vercel.app/",
    image: "/portfolio-content/resumint/resumint.png",
    images: [
      "/portfolio-content/resumint/resumint.png",
      "/portfolio-content/resumint/resumint-1.png",
      "/portfolio-content/resumint/resumint-2.png",
      "/portfolio-content/resumint/resumint-3.jpeg",
      "/portfolio-content/resumint/resumint-4.jpeg"
    ],
    featured: true,
    order: 2,
  },
  {
    id: "Fuzzy-Monotonic-LightGBM-for-Explainable-Credit-Default-Prediction",
    name: "Fuzzy Monotonic LightGBM for Explainable Credit Default Prediction",
    description: "Hybrid fuzzy-monotonic LightGBM framework for transparent, regulator-friendly credit default prediction. Combines linguistic fuzzy rules, economic monotonic constraints, and boosted models to deliver calibrated, explainable, high-performance credit-risk scoring.",
    techStack: ["Python", "LightGBM", "XGBoost", "Scikit-Learn", "Pandas", "NumPy"],
    githubUrl: "https://github.com/UtkarshDubeyGIT/Fuzzy-Monotonic-LightGBM-for-Explainable-Credit-Default-Prediction",
    demoUrl: "",
    image: "/portfolio-content/fuzzy.png",
    featured: true,
    order: 3,
  },
  {
    id: "FSRO-Optimization-Algorithm",
    name: "FSRO Optimization Algorithm",
    description: "This project implements and modifies the FSRO (Frog Snake Prey Predation) Optimization Algorithm. The FSRO algorithm is inspired by the natural predation behaviors of frogs and snakes, and it is used to solve optimization problems effectively.",
    techStack: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/SavageCat05/AI-project-",
    demoUrl: "",
    image: "/portfolio-content/fsro.png",
    featured: true,
    order: 4,
  }
];
