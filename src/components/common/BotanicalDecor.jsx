import React from 'react';

/**
 * Botanical Flower Graphic (Single Multi-layer Motif)
 */
export function BotanicalFlower({ size = 32, className = '', color = '#f08b76' }) {
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
      {/* Outer Glow Halo */}
      <circle cx="24" cy="24" r="14" fill={color} opacity="0.25" />
      {/* 8 Blooming Petals */}
      <ellipse cx="24" cy="13" rx="4.5" ry="8" fill={color} />
      <ellipse cx="24" cy="35" rx="4.5" ry="8" fill={color} />
      <ellipse cx="13" cy="24" rx="8" ry="4.5" fill={color} />
      <ellipse cx="35" cy="24" rx="8" ry="4.5" fill={color} />
      <ellipse cx="16" cy="16" rx="4.5" ry="7" transform="rotate(-45 16 16)" fill="#fa9f8e" />
      <ellipse cx="32" cy="16" rx="4.5" ry="7" transform="rotate(45 32 16)" fill="#fa9f8e" />
      <ellipse cx="16" cy="32" rx="4.5" ry="7" transform="rotate(45 16 32)" fill="#fa9f8e" />
      <ellipse cx="32" cy="32" rx="4.5" ry="7" transform="rotate(-45 32 32)" fill="#fa9f8e" />
      {/* Pistil Stamen Center */}
      <circle cx="24" cy="24" r="5" fill="#f6c358" />
      <circle cx="24" cy="24" r="2.2" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}

/**
 * Full Botanical Corner Flourish
 * Matches the reference slide corner botanical art (blooms, mint leaves, curling vines)
 */
export function BotanicalCornerGraphic({ width = 280, height = 280, opacity = 0.95, className = '' }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Deep Background Ghost Foliage */}
      <path
        d="M20 250 C25 150 70 60 240 10"
        stroke="#2d564b"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M40 240 C50 170 100 80 230 40"
        stroke="#386b5e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="5 4"
        opacity="0.5"
      />

      {/* Main Crisp Mint Vine Branches */}
      <path
        d="M10 245 C15 165 55 75 210 18"
        stroke="#48c9b0"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M10 180 C50 155 105 125 140 65"
        stroke="#48c9b0"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* Organic Tendril Spirals */}
      <path
        d="M105 120 C128 132 140 156 128 168 C116 180 98 168 104 150"
        stroke="#7be495"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <path
        d="M160 65 C184 72 202 90 196 108 C190 120 172 114 172 100"
        stroke="#7be495"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Mint & Seafoam Foliage Leaf Sprigs */}
      <path d="M48 148 C36 125 54 108 74 116 C63 132 60 139 48 148 Z" fill="#48c9b0" opacity="0.95" />
      <path d="M85 110 C76 88 96 74 112 85 C101 100 96 105 85 110 Z" fill="#7be495" opacity="0.95" />
      <path d="M138 58 C132 36 154 24 168 39 C154 50 149 54 138 58 Z" fill="#48c9b0" opacity="0.92" />
      <path d="M185 24 C181 5 202 -1 213 13 C201 22 196 25 185 24 Z" fill="#7be495" opacity="0.9" />
      <path d="M26 205 C12 188 28 168 44 180 C35 194 30 200 26 205 Z" fill="#32936f" opacity="0.85" />
      <path d="M110 78 C120 58 140 63 135 81 C124 83 117 81 110 78 Z" fill="#7be495" opacity="0.9" />
      <path d="M68 178 C54 163 70 148 84 159 C75 170 73 175 68 178 Z" fill="#48c9b0" opacity="0.9" />

      {/* Delicate Buds & White Flower Accents */}
      <circle cx="205" cy="18" r="3.5" fill="#ffffff" opacity="0.9" />
      <circle cx="225" cy="12" r="2.5" fill="#fde68a" />
      <circle cx="18" cy="210" r="3.5" fill="#ffffff" opacity="0.9" />
      <circle cx="10" cy="235" r="2.5" fill="#fde68a" />
      <circle cx="120" cy="175" r="3" fill="#ffffff" opacity="0.85" />
      <circle cx="178" cy="115" r="2.5" fill="#fde68a" />

      {/* Main Corner Floral Blossom (Dominant Peach Bloom) */}
      <g transform="translate(60, 60)">
        <circle cx="0" cy="0" r="18" fill="#f08b76" opacity="0.3" />
        <ellipse cx="0" cy="-16" rx="6" ry="10" fill="#f08b76" />
        <ellipse cx="0" cy="16" rx="6" ry="10" fill="#f08b76" />
        <ellipse cx="-16" cy="0" rx="10" ry="6" fill="#f08b76" />
        <ellipse cx="16" cy="0" rx="10" ry="6" fill="#f08b76" />
        <ellipse cx="-12" cy="-12" rx="6" ry="9" transform="rotate(-45 -12 -12)" fill="#fa9f8e" />
        <ellipse cx="12" cy="-12" rx="6" ry="9" transform="rotate(45 12 -12)" fill="#fa9f8e" />
        <ellipse cx="-12" cy="12" rx="6" ry="9" transform="rotate(45 -12 12)" fill="#fa9f8e" />
        <ellipse cx="12" cy="12" rx="6" ry="9" transform="rotate(-45 12 12)" fill="#fa9f8e" />
        <circle cx="0" cy="0" r="7" fill="#f6c358" />
        <circle cx="0" cy="0" r="3" fill="#ffffff" opacity="0.95" />
      </g>

      {/* Secondary Peach Blossom */}
      <g transform="translate(162, 40) scale(0.72)">
        <circle cx="0" cy="0" r="12" fill="#f08b76" opacity="0.25" />
        <ellipse cx="0" cy="-13" rx="5" ry="8" fill="#f08b76" />
        <ellipse cx="0" cy="13" rx="5" ry="8" fill="#f08b76" />
        <ellipse cx="-13" cy="0" rx="8" ry="5" fill="#f08b76" />
        <ellipse cx="13" cy="0" rx="8" ry="5" fill="#f08b76" />
        <ellipse cx="-9" cy="-9" rx="5" ry="7" transform="rotate(-45 -9 -9)" fill="#fa9f8e" />
        <ellipse cx="9" cy="-9" rx="5" ry="7" transform="rotate(45 9 -9)" fill="#fa9f8e" />
        <ellipse cx="-9" cy="9" rx="5" ry="7" transform="rotate(45 -9 9)" fill="#fa9f8e" />
        <ellipse cx="9" cy="9" rx="5" ry="7" transform="rotate(-45 9 9)" fill="#fa9f8e" />
        <circle cx="0" cy="0" r="5" fill="#f6c358" />
      </g>

      {/* Tertiary Peach Blossom */}
      <g transform="translate(38, 155) scale(0.72)">
        <circle cx="0" cy="0" r="12" fill="#f08b76" opacity="0.25" />
        <ellipse cx="0" cy="-13" rx="5" ry="8" fill="#f08b76" />
        <ellipse cx="0" cy="13" rx="5" ry="8" fill="#f08b76" />
        <ellipse cx="-13" cy="0" rx="8" ry="5" fill="#f08b76" />
        <ellipse cx="13" cy="0" rx="8" ry="5" fill="#f08b76" />
        <circle cx="0" cy="0" r="5" fill="#f6c358" />
      </g>
    </svg>
  );
}

