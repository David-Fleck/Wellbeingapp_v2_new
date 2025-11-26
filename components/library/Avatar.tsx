import { ImgHTMLAttributes } from 'react';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'size'> {
  size?: AvatarSize;
  name?: string;
  status?: 'online' | 'offline' | 'away';
}

export function Avatar({ 
  size = 'md',
  name,
  status,
  src,
  alt,
  className = '',
  ...props 
}: AvatarProps) {
  const sizeMap = {
    sm: 'var(--avatar-size-sm)',
    md: 'var(--avatar-size-md)',
    lg: 'var(--avatar-size-lg)',
    xl: 'var(--avatar-size-xl)',
  };

  const statusSizeMap = {
    sm: 'var(--avatar-status-sm)',
    md: 'var(--avatar-status-md)',
    lg: 'var(--avatar-status-lg)',
    xl: 'var(--avatar-status-xl)',
  };

  const fontSizeMap = {
    sm: 'var(--font-size-p1-sm)',
    md: 'var(--font-size-p1-md)',
    lg: 'var(--font-size-p1-base)',
    xl: 'var(--font-size-p1-lg)',
  };

  const containerStyles = {
    position: 'relative' as const,
    display: 'inline-block',
  };

  const avatarStyles = {
    width: sizeMap[size],
    height: sizeMap[size],
    borderRadius: 'var(--radius-full)',
    objectFit: 'cover' as const,
    backgroundColor: 'var(--color-light-100)',
    border: `var(--border-width-default) var(--border-style-solid) var(--border-color-default)`,
  };

  const initialsStyles = {
    width: sizeMap[size],
    height: sizeMap[size],
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-white)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-family-primary)',
    fontSize: fontSizeMap[size],
  };

  const statusStyles = {
    position: 'absolute' as const,
    bottom: 'var(--position-0)',
    right: 'var(--position-0)',
    width: statusSizeMap[size],
    height: statusSizeMap[size],
    borderRadius: 'var(--radius-full)',
    backgroundColor: status === 'online' 
      ? 'var(--color-success-100)' 
      : status === 'away' 
      ? 'var(--color-warning-100)' 
      : 'var(--color-dark-40)',
    border: `var(--border-width-default) var(--border-style-solid) var(--color-white)`,
  };

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div style={containerStyles} className={className}>
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          style={avatarStyles}
          {...props}
        />
      ) : name ? (
        <div style={initialsStyles}>
          {getInitials(name)}
        </div>
      ) : (
        <div style={avatarStyles} />
      )}
      {status && <div style={statusStyles} />}
    </div>
  );
}