import { useState } from 'react';
import { Button } from '../library/Button';
import { CodeViewerDialog } from '../library/CodeViewerDialog';
import { Code2, Plus, Trash2, Check } from 'lucide-react';

const buttonCode = `import { Button } from './components/library/Button';
import { Plus, Trash2, Check } from 'lucide-react';

// Primary Button
<Button variant="primary" size="md">
  Primary Button
</Button>

// Secondary Button
<Button variant="secondary" size="md">
  Secondary Button
</Button>

// Ghost Button
<Button variant="ghost" size="md">
  Ghost Button
</Button>

// Success Button
<Button variant="success" size="md">
  Success
</Button>

// Warning Button
<Button variant="warning" size="md">
  Warning
</Button>

// Error Button
<Button variant="error" size="md">
  Error
</Button>

// With Icon
<Button variant="primary" size="md" icon={<Plus className="w-5 h-5" />}>
  Add Item
</Button>

// Sizes
<Button variant="primary" size="sm">Small</Button>
<Button variant="primary" size="md">Medium</Button>
<Button variant="primary" size="lg">Large</Button>

// Full Width
<Button variant="primary" size="md" fullWidth>
  Full Width Button
</Button>`;

export function ButtonShowcase() {
  const [codeOpen, setCodeOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ marginBottom: 'var(--spacing-xs)' }}>Button</h2>
          <p style={{ color: 'var(--color-dark-40)' }}>
            Interactive buttons with multiple variants, sizes, and icon support
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

      {/* Variants Section */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Variants</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
          <Button variant="primary" size="md">Primary Button</Button>
          <Button variant="secondary" size="md">Secondary Button</Button>
          <Button variant="ghost" size="md">Ghost Button</Button>
          <Button variant="success" size="md">Success</Button>
          <Button variant="warning" size="md">Warning</Button>
          <Button variant="error" size="md">Error</Button>
        </div>
      </div>

      {/* With Icons Section */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>With Icons</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
          <Button variant="primary" size="md" icon={<Plus className="w-5 h-5" />}>
            Add Item
          </Button>
          <Button variant="error" size="md" icon={<Trash2 className="w-5 h-5" />}>
            Delete
          </Button>
          <Button variant="success" size="md" icon={<Check className="w-5 h-5" />}>
            Confirm
          </Button>
        </div>
      </div>

      {/* Sizes Section */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Sizes</h3>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Medium</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </div>

      {/* Full Width Section */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Full Width</h3>
        <Button variant="primary" size="md" fullWidth>
          Full Width Button
        </Button>
      </div>

      <CodeViewerDialog
        open={codeOpen}
        onOpenChange={setCodeOpen}
        title="Button Component"
        code={buttonCode}
      />
    </div>
  );
}
