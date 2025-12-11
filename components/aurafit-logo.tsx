export default function AuraFitLogo() {
  return (
    <svg viewBox="0 0 200 200" className="h-12 w-12" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle - thin border */}
      <circle cx="100" cy="100" r="95" stroke="#26C6A9" strokeWidth="1.5" />

      {/* Fashion Icons arranged in a circle */}

      {/* Top - Sneaker (thin line style) */}
      <g transform="translate(100, 20)">
        <path
          d="M -12 8 Q -8 2 0 0 Q 8 2 12 8 L 12 14 Q 8 16 0 16 Q -8 16 -12 14 Z M -10 8 L 10 8"
          stroke="#26C6A9"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Top Right - Sports Bra (thin line) */}
      <g transform="translate(155, 45)">
        <path
          d="M -10 0 Q -12 4 -10 8 L 10 8 Q 12 4 10 0 Z M -6 8 L -6 14 M 6 8 L 6 14"
          stroke="#26C6A9"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Right - Hoodie/Jacket (thin line) */}
      <g transform="translate(170, 100)">
        <path
          d="M -12 0 L -12 16 Q -8 18 0 18 Q 8 18 12 16 L 12 0 M -4 0 L -6 8 M 4 0 L 6 8 M -2 4 L 2 4"
          stroke="#26C6A9"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Bottom Right - Heels (thin line) */}
      <g transform="translate(145, 160)">
        <path
          d="M -14 4 L -10 16 L -8 16 L -12 4 M 0 4 L 4 16 L 6 16 L 2 4"
          stroke="#26C6A9"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Bottom - Dress/Gown (thin line) */}
      <g transform="translate(100, 175)">
        <path
          d="M -10 0 L -10 6 Q -10 8 -8 10 L -4 16 L 4 16 L 8 10 Q 10 8 10 6 L 10 0 Z M -8 2 L 8 2"
          stroke="#26C6A9"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Bottom Left - Handbag (thin line) */}
      <g transform="translate(55, 160)">
        <path
          d="M -12 2 Q -14 0 -10 0 L 10 0 Q 14 0 12 2 L 12 12 Q 10 14 0 14 Q -10 14 -12 12 Z M -8 2 L 8 2 M -6 0 L -6 -4 M 6 0 L 6 -4"
          stroke="#26C6A9"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Left - Hanger/Clothing (thin line) */}
      <g transform="translate(30, 100)">
        <path
          d="M -8 0 Q -10 0 -10 2 L -10 14 Q -8 16 0 16 L 0 16 Q 8 16 10 14 L 10 2 Q 10 0 8 0 M -6 2 L 6 2 M -2 0 L -2 -4 L 2 -4 L 2 0"
          stroke="#26C6A9"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Top Left - Accessories/Earring (thin line) */}
      <g transform="translate(45, 45)">
        <circle cx="-4" cy="4" r="3" stroke="#26C6A9" strokeWidth="1.2" />
        <circle cx="4" cy="4" r="3" stroke="#26C6A9" strokeWidth="1.2" />
        <line x1="-4" y1="7" x2="-4" y2="12" stroke="#26C6A9" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="4" y1="7" x2="4" y2="12" stroke="#26C6A9" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* Center text - AURAFIT */}
      <text
        x="100"
        y="108"
        textAnchor="middle"
        fontSize="18"
        fontWeight="600"
        fill="#26C6A9"
        fontFamily="'Playfair Display', serif"
        letterSpacing="2"
      >
        AURAFIT
      </text>

      {/* Decorative minimal line beneath text */}
      <line x1="60" y1="118" x2="140" y2="118" stroke="#26C6A9" strokeWidth="0.8" opacity="0.6" />
    </svg>
  )
}
