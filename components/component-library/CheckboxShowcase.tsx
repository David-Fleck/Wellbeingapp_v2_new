import { useState } from 'react';
import { Checkbox } from '../library/Checkbox';

export function CheckboxShowcase() {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);

  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: 'var(--spacing-xl)',
    marginTop: 'var(--spacing-lg)',
  };

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Checkbox</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        A control that allows users to select or deselect options.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Default States</h4>
        <div style={gridStyles}>
          <Checkbox 
            label="Unchecked"
            checked={checked1}
            onChange={(e) => setChecked1(e.target.checked)}
          />
          <Checkbox 
            label="Checked"
            checked={checked2}
            onChange={(e) => setChecked2(e.target.checked)}
          />
        </div>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>With Helper Text</h4>
        <div style={gridStyles}>
          <Checkbox 
            label="Accept terms"
            helperText="You must accept to continue"
            checked={checked3}
            onChange={(e) => setChecked3(e.target.checked)}
          />
          <Checkbox 
            label="Subscribe to newsletter"
            error
            helperText="This field is required"
            checked={checked4}
            onChange={(e) => setChecked4(e.target.checked)}
          />
        </div>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Disabled State</h4>
        <div style={gridStyles}>
          <Checkbox 
            label="Disabled unchecked"
            disabled
          />
          <Checkbox 
            label="Disabled checked"
            checked
            disabled
          />
        </div>
      </div>
    </div>
  );
}
