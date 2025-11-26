import { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Alert({ 
  variant = 'info',
  title,
  children,
  onClose,
  className = '',
}: AlertProps) {
  // Get icon size from CSS variable
  const iconSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--icon-size-md').trim());
  
  const variantConfig = {
    info: {
      backgroundColor: 'var(--color-info-10)',
      borderColor: 'var(--color-info-100)',
      iconColor: 'var(--color-info-100)',
      Icon: Info,
    },
    success: {
      backgroundColor: 'var(--color-success-10)',
      borderColor: 'var(--color-success-100)',
      iconColor: 'var(--color-success-100)',
      Icon: CheckCircle,
    },
    warning: {
      backgroundColor: 'var(--color-warning-10)',
      borderColor: 'var(--color-warning-100)',
      iconColor: 'var(--color-warning-100)',
      Icon: AlertCircle,
    },
    error: {
      backgroundColor: 'var(--color-error-10)',
      borderColor: 'var(--color-error-100)',
      iconColor: 'var(--color-error-100)',
      Icon: XCircle,
    },
  };

  const config = variantConfig[variant];
  const Icon = config.Icon;

  const containerStyles = {
    display: 'flex',
    gap: 'var(--spacing-md)',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: config.backgroundColor,
    border: `var(--border-width-default) var(--border-style-solid) ${config.borderColor}`,
    fontFamily: 'var(--font-family-primary)',
  };

  const iconStyles = {
    flexShrink: 0,
    color: config.iconColor,
    marginTop: 'var(--spacing-xs)',
  };

  const contentStyles = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-xs)',
  };

  const titleStyles = {
    color: 'var(--color-dark-100)',
  };

  const textStyles = {
    color: 'var(--color-dark-80)',
  };

  const closeButtonStyles = {
    flexShrink: 0,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
    color: 'var(--color-dark-60)',
    transition: 'var(--transition-base)',
  };

  return (
    <div style={containerStyles} className={className}>
      <Icon size={iconSize} style={iconStyles} />
      <div style={contentStyles}>
        {title && <div style={titleStyles}>{title}</div>}
        <div style={textStyles}>{children}</div>
      </div>
      {onClose && (
        <button 
          onClick={onClose} 
          style={closeButtonStyles}
          aria-label="Close alert"
        >
          <X size={iconSize} />
        </button>
      )}
    </div>
  );
}