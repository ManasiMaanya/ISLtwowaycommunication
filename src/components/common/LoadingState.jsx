import React from 'react';
import { BotanicalFlower } from './BotanicalDecor';

export function LoadingSpinner({ text = 'Detecting ISL landmarks...', size = 'md' }) {
  const pixelSize = size === 'sm' ? 24 : size === 'lg' ? 48 : 36;

  return (
    <div className="flex flex-col items-center justify-center p-6 gap-3 select-none">
      <div className="animate-spin" style={{ animationDuration: '6s', animationTimingFunction: 'linear' }}>
        <BotanicalFlower size={pixelSize} />
      </div>
      {text && <p className="text-xs text-muted font-medium">{text}</p>}
    </div>
  );
}

export function SkeletonCard({ rows = 3, className = '' }) {
  return (
    <div
      className={`card-dark ${className}`}
      style={{
        background: 'rgba(32, 67, 58, 0.4)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px'
      }}
    >
      <div
        style={{
          height: '22px',
          width: '45%',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '14px'
        }}
      />
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          style={{
            height: '14px',
            width: idx === rows - 1 ? '70%' : '100%',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 'var(--radius-xs)',
            marginBottom: '8px'
          }}
        />
      ))}
    </div>
  );
}
