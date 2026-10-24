
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import DashboardPage from "../pages/DashboardPage";
import { useHerbs } from "../hooks/useHerbs";

vi.mock("../hooks/useHerbs");

vi.mock("../components/common/Loading", () => ({
  default: () => <p>Loading herbal</p>,
}));

vi.mock("../components/common/ErrorMessage", () => ({
  default: ({ message, onRetry }) => (
    <div>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry}>Coba Lagi</button>
      )}
    </div>
  ),
}));

describe("DashboardPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("menampilkan loading ketika data dimuat", () => {
    useHerbs.mockReturnValue({
      herbs: [],
      loading: true,
      error: "",
      reload: vi.fn(),
    });

    render(<DashboardPage />);

    expect(
      screen.getByText("Loading herbal")
    ).toBeInTheDocument();
  });

  it("menampilkan error ketika gagal mengambil data", () => {
    useHerbs.mockReturnValue({
      herbs: [],
      loading: false,
      error: "Gagal mengambil data herbal",
      reload: vi.fn(),
    });

    render(<DashboardPage />);

    expect(
      screen.getByText("Gagal mengambil data herbal")
    ).toBeInTheDocument();
  });

  it("menampilkan judul dashboard", () => {
    useHerbs.mockReturnValue({
      herbs: [],
      loading: false,
      error: "",
      reload: vi.fn(),
    });

    render(<DashboardPage />);

    expect(
      screen.getByRole("heading", {
        name: "Ringkasan Herbal",
      })
    ).toBeInTheDocument();
  });

  it("menampilkan total herbal", () => {
    useHerbs.mockReturnValue({
      herbs: [
        {
          id: 1,
          name: "Jahe",
          category: "Rimpang",
          emoji: "🌿",
        },
        {
          id: 2,
          name: "Kunyit",
          category: "Rimpang",
          emoji: "🌱",
        },
        {
          id: 3,
          name: "Rosella",
          category: "Bunga",
          emoji: "🌺",
        },
      ],
      loading: false,
      error: "",
      reload: vi.fn(),
    });

    render(<DashboardPage />);

    expect(
      screen.getByText("Total Herbal")
    ).toBeInTheDocument();

    expect(
      screen.getByText("3", {
        selector: "strong",
      })
    ).toBeInTheDocument();
  });

  it("menghitung kategori unik", () => {
    useHerbs.mockReturnValue({
      herbs: [
        {
          id: 1,
          name: "Jahe",
          category: "Rimpang",
          emoji: "🌿",
        },
        {
          id: 2,
          name: "Kunyit",
          category: "Rimpang",
          emoji: "🌱",
        },
        {
          id: 3,
          name: "Rosella",
          category: "Bunga",
          emoji: "🌺",
        },
      ],
      loading: false,
      error: "",
      reload: vi.fn(),
    });

    render(<DashboardPage />);

    expect(
      screen.getByText("Kategori")
    ).toBeInTheDocument();

    expect(
      screen.getByText("2", {
        selector: "strong",
      })
    ).toBeInTheDocument();
  });

  it("menampilkan daftar herbal", () => {
    useHerbs.mockReturnValue({
      herbs: [
        {
          id: 1,
          name: "Jahe",
          category: "Rimpang",
          emoji: "🌿",
        },
        {
          id: 2,
          name: "Rosella",
          category: "Bunga",
          emoji: "🌺",
        },
      ],
      loading: false,
      error: "",
      reload: vi.fn(),
    });

    render(<DashboardPage />);

    expect(screen.getByText("Jahe")).toBeInTheDocument();
    expect(screen.getByText("Rosella")).toBeInTheDocument();

    expect(screen.getByText("Rimpang")).toBeInTheDocument();
    expect(screen.getByText("Bunga")).toBeInTheDocument();
  });

  it("menampilkan dashboard kosong ketika tidak ada herbal", () => {
    useHerbs.mockReturnValue({
      herbs: [],
      loading: false,
      error: "",
      reload: vi.fn(),
    });

    render(<DashboardPage />);

    expect(
      screen.getByText("Total Herbal")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Data Herbal")
    ).toBeInTheDocument();
  });
});
