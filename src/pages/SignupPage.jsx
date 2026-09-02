import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Sparkles } from 'lucide-react';
import { BotanicalCornerFrame, BotanicalFlower } from '../components/common/BotanicalDecor';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { InputField, SelectField } from '../components/common/InputField';
import { useToast } from '../components/common/Toast';

export function SignupPage() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [role, setRole] = useState('signer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [preferredLang, setPreferredLang] = useState('gu');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      addToast({
        title: 'Account created successfully!',
        message: `Welcome to Saytu, ${name || 'User'}!`,
        type: 'success'
      });
      navigate('/dashboard');
    }, 700);
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
              <h1 className="font-serif text-3xl font-bold text-primary">Join Saytu</h1>
              <p className="text-xs text-muted mt-1">
                Indian Sign Language Recognition & Communication Platform
              </p>
            </div>

            {/* Role Switcher */}
            <div className="mb-6">
              <label className="form-label mb-2">Select Your Communication Role</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('signer')}
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
                  onClick={() => setRole('hearing')}
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

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <InputField
                label="Full Name"
                placeholder="e.g. Aarav Mehta / Dr. Radhika"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <InputField
                label="Email Address"
                type="email"
                placeholder="student@saytu.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <SelectField
                label="Primary Spoken/Caption Output Language"
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value)}
                options={[
                  { value: 'gu', label: 'Gujarati (ગુજરાતી) + English' },
                  { value: 'en', label: 'English Only' },
                ]}
              />

              <Button
                type="submit"
                variant={role === 'signer' ? 'coral' : 'mint'}
                size="md"
                loading={loading}
                icon={<UserPlus size={16} />}
                className="w-full mt-2"
              >
                Create Saytu Profile
              </Button>
            </form>

            <div className="text-center text-xs text-muted mt-6 pt-4 border-t border-subtle">
              Already have an account?{' '}
              <Link to="/login" className="text-coral font-semibold hover:underline">
                Sign In
              </Link>
            </div>
          </Card>
        </div>
      </BotanicalCornerFrame>
    </div>
  );
}
