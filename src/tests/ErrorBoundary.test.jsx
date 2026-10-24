
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import ErrorBoundary from "../components/common/ErrorBoundary";

describe("ErrorBoundary", () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  // 1. Menampilkan children ketika tidak ada error
  it("menampilkan children ketika tidak terjadi error", () => {
    render(
      <ErrorBoundary>
        <h1>Halaman Herbal</h1>
      </ErrorBoundary>
    );

    expect(
      screen.getByText("Halaman Herbal")
    ).toBeInTheDocument();
  });

  // 2. Menampilkan fallback ketika children mengalami error
  it("menampilkan pesan error ketika children mengalami error", () => {
    function BrokenComponent() {
      throw new Error("Terjadi kesalahan");
    }

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByText("Terjadi kesalahan")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Maaf, halaman tidak dapat ditampilkan. Silakan muat ulang aplikasi."
      )
    ).toBeInTheDocument();
  });

  // 3. Menampilkan tombol muat ulang
  it("menampilkan tombol muat ulang ketika terjadi error", () => {
    function BrokenComponent() {
      throw new Error("Error");
    }

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(
      screen.getByRole("button", {
        name: "Muat ulang",
      })
    ).toBeInTheDocument();
  });

  // 4. Memanggil window.location.reload
  it("memanggil reload ketika tombol muat ulang diklik", () => {
    function BrokenComponent() {
      throw new Error("Error");
    }

    const reloadMock = vi.fn();

    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        reload: reloadMock,
      },
    });

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Muat ulang",
      })
    );

    expect(reloadMock).toHaveBeenCalledTimes(1);
  });

  // 5. Mencatat error ke console
  it("mencatat error ke console ketika terjadi error", () => {
    function BrokenComponent() {
      throw new Error("Error test");
    }

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Application error:",
      expect.any(Error)
    );
  });

  // 6. Mencatat informasi detail error
  it("mencatat error details ke console", () => {
    function BrokenComponent() {
      throw new Error("Error test");
    }

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error details:",
      expect.any(String)
    );
  });
});
