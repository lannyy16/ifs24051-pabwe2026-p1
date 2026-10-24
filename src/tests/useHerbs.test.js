
import {
  describe,
  it,
  expect,
  vi,
  beforeEach
} from "vitest";

import {
  renderHook,
  act,
  waitFor
} from "@testing-library/react";

import { useHerbs } from "../hooks/useHerbs";

import {
  getHerbs,
  searchHerbs
} from "../services/herbService";

vi.mock("../services/herbService", () => ({
  getHerbs: vi.fn(),
  searchHerbs: vi.fn(),
}));

describe("useHerbs", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("mengambil data herbal saat pertama kali digunakan", async () => {
    const herbs = [
      { id: 1, name: "Jahe" },
      { id: 2, name: "Kunyit" }
    ];

    getHerbs.mockResolvedValue(herbs);

    const { result } = renderHook(() => useHerbs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.herbs).toEqual(herbs);
    expect(result.current.error).toBe("");
    expect(getHerbs).toHaveBeenCalled();
  });

  it("menampilkan error jika pengambilan data gagal", async () => {
    getHerbs.mockRejectedValue(
      new Error("Server gagal")
    );

    const { result } = renderHook(() => useHerbs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("Server gagal");
  });

  it("menggunakan pesan error default jika error tidak memiliki message", async () => {
    getHerbs.mockRejectedValue({});

    const { result } = renderHook(() => useHerbs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe(
      "Terjadi kesalahan saat mengambil data."
    );
  });

  it("melakukan pencarian herbal", async () => {
    const herbs = [
      { id: 1, name: "Jahe" }
    ];

    getHerbs.mockResolvedValue([]);
    searchHerbs.mockResolvedValue(herbs);

    const { result } = renderHook(() => useHerbs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.search("Jahe");
    });

    expect(searchHerbs).toHaveBeenCalledWith(
      "Jahe",
      expect.any(AbortSignal)
    );

    expect(result.current.herbs).toEqual(herbs);
    expect(result.current.error).toBe("");
  });

  it("menampilkan error jika pencarian gagal", async () => {
    getHerbs.mockResolvedValue([]);

    searchHerbs.mockRejectedValue(
      new Error("Pencarian gagal")
    );

    const { result } = renderHook(() => useHerbs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.search("Jahe");
    });

    expect(result.current.error).toBe(
      "Pencarian gagal"
    );
  });

  it("reload mengambil ulang data herbal", async () => {
    getHerbs
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        { id: 1, name: "Jahe" }
      ]);

    const { result } = renderHook(() => useHerbs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.reload();
    });

    expect(getHerbs).toHaveBeenCalledTimes(2);

    expect(result.current.herbs).toEqual([
      { id: 1, name: "Jahe" }
    ]);
  });

  it("cancelRequest membatalkan request aktif", async () => {
    getHerbs.mockImplementation(
      () => new Promise(() => {})
    );

    const { result } = renderHook(() => useHerbs());

    await waitFor(() => {
      expect(getHerbs).toHaveBeenCalled();
    });

    const signal = getHerbs.mock.calls[0][0];

    act(() => {
      result.current.cancelRequest();
    });

    expect(signal.aborted).toBe(true);
  });

  it("mengabaikan error AbortError", async () => {
    getHerbs.mockRejectedValue({
      name: "AbortError",
      message: "Request dibatalkan"
    });

    const { result } = renderHook(() => useHerbs());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe("");
  });
});
