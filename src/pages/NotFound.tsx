import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useState, type MouseEvent } from 'react';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none z-[100]"></div>
      <motion.main 
        className="min-h-screen flex flex-col items-center justify-center relative px-lg overflow-hidden" 
        onMouseMove={handleMouseMove}
        style={{
          '--mouse-x': `${mousePos.x}px`,
          '--mouse-y': `${mousePos.y}px`,
        } as React.CSSProperties}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
      >
        {/* Atmospheric Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-container/5 rounded-full blur-[120px]"></div>
        </div>

        {/* 404 Layout */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Large Numeral (Placeholder Image) */}
          <motion.div variants={fadeUpVariants} className="mb-sm">
            <img 
              src="https://via.placeholder.com/400x400/111113/7c3aed?text=404" 
              alt="404 Not Found" 
              className="w-full max-w-[400px] mx-auto mb-md rounded-xl"
            />
          </motion.div>

          {/* Content Text */}
          <motion.div variants={fadeUpVariants} className="space-y-md max-w-md">
            <p className="font-body-lg text-body-lg text-text-primary tracking-tight">
              This page doesn't exist.
            </p>
            <p className="font-body-main text-body-main text-text-muted px-md">
              The technical specifications for this coordinate seem to be missing or were never written into the architecture.
            </p>
          </motion.div>

          {/* Primary Action */}
          <motion.div variants={fadeUpVariants} className="mt-2xl">
            <Link 
              className="inline-flex items-center gap-sm px-xl py-md bg-primary-container text-text-primary font-body-main font-medium rounded-lg transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:translate-y-[-2px] active:scale-95" 
              to="/"
            >
              Back to home
              <ArrowRight className="w-[18px] h-[18px]" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </motion.main>
    </>
  );
}
