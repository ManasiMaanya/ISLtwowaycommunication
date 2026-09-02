import React from 'react';

export function Badge({
  children,
  variant = 'mint', // 'coral' | 'mint' | 'gold' | 'forest' | 'gloss'
  icon = null,
  className = '',
  ...props
}) {
  if (variant === 'gloss') {
    return (
      <span className={`gloss-tag ${className}`} {...props}>
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </span>
    );
  }

  return (
    <span className={`badge badge-${variant} ${className}`} {...props}>
      {icon && <span>{icon}</span>}
      {children}
    </span>
  );
}
