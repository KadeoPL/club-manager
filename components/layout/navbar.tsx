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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { navLinks } from "@/lib/nav-links";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <>
      <div className="w-full flex h-16 px-10 lg:h-32 max-w-6xl mx-auto justify-between items-center">
        <div className="flex justify-center items-center">Logo</div>
        {/* Desktop */}
        <NavigationMenu className="hidden lg:flex">
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
                  <NavigationMenuContent className="bg-primary text-white">
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {item.items.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.url}
                        ></ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
        {/* Mobile */}
        <div className="flex  lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetHeader className="hidden">
              <SheetTitle className="hidden">Menu</SheetTitle>
            </SheetHeader>

            <SheetContent>
              <Accordion type="single" collapsible className="mt-16 px-8">
                {navLinks.map((item, index) =>
                  !item.items ? (
                    <AccordionItem
                      value={`item-${index}`}
                      key={index}
                      className="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180"
                    >
                      <Link href={item.url}>{item.title}</Link>
                    </AccordionItem>
                  ) : (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger>{item.title}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="flex flex-col gap-4 pl-4">
                          {item.items.map((item) => (
                            <li key={item.title}>
                              <Link href={item.url} className="hover:underline">
                                {item.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  )
                )}
              </Accordion>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
