import { useState } from 'react';
import { Modal } from '../library/Modal';
import { Button } from '../library/Button';

export function ModalShowcase() {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

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
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Modal</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        A dialog overlay that displays content on top of the main page.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Sizes</h4>
        <div style={gridStyles}>
          <Button onClick={() => setIsOpen1(true)}>Small Modal</Button>
          <Button onClick={() => setIsOpen2(true)}>Medium Modal</Button>
          <Button onClick={() => setIsOpen3(true)}>Large Modal</Button>
          <Button onClick={() => setIsOpen4(true)}>XL Modal</Button>
        </div>
      </div>

      <Modal
        isOpen={isOpen1}
        onClose={() => setIsOpen1(false)}
        title="Small Modal"
        size="sm"
      >
        <p style={{ color: 'var(--color-dark-80)' }}>
          This is a small modal dialog. It's perfect for simple messages or confirmations.
        </p>
      </Modal>

      <Modal
        isOpen={isOpen2}
        onClose={() => setIsOpen2(false)}
        title="Medium Modal"
        size="md"
      >
        <p style={{ color: 'var(--color-dark-80)', marginBottom: 'var(--spacing-md)' }}>
          This is a medium-sized modal dialog. It provides more space for content.
        </p>
        <p style={{ color: 'var(--color-dark-80)' }}>
          You can include multiple paragraphs, forms, or other components here.
        </p>
      </Modal>

      <Modal
        isOpen={isOpen3}
        onClose={() => setIsOpen3(false)}
        title="Large Modal"
        size="lg"
      >
        <p style={{ color: 'var(--color-dark-80)', marginBottom: 'var(--spacing-md)' }}>
          This is a large modal dialog with plenty of space for complex content.
        </p>
        <p style={{ color: 'var(--color-dark-80)', marginBottom: 'var(--spacing-md)' }}>
          Large modals are great for forms, detailed information, or multi-step processes.
        </p>
        <p style={{ color: 'var(--color-dark-80)' }}>
          The modal will scroll if the content exceeds the viewport height.
        </p>
      </Modal>

      <Modal
        isOpen={isOpen4}
        onClose={() => setIsOpen4(false)}
        title="Extra Large Modal"
        size="xl"
      >
        <div style={{ color: 'var(--color-dark-80)' }}>
          <p style={{ marginBottom: 'var(--spacing-md)' }}>
            This is an extra large modal, perfect for dashboards or complex interfaces.
          </p>
          <h4 style={{ marginTop: 'var(--spacing-lg)', marginBottom: 'var(--spacing-sm)' }}>
            Features
          </h4>
          <ul style={{ paddingLeft: 'var(--spacing-lg)' }}>
            <li>Maximum width for complex layouts</li>
            <li>Responsive design</li>
            <li>Automatic scrolling for overflow content</li>
            <li>Accessible keyboard navigation</li>
          </ul>
        </div>
      </Modal>
    </div>
  );
}
