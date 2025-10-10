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
import { deleteFromDB } from "@/lib/deleteFromDB";
import StatusBadge from "@/components/dashboard-ui/statusBadge";
import DeleteModal from "@/components/dashboard-ui/deleteModal";

export default function page() {
  const [sponsors, setSponsors] = useState<sponsorsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sponsorToDelete, setSponsorsToDelete] = useState<{
    id: number;
    name: string;
  }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
      } finally {
        setLoading(false);
      }
    }

    fetchSponsors();
  }, []);

  const handleDelete = async () => {
    if (!sponsorToDelete) return;

    const success = await deleteFromDB(
      sponsorToDelete.id,
      "sponsors",
      sponsorToDelete.name
    );

    if (success) {
      setSponsors((prev) => prev.filter((s) => s.id !== sponsorToDelete.id));
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl mb-10">Zarządzaj sponsorami</h1>
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
                <TableHead>Zarządzaj</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sponsors.map((sponsor, index) => (
                <TableRow
                  key={sponsor.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <TableCell className="py-4">{sponsor.name}</TableCell>
                  <TableCell className="py-4">
                    <StatusBadge value={sponsor.is_partnership} />
                  </TableCell>
                  <TableCell className="md:block hidden py-4">
                    {sponsor.logo ? (
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        height={100}
                        width={100}
                      ></Image>
                    ) : (
                      <div>Brak logo</div>
                    )}
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex gap-3">
                      <div className="cursor-pointer">Edytuj</div>
                      <div
                        className="text-red-500 cursor-pointer"
                        onClick={() => {
                          setSponsorsToDelete({
                            id: sponsor.id,
                            name: sponsor.name,
                          });
                          setIsModalOpen(true);
                        }}
                      >
                        Usuń
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      )}
      {isModalOpen && sponsorToDelete && (
        <DeleteModal
          name={sponsorToDelete.name}
          setIsOpen={setIsModalOpen}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
