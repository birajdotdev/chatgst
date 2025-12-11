"use client";

import { useState } from "react";

import {
  ChevronDownIcon,
  LogOutIcon,
  PaletteIcon,
  SettingsIcon,
  UserRoundIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

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
import LogoutAlertDialog from "@/modules/auth/components/logout-alert-dialog";
import { ProfileUpdateDialog } from "@/modules/profile/components/profile-update-dialog";

export default function UserButton({
  name = "",
  email = "",
}: {
  name?: string;
  email?: string;
}) {
  const { theme, setTheme } = useTheme();
  const [openLogoutDialog, setOpenLogoutDialog] = useState<boolean>(false);
  const [showProfileDialog, setShowProfileDialog] = useState<boolean>(false);

  return (
    <>
      <ProfileUpdateDialog
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
      />
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
            <DropdownMenuItem onSelect={() => setShowProfileDialog(true)}>
              <UserRoundIcon aria-hidden="true" />
              <span>Account</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
              <SettingsIcon aria-hidden="true" />
              <span>Settings</span>
            </DropdownMenuItem> */}
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
          <DropdownMenuItem onSelect={() => setOpenLogoutDialog(true)}>
            <LogOutIcon aria-hidden="true" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutAlertDialog
        open={openLogoutDialog}
        onOpenChange={setOpenLogoutDialog}
      />
    </>
  );
}
