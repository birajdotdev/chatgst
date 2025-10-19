"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";

import { PasswordInput } from "@/components/password-input";
import { PhoneInput } from "@/components/phone-input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
} from "@/components/ui/stepper";
import { signupSchema } from "@/modules/auth/validations/auth-schema";

const steps: Array<{ step: number; title: string }> = [
  {
    step: 1,
    title: "Personal",
  },
  {
    step: 2,
    title: "Professional",
  },
  {
    step: 3,
    title: "Preview",
  },
];

export function SignupForm() {
  const [activeStep, setActiveStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      city: "",
      password: "",
      confirmPassword: "",
      organizationName: "",
      designation: "",
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: Array<keyof z.infer<typeof signupSchema>> = [];

    if (activeStep === 1) {
      fieldsToValidate = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "password",
        "confirmPassword",
      ];
    } else if (activeStep === 2) {
      fieldsToValidate = ["organizationName", "designation"];
    }

    const isValid = await form.trigger(fieldsToValidate);

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
    <Card className="min-h-[580px] gap-0 p-0">
      <CardHeader className="h-fit border-b px-12 !py-4">
        <CardTitle className="text-xl">Create an account</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-8 px-12 py-6">
        <div className="space-y-8 text-center">
          <Stepper defaultValue={1} value={activeStep}>
            {steps.map(({ step, title }) => (
              <StepperItem
                key={step}
                step={step}
                className="not-last:flex-1 max-md:items-start"
              >
                <div className="flex items-center gap-2 max-md:flex-col">
                  <StepperIndicator className="size-10 text-lg" />
                  <div className="text-center md:text-left">
                    <StepperTitle className="text-lg text-muted-foreground transition-colors duration-200 group-data-[state=active]/step:font-semibold group-data-[state=active]/step:text-primary">
                      {title}
                    </StepperTitle>
                  </div>
                </div>
                {step < steps.length && (
                  <StepperSeparator className="max-md:mt-3.5 md:mx-4" />
                )}
              </StepperItem>
            ))}
          </Stepper>
        </div>
        <form id="form-signup" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Personal */}
          <FieldGroup className={activeStep === 1 ? "gap-4" : "hidden gap-4"}>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <Controller
                  name="firstName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>First Name*</FieldLabel>
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
                  name="middleName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Middle Name</FieldLabel>
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
                  name="lastName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Last Name*</FieldLabel>
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
                  <FieldLabel htmlFor={field.name}>Email*</FieldLabel>
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
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone*</FieldLabel>
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
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>City</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="los-angeles">Los Angeles</SelectItem>
                      <SelectItem value="chicago">Chicago</SelectItem>
                      <SelectItem value="houston">Houston</SelectItem>
                      <SelectItem value="miami">Miami</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <FieldLabel htmlFor={field.name}>Password*</FieldLabel>
                  <PasswordInput
                    {...field}
                    id={field.name}
                    showStrength
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
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Confirm Password*
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
          {/* Professional */}
          <FieldGroup className={activeStep === 2 ? "" : "hidden"}>
            <Controller
              name="organizationName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Organization Name*
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Acme Corp"
                    required
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
                  <FieldLabel htmlFor={field.name}>Designation*</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="e.g. Software Engineer"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          {/* Preview */}
          {activeStep === 3 && (
            <FieldGroup>
              <section className="space-y-4">
                <h1 className="font font-semibold text-primary">
                  Personal Information
                </h1>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h2 className="space-y-2 text-xs text-muted-foreground">
                      Full Name
                    </h2>
                    <p>
                      {`${form.getValues("firstName")} ${form.getValues(
                        "middleName"
                      )} ${form.getValues("lastName")}`}
                    </p>
                  </div>
                  <div>
                    <h2 className="space-y-2 text-xs text-muted-foreground">
                      Email
                    </h2>
                    <p>{form.getValues("email")}</p>
                  </div>
                  <div>
                    <h2 className="space-y-2 text-xs text-muted-foreground">
                      Phone
                    </h2>
                    <p>{form.getValues("phone")}</p>
                  </div>
                  <div>
                    <h2 className="space-y-2 text-xs text-muted-foreground">
                      City
                    </h2>
                    <p>{form.getValues("city") || "N/A"}</p>
                  </div>
                  <div>
                    <h2 className="space-y-2 text-xs text-muted-foreground">
                      Address
                    </h2>
                    <p>Punjab</p>
                  </div>
                  <div>
                    <h2 className="space-y-2 text-xs text-muted-foreground">
                      Ethnicity
                    </h2>
                    <p>Punjabi</p>
                  </div>
                </div>
              </section>
              <section className="space-y-4">
                <h1 className="font font-semibold text-primary">
                  Professional Information
                </h1>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <h2 className="space-y-2 text-xs text-muted-foreground">
                      Organization Name
                    </h2>
                    <p>{form.getValues("organizationName")}</p>
                  </div>
                  <div>
                    <h2 className="space-y-2 text-xs text-muted-foreground">
                      Designation
                    </h2>
                    <p>{form.getValues("designation")}</p>
                  </div>
                </div>
              </section>
            </FieldGroup>
          )}
        </form>
      </CardContent>
      <CardFooter className="border-t px-12 !py-4">
        <Button
          type="button"
          variant="outline"
          className="min-w-[120px] border-primary !text-primary"
          onClick={handleBack}
          hidden={activeStep === 1}
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="ml-auto min-w-[120px]"
          hidden={activeStep >= 3}
        >
          Next
        </Button>
        <Button
          type="submit"
          form="form-signup"
          className="ml-auto min-w-[120px]"
          hidden={activeStep < 3}
        >
          Submit
        </Button>{" "}
      </CardFooter>
    </Card>
  );
}
