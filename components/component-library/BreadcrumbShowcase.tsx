import { Breadcrumb } from '../library/Breadcrumb';
import { Home, FolderOpen, FileText } from 'lucide-react';

export function BreadcrumbShowcase() {
  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  const basicItems = [
    { label: 'Home', href: '/' },
    { label: 'Category', href: '/category' },
    { label: 'Subcategory', href: '/category/sub' },
    { label: 'Current Page' },
  ];

  const itemsWithIcons = [
    { label: 'Home', href: '/', icon: <Home size={16} /> },
    { label: 'Documents', href: '/docs', icon: <FolderOpen size={16} /> },
    { label: 'File.pdf', icon: <FileText size={16} /> },
  ];

  const shortItems = [
    { label: 'Home', href: '/' },
    { label: 'Current' },
  ];

  const handleNavigate = (index: number) => {
    console.log(`Navigate to item ${index}`);
  };

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Breadcrumb</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        Displays the current page's location within a navigational hierarchy.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Default</h4>
        <Breadcrumb items={basicItems} />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>With Icons</h4>
        <Breadcrumb items={itemsWithIcons} />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Short Path</h4>
        <Breadcrumb items={shortItems} />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>With Navigation Handler</h4>
        <Breadcrumb items={basicItems} onNavigate={handleNavigate} />
        <p style={{ 
          marginTop: 'var(--spacing-sm)', 
          fontSize: 'var(--font-size-p1-md)',
          color: 'var(--color-dark-60)',
          fontFamily: 'var(--font-family-primary)',
        }}>
          Check console when clicking breadcrumb items
        </p>
      </div>
    </div>
  );
}
