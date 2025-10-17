import { useState, useEffect } from "react";
import { ListItem } from "@/types/listItem";

export function useFetchData(endpoint: string) {
  const [data, setData] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const deleteElementFromState = (elementId: number) => {
    setData((prev) => prev.filter((element) => element.id !== elementId));
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/${endpoint}`);

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        setData(data);
        setError(null);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Nieznany błąd pobierania.";
        setError(message);
        console.error("Failed to download", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error, deleteElementFromState };
}
