import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <div className="absolute inset-0 pointer-events-none -z-10 bg-dot-pattern" />
      <Header />
      <main className="flex-grow flex flex-col mt-[72px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
