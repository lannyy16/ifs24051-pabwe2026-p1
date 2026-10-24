
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "../components/common/ErrorMessage";

describe("ErrorMessage", () => {
  it("menampilkan pesan error", () => {
    render(<ErrorMessage message="Server gagal" />);

    expect(
      screen.getByText("Server gagal")
    ).toBeInTheDocument();
  });

  it("memiliki role alert", () => {
    render(<ErrorMessage message="Terjadi kesalahan" />);

    expect(
      screen.getByRole("alert")
    ).toBeInTheDocument();
  });

  it("menampilkan tombol Coba Lagi jika onRetry tersedia", () => {
    render(
      <ErrorMessage
        message="Server gagal"
        onRetry={() => {}}
      />
    );

    expect(
      screen.getByRole("button", {
        name: "Coba Lagi"
      })
    ).toBeInTheDocument();
  });

  it("tidak menampilkan tombol jika onRetry tidak tersedia", () => {
    render(<ErrorMessage message="Server gagal" />);

    expect(
      screen.queryByRole("button")
    ).not.toBeInTheDocument();
  });

  it("memanggil onRetry ketika tombol ditekan", () => {
    const onRetry = vi.fn();

    render(
      <ErrorMessage
        message="Server gagal"
        onRetry={onRetry}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Coba Lagi"
      })
    );

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
