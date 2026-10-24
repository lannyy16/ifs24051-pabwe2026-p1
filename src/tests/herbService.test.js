
import { describe, it, expect, vi, afterEach } from "vitest";

import {
  getHerbs,
  searchHerbs,
  getHerbById,
} from "../services/herbService";

const mockResponse = (data, options = {}) => {
  const {
    status = 200,
    ok = true,
    success = true,
    message = "Berhasil",
  } = options;

  return {
    ok,
    status,
    json: vi.fn().mockResolvedValue({
      success,
      message,
      data,
    }),
  };
};

describe("herbService", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  describe("getHerbs", () => {
    it("mengambil seluruh data herbal", async () => {
      const herbs = [
        { id: 1, name: "Jahe" },
        { id: 2, name: "Kunyit" },
      ];

      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse(herbs)
      );

      vi.stubGlobal("fetch", fetchMock);

      const result = await getHerbs();

      expect(result).toEqual(herbs);
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it("mengembalikan array kosong", async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse([])
      );

      vi.stubGlobal("fetch", fetchMock);

      expect(await getHerbs()).toEqual([]);
    });

    it("menolak format data yang bukan array", async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse({ id: 1 })
      );

      vi.stubGlobal("fetch", fetchMock);

      await expect(getHerbs()).rejects.toThrow(
        "Format data herbal tidak valid."
      );
    });

    it("menangani error server", async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse(null, {
          ok: false,
          status: 500,
          success: false,
          message: "Terjadi kesalahan server",
        })
      );

      vi.stubGlobal("fetch", fetchMock);

      await expect(getHerbs()).rejects.toThrow(
        "Terjadi kesalahan server"
      );
    });

    it("menggunakan pesan default server", async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse(null, {
          ok: false,
          status: 500,
          success: false,
          message: "",
        })
      );

      vi.stubGlobal("fetch", fetchMock);

      await expect(getHerbs()).rejects.toThrow(
        "Permintaan gagal (500)"
      );
    });

    it("menangani error koneksi", async () => {
      const fetchMock = vi.fn().mockRejectedValue(
        new Error("Network error")
      );

      vi.stubGlobal("fetch", fetchMock);

      await expect(getHerbs()).rejects.toThrow(
        "Tidak dapat terhubung ke server. Pastikan backend berjalan."
      );
    });

    it("meneruskan AbortError", async () => {
      const abortError = new Error("Request aborted");

      abortError.name = "AbortError";

      const fetchMock = vi.fn().mockRejectedValue(
        abortError
      );

      vi.stubGlobal("fetch", fetchMock);

      await expect(getHerbs()).rejects.toBe(abortError);
    });

    it("menangani JSON tidak valid", async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockRejectedValue(
          new Error("Invalid JSON")
        ),
      });

      vi.stubGlobal("fetch", fetchMock);

      await expect(getHerbs()).rejects.toThrow(
        "Respons server tidak valid."
      );
    });
  });

  describe("searchHerbs", () => {
    it("mencari herbal berdasarkan kata kunci", async () => {
      const herbs = [
        { id: 1, name: "Jahe" },
      ];

      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse(herbs)
      );

      vi.stubGlobal("fetch", fetchMock);

      const result = await searchHerbs("jahe");

      expect(result).toEqual(herbs);

      expect(fetchMock).toHaveBeenCalledTimes(1);

      expect(fetchMock.mock.calls[0][0]).toContain(
        "search=jahe"
      );
    });

    it("menangani hasil pencarian kosong", async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse([])
      );

      vi.stubGlobal("fetch", fetchMock);

      expect(
        await searchHerbs("tidak ditemukan")
      ).toEqual([]);
    });

    it("menolak format pencarian bukan array", async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse({ id: 1 })
      );

      vi.stubGlobal("fetch", fetchMock);

      await expect(
        searchHerbs("jahe")
      ).rejects.toThrow(
        "Format hasil pencarian tidak valid."
      );
    });

    it("menangani error pencarian", async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse(null, {
          ok: false,
          status: 404,
          success: false,
          message: "Data herbal tidak ditemukan",
        })
      );

      vi.stubGlobal("fetch", fetchMock);

      await expect(
        searchHerbs("jahe")
      ).rejects.toThrow(
        "Data herbal tidak ditemukan"
      );
    });
  });

  describe("getHerbById", () => {
    it("mengambil detail herbal", async () => {
      const herb = {
        id: 1,
        name: "Jahe",
        scientific_name: "Zingiber officinale",
      };

      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse(herb)
      );

      vi.stubGlobal("fetch", fetchMock);

      const result = await getHerbById(1);

      expect(result).toEqual(herb);

      expect(fetchMock).toHaveBeenCalledTimes(1);

      expect(fetchMock.mock.calls[0][0]).toContain(
        "/herbs/1"
      );
    });

    it("menolak ID tidak valid", async () => {
      const fetchMock = vi.fn();

      vi.stubGlobal("fetch", fetchMock);

      await expect(
        getHerbById("abc")
      ).rejects.toThrow(
        "ID herbal tidak valid."
      );

      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("menolak ID nol", async () => {
      const fetchMock = vi.fn();

      vi.stubGlobal("fetch", fetchMock);

      await expect(
        getHerbById(0)
      ).rejects.toThrow(
        "ID herbal tidak valid."
      );

      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("menolak ID negatif", async () => {
      const fetchMock = vi.fn();

      vi.stubGlobal("fetch", fetchMock);

      await expect(
        getHerbById(-1)
      ).rejects.toThrow(
        "ID herbal tidak valid."
      );

      expect(fetchMock).not.toHaveBeenCalled();
    });

    it("menolak data herbal kosong", async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse(null)
      );

      vi.stubGlobal("fetch", fetchMock);

      await expect(
        getHerbById(999)
      ).rejects.toThrow(
        "Data herbal tidak ditemukan."
      );
    });

    it("menolak data herbal bukan object", async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse("data tidak valid")
      );

      vi.stubGlobal("fetch", fetchMock);

      await expect(
        getHerbById(1)
      ).rejects.toThrow(
        "Data herbal tidak ditemukan."
      );
    });

    it("menangani error server detail", async () => {
      const fetchMock = vi.fn().mockResolvedValue(
        mockResponse(null, {
          ok: false,
          status: 500,
          success: false,
          message: "Gagal mengambil detail herbal",
        })
      );

      vi.stubGlobal("fetch", fetchMock);

      await expect(
        getHerbById(1)
      ).rejects.toThrow(
        "Gagal mengambil detail herbal"
      );
    });
  });
});
