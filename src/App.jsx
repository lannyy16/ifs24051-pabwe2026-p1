import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Layout from "./components/layout/Layout.jsx";

import HomePage from "./pages/HomePage.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import HerbDetailPage from "./pages/HerbDetailPage.jsx";
import FinderPage from "./pages/FinderPage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// Kembali ke atas setiap kali pindah halaman
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/herbs/:id" element={<HerbDetailPage />} />
        <Route path="/finder" element={<FinderPage />} />
        <Route path="/article" element={<ArticlePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
