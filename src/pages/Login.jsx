
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const result = login(email.trim(), password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/", { replace: true });
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-icon">🌿</div>

        <h1>Selamat Datang</h1>

        <p className="auth-description">
          Login untuk menjelajahi dunia tanaman herbal
          bersama HerbaNusantara.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          {error && (
            <p className="auth-error">{error}</p>
          )}

          <button className="auth-button" type="submit">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Belum punya akun?{" "}
          <Link to="/register">Daftar sekarang</Link>
        </p>
      </section>
    </main>
  );
}
