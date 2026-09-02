import React from 'react';

export function Card({
  children,
  variant = 'dark', // 'dark' | 'cream' | 'coral-tint' | 'mint-tint'
  framed = false,
  interactive = false,
  className = '',
  onClick,
  ...props
}) {
  const variantClass = `card-${variant}`;
  const framedClass = framed ? 'card-botanical-framed' : '';
  const interactiveClass = interactive ? 'card-interactive' : '';

  return (
    <div
      className={`${variantClass} ${framedClass} ${interactiveClass} ${className}`}
      onClick={onClick}
      style={{
        cursor: interactive || onClick ? 'pointer' : 'default',
        ...(interactive
          ? {
              transition: 'transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal)',
            }
          : {})
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, badge, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between gap-4 mb-4 ${className}`}>
      <div>
        {badge && <div className="mb-2">{badge}</div>}
        {title && <h3 className="font-serif">{title}</h3>}
        {subtitle && <p className="text-sm text-muted mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
