"use client";

import { useState, useEffect } from "react";
import { sponsorsType } from "@/types/sponsors";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function page() {
  const [sponsors, setSponsors] = useState<sponsorsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const res = await fetch("/api/sponsors");
        const data = await res.json();
        setSponsors(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Nieznany błąd";
        setError(message);
        console.error("Failed to download sponsors", error);
      } finally {
        setLoading(false);
      }
    }

    fetchSponsors();
    setRefresh(false);
  }, [refresh]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl mb-10">Zarządzaj sponsorami</h1>
        <Button
          onClick={() => {
            setRefresh(true);
          }}
          className="cursor-pointer active:scale-80 transition-all ease-in-out"
        >
          Odswież tabelę
        </Button>
      </div>

      {loading && <Spinner />}
      {error && <div className="text-red-500 mb-4">Błąd: {error}</div>}

      {sponsors.length === 0 && !loading && !error ? (
        <div>Brak sponsorów do wyświetlenia</div>
      ) : (
        sponsors.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Nazwa</TableHead>
                <TableHead className="w-[100px]">Partner</TableHead>
                <TableHead className="md:table-cell hidden">Logo</TableHead>
                <TableHead>Edycja</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sponsors.map((sponsor) => (
                <TableRow
                  key={sponsor.id}
                  className={sponsor.id % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <TableCell className="py-4">{sponsor.name}</TableCell>
                  <TableCell className="py-4">
                    {sponsor.is_partnership ? (
                      <div className="px-4 py-2 bg-green-500 text-white text-center rounded-2xl">
                        Tak
                      </div>
                    ) : (
                      <div className=" py-2 bg-red-500 text-white text-center rounded-2xl">
                        Nie
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="md:block hidden py-4">
                    {sponsor.logo ? (
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        height={100}
                        width={200}
                      ></Image>
                    ) : (
                      "Brak logo"
                    )}
                  </TableCell>
                  <TableCell className="py-4">Edytuj</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
    </div>
  );
}
