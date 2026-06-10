import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { WawaMascot } from "../components/WawaMascot";

export function About() {
  return (
    <div className="about">
      {/* === Hero === */}
      <section className="about-hero">
        <motion.div
          className="about-hero__visual"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <WawaMascot mode="pair" />
        </motion.div>

        <motion.span
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          🐕 와와타로 · wawatarot
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        >
          카드는 거짓말을 못합니다. <em>와와도 마찬가지입니다.</em>
        </motion.h1>

        <motion.p
          className="lead"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        >
          와와타로는 78장의 라이더 웨이트 타로 카드로 지금 당신의 상황을
          읽습니다.
          <br />
          듣기 좋은 말을 골라서 드리지 않습니다. 겁을 줘서 불안하게 만들지도
          않습니다.
          <br />
          카드가 보여주는 것만, 정확히 그만큼만 이야기합니다.
        </motion.p>
      </section>

      {/* === 사용 방법 === */}
      <motion.section
        className="about-block"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="about-block__head">
          <span className="about-block__badge">📖</span>
          <h2>사용 방법</h2>
        </div>
        <ol className="about-steps">
          <li>
            <span className="about-steps__num">01</span>
            <p>
              지금 제일 마음에 걸리는 질문을 하나 고르십시오. <br />
              연애도 되고, 학교도 되고, 직장도 되고,{" "}
              <em>"요즘 내가 왜 이러지"</em> 싶은 것도 됩니다.
            </p>
          </li>
          <li>
            <span className="about-steps__num">02</span>
            <p>
              질문을 정했으면 생각을 잠깐 멈추고 끌리는 카드 하나를 뽑습니다.
            </p>
          </li>
          <li>
            <span className="about-steps__num">03</span>
            <p>
              그 다음에는 <strong>😇 천사와와</strong> 와{" "}
              <strong>😈 악마와와</strong> 중에 오늘 누구에게 물어볼지 고릅니다.
              <br />
              같은 카드인데 누가 읽느냐에 따라 이야기가 달라집니다.
            </p>
          </li>
        </ol>
      </motion.section>

      {/* === 와와타로의 관점 === */}
      <motion.section
        className="about-block"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="about-block__head">
          <span className="about-block__badge">✨</span>
          <h2>와와타로의 관점</h2>
        </div>
        <p className="about-block__lead">
          와와타로에는 같은 카드를 읽는 <strong>두 가지 시선</strong>이 있습니다.
        </p>

        <div className="about-pair">
          <article className="about-pair__card about-pair__card--angel">
            <div className="about-pair__visual">
              <WawaMascot mode="angel" shadow={false} />
            </div>
            <div className="about-pair__body">
              <header>
                <span className="about-pair__emoji" aria-hidden="true">
                  😇
                </span>
                <h3>천사와와</h3>
                <span className="about-pair__sub">가능성을 봅니다</span>
              </header>
              <p>
                카드 안에서 <strong>가능성이 열려 있는 쪽</strong>을 읽습니다.
                지금 당신이 미처 보지 못하고 있을 수 있는{" "}
                <em>기회와 희망의 맥락</em>을 짚어줍니다.
              </p>
            </div>
          </article>

          <article className="about-pair__card about-pair__card--demon">
            <div className="about-pair__visual">
              <WawaMascot mode="demon" shadow={false} />
            </div>
            <div className="about-pair__body">
              <header>
                <span className="about-pair__emoji" aria-hidden="true">
                  😈
                </span>
                <h3>악마와와</h3>
                <span className="about-pair__sub">리스크를 봅니다</span>
              </header>
              <p>
                카드 안에서 <strong>조심해야 할 쪽</strong>을 읽습니다. 지금
                당신이 알고 있지만 <em>외면하고 싶은 현실의 맥락</em>을
                짚어줍니다.
              </p>
            </div>
          </article>
        </div>

        <div className="about-example">
          <span className="about-example__title">
            💡 재회운에서 같은 카드를 뽑았을 때
          </span>
          <ul>
            <li>
              <span className="about-example__tag about-example__tag--angel">
                😇 천사와와
              </span>
              <span className="about-example__quote">
                "아직 완전히 끝난 인연처럼 보이지는 않습니다."
              </span>
            </li>
            <li>
              <span className="about-example__tag about-example__tag--demon">
                😈 악마와와
              </span>
              <span className="about-example__quote">
                "끝나지 않은 감정과 끝나지 않은 관계는 다른 이야기입니다."
              </span>
            </li>
          </ul>
          <p className="about-example__close">
            둘 다 틀린 말이 아닙니다. <br />
            <strong>어느 쪽을 먼저 볼지는 오늘의 당신이 결정합니다.</strong>
          </p>
        </div>
      </motion.section>

      <motion.div
        className="about-cta"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link to="/reading/one" className="btn btn-primary">
          🐕 와와에게 카드 한 장 받기
        </Link>
      </motion.div>
    </div>
  );
}
