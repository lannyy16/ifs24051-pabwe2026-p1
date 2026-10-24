
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Loading from "../components/common/Loading";

describe("Loading", () => {
  it("menampilkan pesan loading", () => {
    render(<Loading />);

    expect(
      screen.getByText("Memuat data herbal...")
    ).toBeInTheDocument();
  });

  it("memiliki role status", () => {
    render(<Loading />);

    expect(
      screen.getByRole("status")
    ).toBeInTheDocument();
  });

  it("memiliki class status-message", () => {
    const { container } = render(<Loading />);

    expect(
      container.querySelector(".status-message")
    ).toBeInTheDocument();
  });
});
