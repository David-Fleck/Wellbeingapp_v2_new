import { useState } from 'react';
import { Toggle } from '../library/Toggle';

export function ToggleShowcase() {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [toggle3, setToggle3] = useState(false);

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
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Toggle Switch</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        A switch control for toggling between on and off states.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Default States</h4>
        <div style={gridStyles}>
          <Toggle 
            label="Off state"
            checked={toggle1}
            onChange={(e) => setToggle1(e.target.checked)}
          />
          <Toggle 
            label="On state"
            checked={toggle2}
            onChange={(e) => setToggle2(e.target.checked)}
          />
        </div>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>With Helper Text</h4>
        <Toggle 
          label="Enable notifications"
          helperText="You will receive email notifications"
          checked={toggle3}
          onChange={(e) => setToggle3(e.target.checked)}
        />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Disabled States</h4>
        <div style={gridStyles}>
          <Toggle 
            label="Disabled off"
            disabled
          />
          <Toggle 
            label="Disabled on"
            checked
            disabled
          />
        </div>
      </div>
    </div>
  );
}
