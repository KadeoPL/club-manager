"use client";

import React, { useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import ManageTable, { ColumnDefinition } from "./ManageTable";
import { Spinner } from "../ui/spinner";
import DeleteModal from "./deleteModal";
import { deleteFromDB } from "@/lib/deleteFromDB";

type TData = Record<string, any>;

export interface ManageDataType<
  T extends { id: number; name?: string } & TData
> {
  endpoint: string;
  title: string;
  addElementLink: string;
  columns: ColumnDefinition<T>[];
}

export default function ManageData<
  T extends { id: number; name?: string } & TData
>({ endpoint, title, addElementLink, columns }: ManageDataType<T>) {
  const { data, loading, error, deleteElementFromState } =
    useFetchData(endpoint);

  const [elementToDelete, setElementToDelete] = useState<{
    id: number;
    name: string;
  }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    if (!elementToDelete) return;

    const success = await deleteFromDB(
      elementToDelete.id,
      endpoint,
      elementToDelete.name
    );

    if (success) {
      deleteElementFromState(elementToDelete.id);
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      {loading && <Spinner />}
      {error && <div className="text-red-500 mb-4">Błąd: {error}</div>}

      <ManageTable<T>
        title={title}
        addElementLink={addElementLink}
        columns={columns}
        data={(Array.isArray(data) ? (data as unknown as T[]) : []) ?? []}
        renderActions={(row: T) => (
          <div className="flex gap-4">
            <button
              className="text-red-600 hover:underline"
              onClick={() => {
                setElementToDelete({
                  id: row.id,
                  name: (row as any).name ?? "element",
                });
                setIsModalOpen(true);
              }}
            >
              Usuń
            </button>
          </div>
        )}
      />

      {isModalOpen && elementToDelete && (
        <DeleteModal
          name={elementToDelete.name}
          setIsOpen={setIsModalOpen}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
