interface AltariaLogoProps {
  className?: string;
  height?: number;
  color?: string;
}

export function AltariaLogo({ className = "", height = 60 }: AltariaLogoProps) {
  return (
    <img
      src="/logo.jpeg"
      alt="ALTARIA"
      style={{ height: `${height}px`, width: "auto" }}
      className={`object-contain ${className}`}
      ///esto lo cmabbioe 
    />
  );
}