import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Video,
  BookOpen,
  ArrowRight,
  Volume2,
  Sparkles,
  Layers,
  CheckCircle2,
  ShieldCheck,
  Globe,
  HandMetal
} from 'lucide-react';
import {
  BotanicalCornerFrame,
  BotanicalGarland,
  BotanicalFlower,
  BotanicalDivider
} from '../components/common/BotanicalDecor';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';

const SAMPLE_SIGNS = [
  { gloss: 'HELLO', english: 'Hello! Welcome to the classroom.', gujarati: 'નમસ્તે! વર્ગખંડમાં તમારું સ્વાગત છે.' },
  { gloss: 'THANK YOU', english: 'Thank you very much for your help.', gujarati: 'તમારી મદદ માટે ખૂબ ખૂબ આભાર.' },
  { gloss: 'CLASSROOM', english: 'Is this the inclusive study classroom?', gujarati: 'શું આ સમાવેશી અભ્યાસ વર્ગખંડ છે?' },
  { gloss: 'GUJARAT', english: 'I am learning Indian Sign Language in Gujarat.', gujarati: 'હું ગુજરાતમાં ભારતીય સાંકેતિક ભાષા શીખી રહ્યો છું.' },
  { gloss: 'HELP', english: 'Could you please assist me with this question?', gujarati: 'શું તમે આ પ્રશ્નમાં મારી મદદ કરી શકશો?' }
];

