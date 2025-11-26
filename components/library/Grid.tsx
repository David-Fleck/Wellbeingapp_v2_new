import { ReactNode, CSSProperties } from 'react';

export interface GridProps {
  children: ReactNode;
  columns?: number;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Grid({ 
  children,
  columns = 3,
  gap = 'md',
  responsive = true,
  className = '',
  style,
}: GridProps) {
  const gapMap = {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
  };

  const gridStyles: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: responsive 
      ? `repeat(auto-fit, minmax(min(var(--grid-min-column-width), 100%), 1fr))`
      : `repeat(${columns}, 1fr)`,
    gap: gapMap[gap],
    ...style,
  };

  return (
    <div style={gridStyles} className={className}>
      {children}
    </div>
  );
}