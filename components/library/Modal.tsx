import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showCloseButton?: boolean;
  className?: string;
}

export function Modal({ 
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  className = '',
}: ModalProps) {
  // Get icon size from CSS variable
  const iconSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--icon-size-lg').trim());
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeMap = {
    sm: 'var(--modal-size-sm)',
    md: 'var(--modal-size-md)',
    lg: 'var(--modal-size-lg)',
    xl: 'var(--modal-size-xl)',
  };

  const overlayStyles = {
    position: 'fixed' as const,
    top: 'var(--position-0)',
    left: 'var(--position-0)',
    right: 'var(--position-0)',
    bottom: 'var(--position-0)',
    backgroundColor: 'var(--overlay-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 'var(--z-index-modal)',
    padding: 'var(--spacing-lg)',
  };

  const modalStyles = {
    backgroundColor: 'var(--color-white)',
    borderRadius: 'var(--radius-xl)',
    boxShadow: 'var(--shadow-lg)',
    maxWidth: sizeMap[size],
    width: '100%',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative' as const,
  };

  const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--spacing-lg)',
    borderBottom: `var(--border-width-default) var(--border-style-solid) var(--border-color-default)`,
  };

  const titleStyles = {
    fontFamily: 'var(--font-family-primary)',
    color: 'var(--color-dark-100)',
    margin: 0,
  };

  const closeButtonStyles = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 'var(--spacing-xs)',
    color: 'var(--color-dark-60)',
    transition: 'var(--transition-base)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const contentStyles = {
    padding: 'var(--spacing-lg)',
    fontFamily: 'var(--font-family-primary)',
    color: 'var(--color-dark-80)',
  };

  return (
    <div style={overlayStyles} onClick={onClose}>
      <div 
        style={modalStyles} 
        className={className}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div style={headerStyles}>
            {title && <h3 style={titleStyles}>{title}</h3>}
            {showCloseButton && (
              <button 
                onClick={onClose} 
                style={closeButtonStyles}
                aria-label="Close modal"
              >
                <X size={iconSize} />
              </button>
            )}
          </div>
        )}
        <div style={contentStyles}>
          {children}
        </div>
      </div>
    </div>
  );
}