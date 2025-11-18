import { Route } from "next";

interface MenuItem {
  title: string;
  items: {
    label: string;
    href: Route;
  }[];
}

export const SIDEBAR_MENU_ITEMS: MenuItem[] = [
  {
    title: "Today",
    items: [
      {
        label:
          "Write me a privacy policy for my SaaS platform that collects emails and user behavior data.",
        href: "#",
      },
      {
        label:
          "I need terms and conditions for an e-commerce store selling clothes.",
        href: "#",
      },
      {
        label: "Draft a one-page NDA for freelancers I hire.",
        href: "#",
      },
    ],
  },
  {
    title: "14 February, 2025",
    items: [
      {
        label: "Can you create a refund policy for my digital product website?",
        href: "#",
      },
      {
        label: "Disclaimer for Finance Blog",
        href: "#",
      },
      {
        label: "Content Usage Terms for a Media Company",
        href: "#",
      },
      {
        label: "I need a cookie policy for my website to meet GDPR compliance.",
        href: "#",
      },
    ],
  },
  {
    title: "13 February, 2025",
    items: [
      {
        label: "Privacy Policy for Mobile App",
        href: "#",
      },
      {
        label: "Terms of Service for Online Course Platform",
        href: "#",
      },
      {
        label: "User Agreement for Social Networking Site",
        href: "#",
      },
    ],
  },
];
