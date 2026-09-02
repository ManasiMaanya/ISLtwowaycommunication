import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { BotanicalCornerFrame, BotanicalFlower } from '../components/common/BotanicalDecor';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { InputField } from '../components/common/InputField';
import { useToast } from '../components/common/Toast';

export function LoginPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [role, setRole] = useState('signer'); // 'signer' | 'hearing'
  const [email, setEmail] = useState('aarav.student@saytu.org');
  const [password, setPassword] = useState('saytu2024');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      addToast({
        title: 'Welcome back to Saytu!',
        message: `Signed in as ${role === 'signer' ? 'Deaf Signer (Aarav)' : 'Hearing Classroom User'}.`,
        type: 'success'
      });
      navigate('/dashboard');
    }, 700);
  };

  const fillDemo = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'signer') {
      setEmail('aarav.student@saytu.org');
      setPassword('saytu-signer-2024');
    } else {
      setEmail('dr.radhika@gujaratuniv.edu');
      setPassword('saytu-hearing-2024');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <BotanicalCornerFrame cornerSize={240} opacity={0.8}>
        <div className="container-narrow relative z-10">
          <Card
            variant="dark"
            className="p-8 md-p-10 max-w-md mx-auto"
            style={{
              backgroundColor: 'var(--color-forest-850)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <div className="text-center mb-6">
              <BotanicalFlower size={36} className="mx-auto mb-2" />
              <h1 className="font-serif text-3xl font-bold text-primary">Welcome to Saytu</h1>
              <p className="text-xs text-muted mt-1">
                Indian Sign Language Communication & Recognition Platform
              </p>
            </div>

            {/* Role Switcher */}
            <div className="mb-6">
              <label className="form-label mb-2">Select Your Primary Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemo('signer')}
                  className="p-3 rounded-xl flex flex-col items-center gap-1 text-xs font-semibold cursor-pointer transition-all border-none"
                  style={{
                    backgroundColor: role === 'signer' ? 'var(--color-coral-500)' : 'rgba(32, 67, 58, 0.6)',
                    color: role === 'signer' ? '#ffffff' : 'var(--text-secondary-on-dark)',
                    border: `1px solid ${role === 'signer' ? 'var(--color-coral-400)' : 'var(--border-subtle)'}`
                  }}
                >
                  <span className="text-lg">🤟</span>
                  <span>Deaf/Mute Signer</span>
                </button>

                <button
                  type="button"
                  onClick={() => fillDemo('hearing')}
                  className="p-3 rounded-xl flex flex-col items-center gap-1 text-xs font-semibold cursor-pointer transition-all border-none"
                  style={{
                    backgroundColor: role === 'hearing' ? 'var(--color-mint-500)' : 'rgba(32, 67, 58, 0.6)',
                    color: role === 'hearing' ? '#10241f' : 'var(--text-secondary-on-dark)',
                    border: `1px solid ${role === 'hearing' ? 'var(--color-mint-400)' : 'var(--border-subtle)'}`
                  }}
                >
                  <span className="text-lg">👂</span>
                  <span>Hearing User</span>
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <InputField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between text-xs text-muted">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked />
                  <span>Remember role preferences</span>
                </label>
                <a href="#forgot" className="text-coral hover:underline">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant={role === 'signer' ? 'coral' : 'mint'}
                size="md"
                loading={loading}
                icon={<LogIn size={16} />}
                className="w-full mt-2"
              >
                Sign In to Workspace
              </Button>
            </form>

            {/* Demo Quick Fill Helper */}
            <div
              className="mt-6 p-3 rounded-xl text-center text-xs"
              style={{
                backgroundColor: 'rgba(16, 36, 31, 0.6)',
                border: '1px dashed var(--border-medium)'
              }}
            >
              <div className="text-muted mb-2 font-medium">Quick Demo Role Switch:</div>
              <div className="flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => fillDemo('signer')}
                  className="text-coral font-bold hover:underline cursor-pointer bg-transparent border-none text-xs"
                >
                  Fill Signer Demo (Aarav)
                </button>
                <span className="text-dim">•</span>
                <button
                  type="button"
                  onClick={() => fillDemo('hearing')}
                  className="text-mint font-bold hover:underline cursor-pointer bg-transparent border-none text-xs"
                >
                  Fill Hearing Demo (Dr. Radhika)
                </button>
              </div>
            </div>

            <div className="text-center text-xs text-muted mt-6 pt-4 border-t border-subtle">
              Don't have an account?{' '}
              <Link to="/signup" className="text-coral font-semibold hover:underline">
                Create an account
              </Link>
            </div>
          </Card>
        </div>
      </BotanicalCornerFrame>
    </div>
  );
}
