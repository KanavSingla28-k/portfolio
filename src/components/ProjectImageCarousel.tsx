import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectImageCarouselProps {
  images: string[];
  projectName: string;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
  }),
  center: {
    zIndex: 1,
    x: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function ProjectImageCarousel({ images, projectName }: ProjectImageCarouselProps) {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = Math.abs(page % images.length);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const handleDragEnd = (_e: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-surface-container text-text-muted">
        No image available
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="w-full aspect-video overflow-hidden bg-surface-container rounded-lg border border-whisper group/carousel relative line-height-0">
        <img
          className="w-full h-full object-contain block md:grayscale md:group-hover:grayscale-0 transition-all duration-700"
          src={images[0]}
          alt={projectName}
        />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="relative w-full aspect-video overflow-hidden group/carousel flex items-center justify-center bg-surface-container rounded-lg border border-whisper">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={page}
            src={images[imageIndex]}
            alt={`${projectName} screenshot ${imageIndex + 1}`}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute top-0 left-0 w-full h-full object-contain md:grayscale md:group-hover:grayscale-0 transition-all duration-700 cursor-grab active:cursor-grabbing"
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover/carousel:opacity-100 hover:bg-black/80 transition-all z-10"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); paginate(-1); }}
        aria-label="Previous image"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white opacity-0 group-hover/carousel:opacity-100 hover:bg-black/80 transition-all z-10"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); paginate(1); }}
        aria-label="Next image"
      >
        <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Line Indicators */}
      <div className="w-full flex items-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setPage([page + (idx - imageIndex), idx > imageIndex ? 1 : -1]);
            }}
            className={`flex-1 h-[3px] rounded-full transition-all duration-300 ${
              idx === imageIndex ? 'bg-primary' : 'bg-text-muted hover:bg-text-secondary'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
