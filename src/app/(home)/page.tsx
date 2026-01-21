import { LandingView } from "@/modules/home/views/landing-view";

// Auth redirect handled by middleware (src/proxy.ts)
// Authenticated users are redirected to /chat

export default function Page() {
  return <LandingView />;
}
