/**
 * Low-Poly Cloud — 2008 PSX/Tomb Raider 시대 톤
 * - 다각형 면을 단색 fill 폴리곤으로 분리
 * - 4단계 셰이딩 (highlight → mid-light → mid-dark → shadow)
 * - stroke/그라디언트 미사용 (PSX 룩)
 * - 5가지 형태 변형 (variant A~E) — 자연스러운 분포용
 *
 * viewBox: 100 x 60 — 가로:세로 ≈ 5:3
 */

export type LowPolyCloudVariant = "a" | "b" | "c" | "d" | "e";

interface LowPolyCloudProps {
  className?: string;
  variant?: LowPolyCloudVariant;
  /** 4단계 셰이딩 색상 — 기본은 차가운 화이트 */
  palette?: {
    highlight: string; // 가장 밝은 면 (해 받는 쪽)
    midLight: string; // 옆 밝은 면
    midDark: string; // 그늘 면
    shadow: string; // 가장 어두운 면
  };
  /** 살짝 그레인 노이즈 (Y2K 톤) — 기본 false */
  grain?: boolean;
  style?: React.CSSProperties;
  /**
   * 부모 SVG 안에 nested SVG로 박을 때 좌표/크기 지정.
   * 이 props가 하나라도 있으면 svg 태그에 그대로 패스됨.
   */
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
}

const DEFAULT_PALETTE = {
  highlight: "#ffffff",
  midLight: "#e7eef4",
  midDark: "#bccbd6",
  shadow: "#8aa0b0",
};

export function LowPolyCloud({
  className,
  variant = "a",
  palette = DEFAULT_PALETTE,
  grain = false,
  style,
  x,
  y,
  width,
  height,
}: LowPolyCloudProps) {
  const filterId = `lpc-grain-${variant}`;
  const facets = FACETS[variant];

  return (
    <svg
      viewBox="0 0 100 60"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ display: "block", overflow: "visible", ...style }}
      role="presentation"
      aria-hidden="true"
      x={x}
      y={y}
      width={width}
      height={height}
    >
      {grain && (
        <defs>
          <filter id={filterId} x="0" y="0" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.4"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.06" />
            </feComponentTransfer>
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
        </defs>
      )}

      <g filter={grain ? `url(#${filterId})` : undefined}>
        {facets.map((f, i) => (
          <polygon key={i} points={f.points} fill={resolveColor(f.tone, palette)} />
        ))}
      </g>
    </svg>
  );
}

/* ── 톤 → 색 ── */
type Tone = "h" | "m" | "d" | "s";
function resolveColor(t: Tone, p: NonNullable<LowPolyCloudProps["palette"]>) {
  switch (t) {
    case "h":
      return p.highlight;
    case "m":
      return p.midLight;
    case "d":
      return p.midDark;
    case "s":
      return p.shadow;
  }
}

/**
 * 폴리곤 정의
 * 각 variant는 5~8개 폴리곤으로 구성된 한 덩이 구름.
 * 좌표는 viewBox 100×60 기준.
 */
type Facet = { tone: Tone; points: string };

const FACETS: Record<LowPolyCloudVariant, Facet[]> = {
  // ── A: 가로로 길쭉 (3봉우리, 가장 보편) ──
  a: [
    // 베이스 그림자
    { tone: "s", points: "10,40 32,32 56,30 80,32 92,40 86,46 60,48 30,46 14,46" },
    { tone: "d", points: "14,40 30,28 50,26 64,28 78,30 88,40 78,42 50,42 22,42" },
    { tone: "m", points: "20,38 30,28 38,22 48,20 58,22 64,28 70,32 76,38 60,38 38,38" },
    { tone: "m", points: "60,28 70,24 78,22 86,26 92,32 90,38 80,38 70,34" },
    { tone: "h", points: "30,30 38,22 48,20 56,22 50,30 42,32 36,32" },
    { tone: "h", points: "70,28 78,22 86,26 88,30 80,32 74,32" },
  ],
  // ── B: 작고 동글동글 (2봉우리) ──
  b: [
    { tone: "s", points: "20,38 36,32 56,30 76,34 82,40 70,46 42,46 26,42" },
    { tone: "d", points: "24,38 36,28 52,26 64,28 74,32 80,38 64,40 40,40 28,40" },
    { tone: "m", points: "28,36 38,26 50,22 60,24 66,30 70,36 56,36 40,36" },
    { tone: "h", points: "38,30 46,24 56,22 60,26 54,30 46,32" },
  ],
  // ── C: 옆으로 흘러가는 (작고 가벼움) ──
  c: [
    { tone: "s", points: "12,38 28,34 46,32 62,34 76,38 70,44 50,46 30,44 16,42" },
    { tone: "d", points: "18,36 32,30 46,28 58,30 70,34 76,38 60,40 40,40 22,38" },
    { tone: "m", points: "22,34 34,28 46,26 56,28 64,32 70,36 56,36 38,34" },
    { tone: "h", points: "34,30 42,26 52,26 56,28 50,32 42,32" },
  ],
  // ── D: 큰 구름 (4봉우리, 풍성) ──
  d: [
    { tone: "s", points: "8,42 24,36 40,32 56,30 72,32 86,36 94,42 86,48 60,50 30,48 14,48" },
    { tone: "d", points: "12,42 24,32 38,26 50,24 60,26 72,28 84,32 92,40 78,42 50,42 24,42" },
    { tone: "m", points: "18,40 28,30 40,22 50,20 56,24 62,28 70,32 76,38 60,38 36,38" },
    { tone: "m", points: "62,28 72,22 82,20 88,24 92,30 88,38 78,38 70,34" },
    { tone: "h", points: "28,32 38,22 50,20 54,24 48,28 38,32" },
    { tone: "h", points: "70,30 80,22 88,24 86,28 78,30" },
  ],
  // ── E: 얇은 띠 구름 (저점, 가로로 슬렌더) ──
  e: [
    { tone: "s", points: "8,40 28,36 50,34 70,36 90,40 86,44 60,46 32,46 12,44" },
    { tone: "d", points: "14,38 30,32 48,30 62,32 78,34 86,38 64,40 36,40 18,40" },
    { tone: "m", points: "22,36 34,30 48,28 60,30 70,34 76,36 56,36 36,36" },
    { tone: "h", points: "34,32 44,28 54,28 58,30 50,32 42,32" },
  ],
};
