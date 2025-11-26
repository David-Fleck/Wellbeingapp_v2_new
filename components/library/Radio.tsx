import { InputHTMLAttributes } from 'react';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
}

export function RadioGroup({ 
  name,
  options,
  value,
  onChange,
  error = false,
  helperText,
  disabled = false,
}: RadioGroupProps) {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-sm)',
  };

  const radioWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
  };

  const radioStyles = {
    width: 'var(--size-sm)',
    height: 'var(--size-sm)',
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
    <div style={containerStyles}>
      {options.map((option) => (
        <label 
          key={option.value} 
          style={{
            ...radioWrapperStyles,
            opacity: (disabled || option.disabled) ? 'var(--opacity-disabled)' : 1,
            cursor: (disabled || option.disabled) ? 'not-allowed' : 'pointer',
          }}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange?.(e.target.value)}
            disabled={disabled || option.disabled}
            style={radioStyles}
          />
          <span style={labelStyles}>{option.label}</span>
        </label>
      ))}
      {helperText && <span style={helperTextStyles}>{helperText}</span>}
    </div>
  );
}