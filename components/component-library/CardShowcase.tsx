import { useState } from 'react';
import { Card } from '../library/Card';
import { Button } from '../library/Button';
import { CodeViewerDialog } from '../library/CodeViewerDialog';
import { Code2 } from 'lucide-react';

const cardCode = `import { Card } from './components/library/Card';
import { Button } from './components/library/Button';

// Basic Card
<Card>
  <p>This is a basic card with default padding.</p>
</Card>

// Card with Header
<Card header={<h3>Card Title</h3>}>
  <p>Card content goes here. This card has a header section.</p>
</Card>

// Card with Footer
<Card footer={
  <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
    <Button variant="ghost" size="sm">Cancel</Button>
    <Button variant="primary" size="sm">Save</Button>
  </div>
}>
  <p>Card with action buttons in the footer.</p>
</Card>

// Card with Header and Footer
<Card 
  header={<h3>Complete Card</h3>}
  footer={
    <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
      <Button variant="ghost" size="sm">Cancel</Button>
      <Button variant="primary" size="sm">Confirm</Button>
    </div>
  }
>
  <p>This card has both header and footer sections.</p>
</Card>

// Different Padding Sizes
<Card padding="sm">
  <p>Card with small padding</p>
</Card>

<Card padding="md">
  <p>Card with medium padding (default)</p>
</Card>

<Card padding="lg">
  <p>Card with large padding</p>
</Card>

// No Padding
<Card padding="none">
  <img src="image.jpg" alt="Full bleed image" style={{ width: '100%' }} />
</Card>`;

export function CardShowcase() {
  const [codeOpen, setCodeOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ marginBottom: 'var(--spacing-xs)' }}>Card</h2>
          <p style={{ color: 'var(--color-dark-40)' }}>
            Container component with optional header and footer sections
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

      {/* Basic Card */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Basic</h3>
        <Card>
          <p>This is a basic card with default padding. Cards use DropShadow1 from the Design System.</p>
        </Card>
      </div>

      {/* Card with Header */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>With Header</h3>
        <Card header={<h4>Card Title</h4>}>
          <p>Card content goes here. This card has a header section with a subtle background.</p>
        </Card>
      </div>

      {/* Card with Footer */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>With Footer</h3>
        <Card footer={
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Save</Button>
          </div>
        }>
          <p>Card with action buttons in the footer section.</p>
        </Card>
      </div>

      {/* Complete Card */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Complete Card</h3>
        <Card 
          header={<h4>User Profile</h4>}
          footer={
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
              <Button variant="ghost" size="sm">Cancel</Button>
              <Button variant="primary" size="sm">Save Changes</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> john@example.com</p>
            <p><strong>Role:</strong> Administrator</p>
          </div>
        </Card>
      </div>

      {/* Padding Variants */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Padding Sizes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-md)' }}>
          <Card padding="sm">
            <p>Small padding</p>
          </Card>
          <Card padding="md">
            <p>Medium padding (default)</p>
          </Card>
          <Card padding="lg">
            <p>Large padding</p>
          </Card>
        </div>
      </div>

      <CodeViewerDialog
        open={codeOpen}
        onOpenChange={setCodeOpen}
        title="Card Component"
        code={cardCode}
      />
    </div>
  );
}
