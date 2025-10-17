import React from "react";
import { Trash } from "lucide-react";

export default function DeleteElementButton() {
  return (
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
  );
}
