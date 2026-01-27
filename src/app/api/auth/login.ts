import { createFileRoute } from "@tanstack/react-router";
import { setCookie } from "vinxi/http";

import { env } from "@/env";

interface LoginResponse {
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
  };
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const Route = createFileRoute("/api/auth/login")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();

        const res = await fetch(`${env.API_URL}/token/`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const errorData = await res.json();
          return new Response(
            JSON.stringify({
              success: false,
              message: errorData.detail || "Login failed",
            }),
            {
              status: res.status,
              headers: { "Content-Type": "application/json" },
            }
          );
        }

        const data: LoginResponse = await res.json();

        // Set httpOnly cookies
        setCookie("access_token", data.data.access_token, {
          ...COOKIE_OPTIONS,
          maxAge: 60 * 60 * 24, // 24 hours
        });

        setCookie("refresh_token", data.data.refresh_token, {
          ...COOKIE_OPTIONS,
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return new Response(
          JSON.stringify({
            success: true,
            message: data.message,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        );
      },
    },
  },
});
