'use client'
import React from "react";
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

type TData = Record<string, any>;

export interface ColumnDefinition<T extends TData> {
  key: keyof T;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export default function ManageTable() {

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl mb-10">{props.title}</h1>
      </div>

      {data.length === 0 && (
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
                {props.columns.map((col) => (
                  <TableHead key={String(col.key)} className="w-[200px]">
                    {col.header}
                  </TableHead>
                ))}
                <TableHead>Zarządzaj</TableHead>
              </TableRow>
            </TableHeader>
            {/* <TableBody>
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
                        src={element.logo}
                        alt={element.name}
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
                      <DeleteElementButton
                        setElementToDelete={setElementToDelete}
                        setIsModalOpen={setIsModalOpen}
                        element={element}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody> */}
          </Table>
        )
      )}
     
    </div>
  );
}