export function LandingPage() {
  const navigate = useNavigate();
  const [activeSignIndex, setActiveSignIndex] = useState(0);
  const activeSign = SAMPLE_SIGNS[activeSignIndex];

  const handleSpeak = (text, lang = 'en-US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Botanical Framing */}
      <section className="relative overflow-hidden pt-12 pb-20 md-pb-28">
        <BotanicalCornerFrame cornerSize={320} opacity={0.92}>
          <div className="container relative z-10 flex flex-col items-center text-center">
            {/* Top Hackathon Banner */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-850 border border-subtle mb-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-coral">
                WOMEN'S HACKATHON · INNOVATOR TRACK · PROBLEM 10
              </span>
            </div>

            {/* Top Floral Garland */}
            <BotanicalGarland width={480} height={48} className="mb-2" />

            {/* Main Editorial Serif Title */}
            <h1
              className="font-serif font-bold tracking-tight text-primary mb-4"
              style={{ fontSize: 'clamp(3.2rem, 7vw, 5.4rem)', lineHeight: 1.05 }}
            >
              Saytu
            </h1>

            {/* Subtitle */}
            <h2
              className="font-serif font-normal text-coral mb-6"
              style={{ fontSize: 'clamp(1.25rem, 2.8vw, 1.85rem)', letterSpacing: '-0.01em' }}
            >
              ISL Sign Recognition & Learning App
            </h2>

            {/* Value Proposition Statement */}
            <p
              className="text-lead text-secondary max-w-3xl mb-8 font-light"
              style={{ color: 'var(--text-secondary-on-dark)', fontSize: '1.2rem', lineHeight: 1.7 }}
            >
              A live webcam-to-caption-and-speech bridge for Deaf/Mute students, built around Indian
              Sign Language — plus a practice mode that reuses the same recognizer.
            </p>

            {/* CTAs */}
            <div className="flex items-center gap-4 flex-wrap justify-center mb-12">
              <Button
                variant="coral"
                size="lg"
                icon={<Video size={18} />}
                onClick={() => navigate('/session/live-demo')}
              >
                Start Live Communication Session
              </Button>

              <Button
                variant="mint"
                size="lg"
                icon={<BookOpen size={18} />}
                onClick={() => navigate('/learn')}
              >
                Practice ISL Signs (~20 Vocab)
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate('/about')}
              >
                Explore System Architecture
              </Button>
            </div>

            {/* Reference Deck Metadata Bar */}
            <div
              className="flex items-center justify-center gap-8 py-4 px-8 rounded-2xl flex-wrap text-sm font-semibold"
              style={{
                backgroundColor: 'rgba(22, 47, 40, 0.75)',
                border: '1px solid var(--border-subtle)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <div className="flex items-center gap-2">
                <span className="overline text-coral">TEAM SIZE</span>
                <span className="text-primary font-bold">3 Engineers</span>
              </div>
              <span className="text-dim">•</span>
              <div className="flex items-center gap-2">
                <span className="overline text-mint">TIMEFRAME</span>
                <span className="text-primary font-bold">24-Hour Build</span>
              </div>
              <span className="text-dim">•</span>
              <div className="flex items-center gap-2">
                <span className="overline text-gold">SCOPE</span>
                <span className="text-primary font-bold">~20 Sign Vocabulary</span>
              </div>
            </div>

            {/* Bottom Floral Garland */}
            <BotanicalGarland width={480} height={48} className="mt-8" />
          </div>
        </BotanicalCornerFrame>
      </section>

      {/* Interactive Live ISL Recognizer Preview Widget */}
      <section className="py-12 bg-deep relative">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="overline mb-2">Interactive Demo Preview</div>
            <h2 className="font-serif text-3xl font-semibold text-primary">
              Live Sign-to-Speech Translation Simulation
            </h2>
            <p className="text-sm text-muted mt-2">
              Select a sample ISL sign to simulate real-time landmark recognition and dual English/Gujarati spoken speech.
            </p>
          </div>

          <Card
            variant="dark"
            className="max-w-4xl mx-auto overflow-hidden p-6 md-p-8"
            style={{
              backgroundColor: 'var(--color-forest-850)',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            {/* Sign Selector Pills */}
            <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
              {SAMPLE_SIGNS.map((sign, idx) => (
                <button
                  key={sign.gloss}
                  onClick={() => setActiveSignIndex(idx)}
                  className="btn btn-sm"
                  style={{
                    backgroundColor:
                      activeSignIndex === idx ? 'var(--color-coral-500)' : 'rgba(32, 67, 58, 0.6)',
                    color: activeSignIndex === idx ? '#ffffff' : 'var(--text-secondary-on-dark)',
                    border: `1px solid ${activeSignIndex === idx ? 'var(--color-coral-400)' : 'var(--border-subtle)'}`,
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  <span className="font-mono font-bold">[{sign.gloss}]</span>
                </button>
              ))}
            </div>

            {/* Dual Grid: Signer Landmark Simulation + Spoken Output */}
            <div className="grid grid-cols-1 md-grid-cols-2 gap-6 items-stretch">
              {/* Left Column: Signer Recognition State */}
              <div
                className="p-6 rounded-2xl flex flex-col justify-between"
                style={{
                  backgroundColor: '#122621',
                  border: '1px solid var(--border-medium)'
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="overline text-mint">Camera Landmark Mesh</span>
                    <Badge variant="mint">96% AI Confidence</Badge>
                  </div>

                  <div
                    className="flex flex-col items-center justify-center p-8 rounded-xl my-4 text-center"
                    style={{
                      background: 'radial-gradient(circle at center, #1e3f36 0%, #122621 100%)',
                      border: '1px dashed var(--border-medium)'
                    }}
                  >
                    <div className="pulse-bloom text-5xl mb-3">🤟</div>
                    <span className="text-xs text-muted">Client-Side MediaPipe Holistic</span>
                    <div className="mt-3">
                      <span className="gloss-tag gloss-tag-coral text-sm">
                        GLOSS: [{activeSign.gloss}]
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-muted flex items-center justify-between pt-2 border-t border-subtle">
                  <span>Temporal Window: 30 Frames</span>
                  <span className="text-mint font-mono">Status: Stream Online</span>
                </div>
              </div>

              {/* Right Column: Audio Output & Captions */}
              <div
                className="p-6 rounded-2xl flex flex-col justify-between"
                style={{
                  backgroundColor: 'rgba(28, 58, 50, 0.7)',
                  border: '1px solid var(--border-coral)'
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="overline text-coral">Speech & Caption Output</span>
                    <Badge variant="coral">English + Gujarati</Badge>
                  </div>

                  {/* English Caption */}
                  <div className="p-4 rounded-xl bg-forest-900 border border-subtle mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-mint">English Caption</span>
                      <button
                        onClick={() => handleSpeak(activeSign.english, 'en-US')}
                        className="btn btn-mint btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        <Volume2 size={13} />
                        Speak
                      </button>
                    </div>
                    <p className="text-sm font-medium text-primary mt-1">{activeSign.english}</p>
                  </div>

                  {/* Gujarati Caption */}
                  <div className="p-4 rounded-xl bg-coral-subtle border border-coral">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-coral">ગુજરાતી આઉટપુટ (Gujarati)</span>
                      <button
                        onClick={() => handleSpeak(activeSign.gujarati, 'gu-IN')}
                        className="btn btn-coral btn-sm"
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        <Volume2 size={13} />
                        વાંચો
                      </button>
                    </div>
                    <p className="text-base font-semibold text-primary gujarati-text mt-1">
                      {activeSign.gujarati}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-subtle flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/session/live-demo')}
                    icon={<ArrowRight size={14} />}
                    iconPosition="right"
                  >
                    Open Live Session Room
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Product Flow Section (Landing -> Login -> Dashboard -> Select -> Live Session) */}
      <section className="py-20">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="overline mb-2">Platform Experience</div>
            <h2 className="font-serif text-3xl md-text-4xl font-semibold text-primary">
              Seamless 5-Stage Communication Flow
            </h2>
            <p className="text-sm text-muted mt-2">
              Designed for effortless adoption by Deaf students, teachers, and hearing peers.
            </p>
          </div>

          <div className="grid grid-cols-1 md-grid-cols-5 gap-4">
            {[
              { step: '1', title: 'Landing', desc: 'Discover Saytu mission, features & sign database' },
              { step: '2', title: 'Role Auth', desc: 'Sign in as Deaf Signer or Hearing Participant' },
              { step: '3', title: 'Dashboard', desc: 'Select recent contacts or launch an instant room' },
              { step: '4', title: 'Live Bridge', desc: 'Realtime landmark tracking & dual voice output' },
              { step: '5', title: 'Learn Mode', desc: 'Practice 20 core ISL signs with AI verification' }
            ].map((f) => (
              <Card
                key={f.step}
                variant="dark"
                className="p-5 text-center flex flex-col items-center justify-between"
                style={{
                  backgroundColor: 'var(--color-forest-850)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-coral-500)',
                    color: '#ffffff',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px'
                  }}
                >
                  {f.step}
                </div>
                <h3 className="font-serif text-lg font-semibold text-primary mb-1">{f.title}</h3>
                <p className="text-xs text-muted">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Architectural Scope (What We Build vs Not) */}
      <section className="py-16 bg-deep">
        <div className="container">
          <div className="grid grid-cols-1 md-grid-cols-2 gap-8">
            {/* What We Are Building */}
            <Card
              variant="dark"
              className="p-8"
              style={{
                backgroundColor: 'var(--color-forest-850)',
                border: '1px solid var(--border-mint)'
              }}
            >
              <div className="flex items-center gap-2 mb-6 text-mint">
                <CheckCircle2 size={22} />
                <h3 className="font-serif text-2xl font-semibold">What We Are Building</h3>
              </div>
              <ul className="flex flex-col gap-4 text-sm text-secondary">
                <li className="flex items-start gap-3">
                  <span className="text-mint font-bold">✦</span>
                  <span>Closed-vocabulary (~20 signs) live real-time recognition</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-mint font-bold">✦</span>
                  <span>Real MediaPipe landmark-based recognition — not a scripted trigger</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-mint font-bold">✦</span>
                  <span>English + Gujarati captions and Web Speech text-to-speech output</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-mint font-bold">✦</span>
                  <span>A minimal reusable practice / learning mode with AI feedback</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-mint font-bold">✦</span>
                  <span>Correct linguistic separation of ISL from spoken English/Gujarati</span>
                </li>
              </ul>
            </Card>

            {/* Focus Philosophy */}
            <Card
              variant="dark"
              className="p-8"
              style={{
                backgroundColor: 'rgba(240, 139, 118, 0.08)',
                border: '1px solid var(--border-coral)'
              }}
            >
              <div className="flex items-center gap-2 mb-6 text-coral">
                <ShieldCheck size={22} />
                <h3 className="font-serif text-2xl font-semibold">Linguistic Integrity</h3>
              </div>
              <p className="text-sm text-secondary leading-relaxed mb-4">
                <strong>There is no separate "Gujarati Sign Language."</strong> Deaf communities across Gujarat — like most of India — primarily use Indian Sign Language (ISL), with regional vocabulary variations.
              </p>
              <p className="text-sm text-secondary leading-relaxed">
                Saytu preserves ISL as a real, spatial language on the signer input side, while translating glosses cleanly to spoken English and Gujarati for hearing classroom participants.
              </p>
              <div className="mt-6">
                <Button
                  variant="coral"
                  size="sm"
                  onClick={() => navigate('/about')}
                >
                  Read Linguistic Research
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Ready to Communicate Footer CTA */}
      <section className="py-20 text-center relative overflow-hidden">
        <div className="container relative z-10 max-w-2xl">
          <BotanicalFlower size={36} className="mx-auto mb-4" />
          <h2 className="font-serif text-3xl md-text-4xl font-bold text-primary mb-4">
            Connect Naturally Across Classrooms
          </h2>
          <p className="text-sm text-muted mb-8">
            Experience real-time Indian Sign Language bridge technology built with empathy, elegance, and AI precision.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button
              variant="coral"
              size="lg"
              onClick={() => navigate('/session/live-demo')}
            >
              Start Live Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/learn')}
            >
              Practice 20 ISL Signs
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
