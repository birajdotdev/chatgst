import { Menu } from "lucide-react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavMenu } from "@/modules/home/components/navbar/nav-menu";

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
            Get Started
          </Button>
          <Button size="lg" variant="outline" className="inline-flex">
            Sign In
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
