import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getCategory } from "../data/categories";

export function Category() {
  const { categoryId = "" } = useParams<{ categoryId: string }>();
  const category = getCategory(categoryId);

  if (!category) return <Navigate to="/" replace />;

  return (
    <div className={`category category--${category.accent}`}>
      <motion.section
        className="category__hero"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Link to="/" className="category__back">
          ← 홈으로
        </Link>
        <span className="category__emoji" aria-hidden="true">
          {category.emoji}
        </span>
        <h1>{category.name}</h1>
        <p className="category__tagline">{category.tagline}</p>
        <p className="category__desc">{category.description}</p>
      </motion.section>

      <section
        className="category__grid"
        aria-label={`${category.name} 카테고리의 질문 목록`}
      >
        {category.questions.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.06,
              ease: "easeOut",
            }}
          >
            <Link
              to={`/reading?cat=${category.id}&q=${q.id}`}
              className="question-card"
            >
              <span className="question-card__index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="question-card__body">
                <h3>{q.label}</h3>
                {q.hint && <p>{q.hint}</p>}
              </div>
              <span className="question-card__cta" aria-hidden="true">
                →
              </span>
            </Link>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
