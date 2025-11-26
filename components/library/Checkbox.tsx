import { InputHTMLAttributes, ReactNode } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

export function Checkbox({ 
  label,
  error = false,
  helperText,
  className = '',
  disabled = false,
  ...props 
}: CheckboxProps) {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-xs)',
  };

  const checkboxWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
  };

  const checkboxStyles = {
    width: 'var(--size-sm)',
    height: 'var(--size-sm)',
    borderRadius: 'var(--radius-sm)',
    border: `var(--border-width-default) var(--border-style-solid)`,
    borderColor: error ? 'var(--border-color-error)' : 'var(--border-color-default)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'var(--transition-base)',
    accentColor: 'var(--color-primary)',
  };

  const labelStyles = {
    fontFamily: 'var(--font-family-primary)',
    color: 'var(--color-dark-80)',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const helperTextStyles = {
    fontFamily: 'var(--font-family-primary)',
    fontSize: 'var(--font-size-p1-md)',
    color: error ? 'var(--color-error-100)' : 'var(--color-dark-40)',
  };

  return (
    <div style={containerStyles} className={className}>
      <label style={checkboxWrapperStyles}>
        <input
          type="checkbox"
          style={checkboxStyles}
          disabled={disabled}
          {...props}
        />
        {label && <span style={labelStyles}>{label}</span>}
      </label>
      {helperText && <span style={helperTextStyles}>{helperText}</span>}
    </div>
  );
}