import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Sparkles, CheckCircle2, Globe } from 'lucide-react';
import { BotanicalCornerFrame, BotanicalGarland, BotanicalFlower } from '../components/common/BotanicalDecor';
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
  const [institution, setInstitution] = useState('');
  const [preferredLang, setPreferredLang] = useState('gu');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      addToast({
        title: 'Profile Created Successfully! 🌟',
        message: `Welcome to Saytu, ${name || 'Student'}! Starting your workspace...`,
        type: 'success'
      });
      navigate('/dashboard');
    }, 600);
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
                Create Saytu Account
              </h1>
              <p className="text-xs text-muted mt-1.5">
                Join our inclusive Indian Sign Language recognition community
              </p>
            </div>

            {/* Persona Role Switcher */}
            <div className="mb-6">
              <label className="form-label text-xs uppercase tracking-wider text-muted font-bold mb-2">
                Select Your Communication Role
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('signer')}
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
                  <span className="text-xs opacity-85">Spatial Camera AI</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('hearing')}
                  className="p-3.5 rounded-2xl flex flex-col items-center text-center gap-1 cursor-pointer transition-all border-none"
                  style={{
                    backgroundColor: role === 'hearing' ? 'var(--color-mint-500)' : 'rgba(18, 38, 33, 0.7)',
                    color: role === 'hearing' ? '#0e201b' : 'var(--text-secondary-on-dark)',
                    border: `1.5px solid ${role === 'hearing' ? 'var(--color-mint-400)' : 'var(--border-subtle)'}`,
                    boxShadow: role === 'hearing' ? 'var(--shadow-glow-mint)' : 'none'
                  }}
                >
                  <span className="text-2xl mb-0.5">👂</span>
                  <span className="text-sm font-bold">Hearing User</span>
                  <span className="text-xs opacity-85">Gujarati & English TTS</span>
                </button>
              </div>
            </div>

            {/* Form */}
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

              <InputField
                label="School / University / Organization"
                placeholder="e.g. Gujarat Inclusive Study Academy"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
              />

              <SelectField
                label="Spoken Output Language Preference"
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value)}
                options={[
                  { value: 'gu', label: 'Gujarati (ગુજરાતી) + English Bilingual' },
                  { value: 'en', label: 'English Only' },
                ]}
                hint="Speech synthesis voice and captions will adapt to this dialect."
              />

              <Button
                type="submit"
                variant={role === 'signer' ? 'coral' : 'mint'}
                size="lg"
                loading={loading}
                icon={<UserPlus size={18} />}
                className="w-full mt-2"
              >
                Create Saytu Profile
              </Button>
            </form>

            <div className="text-center text-xs text-muted mt-6 pt-4 border-t border-subtle">
              Already have an account?{' '}
              <Link to="/login" className="text-coral font-bold hover:underline">
                Sign In to existing workspace
              </Link>
            </div>
          </Card>
        </div>
      </BotanicalCornerFrame>
    </div>
  );
}
