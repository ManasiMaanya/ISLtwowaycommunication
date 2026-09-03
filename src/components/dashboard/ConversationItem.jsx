import React from 'react';
import { ArrowRight, Video, MessageSquare } from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export function ConversationItem({
  conversation,
  isSelected = false,
  onSelect,
  onStartSession,
  className = ''
}) {
  return (
    <div
      onClick={() => onSelect && onSelect(conversation)}
      className={`p-4 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-4 ${className}`}
      style={{
        backgroundColor: isSelected ? 'rgba(240, 139, 118, 0.14)' : 'rgba(32, 67, 58, 0.4)',
        border: `1px solid ${isSelected ? 'var(--color-coral-400)' : 'var(--border-subtle)'}`,
        boxShadow: isSelected ? 'var(--shadow-sm)' : 'none'
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <Avatar
          name={conversation.partnerName}
          role={conversation.partnerRole}
          size={42}
        />
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-primary truncate">
              {conversation.partnerName}
            </span>
            {conversation.unreadCount > 0 && (
              <span
                style={{
                  backgroundColor: 'var(--color-coral-500)',
                  color: '#ffffff',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '999px'
                }}
              >
                {conversation.unreadCount} new
              </span>
            )}
          </div>
          <p className="text-xs text-muted truncate mt-0.5">
            <span className="font-mono text-mint mr-1">[{conversation.lastGloss}]</span>
            {conversation.lastMessage}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-xs text-muted font-mono hidden md-inline">
          {conversation.timestamp}
        </span>
        {onStartSession && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStartSession(conversation.id);
            }}
            className="btn btn-coral btn-sm"
            style={{ padding: '6px 12px' }}
            title="Join live session with partner"
          >
            <Video size={14} />
            <span className="hidden sm-inline">Join</span>
          </button>
        )}
      </div>
    </div>
  );
}
