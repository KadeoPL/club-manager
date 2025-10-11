"use client";

import { useState } from "react";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash, SquarePen } from "lucide-react";
import { useFetchSponsors } from "@/hooks/useFetchSponsors";

export default function page() {
  const { sponsors, loading, error, deleteSponsorFromState } =
    useFetchSponsors();
  const [sponsorToDelete, setSponsorsToDelete] = useState<{
    id: number;
    name: string;
  }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!sponsorToDelete) return;

    const success = await deleteFromDB(
      sponsorToDelete.id,
      "sponsors",
      sponsorToDelete.name
    );

    if (success) {
      deleteSponsorFromState(sponsorToDelete.id);
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
        <div>
          <div className="font-bold mb-5">
            Nie masz jeszcze żadnych sponsorów.
          </div>
          <Button>
            <Link href={"/dashboard/dodaj-sponsora"}> Dodaj sponsora</Link>
          </Button>
        </div>
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
                    <div className="flex gap-4">
                      <div className="cursor-pointer flex gap-1 items-center">
                        <SquarePen size={16} />
                        Edytuj
                      </div>
                      <div
                        className="text-red-500 cursor-pointer flex gap-1 items-center"
                        onClick={() => {
                          setSponsorsToDelete({
                            id: sponsor.id,
                            name: sponsor.name,
                          });
                          setIsModalOpen(true);
                        }}
                      >
                        <Trash size={16} /> Usuń
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
