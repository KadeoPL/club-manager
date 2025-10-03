import React from "react";
import { signOut } from "next-auth/react";
import { Power } from "lucide-react";

export default function LogoutButton() {
  async function onSubmit() {
    await signOut({ callbackUrl: "/" });
  }

  return (
    <div
      className="text-sm flex cursor-pointer hover:text-gray-500"
      onClick={onSubmit}
    >
      <Power className="w-4 mr-1" />
      Wyloguj
    </div>
  );
}
