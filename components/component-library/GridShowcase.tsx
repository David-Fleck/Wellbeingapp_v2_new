import { Grid } from '../library/Grid';
import { Card } from '../library/Card';

export function GridShowcase() {
  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  const cardContent = (num: number) => (
    <div style={{ 
      padding: 'var(--spacing-lg)', 
      textAlign: 'center' as const,
      color: 'var(--color-dark-80)',
      fontFamily: 'var(--font-family-primary)',
    }}>
      Item {num}
    </div>
  );

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Grid</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        A responsive grid layout system for organizing content.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>2 Columns</h4>
        <Grid columns={2}>
          <Card>{cardContent(1)}</Card>
          <Card>{cardContent(2)}</Card>
          <Card>{cardContent(3)}</Card>
          <Card>{cardContent(4)}</Card>
        </Grid>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>3 Columns - Default</h4>
        <Grid columns={3}>
          <Card>{cardContent(1)}</Card>
          <Card>{cardContent(2)}</Card>
          <Card>{cardContent(3)}</Card>
          <Card>{cardContent(4)}</Card>
          <Card>{cardContent(5)}</Card>
          <Card>{cardContent(6)}</Card>
        </Grid>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>4 Columns</h4>
        <Grid columns={4}>
          <Card>{cardContent(1)}</Card>
          <Card>{cardContent(2)}</Card>
          <Card>{cardContent(3)}</Card>
          <Card>{cardContent(4)}</Card>
        </Grid>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Responsive Auto-fit</h4>
        <Grid responsive>
          <Card>{cardContent(1)}</Card>
          <Card>{cardContent(2)}</Card>
          <Card>{cardContent(3)}</Card>
          <Card>{cardContent(4)}</Card>
          <Card>{cardContent(5)}</Card>
          <Card>{cardContent(6)}</Card>
        </Grid>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Different Gap Sizes</h4>
        <h5 style={{ 
          marginTop: 'var(--spacing-md)', 
          marginBottom: 'var(--spacing-sm)',
          color: 'var(--color-dark-80)',
        }}>
          Small Gap
        </h5>
        <Grid columns={3} gap="sm">
          <Card>{cardContent(1)}</Card>
          <Card>{cardContent(2)}</Card>
          <Card>{cardContent(3)}</Card>
        </Grid>

        <h5 style={{ 
          marginTop: 'var(--spacing-lg)', 
          marginBottom: 'var(--spacing-sm)',
          color: 'var(--color-dark-80)',
        }}>
          Large Gap
        </h5>
        <Grid columns={3} gap="lg">
          <Card>{cardContent(1)}</Card>
          <Card>{cardContent(2)}</Card>
          <Card>{cardContent(3)}</Card>
        </Grid>
      </div>
    </div>
  );
}
