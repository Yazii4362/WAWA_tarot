import { useState } from "react";
import { motion } from "framer-motion";
import type { SpreadDefinition } from "../../data/spreads";
import type { DrawnCard } from "../../utils/tarot";
import { TwinCommentary } from "./TwinCommentary";

/**
 * 결과 페이지 본체.
 *
 *  ┌ Intro      : 작은 메타 + 사용자 질문
 *  ├ TwinPanels : 천사/악마 좌우 비교가 결과의 메인
 *  ├ Disclaimer : 한 줄
 *  └ CTA bar    : "다른 고민도 물어보고 싶다면?" + 공유 + 다시 뽑기
 *
 * 게이지 / 카드별 상세 / 럭키 / 뷰 토글은 모두 제거됨.
 * 한 화면에서 천사·악마를 동시에 보는 게 이 페이지의 본질.
 */
export function ReadingResult({
  spread,
  cards,
  question,
  onReshuffle,
  onReset,
}: {
  spread: SpreadDefinition;
  cards: DrawnCard[];
  question: string;
  onReshuffle: () => void;
  onReset: () => void;
}) {
  return (
    <motion.section
      className="result-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <ResultIntro spread={spread} question={question} />

      <TwinCommentary spread={spread} cards={cards} />

      <p className="result-disclaimer">
        ※ 와와는 점쟁이가 아닙니다. 카드를 읽어줄 뿐이에요. 결정은 결국 당신의 몫이에요.
      </p>

      <ResultCta
        spread={spread}
        question={question}
        onReshuffle={onReshuffle}
        onReset={onReset}
      />
    </motion.section>
  );
}

/* ───────── Intro ───────── */

function ResultIntro({
  spread,
  question,
}: {
  spread: SpreadDefinition;
  question: string;
}) {
  return (
    <header className="result-intro">
      <span className="result-intro__eyebrow">🐕 와와의 한 마디</span>
      <h2 className="result-intro__title">
        {question ? `"${question}"` : `"${spread.name}을 펼쳤어요"`}
      </h2>
      <span className="result-intro__meta">
        {spread.name} · {spread.subtitle} · {spread.count}장
      </span>
    </header>
  );
}

/* ───────── Bottom CTA ─────────
 *
 * "다른 고민도 물어보고 싶다면?" 메시지 + 공유 + 다시 뽑기 두 액션.
 * "다시 뽑기"는 같은 질문 재셔플(onReshuffle)을 사용한다.
 * 새 질문은 헤더의 홈 링크 또는 onReset(다른 질문 모드)로 분리.
 */
function ResultCta({
  spread,
  question,
  onReshuffle,
  onReset,
}: {
  spread: SpreadDefinition;
  question: string;
  onReshuffle: () => void;
  onReset: () => void;
}) {
  const [shareState, setShareState] = useState<"idle" | "shared" | "copied">(
    "idle"
  );

  const handleShare = async () => {
    if (typeof navigator === "undefined") return;
    const url = window.location.href;
    const title = `🐕 와와의 한 마디 — ${spread.name}`;
    const text = question
      ? `"${question}" · ${spread.name}`
      : `${spread.name} · ${spread.subtitle}`;
    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title, text, url });
        setShareState("shared");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareState("copied");
      } else {
        return;
      }
    } catch {
      return;
    }
    setTimeout(() => setShareState("idle"), 2000);
  };

  const shareStatus =
    shareState === "shared"
      ? "✓ 공유했어요"
      : shareState === "copied"
        ? "✓ 링크 복사됨"
        : "";

  return (
    <div className="result-cta">
      <div className="result-cta__msg">
        <span className="result-cta__msg-icon" aria-hidden="true">
          🐕
        </span>
        <div>
          <span className="result-cta__title">다른 고민도 물어보고 싶다면?</span>
          <span className="result-cta__sub">와와는 늘 그 자리에 있어요</span>
        </div>
      </div>

      <div className="result-cta__actions">
        <button
          type="button"
          className="result-cta__img-btn"
          onClick={handleShare}
          aria-label="결과 공유하기"
        >
          <img
            src="/images/ui/btn-share.webp"
            alt=""
            draggable={false}
            width={220}
            height={74}
          />
        </button>
        <button
          type="button"
          className="result-cta__img-btn"
          onClick={onReset}
          aria-label="다시 뽑기 — 다른 질문으로"
        >
          <img
            src="/images/ui/btn-again.webp"
            alt=""
            draggable={false}
            width={220}
            height={74}
          />
        </button>
        {shareStatus && (
          <span className="result-cta__share-status" aria-live="polite">
            {shareStatus}
          </span>
        )}
        <button
          type="button"
          className="result-cta__btn-mini"
          onClick={onReshuffle}
          title="같은 질문으로 카드만 다시"
        >
          같은 질문으로 재셔플
        </button>
      </div>
    </div>
  );
}
