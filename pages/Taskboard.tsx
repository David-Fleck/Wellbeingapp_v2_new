import { Tabs, Tab } from '../components/library/Tabs';

export interface TaskboardProps {
  onNavigate?: (screen: 'design' | 'login' | 'registration' | 'welcome' | 'taskboard') => void;
}

export function Taskboard({ onNavigate }: TaskboardProps) {
  // Tab Definitions
  const tabs: Tab[] = [
    {
      id: 'david',
      label: 'David',
      content: (
        <div>
          <p>David's tasks will be displayed here.</p>
        </div>
      ),
    },
    {
      id: 'anna',
      label: 'Anna',
      content: (
        <div>
          <p>Anna's tasks will be displayed here.</p>
        </div>
      ),
    },
    {
      id: 'dario',
      label: 'Dario',
      content: (
        <div>
          <p>Dario's tasks will be displayed here.</p>
        </div>
      ),
    },
    {
      id: 'eilo',
      label: 'Eilo',
      content: (
        <div>
          <p>Eilo's tasks will be displayed here.</p>
        </div>
      ),
    },
  ];

  const containerStyles = {
    paddingTop: 'var(--spacing-vh-sm-v)',
    paddingLeft: 'var(--spacing-vh-sm-h)',
    paddingRight: 'var(--spacing-vh-sm-h)',
    minHeight: '100vh',
    backgroundColor: 'var(--color-white)',
  };

  const headlineStyles = {
    fontFamily: 'var(--font-family-primary)',
    color: 'var(--color-dark-100)',
    marginTop: 0,
    marginBottom: 0,
  };

  const spacingStyles = {
    height: 'var(--spacing-vh-xs-v)',
  };

  return (
    <div style={containerStyles}>
      {/* Combined Fluid Spacing VH-SM */}
      
      {/* H1 Headline */}
      <h1 style={headlineStyles}>Taskboard</h1>
      
      {/* Combined Fluid Spacing VH-XS */}
      <div style={spacingStyles} />
      
      {/* Tab Navigation */}
      <Tabs 
        tabs={tabs} 
        defaultTab="david"
        fullWidth
      />
    </div>
  );
}
