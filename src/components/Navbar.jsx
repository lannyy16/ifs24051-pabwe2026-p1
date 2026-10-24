
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <Link to="/" className="navbar-brand">
        <span>🌿</span>
        HerbaNusantara
      </Link>

      <nav className="navbar-menu">
        {user ? (
          <>
            <span className="navbar-user">
              Halo, {user.name}
            </span>

            <button
              className="logout-button"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link
              to="/register"
              className="register-button"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
