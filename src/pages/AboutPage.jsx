import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  Layers,
  Cpu,
  Globe,
  Radio,
  Sparkles,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import {
  BotanicalGarland,
  BotanicalFlower,
  BotanicalDivider
} from '../components/common/BotanicalDecor';
import { PageHeader } from '../components/navigation/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="container py-10">
      {/* Page Header */}
      <PageHeader
        overline="SYSTEM DESIGN & RESEARCH"
        title="About Saytu: Architecture & Linguistics"
        subtitle="Bridging the communication divide between Deaf/Mute students and hearing classrooms with real-time Indian Sign Language AI recognition and bilingual speech synthesis."
        withGarland={true}
        actions={
          <Button
            variant="coral"
            size="md"
            onClick={() => navigate('/session/live-demo')}
            icon={<ArrowRight size={16} />}
            iconPosition="right"
          >
            Launch Live Room
          </Button>
        }
      />

      {/* Slide 2: The Problem */}
      <section className="mb-16">
        <Card
          variant="cream"
          framed={true}
          className="p-8 md-p-10 mb-8"
        >
          <div className="overline text-coral mb-2">THE PROBLEM</div>
          <h2 className="font-serif text-3xl font-bold text-dark mb-4">
            Deaf students and hearing classrooms don't speak the same language
          </h2>
          <p className="text-sm text-dark-secondary italic mb-6">
            Official brief: “Learning App for Deaf/Mute Students & English/Gujarati Sign-Language Converter.”
          </p>

          <div
            className="p-5 rounded-2xl mb-8"
            style={{
              backgroundColor: 'rgba(240, 139, 118, 0.15)',
              border: '1px solid var(--border-coral)'
            }}
          >
            <span className="overline text-xs text-coral font-bold block mb-1">Core Question</span>
            <p className="text-base font-medium text-dark">
              How can a digital system let a sign-language user and a non-sign-language user understand each other in real time — without inventing a fake shortcut language?
            </p>
          </div>

          <div className="grid grid-cols-1 md-grid-cols-3 gap-6 pt-4 border-t border-cream">
            <div className="text-center p-4 rounded-xl bg-cream-50 border border-cream">
              <div className="text-3xl mb-2">🤟</div>
              <div className="font-serif font-bold text-dark text-lg">1. Sign In</div>
              <p className="text-xs text-dark-muted mt-1">Webcam captures live ISL signing on the browser</p>
            </div>

            <div className="text-center p-4 rounded-xl bg-cream-50 border border-cream">
              <div className="text-3xl mb-2">🧠</div>
              <div className="font-serif font-bold text-dark text-lg">2. Recognised</div>
              <p className="text-xs text-dark-muted mt-1">Landmark classifier maps gestures to a Gloss ID</p>
            </div>

            <div className="text-center p-4 rounded-xl bg-cream-50 border border-cream">
              <div className="text-3xl mb-2">🔊</div>
              <div className="font-serif font-bold text-dark text-lg">3. Voice Out</div>
              <p className="text-xs text-dark-muted mt-1">Captions + Spoken English/Gujarati via Web Speech TTS</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Slide 3: Scope: What We Are Building vs Not */}
      <section className="mb-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="overline mb-2">SCOPE & PRIORITISATION</div>
          <h2 className="font-serif text-3xl font-semibold text-primary">
            What We Are Actually Building
          </h2>
        </div>

        <div className="grid grid-cols-1 md-grid-cols-2 gap-8">
          {/* We Are Building */}
          <Card
            variant="dark"
            className="p-6 md-p-8"
            style={{
              backgroundColor: 'var(--color-forest-850)',
              border: '1px solid var(--border-mint)'
            }}
          >
            <div className="flex items-center gap-2 mb-4 text-mint">
              <CheckCircle2 size={20} />
              <h3 className="font-serif text-xl font-bold">WE ARE BUILDING</h3>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-mint font-bold">✦</span>
                <span><strong>Closed-vocabulary (~20 signs)</strong> live recognition for classrooms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-mint font-bold">✦</span>
                <span><strong>Real landmark-based recognition</strong> — not a scripted trigger</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-mint font-bold">✦</span>
                <span><strong>English + Gujarati captions</strong> and text-to-speech audio output</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-mint font-bold">✦</span>
                <span><strong>A minimal reusable practice / learning mode</strong> using the same model</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-mint font-bold">✦</span>
                <span><strong>Correct separation</strong> of ISL from spoken English / Gujarati</span>
              </li>
            </ul>
          </Card>

          {/* We Are NOT Building */}
          <Card
            variant="dark"
            className="p-6 md-p-8"
            style={{
              backgroundColor: 'rgba(240, 139, 118, 0.08)',
              border: '1px solid var(--border-coral)'
            }}
          >
            <div className="flex items-center gap-2 mb-4 text-coral">
              <XCircle size={20} />
              <h3 className="font-serif text-xl font-bold">WE ARE NOT BUILDING</h3>
            </div>
            <ul className="flex flex-col gap-3 text-sm text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-coral font-bold">✖</span>
                <span>Converting hearing speech/text back into sign output</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral font-bold">✖</span>
                <span>Open-vocabulary or unconstrained full ISL translation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral font-bold">✖</span>
                <span>A 3D or AI-generated signing avatar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral font-bold">✖</span>
                <span>Full ISL generative grammar engine</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral font-bold">✖</span>
                <span>Complex user database or persistent telemetry overhead</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Slide 4: Linguistics: ISL vs English vs Gujarati */}
      <section className="mb-16">
        <Card variant="dark" className="p-8" style={{ backgroundColor: 'var(--color-forest-850)' }}>
          <div className="overline text-gold mb-2">LINGUISTICS — GET THIS RIGHT</div>
          <h2 className="font-serif text-2xl font-bold text-primary mb-4">
            ISL vs English vs Gujarati
          </h2>

          <div
            className="p-4 rounded-xl mb-6"
            style={{
              backgroundColor: 'rgba(246, 195, 88, 0.1)',
              border: '1px solid rgba(246, 195, 88, 0.3)'
            }}
          >
            <p className="text-sm text-secondary font-medium">
              There is no separate “Gujarati Sign Language.” Deaf communities across Gujarat — like most of India — primarily use Indian Sign Language (ISL), with regional vocabulary variation, the same way spoken dialects vary.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {[
              {
                lang: 'ISL',
                badge: 'Input Sign Language',
                desc: 'A real, independent language — spatial grammar, topic-comment structure, facial markers. What our recognition system is built around.'
              },
              {
                lang: 'English',
                badge: 'Spoken Output (TTS)',
                desc: 'A spoken/written language, used only on the Hearing User’s output side (captions + TTS audio).'
              },
              {
                lang: 'Gujarati',
                badge: 'Spoken Output (TTS)',
                desc: 'Also spoken/written, used only on the output side. Not a separate sign system.'
              },
              {
                lang: 'Gloss',
                badge: 'Internal Contract',
                desc: 'A written label for a sign (e.g. HELLO, WATER, THANK_YOU). Used as our internal “concept ID” — the shared contract every module keys off.'
              }
            ].map((item) => (
              <div
                key={item.lang}
                className="p-4 rounded-xl flex flex-col md-flex-row md-items-center justify-between gap-3"
                style={{
                  backgroundColor: 'rgba(16, 36, 31, 0.6)',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                <div className="flex items-center gap-3" style={{ minWidth: '160px' }}>
                  <span className="font-serif text-lg font-bold text-coral">{item.lang}</span>
                  <Badge variant="mint" style={{ fontSize: '0.68rem' }}>{item.badge}</Badge>
                </div>
                <p className="text-sm text-secondary flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Slide 6: System Architecture: One Live Pipeline */}
      <section className="mb-16">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="overline mb-2">PIPELINE DESIGN</div>
          <h2 className="font-serif text-3xl font-semibold text-primary">
            System Architecture — One Live Pipeline
          </h2>
          <p className="text-xs text-muted mt-2">
            Camera work stays client-side for low latency. The classifier and gloss lookup stay server-side for fast iteration.
          </p>
        </div>

        {/* 5 Architecture Node Blocks */}
        <div className="grid grid-cols-1 md-grid-cols-5 gap-3 mb-8">
          {[
            { icon: '📷', title: 'Signer Browser', subtitle: 'Webcam feed', role: 'Client (browser)' },
            { icon: '🪄', title: 'MediaPipe', subtitle: 'Client-side landmarks', role: 'Holistic Model' },
            { icon: '⚡', title: 'WebSocket Relay', subtitle: 'FastAPI backend', role: 'Server (FastAPI)' },
            { icon: '🧠', title: 'Sign Classifier', subtitle: 'Landmarks → gloss ID', role: 'Small GRU Model' },
            { icon: '🔊', title: 'Output Bridge', subtitle: 'Caption + TTS speech', role: 'Web Speech API' },
          ].map((node, i) => (
            <Card
              key={node.title}
              variant="dark"
              className="p-4 text-center flex flex-col items-center justify-between"
              style={{
                backgroundColor: 'var(--color-forest-850)',
                border: '1px solid var(--border-medium)'
              }}
            >
              <div className="text-3xl mb-2">{node.icon}</div>
              <h4 className="font-serif font-bold text-primary text-base">{node.title}</h4>
              <p className="text-xs text-coral font-medium mt-1">{node.subtitle}</p>
              <span className="text-xs text-muted font-mono mt-3 px-2 py-0.5 rounded bg-forest-900 border border-subtle">
                {node.role}
              </span>
            </Card>
          ))}
        </div>

        {/* Architectural Layer Responsibilities Table */}
        <Card variant="dark" className="p-6 overflow-x-auto" style={{ backgroundColor: 'var(--color-forest-850)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-medium)', color: 'var(--color-mint-300)' }}>
                <th style={{ padding: '12px 16px' }}>LAYER</th>
                <th style={{ padding: '12px 16px' }}>RUNS WHERE</th>
                <th style={{ padding: '12px 16px' }}>RESPONSIBILITY</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Landmark extraction</td>
                <td style={{ padding: '12px 16px' }}><Badge variant="mint">Client (browser)</Badge></td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary-on-dark)' }}>MediaPipe Holistic on the live webcam feed</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Session relay</td>
                <td style={{ padding: '12px 16px' }}><Badge variant="coral">Server (FastAPI)</Badge></td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary-on-dark)' }}>WebSocket connects Signer session to output display</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Sign classifier</td>
                <td style={{ padding: '12px 16px' }}><Badge variant="coral">Server (FastAPI)</Badge></td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary-on-dark)' }}>Landmark sequence → gloss ID + confidence rating</td>
              </tr>
              <tr>
                <td style={{ padding: '12px 16px', fontWeight: 600 }}>Gloss → caption/TTS</td>
                <td style={{ padding: '12px 16px' }}><Badge variant="gold">Client & Server</Badge></td>
                <td style={{ padding: '12px 16px', color: 'var(--text-secondary-on-dark)' }}>Static lookup: gloss ID → English + Gujarati text + TTS synthesis</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </section>

      {/* Tech Stack Breakdown (Slide 10) */}
      <section className="mb-12">
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="overline mb-2">SYSTEM COMPONENTS</div>
          <h2 className="font-serif text-3xl font-semibold text-primary">
            Frontend, Backend & AI/ML
          </h2>
        </div>

        <div className="grid grid-cols-1 md-grid-cols-3 gap-6">
          <Card variant="dark" className="p-6" style={{ backgroundColor: 'var(--color-forest-850)', border: '1px solid var(--border-coral)' }}>
            <div className="flex items-center gap-2 mb-4 text-coral font-serif text-xl font-bold">
              <span>💻 FRONTEND</span>
            </div>
            <ul className="flex flex-col gap-2 text-xs text-secondary">
              <li>✦ Plain HTML / CSS / React JS Architecture</li>
              <li>✦ getUserMedia live camera access</li>
              <li>✦ MediaPipe Tasks JS (client-side)</li>
              <li>✦ Web Speech API — SpeechSynthesis</li>
              <li>✦ Native WebSocket client</li>
            </ul>
          </Card>

          <Card variant="dark" className="p-6" style={{ backgroundColor: 'var(--color-forest-850)', border: '1px solid var(--border-mint)' }}>
            <div className="flex items-center gap-2 mb-4 text-mint font-serif text-xl font-bold">
              <span>⚙️ BACKEND</span>
            </div>
            <ul className="flex flex-col gap-2 text-xs text-secondary">
              <li>✦ Python, FastAPI async service</li>
              <li>✦ Built-in WebSocket real-time support</li>
              <li>✦ Inference endpoint (trained classifier)</li>
              <li>✦ Static JSON: gloss ID → EN/GU text</li>
              <li>✦ Run locally or via ngrok tunnel</li>
            </ul>
          </Card>

          <Card variant="dark" className="p-6" style={{ backgroundColor: 'var(--color-forest-850)', border: '1px solid var(--border-gold)' }}>
            <div className="flex items-center gap-2 mb-4 text-gold font-serif text-xl font-bold">
              <span>🧠 AI / ML</span>
            </div>
            <ul className="flex flex-col gap-2 text-xs text-secondary">
              <li>✦ MediaPipe Holistic — pretrained mesh</li>
              <li>✦ Small GRU (fallback: feedforward NN)</li>
              <li>✦ Self-trained on 20-30 samples per sign</li>
              <li>✦ Web Speech API TTS — pretrained</li>
              <li>✦ Zero live cloud translation API reliance</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
