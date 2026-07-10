import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute inset-0 pointer-events-none -z-10 bg-dot-pattern" />
      <Header />
      <main className="flex-grow flex flex-col mt-[72px]">
        <Suspense fallback={
          <div className="flex-1 flex items-center justify-center min-h-[50vh]">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        }>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
