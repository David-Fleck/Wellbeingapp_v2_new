import { useState } from 'react';
import { Alert } from '../library/Alert';

export function AlertShowcase() {
  const [showAlert1, setShowAlert1] = useState(true);
  const [showAlert2, setShowAlert2] = useState(true);
  const [showAlert3, setShowAlert3] = useState(true);
  const [showAlert4, setShowAlert4] = useState(true);

  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Alert</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        Displays important information or feedback to users.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Info</h4>
        {showAlert1 && (
          <Alert 
            variant="info" 
            title="Information"
            onClose={() => setShowAlert1(false)}
          >
            This is an informational message to help you understand something.
          </Alert>
        )}
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Success</h4>
        {showAlert2 && (
          <Alert 
            variant="success" 
            title="Success!"
            onClose={() => setShowAlert2(false)}
          >
            Your changes have been saved successfully.
          </Alert>
        )}
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Warning</h4>
        {showAlert3 && (
          <Alert 
            variant="warning" 
            title="Warning"
            onClose={() => setShowAlert3(false)}
          >
            Please review your information before proceeding.
          </Alert>
        )}
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Error</h4>
        {showAlert4 && (
          <Alert 
            variant="error" 
            title="Error"
            onClose={() => setShowAlert4(false)}
          >
            Something went wrong. Please try again later.
          </Alert>
        )}
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Without Close Button</h4>
        <Alert variant="info">
          This alert cannot be dismissed.
        </Alert>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Without Title</h4>
        <Alert variant="success">
          This is a simple success message without a title.
        </Alert>
      </div>
    </div>
  );
}
