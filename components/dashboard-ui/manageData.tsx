"use client";

import React, { useState } from "react";
import { useFetchData } from "@/hooks/useFetchData";
import ManageTable from "./ManageTable";
import { Spinner } from "../ui/spinner";
import DeleteModal from "./deleteModal";
import { deleteFromDB } from "@/lib/deleteFromDB";
import { ColumnDefinition } from "./ManageTable";

type TData = Record<string, any>;

export interface ManageDataType<T extends TData> {
  endpoint: string;
  title: string;
  addElementLink: string;
  data: T[];
  columns: ColumnDefinition<T>[];
}

export default function ManageData<T extends TData>({
  endpoint,
  title,
  addElementLink,
  columns,
}: ManageDataType<T>) {
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
    }
  };

  return (
    <div>
      {loading && <Spinner />}
      {error && <div className="text-red-500 mb-4">Błąd: {error}</div>}
      <ManageTable />

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
