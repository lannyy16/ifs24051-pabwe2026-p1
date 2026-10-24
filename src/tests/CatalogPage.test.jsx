
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import CatalogPage from "../pages/CatalogPage";
import { useHerbs } from "../hooks/useHerbs";

vi.mock("../hooks/useHerbs");

vi.mock("../components/herbal/HerbSearch", () => ({
  default: ({ onSearch }) => (
    <button onClick={() => onSearch("Jahe")}>
      Cari Jahe
    </button>
  ),
}));

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

describe("CatalogPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("menampilkan judul katalog", () => {
    useHerbs.mockReturnValue({
      herbs: [],
      loading: false,
      error: "",
      search: vi.fn(),
      reload: vi.fn(),
    });

    render(<CatalogPage />);

    expect(
      screen.getByRole("heading", {
        name: "Katalog Herbal",
      })
    ).toBeInTheDocument();
  });

  it("menampilkan loading ketika data dimuat", () => {
    useHerbs.mockReturnValue({
      herbs: [],
      loading: true,
      error: "",
      search: vi.fn(),
      reload: vi.fn(),
    });

    render(<CatalogPage />);

    expect(
      screen.getByText("Loading herbal")
    ).toBeInTheDocument();

    expect(
      screen.queryByText(/herbal ditemukan/i)
    ).not.toBeInTheDocument();
  });

  it("menampilkan jumlah herbal dan hasilnya", () => {
    useHerbs.mockReturnValue({
      herbs: [
        { id: 1, name: "Jahe" },
        { id: 2, name: "Kunyit" },
      ],
      loading: false,
      error: "",
      search: vi.fn(),
      reload: vi.fn(),
    });

    render(<CatalogPage />);

    expect(
      screen.getByText("2 herbal ditemukan")
    ).toBeInTheDocument();

    expect(screen.getByText("Jahe")).toBeInTheDocument();
    expect(screen.getByText("Kunyit")).toBeInTheDocument();
  });

  it("memanggil search ketika pencarian dilakukan", async () => {
    const search = vi.fn().mockResolvedValue(undefined);

    useHerbs.mockReturnValue({
      herbs: [],
      loading: false,
      error: "",
      search,
      reload: vi.fn(),
    });

    render(<CatalogPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Cari Jahe",
      })
    );

    await waitFor(() => {
      expect(search).toHaveBeenCalledWith("Jahe");
    });
  });

  it("menampilkan error ketika gagal mengambil data", () => {
    useHerbs.mockReturnValue({
      herbs: [],
      loading: false,
      error: "Data herbal gagal dimuat",
      search: vi.fn(),
      reload: vi.fn(),
    });

    render(<CatalogPage />);

    expect(
      screen.getByText("Data herbal gagal dimuat")
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId("herb-grid")
    ).not.toBeInTheDocument();
  });

  it("memanggil reload ketika retry ditekan", () => {
    const reload = vi.fn();

    useHerbs.mockReturnValue({
      herbs: [],
      loading: false,
      error: "Terjadi kesalahan",
      search: vi.fn(),
      reload,
    });

    render(<CatalogPage />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Coba Lagi",
      })
    );

    expect(reload).toHaveBeenCalledTimes(1);
  });
});
