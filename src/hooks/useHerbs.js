
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import {
  getHerbs,
  searchHerbs
} from "../services/herbService";

export function useHerbs() {
  const [herbs, setHerbs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const controllerRef = useRef(null);
  const requestIdRef = useRef(0);

  const cancelRequest = useCallback(() => {
    requestIdRef.current += 1;

    controllerRef.current?.abort();
    controllerRef.current = null;
  }, []);

  const executeRequest = useCallback(async (requestFunction) => {
    cancelRequest();

    const controller = new AbortController();
    const requestId = requestIdRef.current;

    controllerRef.current = controller;

    setLoading(true);
    setError("");

    try {
      const data = await requestFunction(controller.signal);

      if (
        controller.signal.aborted ||
        requestId !== requestIdRef.current
      ) {
        return;
      }

      setHerbs(data);
    } catch (err) {
      if (
        err.name !== "AbortError" &&
        requestId === requestIdRef.current
      ) {
        setError(
          err.message || "Terjadi kesalahan saat mengambil data."
        );
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
        controllerRef.current = null;
      }
    }
  }, [cancelRequest]);

  const reload = useCallback(() => {
    return executeRequest((signal) => getHerbs(signal));
  }, [executeRequest]);

  const search = useCallback((query) => {
    return executeRequest((signal) => searchHerbs(query, signal));
  }, [executeRequest]);

  useEffect(() => {
    reload();

    return () => {
      cancelRequest();
    };
  }, [reload, cancelRequest]);

  return {
    herbs,
    loading,
    error,
    search,
    reload,
    cancelRequest
  };
}
