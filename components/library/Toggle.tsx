import { InputHTMLAttributes } from 'react';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
}

export function Toggle({ 
  label,
  helperText,
  disabled = false,
  checked = false,
  className = '',
  ...props 
}: ToggleProps) {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-xs)',
  };

  const toggleWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
  };

  const toggleTrackStyles = {
    position: 'relative' as const,
    width: 'var(--toggle-track-width)',
    height: 'var(--toggle-track-height)',
    borderRadius: 'var(--radius-full)',
    backgroundColor: checked ? 'var(--color-primary)' : 'var(--color-light-100)',
    transition: 'var(--transition-base)',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const toggleThumbStyles = {
    position: 'absolute' as const,
    top: 'var(--toggle-thumb-offset)',
    left: checked ? `calc(var(--toggle-track-width) - var(--toggle-thumb-size) - var(--toggle-thumb-offset))` : 'var(--toggle-thumb-offset)',
    width: 'var(--toggle-thumb-size)',
    height: 'var(--toggle-thumb-size)',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--color-white)',
    boxShadow: 'var(--shadow-sm)',
    transition: 'var(--transition-base)',
  };

  const labelStyles = {
    fontFamily: 'var(--font-family-primary)',
    color: 'var(--color-dark-80)',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const helperTextStyles = {
    fontFamily: 'var(--font-family-primary)',
    fontSize: 'var(--font-size-p1-md)',
    color: 'var(--color-dark-40)',
  };

  return (
    <div style={containerStyles} className={className}>
      <label style={toggleWrapperStyles}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          style={{ display: 'none' }}
          {...props}
        />
        <div style={toggleTrackStyles}>
          <div style={toggleThumbStyles} />
        </div>
        {label && <span style={labelStyles}>{label}</span>}
      </label>
      {helperText && <span style={helperTextStyles}>{helperText}</span>}
    </div>
  );
}