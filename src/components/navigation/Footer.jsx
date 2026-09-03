import React from 'react';
import { BotanicalFlower } from '../common/BotanicalDecor';

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-forest-950)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '48px 0 32px',
        marginTop: 'auto'
      }}
    >
      <div className="container flex flex-col items-center text-center gap-6">
        <div className="flex items-center gap-2">
          <BotanicalFlower size={24} />
          <span className="font-serif text-xl font-bold">Saytu</span>
        </div>

        <p className="text-sm text-muted max-w-xl">
          An Indian Sign Language (ISL) live webcam-to-caption-and-speech bridge built to empower Deaf/Mute students in classroom and peer environments with English and Gujarati speech output.
        </p>

        <div className="flex items-center gap-6 text-xs text-muted flex-wrap justify-center">
          <span>Women's Hackathon · Innovator Track · Problem 10</span>
          <span>•</span>
          <span>Closed Vocabulary (~20 Signs)</span>
          <span>•</span>
          <span>MediaPipe Holistic + GRU Classifier</span>
          <span>•</span>
          <span>Gujarati & English TTS</span>
        </div>

        <div className="text-xs text-dim mt-2">
          Saytu ISL System & Design Architecture. Respecting ISL as a distinct, natural language.
        </div>
      </div>
    </footer>
  );
}
export default Footer;
