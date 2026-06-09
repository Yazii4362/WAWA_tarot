import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { CloudField } from "./CloudField";
import { WawaLogoMark } from "./WawaLogoMark";
import { categories } from "../data/categories";

export function Layout() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 라우트 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <div className="app-shell">
      <CloudField count={7} />

      <header className={`app-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="app-header__inner">
          <Link to="/" className="brand" aria-label="와와타로 홈으로">
            <WawaLogoMark className="brand__mark" size={40} />
            <span className="brand__word">
              <span className="brand__word-en">WAWATAROT</span>
              <span className="brand__word-ko">와와타로</span>
            </span>
          </Link>

          <button
            type="button"
            className={`nav-toggle ${menuOpen ? "is-open" : ""}`}
            aria-label="메뉴 열기"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>

          <nav
            className={`nav ${menuOpen ? "is-open" : ""}`}
            aria-label="메인 메뉴"
          >
            <NavLink to="/" end className="nav__link">
              홈
            </NavLink>
            {categories
              .filter((c) => c.id !== "today")
              .map((c) => (
                <NavLink
                  key={c.id}
                  to={`/c/${c.id}`}
                  className={`nav__link nav__link--${c.accent}`}
                >
                  <span className="nav__dot" aria-hidden="true" />
                  {c.name}
                </NavLink>
              ))}
            <NavLink to="/about" className="nav__link nav__link--about">
              와와 소개
            </NavLink>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>
          WAWATAROT · 카드가 보여준 만큼만 말하겠습니다 · ⓒ{" "}
          {new Date().getFullYear()}
        </p>
        <p style={{ fontSize: "var(--fs-xs)", opacity: 0.7, marginTop: 4 }}>
          ※ 와와는 점쟁이가 아닙니다. 카드를 읽을 뿐입니다.
        </p>
      </footer>
    </div>
  );
}
