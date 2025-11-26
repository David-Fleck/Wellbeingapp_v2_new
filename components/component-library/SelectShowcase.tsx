import { useState } from 'react';
import { Select } from '../library/Select';

export function SelectShowcase() {
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('medium');

  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  const countries = [
    { value: '', label: 'Select a country' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
  ];

  const sizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xlarge', label: 'Extra Large', disabled: true },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Select</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        A dropdown menu for selecting an option from a list.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Default</h4>
        <Select
          label="Country"
          options={countries}
          value={value1}
          onChange={(e) => setValue1(e.target.value)}
        />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>With Helper Text</h4>
        <Select
          label="Size"
          options={sizes}
          value={value2}
          onChange={(e) => setValue2(e.target.value)}
          helperText="Choose your preferred size"
        />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Error State</h4>
        <Select
          label="Required Field"
          options={countries}
          error
          helperText="This field is required"
        />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Disabled</h4>
        <Select
          label="Disabled"
          options={sizes}
          disabled
          value="medium"
        />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Full Width</h4>
        <Select
          label="Full Width Select"
          options={countries}
          fullWidth
        />
      </div>
    </div>
  );
}
