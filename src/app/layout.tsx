import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { Footer } from "@/components/footer/footer";
import { Navbar } from "@/components/navbar/navbar";
import { Providers } from "@/components/providers";
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
    <html lang="en">
      <body
        className={`${outfit.variable} flex min-h-screen flex-col antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
