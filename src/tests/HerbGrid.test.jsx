
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HerbGrid from "../components/herbal/HerbGrid";

const herbs = [
  {
    id: 1,
    name: "Jahe",
    latin: "Zingiber officinale",
    category: "Rimpang",
    desc: "Membantu menghangatkan tubuh.",
    emoji: "🫚",
    color: "#f0e5d0",
  },
  {
    id: 2,
    name: "Kunyit",
    latin: "Curcuma longa",
    category: "Rimpang",
    desc: "Herbal yang sering digunakan.",
    emoji: "🌿",
    color: "#f5e5a0",
  },
];

describe("HerbGrid", () => {
  it("menampilkan EmptyState jika data herbal kosong", () => {
    render(
      <MemoryRouter>
        <HerbGrid herbs={[]} />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Herbal tidak ditemukan")
    ).toBeInTheDocument();
  });

  it("menampilkan herbal dari data", () => {
    render(
      <MemoryRouter>
        <HerbGrid herbs={herbs} />
      </MemoryRouter>
    );

    expect(screen.getByText("Jahe")).toBeInTheDocument();
    expect(screen.getByText("Kunyit")).toBeInTheDocument();
  });

  it("menampilkan jumlah kartu sesuai data", () => {
    const { container } = render(
      <MemoryRouter>
        <HerbGrid herbs={herbs} />
      </MemoryRouter>
    );

    expect(
      container.querySelectorAll(".herb-grid article")
    ).toHaveLength(2);
  });

  it("menampilkan grid herbal", () => {
    const { container } = render(
      <MemoryRouter>
        <HerbGrid herbs={herbs} />
      </MemoryRouter>
    );

    expect(
      container.querySelector(".herb-grid")
    ).toBeInTheDocument();
  });
});
