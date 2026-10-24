import { describe, expect, it, vi, afterEach } from "vitest";
import { getHerbs } from "./herbService.js";

afterEach(() => vi.unstubAllGlobals());

describe("getHerbs", () => {
  it("mengembalikan daftar tanaman dari API yang valid", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [{ id: 1, name: "Jahe" }] })
    }));
    await expect(getHerbs()).resolves.toEqual([{ id: 1, name: "Jahe" }]);
  });

  it("melempar error saat respons HTTP gagal", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    await expect(getHerbs()).rejects.toThrow("HTTP 500");
  });

  it("menolak format data yang tidak valid", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: {} })
    }));
    await expect(getHerbs()).rejects.toThrow("Format data");
  });
});
