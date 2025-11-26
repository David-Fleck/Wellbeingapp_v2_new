import { useState } from 'react';
import { RadioGroup } from '../library/Radio';

export function RadioShowcase() {
  const [value1, setValue1] = useState('option1');
  const [value2, setValue2] = useState('small');

  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'xlarge', label: 'Extra Large', disabled: true },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Radio Button</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        Allows users to select a single option from a set of mutually exclusive options.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Default</h4>
        <RadioGroup
          name="default-group"
          options={options}
          value={value1}
          onChange={setValue1}
        />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>With Disabled Option</h4>
        <RadioGroup
          name="size-group"
          options={sizeOptions}
          value={value2}
          onChange={setValue2}
        />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>With Helper Text</h4>
        <RadioGroup
          name="error-group"
          options={options}
          error
          helperText="Please select an option"
        />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Disabled Group</h4>
        <RadioGroup
          name="disabled-group"
          options={options}
          disabled
        />
      </div>
    </div>
  );
}
