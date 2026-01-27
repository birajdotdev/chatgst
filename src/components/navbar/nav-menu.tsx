"use client";

import { ComponentProps } from "react";

import { Link, useLocation } from "@tanstack/react-router";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

type NavMenuItem = {
  title: string;
  href: string;
};

const navMenuItems: NavMenuItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#about" },
  { title: "How it works", href: "/#how-it-works" },
];

const navMenuAuthenticatedItems: NavMenuItem[] = [
  { title: "Chat", href: "/chat" },
  { title: "Appeal Draft", href: "/appeal-draft" },
  { title: "Language Assistance", href: "/language-assistance" },
];

interface NavMenuProps extends ComponentProps<typeof NavigationMenu> {
  isAuthenticated?: boolean;
}

export function NavMenu({ isAuthenticated = false, ...props }: NavMenuProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {(isAuthenticated ? navMenuAuthenticatedItems : navMenuItems).map(
          (item) => (
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink
                active={
                  pathname === item.href || pathname.startsWith(item.href)
                }
                className="bg-transparent! text-base underline-offset-4 hover:text-primary! hover:underline data-active:text-primary! data-active:underline"
                asChild
              >
                <Link
                  to={item.href}
                  className="flex flex-row items-center gap-2 whitespace-nowrap"
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
