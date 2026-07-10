import { useState, type MouseEvent, type ElementType, type ComponentPropsWithoutRef } from 'react';

type AsProp<C extends ElementType> = {
  as?: C;
};

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProps<
  C extends ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type InteractiveHoverCardBaseProps = {
  className?: string;
  gradientStyle?: string;
  usePercentage?: boolean;
};

export type InteractiveHoverCardProps<C extends ElementType = 'div'> = PolymorphicComponentProps<
  C,
  InteractiveHoverCardBaseProps
>;

export function InteractiveHoverCard<C extends ElementType = 'div'>({
  children,
  className = '',
  as,
  gradientStyle = 'radial-gradient(800px at var(--mouse-x) var(--mouse-y), rgba(124, 58, 237, 0.08), transparent 40%)',
  usePercentage = false,
  ...props
}: InteractiveHoverCardProps<C>) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    
    if (usePercentage) {
      x = (x / rect.width) * 100;
      y = (y / rect.height) * 100;
    }
    
    setMousePos({ x, y });
  };

  const inlineStyles = {
    [usePercentage ? '--x' : '--mouse-x']: usePercentage ? `${mousePos.x}%` : `${mousePos.x}px`,
    [usePercentage ? '--y' : '--mouse-y']: usePercentage ? `${mousePos.y}%` : `${mousePos.y}px`,
    ...((props.style as React.CSSProperties) || {})
  };

  const Component = as || 'div';

  return (
    <Component
      className={`relative group overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      style={inlineStyles}
      {...props}
    >
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100" 
        style={{ background: gradientStyle }} 
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </Component>
  );
}
