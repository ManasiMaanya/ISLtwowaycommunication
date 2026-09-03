import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export function ChatBubble({
  message,
  onSpeak,
  className = ''
}) {
  const isSigner = message.senderRole === 'signer';

  return (
    <div
      className={`flex items-start gap-3 ${isSigner ? '' : 'flex-row-reverse'} ${className}`}
      style={{ marginBottom: '16px' }}
    >
      <Avatar
        name={message.senderName || (isSigner ? 'Signer' : 'Hearing')}
        role={isSigner ? 'signer' : 'hearing'}
        size={36}
      />

      <div
        className="flex flex-col gap-1 max-w-lg"
        style={{
          alignItems: isSigner ? 'flex-start' : 'flex-end'
        }}
      >
        <div className="flex items-center gap-2 px-1">
          <span className="text-xs font-semibold text-primary">{message.senderName}</span>
          <span className="text-xs text-muted font-mono">{message.timestamp || 'Just now'}</span>
          {isSigner && message.confidence && (
            <span className="text-xs text-mint font-mono">({message.confidence}%)</span>
          )}
        </div>

        <div
          style={{
            backgroundColor: isSigner ? 'var(--color-forest-750)' : 'var(--color-forest-700)',
            border: `1px solid ${isSigner ? 'var(--border-coral)' : 'var(--border-mint)'}`,
            borderRadius: isSigner ? '4px 18px 18px 18px' : '18px 4px 18px 18px',
            padding: '14px 16px',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          {/* Gloss Code Sequence */}
          {isSigner && message.gloss && (
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="gloss">GLOSS: [{message.gloss}]</Badge>
            </div>
          )}

          {/* Primary Text */}
          <div className="text-sm text-primary leading-relaxed">{message.text}</div>

          {/* Gujarati Subtitle if available */}
          {message.gujaratiText && (
            <div
              className="mt-2 pt-2 border-t border-subtle text-xs text-coral gujarati-text font-medium"
            >
              {message.gujaratiText}
            </div>
          )}

          {/* TTS Audio Speak Button */}
          {onSpeak && (
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => onSpeak(message.text)}
                className="text-xs text-muted hover:text-mint flex items-center gap-1 bg-transparent border-none cursor-pointer"
                title="Speak text aloud"
              >
                <Volume2 size={13} />
                <span>Speak</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
