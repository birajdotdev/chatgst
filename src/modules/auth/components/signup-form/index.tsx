"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import {
  FormHeader,
  NextButton,
  PreviousButton,
  StepFields,
  SubmitButton,
} from "@/components/multi-step-viewer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import {
  MultiStepFormProvider,
  Stepfields,
} from "@/hooks/use-multi-step-viewer";
import { signupFn } from "@/modules/auth/actions/signup-action";
import { ContactStepFields } from "@/modules/auth/components/signup-form/contact-step-fields";
import { GstStepFields } from "@/modules/auth/components/signup-form/gst-step-fields";
import { PersonalStepFields } from "@/modules/auth/components/signup-form/personal-step-fields";
import { PreviewStepFields } from "@/modules/auth/components/signup-form/preview-step-fields";
import { ProfessionalStepFields } from "@/modules/auth/components/signup-form/professional-step-fields";
import {
  SignupSchema,
  signupSchema,
} from "@/modules/auth/validations/signup-schema";

const steps: Array<{ step: number; title: string }> = [
  { step: 1, title: "Personal" },
  { step: 2, title: "GST Specific" },
  { step: 3, title: "Professional" },
  { step: 4, title: "Contact" },
  { step: 5, title: "Preview" },
];

type SignupFormData = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
      gstin: "",
      business_name: "",
      constitution_of_business: undefined,
      state_or_jurisdiction: "",
      user_type: undefined,
      organization_name: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (input: SignupFormData) => signupFn({ data: input }),
    onSuccess: (data) => {
      const searchParams = new URLSearchParams({ email: data.email });
      router.navigate({ to: `/register/verify?${searchParams.toString()}` });
      toast.success(data.message || "Verification code sent!");
      form.reset();
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Signup failed");
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  const stepsFields: Stepfields<keyof SignupSchema>[] = [
    {
      fields: [
        "first_name",
        "middle_name",
        "last_name",
        "email",
        "phone_number",
        "password",
        "confirm_password",
      ],
      component: <PersonalStepFields control={form.control} />,
    },
    {
      fields: [
        "gstin",
        "business_name",
        "constitution_of_business",
        "state_or_jurisdiction",
      ],
      component: <GstStepFields control={form.control} />,
    },
    {
      fields: [
        "user_type",
        "organization_name",
        "designation",
        "professional_registration_number",
      ],
      component: <ProfessionalStepFields control={form.control} />,
    },
    {
      fields: ["address", "pincode", "alternate_email_or_phone"],
      component: <ContactStepFields control={form.control} />,
    },
    {
      fields: ["terms_and_privacy_policy", "receive_updates_or_newsletter"],
      component: <PreviewStepFields control={form.control} />,
    },
  ];

  return (
    <form onSubmit={onSubmit}>
      <MultiStepFormProvider
        stepsFields={stepsFields}
        onStepValidation={async (step) => {
          const isValid = await form.trigger(step.fields);
          return isValid;
        }}
      >
        <Card className="min-h-[620px] p-0 pt-7">
          <CardHeader className="px-12">
            <FormHeader steps={steps} />
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <StepFields />
          </CardContent>
          <CardFooter className="border-t px-12 py-3!">
            <PreviousButton className="group mr-auto w-[120px]">
              <ChevronLeftIcon className="transition-transform group-hover:-translate-x-1" />
              Previous
            </PreviousButton>
            <NextButton className="group ml-auto w-[120px]">
              Next
              <ChevronRightIcon className="transition-transform group-hover:translate-x-1" />
            </NextButton>
            <SubmitButton
              className="w-[120px]"
              type="submit"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Spinner /> : "Submit"}
            </SubmitButton>
          </CardFooter>
        </Card>
      </MultiStepFormProvider>
    </form>
  );
}
