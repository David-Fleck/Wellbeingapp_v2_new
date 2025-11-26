import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  className?: string;
}

export function Pagination({ 
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  className = '',
}: PaginationProps) {
  // Get icon size from CSS variable
  const iconSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--icon-size-sm').trim());
  
  const containerStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-xs)',
    fontFamily: 'var(--font-family-primary)',
  };

  const buttonStyles = (isActive: boolean, disabled: boolean) => ({
    padding: 'var(--spacing-sm) var(--spacing-md)',
    borderRadius: 'var(--radius-md)',
    border: `var(--border-width-default) var(--border-style-solid) var(--border-color-default)`,
    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-white)',
    color: isActive ? 'var(--color-white)' : 'var(--color-dark-80)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'var(--transition-base)',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    fontFamily: 'var(--font-family-primary)',
    minWidth: 'var(--min-width-button)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav style={containerStyles} className={className} aria-label="Pagination">
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          style={buttonStyles(false, currentPage === 1)}
          aria-label="First page"
        >
          First
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={buttonStyles(false, currentPage === 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={iconSize} />
      </button>

      {getPageNumbers().map((page, index) => (
        typeof page === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            style={buttonStyles(currentPage === page, false)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ) : (
          <span 
            key={index} 
            style={{ 
              padding: 'var(--spacing-sm)', 
              color: 'var(--color-dark-40)' 
            }}
          >
            {page}
          </span>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={buttonStyles(false, currentPage === totalPages)}
        aria-label="Next page"
      >
        <ChevronRight size={iconSize} />
      </button>

      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          style={buttonStyles(false, currentPage === totalPages)}
          aria-label="Last page"
        >
          Last
        </button>
      )}
    </nav>
  );
}