
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import CatalogPage from "./pages/CatalogPage";
import FinderPage from "./pages/FinderPage";
import ArticlePage from "./pages/ArticlePage";
import DashboardPage from "./pages/DashboardPage";
import HerbDetailPage from "./pages/HerbDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/catalog"
            element={<CatalogPage />}
          />

          <Route
            path="/finder"
            element={<FinderPage />}
          />

          <Route
            path="/article"
            element={<ArticlePage />}
          />

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/herbs/:id"
            element={<HerbDetailPage />}
          />

          <Route
            path="*"
            element={
              <div className="section">
                <h1>404</h1>
                <p>Halaman tidak ditemukan.</p>
              </div>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
