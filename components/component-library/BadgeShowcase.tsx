import { useState } from 'react';
import { Badge } from '../library/Badge';
import { CodeViewerDialog } from '../library/CodeViewerDialog';
import { Code2 } from 'lucide-react';

const badgeCode = `import { Badge } from './components/library/Badge';

// Variants
<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="neutral">Neutral</Badge>

// With Dot Indicator
<Badge variant="success" dot>Active</Badge>
<Badge variant="error" dot>Offline</Badge>
<Badge variant="warning" dot>Pending</Badge>

// Sizes
<Badge variant="primary" size="sm">Small</Badge>
<Badge variant="primary" size="md">Medium</Badge>
<Badge variant="primary" size="lg">Large</Badge>

// Status Examples
<Badge variant="success" dot>Completed</Badge>
<Badge variant="warning" dot>In Progress</Badge>
<Badge variant="error" dot>Failed</Badge>
<Badge variant="neutral" dot>Draft</Badge>`;

export function BadgeShowcase() {
  const [codeOpen, setCodeOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ marginBottom: 'var(--spacing-xs)' }}>Badge</h2>
          <p style={{ color: 'var(--color-dark-40)' }}>
            Status indicators and labels with multiple variants and optional dot
          </p>
        </div>
        <button
          onClick={() => setCodeOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-sm)',
            padding: 'var(--spacing-sm) var(--spacing-md)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-dark-20)',
            backgroundColor: 'var(--color-white)',
            cursor: 'pointer',
            transition: 'var(--transition-base)',
          }}
        >
          <Code2 className="w-5 h-5" />
          View Code
        </button>
      </div>

      {/* Variants */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Variants</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </div>

      {/* With Dot */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>With Dot Indicator</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
          <Badge variant="success" dot>Active</Badge>
          <Badge variant="error" dot>Offline</Badge>
          <Badge variant="warning" dot>Pending</Badge>
          <Badge variant="primary" dot>New</Badge>
          <Badge variant="neutral" dot>Default</Badge>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Sizes</h3>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
          <Badge variant="primary" size="sm">Small</Badge>
          <Badge variant="primary" size="md">Medium</Badge>
          <Badge variant="primary" size="lg">Large</Badge>
        </div>
      </div>

      {/* Status Examples */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Status Examples</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <span style={{ minWidth: '120px', color: 'var(--color-dark-60)' }}>Task Status:</span>
            <Badge variant="success" dot>Completed</Badge>
            <Badge variant="warning" dot>In Progress</Badge>
            <Badge variant="error" dot>Failed</Badge>
            <Badge variant="neutral" dot>Draft</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <span style={{ minWidth: '120px', color: 'var(--color-dark-60)' }}>Server Status:</span>
            <Badge variant="success" dot>Online</Badge>
            <Badge variant="error" dot>Offline</Badge>
            <Badge variant="warning" dot>Maintenance</Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
            <span style={{ minWidth: '120px', color: 'var(--color-dark-60)' }}>Priority:</span>
            <Badge variant="error">High</Badge>
            <Badge variant="warning">Medium</Badge>
            <Badge variant="success">Low</Badge>
          </div>
        </div>
      </div>

      <CodeViewerDialog
        open={codeOpen}
        onOpenChange={setCodeOpen}
        title="Badge Component"
        code={badgeCode}
      />
    </div>
  );
}
