import { Link, NavLink, Outlet } from "react-router-dom";
import { CloudField } from "./CloudField";
import { categories } from "../data/categories";

export function Layout() {
  return (
    <div className="app-shell">
      <CloudField count={7} />
      <header className="app-header">
        <Link to="/" className="brand" aria-label="홈으로">
          <span className="brand-mark" aria-hidden="true">
            🐕
          </span>
          <span>와와타로</span>
        </Link>
        <nav className="nav" aria-label="메인 메뉴">
          <NavLink to="/" end>
            홈
          </NavLink>
          {categories
            .filter((c) => c.id !== "today")
            .map((c) => (
              <NavLink key={c.id} to={`/c/${c.id}`}>
                <span aria-hidden="true">{c.emoji}</span> {c.name}
              </NavLink>
            ))}
          <NavLink to="/about">와와 소개</NavLink>
        </nav>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>
          🐕 와와타로 · 카드가 보여준 만큼만 말하겠습니다 · ⓒ{" "}
          {new Date().getFullYear()}
        </p>
        <p style={{ fontSize: "var(--fs-xs)", opacity: 0.7, marginTop: 4 }}>
          ※ 와와는 점쟁이가 아닙니다. 카드를 읽을 뿐입니다.
        </p>
      </footer>
    </div>
  );
}
