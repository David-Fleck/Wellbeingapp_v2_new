import { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
}

export function Select({ 
  label,
  options,
  error = false,
  helperText,
  fullWidth = false,
  className = '',
  disabled = false,
  ...props 
}: SelectProps) {
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 'var(--spacing-xs)',
    width: fullWidth ? '100%' : 'auto',
  };

  const labelStyles = {
    fontFamily: 'var(--font-family-primary)',
    color: 'var(--color-dark-80)',
  };

  const selectWrapperStyles = {
    position: 'relative' as const,
    display: 'flex',
    alignItems: 'center',
  };

  const selectStyles = {
    width: '100%',
    padding: 'var(--spacing-md)',
    paddingRight: 'var(--spacing-2xl)',
    borderRadius: 'var(--radius-lg)',
    border: `var(--border-width-default) var(--border-style-solid)`,
    borderColor: error ? 'var(--border-color-error)' : 'var(--border-color-default)',
    backgroundColor: 'var(--color-white)',
    fontFamily: 'var(--font-family-primary)',
    color: 'var(--color-dark-100)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'var(--transition-base)',
    appearance: 'none' as const,
    opacity: disabled ? 0.5 : 1,
  };

  const iconStyles = {
    position: 'absolute' as const,
    right: 'var(--spacing-md)',
    pointerEvents: 'none' as const,
    color: 'var(--color-dark-40)',
  };

  const helperTextStyles = {
    fontFamily: 'var(--font-family-primary)',
    fontSize: 'var(--font-size-p1-md)',
    color: error ? 'var(--color-error-100)' : 'var(--color-dark-40)',
  };

  return (
    <div style={containerStyles} className={className}>
      {label && <label style={labelStyles}>{label}</label>}
      
      <div style={selectWrapperStyles}>
        <select
          style={selectStyles}
          disabled={disabled}
          {...props}
        >
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown size={20} style={iconStyles} />
      </div>
      
      {helperText && <span style={helperTextStyles}>{helperText}</span>}
    </div>
  );
}
