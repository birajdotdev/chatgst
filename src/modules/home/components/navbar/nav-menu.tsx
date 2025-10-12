import { Route } from "next";
import Link from "next/link";
import { ComponentProps } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

type NavMenuItem = {
  title: string;
  href: Route;
};

const navMenuItems: NavMenuItem[] = [
  { title: "Home", href: "#hero" },
  { title: "About", href: "#" },
  { title: "How it works", href: "#how-it-works" },
];

export function NavMenu(props: ComponentProps<typeof NavigationMenu>) {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {navMenuItems.map((item) => (
          <NavigationMenuItem key={item.title}>
            <NavigationMenuLink
              className="!bg-transparent text-base underline-offset-4 hover:!text-primary hover:underline"
              asChild
            >
              <Link href={item.href}>{item.title}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
