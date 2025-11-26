import { ReactNode, CSSProperties } from 'react';

export type StackDirection = 'horizontal' | 'vertical';
export type StackAlign = 'start' | 'center' | 'end' | 'stretch';
export type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface StackProps {
  children: ReactNode;
  direction?: StackDirection;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Stack({ 
  children,
  direction = 'vertical',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className = '',
  style,
}: StackProps) {
  const gapMap = {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    '2xl': 'var(--spacing-2xl)',
  };

  const alignMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  };

  const justifyMap = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
  };

  const stackStyles: CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    gap: gapMap[gap],
    alignItems: alignMap[align],
    justifyContent: justifyMap[justify],
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...style,
  };

  return (
    <div style={stackStyles} className={className}>
      {children}
    </div>
  );
}
