import { ReactNode, useState } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  fullWidth?: boolean;
  className?: string;
}

export function Tabs({ 
  tabs,
  defaultTab,
  fullWidth = false,
  className = '',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-md)',
    width: fullWidth ? '100%' : 'auto',
  };

  const tabListStyles = {
    display: 'flex',
    gap: 'var(--spacing-xs)',
    borderBottom: `var(--border-width-default) var(--border-style-solid) var(--border-color-default)`,
  };

  const tabButtonStyles = (isActive: boolean, disabled?: boolean) => ({
    padding: 'var(--spacing-md) var(--spacing-lg)',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: isActive 
      ? `var(--border-width-thick) var(--border-style-solid) var(--color-primary)` 
      : `var(--border-width-thick) var(--border-style-solid) transparent`,
    color: isActive ? 'var(--color-primary)' : 'var(--color-dark-60)',
    fontFamily: 'var(--font-family-primary)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'var(--transition-base)',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    marginBottom: 'var(--margin-negative-thin)',
  });

  const contentStyles = {
    padding: 'var(--spacing-md)',
    fontFamily: 'var(--font-family-primary)',
    color: 'var(--color-dark-80)',
  };

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div style={containerStyles} className={className}>
      <div style={tabListStyles}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActiveTab(tab.id)}
            style={tabButtonStyles(activeTab === tab.id, tab.disabled)}
            disabled={tab.disabled}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={contentStyles}>
        {activeTabContent}
      </div>
    </div>
  );
}