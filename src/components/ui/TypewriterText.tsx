import React, { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

interface TypewriterTextProps {
  text: string;
  delay?: number; // in seconds
  speed?: number; // in seconds per character
  className?: string;
  as?: React.ElementType;
}

export function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 0.02, 
  className = "", 
  as: Component = "span" 
}: TypewriterTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    
    let interval: ReturnType<typeof setInterval>;
    
    const timeout = setTimeout(() => {
      setIsTyping(true);
      let i = 0;
      interval = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, speed * 1000);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [isInView, text, delay, speed]);

  return (
    <Component ref={ref} className={`relative block ${className}`}>
      <span className="opacity-0 pointer-events-none select-none" aria-hidden="true">{text}</span>
      <span className="absolute inset-0">
        {displayedText}
        {isTyping && (
          <span className="inline-block w-[0.1em] h-[1em] ml-[2px] -mb-[0.1em] align-baseline bg-primary animate-pulse" />
        )}
      </span>
    </Component>
  );
}
