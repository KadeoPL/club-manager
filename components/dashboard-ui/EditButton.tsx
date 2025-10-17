import React from "react";
import { SquarePen } from "lucide-react";

export default function EditButton() {
  return (
    <div className="cursor-pointer flex gap-1 items-center">
      <SquarePen size={16} />
      Edytuj
    </div>
  );
}
