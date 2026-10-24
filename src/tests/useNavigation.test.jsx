
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useNavigation from "../hooks/useNavigation";

describe("useNavigation", () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it("menggunakan Beranda sebagai halaman awal", () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.page).toBe("Beranda");
  });

  it("menggunakan halaman awal sesuai parameter", () => {
    const { result } = renderHook(() =>
      useNavigation("Katalog")
    );

    expect(result.current.page).toBe("Katalog");
  });

  it("berpindah halaman ketika navigate dipanggil", () => {
    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.navigate("Katalog");
    });

    expect(result.current.page).toBe("Katalog");
  });

  it("memanggil scrollTo ketika berpindah halaman", () => {
    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.navigate("Finder");
    });

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("dapat berpindah halaman beberapa kali", () => {
    const { result } = renderHook(() => useNavigation());

    act(() => {
      result.current.navigate("Katalog");
    });

    expect(result.current.page).toBe("Katalog");

    act(() => {
      result.current.navigate("Artikel");
    });

    expect(result.current.page).toBe("Artikel");
  });
});
