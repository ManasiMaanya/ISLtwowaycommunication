import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';
import { BotanicalFlower } from './BotanicalDecor';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ title, message, type = 'info', duration = 4000 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 'var(--z-toast)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxWidth: '380px',
          width: '90%',
          pointerEvents: 'none'
        }}
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastItem({ toast, onDismiss }) {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} className="text-mint" />;
      case 'warning':
        return <AlertCircle size={18} className="text-gold" />;
      case 'recognition':
        return <BotanicalFlower size={18} />;
      default:
        return <Info size={18} className="text-coral" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case 'success':
        return 'var(--border-mint)';
      case 'warning':
        return 'rgba(246, 195, 88, 0.4)';
      case 'recognition':
        return 'var(--border-coral)';
      default:
        return 'var(--border-medium)';
    }
  };

  return (
    <div
      style={{
        pointerEvents: 'auto',
        background: 'rgba(22, 47, 40, 0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1px solid ${getBorderColor()}`,
        borderRadius: 'var(--radius-lg)',
        padding: '14px 16px',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        animation: 'toastIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div style={{ marginTop: '2px', flexShrink: 0 }}>{getIcon()}</div>
      <div style={{ flex: 1 }}>
        {toast.title && <div className="text-sm font-semibold text-primary">{toast.title}</div>}
        {toast.message && <div className="text-xs text-muted mt-0.5">{toast.message}</div>}
      </div>
      <button
        onClick={onDismiss}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted-on-dark)',
          cursor: 'pointer',
          padding: '2px'
        }}
      >
        <X size={14} />
      </button>

      <style>{`
        @keyframes toastIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.95);
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
