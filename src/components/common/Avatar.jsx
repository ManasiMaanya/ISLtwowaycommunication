import React from 'react';

export function Avatar({
  name = 'User',
  role = 'signer', // 'signer' | 'hearing' | 'tutor'
  size = 40,
  status = 'online', // 'online' | 'signing' | 'offline'
  className = ''
}) {
  const getInitials = (str) => {
    return str
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleColor = () => {
    switch (role) {
      case 'signer':
        return { bg: 'linear-gradient(135deg, #f08b76, #de6e57)', text: '#ffffff', badge: '🤟' };
      case 'hearing':
        return { bg: 'linear-gradient(135deg, #48c9b0, #2da890)', text: '#10241f', badge: '👂' };
      case 'tutor':
        return { bg: 'linear-gradient(135deg, #f6c358, #e5a428)', text: '#10241f', badge: '🎓' };
      default:
        return { bg: 'var(--color-forest-600)', text: '#ffffff', badge: '👤' };
    }
  };

  const roleMeta = getRoleColor();

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: roleMeta.bg,
        color: roleMeta.text,
        fontWeight: 700,
        fontSize: size * 0.38,
        border: '2px solid rgba(255,255,255,0.2)',
        flexShrink: 0
      }}
    >
      <span>{getInitials(name)}</span>

      {/* Role Sub-badge */}
      <span
        style={{
          position: 'absolute',
          bottom: '-3px',
          right: '-3px',
          fontSize: size * 0.32,
          background: 'var(--color-forest-900)',
          borderRadius: '50%',
          width: size * 0.44,
          height: size * 0.44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1.5px solid var(--border-medium)'
        }}
        title={`Role: ${role}`}
      >
        {roleMeta.badge}
      </span>
    </div>
  );
}
