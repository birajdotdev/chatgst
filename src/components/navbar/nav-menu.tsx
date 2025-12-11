"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

import {
  Bot,
  FileText,
  Home,
  Info,
  Languages,
  type LucideIcon,
  Zap,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

type NavMenuItem = {
  title: string;
  href: Route;
  icon: LucideIcon;
};

const navMenuItems: NavMenuItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "About", href: "/#about", icon: Info },
  { title: "How it works", href: "/#how-it-works", icon: Zap },
];

const navMenuAuthenticatedItems: NavMenuItem[] = [
  { title: "AI - Assistant", href: "/chat", icon: Bot },
  // { title: "About", href: "/#about", icon: Info },
  { title: "Appeal Draft", href: "/appeal-draft", icon: FileText },
  {
    title: "Language Assistance",
    href: "/language-assistance" as Route,
    icon: Languages,
  },
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
                <Link
                  href={item.href}
                  className="flex flex-row items-center gap-2 whitespace-nowrap"
                >
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
