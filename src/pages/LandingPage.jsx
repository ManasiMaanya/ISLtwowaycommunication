import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Video,
  BookOpen,
  Volume2,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Radio,
  Heart,
  Layers,
  Sparkle
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
  {
    gloss: 'HELLO',
    gujaratiWord: 'નમસ્તે',
    english: 'Hello! Welcome to our inclusive classroom.',
    gujarati: 'નમસ્તે! અમારા સમાવેશી વર્ગખંડમાં તમારું સ્વાગત છે.',
    motion: 'Flat open palm starts at forehead and sweeps forward with a warm smile.'
  },
  {
    gloss: 'THANK YOU',
    gujaratiWord: 'આભાર',
    english: 'Thank you very much for assisting me.',
    gujarati: 'મને મદદ કરવા માટે તમારો ખૂબ ખૂબ આભાર.',
    motion: 'Fingertips gently touch the chin and extend outward towards the speaker.'
  },
  {
    gloss: 'CLASSROOM',
    gujaratiWord: 'વર્ગખંડ',
    english: 'Is this the acoustics and science classroom?',
    gujarati: 'શું આ વિજ્ઞાન અને ધ્વનિશાસ્ત્રનો વર્ગખંડ છે?',
    motion: 'Both hands form C-shapes, joining wrists and curving to form an inclusive room boundary.'
  },
  {
    gloss: 'GUJARAT',
    gujaratiWord: 'ગુજરાત',
    english: 'I am learning Indian Sign Language in Gujarat.',
    gujarati: 'હું ગુજરાતમાં ભારતીય સાંકેતિક ભાષા શીખી રહ્યો છું.',
    motion: 'G-handshape traces an elegant geographic curve in the upper signing space.'
  },
  {
    gloss: 'HELP',
    gujaratiWord: 'મદદ',
    english: 'Could you please assist me with this concept?',
    gujarati: 'શું તમે આ મુદ્દાને સમજવામાં મારી મદદ કરી શકશો?',
    motion: 'Closed fist with thumb upright rests on open palm of non-dominant hand and lifts upward.'
  },
  {
    gloss: 'WATER',
    gujaratiWord: 'પાણી',
    english: 'May I drink some water, please?',
    gujarati: 'શું હું થોડું પાણી પી શકું, કૃપા કરીને?',
    motion: 'W-handshape index finger gently taps the side of the chin twice.'
  }
];