/**
 * Full Botanical Side Flourish (Framing Left and Right Viewport Margins)
 * Directly inspired by Image 11 of the reference presentation!
 */
export function BotanicalSideBorder({ side = 'left', className = '' }) {
  const isRight = side === 'right';

  return (
    <div
      className={`botanical-side-border ${isRight ? 'botanical-side-right' : 'botanical-side-left'} ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        [isRight ? 'right' : 'left']: 0,
        width: '180px',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        userSelect: 'none',
        opacity: 0.88,
        transform: isRight ? 'scaleX(-1)' : 'none'
      }}
      aria-hidden="true"
    >
      <svg
        width="180"
        height="100%"
        viewBox="0 0 180 900"
        preserveAspectRatio="xMinYMin slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Continuous Curving Vine Stem */}
        <path
          d="M10 0 C30 180 -10 320 35 480 C70 620 15 780 40 900"
          stroke="#48c9b0"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M0 80 C40 220 10 380 50 560 C80 700 30 820 10 900"
          stroke="#386b5e"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="4 3"
          opacity="0.5"
        />

        {/* Dense Foliage Leaves cascading down */}
        <path d="M25 60 C48 45 60 70 42 85 C32 75 28 68 25 60 Z" fill="#7be495" opacity="0.9" />
        <path d="M12 140 C-8 120 10 100 30 115 C22 130 18 135 12 140 Z" fill="#48c9b0" opacity="0.9" />
        <path d="M38 210 C62 195 72 225 50 238 C42 228 40 220 38 210 Z" fill="#7be495" opacity="0.85" />
        <path d="M20 290 C-2 270 15 250 35 268 C28 280 24 285 20 290 Z" fill="#48c9b0" opacity="0.9" />
        <path d="M45 370 C70 350 82 385 58 398 C48 388 46 380 45 370 Z" fill="#7be495" opacity="0.9" />
        <path d="M22 450 C0 430 18 410 40 428 C30 440 26 445 22 450 Z" fill="#32936f" opacity="0.85" />
        <path d="M52 530 C78 510 90 545 66 558 C56 548 54 540 52 530 Z" fill="#7be495" opacity="0.9" />
        <path d="M28 620 C6 600 24 580 45 598 C36 610 32 615 28 620 Z" fill="#48c9b0" opacity="0.9" />
        <path d="M58 710 C85 690 95 725 72 738 C62 728 60 720 58 710 Z" fill="#7be495" opacity="0.9" />
        <path d="M30 800 C8 780 26 760 48 778 C38 790 34 795 30 800 Z" fill="#48c9b0" opacity="0.85" />

        {/* Blooming Peach Flowers along the vine */}
        <g transform="translate(48, 120) scale(0.65)">
          <circle cx="0" cy="0" r="14" fill="#f08b76" opacity="0.3" />
          <ellipse cx="0" cy="-12" rx="4.5" ry="7.5" fill="#f08b76" />
          <ellipse cx="0" cy="12" rx="4.5" ry="7.5" fill="#f08b76" />
          <ellipse cx="-12" cy="0" rx="7.5" ry="4.5" fill="#f08b76" />
          <ellipse cx="12" cy="0" rx="7.5" ry="4.5" fill="#f08b76" />
          <ellipse cx="-8" cy="-8" rx="4" ry="6.5" transform="rotate(-45 -8 -8)" fill="#fa9f8e" />
          <ellipse cx="8" cy="-8" rx="4" ry="6.5" transform="rotate(45 8 -8)" fill="#fa9f8e" />
          <ellipse cx="-8" cy="8" rx="4" ry="6.5" transform="rotate(45 -8 8)" fill="#fa9f8e" />
          <ellipse cx="8" cy="8" rx="4" ry="6.5" transform="rotate(-45 8 8)" fill="#fa9f8e" />
          <circle cx="0" cy="0" r="4.5" fill="#f6c358" />
        </g>

        <g transform="translate(56, 320) scale(0.7)">
          <circle cx="0" cy="0" r="14" fill="#f08b76" opacity="0.3" />
          <ellipse cx="0" cy="-12" rx="4.5" ry="7.5" fill="#f08b76" />
          <ellipse cx="0" cy="12" rx="4.5" ry="7.5" fill="#f08b76" />
          <ellipse cx="-12" cy="0" rx="7.5" ry="4.5" fill="#f08b76" />
          <ellipse cx="12" cy="0" rx="7.5" ry="4.5" fill="#f08b76" />
          <circle cx="0" cy="0" r="4.5" fill="#f6c358" />
        </g>

        <g transform="translate(68, 500) scale(0.65)">
          <circle cx="0" cy="0" r="14" fill="#f08b76" opacity="0.3" />
          <ellipse cx="0" cy="-12" rx="4.5" ry="7.5" fill="#f08b76" />
          <ellipse cx="0" cy="12" rx="4.5" ry="7.5" fill="#f08b76" />
          <ellipse cx="-12" cy="0" rx="7.5" ry="4.5" fill="#f08b76" />
          <ellipse cx="12" cy="0" rx="7.5" ry="4.5" fill="#f08b76" />
          <circle cx="0" cy="0" r="4.5" fill="#f6c358" />
        </g>

        <g transform="translate(58, 680) scale(0.68)">
          <circle cx="0" cy="0" r="14" fill="#f08b76" opacity="0.3" />
          <ellipse cx="0" cy="-12" rx="4.5" ry="7.5" fill="#f08b76" />
          <ellipse cx="0" cy="12" rx="4.5" ry="7.5" fill="#f08b76" />
          <ellipse cx="-12" cy="0" rx="7.5" ry="4.5" fill="#f08b76" />
          <ellipse cx="12" cy="0" rx="7.5" ry="4.5" fill="#f08b76" />
          <circle cx="0" cy="0" r="4.5" fill="#f6c358" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Symmetrical 4-Corner Framing Container + Side Margins
 */
export function BotanicalCornerFrame({ children, className = '', cornerSize = 240, opacity = 0.95, withSides = true }) {
  return (
    <div className={`botanical-canvas-frame ${className}`}>
      {/* 4 Corner Flourishes */}
      <div className="botanical-corner botanical-corner-tl botanical-breathe">
        <BotanicalCornerGraphic width={cornerSize} height={cornerSize} opacity={opacity} />
      </div>
      <div className="botanical-corner botanical-corner-tr botanical-breathe" style={{ animationDelay: '1.5s' }}>
        <BotanicalCornerGraphic width={cornerSize} height={cornerSize} opacity={opacity} />
      </div>
      <div className="botanical-corner botanical-corner-bl botanical-breathe" style={{ animationDelay: '3s' }}>
        <BotanicalCornerGraphic width={cornerSize} height={cornerSize} opacity={opacity} />
      </div>
      <div className="botanical-corner botanical-corner-br botanical-breathe" style={{ animationDelay: '4.5s' }}>
        <BotanicalCornerGraphic width={cornerSize} height={cornerSize} opacity={opacity} />
      </div>

      {/* Side Foliage Cascades (Hidden on small mobile screens to preserve reading width) */}
      {withSides && (
        <>
          <div className="hidden lg-block">
            <BotanicalSideBorder side="left" />
            <BotanicalSideBorder side="right" />
          </div>
        </>
      )}

      {children}
    </div>
  );
}

/**
 * Symmetrical Botanical Garland Banner (Top/Bottom Center Banner from Reference Deck)
 */
export function BotanicalGarland({ width = 500, height = 55, className = '' }) {
  return (
    <div className={`botanical-garland-wrap ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 540 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="botanical-garland"
      >
        {/* Left Vine Arch */}
        <path
          d="M25 32 C120 12 185 52 260 32"
          stroke="#48c9b0"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
        {/* Right Vine Arch */}
        <path
          d="M515 32 C420 12 355 52 280 32"
          stroke="#48c9b0"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Left Foliage Sprigs */}
        <path d="M100 24 C84 14 96 4 110 11 C104 20 102 22 100 24 Z" fill="#7be495" opacity="0.9" />
        <path d="M152 36 C138 48 149 59 160 49 C156 40 154 38 152 36 Z" fill="#48c9b0" opacity="0.9" />
        <path d="M195 26 C182 17 193 6 204 15 C200 22 198 24 195 26 Z" fill="#7be495" opacity="0.95" />

        {/* Right Foliage Sprigs */}
        <path d="M440 24 C456 14 444 4 430 11 C436 20 438 22 440 24 Z" fill="#7be495" opacity="0.9" />
        <path d="M388 36 C402 48 391 59 380 49 C384 40 386 38 388 36 Z" fill="#48c9b0" opacity="0.9" />
        <path d="M345 26 C358 17 347 6 336 15 C340 22 342 24 345 26 Z" fill="#7be495" opacity="0.95" />

        {/* Left Accent Flower */}
        <g transform="translate(145, 24) scale(0.65)">
          <circle cx="0" cy="0" r="10" fill="#f08b76" opacity="0.25" />
          <ellipse cx="0" cy="-11" rx="4.5" ry="7" fill="#f08b76" />
          <ellipse cx="0" cy="11" rx="4.5" ry="7" fill="#f08b76" />
          <ellipse cx="-11" cy="0" rx="7" ry="4.5" fill="#f08b76" />
          <ellipse cx="11" cy="0" rx="7" ry="4.5" fill="#f08b76" />
          <circle cx="0" cy="0" r="4" fill="#f6c358" />
        </g>

        {/* Right Accent Flower */}
        <g transform="translate(395, 24) scale(0.65)">
          <circle cx="0" cy="0" r="10" fill="#f08b76" opacity="0.25" />
          <ellipse cx="0" cy="-11" rx="4.5" ry="7" fill="#f08b76" />
          <ellipse cx="0" cy="11" rx="4.5" ry="7.5" fill="#f08b76" />
          <ellipse cx="-11" cy="0" rx="7.5" ry="4.5" fill="#f08b76" />
          <ellipse cx="11" cy="0" rx="7.5" ry="4.5" fill="#f08b76" />
          <circle cx="0" cy="0" r="4" fill="#f6c358" />
        </g>

        {/* Central Blooming Flower */}
        <g transform="translate(270, 32)">
          <circle cx="0" cy="0" r="16" fill="#f08b76" opacity="0.3" />
          <ellipse cx="0" cy="-13" rx="5" ry="8.5" fill="#f08b76" />
          <ellipse cx="0" cy="13" rx="5" ry="8.5" fill="#f08b76" />
          <ellipse cx="-13" cy="0" rx="8.5" ry="5" fill="#f08b76" />
          <ellipse cx="13" cy="0" rx="8.5" ry="5" fill="#f08b76" />
          <ellipse cx="-9" cy="-9" rx="4.5" ry="7" transform="rotate(-45 -9 -9)" fill="#fa9f8e" />
          <ellipse cx="9" cy="-9" rx="4.5" ry="7" transform="rotate(45 9 -9)" fill="#fa9f8e" />
          <ellipse cx="-9" cy="9" rx="4.5" ry="7" transform="rotate(45 -9 9)" fill="#fa9f8e" />
          <ellipse cx="9" cy="9" rx="4.5" ry="7" transform="rotate(-45 9 9)" fill="#fa9f8e" />
          <circle cx="0" cy="0" r="5" fill="#f6c358" />
          <circle cx="0" cy="0" r="2" fill="#ffffff" />
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
        <BotanicalFlower size={26} />
      </div>
      <div className={`botanical-divider-line ${isLight ? 'line-cream' : ''}`} />
    </div>
  );
}
