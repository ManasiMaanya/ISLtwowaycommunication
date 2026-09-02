import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MessageSquare,
  Video,
  BookOpen,
  Sparkles,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Layers,
  Award
} from 'lucide-react';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export function Sidebar({ className = '' }) {
  const location = useLocation();

  const menuItems = [
    { label: 'Conversations & Inbox', path: '/dashboard', icon: <MessageSquare size={18} />, badge: '3' },
    { label: 'Live Bridge Session', path: '/session/live-demo', icon: <Video size={18} /> },
    { label: 'Learn ISL & Practice', path: '/learn', icon: <BookOpen size={18} />, badge: '20 Signs' },
    { label: 'System Architecture', path: '/about', icon: <Layers size={18} /> },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside
      className={`flex flex-col justify-between ${className}`}
      style={{
        width: '260px',
        backgroundColor: 'var(--color-forest-850)',
        borderRight: '1px solid var(--border-subtle)',
        padding: '24px 16px',
        minHeight: 'calc(100vh - 72px)',
        flexShrink: 0
      }}
    >
      <div className="flex flex-col gap-6">
        {/* User Profile Pill */}
        <div
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{
            background: 'rgba(32, 67, 58, 0.5)',
            border: '1px solid var(--border-subtle)'
          }}
        >
          <Avatar name="Aarav Mehta" role="signer" size={38} />
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-primary truncate">Aarav Mehta</span>
            <span className="text-xs text-coral font-medium">Deaf Student (Signer)</span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div>
          <div className="overline px-3 mb-3" style={{ fontSize: '0.68rem', color: 'var(--text-muted-on-dark)' }}>
            Main Workspace
          </div>
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                  style={{
                    color: active ? 'var(--color-coral-300)' : 'var(--text-secondary-on-dark)',
                    background: active ? 'rgba(240, 139, 118, 0.12)' : 'transparent',
                    border: active ? '1px solid var(--border-coral)' : '1px solid transparent'
                  }}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant={active ? 'coral' : 'forest'} style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Practice Streak Badge Widget */}
        <div
          className="card-dark p-4 rounded-xl"
          style={{
            background: 'linear-gradient(135deg, rgba(72, 201, 176, 0.1), rgba(240, 139, 118, 0.08))',
            border: '1px solid var(--border-mint)'
          }}
        >
          <div className="flex items-center gap-2 mb-1 text-mint font-semibold text-xs">
            <Award size={15} />
            <span>Daily Practice Streak</span>
          </div>
          <div className="text-xl font-serif font-bold text-primary">5 Days Active</div>
          <div className="text-xs text-muted mt-1">16 of 20 ISL Vocabulary Mastered</div>
          <div
            style={{
              width: '100%',
              height: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '999px',
              marginTop: '10px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: '80%',
                height: '100%',
                background: 'linear-gradient(90deg, var(--color-mint-400), var(--color-coral-400))',
                borderRadius: '999px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-1 pt-4 border-t border-subtle">
        <Link
          to="/about"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted hover:text-primary transition-colors"
        >
          <HelpCircle size={15} />
          <span>Hackathon System Docs</span>
        </Link>
        <Link
          to="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted hover:text-coral transition-colors"
        >
          <LogOut size={15} />
          <span>Sign Out / Switch Profile</span>
        </Link>
      </div>
    </aside>
  );
}
