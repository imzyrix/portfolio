type Props = {
  kind?: "sparkle" | "star";
  size?: number;
  className?: string;
  color?: string;
};

const sparkle =
  "M 136 108.686 L 212.853 31.833 L 224.166 43.148 L 147.313 120 L 256 120 L 256 136 L 147.314 136 L 224.167 212.853 L 212.853 224.167 L 136 147.313 L 136 256 L 120 256 L 120 147.313 L 43.148 224.167 L 31.833 212.853 L 108.686 136 L 0 136 L 0 120 L 108.687 120 L 31.834 43.148 L 43.148 31.833 L 120 108.686 L 120 0 L 136 0 Z";

const star =
  "M 55 0 L 62.778 47.222 L 110 55 L 62.778 62.778 L 55 110 L 47.222 62.778 L 0 55 L 47.222 47.222 Z";

export default function Shape({ kind = "sparkle", size = 16, className = "", color = "currentColor" }: Props) {
  return (
    <svg
      className={`shp ${className}`}
      width={size}
      height={size}
      viewBox={kind === "star" ? "0 0 110 110" : "0 0 256 256"}
      fill={color}
      aria-hidden="true"
    >
      <path d={kind === "star" ? star : sparkle} />
    </svg>
  );
}