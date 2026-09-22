
interface AltariaLogoProps {
  className?: string;
    height?: number;
    color?: string;
}
export function AltariaLogo({ className = "", height = 28 , color =  ""}: AltariaLogoProps) {
  return (
    <svg
      className={`altaria-logo ${className}`}
      height={height}
      width="auto"
      viewBox="0 0 344 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="ALTARIA"
      style={{ display: "block" }}
    >
      {/* A (V al revés, sin trazo central) */}
      <path
        d="M 0 44 L 20 4 H 28 L 48 44 H 36 L 24 18 L 12 44 H 0 Z"
        fill={color}
      />

      {/* L */}
      <path d="M 60 4 H 72 V 34 H 96 V 44 H 60 V 4 Z" fill={color} />

      {/* T */}
      <path
        d="M 104 4 H 148 V 14 H 132 V 44 H 120 V 14 H 104 V 4 Z"
        fill={color}
      />

      {/* A (V al revés, sin trazo central) */}
      <path
        d="M 156 44 L 176 4 H 184 L 204 44 H 192 L 180 18 L 168 44 H 156 Z"
        fill={color}
      />

      {/* R */}
      <path
        d="M 216 4 H 244 C 254 4 260 9 260 17 C 260 23 255 27 247 28 L 261 44 H 247 L 235 29 H 228 V 44 H 216 V 4 Z M 228 13 V 20 H 242 C 246 20 248 18 248 16.5 C 248 15 246 13 242 13 H 228 Z"
        fill={color}
      />

      {/* I */}
      <path d="M 272 4 H 284 V 44 H 272 V 4 Z" fill={color} />

      {/* A (V al revés, sin trazo central) */}
      <path
        d="M 296 44 L 316 4 H 324 L 344 44 H 332 L 320 18 L 308 44 H 296 Z"
        fill={color}
      />
    </svg>
  );
}
