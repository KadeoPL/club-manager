"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Undo2 } from "lucide-react";
import LogoutButton from "./logoutButton";

export default function DashboardNavigation() {
  const { data: session } = useSession();

  if (session?.user) {
    const userName = session.user.name;

    return (
      <div className="h-full min-w-56 bg-gray-950 p-6 text-white flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <Link href="/dashboard" className="font-bold">
            Panel zarządzania
          </Link>
          <Link
            href="/"
            className="text-xs flex items-center hover:text-gray-500"
          >
            <Undo2 className="w-4 mr-1" />
            Wróć do strony głównej
          </Link>

          <div className="text-sm mt-6">Posty</div>
        </div>
        <div>
          <div className="text-xs italic font-light mb-2">
            Zalogowago jako
            <span className="font-bold  ml-1 not-italic">{userName}</span>
          </div>
        </div>
        <LogoutButton />
      </div>
    );
  }
}
