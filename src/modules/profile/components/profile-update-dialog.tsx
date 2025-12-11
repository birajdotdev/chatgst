"use client";

import { useEffect, useState } from "react";

import { useAction } from "next-safe-action/hooks";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { getProfileAction } from "@/modules/profile/actions/get-profile-action";
import { ProfileForm } from "@/modules/profile/components/profile-form";
import { UpdateProfileSchema } from "@/modules/profile/validations/profile-schema";

interface ProfileUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileUpdateDialog({
  open,
  onOpenChange,
}: ProfileUpdateDialogProps) {
  const { execute, result, isExecuting } = useAction(getProfileAction);
  const [profileData, setProfileData] =
    useState<Partial<UpdateProfileSchema> | null>(null);

  useEffect(() => {
    if (open) {
      execute({});
    }
  }, [open, execute]);

  useEffect(() => {
    if (result.data?.data) {
      const rawData = result.data.data as Record<string, any>;
      const cleanData = Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [
          key,
          value === "string" ? "" : value,
        ])
      );
      setProfileData(cleanData as unknown as Partial<UpdateProfileSchema>);
    }
  }, [result]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-5xl overflow-y-auto sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        {isExecuting ? (
          <div className="flex h-40 items-center justify-center">
            <Spinner />
          </div>
        ) : profileData ? (
          <ProfileForm
            initialData={profileData}
            onSuccess={() => onOpenChange(false)}
          />
        ) : (
          <div className="py-10 text-center text-muted-foreground">
            Failed to load profile.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
