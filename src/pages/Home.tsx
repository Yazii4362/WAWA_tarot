import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WawaLogoMark } from "../components/WawaLogoMark";
import { WawaMascot } from "../components/WawaMascot";
import { categories } from "../data/categories";

/**
 * Home — 와와타로 랜딩
 *  ┌ Hero        : 로고 + 마스코트 + 카피 + 자유 진입 CTA
 *  └ Categories  : 4개 카테고리 카드 — 메인에서 바로 질문 고르기
 */
export function Home() {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
    </div>
  );
}

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
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="home-cats">
      <motion.header
        className="home-sec-head"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="home-sec-head__eyebrow">Ask Wawa</div>
        <h2 className="home-sec-head__title">
          오늘은 <span>무엇이 마음에</span> 걸리세요?
        </h2>
        <p className="home-sec-head__sub">
          카테고리 하나를 골라보세요. 자주 듣는 질문부터 보여줍니다.
        </p>
      </motion.header>

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
