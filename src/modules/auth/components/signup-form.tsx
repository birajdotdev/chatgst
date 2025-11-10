"use client";

import { Activity, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { PasswordInput } from "@/components/password-input";
import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import {
  SignupInput,
  contactSchema,
  gstSpecificSchema,
  personalSchema,
  professionalSchema,
  signupSchema,
} from "@/modules/auth/validations/signup-schema";

const steps: Array<{ step: number; title: string }> = [
  { step: 1, title: "Personal" },
  { step: 2, title: "GST Specific" },
  { step: 3, title: "Professional" },
  { step: 4, title: "Contact" },
  { step: 5, title: "Preview" },
];

export function SignupForm() {
  const [activeStep, setActiveStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
      gstin: "",
      business_name: "",
      constitution_of_business: "",
      state_or_jurisdiction: "",
      user_type: "",
      organization_name: "",
      designation: "",
      professional_registration_number: "",
      address: "",
      pincode: "",
      alternate_email_or_phone: "",
    },
  });

  const formValues = useWatch({ control: form.control });

  const validateStep = async (stepNumber: number): Promise<boolean> => {
    // Get the form values
    const formValues = form.getValues();

    // Get the appropriate Zod schema for this step
    const stepSchemas = {
      1: personalSchema,
      2: gstSpecificSchema,
      3: professionalSchema,
      4: contactSchema,
    } as const;

    const schema = stepSchemas[stepNumber as keyof typeof stepSchemas];
    if (!schema) return false;

    // Use Zod to validate the step (includes refinements)
    const result = await schema.safeParseAsync(formValues);

    if (!result.success) {
      // Map Zod errors to react-hook-form
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof SignupInput;
        form.setError(fieldName, {
          type: "validation",
          message: issue.message,
        });
      });
      return false;
    }

    // Clear errors for this step's fields if validation passed
    return true;
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    const isValid = await validateStep(activeStep);

    if (isValid) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <Card className="flex min-h-[620px] flex-col gap-0 p-0">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col justify-between"
      >
        <CardContent className="space-y-8 px-12 py-7">
          <div className="space-y-8 text-center">
            <Stepper defaultValue={1} value={activeStep}>
              {steps.map(({ step, title }) => (
                <StepperItem
                  key={step}
                  step={step}
                  className="relative flex-1 flex-col!"
                >
                  <StepperTrigger className="flex-col gap-3 rounded">
                    <StepperIndicator className="size-7" />
                    <div className="space-y-0.5 px-2">
                      <StepperTitle className="text-muted-foreground group-data-[state=active]/step:text-primary">
                        {title}
                      </StepperTitle>
                    </div>
                  </StepperTrigger>
                  {step < steps.length && (
                    <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                  )}
                </StepperItem>
              ))}
            </Stepper>
          </div>
          <div>
            {/* Personal */}
            <Activity mode={activeStep === 1 ? "visible" : "hidden"}>
              <FieldGroup className="gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <Controller
                      name="first_name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            First Name{" "}
                            <span className="text-destructive">*</span>
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g. John"
                            required
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <div className="col-span-1">
                    <Controller
                      name="middle_name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Middle Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                  <div className="col-span-1">
                    <Controller
                      name="last_name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Last Name{" "}
                            <span className="text-destructive">*</span>
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g. Doe"
                            required
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>
                </div>
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
                        placeholder="e.g. example@gmail.com"
                        required
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
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
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Password <span className="text-destructive">*</span>
                      </FieldLabel>
                      <PasswordInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="********"
                        showStrengthIndicator
                        required
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="confirm_password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Confirm Password{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <PasswordInput
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="********"
                        required
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </Activity>

            {/* GST Specific */}
            <Activity mode={activeStep === 2 ? "visible" : "hidden"}>
              <FieldGroup className="gap-4">
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
                        placeholder="e.g. 22AAAAA0000A1Z5"
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
                        Business/Trade Name{" "}
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Achme Corp"
                        required
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="constitution_of_business"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        Constitution of Business
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="- Select -" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="proprietorship">
                            Proprietorship
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership
                          </SelectItem>
                          <SelectItem value="llp">LLP</SelectItem>
                          <SelectItem value="pct_ltd">Pvt Ltd</SelectItem>
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
                        State/Jurisdiction
                        <span className="text-destructive">*</span> (for GST
                        zone-based feature)
                      </FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Maharashtra"
                        required
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </Activity>

            {/* Professional */}
            <Activity mode={activeStep === 3 ? "visible" : "hidden"}>
              <FieldGroup className="gap-4">
                <Controller
                  name="user_type"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>
                        User Type
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                        >
                          <SelectValue placeholder="e.g. Consultant" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="taxpayer">Taxpayer</SelectItem>
                          <SelectItem value="consultant">Consultant</SelectItem>
                          <SelectItem value="ca">CA</SelectItem>
                          <SelectItem value="advocate">Advocate</SelectItem>
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
                        Firm Name / Organization
                        <span className="text-destructive">*</span>
                      </FieldLabel>
                      <Input
                        {...field}
                        value={field.value}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Achme Corp"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="designation"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Designation</FieldLabel>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Lawyer"
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
                        <FieldDescription className="ml-1">
                          (for CA/Advocate users)
                        </FieldDescription>
                      </FieldLabel>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. CA"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </Activity>

            {/* Address */}
            <Activity mode={activeStep === 4 ? "visible" : "hidden"}>
              <FieldGroup className="gap-4">
                <Controller
                  name="address"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. Baneshwor, Kathmandu, Nepal"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="pincode"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Pincode</FieldLabel>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g: 44600"
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
                        Alternate Email/Phone
                      </FieldLabel>
                      <Input
                        {...field}
                        value={field.value ?? ""}
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        placeholder="e.g. example@gmail.com"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </Activity>

            {/* Preview */}
            <Activity mode={activeStep === 5 ? "visible" : "hidden"}>
              <ScrollArea className="h-80">
                <FieldGroup className="gap-4.5">
                  <div className="space-y-3">
                    <h1 className="text-sm font-medium text-primary">
                      Personal Information
                    </h1>
                    <div className="grid grid-cols-3">
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">
                          Full Name
                        </h2>
                        <p className="text-sm">{`${formValues.first_name} ${formValues.middle_name} ${formValues.last_name}`}</p>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">Email</h2>
                        <p className="text-sm">{formValues.email}</p>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">
                          Phone Number
                        </h2>
                        <p className="text-sm">{formValues.phone_number}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h1 className="text-sm font-medium text-primary">
                      GST Specific
                    </h1>
                    <div className="grid grid-cols-3 gap-y-3.5">
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">GSTIN</h2>
                        <p className="text-sm">{formValues.gstin}</p>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">
                          Business/Trade Name
                        </h2>
                        <p className="text-sm">{formValues.business_name}</p>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">
                          Constitution of Business
                        </h2>
                        <p className="text-sm capitalize">
                          {formValues.constitution_of_business}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">
                          State / Jurisdiction
                        </h2>
                        <p className="text-sm capitalize">
                          {formValues.state_or_jurisdiction}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h1 className="text-sm font-medium text-primary">
                      Professional
                    </h1>
                    <div className="grid grid-cols-3 gap-y-3.5">
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">
                          User Type
                        </h2>
                        <p className="text-sm capitalize">
                          {formValues.user_type}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">
                          Firm Name / Organization
                        </h2>
                        <p className="text-sm">
                          {formValues.organization_name}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">
                          Designation / Role
                        </h2>
                        <p className="text-sm">
                          {formValues.designation || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">
                          Professional Registration No.
                        </h2>
                        <p className="text-sm">
                          {formValues.professional_registration_number || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h1 className="text-sm font-medium text-primary">
                      Contact
                    </h1>
                    <div className="grid grid-cols-3 gap-y-3.5">
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">
                          Address
                        </h2>
                        <p className="text-sm capitalize">
                          {formValues.address || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">
                          Pincode
                        </h2>
                        <p className="text-sm">{formValues.pincode || "N/A"}</p>
                      </div>
                      <div className="space-y-1">
                        <h2 className="text-xs text-muted-foreground">
                          Alternate Email/Phone
                        </h2>
                        <p className="text-sm">
                          {formValues.alternate_email_or_phone || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </FieldGroup>
              </ScrollArea>
            </Activity>
          </div>
        </CardContent>
        <Activity mode={activeStep === 5 ? "visible" : "hidden"}>
          <CardFooter className="block space-y-2 border-t px-8 py-3!">
            <FieldLabel className="t</CardFooter>ext-muted-foreground text-xs">
              Terms & Conditions
            </FieldLabel>
            <div className="grid grid-cols-2">
              <Controller
                name="terms_and_privacy_policy"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <Checkbox
                      id={field.name}
                      name={field.name}
                      aria-invalid={fieldState.invalid}
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel htmlFor={field.name}>
                      I agree to Terms and Privacy Policy
                    </FieldLabel>
                  </Field>
                )}
              />
              <Controller
                name="receive_updates_or_newsletter"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <Checkbox
                      id={field.name}
                      name={field.name}
                      aria-invalid={fieldState.invalid}
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                    <FieldLabel htmlFor={field.name}>
                      I consent to receive updates/newsletters
                    </FieldLabel>
                  </Field>
                )}
              />
            </div>
          </CardFooter>
        </Activity>
        <CardFooter className="border-t px-8 py-4!">
          {activeStep > 1 && (
            <Button
              type="button"
              variant="outline"
              className="min-w-[120px] border-primary text-primary!"
              onClick={handleBack}
            >
              Back
            </Button>
          )}
          {activeStep < 5 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="ml-auto min-w-[120px]"
            >
              Next
            </Button>
          ) : (
            <Button type="submit" className="ml-auto min-w-[120px]">
              Submit
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
