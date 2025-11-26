import { useState } from 'react';
import { Pagination } from '../library/Pagination';

export function PaginationShowcase() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [page3, setPage3] = useState(1);

  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Pagination</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        Allows users to navigate through pages of content.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Default (First Page)</h4>
        <Pagination
          currentPage={page1}
          totalPages={10}
          onPageChange={setPage1}
        />
        <p style={{ 
          marginTop: 'var(--spacing-sm)', 
          fontSize: 'var(--font-size-p1-md)',
          color: 'var(--color-dark-60)',
          fontFamily: 'var(--font-family-primary)',
        }}>
          Current page: {page1}
        </p>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Middle Page</h4>
        <Pagination
          currentPage={page2}
          totalPages={10}
          onPageChange={setPage2}
        />
        <p style={{ 
          marginTop: 'var(--spacing-sm)', 
          fontSize: 'var(--font-size-p1-md)',
          color: 'var(--color-dark-60)',
          fontFamily: 'var(--font-family-primary)',
        }}>
          Current page: {page2}
        </p>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Without First/Last Buttons</h4>
        <Pagination
          currentPage={page3}
          totalPages={5}
          onPageChange={setPage3}
          showFirstLast={false}
        />
        <p style={{ 
          marginTop: 'var(--spacing-sm)', 
          fontSize: 'var(--font-size-p1-md)',
          color: 'var(--color-dark-60)',
          fontFamily: 'var(--font-family-primary)',
        }}>
          Current page: {page3}
        </p>
      </div>
    </div>
  );
}
