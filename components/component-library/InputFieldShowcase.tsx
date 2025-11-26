import { useState } from 'react';
import { InputField } from '../library/InputField';
import { CodeViewerDialog } from '../library/CodeViewerDialog';
import { Code2, Mail, Search, User } from 'lucide-react';

const inputFieldCode = `import { InputField } from './components/library/InputField';
import { Mail, Search, User } from 'lucide-react';

// Basic Input
<InputField 
  label="Email"
  placeholder="Enter your email"
/>

// With Left Icon
<InputField 
  label="Search"
  placeholder="Search..."
  leftIcon={<Search className="w-5 h-5" />}
/>

// With Right Icon
<InputField 
  label="Username"
  placeholder="Enter username"
  rightIcon={<User className="w-5 h-5" />}
/>

// Password Input (with toggle visibility)
<InputField 
  label="Password"
  type="password"
  placeholder="Enter password"
/>

// Success Variant
<InputField 
  label="Email"
  variant="success"
  placeholder="john@example.com"
  helperText="Email is valid!"
/>

// Error Variant
<InputField 
  label="Email"
  variant="error"
  placeholder="invalid-email"
  helperText="Please enter a valid email address"
/>

// Full Width
<InputField 
  label="Full Width Input"
  placeholder="This input spans full width"
  fullWidth
/>`;

export function InputFieldShowcase() {
  const [codeOpen, setCodeOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ marginBottom: 'var(--spacing-xs)' }}>Input Field</h2>
          <p style={{ color: 'var(--color-dark-40)' }}>
            Text input fields with icons, validation states, and password toggle
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

      {/* Basic Inputs */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Basic</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', maxWidth: '400px' }}>
          <InputField 
            label="Email"
            placeholder="Enter your email"
          />
          <InputField 
            label="Username"
            placeholder="Enter your username"
          />
        </div>
      </div>

      {/* With Icons */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>With Icons</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', maxWidth: '400px' }}>
          <InputField 
            label="Search"
            placeholder="Search..."
            leftIcon={<Search className="w-5 h-5" />}
          />
          <InputField 
            label="Email"
            placeholder="Enter your email"
            leftIcon={<Mail className="w-5 h-5" />}
          />
          <InputField 
            label="Username"
            placeholder="Enter username"
            rightIcon={<User className="w-5 h-5" />}
          />
        </div>
      </div>

      {/* Password Input */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Password</h3>
        <div style={{ maxWidth: '400px' }}>
          <InputField 
            label="Password"
            type="password"
            placeholder="Enter password"
          />
        </div>
      </div>

      {/* Validation States */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Validation States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', maxWidth: '400px' }}>
          <InputField 
            label="Email"
            variant="success"
            placeholder="john@example.com"
            helperText="Email is valid!"
          />
          <InputField 
            label="Email"
            variant="error"
            placeholder="invalid-email"
            helperText="Please enter a valid email address"
          />
          <InputField 
            label="Username"
            variant="default"
            placeholder="Enter username"
            helperText="Choose a unique username"
          />
        </div>
      </div>

      {/* Full Width */}
      <div>
        <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-80)' }}>Full Width</h3>
        <InputField 
          label="Full Width Input"
          placeholder="This input spans full width"
          fullWidth
        />
      </div>

      <CodeViewerDialog
        open={codeOpen}
        onOpenChange={setCodeOpen}
        title="Input Field Component"
        code={inputFieldCode}
      />
    </div>
  );
}
