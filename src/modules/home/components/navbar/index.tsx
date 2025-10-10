"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { NavMenu } from "@/modules/home/components/navbar/nav-menu";
import { NavigationSheet } from "@/modules/home/components/navbar/navigation-sheet";

export function Navbar() {
  const { isScrolled } = useScroll({ threshold: 10 });

  return (
    <nav
      className={cn(
        "fixed top-0 right-0 left-0 z-50 h-16 transition-all duration-300",
        isScrolled
          ? "border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "border-b-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button>Get Started</Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
