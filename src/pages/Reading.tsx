import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { getSpread, type SpreadDefinition } from "../data/spreads";
import {
  getCategory,
  getQuestion,
  type Category,
  type CategoryQuestion,
} from "../data/categories";
import type { DrawnCard } from "../utils/tarot";
import { buildPickPool } from "../utils/tarot";
import { TarotCardView } from "../components/TarotCardView";
import { CardBack } from "../components/CardBack";
import { buildIntensity, buildLucky } from "../utils/fortuneFlavors";
import { buildConclusion, formatStars5 } from "../utils/wawaResult";
import type { WawaMode } from "../data/voiceTexts";
import { getVoice } from "../data/voiceTexts";

type ResultView = WawaMode | "both";
type Phase =
  | "ask"
  | "shuffling"
  | "picking"
  | "revealing"
  | "analyzing"
  | "done";

/** 카테고리 진입(쿼리)일 때 쓰는 가상 스프레드 — 1카드. */
const ONE_CARD_SPREAD: SpreadDefinition = {
  id: "one-card",
  name: "와와에게 한 장",
  subtitle: "One Card",
  description:
    "지금 가장 마음에 걸리는 한 가지를 떠올린 채로, 카드 한 장을 뽑아주세요.",
  count: 1,
  rows: [1],
  positions: [
    { index: 0, label: "와와의 한 마디", hint: "지금 너에게 필요한 통찰" },
  ],
  suggestions: [],
};

