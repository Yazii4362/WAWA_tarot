interface WawaLogoMarkProps {
  className?: string;
  /** 디자인 변형 — 'gold'(기본): 골드 베젤 / 'plain': 베젤 없음 */
  variant?: "gold" | "plain";
  size?: number;
}

/**
 * 와와타로 로고 마크
 * - 골드 라운드 베젤(원판) 위에 월계관 쓴 와와 머리
 * - 헤더/파비콘/공유 카드 등에 재사용
 */
export function WawaLogoMark({
  className,
  variant = "gold",
  size = 36,
}: WawaLogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="와와타로 로고"
    >
      <defs>
        <linearGradient id="lm-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbe07a" />
          <stop offset="55%" stopColor="#d9a93a" />
          <stop offset="100%" stopColor="#9c6f1a" />
        </linearGradient>
        <linearGradient id="lm-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cbe8f7" />
          <stop offset="100%" stopColor="#7bb8db" />
        </linearGradient>
        <linearGradient id="lm-fur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0cf94" />
          <stop offset="65%" stopColor="#d4a268" />
          <stop offset="100%" stopColor="#a67944" />
        </linearGradient>
        <linearGradient id="lm-laurel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#83a04d" />
          <stop offset="100%" stopColor="#4f6b2a" />
        </linearGradient>
      </defs>

      {variant === "gold" && (
        <>
          {/* 외곽 골드 링 */}
          <circle cx="32" cy="32" r="30" fill="url(#lm-gold)" />
          {/* 안쪽 스카이 패널 */}
          <circle cx="32" cy="32" r="26" fill="url(#lm-sky)" />
          {/* 골드 안쪽 라인 */}
          <circle
            cx="32"
            cy="32"
            r="26"
            fill="none"
            stroke="rgba(255, 240, 180, 0.85)"
            strokeWidth="0.6"
          />
        </>
      )}

      {/* === 와와 머리 === */}
      <g transform="translate(32 35)">
        {/* 머리 */}
        <ellipse cx="0" cy="0" rx="14.5" ry="13.5" fill="url(#lm-fur)" />
        {/* 머리 위 하이라이트 */}
        <ellipse
          cx="-2"
          cy="-7"
          rx="7"
          ry="3"
          fill="#f4d9a6"
          opacity="0.7"
        />

        {/* 좌 귀 */}
        <path d="M -12 -7 L -17 -19 L -5 -10 Z" fill="url(#lm-fur)" />
        <path
          d="M -10 -8 L -13.5 -15 L -7 -10 Z"
          fill="#f4a8c4"
          opacity="0.85"
        />
        {/* 우 귀 */}
        <path d="M 12 -7 L 17 -19 L 5 -10 Z" fill="url(#lm-fur)" />
        <path
          d="M 10 -8 L 13.5 -15 L 7 -10 Z"
          fill="#f4a8c4"
          opacity="0.85"
        />

        {/* 입가 흰 마스크 */}
        <path
          d="M -7 4 Q -4 10 0 8 Q 4 10 7 4 Q 3 6 0 6 Q -3 6 -7 4 Z"
          fill="#fff7e0"
        />

        {/* 눈 */}
        <ellipse cx="-4.5" cy="-1" rx="2.4" ry="2.6" fill="#1a1a2e" />
        <circle cx="-3.8" cy="-1.8" r="0.8" fill="#ffffff" />
        <ellipse cx="4.5" cy="-1" rx="2.4" ry="2.6" fill="#1a1a2e" />
        <circle cx="5.2" cy="-1.8" r="0.8" fill="#ffffff" />

        {/* 코 */}
        <ellipse cx="0" cy="5" rx="1.6" ry="1.2" fill="#1a1a2e" />

        {/* 단호한 한 일자 입 */}
        <path
          d="M -2.2 8.4 L 2.2 8.4"
          stroke="#1a1a2e"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* === 월계관 === */}
        {/* 좌측 */}
        <g transform="translate(-1.5 -13)">
          <path
            d="M 0 0 Q -8 -1 -14 -3"
            stroke="url(#lm-laurel)"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            cx="-3.5"
            cy="-1"
            rx="2.2"
            ry="1.2"
            fill="url(#lm-laurel)"
            transform="rotate(-15 -3.5 -1)"
          />
          <ellipse
            cx="-7"
            cy="-2"
            rx="2.4"
            ry="1.3"
            fill="url(#lm-laurel)"
            transform="rotate(-25 -7 -2)"
          />
          <ellipse
            cx="-11"
            cy="-3"
            rx="2"
            ry="1.1"
            fill="url(#lm-laurel)"
            transform="rotate(-35 -11 -3)"
          />
        </g>
        {/* 우측 */}
        <g transform="translate(1.5 -13)">
          <path
            d="M 0 0 Q 8 -1 14 -3"
            stroke="url(#lm-laurel)"
            strokeWidth="1.1"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            cx="3.5"
            cy="-1"
            rx="2.2"
            ry="1.2"
            fill="url(#lm-laurel)"
            transform="rotate(15 3.5 -1)"
          />
          <ellipse
            cx="7"
            cy="-2"
            rx="2.4"
            ry="1.3"
            fill="url(#lm-laurel)"
            transform="rotate(25 7 -2)"
          />
          <ellipse
            cx="11"
            cy="-3"
            rx="2"
            ry="1.1"
            fill="url(#lm-laurel)"
            transform="rotate(35 11 -3)"
          />
        </g>
      </g>
    </svg>
  );
}
