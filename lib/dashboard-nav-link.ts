import {
  StickyNote,
  UserRound,
  Trophy,
  Calendar1,
  Settings,
} from "lucide-react";

export const dashboardNavLinks = [
  {
    title: "Posty",
    url: "#",
    icon: StickyNote,
    items: [
      { title: "Dodaj post", url: "/dashboard/dodaj-post" },
      { title: "Zarządzaj postami", url: "/dashboard/zarzadzaj-postami" },
    ],
  },
  {
    title: "Drużyna",
    url: "#",
    icon: UserRound,
    items: [
      { title: "Dodaj drużynę", url: "#" },
      { title: "Zarządzaj drużynami", url: "#" },
    ],
  },
  {
    title: "Wydarzenia",
    url: "#",
    icon: Calendar1,
    items: [
      { title: "Dodaj wydarzenie", url: "#" },
      { title: "Zarządzaj wydarzeniami", url: "#" },
    ],
  },
  {
    title: "Sponsorzy",
    url: "#",
    icon: Calendar1,
    items: [
      { title: "Dodaj sponsora", url: "/dashboard/dodaj-sponsora" },
      { title: "Zarządzaj sponsorami", url: "/dashboard/zarzadzaj-sponsorami" },
    ],
  },
  {
    title: "Ustawienia",
    url: "#",
    icon: Settings,
    items: [
      { title: "Dodaj użytkownika", url: "#" },
      { title: "Zarządzaj użytkownikami", url: "#" },
      { title: "Zarządzaj stroną", url: "#" },
    ],
  },
];
