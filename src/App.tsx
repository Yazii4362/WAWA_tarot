import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Reading } from "./pages/Reading";
import { Category } from "./pages/Category";
import { About } from "./pages/About";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="c/:categoryId" element={<Category />} />
          <Route path="reading" element={<Reading />} />
          <Route path="reading/:spreadId" element={<Reading />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="center-text" style={{ padding: 60 }}>
      <h2>존재하지 않는 페이지입니다</h2>
      <p style={{ marginTop: 8 }}>홈으로 돌아가 다시 시작해 보세요.</p>
    </div>
  );
}

export default App;
