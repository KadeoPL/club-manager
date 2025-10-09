import React from "react";

interface StatusBadgeProps {
  value: boolean;
}

export default function StatusBadge({ value }: StatusBadgeProps) {
  if (value) {
    return (
      <div className="text-xs bg-green-200 text-green-600 flex justify-center py-2 rounded-2xl">
        Tak
      </div>
    );
  } else {
    return (
      <div className="text-xs bg-red-200 text-red-600 flex justify-center py-2 rounded-2xl">
        Nie
      </div>
    );
  }
}
