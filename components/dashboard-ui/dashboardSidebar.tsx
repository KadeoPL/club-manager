"use client";

import Link from "next/link";
import { Undo2 } from "lucide-react";
import {
  SidebarContent,
  Sidebar,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import { dashboardNavLinks } from "@/lib/dashboard-nav-link";

export default function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-slate-800 text-white">
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
      </SidebarHeader>
      <SidebarContent className="gap-0 bg-slate-950 text-white">
        {dashboardNavLinks.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="text-slate-400 font-bold bg-slate-800 rounded-none">
              <item.icon />
              <span className="ml-2">{item.title}</span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton>
                      <Link href={item.url} className="text-xs">
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {/* <SidebarFooter className="bg-slate-950 text-white">
          <div className="text-xs italic font-light mb-2">
            Zalogowago jako
            <span className="font-bold  ml-1 not-italic">{userName}</span>
          </div>

          <LogoutButton />
        </SidebarFooter> */}
    </Sidebar>
  );
}
