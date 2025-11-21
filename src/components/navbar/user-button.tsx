"use client";

import {
  ChevronDownIcon,
  LogOutIcon,
  PaletteIcon,
  SettingsIcon,
  UserRoundIcon,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/modules/auth/actions/logout-action";

export default function UserButton({
  name = "",
  email = "",
}: {
  name?: string;
  email?: string;
}) {
  const { theme, setTheme } = useTheme();
  const { execute, isExecuting, reset } = useAction(logoutAction, {
    onSuccess: () => {
      reset();
    },
    onError: () => {
      toast.error("Logout failed. Please try again.");
    },
  });

  const handelLogout = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    execute();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage
              src="https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png"
              alt="Profile image"
            />
            <AvatarFallback>
              {name ? name.charAt(0) + name.charAt(1) : ""}
            </AvatarFallback>
          </Avatar>
          <ChevronDownIcon aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-64" align="end">
        <DropdownMenuLabel className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium text-foreground">
            {name}
          </span>
          <span className="truncate text-xs font-normal text-muted-foreground">
            {email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <UserRoundIcon aria-hidden="true" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SettingsIcon aria-hidden="true" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <PaletteIcon aria-hidden="true" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                  checked={theme === "light"}
                  onCheckedChange={() => setTheme("light")}
                >
                  Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "dark"}
                  onCheckedChange={() => setTheme("dark")}
                >
                  Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === "system"}
                  onCheckedChange={() => setTheme("system")}
                >
                  System
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handelLogout} disabled={isExecuting}>
          <LogOutIcon aria-hidden="true" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
