import { Container } from '../library/Container';

export function ContainerShowcase() {
  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  const demoBoxStyles = {
    padding: 'var(--spacing-lg)',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    borderRadius: 'var(--radius-lg)',
    textAlign: 'center' as const,
    fontFamily: 'var(--font-family-primary)',
  };

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Container</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        A layout component that constrains content to a maximum width and centers it.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Small (640px)</h4>
        <Container size="sm">
          <div style={demoBoxStyles}>
            Small Container Content
          </div>
        </Container>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Medium (768px)</h4>
        <Container size="md">
          <div style={demoBoxStyles}>
            Medium Container Content
          </div>
        </Container>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Large (1024px) - Default</h4>
        <Container size="lg">
          <div style={demoBoxStyles}>
            Large Container Content
          </div>
        </Container>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Extra Large (1280px)</h4>
        <Container size="xl">
          <div style={demoBoxStyles}>
            Extra Large Container Content
          </div>
        </Container>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Full Width</h4>
        <Container size="full">
          <div style={demoBoxStyles}>
            Full Width Container Content
          </div>
        </Container>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Without Padding</h4>
        <Container padding={false}>
          <div style={demoBoxStyles}>
            Container Without Padding
          </div>
        </Container>
      </div>
    </div>
  );
}
