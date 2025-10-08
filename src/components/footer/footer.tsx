import { Route } from "next";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import { FacebookIcon } from "../icons/facebook";
import { LinkedinIcon } from "../icons/linkedin";
import { XIcon } from "../icons/x";
import { Logo } from "./logo";

type FooterSection = {
  title: string;
  links: { title: string; href: Route }[];
};

const footerSections: FooterSection[] = [
  {
    title: "Company",
    links: [
      {
        title: "Home",
        href: "#",
      },
      {
        title: "About",
        href: "#",
      },
      {
        title: "How it works",
        href: "#",
      },
      {
        title: "Resources",
        href: "#",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        title: "Help Center",
        href: "#",
      },
      {
        title: "Privacy Policy",
        href: "#",
      },
      {
        title: "Terms of Services",
        href: "#",
      },
      {
        title: "Contact Us",
        href: "#",
      },
    ],
  },
  {
    title: "Get in Touch",
    links: [
      {
        title: "+91 98765 43210",
        href: "#",
      },
      {
        title: "Bengaluru, Karnataka",
        href: "#",
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="m-3 rounded-3xl bg-primary">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:px-0">
          <div className="col-span-full sm:col-span-2 md:col-span-3 lg:col-span-2 xl:col-span-2">
            {/* Logo */}
            <Logo />

            <p className="mt-4 text-primary-foreground/80">
              AI-powered legal drafting and multilingual support to make
              compliance faster, smarter, and easier.
            </p>

            <div className="mt-4 flex items-center gap-5 text-primary-foreground">
              <Link
                href="#"
                target="_blank"
                className="transition-colors hover:text-primary-foreground/80"
              >
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                className="transition-colors hover:text-primary-foreground/80"
              >
                <LinkedinIcon className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                target="_blank"
                className="transition-colors hover:text-primary-foreground/80"
              >
                <XIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h6 className="font-medium text-primary-foreground">{title}</h6>
              <ul className="mt-6 space-y-4">
                {links.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-primary-foreground/80 transition-colors hover:text-primary-foreground"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="bg-primary-foreground/20" />
        <div className="flex items-center justify-center px-6 py-8 xl:px-0">
          {/* Copyright */}
          <span className="text-primary-foreground/80">
            &copy; {new Date().getFullYear()}{" "}
            <Link
              href="/"
              className="transition-colors hover:text-primary-foreground"
            >
              ChatGST.in
            </Link>
            . All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
