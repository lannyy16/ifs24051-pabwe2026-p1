
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EmptyState from "../components/common/EmptyState";

describe("EmptyState", () => {
  it("menampilkan judul herbal tidak ditemukan", () => {
    render(<EmptyState />);

    expect(
      screen.getByText("Herbal tidak ditemukan")
    ).toBeInTheDocument();
  });

  it("menampilkan pesan pencarian berbeda", () => {
    render(<EmptyState />);

    expect(
      screen.getByText(
        "Coba gunakan kata pencarian yang berbeda."
      )
    ).toBeInTheDocument();
  });

  it("menampilkan elemen empty state", () => {
    const { container } = render(<EmptyState />);

    expect(
      container.querySelector(".empty-state")
    ).toBeInTheDocument();
  });
});
