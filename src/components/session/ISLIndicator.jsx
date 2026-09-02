import React from 'react';
import { Sparkles, Activity, Check, AlertTriangle } from 'lucide-react';
import { BotanicalFlower } from '../common/BotanicalDecor';

export function ISLIndicator({
  state = 'recognized', // 'idle' | 'detecting' | 'recognized' | 'low-confidence'
  currentGloss = 'HELLO',
  confidence = 94,
  fps = 30,
  className = ''
}) {
  const getStatusColor = () => {
    switch (state) {
      case 'recognized':
        return { border: 'var(--border-coral)', bg: 'rgba(240, 139, 118, 0.12)', text: 'var(--color-coral-400)' };
      case 'detecting':
        return { border: 'var(--border-mint)', bg: 'rgba(72, 201, 176, 0.12)', text: 'var(--color-mint-300)' };
      case 'low-confidence':
        return { border: 'rgba(246, 195, 88, 0.4)', bg: 'rgba(246, 195, 88, 0.12)', text: 'var(--color-gold-400)' };
      default:
        return { border: 'var(--border-subtle)', bg: 'rgba(32, 67, 58, 0.4)', text: 'var(--text-muted-on-dark)' };
    }
  };

  const statusMeta = getStatusColor();

  return (
    <div
      className={`card-dark flex flex-col gap-3 ${className}`}
      style={{
        border: `1px solid ${statusMeta.border}`,
        backgroundColor: 'var(--color-forest-850)',
        padding: '16px 20px',
        borderRadius: 'var(--radius-lg)'
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {state === 'recognized' ? (
            <div className="pulse-bloom rounded-full p-1 bg-coral-subtle text-coral">
              <BotanicalFlower size={18} />
            </div>
          ) : (
            <Activity size={18} className="text-mint animate-pulse" />
          )}
          <span className="text-sm font-semibold text-primary">
            {state === 'recognized' && 'ISL Gesture Recognized'}
            {state === 'detecting' && 'Tracking Hand Landmarks...'}
            {state === 'low-confidence' && 'Uncertain Gesture (Under Threshold)'}
            {state === 'idle' && 'Waiting for Sign Input'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted font-mono">{fps} FPS</span>
          <span
            className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: statusMeta.bg, color: statusMeta.text, border: `1px solid ${statusMeta.border}` }}
          >
            {confidence}% Match
          </span>
        </div>
      </div>

      {/* Main Gloss Highlight Banner */}
      <div
        className="flex items-center justify-between p-3 rounded-xl"
        style={{
          background: 'rgba(16, 36, 31, 0.8)',
          border: '1px solid var(--border-subtle)'
        }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted uppercase tracking-wider font-bold">Gloss ID:</span>
          <span
            className="font-mono text-lg font-bold text-coral"
            style={{ letterSpacing: '0.08em' }}
          >
            [{currentGloss}]
          </span>
        </div>

        {/* Dynamic Confidence Meter Bar */}
        <div className="flex items-center gap-3" style={{ minWidth: '160px' }}>
          <div
            style={{
              flex: 1,
              height: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '999px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${confidence}%`,
                height: '100%',
                background:
                  confidence > 85
                    ? 'linear-gradient(90deg, var(--color-mint-400), var(--color-coral-400))'
                    : 'var(--color-gold-400)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
          <span className="text-xs font-mono text-muted">{confidence}%</span>
        </div>
      </div>
    </div>
  );
}
