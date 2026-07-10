import { type ComponentPropsWithoutRef, type ElementType } from 'react';


export type ButtonVariant = 'primary' | 'surface' | 'primary-container' | 'outline';

type AsProp<C extends ElementType> = {
  as?: C;
};

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProps<
  C extends ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type ButtonProps<C extends ElementType = 'button'> = PolymorphicComponentProps<
  C,
  {
    variant?: ButtonVariant;
    className?: string;
  }
>;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "w-full bg-primary hover:brightness-110 disabled:opacity-70 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2",
  surface: "w-full sm:w-auto px-xl py-4 border border-whisper bg-bg-surface rounded-3xl font-medium hover:border-border-hover hover:bg-bg-elevated transition-all flex items-center justify-center gap-2 text-text-primary",
  "primary-container": "px-lg py-2 bg-primary-container text-on-primary-container font-label-mono text-label-mono rounded-lg hover:brightness-110 transition-all flex items-center justify-center gap-xs",
  outline: "px-lg py-2 border border-whisper text-text-secondary font-label-mono text-label-mono rounded-lg hover:border-border-hover hover:text-text-primary transition-all flex items-center justify-center gap-xs",
};

export function Button<C extends ElementType = 'button'>(props: ButtonProps<C>) {
  const { variant = 'primary', className = '', children, as, ...rest } = props;
  
  const baseClasses = variantStyles[variant];
  const combinedClasses = `${baseClasses} ${className}`.trim();

  const Component = as || 'button';

  return (
    <Component className={combinedClasses} {...rest}>
      {children}
    </Component>
  );
}
