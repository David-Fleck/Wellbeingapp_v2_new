import { CSSProperties } from 'react';

export type LoadingSize = 'sm' | 'md' | 'lg';
export type LoadingVariant = 'spinner' | 'dots' | 'pulse';

export interface LoadingProps {
  size?: LoadingSize;
  variant?: LoadingVariant;
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

export function Loading({ 
  size = 'md',
  variant = 'spinner',
  text,
  fullScreen = false,
  className = '',
}: LoadingProps) {
  const sizeMap = {
    sm: 'var(--loading-size-sm)',
    md: 'var(--loading-size-md)',
    lg: 'var(--loading-size-lg)',
  };

  const dotSizeMap = {
    sm: 'var(--loading-dot-sm)',
    md: 'var(--loading-dot-md)',
    lg: 'var(--loading-dot-lg)',
  };

  const borderWidthMap = {
    sm: 'var(--border-width-default)',
    md: 'var(--border-width-medium)',
    lg: 'var(--border-width-thick)',
  };

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-md)',
    ...(fullScreen && {
      position: 'fixed',
      top: 'var(--position-0)',
      left: 'var(--position-0)',
      right: 'var(--position-0)',
      bottom: 'var(--position-0)',
      backgroundColor: 'var(--overlay-light)',
      zIndex: 'var(--z-index-toast)',
    }),
  };

  const spinnerStyles: CSSProperties = {
    width: sizeMap[size],
    height: sizeMap[size],
    border: `${borderWidthMap[size]} solid var(--color-light-100)`,
    borderTopColor: 'var(--color-primary)',
    borderRadius: 'var(--radius-full)',
    animation: 'spin var(--transition-slow) linear infinite',
  };

  const dotStyles: CSSProperties = {
    width: dotSizeMap[size],
    height: dotSizeMap[size],
    backgroundColor: 'var(--color-primary)',
    borderRadius: 'var(--radius-full)',
    animation: 'bounce 1.4s infinite ease-in-out both',
  };

  const dotsContainerStyles: CSSProperties = {
    display: 'flex',
    gap: 'var(--spacing-xs)',
  };

  const pulseStyles: CSSProperties = {
    width: sizeMap[size],
    height: sizeMap[size],
    backgroundColor: 'var(--color-primary)',
    borderRadius: 'var(--radius-full)',
    animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  };

  const textStyles: CSSProperties = {
    fontFamily: 'var(--font-family-primary)',
    color: 'var(--color-dark-80)',
  };

  const renderLoader = () => {
    switch (variant) {
      case 'spinner':
        return <div style={spinnerStyles} />;
      
      case 'dots':
        return (
          <div style={dotsContainerStyles}>
            <div style={{ ...dotStyles, animationDelay: '-0.32s' }} />
            <div style={{ ...dotStyles, animationDelay: '-0.16s' }} />
            <div style={dotStyles} />
          </div>
        );
      
      case 'pulse':
        return <div style={pulseStyles} />;
      
      default:
        return <div style={spinnerStyles} />;
    }
  };

  return (
    <>
      <div style={containerStyles} className={className}>
        {renderLoader()}
        {text && <div style={textStyles}>{text}</div>}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
            opacity: var(--opacity-disabled);
          } 
          40% { 
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      ` }} />
    </>
  );
}