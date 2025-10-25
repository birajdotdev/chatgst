"use client";

import { Suspense } from "react";

function CopyrightContent() {
  const year = new Date().getFullYear();
  return <>&copy; {year} </>;
}

function CopyrightFallback() {
  return <>© 2025 </>;
}

export function Copyright() {
  return (
    <Suspense fallback={<CopyrightFallback />}>
      <CopyrightContent />
    </Suspense>
  );
}
