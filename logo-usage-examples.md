/\*\*

- Logo Component Usage Examples
-
- This unified Logo component replaces the two separate logo files that were previously
- located in navbar/logo.tsx and footer/logo.tsx
-
- USAGE:
-
- // Import the Logo component
- import { Logo } from "@/components/logo";
-
- // Default colorful variant (same as the old navbar logo)
- <Logo />
- // or explicitly
- <Logo variant="default" />
-
- // White variant (same as the old footer logo)
- <Logo variant="white" />
-
- // With custom className for additional styling
- <Logo variant="default" className="hover:opacity-80 transition-opacity" />
- <Logo variant="white" className="w-32 h-auto" />
-
- PROPS:
- - variant?: "default" | "white" - Controls the logo color scheme (defaults to "default")
- - className?: string - Additional CSS classes to apply to the SVG element
-
- MIGRATION:
- - Old navbar logo: Replace with <Logo variant="default" />
- - Old footer logo: Replace with <Logo variant="white" />
-
- You can delete this file after reviewing the examples.
  \*/

export {}; // Make this a valid TypeScript module
