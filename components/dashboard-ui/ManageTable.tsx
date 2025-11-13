"use client";
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

interface ManageTableProps<T extends TData> {
  title: string;
  addElementLink: string;
  columns: ColumnDefinition<T>[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
  emptyLabel?: string;
  addButtonLabel?: string;
}

export default function ManageTable<T extends TData>(
  props: ManageTableProps<T>
) {
  const {
    title,
    addElementLink,
    columns,
    data,
    renderActions,
    emptyLabel = "Nie znaleziono elementów.",
    addButtonLabel = "Dodaj",
  } = props;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl mb-10">{title}</h1>
      </div>

      {data.length === 0 ? (
        <div>
          <div className="font-bold mb-5">{emptyLabel}</div>
          <Button asChild>
            <Link href={`/dashboard/${addElementLink}`}>{addButtonLabel}</Link>
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={String(col.key)} className="w-[200px]">
                  {col.header}
                </TableHead>
              ))}
              {renderActions && <TableHead>Zarządzaj</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={(row as any).id ?? index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
              >
                {columns.map((col) => (
                  <TableCell key={String(col.key)} className="py-4">
                    {col.render ? col.render(row) : String(row[col.key] ?? "")}
                  </TableCell>
                ))}
                {renderActions && (
                  <TableCell className="py-4">{renderActions(row)}</TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
