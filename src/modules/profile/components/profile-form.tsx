"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { LockIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { CONSTITUTION_OF_BUSINESS_VALUES } from "@/modules/auth/constants/constitution-of-businesses";
import { USER_TYPE_VALUES } from "@/modules/auth/constants/user-types";
import { updateProfileFn } from "@/modules/profile/actions/update-profile-action";
import {
  UpdateProfileSchema,
  updateProfileSchema,
} from "@/modules/profile/validations/profile-schema";

import { ResetPasswordDialog } from "./reset-password-dialog";

interface ProfileFormProps {
  initialData: Partial<UpdateProfileSchema>;
  onSuccess?: () => void;
}

type ProfileFormData = z.infer<typeof updateProfileSchema>;

export function ProfileForm({ initialData, onSuccess }: ProfileFormProps) {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: initialData,
  });

  const mutation = useMutation({
    mutationFn: (input: ProfileFormData) => updateProfileFn({ data: input }),
    onSuccess: (data) => {
      toast.success(data?.message || "Profile updated successfully");
      onSuccess?.();
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="w-full">
      <form onSubmit={onSubmit} className="space-y-6">
        <FieldGroup className="gap-4">
          {/* Personal Details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="full_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Full Name <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. John Doe"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Email <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    disabled
                    className="cursor-not-allowed bg-muted opacity-60"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="phone_number"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Phone <span className="text-destructive">*</span>
                  </FieldLabel>
                  <PhoneInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    defaultCountry="IN"
                    international
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* GST Details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="gstin"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    GSTIN <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="business_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Business Name <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="constitution_of_business"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Constitution of Business{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {CONSTITUTION_OF_BUSINESS_VALUES.map((val) => (
                        <SelectItem key={val} value={val}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="state_or_jurisdiction"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    State / Jurisdiction{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Professional Details */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="user_type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    User Type <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {USER_TYPE_VALUES.map((val) => (
                        <SelectItem key={val} value={val}>
                          {val}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="organization_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Organization Name{" "}
                    <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="designation"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Designation</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="professional_registration_number"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Professional Registration Number
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 gap-4">
            <Controller
              name="address"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="pincode"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Pincode</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="alternate_email_or_phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Alternate Email or Phone
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    value={field.value || ""}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>
        <div className="flex flex-col-reverse gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button
            variant="outline"
            type="button"
            className="w-full sm:w-auto"
            onClick={() => setPasswordDialogOpen(true)}
          >
            <LockIcon className="h-4 w-4" /> Change Password
          </Button>
          <Button
            type="submit"
            className="w-full sm:w-[150px]"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <Spinner /> : "Update Profile"}
          </Button>
        </div>
      </form>

      <ResetPasswordDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
      />
    </div>
  );
}
