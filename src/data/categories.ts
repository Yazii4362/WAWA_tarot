/**
 * 와와타로 카테고리 IA
 * 4개 카테고리 + 카테고리별 질문 프리셋.
 * 각 질문은 1카드 + 천사/악마 듀얼 보이스로 풀어진다.
 */

export type CategoryId = "today" | "love" | "career" | "mind";

export type StarKey =
  | "luck"
  | "love"
  | "stamina"
  | "study"
  | "work"
  | "money"
  | "mood"
  | "focus";

/**
 * 별점 라벨 사전 — 결과 화면에서 「행운도 ★★★☆☆」 처럼 출력될 때 사용.
 */
export const STAR_LABELS: Record<StarKey, string> = {
  luck: "행운도",
  love: "연애도",
  stamina: "체력은",
  study: "학업운",
  work: "직장운",
  money: "금전운",
  mood: "기분은",
  focus: "집중도",
};

export interface CategoryQuestion {
  id: string;
  label: string;
  hint?: string;
}

export interface Category {
  id: CategoryId;
  emoji: string;
  name: string;
  tagline: string;
  description: string;
  /** 카드 톤(악센트 색) */
  accent: "sky" | "pink" | "amber" | "violet";
  /** 결과 화면에서 어떤 별점들을 보여줄지 (3~4개 권장, 첫 번째가 메인) */
  stars: StarKey[];
  questions: CategoryQuestion[];
}

export const categories: Category[] = [
  {
    id: "today",
    emoji: "🐕",
    name: "오늘의 와와",
    tagline: "오늘 하루치 한 마디",
    description:
      "특별한 고민이 없어도 괜찮아요. 그냥 오늘이 어떤 날인지 와와에게 한 번 물어봅니다.",
    accent: "sky",
    stars: ["luck", "love", "stamina", "mood"],
    questions: [
      {
        id: "today-day",
        label: "오늘 하루 운세",
        hint: "오늘이 나에게 어떤 흐름의 하루일지",
      },
      {
        id: "today-word",
        label: "오늘의 한마디",
        hint: "오늘 가장 마음에 새겨둘 한 줄",
      },
      {
        id: "today-lucky",
        label: "오늘의 행운 아이템",
        hint: "오늘 어떤 색·숫자·방향이 함께해주는지",
      },
      {
        id: "today-self",
        label: "오늘의 와와",
        hint: "오늘의 나에게 와와가 한마디 한다면",
      },
    ],
  },
  {
    id: "love",
    emoji: "💘",
    name: "연애",
    tagline: "마음의 결을 다시 한 번",
    description:
      "그 사람 마음이 궁금할 때, 답이 오기 전에 와와가 먼저 들여다봅니다.",
    accent: "pink",
    stars: ["love", "luck", "mood"],
    questions: [
      {
        id: "love-think",
        label: "그 사람도 나 생각할까?",
        hint: "그 사람 마음 속에 내 자리가 어디쯤인지",
      },
      {
        id: "love-contact",
        label: "연락 올까?",
        hint: "기다림이 의미가 있을지, 흐름이 어디쯤 와 있는지",
      },
      {
        id: "love-send",
        label: "지금 연락해도 될까?",
        hint: "보내려는 그 메시지, 지금이 맞는 타이밍인지",
      },
      {
        id: "love-reunion",
        label: "재회 가능성",
        hint: "끝났다고 생각한 인연, 정말 끝난 건지",
      },
    ],
  },
  {
    id: "career",
    emoji: "🎓",
    name: "학교/직장",
    tagline: "오늘의 무대 위에서",
    description:
      "발표·면접·시험·일터 — 결과 앞에서 흔들릴 때 와와가 카드로 잠깐 짚어줍니다.",
    accent: "amber",
    stars: ["work", "luck", "focus", "stamina"],
    questions: [
      {
        id: "career-present",
        label: "오늘 발표 괜찮을까?",
        hint: "오늘의 무대, 어떻게 풀릴지",
      },
      {
        id: "career-interview",
        label: "면접 운세",
        hint: "면접 전에 카드가 짚어주는 한 줄",
      },
      {
        id: "career-exam",
        label: "시험 운세",
        hint: "지금 컨디션과 시험의 흐름",
      },
      {
        id: "career-work",
        label: "직장 운세",
        hint: "지금 일터에서 알아두면 좋은 흐름",
      },
    ],
  },
  {
    id: "mind",
    emoji: "🧠",
    name: "마음",
    tagline: "지금 내가 나에게",
    description:
      "이유 없이 마음이 흔들릴 때. 와와가 카드 한 장 위에 너의 마음을 비춰봅니다.",
    accent: "violet",
    stars: ["mood", "luck", "focus"],
    questions: [
      {
        id: "mind-need",
        label: "지금 나에게 필요한 말",
        hint: "지금의 나에게 카드가 건네는 한 마디",
      },
      {
        id: "mind-miss",
        label: "내가 놓치고 있는 것",
        hint: "분명히 있는데 지금은 안 보이는 것",
      },
      {
        id: "mind-advice",
        label: "오늘의 조언",
        hint: "오늘의 나에게 와와가 짚어주는 한 줄",
      },
    ],
  },
];

export const getCategory = (id: string): Category | undefined =>
  categories.find((c) => c.id === id);

export const getQuestion = (
  catId: string,
  questionId: string
): CategoryQuestion | undefined =>
  getCategory(catId)?.questions.find((q) => q.id === questionId);

/** 모든 질문 평탄화 (카테고리 정보 포함) */
export const allQuestions = categories.flatMap((c) =>
  c.questions.map((q) => ({ ...q, categoryId: c.id, category: c }))
);
