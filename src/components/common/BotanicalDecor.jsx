import React from 'react';

/**
 * Botanical Flower Graphic (Single Motif)
 */
export function BotanicalFlower({ size = 32, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer Petals */}
      <circle cx="24" cy="24" r="12" fill="#f08b76" opacity="0.35" />
      <ellipse cx="24" cy="14" rx="4.5" ry="7.5" fill="#f08b76" />
      <ellipse cx="24" cy="34" rx="4.5" ry="7.5" fill="#f08b76" />
      <ellipse cx="14" cy="24" rx="7.5" ry="4.5" fill="#f08b76" />
      <ellipse cx="34" cy="24" rx="7.5" ry="4.5" fill="#f08b76" />
      <ellipse cx="17" cy="17" rx="4.5" ry="6.5" transform="rotate(-45 17 17)" fill="#fa9f8e" />
      <ellipse cx="31" cy="17" rx="4.5" ry="6.5" transform="rotate(45 31 17)" fill="#fa9f8e" />
      <ellipse cx="17" cy="31" rx="4.5" ry="6.5" transform="rotate(45 17 31)" fill="#fa9f8e" />
      <ellipse cx="31" cy="31" rx="4.5" ry="6.5" transform="rotate(-45 31 31)" fill="#fa9f8e" />
      {/* Flower Center Core */}
      <circle cx="24" cy="24" r="4.5" fill="#f6c358" />
      <circle cx="24" cy="24" r="2" fill="#ffffff" opacity="0.8" />
    </svg>
  );
}

/**
 * Full Botanical Corner Flourish
 * Matches the reference slide corner botanical art (blooms, leaves, vines)
 */
