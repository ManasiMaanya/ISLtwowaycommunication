import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'coral', // 'coral' | 'mint' | 'outline' | 'ghost' | 'icon'
  size = 'md',       // 'sm' | 'md' | 'lg'
  icon = null,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseClass = 'btn';
  const variantClass = `btn-${variant}`;
  const sizeClass = variant === 'icon' ? 'btn-icon' : `btn-${size}`;

  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />
      ) : (
        icon && iconPosition === 'left' && <span className="btn-icon-el">{icon}</span>
      )}

      {children && <span>{children}</span>}

      {!loading && icon && iconPosition === 'right' && (
        <span className="btn-icon-el">{icon}</span>
      )}
    </button>
  );
}
