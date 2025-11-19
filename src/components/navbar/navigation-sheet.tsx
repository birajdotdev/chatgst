import Link from "next/link";

import { Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/navbar/nav-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NavigationSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="max-h-screen px-6 py-3">
        <Logo />
        <NavMenu orientation="vertical" className="mt-6 [&>div]:h-full" />
        <SheetFooter>
          <Button variant="default" size="lg" className="inline-flex">
            <Link href="/register">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" className="inline-flex" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
