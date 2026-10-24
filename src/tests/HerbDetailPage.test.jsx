
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import HerbDetailPage from "../pages/HerbDetailPage";
import { getHerbById } from "../services/herbService";

// Mock service
vi.mock("../services/herbService", () => ({
  getHerbById: vi.fn(),
}));

// Mock Loading
vi.mock("../components/common/Loading", () => ({
  default: () => <div>Loading herbal...</div>,
}));

// Mock ErrorMessage
vi.mock("../components/common/ErrorMessage", () => ({
  default: ({ message }) => <div role="alert">{message}</div>,
}));

// Helper render halaman
function renderHerbDetail(id = "1") {
  return render(
    <MemoryRouter initialEntries={[`/herb/${id}`]}>
      <Routes>
        <Route
          path="/herb/:id"
          element={<HerbDetailPage />}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("HerbDetailPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 1. Loading
  it("menampilkan loading saat mengambil detail herbal", () => {
    getHerbById.mockReturnValue(
      new Promise(() => {})
    );

    renderHerbDetail();

    expect(
      screen.getByText("Loading herbal...")
    ).toBeInTheDocument();
  });

  // 2. Service dipanggil dengan ID dan AbortSignal
  it("memanggil getHerbById dengan ID dan signal", async () => {
    getHerbById.mockResolvedValue(null);

    renderHerbDetail("5");

    await waitFor(() => {
      expect(getHerbById).toHaveBeenCalledWith(
        "5",
        expect.any(AbortSignal)
      );
    });
  });

  // 3. Herbal tidak ditemukan
  it("menampilkan pesan herbal tidak ditemukan", async () => {
    getHerbById.mockResolvedValue(null);

    renderHerbDetail();

    expect(
      await screen.findByText("Herbal tidak ditemukan")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: "Kembali ke katalog",
      })
    ).toHaveAttribute("href", "/catalog");
  });

  // 4. Error dari service
  it("menampilkan pesan error ketika service gagal", async () => {
    getHerbById.mockRejectedValue(
      new Error("Gagal mengambil data herbal")
    );

    renderHerbDetail();

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent("Gagal mengambil data herbal");

    expect(
      screen.getByRole("link", {
        name: "Kembali ke katalog",
      })
    ).toHaveAttribute("href", "/catalog");
  });

  // 5. Error tanpa message
  it("menampilkan error default jika message kosong", async () => {
    getHerbById.mockRejectedValue({});

    renderHerbDetail();

    expect(
      await screen.findByRole("alert")
    ).toHaveTextContent(
      "Gagal mengambil detail herbal."
    );
  });

  // 6. AbortError tidak ditampilkan sebagai error
  it("tidak menampilkan error ketika request dibatalkan", async () => {
    getHerbById.mockRejectedValue(
      new DOMException("Request aborted", "AbortError")
    );

    renderHerbDetail();

    await waitFor(() => {
      expect(
        screen.queryByRole("alert")
      ).not.toBeInTheDocument();
    });
  });

  // 7. Request dibatalkan saat komponen unmount
  it("membatalkan request saat komponen dilepas", async () => {
    let signal;

    getHerbById.mockImplementation((id, requestSignal) => {
      signal = requestSignal;

      return new Promise(() => {});
    });

    const { unmount } = renderHerbDetail();

    await waitFor(() => {
      expect(signal).toBeDefined();
    });

    expect(signal.aborted).toBe(false);

    unmount();

    expect(signal.aborted).toBe(true);
  });
});
