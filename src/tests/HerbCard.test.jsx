
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HerbCard from "../components/herbal/HerbCard";

const herb = {
  id: 1,
  name: "Jahe",
  latin: "Zingiber officinale",
  category: "Rimpang",
  desc: "Membantu menghangatkan tubuh.",
  emoji: "🫚",
  color: "#f0e5d0",
};

describe("HerbCard", () => {
  it("menampilkan nama herbal", () => {
    render(
      <MemoryRouter>
        <HerbCard herb={herb} />
      </MemoryRouter>
    );

    expect(screen.getByText("Jahe")).toBeInTheDocument();
  });

  it("menampilkan nama latin herbal", () => {
    render(
      <MemoryRouter>
        <HerbCard herb={herb} />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Zingiber officinale")
    ).toBeInTheDocument();
  });

  it("menampilkan kategori herbal", () => {
    render(
      <MemoryRouter>
        <HerbCard herb={herb} />
      </MemoryRouter>
    );

    expect(screen.getByText("Rimpang")).toBeInTheDocument();
  });

  it("menampilkan deskripsi herbal", () => {
    render(
      <MemoryRouter>
        <HerbCard herb={herb} />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Membantu menghangatkan tubuh.")
    ).toBeInTheDocument();
  });

  it("menampilkan emoji herbal", () => {
    render(
      <MemoryRouter>
        <HerbCard herb={herb} />
      </MemoryRouter>
    );

    expect(screen.getByText("🫚")).toBeInTheDocument();
  });

  it("menampilkan link detail herbal", () => {
    render(
      <MemoryRouter>
        <HerbCard herb={herb} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", {
        name: /lihat detail/i,
      })
    ).toHaveAttribute("href", "/herbs/1");
  });

  it("menggunakan warna dari data herbal", () => {
    const { container } = render(
      <MemoryRouter>
        <HerbCard herb={herb} />
      </MemoryRouter>
    );

    const image = container.querySelector("article div");

    expect(image).toHaveStyle({
      backgroundColor: "#f0e5d0",
    });
  });
});