export function LandingPage() {
  const navigate = useNavigate();
  const [activeSignIndex, setActiveSignIndex] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const activeSign = SAMPLE_SIGNS[activeSignIndex];

  const handleSpeak = (text, lang = 'en-US') => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95;
    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* =========================================================================
          HERO / COVER SPREAD
          Faithfully matches the reference cover slide with rich botanical borders
          ========================================================================= */}
      <section className="relative overflow-hidden pt-8 pb-16 md-pt-12 md-pb-24">
        <BotanicalCornerFrame cornerSize={300} opacity={0.94} withSides={true}>
          <div className="container relative z-10 flex flex-col items-center text-center">
            {/* Top Hackathon Track Header */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(20, 42, 36, 0.85)', border: '1px solid var(--border-subtle)' }}>
              <span className="overline text-coral tracking-widest text-xs font-bold">
                WOMEN'S HACKATHON · INNOVATOR TRACK · PROBLEM 10
              </span>
            </div>

            {/* Top Symmetrical Floral Garland */}
            <BotanicalGarland width={500} height={52} className="mb-2" />

            {/* Monumental Editorial Serif Title */}
            <h1
              className="font-serif font-bold tracking-tight text-primary mb-3"
              style={{
                fontSize: 'clamp(3.8rem, 8vw, 6.2rem)',
                lineHeight: 1.02,
                textShadow: '0 2px 16px rgba(0,0,0,0.25)'
              }}
            >
              Saytu
            </h1>

            {/* Subtitle */}
            <h2
              className="font-serif font-normal text-coral mb-6"
              style={{ fontSize: 'clamp(1.35rem, 3vw, 2.1rem)', letterSpacing: '-0.01em' }}
            >
              ISL Sign Recognition & Learning App
            </h2>

            {/* Editorial Manifesto Statement */}
            <p
              className="text-lead max-w-3xl mb-8 font-light"
              style={{
                color: 'var(--text-secondary-on-dark)',
                fontSize: 'clamp(1.1rem, 2vw, 1.28rem)',
                lineHeight: 1.75
              }}
            >
              A live webcam-to-caption-and-speech bridge for Deaf/Mute students, built around Indian
              Sign Language — plus a practice mode that reuses the same recognizer.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex items-center gap-4 flex-wrap justify-center mb-12">
              <Button
                variant="mint"
                size="lg"
                icon={<Video size={18} />}
                onClick={() => navigate('/session/live-demo')}
                className="shadow-glow-mint"
              >
                Launch Live Bridge Session
              </Button>

              <Button
                variant="coral"
                size="lg"
                icon={<BookOpen size={18} />}
                onClick={() => navigate('/learn')}
                className="shadow-glow-coral"
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

            {/* Hackathon Specifications Metadata Box */}
            <div
              className="flex items-center justify-center gap-6 md-gap-10 py-3.5 px-8 rounded-full flex-wrap text-xs md-text-sm font-semibold"
              style={{
                backgroundColor: 'rgba(18, 38, 33, 0.85)',
                border: '1px solid var(--border-medium)',
                backdropFilter: 'blur(10px)',
                boxShadow: 'var(--shadow-sm)'
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

            {/* Bottom Symmetrical Floral Garland */}
            <BotanicalGarland width={500} height={52} className="mt-8" />
          </div>
        </BotanicalCornerFrame>
      </section>

      {/* =========================================================================
          SPREAD 2: THE HUMAN STORY & THE CORE PROBLEM
          Parchment card with botanical framing & 3-stage visual bridge
          ========================================================================= */}
      <section className="py-16 relative">
        <div className="container max-w-5xl">
          <Card
            variant="cream"
            framed={true}
            className="p-8 md-p-12"
          >
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="overline text-coral text-xs mb-2 block font-bold">THE REALITY IN CLASSROOMS</span>
              <h2 className="font-serif text-3xl md-text-4xl font-bold text-dark mb-3">
                Deaf students and hearing classrooms don't speak the same language
              </h2>
              <p className="text-sm text-dark-secondary italic">
                Official brief: “Learning App for Deaf/Mute Students & English/Gujarati Sign-Language Converter.”
              </p>
            </div>

            {/* Core Question Highlight Box */}
            <div
              className="p-6 rounded-2xl mb-10 text-center max-w-3xl mx-auto"
              style={{
                backgroundColor: 'rgba(240, 139, 118, 0.16)',
                border: '1px solid var(--border-coral)'
              }}
            >
              <span className="overline text-coral text-xs font-bold block mb-1.5">CORE PHILOSOPHICAL QUESTION</span>
              <p className="text-base md-text-lg font-serif font-medium text-dark leading-relaxed">
                "How can a digital system let a sign-language user and a non-sign-language user understand each other in real time — without inventing a fake shortcut language?"
              </p>
            </div>

            {/* 3-Stage Direction Flow */}
            <div className="grid grid-cols-1 md-grid-cols-3 gap-6 pt-4 border-t border-cream">
              <div className="text-center p-5 rounded-2xl bg-cream-50 border border-cream transition-transform hover:-translate-y-1">
                <div className="text-4xl mb-3">🤟</div>
                <h3 className="font-serif font-bold text-dark text-xl mb-1">1. Sign In</h3>
                <p className="text-xs text-dark-secondary leading-relaxed">
                  Webcam captures live spatial ISL signing directly in the student's browser with zero extra hardware.
                </p>
              </div>

              <div className="text-center p-5 rounded-2xl bg-cream-50 border border-cream transition-transform hover:-translate-y-1">
                <div className="text-4xl mb-3">🧠</div>
                <h3 className="font-serif font-bold text-dark text-xl mb-1">2. Recognised</h3>
                <p className="text-xs text-dark-secondary leading-relaxed">
                  Client-side MediaPipe landmark vectors stream to a temporal GRU classifier, mapping motions to a Gloss ID.
                </p>
              </div>

              <div className="text-center p-5 rounded-2xl bg-cream-50 border border-cream transition-transform hover:-translate-y-1">
                <div className="text-4xl mb-3">🔊</div>
                <h3 className="font-serif font-bold text-dark text-xl mb-1">3. Voice Out</h3>
                <p className="text-xs text-dark-secondary leading-relaxed">
                  Instant visual captions and natural spoken English & Gujarati speech synthesis broadcast to hearing teachers and peers.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* =========================================================================
          SPREAD 3: INTERACTIVE SIGN-TO-SPEECH STUDIO
          Warm tactile demonstration with Gujarati speech playback
          ========================================================================= */}
      <section className="py-16 bg-deep relative">
        <div className="container max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="overline text-mint mb-2">INTERACTIVE LIVE DEMO</div>
            <h2 className="font-serif text-3xl md-text-4xl font-semibold text-primary">
              Experience the Live ISL Bridge
            </h2>
            <p className="text-sm text-muted mt-2">
              Select any core Indian Sign Language vocabulary term below to simulate real-time landmark recognition and bilingual speech synthesis.
            </p>
          </div>

          <Card
            variant="dark"
            className="overflow-hidden p-6 md-p-8"
            style={{
              backgroundColor: 'var(--color-forest-850)',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            {/* Sign Selector Pills */}
            <div className="flex items-center justify-center gap-2.5 flex-wrap mb-8">
              {SAMPLE_SIGNS.map((sign, idx) => {
                const isSelected = activeSignIndex === idx;
                return (
                  <button
                    key={sign.gloss}
                    onClick={() => setActiveSignIndex(idx)}
                    className="btn btn-sm"
                    style={{
                      backgroundColor: isSelected ? 'var(--color-coral-500)' : 'rgba(28, 58, 50, 0.7)',
                      color: isSelected ? '#ffffff' : 'var(--text-secondary-on-dark)',
                      border: `1px solid ${isSelected ? 'var(--color-coral-400)' : 'var(--border-subtle)'}`,
                      borderRadius: 'var(--radius-full)',
                      padding: '8px 16px',
                      fontSize: '0.84rem'
                    }}
                  >
                    <span className="font-mono font-bold">[{sign.gloss}]</span>
                    <span className="text-xs gujarati-text ml-1 opacity-80">({sign.gujaratiWord})</span>
                  </button>
                );
              })}
            </div>

            {/* Dual Column Studio: Camera Landmark Simulation + Spoken Output */}
            <div className="grid grid-cols-1 md-grid-cols-2 gap-6 items-stretch">
              {/* Left Column: Signer Gesture & Landmark Mesh */}
              <div
                className="p-6 rounded-2xl flex flex-col justify-between"
                style={{
                  backgroundColor: '#10241f',
                  border: '1px solid var(--border-medium)'
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="overline text-mint">Camera Landmark Mesh</span>
                    <Badge variant="mint">96% AI Match</Badge>
                  </div>

                  <div
                    className="flex flex-col items-center justify-center p-8 rounded-xl my-3 text-center"
                    style={{
                      background: 'radial-gradient(circle at center, #1e3f36 0%, #10241f 100%)',
                      border: '1px dashed var(--border-medium)'
                    }}
                  >
                    <div className="pulse-bloom text-5xl mb-3 select-none">🤟</div>
                    <span className="text-xs text-mint font-mono mb-2">MediaPipe Holistic (Client)</span>
                    <span className="gloss-tag gloss-tag-coral text-sm">
                      GLOSS: [{activeSign.gloss}]
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-forest-900 border border-subtle mt-2">
                    <span className="text-xs text-muted font-bold block mb-1">Gesture Motion Form:</span>
                    <p className="text-xs text-secondary leading-relaxed">{activeSign.motion}</p>
                  </div>
                </div>

                <div className="text-xs text-muted flex items-center justify-between pt-3 border-t border-subtle mt-4">
                  <span>30-Frame Rolling Window</span>
                  <span className="text-mint font-mono">Status: Live Tracking</span>
                </div>
              </div>

              {/* Right Column: Spoken Audio Synthesis & Captions */}
              <div
                className="p-6 rounded-2xl flex flex-col justify-between"
                style={{
                  backgroundColor: 'rgba(28, 58, 50, 0.8)',
                  border: '1px solid var(--border-coral)'
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="overline text-coral">Spoken Audio & Captions</span>
                    <Badge variant="coral">English + Gujarati</Badge>
                  </div>

                  {/* English Audio Card */}
                  <div className="p-4 rounded-xl bg-forest-900 border border-subtle mb-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-mint">English Caption</span>
                      <Button
                        variant="mint"
                        size="sm"
                        icon={<Volume2 size={13} />}
                        onClick={() => handleSpeak(activeSign.english, 'en-US')}
                        style={{ padding: '4px 12px', fontSize: '0.75rem' }}
                      >
                        Speak (EN)
                      </Button>
                    </div>
                    <p className="text-sm font-medium text-primary leading-relaxed">
                      {activeSign.english}
                    </p>
                  </div>

                  {/* Gujarati Audio Card */}
                  <div className="p-4 rounded-xl bg-coral-subtle border border-coral">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-coral">ગુજરાતી બોલી (Gujarati TTS)</span>
                      <Button
                        variant="coral"
                        size="sm"
                        icon={<Volume2 size={13} />}
                        onClick={() => handleSpeak(activeSign.gujarati, 'gu-IN')}
                        style={{ padding: '4px 12px', fontSize: '0.75rem' }}
                      >
                        વાંચો (GU)
                      </Button>
                    </div>
                    <p className="text-base font-semibold text-primary gujarati-text leading-relaxed">
                      {activeSign.gujarati}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-subtle flex items-center justify-between">
                  <span className="text-xs text-muted">Web Speech API Synthesis</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/session/live-demo')}
                    icon={<ArrowRight size={14} />}
                    iconPosition="right"
                  >
                    Enter Live Session
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* =========================================================================
          SPREAD 4: LINGUISTICS & PHILOSOPHICAL INTEGRITY
          Two-column editorial spread on ISL vs English vs Gujarati
          ========================================================================= */}
      <section className="py-16">
        <div className="container max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <BotanicalFlower size={30} className="mx-auto mb-2" />
            <div className="overline text-gold mb-2">LINGUISTIC PRINCIPLES</div>
            <h2 className="font-serif text-3xl md-text-4xl font-semibold text-primary">
              Respecting Indian Sign Language as an Independent Language
            </h2>
          </div>

          <div className="grid grid-cols-1 md-grid-cols-2 gap-8">
            <Card
              variant="dark"
              className="p-8"
              style={{
                backgroundColor: 'var(--color-forest-850)',
                border: '1px solid var(--border-mint)'
              }}
            >
              <div className="flex items-center gap-2 mb-4 text-mint">
                <ShieldCheck size={22} />
                <h3 className="font-serif text-2xl font-bold">Spatial Grammar, Not Broken English</h3>
              </div>
              <p className="text-sm text-secondary leading-relaxed mb-4">
                ISL is a rich, natural visual-spatial language with its own topic-comment structure, non-manual facial markers, and 3D coordinate space.
              </p>
              <p className="text-sm text-secondary leading-relaxed">
                Saytu preserves genuine ISL signing on the student's camera input side, using internal <strong>Gloss Concept IDs</strong> to bridge into written and spoken output without imposing unnatural word-for-word transliteration.
              </p>
            </Card>

            <Card
              variant="dark"
              className="p-8"
              style={{
                backgroundColor: 'rgba(240, 139, 118, 0.08)',
                border: '1px solid var(--border-coral)'
              }}
            >
              <div className="flex items-center gap-2 mb-4 text-coral">
                <Globe size={22} />
                <h3 className="font-serif text-2xl font-bold">Regional Diversity Across Gujarat</h3>
              </div>
              <p className="text-sm text-secondary leading-relaxed mb-4">
                <strong>There is no separate "Gujarati Sign Language."</strong> Deaf communities across Gujarat and India share the foundational grammar of Indian Sign Language, enriched by regional dialect vocabulary.
              </p>
              <p className="text-sm text-secondary leading-relaxed">
                Our output engine specifically supports both <strong>Gujarati</strong> and <strong>English</strong> text-to-speech so local teachers, family members, and classmates hear natural translations in their mother tongue.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SPREAD 5: THE 5-STAGE USER JOURNEY
          Stepping stones leading from discover to live communication
          ========================================================================= */}
      <section className="py-16 bg-deep">
        <div className="container max-w-5xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="overline text-coral mb-2">PRODUCT FLOW</div>
            <h2 className="font-serif text-3xl md-text-4xl font-semibold text-primary">
              From Discovery to Live Two-Way Communication
            </h2>
            <p className="text-sm text-muted mt-2">
              An intuitive, human-centered journey designed for effortless adoption by students and classrooms.
            </p>
          </div>

          <div className="grid grid-cols-1 md-grid-cols-5 gap-4">
            {[
              { num: '1', title: 'Landing', desc: 'Discover Saytu mission, linguistic architecture & interactive preview' },
              { num: '2', title: 'Role Auth', desc: 'Choose role: Deaf Signer 🤟 or Hearing Classroom Student/Teacher 👂' },
              { num: '3', title: 'Dashboard', desc: 'View inbox channels, evaluation streaks, and start a live bridge room' },
              { num: '4', title: 'Live Bridge', desc: 'Real-time landmark mesh tracking with English & Gujarati speech output' },
              { num: '5', title: 'Learn Mode', desc: 'Practice 20 core ISL signs with real-time pass/fail AI verification' }
            ].map((step) => (
              <Card
                key={step.num}
                variant="dark"
                className="p-5 text-center flex flex-col items-center justify-between"
                style={{
                  backgroundColor: 'var(--color-forest-850)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-coral-500)',
                    color: '#ffffff',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {step.num}
                </div>
                <h3 className="font-serif text-lg font-bold text-primary mb-1">{step.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SPREAD 6: GRAND BOTANICAL CLOSING SPREAD
          Framed invitation to enter the platform
          ========================================================================= */}
      <section className="py-20 text-center relative overflow-hidden">
        <BotanicalGarland width={480} height={48} className="mb-6 mx-auto" />
        <div className="container relative z-10 max-w-2xl">
          <h2 className="font-serif text-3xl md-text-4xl font-bold text-primary mb-4">
            Empower Every Student to Speak and Be Heard
          </h2>
          <p className="text-sm text-secondary leading-relaxed mb-8">
            Experience Indian Sign Language bridge technology built with deep empathy, authentic linguistic respect, and AI precision.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button
              variant="mint"
              size="lg"
              onClick={() => navigate('/session/live-demo')}
            >
              Start Live Demo Room
            </Button>
            <Button
              variant="coral"
              size="lg"
              onClick={() => navigate('/learn')}
            >
              Practice ISL Vocabulary
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/login')}
            >
              Sign In to Profile
            </Button>
          </div>
        </div>
        <BotanicalGarland width={480} height={48} className="mt-8 mx-auto" />
      </section>
    </div>
  );
}
