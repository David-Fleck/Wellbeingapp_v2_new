import { useState } from 'react';
import { Toast } from '../library/Toast';
import { Button } from '../library/Button';

export function ToastShowcase() {
  const [showToast1, setShowToast1] = useState(false);
  const [showToast2, setShowToast2] = useState(false);
  const [showToast3, setShowToast3] = useState(false);
  const [showToast4, setShowToast4] = useState(false);

  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  const gridStyles = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 'var(--spacing-md)',
    marginTop: 'var(--spacing-lg)',
  };

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Toast</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        Brief, temporary notifications that appear to provide feedback.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Variants</h4>
        <div style={gridStyles}>
          <Button onClick={() => setShowToast1(true)}>Show Info Toast</Button>
          <Button onClick={() => setShowToast2(true)}>Show Success Toast</Button>
          <Button onClick={() => setShowToast3(true)}>Show Warning Toast</Button>
          <Button onClick={() => setShowToast4(true)}>Show Error Toast</Button>
        </div>
      </div>

      <div style={{ 
        padding: 'var(--spacing-md)', 
        backgroundColor: 'var(--color-light-10)', 
        borderRadius: 'var(--radius-lg)',
        color: 'var(--color-dark-80)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        <p>Click the buttons above to see toast notifications appear in the top-right corner.</p>
        <p style={{ marginTop: 'var(--spacing-sm)' }}>Toasts will automatically dismiss after 3 seconds.</p>
      </div>

      {/* Toast Components */}
      <Toast
        variant="info"
        title="Information"
        message="This is an informational toast message."
        isVisible={showToast1}
        onClose={() => setShowToast1(false)}
        position="top-right"
      />

      <Toast
        variant="success"
        title="Success!"
        message="Your changes have been saved successfully."
        isVisible={showToast2}
        onClose={() => setShowToast2(false)}
        position="top-right"
      />

      <Toast
        variant="warning"
        title="Warning"
        message="Please review your information before proceeding."
        isVisible={showToast3}
        onClose={() => setShowToast3(false)}
        position="top-right"
      />

      <Toast
        variant="error"
        title="Error"
        message="Something went wrong. Please try again."
        isVisible={showToast4}
        onClose={() => setShowToast4(false)}
        position="top-right"
      />
    </div>
  );
}
