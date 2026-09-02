import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, Sparkles, Globe } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export function AITranslationCard({
  gloss = 'HELLO',
  englishText = 'Hello! Welcome to our classroom session.',
  gujaratiText = 'નમસ્તે! અમારા વર્ગખંડ સત્રમાં તમારું સ્વાગત છે.',
  confidence = 94,
  autoTTS = false,
  className = ''
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedLang, setCopiedLang] = useState(null);

  const speakText = (text, lang = 'en-US') => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const copyToClipboard = (text, lang) => {
    navigator.clipboard.writeText(text);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  return (
    <div
      className={`card-dark flex flex-col gap-4 ${className}`}
      style={{
        backgroundColor: 'var(--color-forest-850)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '24px'
      }}
    >
      <div className="flex items-center justify-between border-b border-subtle pb-3">
        <div className="flex items-center gap-2">
          <Globe size={18} className="text-mint" />
          <h3 className="font-serif text-lg font-semibold text-primary">Spoken Caption & TTS Bridge</h3>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="coral">Gloss: [{gloss}]</Badge>
          <Badge variant="mint">FastAPI Relay</Badge>
        </div>
      </div>

      {/* English Caption Block */}
      <div
        className="p-4 rounded-xl flex flex-col gap-2"
        style={{
          backgroundColor: 'rgba(16, 36, 31, 0.7)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div className="flex items-center justify-between">
          <span className="overline text-xs text-mint">English Caption</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(englishText, 'en')}
              className="text-xs text-muted hover:text-primary flex items-center gap-1 bg-transparent border-none cursor-pointer"
              title="Copy English text"
            >
              {copiedLang === 'en' ? <Check size={13} className="text-mint" /> : <Copy size={13} />}
              <span>{copiedLang === 'en' ? 'Copied' : 'Copy'}</span>
            </button>
            <Button
              variant="mint"
              size="sm"
              icon={<Volume2 size={14} />}
              onClick={() => speakText(englishText, 'en-US')}
              disabled={isPlaying}
            >
              Speak (EN)
            </Button>
          </div>
        </div>
        <p className="text-base font-medium text-primary leading-relaxed">{englishText}</p>
      </div>

      {/* Gujarati Caption Block */}
      <div
        className="p-4 rounded-xl flex flex-col gap-2"
        style={{
          backgroundColor: 'rgba(240, 139, 118, 0.08)',
          border: '1px solid var(--border-coral)'
        }}
      >
        <div className="flex items-center justify-between">
          <span className="overline text-xs text-coral">Gujarati Output (ગુજરાતી અનુવાદ)</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => copyToClipboard(gujaratiText, 'gu')}
              className="text-xs text-muted hover:text-primary flex items-center gap-1 bg-transparent border-none cursor-pointer"
              title="Copy Gujarati text"
            >
              {copiedLang === 'gu' ? <Check size={13} className="text-mint" /> : <Copy size={13} />}
              <span>{copiedLang === 'gu' ? 'Copied' : 'Copy'}</span>
            </button>
            <Button
              variant="coral"
              size="sm"
              icon={<Volume2 size={14} />}
              onClick={() => speakText(gujaratiText, 'gu-IN')}
              disabled={isPlaying}
            >
              વાંચો (GU)
            </Button>
          </div>
        </div>
        <p className="text-lg font-medium text-primary gujarati-text leading-relaxed">
          {gujaratiText}
        </p>
      </div>

      {/* Audio Waveform Status */}
      <div className="flex items-center justify-between text-xs text-muted pt-1">
        <span className="flex items-center gap-1">
          <Sparkles size={13} className="text-gold" />
          <span>Web Speech API SpeechSynthesis Pipeline</span>
        </span>
        <span className="font-mono">Output Latency: ~140ms</span>
      </div>
    </div>
  );
}
