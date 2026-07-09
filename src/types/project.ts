export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  image: string; // e.g. "/pdftalk.png" - primary image
  images?: string[]; // Multiple images for the carousel
  featured: boolean;
  order: number;
}
