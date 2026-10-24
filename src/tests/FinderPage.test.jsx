
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FinderPage from "../pages/FinderPage";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

describe("FinderPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  function renderFinder() {
    return render(
      <MemoryRouter>
        <FinderPage />
      </MemoryRouter>
    );
  }

  it("menampilkan judul dan disclaimer", () => {
    renderFinder();

    expect(
      screen.getByRole("heading", {
        name: "Temukan herbal",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/tidak digunakan untuk mendiagnosis/i)
    ).toBeInTheDocument();
  });

  it("menampilkan empat pilihan topik", () => {
    renderFinder();

    expect(
      screen.getByRole("button", { name: "Relaksasi" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Pencernaan" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Minuman Herbal" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "Herbal Nusantara" })
    ).toBeInTheDocument();
  });

  it("tombol cari disabled ketika belum memilih topik", () => {
    renderFinder();

    expect(
      screen.getByRole("button", {
        name: /Cari Herbal/i,
      })
    ).toBeDisabled();
  });

  it("mengaktifkan tombol cari setelah memilih topik", () => {
    renderFinder();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Relaksasi",
      })
    );

    expect(
      screen.getByRole("button", {
        name: /Cari Herbal/i,
      })
    ).toBeEnabled();
  });

  it("memberikan class selected pada topik yang dipilih", () => {
    renderFinder();

    const button = screen.getByRole("button", {
      name: "Pencernaan",
    });

    fireEvent.click(button);

    expect(button).toHaveClass("selected");
  });

  it("navigasi ke katalog dengan query Chamomile", () => {
    renderFinder();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Relaksasi",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Cari Herbal/i,
      })
    );

    expect(navigateMock).toHaveBeenCalledWith(
      "/catalog?search=Chamomile"
    );
  });

  it("navigasi ke katalog dengan query Jahe", () => {
    renderFinder();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Pencernaan",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Cari Herbal/i,
      })
    );

    expect(navigateMock).toHaveBeenCalledWith(
      "/catalog?search=Jahe"
    );
  });

  it("tidak navigasi jika topik belum dipilih", () => {
    renderFinder();

    const searchButton = screen.getByRole("button", {
      name: /Cari Herbal/i,
    });

    expect(searchButton).toBeDisabled();

    fireEvent.click(searchButton);

    expect(navigateMock).not.toHaveBeenCalled();
  });
});
