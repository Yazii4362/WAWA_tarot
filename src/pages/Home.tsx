import { Link } from "react-router-dom";
<<<<<<< HEAD
import { motion } from "framer-motion";
import { spreads } from "../data/spreads";
import { CardBack } from "../components/CardBack";
import { WawaMascot } from "../components/WawaMascot";
=======
import { categories } from "../data/categories";
>>>>>>> fdc6cefde1f97ad2e1094d3ffec46b90d4c40713

/**
 * Home — 와와타로 랜딩페이지 (간소화 버전)
 */
export function Home() {
  return (
<<<<<<< HEAD
    <div>
      <HeroSection />
      <SpreadSection />
      <CtaBanner />
=======
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>와와타로 🐕</h1>
      <p>카드가 보여준 만큼만 말하겠습니다</p>
      
      <div style={{ marginTop: "40px" }}>
        <h2>카테고리</h2>
        <div style={{ display: "grid", gap: "20px", marginTop: "20px", maxWidth: "800px", margin: "20px auto" }}>
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/c/${c.id}`}
              style={{
                padding: "20px",
                border: "2px solid #ddd",
                borderRadius: "12px",
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <div style={{ fontSize: "40px", marginBottom: "10px" }}>{c.emoji}</div>
              <h3>{c.name}</h3>
              <p style={{ fontSize: "14px", color: "#666" }}>{c.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
>>>>>>> fdc6cefde1f97ad2e1094d3ffec46b90d4c40713
    </div>
  );
}


/* ============================================================
   1. HERO
   ============================================================ */
function HeroSection() {
  return (
    <section className="home-hero">
      <motion.div
        className="home-hero__logo"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <WawaLogoMark size={120} />
      </motion.div>

      <motion.div
        className="home-hero__mascot"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "100%", height: "100%" }}
        >
          <WawaMascot mode="pair" />
        </motion.div>
      </motion.div>

      <motion.div
        className="home-hero__copy"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
      >
        <h1 className="home-hero__title">
          카드가 <em>보여준 만큼만</em> 말하겠습니다.
        </h1>
        <p className="home-hero__lead">
          희망사항 말고 가능성을 봅니다. 듣기 좋은 말은 전문이 아닙니다.
        </p>
      </motion.div>

      <motion.div
        className="home-hero__cta"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
      >
        <Link to="/reading" className="btn btn-primary btn-lg">
          🐕 와와에게 카드 한 장 받기
        </Link>
      </motion.div>

      <motion.div
        className="home-hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        aria-hidden="true"
      >
        <span className="home-hero__scroll-text">SCROLL</span>
        <span className="home-hero__scroll-line" />
      </motion.div>
    </section>
  );
}

/* ============================================================
   2. DUAL VOICE — 천사와와 vs 악마와와
   ============================================================ */
function DualVoiceSection() {
  return (
    <section className="home-dual">
      <SectionHeader
        eyebrow="Dual Voice"
        title={
          <>
            한 카드. <span>두 가지 시선.</span>
          </>
        }
        sub="같은 카드라도 누가 읽느냐에 따라 이야기가 달라집니다."
      />

      <div className="home-dual__grid">
        <DualCol
          mode="angel"
          name="천사와와"
          tag="가능성을 봅니다"
          quote="아직 완전히 끝난 인연처럼 보이지는 않습니다."
          desc="지금 당신이 미처 보지 못하고 있을 수 있는 기회와 희망의 맥락을 짚어줍니다."
        />
        <DualCol
          mode="demon"
          name="악마와와"
          tag="리스크를 봅니다"
          quote="끝나지 않은 감정과 끝나지 않은 관계는 다른 이야기입니다."
          desc="지금 당신이 알고 있지만 외면하고 싶은 현실의 맥락을 짚어줍니다."
        />
      </div>
    </section>
  );
}

function DualCol({
  mode,
  name,
  tag,
  quote,
  desc,
}: {
  mode: "angel" | "demon";
  name: string;
  tag: string;
  quote: string;
  desc: string;
}) {
  return (
    <motion.article
      className={`home-dual__col home-dual__col--${mode}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="home-dual__visual">
        <WawaMascot mode={mode} />
      </div>
      <div className="home-dual__name">{name}</div>
      <div className="home-dual__tag">{tag}</div>
      <blockquote className="home-dual__quote">「 {quote} 」</blockquote>
      <p className="home-dual__desc">{desc}</p>
    </motion.article>
  );
}

/* ============================================================
   3. CATEGORIES
   ============================================================ */
function CategoriesSection() {
  return (
    <section className="home-cats">
      <SectionHeader
        eyebrow="Ask Wawa"
        title={
          <>
            오늘은 <span>무엇이 마음에</span> 걸리세요?
          </>
        }
        sub="카테고리 하나를 골라보세요. 자주 듣는 질문부터 보여줍니다."
      />

      <div className="home-cats__grid">
        {categories.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
          >
            <Link
              to={`/c/${c.id}`}
              className={`home-cat home-cat--${c.accent}`}
            >
              <span className="home-cat__emoji" aria-hidden="true">
                {c.emoji}
              </span>
              <h3 className="home-cat__name">{c.name}</h3>
              <p className="home-cat__tag">{c.tagline}</p>
              <span className="home-cat__cta">시작하기 →</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   4. HOW IT WORKS — 3 step
   ============================================================ */
const STEPS = [
  {
    n: "01",
    title: "질문을 골라요",
    desc: "지금 가장 마음에 걸리는 한 가지를 고릅니다.",
  },
  {
    n: "02",
    title: "카드 한 장을 뽑아요",
    desc: "78장의 라이더-웨이트 덱에서 한 장을 직접 뽑습니다.",
  },
  {
    n: "03",
    title: "두 시선으로 듣습니다",
    desc: "천사와와는 가능성을, 악마와와는 리스크를 짚어줍니다.",
  },
];

function HowItWorksSection() {
  return (
    <section className="home-how">
      <SectionHeader
        eyebrow="How it works"
        title={
          <>
            이렇게 <span>와와에게</span> 묻습니다
          </>
        }
      />

      <div className="home-how__steps">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            className="home-how__step"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          >
            <span className="home-how__num">{s.n}</span>
            <h4 className="home-how__title">{s.title}</h4>
            <p className="home-how__desc">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   5. FINAL CTA
   ============================================================ */
function FinalCtaSection() {
  return (
    <section className="home-cta">
      <motion.div
        className="home-cta__inner"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="home-cta__quote">
          지금 가장 마음에 걸리는 <span>한 가지</span>를 고르세요.
        </p>
        <Link to="/reading" className="btn btn-primary btn-lg">
          와와에게 묻기 →
        </Link>
      </motion.div>
    </section>
  );
}

/* ============================================================
   Section Header (공용)
   ============================================================ */
function SectionHeader({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
}) {
  return (
    <header className="home-sec-head">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="home-sec-head__eyebrow">{eyebrow}</div>
        <h2 className="home-sec-head__title">{title}</h2>
        {sub && <p className="home-sec-head__sub">{sub}</p>}
      </motion.div>
    </header>
  );
}
