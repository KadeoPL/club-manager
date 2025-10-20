import React from "react";
import { Trash } from "lucide-react";
import { ListItem } from "@/types/listItem";

interface DeleteElementButtonType {
  element: ListItem;
  setElementToDelete: (element: { id: number; name: string }) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

export default function DeleteElementButton({
  setElementToDelete,
  setIsModalOpen,
  element,
}: DeleteElementButtonType) {
  const handleClick = () => {
    setElementToDelete({
      id: element.id,
      name: element.name,
    });
    setIsModalOpen(true);
  };

  return (
    <div
      className="text-red-500 cursor-pointer flex gap-1 items-center"
      onClick={handleClick}
    >
      <Trash size={16} /> Usuń
    </div>
  );
}
