// import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsGrid } from './components/Projects/ProjectsGrid';
import { Skills } from './components/Skills';
import { ResumeSection } from './components/Resume/ResumeSection';
import { GitHubActivity } from './components/GitHubActivity/GitHubActivity';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>
        <Nav />
        <main>
          <Hero />
          <About />
          <ProjectsGrid />
          <ResumeSection />
          <GitHubActivity />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
      <Analytics />
      <SpeedInsights />
    </QueryClientProvider>
  );
}

export default App;
