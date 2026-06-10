interface CardBackProps {
  className?: string;
}

/**
 * 와와타로 공식 카드 뒷면 — WebP 이미지 기반
 */
export function CardBack({ className }: CardBackProps) {
  return (
    <img
      src="/images/wawa/card-back.webp"
      alt="와와타로 카드 뒷면"
      className={className}
      role="img"
      aria-label="와와타로 카드 뒷면"
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
  );
}
