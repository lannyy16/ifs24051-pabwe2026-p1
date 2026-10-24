
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import ArticlePage from "../pages/ArticlePage";

describe("ArticlePage", () => {
  it("menampilkan judul artikel herbal", () => {
    render(<ArticlePage />);

    expect(
      screen.getByRole("heading", {
        name: "Artikel Herbal",
      })
    ).toBeInTheDocument();
  });

  it("menampilkan bagian penggunaan tradisional", () => {
    render(<ArticlePage />);

    expect(
      screen.getByRole("heading", {
        name: "Penggunaan Tradisional",
      })
    ).toBeInTheDocument();
  });

  it("menampilkan bagian keamanan herbal", () => {
    render(<ArticlePage />);

    expect(
      screen.getByRole("heading", {
        name: "Keamanan",
      })
    ).toBeInTheDocument();
  });

  it("menampilkan informasi penelitian ilmiah", () => {
    render(<ArticlePage />);

    expect(
      screen.getAllByText(/penelitian ilmiah/i)
    ).toHaveLength(2);
  });

  it("menampilkan informasi risiko herbal", () => {
    render(<ArticlePage />);

    expect(
      screen.getByText(/efek samping/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/berinteraksi dengan obat/i)
    ).toBeInTheDocument();
  });
});
