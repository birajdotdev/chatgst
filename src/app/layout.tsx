import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { Toaster } from "sonner";

import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: {
    default: "ChatGST",
    template: "%s | ChatGST",
  },
  description:
    "Simplify GST appeals with automated data extraction, an intelligent knowledge base, and multilingual support. Transform complex legal documents into accurate, structured appeals in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