export function Reading() {
  const { spreadId } = useParams<{ spreadId: string }>();
  const [search] = useSearchParams();
  const catId = search.get("cat") ?? undefined;
  const questionId = search.get("q") ?? undefined;

  const category: Category | undefined = catId ? getCategory(catId) : undefined;
  const presetQuestion: CategoryQuestion | undefined =
    catId && questionId ? getQuestion(catId, questionId) : undefined;

  /**
   * 진행할 스프레드 결정:
   * 1) 카테고리 진입 → 항상 1카드 스프레드 (ONE_CARD_SPREAD)
   * 2) /reading/:spreadId → 해당 스프레드
   * 3) /reading 자유 진입 → 1카드 스프레드
   */
  const spread: SpreadDefinition | undefined = useMemo(() => {
    if (category) return ONE_CARD_SPREAD;
    if (spreadId) return getSpread(spreadId);
    return ONE_CARD_SPREAD;
  }, [category, spreadId]);

  const [phase, setPhase] = useState<Phase>("ask");
  const [question, setQuestion] = useState("");
  const [pool, setPool] = useState<DrawnCard[]>([]);
  const [pickedIdx, setPickedIdx] = useState<number[]>([]);
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([]);
  // 카테고리 진입 시 디폴트는 "둘 다 보기" — 사용자가 보여준 결과 예시 톤
  const [resultView, setResultView] = useState<ResultView>("both");

  // 카테고리/질문 prefill
  useEffect(() => {
    if (presetQuestion) setQuestion(presetQuestion.label);
  }, [presetQuestion]);

  if (!spread) {
    return (
      <div className="center-text" style={{ padding: 60 }}>
        <p>🐕 와와가 카드 한 장 먹어버린 것 같아요. 그런 스프레드는 없어요.</p>
        <Link to="/" className="btn btn-ghost" style={{ marginTop: 16 }}>
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  const startDraw = () => {
    setPhase("shuffling");
    const drawn = buildPickPool(spread.count);
    setPool(drawn);
    setPickedIdx([]);
    setCards([]);
    setRevealed([]);
    setTimeout(() => setPhase("picking"), 1700);
  };

  const pickAt = (idx: number) => {
    if (pickedIdx.includes(idx)) return;
    if (pickedIdx.length >= spread.count) return;
    const next = [...pickedIdx, idx];
    setPickedIdx(next);

    if (next.length === spread.count) {
      const finalCards = next.map((i) => pool[i]);
      setTimeout(() => {
        setCards(finalCards);
        setRevealed(new Array(spread.count).fill(false));
        setPhase("revealing");
      }, 650);
    }
  };

  const ANALYZING_MS = 1700;

  const revealAt = (i: number) => {
    setRevealed((prev) => {
      if (prev[i]) return prev;
      const next = [...prev];
      next[i] = true;
      const allRevealed = next.every(Boolean);
      if (allRevealed) {
        setTimeout(() => setPhase("analyzing"), 600);
        setTimeout(() => setPhase("done"), 600 + ANALYZING_MS);
      }
      return next;
    });
  };

  const revealAll = () => {
    setRevealed(new Array(spread.count).fill(true));
    setTimeout(() => setPhase("analyzing"), 600);
    setTimeout(() => setPhase("done"), 600 + ANALYZING_MS);
  };

  const reset = () => {
    setPhase("ask");
    setCards([]);
    setRevealed([]);
    setPool([]);
    setPickedIdx([]);
    setResultView("both");
  };

  const reshuffle = () => {
    setCards([]);
    setRevealed([]);
    setPool([]);
    setPickedIdx([]);
    setResultView("both");
    setPhase("shuffling");
    const drawn = buildPickPool(spread.count);
    setTimeout(() => {
      setPool(drawn);
      setPhase("picking");
    }, 1700);
  };

  return (
    <div className="reading">
      <ReadingHeader
        spread={spread}
        category={category}
        presetQuestion={presetQuestion}
        phase={phase}
      />

      {phase === "ask" && (
        <AskPanel
          spread={spread}
          category={category}
          presetQuestion={presetQuestion}
          question={question}
          onChangeQuestion={setQuestion}
          onStart={startDraw}
        />
      )}

      {phase === "shuffling" && <ShuffleStage />}

      {phase === "picking" && (
        <PickStage
          pool={pool}
          pickedIdx={pickedIdx}
          targetCount={spread.count}
          onPick={pickAt}
        />
      )}

      {(phase === "revealing" || phase === "analyzing" || phase === "done") && (
        <AnimatePresence mode="wait">
          <motion.div
            key="stage"
            className="spread-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SpreadBoard
              spread={spread}
              cards={cards}
              revealed={revealed}
              onClickCard={revealAt}
            />

            {phase === "revealing" && (
              <div
                className="actions-row"
                style={{ flexDirection: "column", alignItems: "center" }}
              >
                <p
                  className="center-text"
                  style={{ marginBottom: 4, fontSize: "var(--fs-sm)" }}
                >
                  🐕 카드를 천천히 뒤집어 보세요
                </p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={revealAll}
                >
                  지금 보기
                </button>
              </div>
            )}

            {phase === "analyzing" && <AnalyzingStage />}

            {phase === "done" && (
              <ReadingResult
                spread={spread}
                category={category}
                questionId={questionId}
                cards={cards}
                question={question}
                view={resultView}
                onChangeView={setResultView}
                onReshuffle={reshuffle}
                onReset={reset}
              />
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

/* ============================================================
   HEADER — 카테고리 진입 시 카테고리 정보를 우선 표시
   ============================================================ */
function ReadingHeader({
  spread,
  category,
  presetQuestion,
  phase,
}: {
  spread: SpreadDefinition;
  category: Category | undefined;
  presetQuestion: CategoryQuestion | undefined;
  phase: Phase;
}) {
  const stepIndex =
    phase === "ask"
      ? 1
      : phase === "shuffling" || phase === "picking"
        ? 2
        : phase === "revealing"
          ? 3
          : phase === "analyzing"
            ? 4
            : 4;

  const steps = [
    { n: 1, label: "질문하기" },
    { n: 2, label: "카드 뽑기" },
    { n: 3, label: "카드 뒤집기" },
    { n: 4, label: "와와의 한 마디" },
  ];

  return (
    <section
      className="reading-header"
      style={{ paddingTop: "var(--sp-6)", paddingBottom: 0 }}
    >
      {category ? (
        <>
          <span className="eyebrow">
            {category.emoji} {category.name} · {category.tagline}
          </span>
          <h1>{presetQuestion?.label ?? spread.name}</h1>
          {presetQuestion?.hint && <p className="lead">{presetQuestion.hint}</p>}
        </>
      ) : (
        <>
          <span className="eyebrow">{spread.subtitle}</span>
          <h1>{spread.name}</h1>
          <p className="lead">{spread.description}</p>
        </>
      )}

      <ol className="step-progress" aria-label="진행 단계">
        {steps.map((s) => {
          const status =
            s.n < stepIndex ? "done" : s.n === stepIndex ? "current" : "todo";
          return (
            <li key={s.n} className={`step-progress__item is-${status}`}>
              <span className="step-progress__num">{s.n}</span>
              <span className="step-progress__label">{s.label}</span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ============================================================
   ASK PANEL — 자유 질문 또는 카테고리 추천 칩
   ============================================================ */
function AskPanel({
  spread,
  category,
  presetQuestion,
  question,
  onChangeQuestion,
  onStart,
}: {
  spread: SpreadDefinition;
  category: Category | undefined;
  presetQuestion: CategoryQuestion | undefined;
  question: string;
  onChangeQuestion: (v: string) => void;
  onStart: () => void;
}) {
  // 추천 질문: 카테고리가 있으면 카테고리 안의 4개, 아니면 spread.suggestions
  const suggestions = category
    ? category.questions.map((q) => q.label)
    : spread.suggestions;

  return (
    <motion.div
      className="question-bar"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <label htmlFor="q">
        <span>🐕 와와에게 묻고 싶은 것</span>
        <span className="optional">선택사항</span>
      </label>
      <input
        id="q"
        type="text"
        placeholder={
          presetQuestion?.label ??
          "예) 지금 그 사람과 나, 어떤 단계에 있는 걸까?"
        }
        value={question}
        onChange={(e) => onChangeQuestion(e.target.value)}
        maxLength={120}
      />

      {suggestions.length > 0 && (
        <div className="suggestions">
          <span className="suggestions__label">
            {category ? `${category.emoji} 자주 듣는 질문` : "추천"}
          </span>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              className={`chip ${question === s ? "is-active" : ""}`}
              onClick={() => onChangeQuestion(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="row">
        <span
          style={{
            color: "var(--c-text-muted)",
            fontSize: "var(--fs-xs)",
            letterSpacing: "0.08em",
          }}
        >
          질문이 없어도 와와는 일단 카드를 펼쳐요
        </span>
        <span className="spacer" />
        <Link to="/" className="btn btn-ghost">
          취소
        </Link>
        <button
          type="button"
          className="btn btn-primary"
          onClick={onStart}
        >
          <span>🐕</span> 와와에게 카드 받기
        </button>
      </div>
    </motion.div>
  );
}

/* ============================================================
   ANALYZING STAGE — 카드 다 뒤집고 결과 보여주기 직전, 1.5s 정도
   "와와가 정밀 분석 중..." + 찌그러지는 와와 + 가짜 진행률
   ============================================================ */
const ANALYZING_LOG = [
  "WAWA NEURAL NET v2.05 부팅...",
  "카드 좌표 스캔 중 ████░░",
  "천사와와 모듈 로딩...",
  "악마와와 모듈 로딩...",
  "희망사항 필터 활성화 (off)",
  "현실 보정 게이지 +12%",
  "라이더-웨이트 78덱 정렬...",
  "월계관 회전 보정...",
  "ERR W4W4-0451: 너무 좋은 결과 의심됨",
  "카드 의도 추출 중 ██████░",
  "톤 검열기: '독설' 차단 OK",
  "최종 응답 정리 중...",
];

function AnalyzingStage() {
  const [progress, setProgress] = useState(0);
  const [logIdx, setLogIdx] = useState(0);
  const [accuracy, setAccuracy] = useState(63.4);

  useEffect(() => {
    const a = window.setInterval(() => {
      setProgress((p) => Math.min(99, p + 6 + Math.random() * 9));
      setAccuracy((v) =>
        Number((v + (Math.random() * 4 - 1.2)).toFixed(1))
      );
    }, 110);
    const b = window.setInterval(() => {
      setLogIdx((i) => (i + 1) % ANALYZING_LOG.length);
    }, 220);
    return () => {
      window.clearInterval(a);
      window.clearInterval(b);
    };
  }, []);

  return (
    <motion.div
      className="analyzing"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="status"
      aria-live="polite"
    >
      <div className="analyzing__head">[ 정밀 진단 중 ]</div>

      <div className="analyzing__visual">
        <img
          src="/images/wawa/wawa-pair.png"
          alt=""
          aria-hidden="true"
          draggable={false}
          className="analyzing__wawa"
        />
      </div>

      <p className="analyzing__title">
        🐕 와와가 당신의 미래를 정밀 분석 중<span className="analyzing__dots" aria-hidden="true">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>

      <div
        className="analyzing__bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress)}
      >
        <div
          className="analyzing__bar-fill"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="analyzing__meta">
        <span>분석 정확도</span>
        <strong>{accuracy.toFixed(1)}%</strong>
        <span className="analyzing__sep">·</span>
        <span className="analyzing__log">{ANALYZING_LOG[logIdx]}</span>
      </div>
    </motion.div>
  );
}

/* ============================================================
   SHUFFLE STAGE
   ============================================================ */
const SHUFFLE_HINTS = [
  "🐕 와와가 카드 냄새 맡는 중...",
  "🐕 카드 섞는 중...",
  "🐕 악마력 충전 중...",
  "🐕 너무 좋은 결과는 의심하는 중...",
  "🐕 카드와 협상 중...",
  "🐕 듣기 좋은 말은 한 번 걸러내는 중...",
];

function ShuffleStage() {
  const cards = [0, 1, 2, 3, 4, 5, 6];
  const hint = useMemo(
    () => SHUFFLE_HINTS[Math.floor(Math.random() * SHUFFLE_HINTS.length)],
    []
  );
  return (
    <div className="deck-stage">
      <div className="shuffle-fan" aria-hidden="true">
        {cards.map((i) => (
          <motion.div
            key={i}
            className="shuffle-card"
            initial={{ y: 0, x: 0, rotate: 0, opacity: 0 }}
            animate={{
              opacity: 1,
              y: [0, -20, 0],
              x: [(i - 3) * 6, (i - 3) * 28, (i - 3) * 6],
              rotate: [(i - 3) * 3, (i - 3) * 15, (i - 3) * 3],
            }}
            transition={{
              opacity: { duration: 0.3, delay: i * 0.04 },
              duration: 1.6,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: i * 0.04,
            }}
            style={{ zIndex: i }}
          >
            <CardBack />
          </motion.div>
        ))}
      </div>
      <motion.p
        className="deck-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        {hint}
      </motion.p>
    </div>
  );
}

/* ============================================================
   PICK STAGE
   ============================================================ */
function PickStage({
  pool,
  pickedIdx,
  targetCount,
  onPick,
}: {
  pool: DrawnCard[];
  pickedIdx: number[];
  targetCount: number;
  onPick: (i: number) => void;
}) {
  const total = pool.length;
  const angleStep = total > 1 ? Math.min(8, 60 / (total - 1)) : 0;
  const startAngle = -((total - 1) * angleStep) / 2;
  const allPicked = pickedIdx.length >= targetCount;

  return (
    <motion.div
      className="pick-stage"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="pick-stage__head">
        <h2 className="pick-stage__title">
          🐕 마음 가는 카드를 골라보세요
        </h2>
        <p
          className="pick-stage__counter"
          style={{ color: "var(--c-text-muted)" }}
        >
          <strong>{pickedIdx.length}</strong>
          <span>/</span>
          <strong>{targetCount}</strong>
          <span style={{ marginLeft: 6 }}>장 — 와와는 재촉하지 않아요</span>
        </p>
      </div>

      <div className="pick-fan">
        {pool.map((_, i) => {
          const angle = startAngle + i * angleStep;
          const baseTransform = `rotate(${angle.toFixed(2)}deg)`;
          const isPicked = pickedIdx.includes(i);
          const dim = allPicked && !isPicked;
          return (
            <motion.div
              key={i}
              className={[
                "pick-card",
                isPicked ? "is-picked" : "",
                dim ? "is-dimmed" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                {
                  zIndex: i,
                  ["--pick-base-transform" as string]: baseTransform,
                } as React.CSSProperties
              }
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: "easeOut",
              }}
              onClick={() => !isPicked && !allPicked && onPick(i)}
              role="button"
              tabIndex={isPicked || dim ? -1 : 0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (!isPicked && !allPicked) onPick(i);
                }
              }}
              aria-label={`카드 ${i + 1}`}
            >
              <div className="pick-card__inner">
                <CardBack />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ============================================================
   SPREAD BOARD
   ============================================================ */
function SpreadBoard({
  spread,
  cards,
  revealed,
  onClickCard,
}: {
  spread: SpreadDefinition;
  cards: DrawnCard[];
  revealed: boolean[];
  onClickCard: (i: number) => void;
}) {
  if (cards.length === 0) return null;
  const colsClass =
    spread.count === 1 ? "cols-1" : spread.count === 3 ? "cols-3" : "cols-5";
  const size = spread.count >= 5 ? "sm" : spread.count >= 3 ? "md" : "lg";

  return (
    <div className={`spread-row ${colsClass}`}>
      {cards.map((c, i) => (
        <motion.div
          className="slot"
          key={i}
          initial={{ opacity: 0, y: -40, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: i * 0.12,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          <span className="position-label">{spread.positions[i]?.label}</span>
          <div className={`card-wrap ${revealed[i] ? "is-revealed" : ""}`}>
            <TarotCardView
              drawn={c}
              revealed={revealed[i] ?? false}
              onClick={() => onClickCard(i)}
              size={size}
              delay={0}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================
   READING RESULT — 천사+악마 둘 다 노출 (기본) + 다중 별점 + 한 줄 결론
   ============================================================ */
function ReadingResult({
  spread,
  category,
  questionId,
  cards,
  question,
  view,
  onChangeView,
  onReshuffle,
  onReset,
}: {
  spread: SpreadDefinition;
  category: Category | undefined;
  questionId: string | undefined;
  cards: DrawnCard[];
  question: string;
  view: ResultView;
  onChangeView: (v: ResultView) => void;
  onReshuffle: () => void;
  onReset: () => void;
}) {
  const intensity = useMemo(
    () => buildIntensity(cards, spread.id),
    [cards, spread.id]
  );
  const lucky = useMemo(() => buildLucky(cards), [cards]);
  // 카테고리가 있으면 다중 별점 + 한 줄 결론
  const conclusion = useMemo(
    () => (category ? buildConclusion(cards, category, questionId) : null),
    [cards, category, questionId]
  );

  const handleShare = async () => {
    const lines: string[] = [];
    if (category)
      lines.push(`${category.emoji} ${category.name} · ${question || category.name}`);
    else if (question) lines.push(`🐕 ${question}`);
    if (conclusion) {
      lines.push("");
      lines.push(`"${conclusion.oneLine}"`);
      lines.push("");
      conclusion.stars.forEach((s) =>
        lines.push(`${s.label} ${formatStars5(s.stars)}`)
      );
    }
    lines.push("");
    lines.push(conclusion?.hashtag ?? "#와와타로");

    const text = lines.join("\n");
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: "와와타로", text });
        return;
      } catch {
        // user cancel
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // ignore
      }
    }
  };

  return (
    <motion.section
      className="reading-summary"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <header>
        <span className="meta">
          {category
            ? `${category.emoji} ${category.name}`
            : `${spread.name} · ${spread.subtitle}`}
        </span>
        {question && <p className="question">"{question}"</p>}
      </header>

      {conclusion && (
        <motion.blockquote
          className="wawa-oneline"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="wawa-oneline__mark">"</span>
          {conclusion.oneLine}
        </motion.blockquote>
      )}

      <ViewToggle view={view} onChange={onChangeView} />

      {!conclusion && <IntensityGauge intensity={intensity} />}

      <div className="reading-card-list">
        {cards.map(({ card, reversed }, i) => {
          const keywords = reversed ? card.keywordsRev : card.keywords;
          const angelText = getVoice(card, "angel", reversed);
          const demonText = getVoice(card, "demon", reversed);
          const pos = spread.positions[i];
          return (
            <motion.article
              key={card.id + i}
              className={`reading-card-detail ${reversed ? "is-reversed" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.4 + i * 0.18,
                ease: "easeOut",
              }}
            >
              <div className="thumb">
                <img
                  src={card.image}
                  alt={card.name}
                  style={{ transform: reversed ? "rotate(180deg)" : undefined }}
                />
              </div>
              <div>
                {pos && (
                  <p className="position">
                    {pos.label} · {pos.hint}
                  </p>
                )}
                <h3>
                  {card.name}
                  {reversed && <span className="reversed-tag">Reversed</span>}
                </h3>
                <p className="name-en">{card.nameEn}</p>
                <motion.div
                  className="keywords"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.5 + i * 0.18,
                      },
                    },
                  }}
                >
                  {keywords.map((k) => (
                    <motion.span
                      key={k}
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        show: { opacity: 1, y: 0 },
                      }}
                    >
                      {k}
                    </motion.span>
                  ))}
                </motion.div>
                <CardVoiceBlock
                  view={view}
                  angel={angelText}
                  demon={demonText}
                />
              </div>
            </motion.article>
          );
        })}
      </div>

      {conclusion && (
        <motion.div
          className="star-grid"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.6 }}
          aria-label="다중 별점"
        >
          {conclusion.stars.map((s) => (
            <div key={s.key} className="star-grid__row">
              <span className="star-grid__label">{s.label}</span>
              <span className="star-grid__stars" aria-hidden="true">
                {formatStars5(s.stars)}
              </span>
              <span className="visually-hidden">{s.stars} / 5</span>
            </div>
          ))}
        </motion.div>
      )}

      <LuckyGrid lucky={lucky} />

      <motion.p
        className="wawa-disclaimer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.95 }}
      >
        ※ 와와는 점쟁이가 아닙니다. 카드를 읽을 뿐이에요. <br />
        결정은 결국 당신의 몫이고, 와와는 그걸 존중합니다.
      </motion.p>

      <div className="actions-row">
        <button type="button" className="btn btn-ghost" onClick={onReshuffle}>
          다시 뽑기
        </button>
        <button type="button" className="btn btn-ghost" onClick={handleShare}>
          공유하기
        </button>
        <button type="button" className="btn btn-primary" onClick={onReset}>
          다른 질문 하기
        </button>
        <Link to="/" className="btn btn-ghost">
          홈으로
        </Link>
      </div>
    </motion.section>
  );
}

/* ============================================================
   SUB COMPONENTS
   ============================================================ */
function IntensityGauge({
  intensity,
}: {
  intensity: ReturnType<typeof buildIntensity>;
}) {
  return (
    <motion.div
      className="gauge"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
    >
      <div className="gauge__head">
        <span className="gauge__label">{intensity.label}</span>
        <span className="gauge__value">{intensity.value}%</span>
      </div>
      <div className="gauge__track">
        <motion.div
          className={`gauge__fill gauge__fill--${intensity.category}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: intensity.value / 100 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          style={{ width: "100%" }}
        />
      </div>
    </motion.div>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: ResultView;
  onChange: (v: ResultView) => void;
}) {
  const items: { value: ResultView; emoji: string; label: string }[] = [
    { value: "both", emoji: "✨", label: "둘 다" },
    { value: "angel", emoji: "😇", label: "천사와와" },
    { value: "demon", emoji: "😈", label: "악마와와" },
  ];

  return (
    <div className="view-toggle" role="tablist" aria-label="해석 시선 선택">
      {items.map((it) => {
        const active = view === it.value;
        return (
          <button
            key={it.value}
            type="button"
            role="tab"
            aria-selected={active}
            className={`view-toggle__btn ${active ? "is-active" : ""} view-toggle__btn--${it.value}`}
            onClick={() => onChange(it.value)}
          >
            <span className="view-toggle__emoji">{it.emoji}</span>
            <span>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function CardVoiceBlock({
  view,
  angel,
  demon,
}: {
  view: ResultView;
  angel: string;
  demon: string;
}) {
  if (view === "angel") {
    return (
      <p className="voice voice--angel">
        <span className="voice__tag">😇 천사와와</span>
        <span className="voice__text">{angel}</span>
      </p>
    );
  }
  if (view === "demon") {
    return (
      <p className="voice voice--demon">
        <span className="voice__tag">😈 악마와와</span>
        <span className="voice__text">{demon}</span>
      </p>
    );
  }
  return (
    <div className="voice-pair">
      <p className="voice voice--angel">
        <span className="voice__tag">😇 천사와와</span>
        <span className="voice__text">{angel}</span>
      </p>
      <p className="voice voice--demon">
        <span className="voice__tag">😈 악마와와</span>
        <span className="voice__text">{demon}</span>
      </p>
    </div>
  );
}

function LuckyGrid({ lucky }: { lucky: ReturnType<typeof buildLucky> }) {
  const items = [
    {
      label: "Lucky Color",
      value: (
        <>
          <span
            className="lucky__color-dot"
            style={{ background: lucky.color.hex, color: lucky.color.hex }}
          />
          <span>{lucky.color.name}</span>
        </>
      ),
    },
    { label: "Lucky Number", value: <span>{lucky.number}</span> },
    { label: "Lucky Time", value: <span>{lucky.time}</span> },
    { label: "Lucky Direction", value: <span>{lucky.direction}</span> },
    ...lucky.extras.map((e) => ({
      label: e.label,
      value: <span>{e.value}</span>,
    })),
  ];

  return (
    <motion.div
      className="lucky"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="lucky__head">오늘의 행운</div>
      <div className="lucky__grid">
        {items.map((it, i) => (
          <motion.div
            key={i}
            className="lucky__item"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 + i * 0.06 }}
          >
            <span className="lucky__item-label">{it.label}</span>
            <span className="lucky__item-value">{it.value}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
