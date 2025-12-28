"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Check, User } from "lucide-react";
import { Controller } from "react-hook-form";
import { toast } from "sonner";

import { Logo } from "@/components/logo";
import { PasswordInput } from "@/components/password-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { loginAction } from "@/modules/auth/actions/login-action";
import { loginSchema } from "@/modules/auth/validations/login-schema";

const listItems = [
  "Simplify legal work with the power of AI.",
  "Accelerate case management with smart automation.",
  "Enhance accuracy through intelligent insights.",
];

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const router = useRouter();

  const {
    form,
    action: { isExecuting },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(loginAction, zodResolver(loginSchema), {
    formProps: {
      defaultValues: {
        email: "",
        password: "",
      },
    },
    actionProps: {
      onSuccess: ({ data }) => {
        toast.success(data.message);
        resetFormAndAction();
        router.push("/chat");
      },
      onError: ({ error }) => {
        toast.error(error.serverError);
      },
    },
  });

  return (
    <Card className={cn("overflow-hidden p-0", className)} {...props}>
      <CardContent className="grid p-0 md:grid-cols-2">
        <div className="relative m-2 hidden rounded bg-primary p-6 text-white md:block">
          <Image
            src="/law.png"
            alt="Law Symbol"
            className="absolute right-0 -bottom-4 aspect-square opacity-40"
            width={200}
            height={200}
            priority
          />
          <div className="mt-20">
            <h1 className="mb-10 max-w-xs text-2xl font-semibold">
              Empowering Lawyers with the Speed of AI
            </h1>
            <ul className="space-y-3">
              {listItems.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <Check className="size-4" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form className="p-6 md:p-8" onSubmit={handleSubmitWithAction}>
          <FieldGroup className="m-0 gap-0 md:mt-10 md:mb-20">
            <div className="mb-6 flex flex-col">
              <Logo variant="icon" className="mb-5 size-10" />
              <p className="mb-2 text-sm leading-0">Welcome to</p>
              <h1 className="text-2xl font-semibold text-primary">ChatGST</h1>
            </div>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="mb-4" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={field.name}
                      type="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email"
                      required
                    />
                    <InputGroupAddon align="inline-end">
                      <User />
                    </InputGroupAddon>
                  </InputGroup>
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
                <Field className="mb-4" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <PasswordInput
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <div className="mb-6 flex items-center">
              <Link
                href="/forgot-password"
                className="ml-auto text-sm text-primary underline-offset-2 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Field>
              <Button type="submit" disabled={isExecuting}>
                {isExecuting ? <Spinner /> : "Login"}
              </Button>
              <Button variant="outline" asChild>
                <Link href="/register">Sign Up</Link>
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
