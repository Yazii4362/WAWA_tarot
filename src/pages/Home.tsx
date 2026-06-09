import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "../data/categories";
import { CardBack } from "../components/CardBack";
import { WawaMascot } from "../components/WawaMascot";

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
    <section className="hero hero--showcase">
      <div className="hero__orbs" aria-hidden="true">
        <span className="hero__orb hero__orb--a" />
        <span className="hero__orb hero__orb--b" />
        <span className="hero__orb hero__orb--c" />
      </div>

      <div className="hero__stage" aria-hidden="true">
        <motion.div
          className="hero__floating-card hero__floating-card--left"
          initial={{ opacity: 0, x: -40, rotate: -28 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -10, 0],
            rotate: [-18, -22, -18],
          }}
          transition={{
            opacity: { duration: 1, ease: "easeOut" },
            x: { duration: 1, ease: "easeOut" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <CardBack />
        </motion.div>

        <motion.div
          className="hero__mascot"
          initial={{ opacity: 0, y: 40, scale: 0.85 }}
          animate={{
            opacity: 1,
            y: [0, -12, 0],
            scale: 1,
          }}
          transition={{
            opacity: { duration: 0.9, delay: 0.15, ease: "easeOut" },
            scale: { duration: 0.9, delay: 0.15, ease: "easeOut" },
            y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <WawaMascot />
        </motion.div>

        <motion.div
          className="hero__floating-card hero__floating-card--right"
          initial={{ opacity: 0, x: 40, rotate: 28 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -8, 0],
            rotate: [18, 22, 18],
          }}
          transition={{
            opacity: { duration: 1, delay: 0.3, ease: "easeOut" },
            x: { duration: 1, delay: 0.3, ease: "easeOut" },
            y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 9, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <CardBack />
        </motion.div>
      </div>

      <span className="eyebrow">🐕 WAWATAROT · 까칠한 동네 치와와 철학자</span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        카드가 <em>보여준 만큼만</em> 말하겠습니다.
      </motion.h1>

      <motion.p
        className="lead"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
      >
        희망사항 말고 가능성을 봅니다. 듣기 좋은 말은 전문이 아닙니다.
        <br />
        지금 가장 마음에 걸리는 한 가지를 골라보세요.
      </motion.p>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section className="categories">
      <div className="section-eyebrow">Ask Wawa</div>
      <h2 className="section-title">
        오늘 와와에게 <span>물어보고 싶은 것</span>
      </h2>
      <p className="section-sub">
        카테고리를 고르면 와와가 자주 듣는 질문을 보여줍니다. 자유 질문도 가능해요.
      </p>

      <div className="categories__grid">
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
              className={`category-card category-card--${c.accent}`}
            >
              <span className="category-card__emoji" aria-hidden="true">
                {c.emoji}
              </span>
              <div className="category-card__body">
                <h3>{c.name}</h3>
                <p className="category-card__tagline">{c.tagline}</p>
                <p className="category-card__desc">{c.description}</p>
              </div>
              <ul className="category-card__hints">
                {c.questions.slice(0, 3).map((q) => (
                  <li key={q.id}>· {q.label}</li>
                ))}
                {c.questions.length > 3 && (
                  <li className="category-card__more">
                    + {c.questions.length - 3}개 더
                  </li>
                )}
              </ul>
              <span className="category-card__cta">시작하기 →</span>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="categories__free">
        <Link to="/reading" className="btn btn-ghost">
          또는, 자유 질문으로 시작하기 →
        </Link>
      </div>
    </section>
  );
}
