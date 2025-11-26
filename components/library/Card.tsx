import { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
}

export function Card({ 
  children, 
  header, 
  footer, 
  padding = 'md',
  className = '',
  style = {},
}: CardProps) {
  const paddingValues = {
    none: '0',
    sm: 'var(--spacing-md)',
    md: 'var(--spacing-lg)',
    lg: 'var(--spacing-xl)',
  };

  const cardStyles: CSSProperties = {
    borderRadius: 'var(--radius-xl)',
    backgroundColor: 'var(--color-white)',
    boxShadow: 'var(--shadow-1)',
    overflow: 'hidden',
    fontFamily: 'var(--font-family-primary)',
    ...style,
  };

  const headerStyles: CSSProperties = {
    padding: paddingValues[padding],
    borderBottom: `var(--border-width-thin) var(--border-style-solid) var(--border-color-light)`,
    backgroundColor: 'var(--color-light-40)',
  };

  const contentStyles: CSSProperties = {
    padding: paddingValues[padding],
  };

  const footerStyles: CSSProperties = {
    padding: paddingValues[padding],
    borderTop: `var(--border-width-thin) var(--border-style-solid) var(--border-color-light)`,
    backgroundColor: 'var(--color-light-40)',
  };

  return (
    <div style={cardStyles} className={className}>
      {header && <div style={headerStyles}>{header}</div>}
      {children && <div style={contentStyles}>{children}</div>}
      {footer && <div style={footerStyles}>{footer}</div>}
    </div>
  );
}