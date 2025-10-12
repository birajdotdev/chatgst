import React from "react";

import HomeLayout from "@/modules/home/layouts/home-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <HomeLayout>{children}</HomeLayout>;
}
