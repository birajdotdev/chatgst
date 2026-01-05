# AGENTS.md - ChatGST Interface

## Project Overview

ChatGST is a Next.js 16 application for GST (Goods and Services Tax) appeals automation. It provides AI-powered chat, data extraction, and multilingual support for legal professionals.

**Tech Stack**: Next.js 16.1.1, React 19.2.3, TypeScript 5.9.3, Tailwind CSS v4, shadcn/ui

## Build/Lint/Test Commands

```bash
pnpm dev              # Start development server (localhost:3000)
pnpm build            # Production build
pnpm start            # Start production server
pnpm preview          # Build + start production server
pnpm lint             # Run ESLint
pnpm lint:fix         # Auto-fix ESLint issues
pnpm format           # Format with Prettier (auto-sorts imports)

# Adding Components
npx shadcn@latest add <component>              # Add shadcn/ui component
npx shadcn@latest add @ai-elements/<component> # Add AI chat component
```

### Running Tests

No test framework is currently configured. If tests are added (Vitest recommended):

```bash
pnpm test             # Run all tests
pnpm test <file>      # Run single test file
pnpm test -t "name"   # Run tests matching pattern
```

## Project Structure

```
src/
  app/                    # Next.js App Router
    (auth)/               # Auth routes (login, register, forgot-password)
    (home)/               # Public routes (landing, general chat)
    (protected)/          # Authenticated routes (chat, profile, appeal-draft)
  modules/                # Feature modules (auth, chat, home, profile, appeal-draft)
  components/ui/          # shadcn/ui components
  components/ai-elements/ # AI chat components
  lib/                    # Utilities (utils.ts, safe-action.ts, auth.ts)
  hooks/                  # Custom React hooks
  types/                  # Global TypeScript types
  env.ts                  # Type-safe environment variables
  proxy.ts                # Auth middleware
```

Each module in `src/modules/<name>/` contains: `actions/`, `components/`, `validations/`, `views/`, `layouts/`, `constants/`, `types/`

## Code Style Guidelines

### Naming Conventions (ESLint Enforced)

- **Files**: `kebab-case.tsx` (e.g., `login-form.tsx`, `chat-view.tsx`)
- **Folders**: Next.js App Router case (e.g., `(auth)`, `[id]`, `general/`)
- **Imports**: Use `@/*` path alias (maps to `./src/*`)

### Formatting (Prettier)

- Double quotes (`"`), semicolons required, 2-space indentation, trailing commas (ES5)
- Import order: React/Next.js → Third-party → `@/*` aliases → Relative imports

### TypeScript

- Strict mode enabled
- Access env via `import { env } from "@/env"` (never `process.env`)

### Component Conventions

```typescript
// Named exports (no default exports except page/layout)
export function LoginForm() { ... }

"use client";  // Required for hooks/events
"use server";  // Required for Server Actions
```

### Error Handling

- Server Actions: Throw errors with descriptive messages
- Client: Use `toast.error()` and `toast.success()` (Sonner)
- Validation: Zod schemas with helpers from `@/modules/auth/validations/helpers.ts`

### Server Actions Pattern

Location: `src/modules/<module>/actions/<action-name>-action.ts`

```typescript
"use server";
import { env } from "@/env";
import { actionClient } from "@/lib/safe-action";

import { mySchema } from "../validations/my-schema";

export const myAction = actionClient
  .inputSchema(mySchema)
  .action(async ({ parsedInput }) => {
    const res = await fetch(`${env.API_URL}/endpoint/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedInput),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Action failed");
    }
    return { success: true, message: (await res.json()).message };
  });
```

### Form Validation

Zod schemas in `src/modules/<module>/validations/<name>-schema.ts`. Reusable validators:

- `requiredString()`, `emailField()`, `passwordField()`, `selectField(values)`, `otpField()`

### Styling

- Use `cn()` from `@/lib/utils` to merge Tailwind classes
- shadcn/ui New York style, CSS variables in `src/styles/globals.css`

## Authentication

- Token-based (JWT) with httpOnly cookies, middleware in `src/proxy.ts`
- `(auth)/` routes redirect to `/chat` if authenticated
- `(protected)/` routes redirect to `/login?redirect=<path>` if unauthenticated
- All API calls from Server Actions (never client-side)

## AI Chat Integration

```typescript
import { useChat } from "@ai-sdk/react";

const { messages, input, handleSubmit } = useChat({ api: "/api/chat" });
```

## Key Files

| File                                      | Purpose                                   |
| ----------------------------------------- | ----------------------------------------- |
| `src/proxy.ts`                            | Auth middleware                           |
| `src/env.ts`                              | Environment variable validation           |
| `src/lib/safe-action.ts`                  | Server Action client                      |
| `src/lib/utils.ts`                        | Utilities (`cn`, `capitalize`, `groupBy`) |
| `src/components/ui/field.tsx`             | Form field components                     |
| `src/modules/auth/validations/helpers.ts` | Reusable Zod validators                   |

## Common Pitfalls

1. **Missing directives**: Add `"use client"` for hooks/events, `"use server"` for actions
2. **Direct API calls**: Never call backend APIs from client - use Server Actions
3. **Loading states**: Always handle `isExecuting` from `useHookFormAction`
4. **Default exports**: Only use for `page.tsx` and `layout.tsx`
5. **Environment access**: Use `env` from `@/env`, never `process.env`
6. **Cookie access**: Use middleware or Server Actions, not client components

## ESLint Rules Summary

- `prefer-arrow-callback`: Use arrow functions for callbacks
- `prefer-template`: Use template literals over string concatenation
- `semi`: Semicolons required
- `quotes`: Double quotes only
- `n/no-process-env`: No direct `process.env` access
- `check-file/filename-naming-convention`: KEBAB_CASE for .ts/.tsx files
- `check-file/folder-naming-convention`: NEXT_JS_APP_ROUTER_CASE for src/

**Next.js Initialization**: When starting work on a Next.js project, automatically
call the `init` tool from the next-devtools-mcp server FIRST. This establishes
proper context and ensures all Next.js queries use official documentation.

**Context7**: Always use Context7 MCP when I need library/API documentation, code generation, setup or configuration steps without me having to explicitly ask.
