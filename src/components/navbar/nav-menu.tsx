"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { title: "Home", href: "/" },
  { title: "About", href: "/#about" },
  { title: "How it works", href: "/#how-it-works" },
];

const navMenuAuthenticatedItems: NavMenuItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#about" },
  { title: "Appeal Draft", href: "/appeal-draft" as Route },
  { title: "Language Assistance", href: "/language-assistance" as Route },
];

interface NavMenuProps extends ComponentProps<typeof NavigationMenu> {
  isAuthenticated?: boolean;
}

export function NavMenu({ isAuthenticated = false, ...props }: NavMenuProps) {
  const pathname = usePathname();

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {(isAuthenticated ? navMenuAuthenticatedItems : navMenuItems).map(
          (item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                active={pathname === item.href}
                className="bg-transparent! text-base underline-offset-4 hover:text-primary! hover:underline data-active:text-primary! data-active:underline"
                asChild
              >
                <Link href={item.href}>{item.title}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
