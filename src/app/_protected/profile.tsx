import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { getUser } from "@/lib/dal";
import { ProfileView } from "@/modules/profile/views/profile-view";

// Server function to get user profile
const getUserProfile = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getUser();
  return { user };
});

export const Route = createFileRoute("/_protected/profile")({
  loader: async () => {
    const { user } = await getUserProfile();
    if (!user) {
      throw redirect({ to: "/login" });
    }
    return { user };
  },
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = Route.useLoaderData();
  return <ProfileView user={user} />;
}
