import { Loading } from '../library/Loading';

export function LoadingShowcase() {
  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  const gridStyles = {
    display: 'flex',
    gap: 'var(--spacing-2xl)',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    marginTop: 'var(--spacing-lg)',
  };

  const boxStyles = {
    padding: 'var(--spacing-xl)',
    backgroundColor: 'var(--color-light-10)',
    borderRadius: 'var(--radius-lg)',
    display: 'inline-flex',
  };

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Loading</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        Indicates that content is loading or processing.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Spinner Variant</h4>
        <div style={gridStyles}>
          <div style={boxStyles}>
            <Loading variant="spinner" size="sm" />
          </div>
          <div style={boxStyles}>
            <Loading variant="spinner" size="md" />
          </div>
          <div style={boxStyles}>
            <Loading variant="spinner" size="lg" />
          </div>
        </div>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Dots Variant</h4>
        <div style={gridStyles}>
          <div style={boxStyles}>
            <Loading variant="dots" size="sm" />
          </div>
          <div style={boxStyles}>
            <Loading variant="dots" size="md" />
          </div>
          <div style={boxStyles}>
            <Loading variant="dots" size="lg" />
          </div>
        </div>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Pulse Variant</h4>
        <div style={gridStyles}>
          <div style={boxStyles}>
            <Loading variant="pulse" size="sm" />
          </div>
          <div style={boxStyles}>
            <Loading variant="pulse" size="md" />
          </div>
          <div style={boxStyles}>
            <Loading variant="pulse" size="lg" />
          </div>
        </div>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>With Text</h4>
        <div style={gridStyles}>
          <div style={boxStyles}>
            <Loading variant="spinner" text="Loading..." />
          </div>
          <div style={boxStyles}>
            <Loading variant="dots" text="Processing..." />
          </div>
          <div style={boxStyles}>
            <Loading variant="pulse" text="Please wait..." />
          </div>
        </div>
      </div>
    </div>
  );
}
