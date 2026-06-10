import { LowPolyCloud } from "./LowPolyCloud";

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
<<<<<<< HEAD
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        objectFit: "cover",
        objectPosition: "center",
      }}
    />
=======
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <defs>
        {/* 카드 종이 — 크림 베이지 */}
        <linearGradient id="cb-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fcf2da" />
          <stop offset="100%" stopColor="#f0e2bd" />
        </linearGradient>
        {/* 골드 그라디언트 (테두리용) */}
        <linearGradient id="cb-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f5d36a" />
          <stop offset="50%" stopColor="#d9a93a" />
          <stop offset="100%" stopColor="#a3781d" />
        </linearGradient>
        {/* 안쪽 하늘 패널 */}
        <linearGradient id="cb-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7ec5e8" />
          <stop offset="55%" stopColor="#5aaedd" />
          <stop offset="100%" stopColor="#4197cd" />
        </linearGradient>
        {/* 와와 털 그라디언트 */}
        <linearGradient id="cb-fur" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ecca94" />
          <stop offset="60%" stopColor="#d4a268" />
          <stop offset="100%" stopColor="#a87a44" />
        </linearGradient>
        {/* 월계관 그린 */}
        <linearGradient id="cb-laurel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7d9b4a" />
          <stop offset="100%" stopColor="#4f6a2a" />
        </linearGradient>
      </defs>

      {/* === 카드 베이스 (크림 종이) === */}
      <rect width="200" height="320" rx="18" ry="18" fill="url(#cb-paper)" />

      {/* === 골드 외곽 라인 === */}
      <rect
        x="3"
        y="3"
        width="194"
        height="314"
        rx="15"
        ry="15"
        fill="none"
        stroke="url(#cb-gold)"
        strokeWidth="1.6"
      />

      {/* === 골드 두꺼운 프레임 === */}
      <rect
        x="10"
        y="14"
        width="180"
        height="292"
        rx="6"
        ry="6"
        fill="none"
        stroke="url(#cb-gold)"
        strokeWidth="3"
      />
      {/* 골드 프레임 안쪽 얇은 라인 */}
      <rect
        x="13.5"
        y="17.5"
        width="173"
        height="285"
        rx="4"
        ry="4"
        fill="none"
        stroke="rgba(255, 230, 150, 0.8)"
        strokeWidth="0.6"
      />

      {/* === 하늘 패널 === */}
      <rect x="15" y="19" width="170" height="282" rx="3" fill="url(#cb-sky)" />

      {/* === 픽셀 별들 (4점 별 + 작은 점) === */}
      <g fill="#ffffff">
        {/* 4점 별 (크기 큰 것들) */}
        <g>
          {/* 좌상 */}
          <path d="M 38 50 L 40 56 L 46 58 L 40 60 L 38 66 L 36 60 L 30 58 L 36 56 Z" />
          {/* 우상 */}
          <path d="M 162 60 L 164 66 L 170 68 L 164 70 L 162 76 L 160 70 L 154 68 L 160 66 Z" />
          {/* 좌중 */}
          <path d="M 30 130 L 31.5 134 L 35.5 135 L 31.5 136 L 30 140 L 28.5 136 L 24.5 135 L 28.5 134 Z" />
          {/* 우중 */}
          <path d="M 168 200 L 169.5 204 L 173.5 205 L 169.5 206 L 168 210 L 166.5 206 L 162.5 205 L 166.5 204 Z" />
          {/* 하단 좌 */}
          <path d="M 50 270 L 51.5 274 L 55.5 275 L 51.5 276 L 50 280 L 48.5 276 L 44.5 275 L 48.5 274 Z" />
          {/* 하단 우 */}
          <path d="M 154 282 L 155.5 286 L 159.5 287 L 155.5 288 L 154 292 L 152.5 288 L 148.5 287 L 152.5 286 Z" />
          {/* 가운데 위 (작게) */}
          <path d="M 100 38 L 101 41 L 104 42 L 101 43 L 100 46 L 99 43 L 96 42 L 99 41 Z" />
        </g>
        {/* 작은 점 별 */}
        <g opacity="0.95">
          <circle cx="55" cy="80" r="0.9" />
          <circle cx="148" cy="38" r="0.7" />
          <circle cx="80" cy="80" r="0.6" />
          <circle cx="120" cy="58" r="0.8" />
          <circle cx="178" cy="120" r="0.7" />
          <circle cx="22" cy="170" r="0.6" />
          <circle cx="180" cy="160" r="0.5" />
          <circle cx="35" cy="220" r="0.6" />
          <circle cx="100" cy="290" r="0.5" />
          <circle cx="170" cy="240" r="0.55" />
          <circle cx="80" cy="265" r="0.5" />
        </g>
      </g>

      {/* === Low-Poly 구름들 — 같은 LowPolyCloud 컴포넌트 사용 === */}
      <LowPolyCloud variant="d" x={14} y={64} width={78} height={44} />
      <LowPolyCloud variant="b" x={118} y={86} width={62} height={34} />
      <LowPolyCloud variant="c" x={14} y={226} width={62} height={34} />
      <LowPolyCloud variant="a" x={118} y={218} width={68} height={38} />

      {/* === 가운데 와와 (월계관 쓴 머리) === */}
      <g transform="translate(100 165)">
        {/* 머리 살짝 그림자 */}
        <ellipse
          cx="0"
          cy="3"
          rx="32"
          ry="29"
          fill="rgba(20, 50, 80, 0.18)"
        />
        {/* 머리 본체 */}
        <ellipse cx="0" cy="0" rx="30" ry="28" fill="url(#cb-fur)" />
        {/* 머리 위 하이라이트 */}
        <ellipse
          cx="-5"
          cy="-15"
          rx="14"
          ry="6"
          fill="#f4d9a6"
          opacity="0.7"
        />
        {/* 귀 좌 */}
        <path d="M -25 -16 L -36 -42 L -10 -22 Z" fill="url(#cb-fur)" />
        <path d="M -22 -18 L -29 -32 L -15 -22 Z" fill="#f4a8c4" opacity="0.85" />
        {/* 귀 우 */}
        <path d="M 25 -16 L 36 -42 L 10 -22 Z" fill="url(#cb-fur)" />
        <path d="M 22 -18 L 29 -32 L 15 -22 Z" fill="#f4a8c4" opacity="0.85" />

        {/* 입 주변 흰 무늬 */}
        <path
          d="M -16 8
             Q -10 24 0 18
             Q 10 24 16 8
             Q 6 14 0 14
             Q -6 14 -16 8 Z"
          fill="#fff8e7"
        />

        {/* 눈 (큰 눈망울 + 하이라이트) */}
        <ellipse cx="-9" cy="-2" rx="5" ry="5.5" fill="#1a1a2e" />
        <circle cx="-9" cy="-2" r="3.8" fill="#0a0a1f" />
        <circle cx="-7.5" cy="-4" r="1.6" fill="#ffffff" />
        <circle cx="-10.5" cy="0.5" r="0.7" fill="rgba(255,255,255,0.55)" />

        <ellipse cx="9" cy="-2" rx="5" ry="5.5" fill="#1a1a2e" />
        <circle cx="9" cy="-2" r="3.8" fill="#0a0a1f" />
        <circle cx="10.5" cy="-4" r="1.6" fill="#ffffff" />
        <circle cx="7.5" cy="0.5" r="0.7" fill="rgba(255,255,255,0.55)" />

        {/* 코 */}
        <ellipse cx="0" cy="11" rx="3.2" ry="2.4" fill="#1a1a2e" />
        <ellipse
          cx="-1"
          cy="10"
          rx="1.1"
          ry="0.7"
          fill="rgba(255,255,255,0.45)"
        />

        {/* 입 (단호한 한 일자) */}
        <path
          d="M -5 18 L 5 18"
          stroke="#1a1a2e"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* === 월계관 (좌우 잎사귀 V자) === */}
        {/* 좌측 잎 */}
        <g transform="translate(-2 -28)">
          {/* 메인 잎 줄기 */}
          <path
            d="M 0 0 Q -16 -2 -28 -8"
            stroke="url(#cb-laurel)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* 잎사귀들 */}
          <ellipse
            cx="-7"
            cy="-3"
            rx="4"
            ry="2.2"
            fill="url(#cb-laurel)"
            transform="rotate(-15 -7 -3)"
          />
          <ellipse
            cx="-14"
            cy="-5"
            rx="4.5"
            ry="2.3"
            fill="url(#cb-laurel)"
            transform="rotate(-25 -14 -5)"
          />
          <ellipse
            cx="-21"
            cy="-7"
            rx="4"
            ry="2"
            fill="url(#cb-laurel)"
            transform="rotate(-35 -21 -7)"
          />
          <ellipse
            cx="-26"
            cy="-9"
            rx="3.5"
            ry="1.8"
            fill="url(#cb-laurel)"
            transform="rotate(-45 -26 -9)"
          />
        </g>
        {/* 우측 잎 */}
        <g transform="translate(2 -28)">
          <path
            d="M 0 0 Q 16 -2 28 -8"
            stroke="url(#cb-laurel)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <ellipse
            cx="7"
            cy="-3"
            rx="4"
            ry="2.2"
            fill="url(#cb-laurel)"
            transform="rotate(15 7 -3)"
          />
          <ellipse
            cx="14"
            cy="-5"
            rx="4.5"
            ry="2.3"
            fill="url(#cb-laurel)"
            transform="rotate(25 14 -5)"
          />
          <ellipse
            cx="21"
            cy="-7"
            rx="4"
            ry="2"
            fill="url(#cb-laurel)"
            transform="rotate(35 21 -7)"
          />
          <ellipse
            cx="26"
            cy="-9"
            rx="3.5"
            ry="1.8"
            fill="url(#cb-laurel)"
            transform="rotate(45 26 -9)"
          />
        </g>
        {/* 월계관 가운데 작은 골드 보석 */}
        <circle cx="0" cy="-30" r="2" fill="url(#cb-gold)" />
      </g>

      {/* === 하단 워드마크 === */}
      <text
        x="100"
        y="296"
        textAnchor="middle"
        fontFamily="'DungGeunMo', 'NeoDunggeunmoPro', monospace"
        fontSize="9"
        letterSpacing="3"
        fill="rgba(255, 247, 220, 0.92)"
      >
        WAWATAROT
      </text>
    </svg>
>>>>>>> fdc6cefde1f97ad2e1094d3ffec46b90d4c40713
  );
}
