import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Sparkles, ArrowRight, ShieldCheck, UserCheck, Eye, EyeOff } from 'lucide-react';
import { BotanicalCornerFrame, BotanicalGarland, BotanicalFlower } from '../components/common/BotanicalDecor';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { InputField } from '../components/common/InputField';
import { Badge } from '../components/common/Badge';
import { useToast } from '../components/common/Toast';

export function LoginPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [role, setRole] = useState('signer'); // 'signer' | 'hearing'
  const [email, setEmail] = useState('aarav.mehta@saytu.org');
  const [password, setPassword] = useState('saytu-signer-2024');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      addToast({
        title: 'Welcome back to Saytu!',
        message: `Signed in as ${role === 'signer' ? 'Deaf Signer (Aarav Mehta)' : 'Hearing Classroom User (Dr. Radhika Patel)'}.`,
        type: 'success'
      });
      navigate('/dashboard');
    }, 600);
  };

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'signer') {
      setEmail('aarav.mehta@saytu.org');
      setPassword('saytu-signer-2024');
    } else {
      setEmail('dr.radhika@gujaratuniv.edu');
      setPassword('saytu-hearing-2024');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center py-10 px-4 relative overflow-hidden min-h-[calc(100vh-72px)]">
      <BotanicalCornerFrame cornerSize={260} opacity={0.9} withSides={true}>
        <div className="container-narrow relative z-10">
          <Card
            variant="dark"
            className="p-8 md-p-10 max-w-lg mx-auto"
            style={{
              backgroundColor: 'rgba(25, 52, 44, 0.95)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            {/* Editorial Crest Header */}
            <div className="text-center mb-6">
              <div
                className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(240, 139, 118, 0.25), rgba(72, 201, 176, 0.2))',
                  border: '1px solid var(--border-coral)'
                }}
              >
                <BotanicalFlower size={30} />
              </div>
              <h1 className="font-serif text-3xl md-text-4xl font-bold text-primary tracking-tight">
                Sign In to Saytu
              </h1>
              <p className="text-xs text-muted mt-1.5">
                Indian Sign Language Recognition & Communication Bridge
              </p>
            </div>

            {/* Persona Role Selection Cards */}
            <div className="mb-6">
              <label className="form-label text-xs uppercase tracking-wider text-muted font-bold mb-2">
                Choose Your Communication Role
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Signer Persona */}
                <button
                  type="button"
                  onClick={() => handleSelectRole('signer')}
                  className="p-3.5 rounded-2xl flex flex-col items-center text-center gap-1 cursor-pointer transition-all border-none"
                  style={{
                    backgroundColor: role === 'signer' ? 'var(--color-coral-500)' : 'rgba(18, 38, 33, 0.7)',
                    color: role === 'signer' ? '#ffffff' : 'var(--text-secondary-on-dark)',
                    border: `1.5px solid ${role === 'signer' ? 'var(--color-coral-400)' : 'var(--border-subtle)'}`,
                    boxShadow: role === 'signer' ? 'var(--shadow-glow-coral)' : 'none'
                  }}
                >
                  <span className="text-2xl mb-0.5">🤟</span>
                  <span className="text-sm font-bold">Deaf / Mute Signer</span>
                  <span className="text-xs opacity-85">Camera Landmark AI</span>
                </button>

                {/* Hearing Persona */}
                <button
                  type="button"
                  onClick={() => handleSelectRole('hearing')}
                  className="p-3.5 rounded-2xl flex flex-col items-center text-center gap-1 cursor-pointer transition-all border-none"
                  style={{
                    backgroundColor: role === 'hearing' ? 'var(--color-mint-500)' : 'rgba(18, 38, 33, 0.7)',
                    color: role === 'hearing' ? '#0e201b' : 'var(--text-secondary-on-dark)',
                    border: `1.5px solid ${role === 'hearing' ? 'var(--color-mint-400)' : 'var(--border-subtle)'}`,
                    boxShadow: role === 'hearing' ? 'var(--shadow-glow-mint)' : 'none'
                  }}
                >
                  <span className="text-2xl mb-0.5">👂</span>
                  <span className="text-sm font-bold">Hearing Classroom</span>
                  <span className="text-xs opacity-85">Gujarati & English TTS</span>
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
                placeholder="name@saytu.org"
                required
              />

              <div className="relative">
                <InputField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-dim hover:text-primary bg-transparent border-none cursor-pointer"
                  title="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-muted">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="accent-coral" />
                  <span>Remember role preferences</span>
                </label>
                <a href="#forgot" className="text-coral hover:underline">
                  Forgot key?
                </a>
              </div>

              <Button
                type="submit"
                variant={role === 'signer' ? 'coral' : 'mint'}
                size="lg"
                loading={loading}
                icon={<LogIn size={18} />}
                className="w-full mt-2"
              >
                Sign In to Workspace
              </Button>
            </form>

            {/* Demo Quick Persona Fill Banner */}
            <div
              className="mt-6 p-3.5 rounded-xl text-center text-xs"
              style={{
                backgroundColor: 'rgba(14, 32, 27, 0.75)',
                border: '1px dashed var(--border-medium)'
              }}
            >
              <div className="text-muted mb-2 font-medium">Quick Demo Profiles for Hackathon Evaluation:</div>
              <div className="flex justify-center items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => handleSelectRole('signer')}
                  className="text-coral font-bold hover:underline cursor-pointer bg-transparent border-none text-xs flex items-center gap-1"
                >
                  <span>🤟 Signer: Aarav (Deaf Student)</span>
                </button>
                <span className="text-dim">•</span>
                <button
                  type="button"
                  onClick={() => handleSelectRole('hearing')}
                  className="text-mint font-bold hover:underline cursor-pointer bg-transparent border-none text-xs flex items-center gap-1"
                >
                  <span>👂 Hearing: Dr. Radhika (Teacher)</span>
                </button>
              </div>
            </div>

            <div className="text-center text-xs text-muted mt-6 pt-4 border-t border-subtle">
              New to Saytu?{' '}
              <Link to="/signup" className="text-coral font-bold hover:underline">
                Create a free student or teacher profile
              </Link>
            </div>
          </Card>
        </div>
      </BotanicalCornerFrame>
    </div>
  );
}
