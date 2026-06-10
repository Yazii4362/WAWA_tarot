interface WawaLogoMarkProps {
  className?: string;
  size?: number;
}

/**
 * 와와타로 로고 마크 — angel.webp 원본 그대로.
 *
 * angel 이미지는 이미 둥근 사각형 형태로 디자인되어 있어서
 * 별도의 베젤/배경 없이 이미지 그대로 보여주는 게 맞다.
 * 헤더, 홈 히어로, 공유 카드 어디서든 같은 룩으로 재사용한다.
 */
export function WawaLogoMark({ className, size = 36 }: WawaLogoMarkProps) {
  return (
    <img
      src="/images/wawa/angel.webp"
      alt=""
      className={className}
      role="img"
      aria-label="와와타로 로고"
      draggable={false}
      width={size}
      height={size}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        flex: "0 0 auto",
        objectFit: "contain",
        filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.18))",
      }}
    />
  );
}
