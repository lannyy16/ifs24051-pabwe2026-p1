
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }

    const result = register(
      name.trim(),
      email.trim(),
      password
    );

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/login", { replace: true });
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-icon">🌱</div>

        <h1>Buat Akun</h1>

        <p className="auth-description">
          Bergabung dengan HerbaNusantara untuk mengenal
          berbagai tanaman herbal.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nama Lengkap</label>

            <input
              id="name"
              type="text"
              placeholder="Masukkan nama"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />
          </div>

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
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              minLength={6}
              required
            />
          </div>

          {error && (
            <p className="auth-error">{error}</p>
          )}

          <button className="auth-button" type="submit">
            Register
          </button>
        </form>

        <p className="auth-footer">
          Sudah punya akun?{" "}
          <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}
