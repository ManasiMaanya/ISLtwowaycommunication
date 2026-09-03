import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { BotanicalFlower } from './BotanicalDecor';

export function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = '560px',
  showFloralEmblem = true,
  className = ''
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-modal)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: 'rgba(16, 36, 31, 0.85)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div
        className={`card-dark ${className}`}
        style={{
          width: '100%',
          maxWidth,
          position: 'relative',
          backgroundColor: 'var(--color-forest-850)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header Flourish */}
        {showFloralEmblem && (
          <div
            className="flex justify-center items-center pt-5 pb-1"
            style={{
              background: 'linear-gradient(180deg, rgba(240, 139, 118, 0.08), transparent)'
            }}
          >
            <BotanicalFlower size={30} />
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary-on-dark)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--color-coral-400)';
            e.currentTarget.style.background = 'rgba(240, 139, 118, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary-on-dark)';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ padding: '8px 28px 16px', textAlign: showFloralEmblem ? 'center' : 'left' }}>
          {title && <h2 className="font-serif text-2xl font-semibold mb-1">{title}</h2>}
          {subtitle && <p className="text-sm text-muted">{subtitle}</p>}
        </div>

        {/* Modal Body */}
        <div style={{ padding: '8px 28px 24px', maxHeight: '70vh', overflowY: 'auto' }}>
          {children}
        </div>

        {/* Modal Footer */}
        {footer && (
          <div
            style={{
              padding: '16px 28px',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'rgba(16, 36, 31, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px'
            }}
          >
            {footer}
          </div>
        )}
      </div>

      <style>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