export function BotanicalCornerGraphic({ width = 280, height = 280, opacity = 0.95, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Organic Vine Stems */}
      <path
        d="M12 228 C16 160 50 80 180 16"
        stroke="#48c9b0"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <path
        d="M20 220 C24 175 65 115 155 45"
        stroke="#386b5e"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="4 3"
        opacity="0.6"
      />
      <path
        d="M8 170 C45 150 90 120 120 70"
        stroke="#48c9b0"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* Curling Tendrils */}
      <path
        d="M95 115 C115 125 125 145 115 155 C105 165 90 155 95 140"
        stroke="#7be495"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
      <path
        d="M140 65 C160 70 175 85 170 100 C165 110 150 105 150 92"
        stroke="#7be495"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Mint Foliage Leaves */}
      <path d="M45 140 C35 120 50 105 68 112 C58 126 55 132 45 140 Z" fill="#48c9b0" opacity="0.9" />
      <path d="M78 105 C70 85 88 72 102 82 C92 95 88 100 78 105 Z" fill="#7be495" opacity="0.92" />
      <path d="M125 55 C120 35 140 25 152 38 C140 48 135 52 125 55 Z" fill="#48c9b0" opacity="0.9" />
      <path d="M165 25 C162 8 180 2 190 14 C180 22 175 25 165 25 Z" fill="#7be495" opacity="0.85" />
      <path d="M25 190 C12 175 26 158 40 168 C32 180 28 185 25 190 Z" fill="#32936f" opacity="0.8" />
      <path d="M100 75 C108 58 126 62 122 78 C112 80 106 78 100 75 Z" fill="#7be495" opacity="0.85" />
      <path d="M60 165 C48 152 62 138 74 148 C66 158 64 162 60 165 Z" fill="#48c9b0" opacity="0.85" />

      {/* Small White / Mint Buds */}
      <circle cx="180" cy="18" r="3" fill="#ffffff" opacity="0.85" />
      <circle cx="198" cy="12" r="2" fill="#fde68a" />
      <circle cx="16" cy="195" r="3" fill="#ffffff" opacity="0.85" />
      <circle cx="10" cy="215" r="2.5" fill="#fde68a" />
      <circle cx="110" cy="160" r="2.5" fill="#ffffff" opacity="0.8" />

      {/* Main Corner Floral Blossom (Top-Left Accent) */}
      <g transform="translate(52, 52)">
        <circle cx="0" cy="0" r="16" fill="#f08b76" opacity="0.25" />
        {/* Petals */}
        <ellipse cx="0" cy="-14" rx="5.5" ry="9" fill="#f08b76" />
        <ellipse cx="0" cy="14" rx="5.5" ry="9" fill="#f08b76" />
        <ellipse cx="-14" cy="0" rx="9" ry="5.5" fill="#f08b76" />
        <ellipse cx="14" cy="0" rx="9" ry="5.5" fill="#f08b76" />
        <ellipse cx="-10" cy="-10" rx="5.5" ry="8" transform="rotate(-45 -10 -10)" fill="#fa9f8e" />
        <ellipse cx="10" cy="-10" rx="5.5" ry="8" transform="rotate(45 10 -10)" fill="#fa9f8e" />
        <ellipse cx="-10" cy="10" rx="5.5" ry="8" transform="rotate(45 -10 10)" fill="#fa9f8e" />
        <ellipse cx="10" cy="10" rx="5.5" ry="8" transform="rotate(-45 10 10)" fill="#fa9f8e" />
        {/* Pistil Core */}
        <circle cx="0" cy="0" r="6" fill="#f6c358" />
        <circle cx="0" cy="0" r="2.5" fill="#ffffff" opacity="0.9" />
      </g>

      {/* Secondary Medium Blossom */}
      <g transform="translate(145, 36) scale(0.65)">
        <ellipse cx="0" cy="-12" rx="4.5" ry="7" fill="#f08b76" />
        <ellipse cx="0" cy="12" rx="4.5" ry="7" fill="#f08b76" />
        <ellipse cx="-12" cy="0" rx="7" ry="4.5" fill="#f08b76" />
        <ellipse cx="12" cy="0" rx="7" ry="4.5" fill="#f08b76" />
        <circle cx="0" cy="0" r="4" fill="#f6c358" />
      </g>

      {/* Tertiary Medium Blossom */}
      <g transform="translate(34, 142) scale(0.65)">
        <ellipse cx="0" cy="-12" rx="4.5" ry="7" fill="#f08b76" />
        <ellipse cx="0" cy="12" rx="4.5" ry="7" fill="#f08b76" />
        <ellipse cx="-12" cy="0" rx="7" ry="4.5" fill="#f08b76" />
        <ellipse cx="12" cy="0" rx="7" ry="4.5" fill="#f08b76" />
        <circle cx="0" cy="0" r="4" fill="#f6c358" />
      </g>
    </svg>
  );
}

/**
 * Symmetrical 4-Corner Framing Container
 */
export function BotanicalCornerFrame({ children, className = '', cornerSize = 220, opacity = 0.9 }) {
  return (
    <div className={`botanical-canvas-frame ${className}`}>
      {/* Top Left */}
      <div className="botanical-corner botanical-corner-tl botanical-breathe">
        <BotanicalCornerGraphic width={cornerSize} height={cornerSize} opacity={opacity} />
      </div>
      {/* Top Right */}
      <div className="botanical-corner botanical-corner-tr botanical-breathe" style={{ animationDelay: '1.5s' }}>
        <BotanicalCornerGraphic width={cornerSize} height={cornerSize} opacity={opacity} />
      </div>
      {/* Bottom Left */}
      <div className="botanical-corner botanical-corner-bl botanical-breathe" style={{ animationDelay: '3s' }}>
        <BotanicalCornerGraphic width={cornerSize} height={cornerSize} opacity={opacity} />
      </div>
      {/* Bottom Right */}
      <div className="botanical-corner botanical-corner-br botanical-breathe" style={{ animationDelay: '4.5s' }}>
        <BotanicalCornerGraphic width={cornerSize} height={cornerSize} opacity={opacity} />
      </div>

      {children}
    </div>
  );
}

/**
 * Botanical Symmetrical Garland (Top/Bottom Center Banner from Reference Deck)
 */
