import { Avatar } from '../library/Avatar';

export function AvatarShowcase() {
  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  const gridStyles = {
    display: 'flex',
    gap: 'var(--spacing-xl)',
    alignItems: 'center',
    flexWrap: 'wrap' as const,
    marginTop: 'var(--spacing-lg)',
  };

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Avatar</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        Displays a user's profile image or initials.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Sizes</h4>
        <div style={gridStyles}>
          <Avatar size="sm" name="John Doe" />
          <Avatar size="md" name="Jane Smith" />
          <Avatar size="lg" name="Bob Wilson" />
          <Avatar size="xl" name="Alice Johnson" />
        </div>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>With Images</h4>
        <div style={gridStyles}>
          <Avatar 
            size="sm" 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            alt="User 1"
          />
          <Avatar 
            size="md" 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="User 2"
          />
          <Avatar 
            size="lg" 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
            alt="User 3"
          />
          <Avatar 
            size="xl" 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
            alt="User 4"
          />
        </div>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>With Status</h4>
        <div style={gridStyles}>
          <Avatar 
            size="md" 
            name="Online User"
            status="online"
          />
          <Avatar 
            size="md" 
            name="Away User"
            status="away"
          />
          <Avatar 
            size="md" 
            name="Offline User"
            status="offline"
          />
        </div>
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Empty Avatar</h4>
        <div style={gridStyles}>
          <Avatar size="sm" />
          <Avatar size="md" />
          <Avatar size="lg" />
        </div>
      </div>
    </div>
  );
}
