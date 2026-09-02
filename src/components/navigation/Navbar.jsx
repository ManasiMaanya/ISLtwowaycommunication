import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Video, BookOpen, LayoutDashboard, Info, Menu, X, Sparkles, UserCheck } from 'lucide-react';
import { BotanicalFlower } from '../common/BotanicalDecor';
import { Button } from '../common/Button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/', icon: <Sparkles size={16} /> },
    { name: 'About & System', path: '/about', icon: <Info size={16} /> },
    { name: 'Learn ISL', path: '/learn', icon: <BookOpen size={16} /> },
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={16} /> },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 'var(--z-sticky)',
        backgroundColor: 'rgba(28, 58, 50, 0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        transition: 'all var(--transition-normal)'
      }}
    >
      <div className="container-wide flex items-center justify-between" style={{ height: '72px' }}>
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 select-none group">
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(240, 139, 118, 0.2), rgba(72, 201, 176, 0.15))',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <BotanicalFlower size={26} />
          </div>
          <div className="flex flex-col">
            <span
              className="font-serif text-2xl font-bold tracking-tight"
              style={{
                color: 'var(--text-primary-on-dark)',
                lineHeight: 1.1
              }}
            >
              Saytu
            </span>
            <span
              className="overline text-xs"
              style={{
                fontSize: '0.65rem',
                color: 'var(--color-mint-300)',
                letterSpacing: '0.12em',
                lineHeight: 1
              }}
            >
              ISL Communication Bridge
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md-flex items-center gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  color: active ? 'var(--color-coral-400)' : 'var(--text-secondary-on-dark)',
                  backgroundColor: active ? 'rgba(240, 139, 118, 0.12)' : 'transparent',
                  border: active ? '1px solid var(--border-coral)' : '1px solid transparent'
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden md-flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Button
            variant="coral"
            size="sm"
            icon={<Video size={16} />}
            onClick={() => navigate('/session/live-demo')}
          >
            Start Live Session
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md-hidden btn-icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'var(--text-primary-on-dark)'
          }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md-hidden"
          style={{
            backgroundColor: 'var(--color-forest-900)',
            borderBottom: '1px solid var(--border-medium)',
            padding: '16px 20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base"
              style={{
                color: isActive(link.path) ? 'var(--color-coral-400)' : 'var(--text-primary-on-dark)',
                background: isActive(link.path) ? 'rgba(240, 139, 118, 0.1)' : 'rgba(255, 255, 255, 0.03)'
              }}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col gap-2 pt-3 border-t border-subtle">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="md" className="w-full">
                Sign In / Switch Role
              </Button>
            </Link>
            <Button
              variant="coral"
              size="md"
              icon={<Video size={16} />}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/session/live-demo');
              }}
            >
              Start Live Session
            </Button>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .hidden.md-flex { display: flex !important; }
          .md-hidden { display: none !important; }
        }
        @media (max-width: 767px) {
          .hidden.md-flex { display: none !important; }
        }
      `}</style>
    </header>
  );
}
