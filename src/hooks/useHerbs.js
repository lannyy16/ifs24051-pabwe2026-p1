
import { useCallback, useEffect, useState } from "react";
import {
  getHerbs,
  searchHerbs
} from "../services/herbService";

export function useHerbs() {
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadHerbs = useCallback(async (signal) => {
    setLoading(true);
    setError("");

    try {
      const data = await getHerbs(signal);
      setHerbs(data);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message || "Gagal mengambil data herbal");
      }
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    loadHerbs(controller.signal);

    return () => controller.abort();
  }, [loadHerbs]);

  const search = async (query) => {
    const controller = new AbortController();

    setLoading(true);
    setError("");

    try {
      const data = await searchHerbs(
        query,
        controller.signal
      );

      setHerbs(data);
    } catch (err) {
      setError(err.message || "Pencarian gagal");
    } finally {
      setLoading(false);
    }
  };

  return {
    herbs,
    loading,
    error,
    search,
    reload: loadHerbs
  };
}