export function BotanicalGarland({ width = 460, height = 50, className = '' }) {
  return (
    <div className={`botanical-garland-wrap ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 520 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="botanical-garland"
      >
        {/* Left Vine Arch */}
        <path
          d="M30 30 C120 10 180 50 250 30"
          stroke="#48c9b0"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.8"
        />
        {/* Right Vine Arch */}
        <path
          d="M490 30 C400 10 340 50 270 30"
          stroke="#48c9b0"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Left Leaf Sprigs */}
        <path d="M100 24 C85 15 95 6 108 12 C102 20 101 22 100 24 Z" fill="#7be495" opacity="0.85" />
        <path d="M150 34 C138 45 148 55 158 46 C154 38 152 36 150 34 Z" fill="#48c9b0" opacity="0.85" />
        <path d="M190 26 C178 18 188 8 198 16 C194 22 192 24 190 26 Z" fill="#7be495" opacity="0.9" />

        {/* Right Leaf Sprigs */}
        <path d="M420 24 C435 15 425 6 412 12 C418 20 419 22 420 24 Z" fill="#7be495" opacity="0.85" />
        <path d="M370 34 C382 45 372 55 362 46 C366 38 368 36 370 34 Z" fill="#48c9b0" opacity="0.85" />
        <path d="M330 26 C342 18 332 8 322 16 C326 22 328 24 330 26 Z" fill="#7be495" opacity="0.9" />

        {/* Left Side Flower */}
        <g transform="translate(140, 22) scale(0.6)">
          <ellipse cx="0" cy="-10" rx="4" ry="6.5" fill="#f08b76" />
          <ellipse cx="0" cy="10" rx="4" ry="6.5" fill="#f08b76" />
          <ellipse cx="-10" cy="0" rx="6.5" ry="4" fill="#f08b76" />
          <ellipse cx="10" cy="0" rx="6.5" ry="4" fill="#f08b76" />
          <circle cx="0" cy="0" r="3.5" fill="#f6c358" />
        </g>

        {/* Right Side Flower */}
        <g transform="translate(380, 22) scale(0.6)">
          <ellipse cx="0" cy="-10" rx="4" ry="6.5" fill="#f08b76" />
          <ellipse cx="0" cy="10" rx="4" ry="6.5" fill="#f08b76" />
          <ellipse cx="-10" cy="0" rx="6.5" ry="4" fill="#f08b76" />
          <ellipse cx="10" cy="0" rx="6.5" ry="4" fill="#f08b76" />
          <circle cx="0" cy="0" r="3.5" fill="#f6c358" />
        </g>

        {/* Central Prominent Blossom */}
        <g transform="translate(260, 30)">
          <circle cx="0" cy="0" r="14" fill="#f08b76" opacity="0.25" />
          <ellipse cx="0" cy="-12" rx="4.5" ry="7.5" fill="#f08b76" />
          <ellipse cx="0" cy="12" rx="4.5" ry="7.5" fill="#f08b76" />
          <ellipse cx="-12" cy="0" rx="7.5" ry="4.5" fill="#f08b76" />
          <ellipse cx="12" cy="0" rx="7.5" ry="4.5" fill="#f08b76" />
          <ellipse cx="-8" cy="-8" rx="4" ry="6.5" transform="rotate(-45 -8 -8)" fill="#fa9f8e" />
          <ellipse cx="8" cy="-8" rx="4" ry="6.5" transform="rotate(45 8 -8)" fill="#fa9f8e" />
          <ellipse cx="-8" cy="8" rx="4" ry="6.5" transform="rotate(45 -8 8)" fill="#fa9f8e" />
          <ellipse cx="8" cy="8" rx="4" ry="6.5" transform="rotate(-45 8 8)" fill="#fa9f8e" />
          <circle cx="0" cy="0" r="4.5" fill="#f6c358" />
          <circle cx="0" cy="0" r="1.8" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Floral Section Divider
 */
export function BotanicalDivider({ isLight = false, className = '' }) {
  return (
    <div className={`botanical-divider ${className}`}>
      <div className={`botanical-divider-line ${isLight ? 'line-cream' : ''}`} />
      <div className="botanical-divider-emblem">
        <BotanicalFlower size={24} />
      </div>
      <div className={`botanical-divider-line ${isLight ? 'line-cream' : ''}`} />
    </div>
  );
}
