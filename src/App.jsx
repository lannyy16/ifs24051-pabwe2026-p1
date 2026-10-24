
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  AuthProvider,
  useAuth
} from "./context/AuthContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

// ========================================
// PROTECTED ROUTE
// Halaman hanya bisa diakses jika sudah login
// ========================================

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// ========================================
// PUBLIC ROUTE
// Login dan Register hanya untuk pengguna
// yang belum login
// ========================================

function PublicRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

// ========================================
// APP ROUTES
// ========================================

function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* HALAMAN UTAMA */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* HALAMAN LOGIN */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* HALAMAN REGISTER */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* HALAMAN TIDAK DITEMUKAN */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

// ========================================
// MAIN APP
// ========================================

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}
