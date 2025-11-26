import { Tabs } from '../library/Tabs';

export function TabsShowcase() {
  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      content: (
        <div style={{ color: 'var(--color-dark-80)' }}>
          <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Profile Settings</h4>
          <p>Manage your profile information and preferences here.</p>
        </div>
      ),
    },
    {
      id: 'account',
      label: 'Account',
      content: (
        <div style={{ color: 'var(--color-dark-80)' }}>
          <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Account Settings</h4>
          <p>Update your account details and security settings.</p>
        </div>
      ),
    },
    {
      id: 'notifications',
      label: 'Notifications',
      content: (
        <div style={{ color: 'var(--color-dark-80)' }}>
          <h4 style={{ marginBottom: 'var(--spacing-sm)' }}>Notification Preferences</h4>
          <p>Control how and when you receive notifications.</p>
        </div>
      ),
    },
  ];

  const tabsWithDisabled = [
    ...tabs,
    {
      id: 'disabled',
      label: 'Disabled',
      disabled: true,
      content: <div>This content is disabled</div>,
    },
  ];

  return (
    <div>
      <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Tabs</h3>
      <p style={{ 
        color: 'var(--color-dark-60)', 
        marginBottom: 'var(--spacing-xl)',
        fontFamily: 'var(--font-family-primary)',
      }}>
        Organize content into separate views where only one view can be visible at a time.
      </p>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Default</h4>
        <Tabs tabs={tabs} />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>With Disabled Tab</h4>
        <Tabs tabs={tabsWithDisabled} />
      </div>

      <div style={sectionStyles}>
        <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Full Width</h4>
        <Tabs tabs={tabs} fullWidth />
      </div>
    </div>
  );
}
