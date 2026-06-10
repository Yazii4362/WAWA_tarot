import type { DrawnCard } from "./tarot";
import type { Category, StarKey } from "../data/categories";
import { STAR_LABELS } from "../data/categories";

/**
 * 와와타로 결과 빌더
 * - 다중 별점 (행운/연애/체력 등 카테고리별 섬단)
 * - 한 줄 결론 (카드 + 카테고리 시드 기반)
 */

export interface StarReading {
  key: StarKey;
  label: string;
  /** 1~5 */
  stars: number;
}

export interface WawaConclusion {
  /** 한 줄 결론 (큰 인용구) */
  oneLine: string;
  /** 다중 별점 */
  stars: StarReading[];
  /** 공유용 짧은 멘트 (선택) */
  hashtag: string;
}

/* ── 시드 유틸 ──────────────────────── */

function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h >>> 0;
}

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(s ^ (s >>> 15), 0x2c1b3c6d) >>> 0;
    s = Math.imul(s ^ (s >>> 12), 0x297a2d39) >>> 0;
    s ^= s >>> 15;
    return (s >>> 0) / 0xffffffff;
  };
}

/* ── 별점 ────────────────────────────── */

/**
 * 카드의 정/역 비율 + key별 시드를 섞어서 1~5 별점.
 * 같은 입력이면 항상 같은 결과.
 */
function rollStars(seed: number, uprightRatio: number): number {
  const r = rng(seed)();
  // 정방향 비율이 높을수록 별점이 위로 치우침
  const tilt = (uprightRatio - 0.5) * 0.35;
  const v = Math.max(0, Math.min(0.999, r + tilt));
  if (v < 0.06) return 1;
  if (v < 0.26) return 2;
  if (v < 0.62) return 3;
  if (v < 0.88) return 4;
  return 5;
}

export function buildStars(
  cards: DrawnCard[],
  category: Category,
  questionId: string | undefined
): StarReading[] {
  const ids = cards.map((c) => c.card.id).join(",");
  const upright = cards.filter((c) => !c.reversed).length / Math.max(1, cards.length);
  const baseSeed = fnv1a(`stars::${category.id}::${questionId ?? "free"}::${ids}`);

  return category.stars.map((key, idx) => ({
    key,
    label: STAR_LABELS[key],
    stars: rollStars(baseSeed ^ ((idx + 1) * 0x9e3779b1), upright),
  }));
}

/* ── 한 줄 결론 ────────────────────────── */

const ONE_LINERS: Record<string, string[]> = {
  // 카테고리 보편
  default_up: [
    "오늘은 한 발 더 가도 괜찮아 보여.",
    "흐름은 너 쪽으로 살짝 기울어 있어.",
    "괜한 자책보다 한 걸음이 답이야.",
    "마음이 가는 쪽이 의외로 정답일지 몰라.",
  ],
  default_down: [
    "오늘은 큰 결정보다 낮잠이 더 중요해 보여.",
    "결론보다 한 박자 쉬어가는 게 좋아.",
    "지금은 답을 내릴 때보다 살펴볼 때야.",
    "조급해서 잃는 것이 천천히 가서 잃는 것보다 많아.",
  ],
  today_up: [
    "오늘은 의외로 좋은 한 줄이 너에게 찾아와.",
    "가벼운 발걸음이 오늘의 너를 더 멀리 데려가.",
  ],
  today_down: [
    "오늘은 큰 결정보다 낮잠이 더 중요해 보여.",
    "오늘은 'DO'보다 'BE'가 어울리는 날이야.",
  ],
  love_up: [
    "그 마음, 너만 키우고 있는 건 아니야.",
    "오늘은 마음이 한 박자 빨리 도착해도 괜찮아.",
  ],
  love_down: [
    "끝나지 않은 감정과 끝나지 않은 관계는 다른 이야기야.",
    "지금은 답을 받기보다 답을 정리할 때야.",
  ],
  career_up: [
    "준비한 만큼은 무대 위에서 분명히 살아나.",
    "오늘은 평소보다 한 줄 더 말해도 돼.",
  ],
  career_down: [
    "오늘은 새로 시작하기보다 마무리하기에 더 어울려.",
    "결과보다 과정에서 점수가 매겨지는 날이야.",
  ],
  mind_up: [
    "지금의 너에게 필요한 건 정답보다 호흡 한 번이야.",
    "잠깐 멈춰도 길이 사라지지는 않아.",
  ],
  mind_down: [
    "괜찮은 척하지 않아도 돼. 오늘은 그런 날이야.",
    "외면해온 마음 한 줄을 오늘은 적어도 봐줘.",
  ],
};

export function buildOneLine(
  cards: DrawnCard[],
  category: Category,
  questionId: string | undefined
): string {
  const ids = cards.map((c) => c.card.id).join(",");
  const upright = cards.filter((c) => !c.reversed).length / Math.max(1, cards.length);
  const seed = fnv1a(`oneline::${category.id}::${questionId ?? "free"}::${ids}`);
  const isUp = upright >= 0.5;
  const upKey = `${category.id}_up`;
  const downKey = `${category.id}_down`;
  const pool = [
    ...(ONE_LINERS[isUp ? upKey : downKey] ?? []),
    ...(ONE_LINERS[isUp ? "default_up" : "default_down"] ?? []),
  ];
  const idx = seed % pool.length;
  return pool[idx];
}

/* ── 통합 ────────────────────────────── */

export function buildConclusion(
  cards: DrawnCard[],
  category: Category,
  questionId: string | undefined
): WawaConclusion {
  return {
    oneLine: buildOneLine(cards, category, questionId),
    stars: buildStars(cards, category, questionId),
    hashtag: "#와와타로",
  };
}

export function formatStars5(n: number): string {
  const v = Math.max(0, Math.min(5, Math.round(n)));
  return "★".repeat(v) + "☆".repeat(5 - v);
}
