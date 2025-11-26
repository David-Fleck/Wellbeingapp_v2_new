import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'success' | 'warning' | 'error';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({ 
  variant = 'primary', 
  size = 'md',
  children,
  icon,
  fullWidth = false,
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = {
    fontFamily: 'var(--font-family-primary)',
    transition: 'var(--transition-base)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-sm)',
    border: 'none',
    cursor: 'pointer',
    width: fullWidth ? '100%' : 'auto',
  };

  const sizeStyles = {
    sm: {
      padding: 'var(--spacing-sm) var(--spacing-md)',
      borderRadius: 'var(--radius-full)',
    },
    md: {
      padding: 'var(--spacing-md) var(--spacing-lg)',
      borderRadius: 'var(--radius-full)',
    },
    lg: {
      padding: 'var(--spacing-lg) var(--spacing-xl)',
      borderRadius: 'var(--radius-2xl)',
    },
  };

  const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)',
      border: 'none',
    },
    secondary: {
      backgroundColor: 'var(--color-secondary)',
      color: 'var(--color-white)',
      border: 'none',
    },
    ghost: {
      backgroundColor: 'var(--color-light-20)',
      color: 'var(--color-dark-100)',
    },
    success: {
      backgroundColor: 'var(--color-success-100)',
      color: 'var(--color-dark-100)',
    },
    warning: {
      backgroundColor: 'var(--color-warning-100)',
      color: 'var(--color-white)',
    },
    error: {
      backgroundColor: 'var(--color-error-100)',
      color: 'var(--color-white)',
    },
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
      }}
      className={className}
      {...props}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
}