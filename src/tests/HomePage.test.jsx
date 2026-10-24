
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import { useHerbs } from "../hooks/useHerbs";

vi.mock("../hooks/useHerbs");

vi.mock("../components/herbal/HerbGrid", () => ({
  default: ({ herbs }) => (
    <div data-testid="herb-grid">
      {herbs.map((herb) => (
        <p key={herb.id}>{herb.name}</p>
      ))}
    </div>
  ),
}));

vi.mock("../components/common/Loading", () => ({
  default: () => <p>Loading herbal</p>,
}));

vi.mock("../components/common/ErrorMessage", () => ({
  default: ({ message, onRetry }) => (
    <div>
      <p>{message}</p>
      <button onClick={onRetry}>Coba Lagi</button>
    </div>
  ),
}));

function renderHome() {
  return render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
}

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("menampilkan hero dan link katalog", () => {
    useHerbs.mockReturnValue({
      herbs: [],
      loading: false,
      error: "",
      reload: vi.fn(),
    });

    renderHome();

    expect(
      screen.getByText(/Mengenal Alam/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /Jelajahi Herbal/i,
      })
    ).toHaveAttribute("href", "/catalog");

    expect(
      screen.getByRole("link", {
        name: /Lihat Semua/i,
      })
    ).toHaveAttribute("href", "/catalog");
  });

  it("menampilkan loading ketika data sedang dimuat", () => {
    useHerbs.mockReturnValue({
      herbs: [],
      loading: true,
      error: "",
      reload: vi.fn(),
    });

    renderHome();

    expect(
      screen.getByText("Loading herbal")
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId("herb-grid")
    ).not.toBeInTheDocument();
  });

  it("menampilkan error ketika gagal mengambil data", () => {
    useHerbs.mockReturnValue({
      herbs: [],
      loading: false,
      error: "Gagal mengambil data",
      reload: vi.fn(),
    });

    renderHome();

    expect(
      screen.getByText("Gagal mengambil data")
    ).toBeInTheDocument();
  });

  it("memanggil reload ketika tombol retry ditekan", () => {
    const reload = vi.fn();

    useHerbs.mockReturnValue({
      herbs: [],
      loading: false,
      error: "Gagal mengambil data",
      reload,
    });

    renderHome();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Coba Lagi",
      })
    );

    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("menampilkan maksimal tiga herbal", () => {
    useHerbs.mockReturnValue({
      herbs: [
        { id: 1, name: "Jahe" },
        { id: 2, name: "Kunyit" },
        { id: 3, name: "Temulawak" },
        { id: 4, name: "Rosella" },
      ],
      loading: false,
      error: "",
      reload: vi.fn(),
    });

    renderHome();

    expect(screen.getByText("Jahe")).toBeInTheDocument();
    expect(screen.getByText("Kunyit")).toBeInTheDocument();
    expect(screen.getByText("Temulawak")).toBeInTheDocument();

    expect(screen.queryByText("Rosella")).not.toBeInTheDocument();
  });

  it("tidak menampilkan katalog ketika terjadi error", () => {
    useHerbs.mockReturnValue({
      herbs: [{ id: 1, name: "Jahe" }],
      loading: false,
      error: "Terjadi kesalahan",
      reload: vi.fn(),
    });

    renderHome();

    expect(
      screen.queryByTestId("herb-grid")
    ).not.toBeInTheDocument();
  });
});
