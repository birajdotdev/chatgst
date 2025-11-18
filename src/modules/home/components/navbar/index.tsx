"use client";

import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NavMenu } from "@/modules/home/components/navbar/nav-menu";
import { NavigationSheet } from "@/modules/home/components/navbar/navigation-sheet";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 h-16 px-4 sm:px-6 lg:px-8",
        className
      )}
    >
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <nav className="flex items-center gap-3">
          <Button
            variant="default"
            size="lg"
            className="hidden min-w-[120px] md:inline-flex"
            asChild
          >
            <Link href="/register">Get Started</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="hidden min-w-[120px] md:inline-flex"
            asChild
          >
            <Link href="/login">Sign In</Link>
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </nav>
      </div>
    </header>
  );
}
