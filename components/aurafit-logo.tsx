export default function AuraFitLogo() {
  return (
    <svg viewBox="0 0 100 100" className="h-12 w-12" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle cx="50" cy="50" r="48" stroke="#0d9488" strokeWidth="2" />

      {/* Inner stylized "A" with geometric design */}
      <g transform="translate(50, 50)">
        {/* Left diagonal line */}
        <line x1="-12" y1="8" x2="0" y2="-15" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
        {/* Right diagonal line */}
        <line x1="12" y1="8" x2="0" y2="-15" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />
        {/* Horizontal crossbar */}
        <line x1="-6" y1="-2" x2="6" y2="-2" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" />

        {/* Decorative dot accent */}
        <circle cx="0" cy="12" r="2.5" fill="#0d9488" />
      </g>

      {/* Small accent stars for premium feel */}
      <g fill="#0d9488" opacity="0.8">
        {/* Top accent */}
        <circle cx="50" cy="8" r="1.5" />
        {/* Bottom accent */}
        <circle cx="50" cy="92" r="1.5" />
      </g>
    </svg>
  )
}
