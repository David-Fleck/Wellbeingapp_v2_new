import { Button } from '../components/library/Button';
import { Card } from '../components/library/Card';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Database, CheckCircle } from 'lucide-react';

export interface DevGatewayProps {
  onNavigate?: (screen: 'design' | 'login' | 'registration' | 'welcome' | 'taskboard') => void;
}

export function DevGateway({ onNavigate }: DevGatewayProps) {
  const [restoredBackup, setRestoredBackup] = useState<string | null>(null);

  useEffect(() => {
    // Check for restore confirmation in URL
    const urlParams = new URLSearchParams(window.location.search);
    const restored = urlParams.get('restored');
    
    if (restored) {
      // 🔒 SECURITY: Validate backup ID format to prevent XSS
      // Valid format: backup-YYYY-MM-DDTHH-MM-SS (e.g., backup-2024-11-21T10-30-45)
      const backupIdPattern = /^backup-\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}$/;
      
      if (!backupIdPattern.test(restored)) {
        console.warn('🚫 Invalid backup ID format detected:', restored);
        // Clean up invalid parameter
        window.history.replaceState({}, '', '/');
        return;
      }
      
      setRestoredBackup(restored);
      toast.success(`Backup restored successfully: ${restored}`, {
        duration: 5000,
        icon: <CheckCircle className="w-5 h-5" />,
      });
      
      // Clean up URL parameter
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const containerStyles = {
    paddingTop: 'var(--spacing-vh-md-v)',
    paddingBottom: 'var(--spacing-vh-md-v)',
    paddingLeft: 'var(--spacing-vh-md-h)',
    paddingRight: 'var(--spacing-vh-md-h)',
    minHeight: '100vh',
    backgroundColor: 'var(--color-white)',
  };

  const headlineStyles = {
    fontFamily: 'var(--font-family-primary)',
    color: 'var(--color-dark-100)',
    marginBottom: 'var(--spacing-lg)',
    marginTop: 0,
  };

  const cardHeaderStyles = {
    fontFamily: 'var(--font-family-primary)',
    color: 'var(--color-dark-100)',
    margin: 0,
  };

  const buttonGroupStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-md)',
  };

  const buttonGroupHorizontalStyles = {
    display: 'flex',
    flexDirection: 'row' as const,
    gap: 'var(--spacing-md)',
    flexWrap: 'wrap' as const,
  };

  const buttonHalfWidthStyles = {
    flex: '1 1 calc(50% - var(--spacing-md) / 2)',
    minWidth: '140px',
  };

  const sectionSpacing = {
    marginBottom: 'var(--spacing-lg)',
  };

  const handleNavigation = (screenName: string, screen: 'design' | 'login' | 'registration' | 'welcome' | 'taskboard' | null) => {
    if (screen && onNavigate) {
      onNavigate(screen);
    } else {
      console.log(`Navigation to "${screenName}" - Screen not yet implemented`);
    }
  };

  return (
    <div style={containerStyles}>
      <style>{`
        .button-group-responsive {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }
        
        @media (min-width: 768px) {
          .button-group-responsive {
            flex-direction: row;
            flex-wrap: wrap;
          }
          
          .button-group-responsive .button-half {
            flex: 1 1 calc(50% - var(--spacing-md) / 2);
            min-width: 140px;
          }
        }
      `}</style>
      
      {/* Version Label - Bottom Right */}
      <div style={{
        position: 'fixed',
        bottom: 'var(--spacing-md)',
        right: 'var(--spacing-md)',
        backgroundColor: restoredBackup ? 'var(--color-success-10)' : 'var(--color-light-40)',
        border: restoredBackup ? '1px solid var(--color-success-100)' : '1px solid var(--color-light-60)',
        borderRadius: 'var(--radius-md)',
        padding: 'var(--spacing-sm) var(--spacing-md)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-sm)',
        fontSize: '11px',
        color: restoredBackup ? 'var(--color-success-100)' : 'var(--color-dark-80)',
        fontFamily: 'var(--font-family-primary)',
        boxShadow: 'var(--shadow-sm)',
        zIndex: 100,
      }}>
        <Database style={{ width: '14px', height: '14px' }} />
        <span>{restoredBackup || 'V2-DEV'}</span>
      </div>

      <h3 style={headlineStyles}>Dev-Gateway</h3>
      
      {/* Design Button - Top */}
      <div style={sectionSpacing}>
        <Button
          variant="primary"
          fullWidth
          onClick={() => handleNavigation('Design', 'design')}
        >
          Design
        </Button>
      </div>

      {/* Card 1: Authentification */}
      <div style={sectionSpacing}>
        <Card header={<h4 style={cardHeaderStyles}>Authentification</h4>}>
          <div className="button-group-responsive">
            <Button variant="primary" fullWidth className="button-half" onClick={() => handleNavigation('Log-in', 'login')}>
              Log-in
            </Button>
            <Button variant="primary" fullWidth className="button-half" onClick={() => handleNavigation('Registration', 'registration')}>
              Registration
            </Button>
          </div>
        </Card>
      </div>

      {/* Card 2: Start Interactions */}
      <div style={sectionSpacing}>
        <Card header={<h4 style={cardHeaderStyles}>Start Interactions</h4>}>
          <div className="button-group-responsive">
            <Button variant="primary" fullWidth className="button-half" onClick={() => handleNavigation('Taskboard', 'taskboard')}>
              Taskboard
            </Button>
            <Button variant="primary" fullWidth className="button-half" onClick={() => handleNavigation('Welcome', 'welcome')}>
              Welcome
            </Button>
          </div>
        </Card>
      </div>

      {/* Card 3: Bedürfnisse erkennen */}
      <div style={sectionSpacing}>
        <Card header={<h4 style={cardHeaderStyles}>Bedürfnisse erkennen</h4>}>
          <div className="button-group-responsive">
            <Button variant="primary" fullWidth className="button-half" onClick={() => handleNavigation('1. Intro', null)}>
              1. Intro
            </Button>
            <Button variant="primary" fullWidth className="button-half" onClick={() => handleNavigation('Bedürfnisse', null)}>
              Bedürfnisse
            </Button>
          </div>
        </Card>
      </div>

      {/* Card 4: Erlebnisse reflektieren */}
      <div style={sectionSpacing}>
        <Card header={<h4 style={cardHeaderStyles}>Erlebnisse reflektieren</h4>}>
          <div className="button-group-responsive">
            <Button variant="primary" fullWidth className="button-half" onClick={() => handleNavigation('2. Intro', null)}>
              2. Intro
            </Button>
            <Button variant="primary" fullWidth className="button-half" onClick={() => handleNavigation('E-Stichwort', null)}>
              E-Stichwort
            </Button>
            <Button variant="primary" fullWidth className="button-half" onClick={() => handleNavigation('Erlebnis-Spinner', null)}>
              Erlebnis-Spinner
            </Button>
            <Button variant="primary" fullWidth className="button-half" onClick={() => handleNavigation('E-Detail', null)}>
              E-Detail
            </Button>
          </div>
        </Card>
      </div>

      {/* Card 5: Prioritäten */}
      <div style={sectionSpacing}>
        <Card header={<h4 style={cardHeaderStyles}>Prioritäten</h4>}>
          <div className="button-group-responsive">
            <Button variant="primary" fullWidth className="button-half" onClick={() => handleNavigation('3. Intro', null)}>
              3. Intro
            </Button>
            <Button variant="primary" fullWidth className="button-half" onClick={() => handleNavigation('Prioritäten', null)}>
              Prioritäten
            </Button>
          </div>
        </Card>
      </div>

      {/* Auswertung Button - Bottom */}
      <div>
        <Button variant="primary" fullWidth onClick={() => handleNavigation('Auswertung', null)}>
          Auswertung
        </Button>
      </div>
    </div>
  );
}
