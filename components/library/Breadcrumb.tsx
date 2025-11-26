import { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate?: (index: number) => void;
  className?: string;
}

export function Breadcrumb({ 
  items,
  onNavigate,
  className = '',
}: BreadcrumbProps) {
  // Get icon size from CSS variable
  const iconSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--icon-size-sm').trim());
  
  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    fontFamily: 'var(--font-family-primary)',
  };

  const itemStyles = (isLast: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    color: isLast ? 'var(--color-dark-100)' : 'var(--color-dark-60)',
    textDecoration: 'none',
    cursor: isLast ? 'default' : 'pointer',
    transition: 'var(--transition-base)',
  });

  const separatorStyles = {
    color: 'var(--color-dark-40)',
    display: 'flex',
    alignItems: 'center',
  };

  const handleClick = (index: number, e: React.MouseEvent) => {
    if (index === items.length - 1) return;
    
    if (onNavigate) {
      e.preventDefault();
      onNavigate(index);
    }
  };

  return (
    <nav style={containerStyles} className={className} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
            {item.href && !isLast ? (
              <a 
                href={item.href} 
                style={itemStyles(isLast)}
                onClick={(e) => handleClick(index, e)}
              >
                {item.icon}
                {item.label}
              </a>
            ) : (
              <span style={itemStyles(isLast)}>
                {item.icon}
                {item.label}
              </span>
            )}
            
            {!isLast && (
              <ChevronRight size={iconSize} style={separatorStyles} />
            )}
          </div>
        );
      })}
    </nav>
  );
}