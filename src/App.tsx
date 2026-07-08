import React from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ProjectsGrid } from './components/Projects/ProjectsGrid';
import { Skills } from './components/Skills';

function App() {
  return (
    <div style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Nav />
      <main>
        <Hero />
        <About />
        <ProjectsGrid />
        <Skills />
      </main>
    </div>
  );
}

export default App;
