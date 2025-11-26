import { InputHTMLAttributes, ReactNode, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export type InputVariant = 'default' | 'success' | 'error';

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  variant?: InputVariant;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export function InputField({ 
  label,
  variant = 'default',
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = 'text',
  className = '',
  ...props 
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

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

  const inputWrapperStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-md)',
    borderRadius: 'var(--radius-lg)',
    border: `var(--border-width-default) var(--border-style-solid)`,
    borderColor: variant === 'error' 
      ? 'var(--border-color-error)' 
      : variant === 'success'
      ? 'var(--border-color-success)'
      : 'var(--border-color-default)',
    backgroundColor: 'var(--color-white)',
    transition: 'var(--transition-base)',
  };

  const inputStyles = {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontFamily: 'var(--font-family-primary)',
    backgroundColor: 'transparent',
    color: 'var(--color-dark-100)',
  };

  const helperTextStyles = {
    fontFamily: 'var(--font-family-primary)',
    fontSize: 'var(--font-size-p1-md)',
    color: variant === 'error' 
      ? 'var(--color-error-100)' 
      : variant === 'success'
      ? 'var(--color-success-100)'
      : 'var(--color-dark-40)',
  };

  const iconStyles = {
    display: 'flex',
    alignItems: 'center',
    color: 'var(--color-dark-40)',
  };

  return (
    <div style={containerStyles} className={className}>
      {label && <label style={labelStyles}>{label}</label>}
      
      <div style={inputWrapperStyles}>
        {leftIcon && <span style={iconStyles}>{leftIcon}</span>}
        
        <input
          type={inputType}
          style={inputStyles}
          {...props}
        />
        
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{ ...iconStyles, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        ) : rightIcon ? (
          <span style={iconStyles}>{rightIcon}</span>
        ) : null}
      </div>
      
      {helperText && <span style={helperTextStyles}>{helperText}</span>}
    </div>
  );
}