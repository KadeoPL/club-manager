import React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navLinks } from "@/lib/nav-links";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="w-full none lg:flex min-h-32 max-w-6xl mx-auto justify-between">
        <div className="flex justify-center items-center">Logo</div>
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map((item, index) =>
              !item.items ? (
                <NavigationMenuItem
                  className={navigationMenuTriggerStyle()}
                  key={index}
                >
                  <Link href={item.url}>{item.title}</Link>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger className="cursor-pointer">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="fixed top-0 left-0 w-screen bg-primary text-background z-10 flex flex-col gap-4">
                    {item.items.map((item, index) => (
                      <Link key={index} href={item.url}>
                        {item.title}
                      </Link>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </>
  );
}
