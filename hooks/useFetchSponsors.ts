import { useState, useEffect } from "react";
import { sponsorsType } from "@/types/sponsors";

export function useFetchSponsors() {
  const [sponsors, setSponsors] = useState<sponsorsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const deleteSponsorFromState = (sponsorId: number) => {
    setSponsors((prev) => prev.filter((s) => s.id !== sponsorId));
  };

  useEffect(() => {
    async function fetchSponsors() {
      setLoading(true);
      try {
        const res = await fetch("/api/sponsors");

        if (!res.ok) {
          throw new Error(`HTTP error: ${res.status}`);
        }

        const data = await res.json();
        setSponsors(data);
        setError(null);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Nieznany błąd pobierania.";
        setError(message);
        console.error("Failed to download sponsors", error);
        setSponsors([]);
      } finally {
        setLoading(false);
      }
    }

    fetchSponsors();
  }, []);

  return { sponsors, loading, error, deleteSponsorFromState };
}
