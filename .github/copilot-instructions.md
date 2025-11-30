# ChatGST Interface - AI Agent Instructions

## Project Overview

ChatGST is a Next.js 16 application that simplifies GST (Goods and Services Tax) appeals using AI-powered automation, data extraction, and multilingual support. The app helps legal professionals manage GST-related cases efficiently.

## Architecture

### Tech Stack

- **Framework**: Next.js 16.0.3 (App Router, React 19.2.0, React Compiler enabled)
- **Styling**: Tailwind CSS v4 with shadcn/ui components (New York style)
- **Forms**: React Hook Form + Zod validation via `next-safe-action`
- **AI**: Vercel AI SDK (`ai` + `@ai-sdk/react`) for chat/streaming
- **State Management**: Server Actions for mutations, React hooks for client state
- **Auth**: Token-based (JWT) with httpOnly cookies, custom middleware proxy

### Module-Based Structure

Code is organized by feature modules under `src/modules/`:

```
src/modules/
  auth/          # Authentication (login, signup, OTP verification)
  chat/          # AI chat interface
  home/          # Landing page and marketing content
```

Each module follows this internal structure:

```
<module>/
  actions/       # Server Actions (use "use server")
  components/    # Module-specific components
  validations/   # Zod schemas
  views/         # Page-level components (use "use client")
  layouts/       # Layout components
  constants/     # Static data, helpers
  types/         # TypeScript types
```

### Routing & Authentication

**Route Groups** (App Router convention):

- `(auth)/` - Login/signup pages → redirect to `/chat` if authenticated
- `(home)/` - Public landing pages
- `(protected)/` - Requires authentication (e.g., `/chat`)

**Authentication Flow** (`src/proxy.ts`):

- Middleware checks `access_token` and `refresh_token` cookies
- Protected routes redirect to `/login?redirect=<path>` if unauthenticated
- Auth routes redirect to `/chat` if already authenticated
- Tokens stored in httpOnly cookies via Server Actions (see `src/modules/auth/actions/login-action.ts`)

**API Communication**:

- Backend API URL configured via `src/env.ts` (`API_URL`)
- All API calls made from Server Actions, never directly from client

## Key Patterns & Conventions

### File Naming & Structure

**ESLint enforces strict naming**:

- Files: `kebab-case.tsx` (e.g., `login-form.tsx`, `chat-view.tsx`)
- Folders: `NEXT_JS_APP_ROUTER_CASE` for `src/` (e.g., `(auth)`, `general/`)
- Imports auto-sorted via Prettier: React/Next → third-party → `@/*` → relative

**Component Exports**:

- Named exports for components: `export function LoginForm() {}`
- No default exports for components (except page.tsx/layout.tsx)

### Server Actions Pattern

**Location**: `src/modules/<module>/actions/<action-name>-action.ts`

**Structure**:

```typescript
"use server";

import { actionClient } from "@/lib/safe-action";

import { mySchema } from "../validations/my-schema";

export const myAction = actionClient
  .inputSchema(mySchema)
  .action(async ({ parsedInput }) => {
    // 1. Call backend API
    const res = await fetch(`${env.API_URL}/endpoint/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedInput),
    });

    // 2. Handle errors
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || "Action failed");
    }

    // 3. Return success data
    const data = await res.json();
    return { success: true, message: data.message };
  });
```

**Usage in Components** (via `@next-safe-action/adapter-react-hook-form`):

```typescript
const {
  form,
  action: { isExecuting },
  handleSubmitWithAction,
} = useHookFormAction(myAction, zodResolver(mySchema), {
  actionProps: {
    onSuccess: ({ data }) => toast.success(data.message),
    onError: ({ error }) => toast.error(error.serverError),
  },
});
```

### Form Validation

**Zod Schemas**: `src/modules/<module>/validations/<name>-schema.ts`

**Reusable Validators** (`src/modules/auth/validations/helpers.ts`):

- `requiredString()` - Required string with trim
- `emailField()` - Email validation with lowercase/trim
- `passwordField()` - 8-100 chars, uppercase + lowercase required
- `selectField(values)` - Enum validation
- `otpField()` - 6-digit numeric OTP

**Multi-Step Forms**: Use `signupSchema.pick({...})` to create step-specific schemas (see `src/modules/auth/validations/signup-schema.ts`)

### UI Components

**shadcn/ui + Custom Registries**:

- Base components: `src/components/ui/` (shadcn/ui New York style)
- AI Elements: `@ai-elements` registry for AI chat components
- Form Components: `@formcn` registry for advanced form fields

**Custom Form Components** (`src/components/ui/field.tsx`):

- `<Field>` - Wrapper with orientation support (vertical/horizontal/responsive)
- `<FieldGroup>` - Container for multiple fields
- `<FieldLabel>` - Label with accessibility support
- `<FieldError>` - Error display with automatic deduplication

**Styling Utilities**:

- `cn()` - Merge Tailwind classes (`clsx` + `twMerge`)
- `cva()` - Class variance authority for component variants

### Environment Variables

**Configuration** (`src/env.ts`):

- Uses `@t3-oss/env-nextjs` for type-safe env validation
- Server vars: `NODE_ENV`, `API_URL` (required)
- Access via `import { env } from "@/env"`
- **Never access `process.env` directly** (ESLint rule: `n/no-process-env`)

## Development Workflows

### Commands

```bash
pnpm dev          # Start dev server (localhost:3000)
pnpm build        # Production build
pnpm preview      # Build + start production server
pnpm lint         # Check ESLint errors
pnpm lint:fix     # Auto-fix ESLint issues
pnpm format       # Format with Prettier
```

### Adding Components

```bash
# shadcn/ui components
npx shadcn@latest add <component>

# AI Elements registry
npx shadcn@latest add @ai-elements/<component>
```

### Code Quality Rules

**Must Follow**:

- Use double quotes (`"`) for strings
- Semicolons required
- Prefer arrow functions and template literals
- All file/folder names must match ESLint naming conventions
- No `process.env` access (use `env` from `@/env`)

**React/Next.js Specific**:

- Add `"use client"` for client components (hooks, event handlers, browser APIs)
- Add `"use server"` for Server Actions
- Use `next/image` for images, `next/link` for navigation
- Typed routes enabled (`typedRoutes: true` in `next.config.ts`)

## AI Chat Integration

**Vercel AI SDK Pattern** (see `src/modules/chat/views/chat-view.tsx`):

```typescript
import { useChat } from "@ai-sdk/react";

const { messages, input, handleSubmit } = useChat({
  api: "/api/chat", // API route for AI streaming
});
```

**AI Components**:

- `src/components/ai-elements/` - Custom AI UI components
- `Message`, `MessageContent`, `MessageAvatar` - Chat message display
- Supports role-based styling (`user` vs `assistant`)

## Common Pitfalls

1. **Don't** create components without `"use client"` if they use hooks/events
2. **Don't** call backend APIs directly from client components - use Server Actions
3. **Don't** forget to handle loading states (`isExecuting` from `useHookFormAction`)
4. **Don't** use default exports for components (except Next.js special files)
5. **Don't** access cookies in client components - use middleware or Server Actions
6. **Do** use `toast.error()` and `toast.success()` for user feedback (Sonner is configured globally)

## Key Files Reference

- `src/proxy.ts` - Auth middleware
- `src/env.ts` - Environment variable validation
- `src/lib/safe-action.ts` - Server Action client configuration
- `src/lib/utils.ts` - Utility functions (`cn`, `capitalize`, `groupBy`)
- `src/components/ui/field.tsx` - Form field components
- `src/modules/auth/validations/helpers.ts` - Reusable Zod validators
