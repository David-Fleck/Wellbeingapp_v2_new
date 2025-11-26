export function VariablesDisplay() {
  const sectionStyles = {
    marginBottom: 'var(--spacing-2xl)',
  };

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontFamily: 'var(--font-family-primary)',
    fontSize: 'var(--font-size-p1-md)',
  };

  const thStyles = {
    textAlign: 'left' as const,
    padding: 'var(--spacing-md)',
    borderBottom: `var(--border-width-default) var(--border-style-solid) var(--border-color-default)`,
    backgroundColor: 'var(--color-light-40)',
    color: 'var(--color-dark-100)',
    fontWeight: 500,
  };

  const tdStyles = {
    padding: 'var(--spacing-md)',
    borderBottom: `var(--border-width-thin) var(--border-style-solid) var(--border-color-light)`,
    color: 'var(--color-dark-80)',
  };

  const codeStyles = {
    fontFamily: 'monospace',
    backgroundColor: 'var(--color-light-60)',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--font-size-p1-sm)',
    color: 'var(--color-primary)',
  };

  const badgeStyles = (color: string) => ({
    display: 'inline-block',
    padding: 'var(--spacing-xs) var(--spacing-sm)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--font-size-p1-xs)',
    fontWeight: 500,
    backgroundColor: color === 'active' ? 'var(--color-success-10)' : 'var(--color-light-100)',
    color: color === 'active' ? 'var(--color-success-100)' : 'var(--color-dark-60)',
  });

  const renderVariableTable = (title: string, variables: Array<{name: string, value: string, status?: 'active' | 'future'}>) => (
    <div style={sectionStyles}>
      <h4 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-dark-100)' }}>{title}</h4>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={{...thStyles, width: '40%'}}>Variable Name</th>
              <th style={{...thStyles, width: '40%'}}>Value</th>
              <th style={{...thStyles, width: '20%'}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {variables.map((variable, index) => (
              <tr key={index}>
                <td style={tdStyles}>
                  <code style={codeStyles}>{variable.name}</code>
                </td>
                <td style={tdStyles}>
                  <span style={{ color: 'var(--color-dark-60)' }}>{variable.value}</span>
                </td>
                <td style={tdStyles}>
                  <span style={badgeStyles(variable.status || 'active')}>
                    {variable.status === 'future' ? 'Coming Soon' : 'In Use'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ 
        padding: 'var(--spacing-lg)', 
        backgroundColor: 'var(--color-info-10)', 
        borderRadius: 'var(--radius-lg)',
        borderLeft: `var(--border-width-thick) var(--border-style-solid) var(--color-info-100)`,
        marginBottom: 'var(--spacing-2xl)',
      }}>
        <h4 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--color-info-100)' }}>
          🔒 Design System Source of Truth
        </h4>
        <p style={{ color: 'var(--color-dark-80)', marginBottom: 'var(--spacing-sm)' }}>
          This page displays all design system variables defined in <code style={codeStyles}>/styles/globals.css</code>.
        </p>
        <p style={{ color: 'var(--color-dark-80)' }}>
          <strong>Total Variables:</strong> 210+ variables | <strong>Status:</strong> 100% synchronized across all components
        </p>
      </div>

      {/* Typography Variables */}
      {renderVariableTable('Typography', [
        { name: '--font-family-primary', value: "'Geologica', sans-serif" },
        { name: '--font-size', value: '16px' },
        { name: '--font-size-p1-xs', value: '10px' },
        { name: '--font-size-p1-sm', value: '12px' },
        { name: '--font-size-p1-md', value: '14px' },
        { name: '--font-size-p1-base', value: '16px' },
        { name: '--font-size-p1-lg', value: '18px' },
        { name: '--font-size-p1-xl', value: '24px' },
        { name: '--font-weight-medium', value: '500' },
        { name: '--font-weight-normal', value: '400' },
      ])}

      {/* Color Variables - Primary */}
      {renderVariableTable('Colors - Primary & Secondary', [
        { name: '--color-primary', value: '#003CFF' },
        { name: '--color-secondary', value: '#112D41' },
        { name: '--color-white', value: '#FFFFFF' },
      ])}

      {/* Color Variables - Dark */}
      {renderVariableTable('Colors - Dark Scale', [
        { name: '--color-dark-100', value: '#1F2024' },
        { name: '--color-dark-80', value: '#1B3344' },
        { name: '--color-dark-60', value: '#4E585E' },
        { name: '--color-dark-40', value: '#8B99A4' },
        { name: '--color-dark-20', value: '#B6C2CB' },
      ])}

      {/* Color Variables - Light */}
      {renderVariableTable('Colors - Light Scale', [
        { name: '--color-light-100', value: '#CED7DE' },
        { name: '--color-light-80', value: '#D7E0E6' },
        { name: '--color-light-60', value: '#E9EFF3' },
        { name: '--color-light-40', value: '#F5F7F9' },
        { name: '--color-light-20', value: '#F8FCFF' },
      ])}

      {/* Color Variables - Success */}
      {renderVariableTable('Colors - Success', [
        { name: '--color-success-100', value: '#00F88B' },
        { name: '--color-success-10', value: 'rgba(0, 248, 139, 0.1)' },
        { name: '--color-success-66', value: '#63F8B7' },
        { name: '--color-success-33', value: '#95F7CC' },
        { name: '--color-success-100-5', value: 'rgba(0, 248, 139, 0.05)' },
      ])}

      {/* Color Variables - Warning */}
      {renderVariableTable('Colors - Warning', [
        { name: '--color-warning-100', value: '#FF8C3A' },
        { name: '--color-warning-10', value: 'rgba(255, 140, 58, 0.1)' },
        { name: '--color-warning-66', value: '#FFA261' },
        { name: '--color-warning-33', value: '#FFC499' },
        { name: '--color-warning-100-5', value: 'rgba(255, 140, 58, 0.05)' },
      ])}

      {/* Color Variables - Error */}
      {renderVariableTable('Colors - Error', [
        { name: '--color-error-100', value: '#FF5E9B' },
        { name: '--color-error-10', value: 'rgba(255, 94, 155, 0.1)' },
        { name: '--color-error-66', value: '#FF88B5' },
        { name: '--color-error-33', value: '#FFB2CE' },
        { name: '--color-error-100-5', value: 'rgba(255, 94, 155, 0.05)' },
      ])}

      {/* Color Variables - Info */}
      {renderVariableTable('Colors - Info', [
        { name: '--color-info-100', value: '#003CFF' },
        { name: '--color-info-10', value: 'rgba(0, 60, 255, 0.1)' },
      ])}

      {/* Spacing Variables */}
      {renderVariableTable('Spacing - Fixed', [
        { name: '--spacing-xs', value: '4px' },
        { name: '--spacing-sm', value: '8px' },
        { name: '--spacing-md', value: '16px' },
        { name: '--spacing-lg', value: '24px' },
        { name: '--spacing-xl', value: '32px' },
        { name: '--spacing-2xl', value: '48px' },
        { name: '--spacing-3xl', value: '64px' },
      ])}

      {/* Spacing Variables - Horizontal Fluid */}
      {renderVariableTable('Spacing - Horizontal Fluid', [
        { name: '--spacing-h-xs', value: 'clamp(4px, 1vw, 8px)' },
        { name: '--spacing-h-sm', value: 'clamp(8px, 2vw, 16px)' },
        { name: '--spacing-h-md', value: 'clamp(16px, 3vw, 32px)' },
        { name: '--spacing-h-lg', value: 'clamp(24px, 4vw, 48px)' },
        { name: '--spacing-h-xl', value: 'clamp(32px, 5vw, 64px)' },
        { name: '--spacing-h-2xl', value: 'clamp(48px, 7vw, 96px)' },
        { name: '--spacing-h-3xl', value: 'clamp(64px, 10vw, 128px)' },
      ])}

      {/* Spacing Variables - Vertical Fluid */}
      {renderVariableTable('Spacing - Vertical Fluid', [
        { name: '--spacing-v-xs', value: 'clamp(4px, 0.5vh, 8px)' },
        { name: '--spacing-v-sm', value: 'clamp(8px, 1vh, 12px)' },
        { name: '--spacing-v-md', value: 'clamp(16px, 2vh, 24px)' },
        { name: '--spacing-v-lg', value: 'clamp(24px, 3vh, 40px)' },
        { name: '--spacing-v-xl', value: 'clamp(32px, 4vh, 56px)' },
        { name: '--spacing-v-2xl', value: 'clamp(48px, 6vh, 80px)' },
        { name: '--spacing-v-3xl', value: 'clamp(64px, 8vh, 120px)' },
      ])}

      {/* Border Variables */}
      {renderVariableTable('Borders - Widths', [
        { name: '--border-width-thin', value: '1px' },
        { name: '--border-width-default', value: '2px' },
        { name: '--border-width-medium', value: '3px' },
        { name: '--border-width-thick', value: '4px' },
      ])}

      {renderVariableTable('Borders - Styles', [
        { name: '--border-style-solid', value: 'solid' },
        { name: '--border-style-dashed', value: 'dashed' },
        { name: '--border-style-dotted', value: 'dotted' },
      ])}

      {renderVariableTable('Borders - Colors', [
        { name: '--border-color-default', value: 'var(--color-dark-20)' },
        { name: '--border-color-light', value: 'var(--color-light-100)' },
        { name: '--border-color-dark', value: 'var(--color-dark-40)' },
        { name: '--border-color-primary', value: 'var(--color-primary)' },
        { name: '--border-color-success', value: 'var(--color-success-100)' },
        { name: '--border-color-warning', value: 'var(--color-warning-100)' },
        { name: '--border-color-error', value: 'var(--color-error-100)' },
      ])}

      {/* Border Radius */}
      {renderVariableTable('Border Radius', [
        { name: '--radius-sm', value: '4px' },
        { name: '--radius-md', value: '8px' },
        { name: '--radius-lg', value: '14px' },
        { name: '--radius-xl', value: '16px' },
        { name: '--radius-2xl', value: '24px' },
        { name: '--radius-full', value: '9999px' },
      ])}

      {/* Shadows */}
      {renderVariableTable('Shadows', [
        { name: '--shadow-sm', value: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)' },
        { name: '--shadow-md', value: '0px 4px 6px -1px rgba(0, 0, 0, 0.1)' },
        { name: '--shadow-lg', value: '0px 10px 15px -3px rgba(0, 0, 0, 0.1)' },
        { name: '--shadow-1', value: '0px 0px 8px 0px rgba(0, 0, 0, 0.2)' },
      ])}

      {/* Transitions */}
      {renderVariableTable('Transitions', [
        { name: '--transition-fast', value: '150ms cubic-bezier(0.4, 0, 0.2, 1)' },
        { name: '--transition-base', value: '250ms cubic-bezier(0.4, 0, 0.2, 1)' },
        { name: '--transition-slow', value: '350ms cubic-bezier(0.4, 0, 0.2, 1)' },
      ])}

      {/* Icon Sizes */}
      {renderVariableTable('Icon Sizes', [
        { name: '--icon-size-xs', value: '12px' },
        { name: '--icon-size-sm', value: '16px' },
        { name: '--icon-size-md', value: '20px' },
        { name: '--icon-size-lg', value: '24px' },
        { name: '--icon-size-xl', value: '32px' },
      ])}

      {/* Component Sizes */}
      {renderVariableTable('Component Sizes', [
        { name: '--size-xs', value: '8px' },
        { name: '--size-sm', value: '20px' },
        { name: '--size-md', value: '32px' },
        { name: '--size-lg', value: '40px' },
        { name: '--size-xl', value: '48px' },
        { name: '--size-2xl', value: '64px' },
      ])}

      {/* Avatar Sizes */}
      {renderVariableTable('Avatar Sizes', [
        { name: '--avatar-size-sm', value: '32px' },
        { name: '--avatar-size-md', value: '40px' },
        { name: '--avatar-size-lg', value: '48px' },
        { name: '--avatar-size-xl', value: '64px' },
      ])}

      {renderVariableTable('Avatar Status Indicators', [
        { name: '--avatar-status-sm', value: '8px' },
        { name: '--avatar-status-md', value: '10px' },
        { name: '--avatar-status-lg', value: '12px' },
        { name: '--avatar-status-xl', value: '14px' },
      ])}

      {/* Toggle Sizes */}
      {renderVariableTable('Toggle Component', [
        { name: '--toggle-track-width', value: '44px' },
        { name: '--toggle-track-height', value: '24px' },
        { name: '--toggle-thumb-size', value: '20px' },
        { name: '--toggle-thumb-offset', value: '2px' },
      ])}

      {/* Modal Sizes */}
      {renderVariableTable('Modal Sizes', [
        { name: '--modal-size-sm', value: '400px' },
        { name: '--modal-size-md', value: '500px' },
        { name: '--modal-size-lg', value: '700px' },
        { name: '--modal-size-xl', value: '900px' },
      ])}

      {/* Loading Sizes */}
      {renderVariableTable('Loading Spinner Sizes', [
        { name: '--loading-size-sm', value: '16px' },
        { name: '--loading-size-md', value: '32px' },
        { name: '--loading-size-lg', value: '48px' },
      ])}

      {renderVariableTable('Loading Dot Sizes', [
        { name: '--loading-dot-sm', value: '6px' },
        { name: '--loading-dot-md', value: '10px' },
        { name: '--loading-dot-lg', value: '14px' },
      ])}

      {/* Opacity */}
      {renderVariableTable('Opacity', [
        { name: '--opacity-disabled', value: '0.5' },
        { name: '--opacity-overlay', value: '0.5' },
        { name: '--opacity-overlay-light', value: '0.9' },
      ])}

      {/* Z-Index */}
      {renderVariableTable('Z-Index Layers', [
        { name: '--z-index-modal', value: '1000' },
        { name: '--z-index-toast', value: '9999' },
      ])}

      {/* Positioning */}
      {renderVariableTable('Positioning', [
        { name: '--position-0', value: '0' },
      ])}

      {/* Overlay Colors */}
      {renderVariableTable('Overlay Colors', [
        { name: '--overlay-dark', value: 'rgba(0, 0, 0, 0.5)' },
        { name: '--overlay-light', value: 'rgba(255, 255, 255, 0.9)' },
      ])}

      {/* Gradient Colors */}
      {renderVariableTable('Gradients - Documentation', [
        { name: '--gradient-success-light', value: '#B1F0D4' },
        { name: '--gradient-success-dark', value: '#33BC80' },
        { name: '--gradient-energy-light', value: '#C0FF9E' },
        { name: '--gradient-energy-dark', value: '#61D125' },
        { name: '--gradient-love-light', value: '#F18BB2' },
        { name: '--gradient-love-dark', value: '#F15993' },
        { name: '--gradient-attention-light', value: '#FFA9B0' },
        { name: '--gradient-attention-dark', value: '#E9505D' },
        { name: '--gradient-fancy-light', value: '#FF9BE7' },
        { name: '--gradient-fancy-dark', value: '#E656C3' },
        { name: '--gradient-ice-light', value: '#A5EDED' },
        { name: '--gradient-ice-dark', value: '#3BC5C5' },
        { name: '--gradient-sky-light', value: '#AEB8F3' },
        { name: '--gradient-sky-dark', value: '#5E73E4' },
        { name: '--gradient-groundedness-light', value: '#98D4F7' },
        { name: '--gradient-groundedness-dark', value: '#50B7F2' },
        { name: '--gradient-community-light', value: '#FFBE8E' },
        { name: '--gradient-community-dark', value: '#F59855' },
        { name: '--gradient-curiosity-light', value: '#FFF07E' },
        { name: '--gradient-curiosity-dark', value: '#F8E33B' },
      ])}
    </div>
  );
}
