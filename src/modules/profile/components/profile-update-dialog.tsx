"use client";

import { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getProfileFn } from "@/modules/profile/actions/get-profile-action";
import { ProfileForm } from "@/modules/profile/components/profile-form";
import { ProfileFormSkeleton } from "@/modules/profile/components/profile-form-skeleton";
import { UpdateProfileSchema } from "@/modules/profile/validations/profile-schema";

interface ProfileUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileUpdateDialog({
  open,
  onOpenChange,
}: ProfileUpdateDialogProps) {
  const [profileData, setProfileData] =
    useState<Partial<UpdateProfileSchema> | null>(null);

  const mutation = useMutation({
    mutationFn: () => getProfileFn(),
    onSuccess: (result) => {
      if (result?.data) {
        const rawData = result.data as unknown as Record<string, unknown>;
        const cleanData = Object.fromEntries(
          Object.entries(rawData).map(([key, value]) => [
            key,
            value === "string" ? "" : value,
          ])
        );
        setProfileData(cleanData as unknown as Partial<UpdateProfileSchema>);
      }
    },
  });

  useEffect(() => {
    if (open) {
      mutation.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-5xl overflow-y-auto sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        {mutation.isPending ? (
          <ProfileFormSkeleton />
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
