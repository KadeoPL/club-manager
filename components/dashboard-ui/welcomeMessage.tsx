import { useSession } from "next-auth/react";
import React from "react";

export default function WelcomeMessage() {
  const { data: session } = useSession();

  if (session?.user) {
    const userName = session.user.name;
    return (
      <p className="text-sm">
        Witaj <span className="font-bold">{userName}</span>
      </p>
    );
  } else {
    return <p className="text-sm">Błąd pobierania</p>;
  }
}
