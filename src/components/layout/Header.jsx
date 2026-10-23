
import { Link, NavLink } from "react-router-dom";

const navigation = [
  { label: "Beranda", path: "/" },
  { label: "Katalog", path: "/catalog" },
  { label: "Herbal Finder", path: "/finder" },
  { label: "Artikel", path: "/article" },
  { label: "Dashboard", path: "/dashboard" }
];

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="brand">
        <span className="brand-icon">🌿</span>
        <span>HerbaNusantara</span>
      </Link>

      <nav className="navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
