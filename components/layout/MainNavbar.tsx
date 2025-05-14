import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navLinks } from "@/lib/nav-links";
import Link from "next/link";

export default function MainNavbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navLinks.map((item, index) => {
          return (
            <NavigationMenuItem key={index}>
              {item.children ? (
                <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
              ) : (
                <Link href={item.href}>{item.name}</Link>
              )}
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
