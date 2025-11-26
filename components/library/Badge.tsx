import { ReactNode, CSSProperties } from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
}

export function Badge({ 
  children, 
  variant = 'neutral', 
  size = 'md',
  dot = false,
  className = '' 
}: BadgeProps) {
  const sizeStyles = {
    sm: {
      padding: 'var(--spacing-xs) var(--spacing-sm)',
      fontSize: 'var(--font-size-p1-sm)',
    },
    md: {
      padding: 'var(--spacing-xs) var(--spacing-md)',
      fontSize: 'var(--font-size-p1-md)',
    },
    lg: {
      padding: 'var(--spacing-sm) var(--spacing-md)',
      fontSize: 'var(--font-size-p1-base)',
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)',
    },
    secondary: {
      backgroundColor: 'var(--color-secondary)',
      color: 'var(--color-white)',
    },
    success: {
      backgroundColor: 'var(--color-success-100-5)',
      color: 'var(--color-success-100)',
      border: `var(--border-width-default) var(--border-style-solid) var(--border-color-success)`,
    },
    warning: {
      backgroundColor: 'var(--color-warning-100-5)',
      color: 'var(--color-warning-100)',
      border: `var(--border-width-default) var(--border-style-solid) var(--border-color-warning)`,
    },
    error: {
      backgroundColor: 'var(--color-error-100-5)',
      color: 'var(--color-error-100)',
      border: `var(--border-width-default) var(--border-style-solid) var(--border-color-error)`,
    },
    neutral: {
      backgroundColor: 'var(--color-light-60)',
      color: 'var(--color-dark-80)',
    },
  };

  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    borderRadius: 'var(--radius-full)',
    fontFamily: 'var(--font-family-primary)',
    whiteSpace: 'nowrap',
    ...sizeStyles[size],
    ...variantStyles[variant],
  };

  const dotStyles: CSSProperties = {
    width: 'var(--loading-dot-sm)',
    height: 'var(--loading-dot-sm)',
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  };

  return (
    <span style={baseStyles} className={className}>
      {dot && <span style={dotStyles} />}
      {children}
    </span>
  );
}