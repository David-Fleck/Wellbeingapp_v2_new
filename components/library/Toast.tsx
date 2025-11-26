import { ReactNode, useEffect } from 'react';
import { CheckCircle, Info, AlertCircle, XCircle, X } from 'lucide-react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastProps {
  variant?: ToastVariant;
  title?: string;
  message: string;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
  position?: ToastPosition;
  className?: string;
}

export function Toast({ 
  variant = 'info',
  title,
  message,
  isVisible,
  onClose,
  duration = 3000,
  position = 'top-right',
  className = '',
}: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

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

  const positionStyles = {
    'top-left': { top: 'var(--spacing-lg)', left: 'var(--spacing-lg)' },
    'top-center': { top: 'var(--spacing-lg)', left: '50%', transform: 'translateX(-50%)' },
    'top-right': { top: 'var(--spacing-lg)', right: 'var(--spacing-lg)' },
    'bottom-left': { bottom: 'var(--spacing-lg)', left: 'var(--spacing-lg)' },
    'bottom-center': { bottom: 'var(--spacing-lg)', left: '50%', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: 'var(--spacing-lg)', right: 'var(--spacing-lg)' },
  };

  const config = variantConfig[variant];
  const Icon = config.Icon;

  const containerStyles = {
    position: 'fixed' as const,
    ...positionStyles[position],
    display: 'flex',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-lg)',
    backgroundColor: config.backgroundColor,
    border: `var(--border-width-default) var(--border-style-solid) ${config.borderColor}`,
    boxShadow: 'var(--shadow-md)',
    fontFamily: 'var(--font-family-primary)',
    minWidth: 'var(--toast-min-width)',
    maxWidth: 'var(--toast-max-width)',
    zIndex: 'var(--z-index-toast)',
    animation: 'slideIn var(--transition-toast) ease-out',
  };

  const iconStyles = {
    flexShrink: 0,
    color: config.iconColor,
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

  const messageStyles = {
    color: 'var(--color-dark-80)',
    fontSize: 'var(--font-size-p1-md)',
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
    <>
      <div style={containerStyles} className={className}>
        <Icon size={20} style={iconStyles} />
        <div style={contentStyles}>
          {title && <div style={titleStyles}>{title}</div>}
          <div style={messageStyles}>{message}</div>
        </div>
        <button 
          onClick={onClose} 
          style={closeButtonStyles}
          aria-label="Close toast"
        >
          <X size={20} />
        </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) ${position.includes('center') ? 'translateX(-50%)' : ''};
          }
          to {
            opacity: 1;
            transform: translateY(0) ${position.includes('center') ? 'translateX(-50%)' : ''};
          }
        }
      ` }} />
    </>
  );
}