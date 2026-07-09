# Kanav Singla - Professional Portfolio

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://www.kanavsingla.fyi/)

A modern, highly interactive, and responsive portfolio website built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion. Designed to showcase projects, skills, and GitHub activity in a sleek, aesthetic, and user-friendly interface.

## ✨ Features

- **Dynamic Animations**: Smooth scroll reveals, hover effects, and page transitions powered by [Framer Motion](https://www.framer.com/motion/).
- **GitHub Integration**: Live fetching of GitHub activity, repositories, and contributions using GraphQL and [React Query](https://tanstack.com/query/latest).
- **Modern Tech Stack**: Bootstrapped with [Vite](https://vitejs.dev/) for lightning-fast HMR and optimized builds.
- **Type-Safe**: Fully written in [TypeScript](https://www.typescriptlang.org/) for robust and error-free code.
- **Responsive Design**: Mobile-first styling utilizing [Tailwind CSS](https://tailwindcss.com/) with container queries.
- **Performance Optimized**: Includes Vercel Speed Insights and Analytics for real-time performance monitoring.

## 🚀 Tech Stack

**Frontend Framework**: React 19, React Router DOM
**Build Tool**: Vite
**Language**: TypeScript
**Styling**: Tailwind CSS, PostCSS, Autoprefixer
**Animations**: Framer Motion
**Data Fetching**: React Query (@tanstack/react-query), GraphQL Request
**Icons**: Lucide React, React Icons
**Linting & Formatting**: Oxlint
**Testing**: Vitest

## 📁 Project Structure

```text
portfolio/
├── public/               # Static assets (images, fonts, resume)
├── src/
│   ├── assets/           # Internal assets and global styles
│   ├── components/       # Reusable UI components (Layout, Cards, Carousel, etc.)
│   ├── data/             # Static data files (Profile, Skills, Projects, Resume)
│   ├── hooks/            # Custom React hooks (e.g., useGitHubProjects)
│   ├── lib/              # Utility functions and GraphQL queries
│   ├── pages/            # Main application routes (Home, About, Projects, Contact)
│   ├── styles/           # Tailwind and CSS configurations
│   ├── types/            # TypeScript interface definitions
│   ├── App.tsx           # Application routing and providers
│   └── main.tsx          # Application entry point
├── .env.local            # Environment variables (GitHub Token, etc.)
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## 🛠️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/KanavSingla28-k/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your GitHub Personal Access Token to fetch live GitHub data:
   ```env
   VITE_GITHUB_TOKEN=your_personal_access_token_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to `http://localhost:5173` to view the application.

## 📜 Available Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the production bundle.
- `npm run lint`: Runs Oxlint to check for code issues.
- `npm run type-check`: Runs TypeScript compiler to check for type errors without emitting files.
- `npm run preview`: Previews the production build locally.
- `npm run test`: Runs the Vitest test suite.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
