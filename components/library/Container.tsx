import { ReactNode, CSSProperties } from 'react';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps {
  children: ReactNode;
  size?: ContainerSize;
  centered?: boolean;
  padding?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function Container({ 
  children,
  size = 'lg',
  centered = true,
  padding = true,
  className = '',
  style,
}: ContainerProps) {
  const sizeMap = {
    sm: 'var(--container-sm)',
    md: 'var(--container-md)',
    lg: 'var(--container-lg)',
    xl: 'var(--container-xl)',
    full: '100%',
  };

  const containerStyles: CSSProperties = {
    width: '100%',
    maxWidth: sizeMap[size],
    marginLeft: centered ? 'auto' : undefined,
    marginRight: centered ? 'auto' : undefined,
    paddingLeft: padding ? 'var(--spacing-lg)' : undefined,
    paddingRight: padding ? 'var(--spacing-lg)' : undefined,
    ...style,
  };

  return (
    <div style={containerStyles} className={className}>
      {children}
    </div>
  );
}