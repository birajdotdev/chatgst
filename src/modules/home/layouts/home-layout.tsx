"use client";

import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import { Navbar } from "@/modules/home/components/navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isScrolled } = useScroll({ threshold: 10 });

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar
        className={cn(
          "fixed top-0 right-0 left-0 z-50 h-16 px-4 transition-all duration-300 sm:px-6 lg:px-8",
          isScrolled
            ? "border-b bg-background/95 shadow-sm backdrop-blur supports-backdrop-filter:bg-background/60"
            : "border-b-transparent bg-transparent"
        )}
      />
      <div className="grow">{children}</div>
    </main>
  );
}
