<div align="center">
  <img src="public/icon.png" alt="Logo" width="80" height="80" />

  # Kanav Singla — Professional Portfolio

  A modern, highly interactive, and responsive portfolio website built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion. Designed to showcase projects, skills, and GitHub activity in a sleek, aesthetic, and user-friendly interface.

  [![Live Demo](https://img.shields.io/badge/Live_Demo-View_Site-7C3AED?style=for-the-badge&logo=vercel&logoColor=white)](https://www.kanavsingla.fyi/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

  <br />

  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![Framer](https://img.shields.io/badge/Framer-black?style=for-the-badge&logo=framer&logoColor=blue)

</div>

---

## ✨ Features

- 🎭 **Dynamic Animations:** Smooth scroll reveals, hover effects, typing text effects, and page transitions powered by **Framer Motion**.
- 🌐 **Live Integrations:** Real-time fetching of GitHub repositories and contributions using GraphQL and **React Query**.
- ⚡ **Lightning Fast:** Bootstrapped with **Vite** for optimized production builds and instant HMR.
- 🛡️ **Type-Safe & Clean:** Fully written in **TypeScript** and heavily linted using **Oxlint**.
- 📱 **Responsive & Accessible:** Mobile-first styling utilizing **Tailwind CSS**, fully accessible with screen-reader text and focus trapping.
- 🚀 **Performance Optimized:** Achieves top Lighthouse scores, featuring **Vercel Speed Insights** and Analytics.

---

## 🚀 Tech Stack

### Core
- **Framework:** React 19, React Router DOM
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS, PostCSS, Autoprefixer
- **Animations:** Framer Motion, tailwindcss-animate

### Data & Architecture
- **Data Fetching:** React Query (@tanstack/react-query), GraphQL Request
- **Icons:** Lucide React, React Icons
- **Linting & Formatting:** Oxlint
- **Testing:** Vitest

---

## 🛠️ Getting Started

Follow these steps to run the project locally.

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**

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
   Create a `.env.local` file in the root directory and add your Formspree endpoint URL to enable the contact form:
   ```env
   VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   Navigate to `http://localhost:5173` to view the application.

---

## 📁 Project Structure

```text
portfolio/
├── public/               # Static assets (images, fonts, resume, noise.svg)
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
├── .env.local            # Environment variables (Formspree Endpoint)
├── tailwind.config.ts    # Tailwind CSS configuration
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Compiles TypeScript and builds the production bundle. |
| `npm run lint` | Runs Oxlint to check for code issues. |
| `npm run type-check` | Runs TypeScript compiler to check for type errors without emitting files. |
| `npm run preview` | Previews the production build locally. |
| `npm run test` | Runs the Vitest test suite. |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<br/>
<div align="center">
  <i>Built with ❤️ by Kanav Singla</i>
</div>
