
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Layout from "../components/layout/Layout";

// ==================== HEADER ====================

describe("Header", () => {
  it("menampilkan nama website", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("HerbaNusantara")).toBeInTheDocument();
  });

  it("menampilkan semua menu navigasi", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "Beranda" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Katalog" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Herbal Finder" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Artikel" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Dashboard" })
    ).toBeInTheDocument();
  });

  it("memiliki link brand menuju halaman beranda", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /HerbaNusantara/i })
    ).toHaveAttribute("href", "/");
  });

  it("menandai menu Beranda sebagai aktif", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "Beranda" })
    ).toHaveClass("active");
  });

  it("menandai menu Katalog sebagai aktif", () => {
    render(
      <MemoryRouter initialEntries={["/catalog"]}>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "Katalog" })
    ).toHaveClass("active");
  });

  it("tidak menandai Beranda aktif ketika berada di Katalog", () => {
    render(
      <MemoryRouter initialEntries={["/catalog"]}>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: "Beranda" })
    ).not.toHaveClass("active");
  });
});

// ==================== FOOTER ====================

describe("Footer", () => {
  it("menampilkan nama website", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /HerbaNusantara/i })
    ).toBeInTheDocument();
  });

  it("menampilkan informasi tanaman herbal", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        /informasi tradisional, penelitian, dan keamanan/i
      )
    ).toBeInTheDocument();
  });

  it("menampilkan tahun saat ini", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} HerbaNusantara`
      )
    ).toBeInTheDocument();
  });

  it("menampilkan disclaimer kesehatan", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        /bukan pengganti diagnosis atau pengobatan/i
      )
    ).toBeInTheDocument();
  });

  it("memiliki elemen footer", () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(
      container.querySelector("footer")
    ).toBeInTheDocument();
  });
});

// ==================== LAYOUT ====================

describe("Layout", () => {
  it("menampilkan Header dan Footer", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<h1>Halaman Utama</h1>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("navigation")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("contentinfo")
    ).toBeInTheDocument();
  });

  it("menampilkan halaman di dalam main", () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<h1>Halaman Utama</h1>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const main = screen.getByRole("main");

    expect(main).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: "Halaman Utama",
      })
    ).toBeInTheDocument();

    expect(main).toContainElement(
      screen.getByRole("heading", {
        name: "Halaman Utama",
      })
    );
  });

  it("menampilkan halaman katalog melalui Outlet", () => {
    render(
      <MemoryRouter initialEntries={["/catalog"]}>
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/catalog"
              element={<h1>Halaman Katalog</h1>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: "Halaman Katalog",
      })
    ).toBeInTheDocument();
  });
});
