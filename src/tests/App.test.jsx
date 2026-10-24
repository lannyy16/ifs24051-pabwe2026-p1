
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "../pages/App";

// Placeholder pencarian
const SEARCH_PLACEHOLDER =
  "Cari nama, kategori, atau nama ilmiah...";

// Mock data herbal
vi.mock("../data/herbs", () => ({
  herbs: [
    {
      id: "jahe",
      name: "Jahe",
      latin: "Zingiber officinale",
      category: "Rimpang",
      emoji: "🌱",
      description:
        "Herbal tradisional untuk membantu meredakan mual.",
      traditionalBenefits:
        "Digunakan secara tradisional untuk membantu pencernaan.",
      evidence:
        "Beberapa penelitian mendukung manfaat jahe untuk mual.",
      safety:
        "Konsumsi secukupnya dan perhatikan kondisi kesehatan.",
    },
    {
      id: "chamomile",
      name: "Chamomile",
      latin: "Matricaria chamomilla",
      category: "Bunga",
      emoji: "🌼",
      description:
        "Bunga herbal yang sering digunakan untuk relaksasi.",
      traditionalBenefits:
        "Digunakan secara tradisional untuk membantu relaksasi.",
      evidence: "Penelitian masih terus dilakukan.",
      safety: "Perhatikan kemungkinan alergi.",
    },
    {
      id: "pegagan",
      name: "Pegagan",
      latin: "Centella asiatica",
      category: "Daun",
      emoji: "🍃",
      description:
        "Tanaman herbal yang dikenal dalam pengobatan tradisional.",
      traditionalBenefits:
        "Digunakan secara tradisional untuk perawatan tubuh.",
      evidence: "Bukti ilmiah masih berkembang.",
      safety: "Gunakan secara bijak.",
    },
  ],
}));

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollTo", vi.fn());
  });

  // 1. Menampilkan halaman beranda
  it("menampilkan halaman beranda", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /kenali/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /katalog herbal/i,
      })
    ).toBeInTheDocument();
  });

  // 2. Navigasi ke katalog
  it("berpindah ke halaman katalog herbal", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Katalog Herbal",
      })
    );

    expect(
      screen.getByPlaceholderText(SEARCH_PLACEHOLDER)
    ).toBeInTheDocument();
  });

  // 3. Menampilkan daftar herbal
  it("menampilkan daftar herbal pada katalog", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Katalog Herbal",
      })
    );

    expect(screen.getByText("Jahe")).toBeInTheDocument();
    expect(screen.getByText("Chamomile")).toBeInTheDocument();
    expect(screen.getByText("Pegagan")).toBeInTheDocument();
  });

  // 4. Pencarian herbal berdasarkan nama
  it("mencari herbal berdasarkan nama", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Katalog Herbal",
      })
    );

    const searchInput = screen.getByPlaceholderText(
      SEARCH_PLACEHOLDER
    );

    fireEvent.change(searchInput, {
      target: { value: "jahe" },
    });

    expect(screen.getByText("Jahe")).toBeInTheDocument();

    expect(
      screen.queryByText("Chamomile")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Pegagan")
    ).not.toBeInTheDocument();
  });

  // 5. Pencarian berdasarkan nama ilmiah
  it("mencari herbal berdasarkan nama ilmiah", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Katalog Herbal",
      })
    );

    const searchInput = screen.getByPlaceholderText(
      SEARCH_PLACEHOLDER
    );

    fireEvent.change(searchInput, {
      target: { value: "zingiber" },
    });

    expect(screen.getByText("Jahe")).toBeInTheDocument();

    expect(
      screen.queryByText("Chamomile")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Pegagan")
    ).not.toBeInTheDocument();
  });

  // 6. Pencarian tidak ditemukan
  it("menampilkan pesan ketika herbal tidak ditemukan", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Katalog Herbal",
      })
    );

    const searchInput = screen.getByPlaceholderText(
      SEARCH_PLACEHOLDER
    );

    fireEvent.change(searchInput, {
      target: { value: "herbalxyz" },
    });

    expect(
      screen.getByText(/tidak ditemukan/i)
    ).toBeInTheDocument();
  });

  // 7. Membuka detail herbal
  it("membuka detail herbal ketika kartu diklik", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Katalog Herbal",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /jahe/i,
      })
    );

    expect(
      screen.getByText("Zingiber officinale")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Beberapa penelitian mendukung manfaat jahe untuk mual."
      )
    ).toBeInTheDocument();
  });

  // 8. Kembali dari detail herbal
  it("kembali ke katalog dari halaman detail", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Katalog Herbal",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /jahe/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /kembali ke katalog/i,
      })
    );

    expect(
      screen.getByPlaceholderText(SEARCH_PLACEHOLDER)
    ).toBeInTheDocument();

    expect(screen.getByText("Jahe")).toBeInTheDocument();
  });

  // 9. Menyimpan herbal
  it("menyimpan herbal ke dashboard", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Katalog Herbal",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /jahe/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /simpan herbal/i,
      })
    );

    expect(
      screen.getByRole("button", {
        name: /tersimpan/i,
      })
    ).toBeInTheDocument();
  });

  // 10. Membuka dashboard
  it("menampilkan halaman dashboard", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Dashboard",
      })
    );

    expect(
      screen.getByText(/herbal tersimpan/i)
    ).toBeInTheDocument();
  });

  // 11. Menampilkan herbal tersimpan
  it("menampilkan herbal yang sudah disimpan di dashboard", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Katalog Herbal",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /jahe/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /simpan herbal/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Dashboard",
      })
    );

    expect(screen.getByText("Jahe")).toBeInTheDocument();
  });

  // 12. Membuka Herbal Finder
  it("menampilkan halaman Herbal Finder", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Herbal Finder",
      })
    );

    expect(
      screen.getByText(/mual ringan/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/kualitas tidur/i)
    ).toBeInTheDocument();
  });

  // 13. Herbal Finder memilih herbal
  it("mengarahkan pilihan mual ringan ke katalog jahe", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Herbal Finder",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /mual ringan/i,
      })
    );

    expect(
      screen.getByPlaceholderText(SEARCH_PLACEHOLDER)
    ).toBeInTheDocument();

    expect(screen.getByText("Jahe")).toBeInTheDocument();
  });

  // 14. Membuka halaman artikel
  it("menampilkan halaman artikel", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Artikel",
      })
    );

    expect(
      screen.getByRole("heading", {
        name: "Artikel herbal",
      })
    ).toBeInTheDocument();
  });

  // 15. Tombol brand kembali ke beranda
  it("kembali ke beranda melalui tombol brand", () => {
    render(<App />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Katalog Herbal",
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /herbanusantara/i,
      })
    );

    expect(
      screen.getByRole("button", {
        name: /jelajahi herbal/i,
      })
    ).toBeInTheDocument();
  });
});
