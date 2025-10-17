"use client";

import React from "react";
import { useFetchData } from "@/hooks/useFetchData";
import { useState } from "react";
import { deleteFromDB } from "@/lib/deleteFromDB";
import { Spinner } from "../ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import Link from "next/link";
import EditButton from "./EditButton";

interface ManageDataType {
  endpoint: string;
  title: string;
  addElementLink: string;
}

export default function ManageData(props: ManageDataType) {
  const { data, loading, error, deleteElementFromState } = useFetchData(
    props.endpoint
  );
  const [elementToDelete, setElementToDelete] = useState<{
    id: number;
    name: string;
  }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!elementToDelete) return;

    const success = await deleteFromDB(
      elementToDelete.id,
      props.endpoint,
      elementToDelete.name
    );

    if (success) {
      deleteElementFromState(elementToDelete.id);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl mb-10">{props.title}</h1>
      </div>

      {loading && <Spinner />}
      {error && <div className="text-red-500 mb-4">Błąd: {error}</div>}

      {data.length === 0 && !loading && !error ? (
        <div>
          <div className="font-bold mb-5">
            Nie masz jeszcze żadnych sponsorów.
          </div>
          <Button>
            <Link href={`/dashboard/${props.addElementLink}`}>Dodaj</Link>
          </Button>
        </div>
      ) : (
        data.length > 0 && (
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
              {data.map((element, index) => (
                <TableRow
                  key={element.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <TableCell className="py-4">{element.name}</TableCell>
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
                      <EditButton />
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
