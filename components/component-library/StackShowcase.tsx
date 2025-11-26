import { Stack } from '../library/Stack';
import { Button } from '../library/Button';
import { Card } from '../library/Card';

export function StackShowcase() {
  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  const itemStyles = {
    padding: 'var(--spacing-md)',
    backgroundColor: 'var(--color-light-40)',
    borderRadius: 'var(--radius-md)',
    textAlign: 'center' as const,
    fontFamily: 'var(--font-family-primary)',
  };

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Stack</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        A layout component for arranging items in a column or row with consistent spacing.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Vertical Stack (Default)</h4>
        <Stack>
          <div style={itemStyles}>Item 1</div>
          <div style={itemStyles}>Item 2</div>
          <div style={itemStyles}>Item 3</div>
        </Stack>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Horizontal Stack</h4>
        <Stack direction="horizontal">
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
        </Stack>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Different Gap Sizes</h4>
        <Stack gap="xs">
          <div style={itemStyles}>Extra Small Gap</div>
          <div style={itemStyles}>Extra Small Gap</div>
        </Stack>
        <div style={{ marginTop: 'var(--spacing-lg)' }}>
          <Stack gap="xl">
            <div style={itemStyles}>Extra Large Gap</div>
            <div style={itemStyles}>Extra Large Gap</div>
          </Stack>
        </div>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Alignment</h4>
        <h5 style={{ 
          marginTop: 'var(--spacing-md)', 
          marginBottom: 'var(--spacing-sm)',
          color: 'var(--color-dark-80)',
        }}>
          Align Start
        </h5>
        <Stack direction="horizontal" align="start" style={{ height: '100px', backgroundColor: 'var(--color-light-10)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)' }}>
          <div style={itemStyles}>Item 1</div>
          <div style={{...itemStyles, padding: 'var(--spacing-xl)'}}>Tall Item 2</div>
          <div style={itemStyles}>Item 3</div>
        </Stack>

        <h5 style={{ 
          marginTop: 'var(--spacing-lg)', 
          marginBottom: 'var(--spacing-sm)',
          color: 'var(--color-dark-80)',
        }}>
          Align Center
        </h5>
        <Stack direction="horizontal" align="center" style={{ height: '100px', backgroundColor: 'var(--color-light-10)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)' }}>
          <div style={itemStyles}>Item 1</div>
          <div style={{...itemStyles, padding: 'var(--spacing-xl)'}}>Tall Item 2</div>
          <div style={itemStyles}>Item 3</div>
        </Stack>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Justify Content</h4>
        <h5 style={{ 
          marginTop: 'var(--spacing-md)', 
          marginBottom: 'var(--spacing-sm)',
          color: 'var(--color-dark-80)',
        }}>
          Space Between
        </h5>
        <Stack direction="horizontal" justify="between" style={{ backgroundColor: 'var(--color-light-10)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)' }}>
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </Stack>

        <h5 style={{ 
          marginTop: 'var(--spacing-lg)', 
          marginBottom: 'var(--spacing-sm)',
          color: 'var(--color-dark-80)',
        }}>
          Center
        </h5>
        <Stack direction="horizontal" justify="center" style={{ backgroundColor: 'var(--color-light-10)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-lg)' }}>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Stack>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>With Wrap</h4>
        <Stack direction="horizontal" wrap>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
          <Button>Button 5</Button>
          <Button>Button 6</Button>
          <Button>Button 7</Button>
          <Button>Button 8</Button>
        </Stack>
      </div>
    </div>
  );
}
