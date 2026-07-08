// import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsGrid } from './components/Projects/ProjectsGrid';
import { Skills } from './components/Skills';
import { ResumeSection } from './components/Resume/ResumeSection';
import { GitHubActivity } from './components/GitHubActivity/GitHubActivity';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { NotFound } from './pages/NotFound';

const queryClient = new QueryClient();

const MainContent = () => (
  <main id="main-content">
    <Hero />
    <About />
    <ProjectsGrid />
    <ResumeSection />
    <GitHubActivity />
    <Skills />
    <Contact />
  </main>
);

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            
            <Nav />
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
            
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
