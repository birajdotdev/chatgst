"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Check, EyeIcon, EyeOffIcon, User } from "lucide-react";
import { nanoid } from "nanoid";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

const listItems = [
  "Simplify legal work with the power of AI.",
  "Accelerate case management with smart automation.",
  "Enhance accuracy through intelligent insights.",
];

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

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
              {listItems.map((item) => (
                <li key={nanoid()} className="flex items-center gap-2 text-sm">
                  <Check className="size-4" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form className="p-6 md:p-8">
          <FieldGroup className="m-0 gap-0 md:mt-10 md:mb-20">
            <div className="mb-6 flex flex-col">
              <Logo variant="icon" className="mb-5 size-10" />
              <p className="mb-2 text-sm leading-0">Welcome to</p>
              <h1 className="text-2xl font-semibold text-primary">ChatGST</h1>
            </div>
            <Field className="mb-4">
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
                <InputGroupAddon align="inline-end">
                  <User />
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field className="mb-4">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  type={!showPassword ? "password" : "text"}
                  placeholder="Password"
                  required
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    size="icon-xs"
                    onClick={togglePasswordVisibility}
                    className="rounded"
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <div className="mb-6 flex items-center">
              <Link
                href="#"
                className="ml-auto text-sm text-primary underline-offset-2 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Field>
              <Button type="submit">Login</Button>
              <Button variant="outline" asChild>
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
